import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  feedService,
  type PostItem,
  type PostCommentItem,
} from '@/services/feed'
import { moderationService } from '@/services/moderation'
import {
  notificationService,
  type NotificationItem,
} from '@/services/notifications'
import useSoundStore from '@/stores/useSoundStore'
import { useFeedStore } from '@/stores/useFeedStore'
import { toast } from 'sonner'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface RealtimeFeedState {
  posts: PostItem[]
  loading: boolean
  isSyncing: boolean
  isLiveConnected: boolean
  refreshFeed: () => Promise<void>
  addLocalPost: (post: PostItem) => void
  removeLocalPost: (postId: string) => void
  updatePostLike: (postId: string, liked: boolean, countDelta: number) => void
}

/**
 * Hook for live feed updates via Supabase Realtime postgres_changes:
 * - Uses Zustand useFeedStore as instant cache (stale-while-revalidate)
 * - Initial fetch runs in parallel with Realtime subscription
 * - When cache exists, `loading` is immediately FALSE (instant opening)
 * - Background sync happens silently without blocking or freezing UI
 * - Listens to INSERT, UPDATE, DELETE on `posts`
 * - Listens to INSERT, DELETE on `post_likes` (updates likesCount live without flickering)
 * - Listens to INSERT, DELETE on `post_comments` (updates commentsCount live)
 * - Handles auto-reconnect, deduplication, unmount cleanup and avoids duplicating current user's local actions.
 */
