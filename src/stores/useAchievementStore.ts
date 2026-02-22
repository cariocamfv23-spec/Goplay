import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ACHIEVEMENTS, AchievementDef } from '@/lib/achievements-data'

interface UserProgress {
  [achievementId: string]: {
    progress: number
    unlockedAt?: string
    status: 'locked' | 'unlocked'
  }
}

interface AchievementState {
  progress: UserProgress
  recentlyUnlocked: AchievementDef | null
  trackAction: (type: string, amount?: number) => void
  clearRecentlyUnlocked: () => void
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      progress: {},
      recentlyUnlocked: null,

      trackAction: (type: string, amount: number = 1) => {
        const { progress } = get()
        const newProgress = { ...progress }
        let newlyUnlocked: AchievementDef | null = null

        const relevantAchievements = ACHIEVEMENTS.filter(
          (a) => a.type === type && a.active,
        )

        let updated = false

        relevantAchievements.forEach((achievement) => {
          const current = newProgress[achievement.id] || {
            progress: 0,
            status: 'locked',
          }

          if (current.status === 'locked') {
            const nextProgress = Math.min(
              current.progress + amount,
              achievement.target,
            )

            if (
              nextProgress >= achievement.target &&
              current.progress < achievement.target
            ) {
              newProgress[achievement.id] = {
                progress: nextProgress,
                status: 'unlocked',
                unlockedAt: new Date().toISOString(),
              }
              newlyUnlocked = achievement
              updated = true
            } else if (nextProgress !== current.progress) {
              newProgress[achievement.id] = {
                ...current,
                progress: nextProgress,
              }
              updated = true
            }
          }
        })

        if (updated) {
          set({
            progress: newProgress,
            ...(newlyUnlocked ? { recentlyUnlocked: newlyUnlocked } : {}),
          })
        }
      },

      clearRecentlyUnlocked: () => set({ recentlyUnlocked: null }),
    }),
    {
      name: 'goplay-achievements',
    },
  ),
)
