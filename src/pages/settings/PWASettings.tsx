import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'
import {
  pushNotificationService,
  PushStatus,
} from '@/services/push-notifications'
import goplayIcon from '@/assets/goplay-icon-0e955.png'

class PWASettingsErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PWA Settings Error:', error, errorInfo)
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
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [pushStatus, setPushStatus] = useState<PushStatus | null>(null)
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [isTogglingPush, setIsTogglingPush] = useState(false)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [showIosInfoDialog, setShowIosInfoDialog] = useState(false)

  const loadStatus = async () => {
    try {
      const status = await pushNotificationService.checkStatus()
      setPushStatus(status)
    } catch (err) {
      console.error('Falha ao verificar status push:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStatus()
  }, [])

  const handleTogglePush = async (nextValue: boolean) => {
    if (!user) {
      toast.error('Você precisa estar logado para ativar notificações.')
      return
    }

    if (!pushStatus?.supported) {
      if (pushStatus?.iosWithoutPwa) {
        setShowIosInfoDialog(true)
      } else {
        toast.error('Notificações push não suportadas neste navegador.')
      }
      return
    }

    // If turning ON and permission not yet granted, open conscious opt-in explanation dialog first
    if (nextValue) {
      if (
        pushStatus.permission === 'default' ||
        pushStatus.permission === 'unsupported'
      ) {
        setShowPermissionDialog(true)
        return
      }

      if (pushStatus.permission === 'denied') {
        toast.error('Permissão bloqueada pelo navegador.', {
          description:
            'Acesse as configurações do seu navegador ou sistema para desbloquear as notificações do GoPlay.',
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
        toast.success('Notificações no celular desativadas.')
        await loadStatus()
      } else {
        toast.error(res.error || 'Falha ao desativar.')
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
      toast.success('Notificações no celular ativadas com sucesso! 🎉', {
        description: 'Você receberá alertas mesmo com o app em segundo plano.',
      })
      await loadStatus()
    } else {
      if (res.permissionDenied) {
        toast.error('Permissão não concedida.', {
          description:
            'Você optou por não receber notificações ou o navegador bloqueou.',
        })
      } else {
        toast.error(res.error || 'Erro ao registrar assinatura push.')
      }
      await loadStatus()
    }
  }

  const handleClearCache = () => {
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) caches.delete(name)
      })
    }
    toast.success('Cache do aplicativo limpo com sucesso!', {
      description: 'Isso ajudará a liberar espaço e atualizar dados offline.',
    })
  }

  const handleUpdate = () => {
    toast.info('Verificando atualizações...', {
      description: 'O aplicativo será reiniciado se houver uma nova versão.',
    })
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update().then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1200)
        })
      })
    } else {
      setTimeout(() => {
        window.location.reload()
      }, 1200)
    }
  }

  const handleInstallApp = async () => {
    toast.success('Instalação do GoPlay', {
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
              alt="GoPlay App Logo"
              className="h-14 w-14 object-contain drop-shadow-sm"
            />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 font-semibold text-lg">
              <span>GoPlay PWA</span>
              {isInstalled ? (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Instalado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">
                  <Info className="h-3 w-3" /> No Navegador
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isInstalled
                ? 'Aplicativo instalado na tela de início com suporte nativo.'
                : 'Instale o app na sua tela de início para a melhor experiência esportiva.'}
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
            Notificações no Celular
          </h3>

          <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between border-b border-border/40">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">
                    Notificações Push no Celular
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
                  spam nem marketing.
                </p>
              </div>
            </div>

            {/* iOS specific note if needed */}
            {pushStatus.iosWithoutPwa && (
              <div className="p-3 bg-amber-500/10 border-t border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Dica para iPhone/iPad:</strong> O Safari exige que
                  você toque no botão <em>Compartilhar</em> e depois em{' '}
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
              Verificar Atualizações do App
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
              O GoPlay enviará notificações push diretamente para a sua tela
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
                'Permitir Notificações'
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
              <span>Abra o GoPlay no navegador Safari.</span>
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
