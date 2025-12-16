import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Goal, mockGoals } from '@/lib/data'

interface GoalState {
  goals: Goal[]
  addGoal: (
    goal: Omit<Goal, 'id' | 'createdAt' | 'status' | 'progress'>,
  ) => void
  updateGoal: (id: string, data: Partial<Goal>) => void
  deleteGoal: (id: string) => void
  completeGoal: (id: string) => void
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set) => ({
      goals: mockGoals,
      addGoal: (data) =>
        set((state) => {
          const newGoal: Goal = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            status: 'active',
            progress: 0,
            createdAt: new Date().toISOString(),
          }
          return { goals: [newGoal, ...state.goals] }
        }),
      updateGoal: (id, data) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...data } : goal,
          ),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),
      completeGoal: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? { ...goal, status: 'completed', progress: 100 }
              : goal,
          ),
        })),
    }),
    {
      name: 'goplay-goal-storage',
    },
  ),
)
