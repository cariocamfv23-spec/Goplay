import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  feedService,
  type PostItem,
  type PostCommentItem,
} from '@/services/feed'
import {
  notificationService,
  type NotificationItem,
} from '@/services/notifications'
import useSoundStore from '@/stores/useSoundStore'
import { toast } from 'sonner'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface RealtimeFeedState {
  posts: PostItem[]
  loading: boolean
  isLiveConnected: boolean
  refreshFeed: () => Promise<void>
  addLocalPost: (post: PostItem) => void
  removeLocalPost: (postId: string) => void
  updatePostLike: (postId: string, liked: boolean, countDelta: number) => void
}

/**
 * Hook for live feed updates via Supabase Realtime postgres_changes:
 * - Listens to INSERT, UPDATE, DELETE on `posts`
 * - Listens to INSERT, DELETE on `post_likes` (updates likesCount live without flickering)
 * - Listens to INSERT, DELETE on `post_comments` (updates commentsCount live)
 * - Handles auto-reconnect, deduplication, unmount cleanup and avoids duplicating current user's local actions.
 */
export function useRealtimeFeed(
  currentUserId?: string | null,
): RealtimeFeedState {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false)

  // Track channels and mounted status
  const channelRef = useRef<RealtimeChannel | null>(null)
  const isMountedRef = useRef<boolean>(true)
  const currentUserIdRef = useRef<string | null | undefined>(currentUserId)
  currentUserIdRef.current = currentUserId

  // Keep a ref of current posts to avoid stale closures in callbacks
  const postsRef = useRef<PostItem[]>([])
  postsRef.current = posts

  const loadFeed = useCallback(async () => {
    try {
      const { data, error } = await feedService.getPosts(
        currentUserIdRef.current,
      )
      if (isMountedRef.current) {
        if (!error && data) {
          setPosts(data)
        }
        setLoading(false)
      }
    } catch (err) {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  // Manual actions
  const addLocalPost = useCallback((newPost: PostItem) => {
    setPosts((prev) => {
      if (prev.some((p) => p.id === newPost.id)) return prev
      return [newPost, ...prev]
    })
  }, [])

  const removeLocalPost = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }, [])

  const updatePostLike = useCallback(
    (postId: string, liked: boolean, countDelta: number) => {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p
          const newCount = Math.max(0, p.likesCount + countDelta)
          return { ...p, isLiked: liked, likesCount: newCount }
        }),
      )
    },
    [],
  )

  // Setup initial load and Realtime channel
  useEffect(() => {
    isMountedRef.current = true
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
            likesCount: 0,
            commentsCount: 0,
            isLiked: false,
            createdAt: newRow.created_at,
            timeAgo: 'Agora',
          }

          if (isMountedRef.current) {
            setPosts((prev) => {
              if (prev.some((p) => p.id === newItem.id)) return prev
              return [newItem, ...prev]
            })
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
            setPosts((prev) => prev.filter((p) => p.id !== oldRow.id))
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
            setPosts((prev) =>
              prev.map((p) => {
                if (p.id !== updatedRow.id) return p
                return {
                  ...p,
                  content: updatedRow.content ?? p.content,
                  media: Array.isArray(updatedRow.media_urls)
                    ? updatedRow.media_urls
                    : p.media,
                  type: updatedRow.post_type ?? p.type,
                  videoUrl: updatedRow.video_url ?? p.videoUrl,
                }
              }),
            )
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
            setPosts((prev) =>
              prev.map((p) => {
                if (p.id !== newLike.post_id) return p
                // If it was performed by current user and is already marked as liked, avoid incrementing again
                if (isByCurrentUser && p.isLiked) {
                  return p
                }
                return {
                  ...p,
                  likesCount: p.likesCount + 1,
                  isLiked: isByCurrentUser ? true : p.isLiked,
                }
              }),
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
            setPosts((prev) =>
              prev.map((p) => {
                if (p.id !== oldLike.post_id) return p
                // If current user unliked and already marked false, avoid double decrement
                if (isByCurrentUser && !p.isLiked) {
                  return p
                }
                return {
                  ...p,
                  likesCount: Math.max(0, p.likesCount - 1),
                  isLiked: isByCurrentUser ? false : p.isLiked,
                }
              }),
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
            setPosts((prev) =>
              prev.map((p) => {
                if (p.id !== newComment.post_id) return p
                return {
                  ...p,
                  commentsCount: p.commentsCount + 1,
                }
              }),
            )
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
            setPosts((prev) =>
              prev.map((p) => {
                if (p.id !== oldComment.post_id) return p
                return {
                  ...p,
                  commentsCount: Math.max(0, p.commentsCount - 1),
                }
              }),
            )
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
  }, [currentUserId, loadFeed])

  return {
    posts,
    loading,
    isLiveConnected,
    refreshFeed: loadFeed,
    addLocalPost,
    removeLocalPost,
    updatePostLike,
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
