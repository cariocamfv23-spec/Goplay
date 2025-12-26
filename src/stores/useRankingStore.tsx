import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RankingState {
  lastWeeklyRank: number
  updateLastWeeklyRank: (rank: number) => void
}

export const useRankingStore = create<RankingState>()(
  persist(
    (set) => ({
      lastWeeklyRank: 8, // Set a default initial rank
      updateLastWeeklyRank: (rank) => set({ lastWeeklyRank: rank }),
    }),
    {
      name: 'goplay-ranking-storage',
    },
  ),
)
