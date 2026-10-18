import { supabase } from '@/lib/supabase/client'

// Cast to any to query dynamically created public schema tables
const db = supabase as any

export interface FollowUserItem {
  id: string
  name: string
  avatar: string
  type: string
  sport?: string | null
  city?: string | null
  state?: string | null
}

export const connectionService = {
  /**
   * Checks if current user is following target user.
   */
  async isFollowing(
    currentUserId: string,
    targetUserId: string,
  ): Promise<boolean> {
    try {
      if (!currentUserId || !targetUserId || currentUserId === targetUserId) {
        return false
      }

      const { data, error } = await db
        .from('user_follows')
        .select('id')
        .eq('follower_id', currentUserId)
        .eq('following_id', targetUserId)
        .maybeSingle()

      if (error) return false
      return !!data
    } catch {
      return false
    }
  },

  /**
   * Gets follower count and following count for a given user.
   */
  async getCounts(
    userId: string,
  ): Promise<{ followers: number; following: number }> {
    try {
      if (!userId) return { followers: 0, following: 0 }

      const { count: followersCount } = await db
        .from('user_follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId)

      const { count: followingCount } = await db
        .from('user_follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', userId)

      return {
        followers: followersCount || 0,
        following: followingCount || 0,
      }
    } catch {
      return { followers: 0, following: 0 }
    }
  },

  /**
   * Follows a target user safely and returns new status.
   */
  async follow(
    followerId: string,
    followingId: string,
  ): Promise<{ success: boolean; error: Error | null }> {
    try {
      if (!followerId) throw new Error('Usuário não autenticado.')
      if (followerId === followingId)
        throw new Error('Você não pode seguir seu próprio perfil.')

      const { error } = await db
        .from('user_follows')
        .insert({ follower_id: followerId, following_id: followingId })

      if (error && !error.message.includes('duplicate')) {
        throw error
      }

      // Automatically register a notification for the followed user
      try {
        const { data: followerProf } = await db
          .from('profiles')
          .select('full_name')
          .eq('id', followerId)
          .maybeSingle()

        await db.from('notifications').insert({
          user_id: followingId,
          actor_id: followerId,
          type: 'follow',
          title: 'Novo Seguidor',
          message: `${followerProf?.full_name || 'Um atleta'} começou a seguir você no Goplay!`,
          link: `/profile/${followerId}`,
        })
      } catch {
        // notification non-blocking
      }

      return { success: true, error: null }
    } catch (err: any) {
      return {
        success: false,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Unfollows a target user safely.
   */
  async unfollow(
    followerId: string,
    followingId: string,
  ): Promise<{ success: boolean; error: Error | null }> {
    try {
      if (!followerId) throw new Error('Usuário não autenticado.')

      const { error } = await db
        .from('user_follows')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId)

      if (error) throw error
      return { success: true, error: null }
    } catch (err: any) {
      return {
        success: false,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Lists followers of a profile.
   */
  async getFollowers(userId: string): Promise<FollowUserItem[]> {
    try {
      const { data, error } = await db
        .from('user_follows')
        .select('follower_id')
        .eq('following_id', userId)

      if (error || !data || data.length === 0) return []

      const userIds = data.map((d: any) => d.follower_id)
      const { data: profiles } = await db
        .from('profiles')
        .select('id, full_name, avatar_url, account_type, sport, city, state')
        .in('id', userIds)

      return (
        profiles?.map((p: any) => ({
          id: p.id,
          name: p.full_name || 'Usuário',
          avatar:
            p.avatar_url ||
            `https://img.usecurling.com/ppl/thumbnail?seed=${p.id.slice(0, 4)}`,
          type: p.account_type,
          sport: p.sport,
          city: p.city,
          state: p.state,
        })) || []
      )
    } catch {
      return []
    }
  },

  /**
   * Lists users that this profile is following.
   */
  async getFollowing(userId: string): Promise<FollowUserItem[]> {
    try {
      const { data, error } = await db
        .from('user_follows')
        .select('following_id')
        .eq('follower_id', userId)

      if (error || !data || data.length === 0) return []

      const userIds = data.map((d: any) => d.following_id)
      const { data: profiles } = await db
        .from('profiles')
        .select('id, full_name, avatar_url, account_type, sport, city, state')
        .in('id', userIds)

      return (
        profiles?.map((p: any) => ({
          id: p.id,
          name: p.full_name || 'Usuário',
          avatar:
            p.avatar_url ||
            `https://img.usecurling.com/ppl/thumbnail?seed=${p.id.slice(0, 4)}`,
          type: p.account_type,
          sport: p.sport,
          city: p.city,
          state: p.state,
        })) || []
      )
    } catch {
      return []
    }
  },
}
