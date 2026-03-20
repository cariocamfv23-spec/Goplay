import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PrivacyState {
  isInvisibleMode: boolean
  isPremium: boolean
  toggleInvisibleMode: (enabled: boolean) => void
  upgradeToPremium: () => void
}

export const usePrivacyStore = create<PrivacyState>()(
  persist(
    (set, get) => ({
      isInvisibleMode: false,
      isPremium: false, // Default false to allow demonstration of the upgrade flow
      toggleInvisibleMode: (enabled) => {
        if (get().isPremium) {
          set({ isInvisibleMode: enabled })
        }
      },
      upgradeToPremium: () => set({ isPremium: true }),
    }),
    {
      name: 'goplay-privacy-storage',
    },
  ),
)
