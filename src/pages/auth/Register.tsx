import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [awaitingEmailConfirmation, setAwaitingEmailConfirmation] =
    useState(false)

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

      // If user session is created immediately (e-mail confirmation disabled or confirmed)
      if (data?.session) {
        toast.success('Conta criada com sucesso!')
        navigate('/onboarding')
      } else if (data?.user && !data?.session) {
        // Confirmation email required
        setAwaitingEmailConfirmation(true)
        toast.success('Cadastro realizado!', {
          description: 'Enviamos um link de confirmação para o seu e-mail.',
        })
      } else {
        toast.success('Conta criada com sucesso!')
        navigate('/onboarding')
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar Conta
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
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
