import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Smartphone,
  Download,
  RefreshCw,
  Trash2,
  Bell,
  BellRing,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  SendHorizontal,
  Server,
  Radio,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import {
  pushNotificationService,
  PushStatus,
  PushTestResult,
} from "@/services/push-notifications"
import goplayIcon from "@/assets/goplay-icon-0e955.png"

class PWASettingsErrorBoundary extends React.Component<{
  children: React.ReactNode
}, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("PWA Settings Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 p-4 text-center">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <Smartphone className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="text-xl font-bold">Erro de Carregamento</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Ocorreu um problema ao acessar o status do PWA.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar Novamente
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

function PWASettingsContent() {
  const navigate = useNavigate()
  const { user, profile: userProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [pushStatus, setPushStatus] = useState<PushStatus | null>(null)
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [isTogglingPush, setIsTogglingPush] = useState(false)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [showIosInfoDialog, setShowIosInfoDialog] = useState(false)

  // Test Push states
  const [isTestingPush, setIsTestingPush] = useState(false)
  const [lastTestResult, setLastTestResult] = useState<PushTestResult | null>(
    null,
  )

  const loadStatus = async () => {
    try {
      const status = await pushNotificationService.checkStatus()
      setPushStatus(status)
    } catch (err) {
      console.error("Falha ao verificar status push:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  const handleTogglePush = async (nextValue: boolean) => {
    if (!user) {
      toast.error("Você precisa estar logado para ativar notificações.")
      return
    }

    if (!pushStatus?.supported) {
      if (pushStatus?.iosWithoutPwa) {
        setShowIosInfoDialog(true)
      } else {
        toast.error("Notificações push não suportadas neste navegador.")
      }
      return
    }

    // If turning ON and permission not yet granted, open conscious opt-in explanation dialog first
    if (nextValue) {
      if (
        pushStatus.permission === "default" ||
        pushStatus.permission === "unsupported"
      ) {
        setShowPermissionDialog(true)
        return
      }

      if (pushStatus.permission === "denied") {
        toast.error("Permissão bloqueada pelo navegador.", {
          description:
            "Acesse as configurações do seu navegador ou sistema Android para desbloquear as notificações do Goplay.",
        })
        return
      }

      // Permission already granted, subscribe directly
      await executeSubscribe()
    } else {
      // Turning OFF
      setIsTogglingPush(true)
      const res = await pushNotificationService.unsubscribeUser(user.id)
      setIsTogglingPush(false)
      if (res.success) {
        toast.success("Notificações no celular desativadas.")
        await loadStatus()
      } else {
        toast.error(res.error || "Falha ao desativar.")
      }
    }
  }

  const executeSubscribe = async () => {
    if (!user) return
    setIsTogglingPush(true)
    setShowPermissionDialog(false)

    const res = await pushNotificationService.subscribeUser(user.id)
    setIsTogglingPush(false)

    if (res.success) {
      toast.success("Notificações no celular ativadas com sucesso! 🎉", {
        description: "Você receberá alertas mesmo com o app em segundo plano.",
      })
      await loadStatus()
    } else {
      if (res.permissionDenied) {
        toast.error("Permissão não concedida.", {
          description:
            "Você optou por não receber notificações ou o Android bloqueou.",
        })
      } else {
        toast.error(res.error || "Erro ao registrar assinatura push.")
      }
      await loadStatus()
    }
  }

  const handleRunPushTest = async (options?: { includeAvatar?: boolean }) => {
    if (!user) {
      toast.error("Faça login para realizar o teste de push.")
      return
    }

    setIsTestingPush(true)
    setLastTestResult(null)

    toast.info("Disparando teste de push no servidor...", {
      description: options?.includeAvatar
        ? "Enviando push estilo TikTok (com foto real de perfil e logo oficial)..."
        : "O servidor Supabase está enviando via Edge Function.",
    })

    const result = await pushNotificationService.sendSelfTestPush(user.id, {
      includeAvatar: Boolean(options?.includeAvatar),
      avatarUrl: options?.includeAvatar
        ? userProfile?.avatar_url || undefined
        : undefined,
    })
    setIsTestingPush(false)
    setLastTestResult(result)

    if (result.success && result.sentCount > 0) {
      toast.success("Envio aceito pelo FCM Google (201)! 🚀", {
        description: `${result.sentCount} aparelho(s) notificado(s). Verifique a barra de notificações do seu aparelho Android.`,
      })
      await loadStatus()
    } else {
      const errorDescription =
        result.error ||
        result.message ||
        "Nenhum aparelho ativo pôde ser notificado no momento."
      toast.error("Falha no teste de push:", {
        description: errorDescription,
        duration: 7000,
      })
    }
  }

  const handleClearCache = async () => {
    try {
      if ("caches" in window) {
        const names = await caches.keys()
        await Promise.all(names.map((name) => caches.delete(name)))
      }
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const reg of registrations) {
          await reg.update().catch(() => {})
        }
      }
      toast.success("Cache do aplicativo limpo com sucesso!", {
        description:
          "Caches locais removidos e Service Worker revalidado no servidor.",
      })
    } catch {
      toast.success("Cache do aplicativo limpo!")
    }
  }

  const handleUpdate = async () => {
    toast.info("Verificando atualizações...", {
      description:
        "Baixando nova versão do Service Worker e atualizando cache.",
    })
    try {
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration()
        if (reg) {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: "SKIP_WAITING" })
          }
          await reg.update()
        }
      }
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      window.location.reload()
    }, 1200)
  }

  const handleInstallApp = async () => {
    toast.success("Instalação do Goplay", {
      description:
        'Toque em Compartilhar ou no menu do navegador e selecione "Adicionar à Tela de Início".',
    })
  }

  if (isLoading || !pushStatus) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Configurações do PWA</h1>
        </div>
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-muted/30 rounded-2xl border border-border/50">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    )
  }

  const isInstalled = pushStatus.isStandalone
  const isSubscribed = pushStatus.isSubscribed

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in text-foreground">
      {/* Top Bar */}
      <div className="sticky top-0 bg-background/90 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Configurações do PWA</h1>
          <p className="text-xs text-muted-foreground">
            Instalação e notificações no celular
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Status Card */}
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 bg-card rounded-2xl border border-border/60 shadow-sm">
          <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center overflow-hidden shadow-md border border-primary/20">
            <img
              src={goplayIcon}
              alt="Goplay App Logo"
              className="h-14 w-14 object-contain drop-shadow-sm"
            />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 font-semibold text-lg">
              <span>Goplay App</span>
              {isInstalled ? (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> PWA Instalado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">
                  <Info className="h-3 w-3" /> No Navegador
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isInstalled
                ? "Aplicativo instalado na tela de início com suporte nativo a Web Push."
                : "Instale o Goplay na tela de início para receber alertas em segundo plano."}
            </p>
          </div>
          {!isInstalled && (
            <Button
              variant="default"
              className="w-full max-w-[220px] gap-2 shadow-sm font-medium"
              onClick={handleInstallApp}
            >
              <Download className="h-4 w-4" />
              Instalar na Tela Inicial
            </Button>
          )}
        </div>

        {/* Push Notifications Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase px-1 tracking-wider">
            Notificações no Celular (Android Web Push)
          </h3>

          <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between border-b border-border/40">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">
                    Notificações Push no Aparelho
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Receba alertas na tela do celular mesmo com o aplicativo
                  fechado ou em segundo plano.
                </p>
              </div>

              {isTogglingPush ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary shrink-0" />
              ) : (
                <Switch
                  checked={isSubscribed}
                  onCheckedChange={handleTogglePush}
                  disabled={isTogglingPush}
                />
              )}
            </div>

            {/* Sub-status alert banner */}
            <div className="p-3.5 bg-muted/40 text-xs text-muted-foreground flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  Eventos monitorados para o seu perfil:
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Curtidas e comentários nas suas publicações, novos seguidores,
                  confirmação e aprovação de inscrições em eventos/peneiras. Sem
                  spam nem marketing comercial.
                </p>
              </div>
            </div>

            {/* Test Push Button Area */}
            {user && (
              <div className="p-4 bg-secondary/15 border-t border-border/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Radio className="h-3.5 w-3.5 text-primary animate-pulse" />
                      Teste Independente de Push
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Dispara um push real via servidor Supabase para este
                      aparelho.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleRunPushTest({ includeAvatar: true })}
                    disabled={isTestingPush || isTogglingPush}
                    className="w-full gap-2 font-medium shadow-sm"
                    variant="default"
                  >
                    {isTestingPush ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                        Disparando...
                      </>
                    ) : (
                      <>
                        <SendHorizontal className="h-4 w-4" />
                        Testar Foto Real (Estilo TikTok)
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleRunPushTest({ includeAvatar: false })}
                    disabled={isTestingPush || isTogglingPush}
                    className="w-full gap-2 font-medium shadow-sm"
                    variant="outline"
                  >
                    {isTestingPush ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        Disparando...
                      </>
                    ) : (
                      <>
                        <SendHorizontal className="h-4 w-4 text-primary" />
                        Testar Padrão (Logo Goplay)
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-[11px] text-muted-foreground/80 leading-normal">
                  💡 <em>Dica de validação:</em> toque no botão acima e
                  imediatamente pressione o botão Home do Android ou feche o
                  Goplay para ver a notificação chegar na tela de bloqueio e na
                  barra de notificações.
                </p>

                {/* Real-time Diagnostics Output */}
                {lastTestResult && (
                  <div className="p-3 rounded-xl bg-card border border-border/60 text-xs space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Server className="h-3.5 w-3.5 text-primary" />
                        Diagnóstico do Servidor Supabase
                      </span>
                      {lastTestResult.success ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Sucesso (201
                          Created)
                        </span>
                      ) : (
                        <span className="text-destructive font-bold flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" /> Falha no Teste
                        </span>
                      )}
                    </div>

                    <div className="text-muted-foreground space-y-1">
                      <p>
                        <strong>Aparelhos registrados:</strong>{" "}
                        {lastTestResult.totalDevices}
                      </p>
                      <p>
                        <strong>Requisições aceitas pelo FCM:</strong>{" "}
                        {lastTestResult.sentCount}
                      </p>
                      {lastTestResult.error && (
                        <p className="text-destructive font-medium pt-1">
                          Motivo: {lastTestResult.error}
                        </p>
                      )}
                      {lastTestResult.message && (
                        <p className="text-foreground/90 text-[11px]">
                          {lastTestResult.message}
                        </p>
                      )}
                      {lastTestResult.reports &&
                        lastTestResult.reports.length > 0 && (
                          <div className="mt-2 space-y-1.5">
                            <p className="font-medium text-foreground">
                              Destino do Push Service:
                            </p>
                            {lastTestResult.reports.map((r, idx) => (
                              <div
                                key={idx}
                                className="pl-2 border-l-2 border-primary/40 text-[11px] space-y-0.5"
                              >
                                <div className="flex items-center gap-1">
                                  <span>
                                    Host: <code>{r.host}</code>
                                  </span>
                                  <span>
                                    • Status:{" "}
                                    <strong>{r.statusCode || r.status}</strong>
                                  </span>
                                </div>
                                {r.error && (
                                  <p className="text-destructive text-[10px] leading-tight">
                                    {r.error}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* iOS specific note if needed */}
            {pushStatus.iosWithoutPwa && (
              <div className="p-3 bg-amber-500/10 border-t border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Dica para iPhone/iPad:</strong> O Safari exige que
                  você toque no botão <em>Compartilhar</em> e depois em{" "}
                  <em>"Adicionar à Tela de Início"</em> antes de ativar as
                  notificações push (iOS 16.4+).
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase px-1 tracking-wider">
            Preferências do PWA
          </h3>

          <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Atualizações Automáticas</p>
                <p className="text-xs text-muted-foreground">
                  Sincronizar versões e dados recentes automaticamente
                </p>
              </div>
              <Switch
                checked={autoUpdate}
                onCheckedChange={(v) => setAutoUpdate(v)}
              />
            </div>
          </div>
        </div>

        {/* Maintenance & Troubleshooting */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase px-1 tracking-wider">
            Manutenção do App
          </h3>
          <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <Button
              variant="ghost"
              className="w-full justify-start h-14 rounded-none border-b border-border/40 gap-3 text-sm font-medium"
              onClick={handleUpdate}
            >
              <RefreshCw className="h-4 w-4 text-primary" />
              Verificar Atualizações do App (Atualizar Service Worker v14)
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-14 rounded-none gap-3 text-sm font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleClearCache}
            >
              <Trash2 className="h-4 w-4" />
              Limpar Cache e Dados Temporários
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground px-2">
            Versão do Service Worker: <code>2026.10.23-v14</code> • Formato
            TikTok: logo oficial à esquerda, avatar no <code>icon</code> à
            direita e sem imagem expandida.
          </p>{" "}
        </div>
      </div>

      {/* Conscious Permission Explanation Modal */}
      <Dialog
        open={showPermissionDialog}
        onOpenChange={setShowPermissionDialog}
      >
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center text-lg">
              Ativar Notificações no Celular
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground leading-relaxed pt-1">
              O Goplay enviará notificações push diretamente para a sua tela
              inicial quando alguém interagir com seus posts, seguir você ou
              quando sua inscrição em um evento for atualizada.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/40 p-3 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Sem spam nem anúncios comerciais.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Você pode desativar a qualquer momento nesta tela.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                Ao deslogar da conta, as notificações deste aparelho são
                desligadas.
              </span>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-2 mt-2">
            <Button
              variant="default"
              className="w-full font-semibold"
              onClick={executeSubscribe}
              disabled={isTogglingPush}
            >
              {isTogglingPush ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ativando...
                </>
              ) : (
                "Permitir Notificações"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => setShowPermissionDialog(false)}
              disabled={isTogglingPush}
            >
              Agora Não
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* iOS Instruction Modal */}
      <Dialog open={showIosInfoDialog} onOpenChange={setShowIosInfoDialog}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <div className="mx-auto h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-2">
              <Smartphone className="h-6 w-6 text-amber-500" />
            </div>
            <DialogTitle className="text-center text-lg">
              Instalação necessária no iOS
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground leading-relaxed pt-1">
              Nos iPhones e iPads (iOS 16.4+), a Apple exige que o aplicativo
              esteja instalado na tela de início para permitir notificações push
              reais.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/40 p-4 rounded-xl space-y-3 text-xs leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-primary">1.</span>
              <span>Abra o Goplay no navegador Safari.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-primary">2.</span>
              <span>
                Toque no botão <strong>Compartilhar</strong> (ícone de quadrado
                com seta para cima).
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-primary">3.</span>
              <span>
                Selecione <strong>"Adicionar à Tela de Início"</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-primary">4.</span>
              <span>
                Abra o ícone criado na tela do celular e ative as notificações
                aqui.
              </span>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              variant="default"
              className="w-full"
              onClick={() => setShowIosInfoDialog(false)}
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function PWASettings() {
  return (
    <PWASettingsErrorBoundary>
      <PWASettingsContent />
    </PWASettingsErrorBoundary>
  )
}
