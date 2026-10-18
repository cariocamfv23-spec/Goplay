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
  const loadProfile = async (userId: string) => {
    const { data } = await profileService.getMyProfile(userId)
    setProfile(data)
    useAuthStore.getState().setProfile(data)
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
        // Trigger profile fetch without awaiting inside onAuthStateChange
        loadProfile(currentUser.id)
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
        loadProfile(currentUser.id)
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
    return { data, error }
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
