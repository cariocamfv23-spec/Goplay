import { create } from 'zustand'

interface FlashbackState {
  isOpen: boolean
  memoryId: string | null
  openFlashback: (id: string) => void
  closeFlashback: () => void
}

export const useFlashbackStore = create<FlashbackState>((set) => ({
  isOpen: false,
  memoryId: null,
  openFlashback: (id) => set({ isOpen: true, memoryId: id }),
  closeFlashback: () => set({ isOpen: false, memoryId: null }),
}))