export function useRealtimeFeed(
  currentUserId?: string | null,
): RealtimeFeedState {
  const storePosts = useFeedStore((s) => s.posts)
  const isSyncing = useFeedStore((s) => s.isSyncing)
  const setStorePosts = useFeedStore((s) => s.setPosts)
  const setSyncing = useFeedStore((s) => s.setSyncing)
  const addStorePost = useFeedStore((s) => s.addPost)
  const removeStorePost = useFeedStore((s) => s.removePost)
  const updateStorePostLike = useFeedStore((s) => s.updatePostLike)
  const updateStoreCommentsCount = useFeedStore(
    (s) => s.updatePostCommentsCount,
  )
  const updateStorePostData = useFeedStore((s) => s.updatePostData)

  // If we have cached posts, we are immediately NOT loading.
  // Only fresh mounts with zero cached posts consider loading true.
  const [loading, setLoading] = useState<boolean>(() => storePosts.length === 0)
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false)

  // Track channels and mounted status
  const channelRef = useRef<RealtimeChannel | null>(null)
  const isMountedRef = useRef<boolean>(true)
  const currentUserIdRef = useRef<string | null | undefined>(currentUserId)
  currentUserIdRef.current = currentUserId

  // Keep a ref of current posts to avoid stale closures in callbacks
  const postsRef = useRef<PostItem[]>([])
  postsRef.current = storePosts

  const loadFeed = useCallback(async () => {
    setSyncing(true)
    try {
      // Parallelize blocked users fetch and initial posts query to avoid cascade delay
      const [blockedSetResult, rawPostsResult] = await Promise.all([
        currentUserIdRef.current
          ? moderationService.getBlockedUserIds(currentUserIdRef.current)
          : Promise.resolve(new Set<string>()),
        feedService.getPosts(currentUserIdRef.current, 20),
      ])

      const blockedSet = blockedSetResult || new Set<string>()

      if (isMountedRef.current) {
        if (!rawPostsResult.error && rawPostsResult.data) {
          // Filter out blocked users if any
          const filtered =
            blockedSet.size > 0
              ? rawPostsResult.data.filter((p) => !blockedSet.has(p.userId))
              : rawPostsResult.data
          setStorePosts(filtered)
        }
        setLoading(false)
        setSyncing(false)
      }
    } catch {
      if (isMountedRef.current) {
        setLoading(false)
        setSyncing(false)
      }
    }
  }, [setStorePosts, setSyncing])

  // Setup initial load and Realtime channel in parallel (non-blocking)
  useEffect(() => {
    isMountedRef.current = true

    // Fire data loading in parallel with channel subscription
    loadFeed()

    // Clean up any existing channel before subscribing
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }

    const channelName = `realtime-feed-${currentUserId || 'anon'}-${Date.now()}`
    const channel = supabase.channel(channelName)

    // 1. Listen for new posts, updates and deletions
    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        async (payload) => {
          const newRow = payload.new as any
          if (!newRow?.id) return

          // If the post is already in state, do not duplicate
          if (postsRef.current.some((p) => p.id === newRow.id)) return

          // Verify if author is blocked
          if (currentUserIdRef.current && newRow.user_id) {
            const { isBlockedByMe, isBlockingMe } =
              await moderationService.checkMutualBlock(
                currentUserIdRef.current,
                newRow.user_id,
              )
            if (isBlockedByMe || isBlockingMe) return
          }

          // Fetch post author profile for complete rendering
          let authorName = 'Usuário Goplay'
          let authorAvatar = `https://img.usecurling.com/ppl/thumbnail?seed=${newRow.user_id?.slice(0, 4) || 'user'}`
          let authorType = 'Atleta'
          let authorSport: string | null = null

          try {
            const { data: prof } = await supabase
              .from('profiles')
              .select('full_name, avatar_url, account_type, sport')
              .eq('id', newRow.user_id)
              .maybeSingle()

            if (prof) {
              authorName = prof.full_name || authorName
              authorAvatar = prof.avatar_url || authorAvatar
              authorType =
                prof.account_type === 'club'
                  ? 'Clube'
                  : prof.account_type === 'coach'
                    ? 'Treinador'
                    : 'Atleta'
              authorSport = prof.sport || null
            }
          } catch {
            // Non-blocking fallback
          }

          const newItem: PostItem = {
            id: newRow.id,
            userId: newRow.user_id,
            user: {
              id: newRow.user_id,
              name: authorName,
              avatar: authorAvatar,
              type: authorType,
              sport: authorSport,
            },
            content: newRow.content || '',
            media: Array.isArray(newRow.media_urls) ? newRow.media_urls : [],
            type: newRow.post_type || 'text',
            videoUrl: newRow.video_url || undefined,
            audioUrl: newRow.audio_url || null,
            musicLink: newRow.music_link || null,
            mentions: Array.isArray(newRow.mentions) ? newRow.mentions : [],
            likesCount: 0,
            commentsCount: 0,
            isLiked: false,
            createdAt: newRow.created_at,
            timeAgo: 'Agora',
          }

          if (isMountedRef.current) {
            addStorePost(newItem)
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'posts' },
        (payload) => {
          const oldRow = payload.old as any
          if (!oldRow?.id) return
          if (isMountedRef.current) {
            removeStorePost(oldRow.id)
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        (payload) => {
          const updatedRow = payload.new as any
          if (!updatedRow?.id) return
          if (isMountedRef.current) {
            updateStorePostData(updatedRow.id, {
              content: updatedRow.content,
              media: Array.isArray(updatedRow.media_urls)
                ? updatedRow.media_urls
                : undefined,
              type: updatedRow.post_type,
              videoUrl: updatedRow.video_url,
              audioUrl:
                updatedRow.audio_url !== undefined
                  ? updatedRow.audio_url
                  : undefined,
              musicLink:
                updatedRow.music_link !== undefined
                  ? updatedRow.music_link
                  : undefined,
              mentions: Array.isArray(updatedRow.mentions)
                ? updatedRow.mentions
                : undefined,
            })
          }
        },
      )

    // 2. Listen for like events
    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'post_likes' },
        (payload) => {
          const newLike = payload.new as any
          if (!newLike?.post_id) return

          const isByCurrentUser =
            currentUserIdRef.current &&
            newLike.user_id === currentUserIdRef.current

          if (isMountedRef.current) {
            const currentPost = postsRef.current.find(
              (p) => p.id === newLike.post_id,
            )
            if (isByCurrentUser && currentPost?.isLiked) {
              return
            }
            updateStorePostLike(
              newLike.post_id,
              isByCurrentUser ? true : Boolean(currentPost?.isLiked),
              1,
            )
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'post_likes' },
        (payload) => {
          const oldLike = payload.old as any
          if (!oldLike?.post_id) return

          const isByCurrentUser =
            currentUserIdRef.current &&
            oldLike.user_id === currentUserIdRef.current

          if (isMountedRef.current) {
            const currentPost = postsRef.current.find(
              (p) => p.id === oldLike.post_id,
            )
            if (isByCurrentUser && !currentPost?.isLiked) {
              return
            }
            updateStorePostLike(
              oldLike.post_id,
              isByCurrentUser ? false : Boolean(currentPost?.isLiked),
              -1,
            )
          }
        },
      )

    // 3. Listen for comments additions and deletions
    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'post_comments' },
        (payload) => {
          const newComment = payload.new as any
          if (!newComment?.post_id) return

          if (isMountedRef.current) {
            updateStoreCommentsCount(newComment.post_id, 1)
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'post_comments' },
        (payload) => {
          const oldComment = payload.old as any
          if (!oldComment?.post_id) return

          if (isMountedRef.current) {
            updateStoreCommentsCount(oldComment.post_id, -1)
          }
        },
      )

    // Subscribe and monitor connection status
    channel.subscribe((status) => {
      if (!isMountedRef.current) return
      if (status === 'SUBSCRIBED') {
        setIsLiveConnected(true)
      } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
        setIsLiveConnected(false)
      }
    })

    channelRef.current = channel

    return () => {
      isMountedRef.current = false
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [
    currentUserId,
    loadFeed,
    addStorePost,
    removeStorePost,
    updateStorePostData,
    updateStorePostLike,
    updateStoreCommentsCount,
  ])

  return {
    posts: storePosts,
    loading,
    isSyncing,
    isLiveConnected,
    refreshFeed: loadFeed,
    addLocalPost: addStorePost,
    removeLocalPost: removeStorePost,
    updatePostLike: updateStorePostLike,
  }
}

