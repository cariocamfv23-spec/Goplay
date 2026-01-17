import { create } from 'zustand'

export type TimelineType = 'real' | 'almost' | 'ideal'
export type SportType = 'football' | 'martial_arts' | 'swimming'

interface TimeShiftState {
  timeline: TimelineType
  sport: SportType
  isPlaying: boolean
  setTimeline: (timeline: TimelineType) => void
  setSport: (sport: SportType) => void
  togglePlay: () => void
  setIsPlaying: (isPlaying: boolean) => void
  cycleTimeline: (direction: 'next' | 'prev') => void
}

export const useTimeShiftStore = create<TimeShiftState>((set, get) => ({
  timeline: 'real',
  sport: 'football',
  isPlaying: true,
  setTimeline: (timeline) => set({ timeline }),
  setSport: (sport) => set({ sport }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  cycleTimeline: (direction) => {
    const timelines: TimelineType[] = ['real', 'almost', 'ideal']
    const currentIndex = timelines.indexOf(get().timeline)
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

    if (nextIndex >= timelines.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = timelines.length - 1

    set({ timeline: timelines[nextIndex] })
  },
}))
