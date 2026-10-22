import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { analyticsService } from "@/services/analytics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Logo } from "@/components/Logo"
import {
  Loader2,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"
import { SportsWallpaper } from "@/components/SportsWallpaper"
import { useAuth } from "@/hooks/use-auth"
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signUp, signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [awaitingEmailConfirmation, setAwaitingEmailConfirmation] =
    useState(false)

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    try {
      const params = new URLSearchParams(location.search)
      const redirectParam = params.get("redirect")
      const targetPath =
        redirectParam && redirectParam.startsWith("/")
          ? redirectParam
          : "/onboarding"

      const { error } = await signInWithGoogle(targetPath)
      if (error) {
        if (
          error.message?.includes("provider is not enabled") ||
          error.message?.includes("Unsupported provider") ||
          error.message?.includes("not supported")
        ) {
          toast.error(
            "O cadastro com Google ainda não está ativado no painel do Supabase.",
            {
              description:
                "Acesse Authentication > Providers > Google no painel Supabase para configurar as credenciais Client ID e Secret do Google Cloud.",
              duration: 6000,
            },
          )
        } else {
          toast.error(error.message || "Erro ao iniciar cadastro com Google.")
        }
      }
    } catch (err: any) {
      toast.error("Não foi possível conectar com o Google no momento.")
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
      toast.error("Preencha todos os campos")
      return
    }

    if (cleanPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signUp(cleanEmail, cleanPassword, {
        full_name: cleanName,
        account_type: "athlete",
      })

      if (error) {
        if (
          error.message?.includes("User already registered") ||
          error.message?.includes("already registered")
        ) {
          toast.error("Este e-mail já está cadastrado. Tente entrar.")
        } else {
          toast.error(error.message || "Erro ao criar conta. Tente novamente.")
        }
        return
      }

      const params = new URLSearchParams(location.search)
      const redirectUrl = params.get("redirect")

      // Record signup telemetry event
      analyticsService.trackEvent({
        eventName: "user_signup_completed",
        userId: data?.user?.id || null,
        metadata: {
          account_type: "athlete",
          has_redirect: !!redirectUrl,
        },
      })

      // If user session is created immediately (e-mail confirmation disabled or confirmed)
      if (data?.session) {
        toast.success("Conta criada com sucesso!")
        if (redirectUrl && redirectUrl.startsWith("/")) {
          navigate(redirectUrl, { replace: true })
        } else {
          navigate("/onboarding")
        }
      } else if (data?.user && !data?.session) {
        // Confirmation email required
        setAwaitingEmailConfirmation(true)
        toast.success("Cadastro realizado!", {
          description: "Enviamos um link de confirmação para o seu e-mail.",
        })
      } else {
        toast.success("Conta criada com sucesso!")
        if (redirectUrl && redirectUrl.startsWith("/")) {
          navigate(redirectUrl, { replace: true })
        } else {
          navigate("/onboarding")
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro inesperado ao cadastrar")
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
                ? "Confirme seu e-mail"
                : "Crie sua conta"}
            </CardTitle>
            <CardDescription className="text-center">
              {awaitingEmailConfirmation
                ? `Enviamos uma mensagem para ${email}. Verifique sua caixa de entrada e clique no link de ativação.`
                : "Comece sua jornada no maior ecossistema esportivo"}
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
                  onClick={() => navigate("/login")}
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
                <GoogleSignInButton
                  onClick={handleGoogleSignup}
                  loading={googleLoading}
                  disabled={loading || googleLoading}
                />
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-3">
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed max-w-sm px-2">
              Ao criar a conta você concorda com os{" "}
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link
                to="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Política de Privacidade
              </Link>{" "}
              (proteção a dados de atletas e menores de 18 anos conforme a
              LGPD).
            </p>

            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Button
                variant="link"
                className="px-0 text-primary"
                onClick={() => navigate("/login")}
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
