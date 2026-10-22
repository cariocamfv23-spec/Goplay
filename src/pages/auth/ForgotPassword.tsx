import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
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
import { Loader2, Mail, ArrowLeft, CheckCircle2, Send } from "lucide-react"
import { toast } from "sonner"
import { SportsWallpaper } from "@/components/SportsWallpaper"
import { useAuth } from "@/hooks/use-auth"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { resetPasswordForEmail } = useAuth()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail) {
      toast.error("Informe seu e-mail cadastrado.")
      return
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleanEmail)) {
      toast.error("Informe um endereço de e-mail válido.")
      return
    }

    setLoading(true)

    try {
      const { error } = await resetPasswordForEmail(cleanEmail)

      if (error) {
        // Prevent revealing internal error traces or account enumeration attacks
        console.error("Password reset request error:", error)
      }

      // Always show positive neutral message for security & privacy
      setSubmitted(true)
      toast.success("Solicitação processada com sucesso!")
    } catch (err: any) {
      console.error("Unexpected error during password reset:", err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <SportsWallpaper />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center mb-6">
          <Logo variant="full" className="scale-125" />
        </div>

        <Card className="border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Recuperar Senha
            </CardTitle>
            <CardDescription className="text-center text-xs leading-relaxed">
              {submitted
                ? "Verifique as instruções enviadas para a sua caixa de entrada"
                : "Digite seu e-mail cadastrado para receber o link oficial de redefinição de senha."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <div className="space-y-5 text-center py-2 animate-in fade-in">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Link enviado com sucesso!
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Se o e-mail{" "}
                    <strong className="text-foreground">{email}</strong> estiver
                    cadastrado no Goplay App, você receberá um link seguro para
                    redefinir sua senha em instantes.
                  </p>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 text-left space-y-1">
                    <p className="font-semibold flex items-center gap-1">
                      📬 Dica sobre a entrega do e-mail:
                    </p>
                    <p className="leading-relaxed">
                      Caso o e-mail demore alguns minutos, verifique sua caixa
                      de entrada e a pasta de{" "}
                      <strong>Spam / Lixo Eletrônico</strong>. Se você utiliza
                      provedores corporativos ou filtros rígidos, adicione o
                      domínio do Goplay aos remetentes confiáveis.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => setSubmitted(false)}
                  >
                    Tentar outro e-mail
                  </Button>
                  <Button
                    className="w-full font-bold bg-primary text-white"
                    onClick={() => navigate("/login")}
                  >
                    Voltar ao Login
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="reset-email"
                    className="text-xs font-semibold"
                  >
                    Seu E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 h-11"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando instruções...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Link de Recuperação
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center border-t border-border/40 pt-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Lembrou a senha? Voltar ao Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
