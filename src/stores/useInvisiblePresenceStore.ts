import { create } from 'zustand'

interface InvisiblePresenceState {
  isActive: boolean
  message: string
  initializeSession: () => void
  clearSession: () => void
}

const motivationalMessages = [
  'O suor de hoje é a vitória de amanhã.',
  'Seu talento merece um palco do tamanho do mundo.',
  'A grandeza exige tempo. Continue focado.',
  'Preparando o seu momento de brilhar...',
  'O seu esporte, levado a sério.',
]

export const useInvisiblePresenceStore = create<InvisiblePresenceState>(
  (set) => ({
    isActive: false,
    message: '',
    initializeSession: () => {
      const msg =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ]
      set({ isActive: true, message: msg })
    },
    clearSession: () => set({ isActive: false }),
  }),
)