/**
 * Hook for live comments within a specific post's CommentsSheet.
 */
export function useRealtimeComments(postId?: string | number) {
  const [comments, setComments] = useState<PostCommentItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const isMountedRef = useRef<boolean>(true)
  const channelRef = useRef<RealtimeChannel | null>(null)

  const isSupabasePost =
    typeof postId === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      postId,
    )

  const loadComments = useCallback(async () => {
    if (!postId || !isSupabasePost) return
    setLoading(true)
    const { data, error } = await feedService.getComments(postId as string)
    if (isMountedRef.current) {
      if (!error && data) {
        setComments(data)
      }
      setLoading(false)
    }
  }, [postId, isSupabasePost])

  useEffect(() => {
    isMountedRef.current = true
    if (!postId || !isSupabasePost) {
      setComments([])
      setLoading(false)
      return
    }

    loadComments()

    const channelName = `comments-${postId}-${Date.now()}`
    const channel = supabase.channel(channelName)

    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'post_comments',
          filter: `post_id=eq.${postId}`,
        },
        async (payload) => {
          const newRow = payload.new as any
          if (!newRow?.id) return

          // Deduplicate
          setComments((prev) => {
            if (prev.some((c) => c.id === newRow.id)) return prev

            // Fetch profile async and append
            let userName = 'Usuário Goplay'
            let userAvatar: string | null = null

            supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', newRow.user_id)
              .maybeSingle()
              .then(({ data: prof }) => {
                if (prof && isMountedRef.current) {
                  setComments((current) =>
                    current.map((item) =>
                      item.id === newRow.id
                        ? {
                            ...item,
                            user: {
                              id: newRow.user_id,
                              name: prof.full_name || 'Usuário Goplay',
                              avatar: prof.avatar_url || null,
                            },
                          }
                        : item,
                    ),
                  )
                }
              })

            const newItem: PostCommentItem = {
              id: newRow.id,
              postId: newRow.post_id,
              userId: newRow.user_id,
              content: newRow.content,
              createdAt: newRow.created_at,
              timeAgo: 'Agora',
              user: {
                id: newRow.user_id,
                name: userName,
                avatar: userAvatar,
              },
            }

            return [...prev, newItem]
          })
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'post_comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          const oldRow = payload.old as any
          if (!oldRow?.id) return
          if (isMountedRef.current) {
            setComments((prev) => prev.filter((c) => c.id !== oldRow.id))
          }
        },
      )

    channel.subscribe()
    channelRef.current = channel

    return () => {
      isMountedRef.current = false
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [postId, isSupabasePost, loadComments])

  const addLocalComment = useCallback((newComment: PostCommentItem) => {
    setComments((prev) => {
      if (prev.some((c) => c.id === newComment.id)) return prev
      return [...prev, newComment]
    })
  }, [])

  const removeLocalComment = useCallback((commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId))
  }, [])

  return {
    comments,
    loading,
    refreshComments: loadComments,
    addLocalComment,
    removeLocalComment,
  }
}

