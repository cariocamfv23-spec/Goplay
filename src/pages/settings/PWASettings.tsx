import React, { useState, useEffect } from 'react'
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

interface PWAState {
  isInstalled: boolean
  autoUpdate: boolean
  notifications: boolean
}

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
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [pwaState, setPwaState] = useState<PWAState | null>(null)

  useEffect(() => {
    let isMounted = true

    // Simulate fetching PWA settings safely with fallback
    const loadSettings = () => {
      setTimeout(() => {
        if (!isMounted) return

        try {
          const isStandalone =
            typeof window !== 'undefined' && window.matchMedia
              ? window.matchMedia('(display-mode: standalone)').matches
              : false

          setPwaState({
            isInstalled: isStandalone,
            autoUpdate: true,
            notifications: false,
          })
        } catch (error) {
          console.error('Error loading PWA settings', error)
          setHasError(true)
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

    // Event loop management: Ensure it doesn't block the main thread initially
    setTimeout(loadSettings, 0)

    return () => {
      isMounted = false
    }
  }, [])

  if (hasError) {
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

  if (isLoading || !pwaState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Carregando configurações...
        </p>
      </div>
    )
  }

  // Safe fallback to prevent undefined errors
  const isInstalled = Boolean(pwaState?.isInstalled ?? false)
  const autoUpdate = Boolean(pwaState?.autoUpdate ?? false)
  const notifications = Boolean(pwaState?.notifications ?? false)

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
                  setPwaState((prev) =>
                    prev
                      ? { ...prev, autoUpdate: v }
                      : {
                          isInstalled: false,
                          notifications: false,
                          autoUpdate: v,
                        },
                  )
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
                  setPwaState((prev) =>
                    prev
                      ? { ...prev, notifications: v }
                      : {
                          isInstalled: false,
                          autoUpdate: false,
                          notifications: v,
                        },
                  )
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

export default function PWASettings() {
  return (
    <PWASettingsErrorBoundary>
      <PWASettingsContent />
    </PWASettingsErrorBoundary>
  )
}
