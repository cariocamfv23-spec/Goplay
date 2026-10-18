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
  signOut: () => Promise<{ error: any }>
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
      setSession(newSession)
      const currentUser = newSession?.user ?? null
      setUser(currentUser)
      setLoading(false)

      // Sync Zustand store
      useAuthStore.getState().setSession(newSession)
      useAuthStore.getState().setHasHydrated(true)

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
      setSession(initialSession)
      const currentUser = initialSession?.user ?? null
      setUser(currentUser)
      setLoading(false)

      useAuthStore.getState().setSession(initialSession)
      useAuthStore.getState().setHasHydrated(true)

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
      setSession(data.session)
      const currentUser = data.session.user ?? null
      setUser(currentUser)
      setLoading(false)
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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    setProfile(null)
    useAuthStore.getState().logout()
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