/**
 * Hook for live user notifications:
 * - Subscribes to `notifications` table filtered by `user_id=eq.${userId}`
 * - Plays subtle audio tone when new notification arrives
 * - Shows toast banner for high priority or engagement alerts
 * - Safe against disconnects and memory leaks
 */
export function useRealtimeNotifications(userId?: string | null) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const isMountedRef = useRef<boolean>(true)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const userIdRef = useRef<string | null | undefined>(userId)
  userIdRef.current = userId

  const loadNotifications = useCallback(async () => {
    if (!userIdRef.current) return
    setLoading(true)
    const items = await notificationService.getMyNotifications(
      userIdRef.current,
    )
    if (isMountedRef.current) {
      setNotifications(items)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    if (!userId) {
      setNotifications([])
      setLoading(false)
      return
    }

    loadNotifications()

    const channelName = `realtime-notifications-${userId}-${Date.now()}`
    const channel = supabase.channel(channelName)

    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          const newRow = payload.new as any
          if (!newRow?.id) return

          // Fetch actor profile
          let actorData:
            | { id: string; name: string; avatar: string }
            | undefined
          if (newRow.actor_id) {
            try {
              const { data: prof } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url')
                .eq('id', newRow.actor_id)
                .maybeSingle()
              if (prof) {
                actorData = {
                  id: prof.id,
                  name: prof.full_name || 'Atleta',
                  avatar: prof.avatar_url || '',
                }
              }
            } catch {
              // Non-blocking
            }
          }

          const newNotification: NotificationItem = {
            id: newRow.id,
            userId: newRow.user_id,
            actorId: newRow.actor_id,
            type: newRow.type || 'info',
            title: newRow.title || 'Notificação',
            message: newRow.message || '',
            link: newRow.link,
            read: Boolean(newRow.read),
            createdAt: newRow.created_at,
            timeAgo: 'Agora',
            actor: actorData,
          }

          // Sound alert and toast
          try {
            useSoundStore.getState().playTone('engagement')
          } catch {
            // Ignore sound error
          }

          toast.info(newNotification.title, {
            description: newNotification.message,
          })

          if (isMountedRef.current) {
            setNotifications((prev) => {
              if (prev.some((n) => n.id === newNotification.id)) return prev
              return [newNotification, ...prev]
            })
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const updatedRow = payload.new as any
          if (!updatedRow?.id) return
          if (isMountedRef.current) {
            setNotifications((prev) =>
              prev.map((n) =>
                n.id === updatedRow.id
                  ? {
                      ...n,
                      read: updatedRow.read,
                      title: updatedRow.title ?? n.title,
                      message: updatedRow.message ?? n.message,
                    }
                  : n,
              ),
            )
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const oldRow = payload.old as any
          if (!oldRow?.id) return
          if (isMountedRef.current) {
            setNotifications((prev) => prev.filter((n) => n.id !== oldRow.id))
          }
        },
      )

    channel.subscribe()
    channelRef.current = channel

    return () => {
      isMountedRef.current = false
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [userId, loadNotifications])

  const markAsRead = useCallback(async (id: string) => {
    if (!userIdRef.current) return
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
    await notificationService.markAsRead(id, userIdRef.current)
  }, [])

  const markAllAsRead = useCallback(async () => {
    if (!userIdRef.current) return
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    await notificationService.markAllAsRead(userIdRef.current)
  }, [])

  return {
    notifications,
    loading,
    refreshNotifications: loadNotifications,
    markAsRead,
    markAllAsRead,
  }
}
