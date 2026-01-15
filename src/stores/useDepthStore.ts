import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DepthState {
  isEnabled: boolean
  intensity: number
  toggle: (enabled: boolean) => void
  setIntensity: (intensity: number) => void
}

export const useDepthStore = create<DepthState>()(
  persist(
    (set) => ({
      isEnabled: true,
      intensity: 1,
      toggle: (enabled) => set({ isEnabled: enabled }),
      setIntensity: (intensity) => set({ intensity }),
    }),
    {
      name: 'goplay-depth-storage',
    },
  ),
)
