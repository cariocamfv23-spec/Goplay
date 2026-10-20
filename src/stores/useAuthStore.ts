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
  logout: (options?: { scope?: 'local' | 'global' | 'others' }) => void
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
  logout: (options) => {
    // Dispara signOut com escopo 'local' por padrão para não invalidar a credencial biométrica do dispositivo
    const scope = options?.scope ?? 'local'
    supabase.auth.signOut({ scope }).catch(() => {})
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
