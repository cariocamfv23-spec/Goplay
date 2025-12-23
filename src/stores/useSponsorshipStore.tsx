import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useNotificationStore from '@/stores/useNotificationStore'

export type CriteriaType = 'brand' | 'posts' | 'uniform' | 'promo'

interface SponsorshipMatch {
  profileId: string | number
  status: 'pending' | 'accepted' | 'rejected'
  timestamp: string
  criteria: CriteriaType[]
}

interface SponsorshipState {
  selectedCriteria: CriteriaType[]
  matches: SponsorshipMatch[]
  toggleCriteria: (criteria: CriteriaType) => void
  requestMatch: (profileId: string | number) => void
  isMatched: (profileId: string | number) => boolean
}

export const useSponsorshipStore = create<SponsorshipState>()(
  persist(
    (set, get) => ({
      selectedCriteria: [],
      matches: [],

      toggleCriteria: (criteria) =>
        set((state) => {
          const exists = state.selectedCriteria.includes(criteria)
          return {
            selectedCriteria: exists
              ? state.selectedCriteria.filter((c) => c !== criteria)
              : [...state.selectedCriteria, criteria],
          }
        }),

      requestMatch: (profileId) => {
        const { selectedCriteria } = get()
        set((state) => ({
          matches: [
            ...state.matches,
            {
              profileId,
              status: 'pending',
              timestamp: new Date().toISOString(),
              criteria: selectedCriteria,
            },
          ],
        }))

        // Trigger notification
        useNotificationStore.getState().addNotification({
          title: 'Solicitação Enviada',
          message: 'Sua proposta de patrocínio foi enviada com sucesso.',
          type: 'sponsorship_match',
          priority: 'medium',
        })
      },

      isMatched: (profileId) => {
        return get().matches.some((m) => m.profileId === profileId)
      },
    }),
    {
      name: 'goplay-sponsorship-storage',
    },
  ),
)
