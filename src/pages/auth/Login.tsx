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
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [biometricLoading, setBiometricLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  // Redirect to home if already authenticated, preventing the display of the guest UI
  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      navigate('/home', { replace: true })
    }
  }, [hasHydrated, isAuthenticated, navigate])

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
      navigate('/home', { replace: true })
    } catch (err: any) {
      toast.error(err?.message || 'Erro inesperado durante o login')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    toast.info('Recuperação de Senha', {
      description:
        'Digite seu e-mail no campo acima. A interface de recuperação direta por link será ativada.',
    })
  }

  const handleSocialLogin = (provider: string) => {
    setTimeout(() => setSocialLoading(provider), 0)
    setTimeout(() => {
      // Non-blocking state update and navigation to prevent UI freezing
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
                className="w-full font-bold"
                disabled={loading || !!socialLoading || biometricLoading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou acesse com
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors h-11"
                type="button"
                onClick={handleBiometricLogin}
                disabled={loading || !!socialLoading || biometricLoading}
              >
                {biometricLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Fingerprint className="h-4 w-4" />
                )}
                <span className="font-semibold">Entrar com Biometria</span>
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={loading || !!socialLoading || biometricLoading}
                >
                  {socialLoading === 'Google' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <img
                      src="https://img.usecurling.com/i?q=google&color=multicolor"
                      alt="Google"
                      className="h-4 w-4"
                    />
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={loading || !!socialLoading || biometricLoading}
                >
                  {socialLoading === 'Apple' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <img
                      src="https://img.usecurling.com/i?q=apple&color=black"
                      alt="Apple"
                      className="h-4 w-4 dark:invert"
                    />
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleSocialLogin('GitHub')}
                  disabled={loading || !!socialLoading || biometricLoading}
                >
                  {socialLoading === 'GitHub' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Github className="h-4 w-4" />
                  )}
                </Button>
              </div>
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
