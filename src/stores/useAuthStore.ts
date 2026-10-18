import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'
import type { ProfileRow } from '@/services/profiles'
import { supabase } from '@/lib/supabase/client'

interface AuthState {
  isAuthenticated: boolean
  hasHydrated: boolean
  user: User | null
  session: Session | null
  profile: ProfileRow | null
  login: () => void
  logout: () => void
  setSession: (session: Session | null) => void
  setProfile: (profile: ProfileRow | null) => void
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  hasHydrated: false, // Initially false until Supabase restores or verifies session
  user: null,
  session: null,
  profile: null,
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    // Also trigger Supabase signOut if still authenticated
    supabase.auth.signOut().catch(() => {})
    set({
      isAuthenticated: false,
      user: null,
      session: null,
      profile: null,
    })
  },
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session?.user,
    }),
  setProfile: (profile) => set({ profile }),
  setHasHydrated: (state) => set({ hasHydrated: state }),
}))

export default useAuthStore
