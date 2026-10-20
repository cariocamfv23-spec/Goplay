import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/useAuthStore'
import { profileService, type ProfileRow } from '@/services/profiles'
import { biometricService } from '@/services/biometrics'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: ProfileRow | null
  signUp: (
    email: string,
    password: string,
    metadata?: {
      full_name?: string
      account_type?: 'athlete' | 'club' | 'coach'
    },
  ) => Promise<{ data?: any; error: any }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ data?: any; error: any }>
  signInWithGoogle: (
    redirectPath?: string,
  ) => Promise<{ data?: any; error: any }>
  signOut: (options?: {
    scope?: 'local' | 'global' | 'others'
  }) => Promise<{ error: any }>
  restoreSessionWithTokens: (tokens: {
    access_token: string
    refresh_token: string
  }) => Promise<{ data?: any; error: any }>
  resetPasswordForEmail: (email: string) => Promise<{ error: any }>
  updateUserPassword: (password: string) => Promise<{ error: any }>
  refreshProfile: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<ProfileRow | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch profile whenever user ID changes
  // Returns true if profile exists, false otherwise
  const loadProfile = async (userId: string): Promise<ProfileRow | null> => {
    const { data } = await profileService.getMyProfile(userId)
    setProfile(data)
    useAuthStore.getState().setProfile(data)
    return data
  }

  // Ensure a profile exists for OAuth users (such as Google), even if the trigger had an issue
  const ensureUserProfile = async (currentUser: User) => {
    try {
      const existing = await loadProfile(currentUser.id)
      if (!existing) {
        // Build initial fallback profile from user metadata (Google OAuth fills user_metadata)
        const meta = currentUser.user_metadata || {}
        const fullName =
          meta.full_name ||
          meta.name ||
          currentUser.email?.split('@')[0] ||
          'Atleta Goplay'
        const avatarUrl = meta.avatar_url || meta.picture || null
        const rawAccountType = (meta.account_type || 'athlete').toLowerCase()
        const accountType =
          rawAccountType === 'club' || rawAccountType === 'coach'
            ? rawAccountType
            : 'athlete'

        const { data: created } = await supabase
          .from('profiles')
          .insert({
            id: currentUser.id,
            full_name: fullName,
            avatar_url: avatarUrl,
            account_type: accountType,
          })
          .select()
          .maybeSingle()

        if (created) {
          setProfile(created as unknown as ProfileRow)
          useAuthStore.getState().setProfile(created as unknown as ProfileRow)
        }
      }
    } catch (err) {
      console.warn('Erro ao verificar/criar perfil após login:', err)
    }
  }

  useEffect(() => {
    // 1. Supabase onAuthStateChange listener
    // Note: onAuthStateChange callback must NOT be async/await
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      // Se o dispositivo estiver em modo "bloqueado por biometria" (logout com biometria ativa),
      // não libera a UI autenticada sem que o sensor seja acionado na tela de login
      const isLocked = biometricService.isLocked()

      if (isLocked) {
        setSession(null)
        setUser(null)
        setProfile(null)
        setLoading(false)
        useAuthStore.getState().setSession(null)
        useAuthStore.getState().setProfile(null)
        useAuthStore.getState().setHasHydrated(true)
        if (newSession) {
          biometricService.syncSessionIfEnrolled(newSession)
        }
        return
      }

      setSession(newSession)
      const currentUser = newSession?.user ?? null
      setUser(currentUser)
      setLoading(false)

      // Sync Zustand store
      useAuthStore.getState().setSession(newSession)
      useAuthStore.getState().setHasHydrated(true)

      if (currentUser && newSession?.refresh_token) {
        // Mantém a credencial biométrica sincronizada com os tokens mais recentes da sessão ativa (inclui rotatividade de refresh tokens)
        biometricService.syncSessionIfEnrolled(newSession)
      }

      if (currentUser) {
        // Trigger profile fetch / creation without awaiting inside onAuthStateChange
        ensureUserProfile(currentUser)
      } else {
        setProfile(null)
        useAuthStore.getState().setProfile(null)
      }
    })

    // 2. Initial session restoration
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      const isLocked = biometricService.isLocked()

      if (isLocked) {
        // Preserva o token no Supabase/localStorage para reentrada por sensor, mas oculta a sessão ativa da UI
        setSession(null)
        setUser(null)
        setProfile(null)
        setLoading(false)
        useAuthStore.getState().setSession(null)
        useAuthStore.getState().setProfile(null)
        useAuthStore.getState().setHasHydrated(true)
        if (initialSession) {
          biometricService.syncSessionIfEnrolled(initialSession)
        }
        return
      }

      setSession(initialSession)
      const currentUser = initialSession?.user ?? null
      setUser(currentUser)
      setLoading(false)

      useAuthStore.getState().setSession(initialSession)
      useAuthStore.getState().setHasHydrated(true)

      if (currentUser && initialSession?.refresh_token) {
        biometricService.syncSessionIfEnrolled(initialSession)
      }

      if (currentUser) {
        ensureUserProfile(currentUser)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (
    email: string,
    password: string,
    metadata?: {
      full_name?: string
      account_type?: 'athlete' | 'club' | 'coach'
    },
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/`,
      },
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error && data?.session) {
      // Desbloqueia qualquer lock local prévio
      biometricService.unlock()
      setSession(data.session)
      const currentUser = data.session.user ?? null
      setUser(currentUser)
      setLoading(false)
      // Sincroniza e reativa silenciosamente a credencial biométrica alistada neste aparelho
      biometricService.syncSessionIfEnrolled(data.session, email)
      useAuthStore.getState().setSession(data.session)
      useAuthStore.getState().setHasHydrated(true)
      if (currentUser) {
        loadProfile(currentUser.id)
      }
    }
    return { data, error }
  }

  const signInWithGoogle = async (redirectPath?: string) => {
    try {
      const origin = window.location.origin
      const cleanPath = redirectPath
        ? redirectPath.startsWith('/')
          ? redirectPath
          : `/${redirectPath}`
        : '/home'

      // Store target in localStorage so any OAuth redirect fallback retains the original destination
      try {
        localStorage.setItem('goplay_oauth_redirect', cleanPath)
      } catch {
        // Safe fallback if localStorage is restricted
      }

      // Encode redirect as a query param on the callback url
      const callbackTarget = `${origin}/auth/callback?redirect=${encodeURIComponent(cleanPath)}`

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackTarget,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      })
      return { data, error }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  }

  const restoreSessionWithTokens = async (tokens: {
    access_token: string
    refresh_token: string
  }) => {
    try {
      // 1. Tenta setSession diretamente
      let { data, error } = await supabase.auth.setSession({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      })

      // 2. Fallback caso setSession falhe por access_token expirado: tenta refreshSession com o refresh_token
      if (error || !data?.session) {
        const refreshResult = await supabase.auth.refreshSession({
          refresh_token: tokens.refresh_token,
        })
        if (!refreshResult.error && refreshResult.data?.session) {
          data = refreshResult.data
          error = null
        }
      }

      if (!error && data?.session) {
        // Desbloqueia lock prévio e sincroniza tokens
        biometricService.unlock()
        biometricService.updateSavedSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        })

        setSession(data.session)
        const currentUser = data.session.user ?? null
        setUser(currentUser)
        setLoading(false)
        useAuthStore.getState().setSession(data.session)
        useAuthStore.getState().setHasHydrated(true)
        if (currentUser) {
          loadProfile(currentUser.id)
        }
      } else if (error) {
        // Se a restauração falhar (token inválido/revogado/expirado), marca a credencial para evitar loop
        const isNetworkErr =
          error.message?.includes('network') ||
          error.message?.includes('fetch') ||
          error.status === 0
        if (!isNetworkErr) {
          biometricService.markNeedsReauth(error.message || 'invalid_token')
        }
      }

      return { data, error }
    } catch (err: any) {
      return { data: null, error: err }
    }
  }

  const signOut = async (options?: {
    scope?: 'local' | 'global' | 'others'
  }) => {
    // Se a biometria estiver cadastrada neste aparelho, efetuamos o "bloqueio local":
    // a sessão é protegida no client e exigirá a confirmação pelo sensor físico (Face ID/Touch ID)
    // para ser reaberta, SEM revogar o refresh token no servidor do Supabase.
    // Se a biometria NÃO estiver cadastrada, executamos o signOut completo do Supabase.
    const isEnrolled = biometricService.isEnrolled()
    let error: any = null

    if (isEnrolled) {
      // Bloqueia localmente para reentrada por biometria sem revogar o refresh token
      biometricService.lock()
      // Atualiza o estado da UI imediatamente
      setSession(null)
      setUser(null)
      setProfile(null)
      useAuthStore.getState().logout()
    } else {
      const scope = options?.scope ?? 'local'
      try {
        const res = await supabase.auth.signOut({ scope })
        error = res.error
      } catch (err: any) {
        error = err
      }
      setSession(null)
      setUser(null)
      setProfile(null)
      useAuthStore.getState().logout({ scope })
    }

    return { error }
  }

  const resetPasswordForEmail = async (email: string) => {
    const redirectTo = `${window.location.origin}/reset-password`
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    return { error }
  }

  const updateUserPassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    return { error }
  }

  const refreshProfile = async () => {
    if (user?.id) {
      await loadProfile(user.id)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        restoreSessionWithTokens,
        resetPasswordForEmail,
        updateUserPassword,
        refreshProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
