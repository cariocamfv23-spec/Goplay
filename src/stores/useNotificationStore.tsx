import { create } from 'zustand'
import { Notification, mockNotificationsList } from '@/lib/data'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (
    notification: Omit<Notification, 'id' | 'read' | 'date' | 'time'> & {
      time?: string
    },
  ) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotificationsList,
  unreadCount: mockNotificationsList.filter((n) => !n.read).length,

  addNotification: (data) =>
    set((state) => {
      const newNotification: Notification = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        time: data.time || 'Agora',
        date: 'Hoje',
        read: false,
      }
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }
    }),

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
}))

export default useNotificationStore
