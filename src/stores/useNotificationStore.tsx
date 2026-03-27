import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Notification as BaseNotification,
  mockNotificationsList,
} from '@/lib/data'
import useSoundStore from './useSoundStore'

export type Notification = BaseNotification & {
  avatarUrl?: string
  imageUrl?: string
  suggestedUserId?: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (
    notification: Omit<Notification, 'id' | 'read' | 'date' | 'time'> & {
      time?: string
    },
  ) => string
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

// Enhance mock notifications with avatarUrl for friend suggestions
const enhancedMockNotifications: Notification[] = mockNotificationsList.map(
  (not) => {
    if (not.type === 'friend_suggestion') {
      return {
        ...not,
        avatarUrl:
          (not as any).avatarUrl ||
          (not as any).imageUrl ||
          not.user?.avatar ||
          `https://img.usecurling.com/ppl/thumbnail?seed=${not.id}`,
      }
    }
    return not
  },
)

const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: enhancedMockNotifications,
      unreadCount: enhancedMockNotifications.filter((n) => !n.read).length,

      addNotification: (data) => {
        const id = Math.random().toString(36).substring(2, 9)
        set((state) => {
          const newNotification: Notification = {
            ...data,
            id,
            time: data.time || 'Agora',
            date: 'Hoje',
            read: false,
          }

          if (data.type === 'weather') {
            useSoundStore.getState().playTone('weather')
          } else if (
            data.type === 'system' ||
            data.type === 'verification' ||
            data.priority === 'critical' ||
            data.priority === 'high'
          ) {
            useSoundStore.getState().playTone('system')
          } else {
            useSoundStore.getState().playTone('engagement')
          }

          const updatedNotifications = [newNotification, ...state.notifications]

          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.read).length,
          }
        })
        return id
      },

      markAsRead: (id) =>
        set((state) => {
          const updated = state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          )
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.read).length,
          }
        }),

      markAllAsRead: () =>
        set((state) => {
          const updated = state.notifications.map((n) => ({ ...n, read: true }))
          return {
            notifications: updated,
            unreadCount: 0,
          }
        }),
    }),
    {
      name: 'goplay-notifications-storage',
      merge: (persistedState: any, currentState) => {
        const persisted = persistedState?.notifications || []
        const currentMocks = currentState.notifications || []

        // Smart Persistence Logic: Merge without overwriting unread memory notifications.
        // Prevents over-filtering when loading the application.
        const existingIds = new Set(persisted.map((n: any) => n.id))
        const newMocks = currentMocks.filter((n: any) => !existingIds.has(n.id))

        const mergedNotifications = [...persisted, ...newMocks]

        return {
          ...currentState,
          ...persistedState,
          notifications: mergedNotifications,
          unreadCount: mergedNotifications.filter((n: any) => !n.read).length,
        }
      },
    },
  ),
)

export default useNotificationStore
