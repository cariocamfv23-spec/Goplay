import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RetroThemeId =
  | 'gold'
  | 'neon'
  | 'ocean'
  | 'fire'
  | 'royal'
  | 'nature'

export interface RetroTheme {
  id: RetroThemeId
  label: string
  gradient: string
  cardGradient: string // Slightly different for the small card
  accent: string
  accentText: string
  glow: string
  ring: string
  button: string
  icon: string
}

export const retroThemes: Record<RetroThemeId, RetroTheme> = {
  gold: {
    id: 'gold',
    label: 'Golden Star',
    gradient: 'bg-gradient-to-br from-primary via-purple-900 to-black',
    cardGradient: 'bg-gradient-to-r from-primary via-purple-800 to-indigo-900',
    accent: 'bg-gold',
    accentText: 'text-gold',
    glow: 'bg-gold/30',
    ring: 'ring-gold',
    button: 'bg-gold text-black hover:bg-gold/90',
    icon: 'text-gold',
  },
  neon: {
    id: 'neon',
    label: 'Cyber Neon',
    gradient: 'bg-gradient-to-br from-fuchsia-900 via-indigo-900 to-black',
    cardGradient:
      'bg-gradient-to-r from-fuchsia-600 via-purple-800 to-blue-900',
    accent: 'bg-cyan-400',
    accentText: 'text-cyan-400',
    glow: 'bg-cyan-400/30',
    ring: 'ring-cyan-400',
    button: 'bg-cyan-400 text-black hover:bg-cyan-400/90',
    icon: 'text-cyan-400',
  },
  ocean: {
    id: 'ocean',
    label: 'Deep Ocean',
    gradient: 'bg-gradient-to-br from-blue-900 via-slate-900 to-black',
    cardGradient: 'bg-gradient-to-r from-blue-600 via-teal-700 to-emerald-900',
    accent: 'bg-teal-300',
    accentText: 'text-teal-300',
    glow: 'bg-teal-300/30',
    ring: 'ring-teal-300',
    button: 'bg-teal-300 text-black hover:bg-teal-300/90',
    icon: 'text-teal-300',
  },
  fire: {
    id: 'fire',
    label: 'Phoenix Fire',
    gradient: 'bg-gradient-to-br from-red-900 via-orange-900 to-black',
    cardGradient: 'bg-gradient-to-r from-red-600 via-orange-700 to-rose-900',
    accent: 'bg-yellow-400',
    accentText: 'text-yellow-400',
    glow: 'bg-yellow-400/30',
    ring: 'ring-yellow-400',
    button: 'bg-yellow-400 text-black hover:bg-yellow-400/90',
    icon: 'text-yellow-400',
  },
  royal: {
    id: 'royal',
    label: 'Royal Velvet',
    gradient: 'bg-gradient-to-br from-violet-900 via-purple-900 to-black',
    cardGradient:
      'bg-gradient-to-r from-indigo-600 via-violet-800 to-fuchsia-900',
    accent: 'bg-purple-300',
    accentText: 'text-purple-300',
    glow: 'bg-purple-300/30',
    ring: 'ring-purple-300',
    button: 'bg-purple-300 text-black hover:bg-purple-300/90',
    icon: 'text-purple-300',
  },
  nature: {
    id: 'nature',
    label: 'Wild Nature',
    gradient: 'bg-gradient-to-br from-green-900 via-emerald-900 to-black',
    cardGradient: 'bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800',
    accent: 'bg-lime-400',
    accentText: 'text-lime-400',
    glow: 'bg-lime-400/30',
    ring: 'ring-lime-400',
    button: 'bg-lime-400 text-black hover:bg-lime-400/90',
    icon: 'text-lime-400',
  },
}

interface RetrospectiveState {
  themeId: RetroThemeId
  setThemeId: (id: RetroThemeId) => void
  getTheme: () => RetroTheme
}

export const useRetrospectiveStore = create<RetrospectiveState>()(
  persist(
    (set, get) => ({
      themeId: 'gold',
      setThemeId: (themeId) => set({ themeId }),
      getTheme: () => retroThemes[get().themeId],
    }),
    {
      name: 'goplay-retrospective-theme',
    },
  ),
)
