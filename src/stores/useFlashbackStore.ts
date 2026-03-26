import { create } from 'zustand'

interface FlashbackState {
  isOpen: boolean
  memoryId: string | null
  notificationId?: string
  openFlashback: (id: string, notificationId?: string) => void
  closeFlashback: () => void
}

export const useFlashbackStore = create<FlashbackState>((set) => ({
  isOpen: false,
  memoryId: null,
  notificationId: undefined,
  openFlashback: (id, notificationId) =>
    set({ isOpen: true, memoryId: id, notificationId }),
  closeFlashback: () =>
    set({ isOpen: false, memoryId: null, notificationId: undefined }),
}))
