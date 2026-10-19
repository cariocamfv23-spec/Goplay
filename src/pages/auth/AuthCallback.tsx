import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/useAuthStore'
import { profileService, type ProfileRow } from '@/services/profiles'
import { PageLoader } from '@/components/PageLoader'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { SportsWallpaper } from '@/components/SportsWallpaper'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    const handleCallback = async () => {
      // 1. Check for error parameters in URL query or hash fragment
      const searchParams = new URLSearchParams(window.location.search)
      const hash = window.location.hash.startsWith('#')
        ? window.location.hash.substring(1)
        : window.location.hash
      const hashParams = new URLSearchParams(hash)

      const error =
        searchParams.get('error') ||
        hashParams.get('error') ||
        searchParams.get('error_code') ||
        hashParams.get('error_code')

      const errorDescription =
        searchParams.get('error_description') ||
        hashParams.get('error_description')

      if (error) {
        let userFriendlyError =
          'Não foi possível concluir o login com o Google.'
        if (
          error === 'access_denied' ||
          errorDescription?.includes('access_denied')
        ) {
          userFriendlyError = 'Login cancelado por você no Google.'
        } else if (
          errorDescription?.includes('provider is not enabled') ||
          errorDescription?.includes('Unsupported provider')
        ) {
          userFriendlyError =
            'O provedor Google ainda não foi ativado nas configurações do Supabase.'
        } else if (errorDescription) {
          userFriendlyError = decodeURIComponent(
            errorDescription.replace(/\+/g, ' '),
          )
        }

        if (!isCancelled) {
          setErrorMessage(userFriendlyError)
          toast.error(userFriendlyError)
        }
        return
      }

      // Determine where the user intended to go
      let targetPath = '/home'
      const redirectQuery = searchParams.get('redirect')
      const storedRedirect = localStorage.getItem('goplay_oauth_redirect')

      if (redirectQuery && redirectQuery.startsWith('/')) {
        targetPath = redirectQuery
      } else if (storedRedirect && storedRedirect.startsWith('/')) {
        targetPath = storedRedirect
      }
      try {
        localStorage.removeItem('goplay_oauth_redirect')
      } catch {
        // ignore
      }

      try {
        // 2. Hydrate session from URL hash or code exchange
        // Supabase client handles #access_token automatically, but we ensure session is loaded
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        if (!session?.user) {
          // Retry briefly if the client is still parsing the hash
          await new Promise((res) => setTimeout(res, 500))
          const { data: retryData } = await supabase.auth.getSession()
          if (!retryData.session?.user) {
            if (!isCancelled) {
              setErrorMessage(
                'Sessão não identificada no retorno da autenticação.',
              )
            }
            return
          }
        }

        const activeSession = (await supabase.auth.getSession()).data.session
        if (!activeSession?.user) {
          if (!isCancelled) {
            setErrorMessage('Sessão expirada ou inválida.')
          }
          return
        }

        const user = activeSession.user

        // 3. Immediately hydrate Zustand store to prevent race conditions in ProtectedRoute
        useAuthStore.getState().setSession(activeSession)
        useAuthStore.getState().setHasHydrated(true)

        // 4. Ensure profile exists in public.profiles
        const { data: existingProfile } = await profileService.getMyProfile(
          user.id,
        )
        let isFirstTimeUser = false

        if (!existingProfile) {
          isFirstTimeUser = true
          const meta = user.user_metadata || {}
          const fullName =
            meta.full_name ||
            meta.name ||
            user.email?.split('@')[0] ||
            'Atleta Goplay'
          const avatarUrl = meta.avatar_url || meta.picture || null
          const rawAccountType = (meta.account_type || 'athlete').toLowerCase()
          const accountType =
            rawAccountType === 'club' || rawAccountType === 'coach'
              ? rawAccountType
              : 'athlete'

          const { data: newProfile } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              full_name: fullName,
              avatar_url: avatarUrl,
              account_type: accountType,
            })
            .select()
            .maybeSingle()

          if (newProfile) {
            useAuthStore
              .getState()
              .setProfile(newProfile as unknown as ProfileRow)
          }
        } else {
          useAuthStore.getState().setProfile(existingProfile)
        }

        // 5. Clean up OAuth URL fragment (#access_token=...) and query parameters from history
        if (window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname)
        }

        toast.success('Login com Google concluído com sucesso!')

        // 6. Navigation: do a full page reload / navigation (window.location.replace)
        // This ensures the entire application, CSS stylesheets, layout shell, fonts, and theme tokens
        // bootstrap completely from zero, avoiding SPA style hydration issues after returning from Google OAuth.
        const destination =
          isFirstTimeUser && targetPath === '/home' ? '/onboarding' : targetPath

        // If replaceState is available, clean up the address bar first before reloading to clean destination
        try {
          window.location.replace(destination)
        } catch {
          window.location.href = destination
        }
      } catch (err: any) {
        if (!isCancelled) {
          console.error('Erro no callback OAuth:', err)
          const msg =
            err?.message || 'Erro ao processar autenticação com Google.'
          setErrorMessage(msg)
          toast.error(msg)
        }
      }
    }

    handleCallback()

    return () => {
      isCancelled = true
    }
  }, [navigate])

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <SportsWallpaper />
        <div className="relative z-10 w-full max-w-md">
          <Card className="border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">Falha no Login com Google</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {errorMessage}
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Button
                  onClick={() => navigate('/login', { replace: true })}
                  className="w-full font-bold"
                >
                  Voltar ao Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/', { replace: true })}
                  className="w-full"
                >
                  Página Inicial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return <PageLoader />
}
