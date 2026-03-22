import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  hasHydrated: boolean
  login: () => void
  logout: () => void
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  hasHydrated: true, // No persistence, always hydrated immediately
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  setHasHydrated: (state) => set({ hasHydrated: state }),
}))

export default useAuthStore
