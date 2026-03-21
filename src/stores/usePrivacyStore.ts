import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PrivacyState {
  isInvisibleMode: boolean
  isPremium: boolean
  isPreviewLocked: boolean
  toggleInvisibleMode: (enabled: boolean) => void
  upgradeToPremium: () => void
  setIsPreviewLocked: (locked: boolean) => void
}

export const usePrivacyStore = create<PrivacyState>()(
  persist(
    (set, get) => ({
      isInvisibleMode: false,
      isPremium: false, // Default false to allow demonstration of the upgrade flow
      isPreviewLocked: true, // Default true to demonstrate the paywall
      toggleInvisibleMode: (enabled) => {
        if (get().isPremium) {
          set({ isInvisibleMode: enabled })
        }
      },
      upgradeToPremium: () => set({ isPremium: true, isPreviewLocked: false }),
      setIsPreviewLocked: (locked) => set({ isPreviewLocked: locked }),
    }),
    {
      name: 'goplay-privacy-storage',
    },
  ),
)
