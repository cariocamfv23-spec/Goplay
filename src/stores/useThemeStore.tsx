import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ColorTheme =
  | 'default'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'rose'

interface ThemeState {
  color: ColorTheme
  setColor: (color: ColorTheme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      color: 'default',
      setColor: (color) => set({ color }),
    }),
    {
      name: 'goplay-theme-storage',
    },
  ),
)
