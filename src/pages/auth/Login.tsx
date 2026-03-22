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
import { PageLoader } from '@/components/PageLoader'

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, hasHydrated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [biometricLoading, setBiometricLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  // Redirect to home if already authenticated, preventing the display of the guest UI
  useEffect(() => {
    if (hasHydrated) {
      if (isAuthenticated) {
        navigate('/home', { replace: true })
      } else {
        const timer = setTimeout(() => setIsChecking(false), 300)
        return () => clearTimeout(timer)
      }
    }
  }, [hasHydrated, isAuthenticated, navigate])

  // Load saved credentials on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('goplay_username')
    const savedPassword = localStorage.getItem('goplay_password')
    const savedRemember = localStorage.getItem('goplay_remember') === 'true'

    if (savedRemember && savedUsername) {
      setUsername(savedUsername)
      setRememberMe(true)
      if (savedPassword) setPassword(savedPassword)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call and Persistence Logic
    setTimeout(() => {
      setLoading(false)
      if (username && password) {
        if (rememberMe) {
          localStorage.setItem('goplay_username', username)
          localStorage.setItem('goplay_password', password)
          localStorage.setItem('goplay_remember', 'true')
        } else {
          localStorage.removeItem('goplay_username')
          localStorage.removeItem('goplay_password')
          localStorage.removeItem('goplay_remember')
        }
        login()
        toast.success('Login realizado com sucesso!')
        navigate('/home')
      } else {
        toast.error('Preencha todos os campos')
      }
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider)
    setTimeout(() => {
      setSocialLoading(null)
      login()
      toast.success(`Login com ${provider} realizado com sucesso!`)
      navigate('/home')
    }, 1500)
  }

  const handleBiometricLogin = () => {
    setBiometricLoading(true)
    toast.info('Aproxime o dedo do sensor', {
      icon: <Fingerprint className="h-4 w-4 animate-pulse text-primary" />,
      duration: 2000,
    })

    setTimeout(() => {
      setBiometricLoading(false)
      login()
      toast.success('Identidade confirmada', {
        description: 'Acesso seguro liberado via biometria.',
      })
      navigate('/home')
    }, 2000)
  }

  if (!hasHydrated || isChecking) {
    return <PageLoader />
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
                <Label htmlFor="username">Usuário</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Seu usuário"
                    type="text"
                    className="pl-9"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className="px-0 h-auto text-xs text-muted-foreground"
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
