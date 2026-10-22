import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Fingerprint, ShieldCheck, X } from "lucide-react"
import { biometricService } from "@/services/biometrics"
import { useAuth } from "@/hooks/use-auth"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase/client"

const DISMISSED_KEY = "goplay_biometric_invite_dismissed"

export function BiometricEnrollModal() {
  const { user, profile } = useAuth()
  const session = useAuthStore((s) => s.session)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Só exibe se:
    // 1. O usuário estiver autenticado
    // 2. O navegador suportar WebAuthn
    // 3. A biometria ainda não estiver cadastrada neste aparelho (ou já foi associada a este usuário)
    // 4. O usuário não tiver dispensado o convite recentemente
    if (!user) return

    if (!biometricService.isWebAuthnSupported()) return

    // Se já estiver alistado (mesmo que precise de reauth ou já tenha tokens), sincroniza a sessão atual e não abre o modal de novo alistamento
    if (biometricService.isEnrolled()) {
      if (session) {
        biometricService.syncSessionIfEnrolled(session, user.email)
      }
      return
    }

    const dismissed = localStorage.getItem(DISMISSED_KEY)
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10)
      // Não reexibe por 14 dias se dispensado
      if (Date.now() - dismissedAt < 14 * 24 * 60 * 60 * 1000) {
        return
      }
    }

    // Checa se o aparelho tem suporte a authenticator de plataforma (Face ID/Touch ID)
    biometricService.isPlatformAuthenticatorAvailable().then((available) => {
      if (available) {
        // Aguarda 1.8s para não competir com a renderização inicial da Home
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, 1800)
        return () => clearTimeout(timer)
      }
    })
  }, [user, session])

  const handleDismiss = () => {
    setIsOpen(false)
    localStorage.setItem(DISMISSED_KEY, Date.now().toString())
  }

  const handleEnroll = async () => {
    if (!user) return
    setLoading(true)

    try {
      // Obter os tokens mais recentes diretamente do Supabase para garantir refresh_token válido
      let currentSession = session
      try {
        const { data: freshData } = await supabase.auth.getSession()
        if (freshData?.session) {
          currentSession = freshData.session
        }
      } catch {
        // fallback para a sessão do contexto
      }

      const tokens = currentSession
        ? {
            access_token: currentSession.access_token,
            refresh_token: currentSession.refresh_token,
            expires_at: currentSession.expires_at,
          }
        : undefined

      const displayName =
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Atleta Goplay"

      toast.info("Aproxime o dedo ou use o Face ID no prompt do sistema...", {
        icon: <Fingerprint className="w-4 h-4 text-primary animate-pulse" />,
      })

      const res = await biometricService.enrollBiometrics({
        userId: user.id,
        userEmail: user.email || "",
        userName: displayName,
        sessionTokens: tokens,
      })

      if (res.success) {
        toast.success("Biometria ativada neste aparelho!", {
          description:
            "No seu próximo acesso, você poderá entrar com um toque.",
        })
        setIsOpen(false)
      } else {
        toast.error("Não foi possível ativar a biometria", {
          description: res.error,
        })
      }
    } catch (err: any) {
      toast.error("Erro ao acionar sensor biométrico", {
        description: err?.message || "Tente novamente.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleDismiss()}>
      <DialogContent className="max-w-sm rounded-2xl border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl p-6">
        <DialogHeader className="text-center space-y-3 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Fingerprint className="w-8 h-8 animate-pulse" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Ativar Entrada por Biometria?
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Acesse sua conta com Touch ID, Face ID ou impressão digital neste
            aparelho, com total segurança e sem digitar senha.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 p-3 bg-secondary/30 rounded-xl border border-border/50 text-[11px] text-muted-foreground flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            Seus dados biométricos nunca saem deste aparelho (tecnologia
            WebAuthn).
          </span>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2 pt-2">
          <Button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full font-bold h-10 gap-2 shadow-md"
          >
            <Fingerprint className="w-4 h-4" />
            {loading ? "Aguardando sensor..." : "Ativar Agora"}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDismiss}
            disabled={loading}
            className="w-full text-xs text-muted-foreground hover:text-foreground h-8"
          >
            Agora não, lembrar depois
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
