import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BolaoState {
  hasWon: boolean
  wonTeam: string | null
  setWon: (team: string) => void
  claimPrize: () => void
}

export const useBolaoStore = create<BolaoState>()(
  persist(
    (set) => ({
      hasWon: false,
      wonTeam: null,
      setWon: (team) => set({ hasWon: true, wonTeam: team }),
      claimPrize: () => set({ hasWon: false, wonTeam: null }),
    }),
    {
      name: 'goplay-bolao-storage',
    },
  ),
)
