import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Competition,
  Certification,
  PassportGoal,
  mockCompetitions,
  mockCertifications,
  mockPassportGoals,
} from '@/lib/data'

interface PassportState {
  competitions: Competition[]
  certifications: Certification[]
  goals: PassportGoal[]
  addCompetition: (competition: Competition) => void
  removeCompetition: (id: string) => void
  verifyCompetition: (id: string) => void
  addCertification: (certification: Certification) => void
  removeCertification: (id: string) => void
  verifyCertification: (id: string) => void
  addGoal: (goal: PassportGoal) => void
  updateGoalStatus: (id: string) => void
  removeGoal: (id: string) => void
}

export const usePassportStore = create<PassportState>()(
  persist(
    (set) => ({
      competitions: mockCompetitions,
      certifications: mockCertifications,
      goals: mockPassportGoals,

      addCompetition: (comp) =>
        set((state) => ({
          competitions: [comp, ...state.competitions],
        })),

      removeCompetition: (id) =>
        set((state) => ({
          competitions: state.competitions.filter((c) => c.id !== id),
        })),

      verifyCompetition: (id) =>
        set((state) => ({
          competitions: state.competitions.map((c) =>
            c.id === id ? { ...c, verified: true } : c,
          ),
        })),

      addCertification: (cert) =>
        set((state) => ({
          certifications: [cert, ...state.certifications],
        })),

      removeCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((c) => c.id !== id),
        })),

      verifyCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.map((c) =>
            c.id === id ? { ...c, verified: true } : c,
          ),
        })),

      addGoal: (goal) =>
        set((state) => ({
          goals: [goal, ...state.goals],
        })),

      updateGoalStatus: (id) =>
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id === id) {
              const nextStatus =
                g.status === 'pending'
                  ? 'in_progress'
                  : g.status === 'in_progress'
                    ? 'achieved'
                    : 'pending'
              return { ...g, status: nextStatus }
            }
            return g
          }),
        })),

      removeGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),
    }),
    {
      name: 'goplay-passport-storage',
    },
  ),
)
