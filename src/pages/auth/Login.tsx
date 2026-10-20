import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Logo } from '@/components/Logo'
import {
  Loader2,
  User,
  Lock,
  ArrowRight,
  Github,
  Fingerprint,
} from 'lucide-react'
import { toast } from 'sonner'
import { SportsWallpaper } from '@/components/SportsWallpaper'
import { useAuthStore } from '@/stores/useAuthStore'
import { useAuth } from '@/hooks/use-auth'
import { PageLoader } from '@/components/PageLoader'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import {
  biometricService,
  type BiometricCredentialData,
} from '@/services/biometrics'
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, hasHydrated } = useAuthStore()
  const { signIn, signInWithGoogle, restoreSessionWithTokens } = useAuth()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [biometricLoading, setBiometricLoading] = useState(false)
  const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(false)
  const [enrolledBiometric, setEnrolledBiometric] =
    useState<BiometricCredentialData | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  // Redirect to home or redirect target if already authenticated, preventing the display of the guest UI
  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      const params = new URLSearchParams(window.location.search)
      const redirectParam = params.get('redirect')
      let target = '/home'
      if (redirectParam) {
        try {
          const decoded = decodeURIComponent(redirectParam)
          if (decoded.startsWith('/')) {
            target = decoded
          }
        } catch {
          if (redirectParam.startsWith('/')) {
            target = redirectParam
          }
        }
      }
      navigate(target, { replace: true })
    }
  }, [hasHydrated, isAuthenticated, navigate])

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('Skip@Pass')
    toast.info(`Credenciais da conta de demonstração preenchidas.`, {
      description: 'Clique em "Entrar com E-mail" para acessar.',
    })
  }

  // Load saved credentials and biometric status on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('goplay_email')
    const savedPassword = localStorage.getItem('goplay_password')
    const savedRemember = localStorage.getItem('goplay_remember') === 'true'

    if (savedRemember && savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
      if (savedPassword) setPassword(savedPassword)
    }

    // Checar suporte e alistamento biométrico neste aparelho
    const supported = biometricService.isWebAuthnSupported()
    setIsWebAuthnSupported(supported)
    const enrolled = biometricService.getEnrolledCredential()
    setEnrolledBiometric(enrolled)

    // Se a credencial cadastrada pertencer a um usuário, preenche o e-mail previamente para facilitar a reativação
    if (enrolled?.userEmail) {
      setEmail((prev) => prev || enrolled.userEmail)
    }
  }, [])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    if (!cleanEmail || !cleanPassword) {
      toast.error('Preencha e-mail e senha para continuar')
      return
    }

    if (cleanPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signIn(cleanEmail, cleanPassword)

      if (error) {
        if (
          error.message?.includes('Invalid login credentials') ||
          error.message?.includes('invalid_grant')
        ) {
          toast.error('Credenciais inválidas. Verifique seu e-mail e senha.')
        } else if (error.message?.includes('Email not confirmed')) {
          toast.error(
            'E-mail ainda não confirmado. Verifique sua caixa de entrada.',
          )
        } else {
          toast.error(
            error.message || 'Erro ao realizar login. Tente novamente.',
          )
        }
        return
      }

      // Sincroniza e reativa a biometria cadastrada neste aparelho silenciosamente
      if (data?.session) {
        const synced = biometricService.syncSessionIfEnrolled(
          data.session,
          cleanEmail,
        )
        if (synced) {
          const updatedCred = biometricService.getEnrolledCredential()
          setEnrolledBiometric(updatedCred)
        }
        useAuthStore.getState().setSession(data.session)
        useAuthStore.getState().setHasHydrated(true)
      }

      if (rememberMe) {
        localStorage.setItem('goplay_email', cleanEmail)
        localStorage.setItem('goplay_password', cleanPassword)
        localStorage.setItem('goplay_remember', 'true')
      } else {
        localStorage.removeItem('goplay_email')
        localStorage.removeItem('goplay_password')
        localStorage.removeItem('goplay_remember')
      }

      toast.success('Login realizado com sucesso!')
      const params = new URLSearchParams(window.location.search)
      const redirectParam = params.get('redirect')
      let target = '/home'
      if (redirectParam) {
        try {
          const decoded = decodeURIComponent(redirectParam)
          if (decoded.startsWith('/')) {
            target = decoded
          }
        } catch {
          if (redirectParam.startsWith('/')) {
            target = redirectParam
          }
        }
      }
      navigate(target, { replace: true })
    } catch (err: any) {
      toast.error(err?.message || 'Erro inesperado durante o login')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      const params = new URLSearchParams(window.location.search)
      const redirectUrl = params.get('redirect') || '/home'
      const { error } = await signInWithGoogle(redirectUrl)

      if (error) {
        if (
          error.message?.includes('provider is not enabled') ||
          error.message?.includes('Unsupported provider') ||
          error.message?.includes('not supported')
        ) {
          toast.error(
            'O login com Google ainda não está ativado no painel do Supabase.',
            {
              description:
                'Acesse Authentication > Providers > Google no painel Supabase para configurar as credenciais Client ID e Secret do Google Cloud.',
              duration: 6000,
            },
          )
        } else {
          toast.error(error.message || 'Erro ao iniciar login com Google.')
        }
      }
    } catch (err: any) {
      toast.error('Não foi possível conectar com o Google no momento.')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setTimeout(() => setSocialLoading(provider), 0)
    setTimeout(() => {
      setTimeout(() => {
        setSocialLoading(null)
        login()
        toast.success(`Login com ${provider} realizado com sucesso!`)
        navigate('/home', { replace: true })
      }, 0)
    }, 1500)
  }

  const handleBiometricLogin = async () => {
    // 1. Checar se o navegador suporta WebAuthn
    if (!biometricService.isWebAuthnSupported()) {
      toast.error('Navegador incompatível com biometria', {
        description:
          'Seu navegador não suporta a Web Authentication API. Faça login com e-mail e senha.',
      })
      return
    }

    // 2. Checar se há credencial biométrica cadastrada neste aparelho
    const enrolled = biometricService.getEnrolledCredential()
    if (!enrolled) {
      toast.info('Biometria não ativada neste aparelho', {
        description:
          'Faça login com seu e-mail e senha uma vez e ative a "Entrada por Biometria" nas Configurações da sua conta.',
        duration: 5000,
      })
      return
    }

    // 3. Checar se há tokens salvos para restaurar a sessão após a validação biométrica
    if (!enrolled.sessionToken || !enrolled.sessionToken.refresh_token) {
      toast.error('Sessão biométrica não inicializada', {
        description:
          'Entre com seu e-mail e senha uma vez para associar sua biometria a este aparelho.',
      })
      return
    }

    setBiometricLoading(true)

    try {
      // 4. Executa a cerimônia REAL do WebAuthn no dispositivo (exige sensor físico)
      // O aparelho (Android biométrico, iOS Face ID/Touch ID, Windows Hello) exibirá o prompt nativo
      const result = await biometricService.authenticate()

      if (!result.success || !result.data) {
        toast.error('Biometria não confirmada', {
          description:
            result.error ||
            'Não foi possível validar sua identidade biométrica. Tente novamente ou use e-mail e senha.',
        })
        return
      }

      // 5. SOMENTE se a biometria real passar, restaura e renova a sessão segura no Supabase
      const candidateTokens = result.data.sessionToken || enrolled.sessionToken
      const { data: restoreData, error: restoreError } =
        await restoreSessionWithTokens({
          access_token: candidateTokens.access_token || '',
          refresh_token: candidateTokens.refresh_token,
        })

      if (restoreError || !restoreData?.session) {
        console.warn('Falha na renovação da sessão biométrica:', restoreError)

        const errorMsg = restoreError?.message?.toLowerCase() || ''
        const isNetworkErr =
          errorMsg.includes('network') ||
          errorMsg.includes('fetch') ||
          restoreError?.status === 0

        if (isNetworkErr) {
          toast.error('Falha temporária de conexão', {
            description:
              'Não foi possível contatar o servidor para renovar a sessão. Verifique sua conexão à internet.',
          })
          return
        }

        // Marca a credencial como necessitando de reativação por login convencional
        biometricService.markNeedsReauth('session_revoked')
        setEnrolledBiometric(biometricService.getEnrolledCredential())

        // Pré-preenche o campo de e-mail para agilizar a reativação pelo usuário
        if (enrolled.userEmail) {
          setEmail(enrolled.userEmail)
        }

        toast.error('Sessão expirada no servidor', {
          description:
            'Sua credencial é válida, mas sua chave de acesso expirou. Faça login abaixo com e-mail e senha para reativá-la.',
          duration: 6000,
        })
        return
      }

      // Atualiza os novos tokens renovados para que próximos logins continuem funcionando ininterruptamente
      if (
        restoreData.session.access_token &&
        restoreData.session.refresh_token
      ) {
        biometricService.updateSavedSession({
          access_token: restoreData.session.access_token,
          refresh_token: restoreData.session.refresh_token,
          expires_at: restoreData.session.expires_at,
        })
        setEnrolledBiometric(biometricService.getEnrolledCredential())
      }

      const userName =
        result.data.userName ||
        restoreData.session.user?.user_metadata?.full_name ||
        result.data.userEmail.split('@')[0]

      toast.success(`Identidade confirmada! Bem-vindo, ${userName}.`, {
        description: 'Acesso seguro liberado via sensor biométrico.',
      })

      const params = new URLSearchParams(window.location.search)
      const redirectParam = params.get('redirect')
      let target = '/home'
      if (redirectParam) {
        try {
          const decoded = decodeURIComponent(redirectParam)
          if (decoded.startsWith('/')) target = decoded
        } catch {
          if (redirectParam.startsWith('/')) target = redirectParam
        }
      }

      navigate(target, { replace: true })
    } catch (err: any) {
      console.error('Erro na autenticação biométrica:', err)
      toast.error('Erro na biometria', {
        description:
          err?.message ||
          'Falha inesperada ao tentar autenticar via biometria.',
      })
    } finally {
      setBiometricLoading(false)
    }
  }

  if (!hasHydrated) {
    return <PageLoader />
  }

  // Prevent flashing the login page if the user is already authenticated
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <SportsWallpaper />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center mb-8">
          <Logo variant="full" className="scale-125" />
        </div>

        <Card className="border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-center">
              Entre para continuar sua jornada esportiva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="seu@email.com"
                    type="email"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Button
                    variant="link"
                    type="button"
                    onClick={handleForgotPassword}
                    className="px-0 h-auto text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Esqueceu a senha?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pb-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Lembrar-me
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full font-bold h-11"
                disabled={
                  loading ||
                  googleLoading ||
                  !!socialLoading ||
                  biometricLoading
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar com E-mail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="mt-4 pt-3 border-t border-border/40 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
                Acesso Rápido para Testes & Demonstração:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-6 text-[10px] px-2 border-amber-500/40 text-amber-600 hover:bg-amber-500/10"
                  onClick={() => handleDemoLogin('demo.clube@goplay.test')}
                  title="Clube Atlético Paulista (Admin / Organizador de Peneiras)"
                >
                  🏢 Clube Atlético (Admin)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-6 text-[10px] px-2 border-primary/40 text-primary hover:bg-primary/10"
                  onClick={() => handleDemoLogin('cariocamfv23@gmail.com')}
                  title="Administrador Principal do Goplay Beta"
                >
                  🛡️ Admin Principal
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-6 text-[10px] px-2 border-border text-muted-foreground hover:text-foreground"
                  onClick={() => handleDemoLogin('demo.futebol@goplay.test')}
                  title="Atleta Lucas Silva (Inscrições e Feed)"
                >
                  ⚽ Atleta Lucas
                </Button>
              </div>
            </div>

            {/* Separator */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground font-medium">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Official Google OAuth Button */}
              <GoogleSignInButton
                onClick={handleGoogleLogin}
                loading={googleLoading}
                disabled={
                  loading ||
                  googleLoading ||
                  !!socialLoading ||
                  biometricLoading
                }
              />

              <div className="space-y-1">
                <Button
                  variant="outline"
                  className={cn(
                    'w-full gap-2 border-primary/25 hover:bg-primary/5 hover:text-primary transition-colors h-11 relative overflow-hidden',
                    enrolledBiometric &&
                      'border-primary/50 shadow-sm bg-primary/[0.02]',
                  )}
                  type="button"
                  onClick={handleBiometricLogin}
                  disabled={
                    loading ||
                    googleLoading ||
                    !!socialLoading ||
                    biometricLoading
                  }
                >
                  {biometricLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <Fingerprint
                      className={cn(
                        'h-4 w-4',
                        enrolledBiometric
                          ? 'text-primary'
                          : 'text-muted-foreground',
                      )}
                    />
                  )}
                  <span className="font-semibold">
                    {enrolledBiometric
                      ? 'Entrar com Biometria (Touch ID / Face ID)'
                      : 'Entrar com Biometria'}
                  </span>
                </Button>

                {/* Status indicator / feedback for biometric setup on device */}
                {enrolledBiometric ? (
                  enrolledBiometric.needsReauth ? (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 mt-1 space-y-1">
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium flex items-center justify-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin shrink-0" />
                        Reativação necessária ({enrolledBiometric.userEmail})
                      </p>
                      <p className="text-[10px] text-center text-muted-foreground">
                        Faça login com e-mail e senha acima para reativar o
                        acesso por biometria sem precisar recadastrar.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-center text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-center gap-1 pt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Biometria ativa neste aparelho (
                      {enrolledBiometric.userEmail})
                    </p>
                  )
                ) : (
                  <p className="text-[10.5px] text-center text-muted-foreground pt-0.5">
                    {isWebAuthnSupported
                      ? 'Requer ativação prévia nas Configurações ou no aviso da Home.'
                      : 'Biometria indisponível neste navegador.'}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Button
                variant="link"
                className="px-0 text-primary font-semibold"
                onClick={() => navigate('/register')}
              >
                Criar conta
              </Button>
            </p>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <Link to="/terms" className="hover:text-primary hover:underline">
                Termos de Uso
              </Link>
              <span>•</span>
              <Link
                to="/privacy"
                className="hover:text-primary hover:underline"
              >
                Política de Privacidade
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
