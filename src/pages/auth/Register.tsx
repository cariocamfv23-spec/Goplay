import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { analyticsService } from '@/services/analytics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'
import { SportsWallpaper } from '@/components/SportsWallpaper'
import { useAuth } from '@/hooks/use-auth'

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signUp, signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [awaitingEmailConfirmation, setAwaitingEmailConfirmation] =
    useState(false)

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    try {
      const { error } = await signInWithGoogle('/onboarding')
      if (error) {
        if (
          error.message?.includes('provider is not enabled') ||
          error.message?.includes('Unsupported provider') ||
          error.message?.includes('not supported')
        ) {
          toast.error(
            'O cadastro com Google ainda não está ativado no painel do Supabase.',
            {
              description:
                'Acesse Authentication > Providers > Google no painel Supabase para configurar as credenciais.',
              duration: 6000,
            },
          )
        } else {
          toast.error(error.message || 'Erro ao iniciar cadastro com Google.')
        }
      }
    } catch (err: any) {
      toast.error('Não foi possível conectar com o Google no momento.')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    if (!cleanName || !cleanEmail || !cleanPassword) {
      toast.error('Preencha todos os campos')
      return
    }

    if (cleanPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signUp(cleanEmail, cleanPassword, {
        full_name: cleanName,
        account_type: 'athlete',
      })

      if (error) {
        if (
          error.message?.includes('User already registered') ||
          error.message?.includes('already registered')
        ) {
          toast.error('Este e-mail já está cadastrado. Tente entrar.')
        } else {
          toast.error(error.message || 'Erro ao criar conta. Tente novamente.')
        }
        return
      }

      const params = new URLSearchParams(location.search)
      const redirectUrl = params.get('redirect')

      // Record signup telemetry event
      analyticsService.trackEvent({
        eventName: 'user_signup_completed',
        userId: data?.user?.id || null,
        metadata: {
          account_type: 'athlete',
          has_redirect: !!redirectUrl,
        },
      })

      // If user session is created immediately (e-mail confirmation disabled or confirmed)
      if (data?.session) {
        toast.success('Conta criada com sucesso!')
        if (redirectUrl && redirectUrl.startsWith('/')) {
          navigate(redirectUrl, { replace: true })
        } else {
          navigate('/onboarding')
        }
      } else if (data?.user && !data?.session) {
        // Confirmation email required
        setAwaitingEmailConfirmation(true)
        toast.success('Cadastro realizado!', {
          description: 'Enviamos um link de confirmação para o seu e-mail.',
        })
      } else {
        toast.success('Conta criada com sucesso!')
        if (redirectUrl && redirectUrl.startsWith('/')) {
          navigate(redirectUrl, { replace: true })
        } else {
          navigate('/onboarding')
        }
      }
    } catch (err: any) {
      toast.error(err?.message || 'Erro inesperado ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Global Background Pattern */}
      <SportsWallpaper />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center mb-8">
          <Logo variant="full" className="scale-125" />
        </div>

        <Card className="border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {awaitingEmailConfirmation
                ? 'Confirme seu e-mail'
                : 'Crie sua conta'}
            </CardTitle>
            <CardDescription className="text-center">
              {awaitingEmailConfirmation
                ? `Enviamos uma mensagem para ${email}. Verifique sua caixa de entrada e clique no link de ativação.`
                : 'Comece sua jornada no maior ecossistema esportivo'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {awaitingEmailConfirmation ? (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Após confirmar seu e-mail, volte aqui para acessar sua conta
                  com sua senha criada.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full mt-2 font-semibold"
                >
                  Ir para Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      className="pl-9"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                  <Label htmlFor="password">Senha</Label>
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
                <Button
                  type="submit"
                  className="w-full h-11 font-bold"
                  disabled={loading || googleLoading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar Conta com E-mail
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Separator */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/60" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-3 text-muted-foreground font-medium">
                      Ou cadastre-se com
                    </span>
                  </div>
                </div>

                {/* Google Sign up */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-11 gap-3 font-semibold border-border hover:bg-secondary/60 hover:border-primary/40 transition-all text-sm shadow-sm"
                  onClick={handleGoogleSignup}
                  disabled={loading || googleLoading}
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
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Button
                variant="link"
                className="px-0 text-primary"
                onClick={() => navigate('/login')}
              >
                Entrar
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
