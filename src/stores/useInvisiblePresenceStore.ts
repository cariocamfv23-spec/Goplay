import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface InvisiblePresenceState {
  isVisible: boolean
  message: string | null
  recentOpens: number[] // Timestamp of opens in last 5 mins
  lastTriggerTime: number // To prevent spamming

  initializeSession: () => void
  hide: () => void
}

const MESSAGES = [
  'Respect your rest as much as your training.',
  'The goal is the path, not just the finish line.',
  'Great performance starts with a quiet mind.',
  'Disconnect to reconnect.',
  'Silence is part of the strategy.',
  'Recovery is where growth happens.',
  'Listen to your rhythm, not the noise.',
  'Calm mind, strong body.',
]

export const useInvisiblePresenceStore = create<InvisiblePresenceState>()(
  persist(
    (set, get) => ({
      isVisible: false,
      message: null,
      recentOpens: [],
      lastTriggerTime: 0,

      initializeSession: () => {
        const now = Date.now()
        const state = get()

        // 1. Prune old opens (older than 5 mins)
        // 5 minutes = 5 * 60 * 1000 = 300000 ms
        const fiveMinutesAgo = now - 5 * 60 * 1000
        const activeOpens = state.recentOpens.filter((t) => t > fiveMinutesAgo)

        // 2. Add current open
        const updatedOpens = [...activeOpens, now]
        set({ recentOpens: updatedOpens })

        // 3. Silent Latent Trigger Logic
        // We only trigger if the overlay is not already visible
        if (state.isVisible) return

        let shouldTrigger = false
        let selectedMessage = ''
        const chance = Math.random() // 0.0 to 1.0

        // Trigger 1: High Frequency (> 3 times in 5 mins)
        // "more than 3 times" means 4 or more.
        const isHighFreq = updatedOpens.length > 3

        // Trigger 2: Late Night (11 PM - 4 AM)
        const hour = new Date().getHours()
        const isLateNight = hour >= 23 || hour < 4

        // Rarity Logic: 10% chance when conditions are met
        // We also check if we triggered recently (e.g., in the last 10 minutes) to avoid back-to-back
        const tenMinutesAgo = now - 10 * 60 * 1000
        const notRecentlyTriggered = state.lastTriggerTime < tenMinutesAgo

        if (
          (isHighFreq || isLateNight) &&
          chance < 0.1 &&
          notRecentlyTriggered
        ) {
          shouldTrigger = true
          // Select random message
          selectedMessage =
            MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
        }

        if (shouldTrigger) {
          set({
            isVisible: true,
            message: selectedMessage,
            lastTriggerTime: now,
          })
        }
      },

      hide: () => set({ isVisible: false, message: null }),
    }),
    {
      name: 'goplay-invisible-presence-v2', // Storage name updated for new logic
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Privacy: Only persist usage patterns (timestamps), never the ephemeral state
        recentOpens: state.recentOpens,
        lastTriggerTime: state.lastTriggerTime,
      }),
    },
  ),
)
