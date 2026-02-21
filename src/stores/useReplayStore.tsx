import { create } from 'zustand'
import { LiveEvent, mockReplays } from '@/lib/data'

interface ReplayState {
  replays: LiveEvent[]
  addReplay: (replay: LiveEvent) => void
}

export const useReplayStore = create<ReplayState>((set) => ({
  replays: mockReplays,
  addReplay: (replay) =>
    set((state) => ({ replays: [replay, ...state.replays] })),
}))
