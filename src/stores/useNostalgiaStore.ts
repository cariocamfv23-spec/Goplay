import { useSyncExternalStore } from 'react'

export type NostalgiaPreset =
  | 'vhs'
  | '90s'
  | 'cassette'
  | 'retro'
  | 'pele'
  | 'ali'
  | 'digital'
  | 'analog'
  | 'polaroid'
  | 'grain'

interface NostalgiaState {
  isEnabled: boolean
  preset: NostalgiaPreset
  intensity: number
}

const initialState: NostalgiaState = {
  isEnabled: false,
  preset: 'vhs',
  intensity: 1,
}

let state = { ...initialState }
const listeners = new Set<() => void>()

const store = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  setState: (newState: Partial<NostalgiaState>) => {
    state = { ...state, ...newState }
    listeners.forEach((listener) => listener())
  },
  toggle: () => {
    store.setState({ isEnabled: !state.isEnabled })
  },
  setPreset: (preset: NostalgiaPreset) => {
    store.setState({ preset })
  },
  setIntensity: (intensity: number) => {
    store.setState({ intensity })
  },
}

export const useNostalgiaStore = () => {
  const state = useSyncExternalStore(store.subscribe, store.getState)
  return {
    ...state,
    toggle: store.toggle,
    setPreset: store.setPreset,
    setIntensity: store.setIntensity,
  }
}

export default useNostalgiaStore
