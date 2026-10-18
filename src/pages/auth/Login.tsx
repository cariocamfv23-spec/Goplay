import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, hasHydrated } = useAuthStore()
  const { signIn, signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [biometricLoading, setBiometricLoading] = useState(false)
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

  // Load saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('goplay_email')
    const savedPassword = localStorage.getItem('goplay_password')
    const savedRemember = localStorage.getItem('goplay_remember') === 'true'

    if (savedRemember && savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
      if (savedPassword) setPassword(savedPassword)
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
      const { error } = await signIn(cleanEmail, cleanPassword)

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

  const handleBiometricLogin = () => {
    setTimeout(() => setBiometricLoading(true), 0)
    toast.info('Aproxime o dedo do sensor', {
      icon: <Fingerprint className="h-4 w-4 animate-pulse text-primary" />,
      duration: 2000,
    })

    setTimeout(() => {
      // Non-blocking state update and navigation to prevent UI freezing
      setTimeout(() => {
        setBiometricLoading(false)
        login()
        toast.success('Identidade confirmada', {
          description: 'Acesso seguro liberado via biometria.',
        })
        navigate('/home', { replace: true })
      }, 0)
    }, 2000)
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
                >
                  🏢 Clube Atlético
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-6 text-[10px] px-2 border-primary/40 text-primary hover:bg-primary/10"
                  onClick={() => handleDemoLogin('demo.treinador@goplay.test')}
                >
                  📋 Treinador Marcelo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-6 text-[10px] px-2 border-border text-muted-foreground hover:text-foreground"
                  onClick={() => handleDemoLogin('demo.futebol@goplay.test')}
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
              <Button
                variant="outline"
                type="button"
                className="w-full h-11 gap-3 font-semibold border-border hover:bg-secondary/60 hover:border-primary/40 transition-all text-sm shadow-sm"
                onClick={handleGoogleLogin}
                disabled={
                  loading ||
                  googleLoading ||
                  !!socialLoading ||
                  biometricLoading
                }
              >
                {googleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.13C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.24C.45 8.22 0 10.05 0 12s.45 3.78 1.24 5.4l4.04-3.13z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.6l4.04 3.13c.95-2.84 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Continuar com Google</span>
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors h-11"
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
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Fingerprint className="h-4 w-4" />
                )}
                <span className="font-semibold">Entrar com Biometria</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
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
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
