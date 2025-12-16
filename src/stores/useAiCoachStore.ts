import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FeedbackType = 'verbal' | 'visual' | 'all'
export type FeedbackDetail = 'summary' | 'detailed'
export type FeedbackFrequency = 'realtime' | 'end_of_set' | 'end_of_session'

interface AiCoachState {
  preferences: {
    feedbackType: FeedbackType
    feedbackDetail: FeedbackDetail
    feedbackFrequency: FeedbackFrequency
    enabledInArena: boolean
    voiceEnabled: boolean
    emotionDetectionEnabled: boolean
  }
  setPreference: <K extends keyof AiCoachState['preferences']>(
    key: K,
    value: AiCoachState['preferences'][K],
  ) => void
  resetPreferences: () => void
}

export const useAiCoachStore = create<AiCoachState>()(
  persist(
    (set) => ({
      preferences: {
        feedbackType: 'all',
        feedbackDetail: 'detailed',
        feedbackFrequency: 'realtime',
        enabledInArena: true,
        voiceEnabled: true,
        emotionDetectionEnabled: true,
      },
      setPreference: (key, value) =>
        set((state) => ({
          preferences: { ...state.preferences, [key]: value },
        })),
      resetPreferences: () =>
        set({
          preferences: {
            feedbackType: 'all',
            feedbackDetail: 'detailed',
            feedbackFrequency: 'realtime',
            enabledInArena: true,
            voiceEnabled: true,
            emotionDetectionEnabled: true,
          },
        }),
    }),
    {
      name: 'goplay-ai-coach-storage',
    },
  ),
)
