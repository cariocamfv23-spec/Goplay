import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockCurrentUser, Scholarship } from '@/lib/data'
import useNotificationStore from '@/stores/useNotificationStore'

interface ScholarshipPreferences {
  notifications: boolean
}

interface ScholarshipState {
  preferences: ScholarshipPreferences
  notifiedIds: string[]
  toggleNotifications: (enabled: boolean) => void
  checkMatchAndNotify: (scholarship: Scholarship) => void
  resetNotifications: () => void
}

export const useScholarshipStore = create<ScholarshipState>()(
  persist(
    (set, get) => ({
      preferences: {
        notifications: true,
      },
      notifiedIds: [],

      toggleNotifications: (enabled) =>
        set((state) => ({
          preferences: { ...state.preferences, notifications: enabled },
        })),

      resetNotifications: () => set({ notifiedIds: [] }),

      checkMatchAndNotify: (scholarship) => {
        const { preferences, notifiedIds } = get()

        if (!preferences.notifications) return
        if (notifiedIds.includes(scholarship.id)) return

        // Simple matching logic based on sport
        const userSport = mockCurrentUser.sport
        const isMatch =
          scholarship.sport?.toLowerCase() === userSport?.toLowerCase()

        if (isMatch) {
          // Add notification
          useNotificationStore.getState().addNotification({
            title: 'Nova Bolsa Compatível!',
            message: `Nova oportunidade de bolsa para ${scholarship.sport} na ${scholarship.university}.`,
            type: 'scholarship',
            link: `/explore/scholarships/${scholarship.id}`,
            priority: 'high',
          })

          // Mark as notified to avoid duplicates
          set({ notifiedIds: [...notifiedIds, scholarship.id] })
        }
      },
    }),
    {
      name: 'goplay-scholarship-storage',
    },
  ),
)
