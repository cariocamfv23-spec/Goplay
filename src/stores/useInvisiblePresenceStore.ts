import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface InvisiblePresenceState {
  // Ephemeral state (not persisted to ensure zero footprint of events)
  isVisible: boolean
  message: string | null

  // Usage tracking (persisted to identify patterns)
  totalSessions: number
  lastSessionTime: number
  dailySessions: number
  lastDailyReset: number

  // Actions
  initializeSession: () => void
  hide: () => void
}

const REFLECTIVE_MESSAGES = [
  'O descanso também faz parte do treino.',
  'Lembre-se do porquê você começou.',
  'Respire fundo. O foco está no agora.',
  'Seu corpo é seu templo. Cuide dele.',
  'A vitória é construída no silêncio.',
  'O equilíbrio é a chave da performance.',
  'Desconecte-se para reconectar.',
  'Acalme a mente, fortaleça o espírito.',
  'Você é maior que seus resultados.',
  'A jornada importa mais que o destino.',
  'Escute o seu ritmo, não o barulho lá fora.',
  'A constância vence a intensidade.',
]

export const useInvisiblePresenceStore = create<InvisiblePresenceState>()(
  persist(
    (set, get) => ({
      isVisible: false,
      message: null,
      totalSessions: 0,
      lastSessionTime: Date.now(),
      dailySessions: 0,
      lastDailyReset: Date.now(),

      initializeSession: () => {
        const now = Date.now()
        const state = get()

        // Daily Reset Logic
        let newDailySessions = state.dailySessions
        const oneDay = 24 * 60 * 60 * 1000
        if (now - state.lastDailyReset > oneDay) {
          newDailySessions = 0
          set({ lastDailyReset: now })
        }

        // Increment stats
        set({
          totalSessions: state.totalSessions + 1,
          lastSessionTime: now,
          dailySessions: newDailySessions + 1,
        })

        // Silent Latent Trigger Logic
        // We only trigger if the overlay is not already visible
        if (get().isVisible) return

        const chance = Math.random()
        let shouldTrigger = false
        let selectedMessage = ''

        // 1. Overload Trigger: High daily usage (> 8 sessions)
        // Probability: 10%
        if (newDailySessions > 8 && chance < 0.1) {
          shouldTrigger = true
          selectedMessage =
            'Desconecte-se para reconectar. O descanso recupera o foco.'
        }
        // 2. Pause/Return Trigger: User returns after > 48h
        // Probability: 20%
        else if (
          now - state.lastSessionTime > 2 * oneDay &&
          state.totalSessions > 5 &&
          chance < 0.2
        ) {
          shouldTrigger = true
          selectedMessage = 'Que bom que você voltou. Respire e siga seu ritmo.'
        }
        // 3. Balance Trigger: Purely random moment of reflection
        // Probability: 2% (Rare)
        else if (chance < 0.02) {
          shouldTrigger = true
          const randomIndex = Math.floor(
            Math.random() * REFLECTIVE_MESSAGES.length,
          )
          selectedMessage = REFLECTIVE_MESSAGES[randomIndex]
        }

        if (shouldTrigger) {
          set({ isVisible: true, message: selectedMessage })
        }
      },

      hide: () => set({ isVisible: false, message: null }),
    }),
    {
      name: 'goplay-invisible-presence',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Privacy: Only persist usage patterns, NEVER the event history
        totalSessions: state.totalSessions,
        lastSessionTime: state.lastSessionTime,
        dailySessions: state.dailySessions,
        lastDailyReset: state.lastDailyReset,
      }),
    },
  ),
)
