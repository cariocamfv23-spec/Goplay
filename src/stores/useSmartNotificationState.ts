import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SmartNotificationState {
  notifiedIds: string[]
  vipLastViewed: Record<string, number>
  addNotifiedId: (id: string) => void
  hasNotified: (id: string) => boolean
  recordVipView: (id: string, timestamp: number) => void
  canNotifyVip: (id: string, currentTimestamp: number) => boolean
  clearHistory: () => void
}

export const useSmartNotificationState = create<SmartNotificationState>()(
  persist(
    (set, get) => ({
      notifiedIds: [],
      vipLastViewed: {},

      addNotifiedId: (id) =>
        set((state) => {
          if (state.notifiedIds.includes(id)) return state
          return { notifiedIds: [...state.notifiedIds, id] }
        }),

      hasNotified: (id) => get().notifiedIds.includes(id),

      recordVipView: (id, timestamp) =>
        set((state) => ({
          vipLastViewed: { ...state.vipLastViewed, [id]: timestamp },
        })),

      canNotifyVip: (id, currentTimestamp) => {
        const lastViewed = get().vipLastViewed[id]
        if (!lastViewed) return true
        // 2 minutes in milliseconds for demo purposes (120000)
        return currentTimestamp - lastViewed > 120000
      },

      clearHistory: () => set({ notifiedIds: [], vipLastViewed: {} }),
    }),
    {
      name: 'goplay-smart-notifications-storage',
    },
  ),
)
