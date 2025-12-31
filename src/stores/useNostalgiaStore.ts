import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type NostalgiaPreset =
  | 'grain'
  | 'retro'
  | 'vhs'
  | '90s'
  | 'analog'
  | 'polaroid'
  | 'pele'
  | 'ali'

interface NostalgiaState {
  isEnabled: boolean
  preset: NostalgiaPreset
  toggle: (enabled: boolean) => void
  setPreset: (preset: NostalgiaPreset) => void
}

export const useNostalgiaStore = create<NostalgiaState>()(
  persist(
    (set) => ({
      isEnabled: false,
      preset: 'retro',
      toggle: (enabled) => set({ isEnabled: enabled }),
      setPreset: (preset) => set({ preset }),
    }),
    {
      name: 'goplay-nostalgia-storage',
    },
  ),
)
