import { create } from "zustand"
import type { Session, User } from "@supabase/supabase-js"
import type { ProfileRow } from "@/services/profiles"
import { supabase } from "@/lib/supabase/client"

interface AuthState {
  isAuthenticated: boolean
  hasHydrated: boolean
  user: User | null
  session: Session | null
  profile: ProfileRow | null
  login: () => void
  logout: (options?: { scope?: "local" | "global" | "others" }) => void
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
  logout: (_options) => {
    // A saída encerra a sessão visual e de memória da aplicação.
    // Quando a biometria está habilitada, a sessão subjacente é protegida pelo bloqueio biométrico (biometricService.lock).
    // O flag hasHydrated permanece true para que a tela de Login não fique em loop de PageLoader.
    try {
      // Limpa cache persistido do feed ao fazer logout para isolamento de dados
      import("@/stores/useFeedStore").then(({ useFeedStore }) => {
        useFeedStore.getState().clearFeed()
      })
    } catch {
      // Ignora falha de import dinâmica
    }

    set({
      isAuthenticated: false,
      user: null,
      session: null,
      profile: null,
      hasHydrated: true,
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
