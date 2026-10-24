import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  MailX,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { emailCampaignsService } from "@/services/email-campaigns"

export default function UnsubscribePage() {
  const { userId } = useParams<{ userId: string }>()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function processUnsubscribe() {
      if (!userId) {
        setLoading(false)
        setMessage("Identificador de usuário não fornecido.")
        return
      }

      setLoading(true)
      const res = await emailCampaignsService.unsubscribeUser(userId)
      setSuccess(res.success)
      setMessage(res.message)
      setLoading(false)
    }

    processUnsubscribe()
  }, [userId])

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              Go<span className="text-gold">Play</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            Plataforma Oficial do Esporte • Preferências de Privacidade (LGPD)
          </p>
        </div>

        <Card className="border border-border/60 shadow-lg bg-card/80 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            {loading ? (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : success ? (
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            )}

            <CardTitle className="text-xl font-bold">
              {loading
                ? "Processando descadastro..."
                : success
                  ? "Descadastro Confirmado"
                  : "Não foi possível concluir"}
            </CardTitle>
            <CardDescription className="text-xs">
              {loading
                ? "Aguarde um momento enquanto atualizamos seus dados no GoPlay..."
                : success
                  ? "Suas preferências de e-mail foram atualizadas com sucesso."
                  : message}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-center">
            {success && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 space-y-2 text-left">
                <div className="flex items-center gap-2 font-semibold">
                  <MailX className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Você não receberá mais e-mails em massa</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Em cumprimento à Lei Geral de Proteção de Dados (LGPD),
                  removemos seu endereço de listas de comunicados, newsletters e
                  campanhas de clubes. E-mails transacionais essenciais (como
                  recuperação de senha) continuam disponíveis se requisitados
                  por você.
                </p>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <Button asChild variant="default" className="w-full text-xs">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para o GoPlay
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full text-xs text-muted-foreground"
              >
                <Link to="/privacy">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  Ler Política de Privacidade
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <p className="text-center text-[11px] text-muted-foreground mt-8">
          GoPlay App • Respeitamos sua escolha e privacidade
        </p>
      </div>
    </div>
  )
}
