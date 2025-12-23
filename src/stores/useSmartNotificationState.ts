import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SmartNotificationState {
  notifiedIds: string[]
  addNotifiedId: (id: string) => void
  hasNotified: (id: string) => boolean
  clearHistory: () => void
}

export const useSmartNotificationState = create<SmartNotificationState>()(
  persist(
    (set, get) => ({
      notifiedIds: [],

      addNotifiedId: (id) =>
        set((state) => {
          if (state.notifiedIds.includes(id)) return state
          return { notifiedIds: [...state.notifiedIds, id] }
        }),

      hasNotified: (id) => get().notifiedIds.includes(id),

      clearHistory: () => set({ notifiedIds: [] }),
    }),
    {
      name: 'goplay-smart-notifications-storage',
    },
  ),
)
