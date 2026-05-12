import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AlbumState {
  collected: string[]
  unopenedPacks: number
  addPack: () => void
  openPack: (stickers: string[]) => void
}

export const useAlbumStore = create<AlbumState>()(
  persist(
    (set) => ({
      collected: [],
      unopenedPacks: 1, // Start with 1 free pack
      addPack: () =>
        set((state) => ({ unopenedPacks: state.unopenedPacks + 1 })),
      openPack: (newStickers) =>
        set((state) => {
          const uniqueStickers = new Set([...state.collected, ...newStickers])
          return {
            collected: Array.from(uniqueStickers),
            unopenedPacks: Math.max(0, state.unopenedPacks - 1),
          }
        }),
    }),
    { name: 'goplay-album-storage' },
  ),
)
