import { supabase } from '@/lib/supabase/client'
import { ProfileRow } from './profiles'

const db = supabase as any

export interface PostAuthor {
  id: string
  name: string
  avatar: string
  type: string
  sport?: string | null
}

export interface PostItem {
  id: string
  userId: string
  user: PostAuthor
  content: string
  media: string[]
  type: 'text' | 'image' | 'video' | 'article'
  videoUrl?: string
  likesCount: number
  commentsCount: number
  isLiked: boolean
  createdAt: string
  timeAgo: string
}

export interface PostCommentItem {
  id: string
  postId: string
  userId: string
  content: string
  createdAt: string
  timeAgo: string
  user: {
    id: string
    name: string
    avatar: string | null
  }
}

function formatRelativeTime(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    const diff = Math.floor((Date.now() - d.getTime()) / 1000)
    if (diff < 60) return 'Agora'
    if (diff < 3600) return `${Math.floor(diff / 60)}min`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  } catch {
    return 'Recente'
  }
}

export const feedService = {
  /**
   * Fetches real posts with author profile and current user like status.
   */
  async getPosts(
    currentUserId?: string | null,
    limit = 20,
  ): Promise<{ data: PostItem[]; error: Error | null }> {
    try {
      const { data: rawPosts, error: postsError } = await db
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (postsError) throw postsError
      if (!rawPosts || rawPosts.length === 0) return { data: [], error: null }

      // Extract unique user IDs to fetch author profiles in batch
      const userIds = Array.from(new Set(rawPosts.map((p: any) => p.user_id)))
      const { data: profiles, error: profError } = await db
        .from('profiles')
        .select('id, full_name, avatar_url, account_type, sport')
        .in('id', userIds)

      if (profError) throw profError

      const profileMap = new Map<string, any>()
      profiles?.forEach((p: any) => profileMap.set(p.id, p))

      // Fetch likes count and if current user liked
      const postIds = rawPosts.map((p: any) => p.id)
      const { data: likesData, error: likesError } = await db
        .from('post_likes')
        .select('post_id, user_id')
        .in('post_id', postIds)

      if (likesError) throw likesError

      // Fetch comments count
      const { data: commentsData, error: commentsError } = await db
        .from('post_comments')
        .select('post_id')
        .in('post_id', postIds)

      if (commentsError) throw commentsError

      // Compute aggregates
      const likesByPost = new Map<string, number>()
      const userLikedSet = new Set<string>()
      likesData?.forEach((like) => {
        likesByPost.set(like.post_id, (likesByPost.get(like.post_id) || 0) + 1)
        if (currentUserId && like.user_id === currentUserId) {
          userLikedSet.add(like.post_id)
        }
      })

      const commentsByPost = new Map<string, number>()
      commentsData?.forEach((c) => {
        commentsByPost.set(c.post_id, (commentsByPost.get(c.post_id) || 0) + 1)
      })

      const formattedPosts: PostItem[] = rawPosts.map((p) => {
        const prof = profileMap.get(p.user_id)
        return {
          id: p.id,
          userId: p.user_id,
          user: {
            id: p.user_id,
            name: prof?.full_name || 'Usuário Goplay',
            avatar:
              prof?.avatar_url ||
              `https://img.usecurling.com/ppl/thumbnail?seed=${p.user_id.slice(0, 4)}`,
            type:
              prof?.account_type === 'club'
                ? 'Clube'
                : prof?.account_type === 'coach'
                  ? 'Treinador'
                  : 'Atleta',
            sport: prof?.sport,
          },
          content: p.content || '',
          media: Array.isArray(p.media_urls) ? p.media_urls : [],
          type: (p.post_type as any) || 'text',
          videoUrl: p.video_url || undefined,
          likesCount: likesByPost.get(p.id) || 0,
          commentsCount: commentsByPost.get(p.id) || 0,
          isLiked: userLikedSet.has(p.id),
          createdAt: p.created_at,
          timeAgo: formatRelativeTime(p.created_at),
        }
      })

      return { data: formattedPosts, error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Creates a new post in Supabase with optional media uploads.
   */
  async createPost(params: {
    userId: string
    content: string
    mediaFiles?: File[]
    postType?: 'text' | 'image' | 'video'
  }): Promise<{ data: PostItem | null; error: Error | null }> {
    try {
      const { userId, content, mediaFiles = [], postType = 'text' } = params
      if (!userId) throw new Error('Usuário não autenticado.')
      if (!content.trim() && mediaFiles.length === 0) {
        throw new Error('O post deve conter texto ou mídia.')
      }

      const mediaUrls: string[] = []
      let detectedType = postType

      for (const file of mediaFiles) {
        const isVideo = file.type.startsWith('video/')
        const ext =
          file.name.split('.').pop()?.toLowerCase() || (isVideo ? 'mp4' : 'jpg')
        const filePath = `${userId}/post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`

        const { error: uploadErr } = await supabase.storage
          .from('posts')
          .upload(filePath, file, { upsert: true, contentType: file.type })

        if (uploadErr) throw new Error('Falha no upload: ' + uploadErr.message)

        const { data: pubData } = supabase.storage
          .from('posts')
          .getPublicUrl(filePath)
        mediaUrls.push(pubData.publicUrl)
        if (isVideo) detectedType = 'video'
        else if (detectedType !== 'video') detectedType = 'image'
      }

      const { data: inserted, error: insertErr } = await db
        .from('posts')
        .insert({
          user_id: userId,
          content: content.trim(),
          media_urls: mediaUrls,
          post_type: detectedType,
          video_url:
            detectedType === 'video' && mediaUrls[0] ? mediaUrls[0] : null,
        } as any)
        .select()
        .single()

      if (insertErr) throw insertErr

      // Fetch user profile for display
      const { data: prof } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, account_type, sport')
        .eq('id', userId)
        .maybeSingle()

      const newItem: PostItem = {
        id: inserted.id,
        userId,
        user: {
          id: userId,
          name: prof?.full_name || 'Você',
          avatar:
            prof?.avatar_url ||
            'https://img.usecurling.com/ppl/thumbnail?seed=me',
          type: prof?.account_type || 'Atleta',
          sport: prof?.sport,
        },
        content: inserted.content,
        media: inserted.media_urls || [],
        type: inserted.post_type as any,
        videoUrl: inserted.video_url || undefined,
        likesCount: 0,
        commentsCount: 0,
        isLiked: false,
        createdAt: inserted.created_at,
        timeAgo: 'Agora',
      }

      return { data: newItem, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Deletes a post if owned by the authenticated user.
   */
  async deletePost(
    postId: string,
    userId: string,
  ): Promise<{ error: Error | null }> {
    try {
      const { error } = await db
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', userId)

      if (error) throw error
      return { error: null }
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(String(err)) }
    }
  },

  /**
   * Likes or unlikes a post idempotently.
   */
  async toggleLike(
    postId: string,
    userId: string,
    currentlyLiked: boolean,
  ): Promise<{ isLiked: boolean; error: Error | null }> {
    try {
      if (!userId) throw new Error('Usuário não autenticado.')

      if (currentlyLiked) {
        // Remove like
        const { error } = await db
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId)

        if (error) throw error
        return { isLiked: false, error: null }
      } else {
        // Add like
        const { error } = await db
          .from('post_likes')
          .insert({ post_id: postId, user_id: userId })

        if (
          error &&
          !error.message?.includes('duplicate') &&
          error.code !== '23505'
        ) {
          throw error
        }

        // Notification for post author (non-blocking)
        try {
          const postLink = `/feed?post=${postId}`

          // 1. Fetch post owner
          const { data: postData } = await db
            .from('posts')
            .select('user_id, content')
            .eq('id', postId)
            .maybeSingle()

          // 2. Only notify if author exists and is not the actor
          if (postData?.user_id && postData.user_id !== userId) {
            // 3. Anti-duplication check: check if notification already exists for this actor, author and post link
            const { data: existingNotif } = await db
              .from('notifications')
              .select('id')
              .eq('user_id', postData.user_id)
              .eq('actor_id', userId)
              .eq('type', 'like')
              .eq('link', postLink)
              .limit(1)

            if (!existingNotif || existingNotif.length === 0) {
              const { data: actorProfile } = await db
                .from('profiles')
                .select('full_name')
                .eq('id', userId)
                .maybeSingle()

              const actorName = actorProfile?.full_name || 'Um atleta'

              await db.from('notifications').insert({
                user_id: postData.user_id,
                actor_id: userId,
                type: 'like',
                title: 'Nova Curtida',
                message: `${actorName} curtiu a sua publicação.`,
                link: postLink,
              })
            }
          }
        } catch (notifErr) {
          console.error(
            '[feedService.toggleLike] Falha não bloqueante ao criar notificação de curtida:',
            notifErr,
          )
        }

        return { isLiked: true, error: null }
      }
    } catch (err: any) {
      return {
        isLiked: currentlyLiked,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Gets comments for a given post.
   */
  async getComments(
    postId: string,
  ): Promise<{ data: PostCommentItem[]; error: Error | null }> {
    try {
      const { data: rawComments, error } = await db
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error
      if (!rawComments || rawComments.length === 0)
        return { data: [], error: null }

      const userIds = Array.from(
        new Set(rawComments.map((c: any) => c.user_id)),
      )
      const { data: profiles } = await db
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds)

      const profileMap = new Map<string, any>()
      profiles?.forEach((p) => profileMap.set(p.id, p))

      const comments: PostCommentItem[] = rawComments.map((c) => {
        const prof = profileMap.get(c.user_id)
        return {
          id: c.id,
          postId: c.post_id,
          userId: c.user_id,
          content: c.content,
          createdAt: c.created_at,
          timeAgo: formatRelativeTime(c.created_at),
          user: {
            id: c.user_id,
            name: prof?.full_name || 'Usuário Goplay',
            avatar: prof?.avatar_url || null,
          },
        }
      })

      return { data: comments, error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Adds a new comment.
   */
  async addComment(params: {
    postId: string
    userId: string
    content: string
  }): Promise<{ data: PostCommentItem | null; error: Error | null }> {
    try {
      const { postId, userId, content } = params
      if (!userId) throw new Error('Usuário não autenticado.')
      if (!content.trim()) throw new Error('Comentário não pode estar vazio.')

      const { data: inserted, error: insError } = await db
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: userId,
          content: content.trim(),
        })
        .select()
        .single()

      if (insError) throw insError

      const { data: prof } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', userId)
        .maybeSingle()

      // Notification for post author (resilient and non-blocking for comment insertion)
      try {
        const postLink = `/feed?post=${postId}`

        // 1. Fetch post author
        const { data: postData } = await db
          .from('posts')
          .select('user_id')
          .eq('id', postId)
          .maybeSingle()

        // 2. Only notify if author exists and is not the actor
        if (postData?.user_id && postData.user_id !== userId) {
          const actorName = prof?.full_name || 'Um atleta'
          const trimmedComment = content.trim()
          const preview =
            trimmedComment.length > 50
              ? `${trimmedComment.substring(0, 47)}...`
              : trimmedComment

          await db.from('notifications').insert({
            user_id: postData.user_id,
            actor_id: userId,
            type: 'comment',
            title: 'Novo Comentário',
            message: `${actorName} comentou: "${preview}"`,
            link: postLink,
          })
        }
      } catch (notifErr) {
        console.error(
          '[feedService.addComment] Falha não bloqueante ao criar notificação de comentário:',
          notifErr,
        )
      }

      return {
        data: {
          id: inserted.id,
          postId: inserted.post_id,
          userId: inserted.user_id,
          content: inserted.content,
          createdAt: inserted.created_at,
          timeAgo: 'Agora',
          user: {
            id: userId,
            name: prof?.full_name || 'Você',
            avatar: prof?.avatar_url || null,
          },
        },
        error: null,
      }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Deletes a comment if owned by the user.
   */
  async deleteComment(
    commentId: string,
    userId: string,
  ): Promise<{ error: Error | null }> {
    try {
      const { error } = await db
        .from('post_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', userId)

      if (error) throw error
      return { error: null }
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(String(err)) }
    }
  },
}
