import { supabase } from '@/lib/supabase/client'

const db = supabase as any

export interface NotificationItem {
  id: string
  userId: string
  actorId?: string | null
  type: string
  title: string
  message: string
  link?: string | null
  read: boolean
  createdAt: string
  timeAgo: string
  actor?: {
    id: string
    name: string
    avatar: string
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
    return d.toLocaleDateString('pt-BR')
  } catch {
    return 'Recente'
  }
}

export const notificationService = {
  /**
   * Fetches persisted notifications for the logged-in user.
   */
  async getMyNotifications(userId: string): Promise<NotificationItem[]> {
    try {
      if (!userId) return []

      const { data, error } = await db
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error || !data) return []

      const actorIds = Array.from(
        new Set(data.map((n) => n.actor_id).filter(Boolean)),
      ) as string[]

      const profMap = new Map<string, any>()
      if (actorIds.length > 0) {
        const { data: actors } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', actorIds)

        actors?.forEach((a) => profMap.set(a.id, a))
      }

      return data.map((n) => {
        const actor = n.actor_id ? profMap.get(n.actor_id) : null
        return {
          id: n.id,
          userId: n.user_id,
          actorId: n.actor_id,
          type: n.type,
          title: n.title,
          message: n.message,
          link: n.link,
          read: n.read,
          createdAt: n.created_at,
          timeAgo: formatRelativeTime(n.created_at),
          actor: actor
            ? {
                id: actor.id,
                name: actor.full_name,
                avatar: actor.avatar_url,
              }
            : undefined,
        }
      })
    } catch {
      return []
    }
  },

  /**
   * Marks a notification as read.
   */
  async markAsRead(notificationId: string, userId: string): Promise<void> {
    try {
      await db
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', userId)
    } catch {
      /* intentionally ignored */
    }
  },

  /**
   * Marks all notifications as read for current user.
   */
  async markAllAsRead(userId: string): Promise<void> {
    try {
      await db
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
    } catch {
      /* intentionally ignored */
    }
  },
}
