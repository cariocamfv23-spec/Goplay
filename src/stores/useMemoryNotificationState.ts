import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MemoryNotificationState {
  lastNotifiedDate: string | null
  setLastNotifiedDate: (date: string) => void
}

export const useMemoryNotificationState = create<MemoryNotificationState>()(
  persist(
    (set) => ({
      lastNotifiedDate: null,
      setLastNotifiedDate: (date) => set({ lastNotifiedDate: date }),
    }),
    {
      name: 'goplay-memory-notifications-storage',
    },
  ),
)
