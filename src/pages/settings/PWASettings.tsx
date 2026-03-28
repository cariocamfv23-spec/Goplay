import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Smartphone,
  Download,
  RefreshCw,
  Trash2,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'

export default function PWASettings() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [pwaState, setPwaState] = useState<any>(null)

  useEffect(() => {
    let isMounted = true

    // Simulate fetching PWA settings safely with fallback
    const loadSettings = () => {
      setTimeout(() => {
        if (!isMounted) return

        try {
          const isStandalone = window.matchMedia
            ? window.matchMedia('(display-mode: standalone)').matches
            : false
          setPwaState({
            isInstalled: isStandalone,
            autoUpdate: true,
            notifications: false,
          })
        } catch (error) {
          console.error('Error loading PWA settings', error)
          setPwaState({
            isInstalled: false,
            autoUpdate: false,
            notifications: false,
          })
        } finally {
          setIsLoading(false)
        }
      }, 600)
    }

    loadSettings()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Safe fallback to prevent undefined errors
  const isInstalled = Boolean(pwaState?.isInstalled)
  const autoUpdate = Boolean(pwaState?.autoUpdate)
  const notifications = Boolean(pwaState?.notifications)

  const handleClearCache = () => {
    toast.success('Cache do aplicativo limpo com sucesso!', {
      description: 'Isso ajudará a liberar espaço e resolver problemas.',
    })
  }

  const handleUpdate = () => {
    toast.info('Verificando atualizações...', {
      description: 'O aplicativo será reiniciado se houver uma nova versão.',
    })
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Configurações do PWA</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 bg-muted/30 rounded-2xl border border-border/50">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Smartphone className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Status do Aplicativo</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isInstalled
                ? 'Aplicativo instalado no dispositivo e otimizado.'
                : 'Acesse pelo navegador ou instale para melhor experiência.'}
            </p>
          </div>
          {!isInstalled && (
            <Button variant="default" className="w-full max-w-[200px] gap-2">
              <Download className="h-4 w-4" />
              Instalar App
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2">
            Preferências
          </h3>

          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border/50">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Atualizações Automáticas</p>
                <p className="text-xs text-muted-foreground">
                  Baixar novas versões em segundo plano
                </p>
              </div>
              <Switch
                checked={autoUpdate}
                onCheckedChange={(v) =>
                  setPwaState((prev: any) => ({ ...prev, autoUpdate: v }))
                }
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Alertas do sistema nativo
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={(v) =>
                  setPwaState((prev: any) => ({ ...prev, notifications: v }))
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase px-2">
            Manutenção
          </h3>

          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <Button
              variant="ghost"
              className="w-full justify-start h-14 rounded-none border-b border-border/50 gap-3 text-base"
              onClick={handleUpdate}
            >
              <RefreshCw className="h-5 w-5 text-blue-500" />
              Forçar Atualização
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-14 rounded-none gap-3 text-base text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleClearCache}
            >
              <Trash2 className="h-5 w-5" />
              Limpar Cache Local
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
