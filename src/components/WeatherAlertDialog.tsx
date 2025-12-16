import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export function WeatherAlertDialog() {
  const { activeAlerts, dismissAlert } = useWeatherStore()
  const [open, setOpen] = useState(false)
  const [currentAlert, setCurrentAlert] = useState<string | null>(null)

  // Find the most critical alert
  const criticalAlert = activeAlerts.find(
    (a) => a.severity === 'critical' || a.severity === 'high',
  )

  useEffect(() => {
    if (criticalAlert && criticalAlert.id !== currentAlert) {
      setOpen(true)
      setCurrentAlert(criticalAlert.id)
    }
  }, [criticalAlert, currentAlert])

  if (!criticalAlert) return null

  const handleDismiss = () => {
    setOpen(false)
    dismissAlert(criticalAlert.id)
  }

  const getAlertConfig = () => {
    switch (criticalAlert.type) {
      case 'storm':
        return {
          image: 'https://img.usecurling.com/i?q=thunderstorm&color=multicolor',
          color: 'text-red-600 dark:text-red-500',
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          gradient: 'from-red-500/30 via-red-500/5 to-transparent',
          badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
          label: 'Tempestade Severa',
        }
      case 'rainy':
        return {
          image: 'https://img.usecurling.com/i?q=heavy%20rain&color=multicolor',
          color: 'text-blue-600 dark:text-blue-500',
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          gradient: 'from-blue-500/30 via-blue-500/5 to-transparent',
          badge:
            'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
          label: 'Chuva Intensa',
        }
      case 'sunny':
        return {
          image:
            'https://img.usecurling.com/i?q=high%20temperature&color=multicolor',
          color: 'text-orange-600 dark:text-orange-500',
          bg: 'bg-orange-500/20',
          border: 'border-orange-500/30',
          gradient: 'from-orange-500/30 via-orange-500/5 to-transparent',
          badge:
            'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
          label: 'Calor Extremo',
        }
      case 'windy':
        return {
          image:
            'https://img.usecurling.com/i?q=strong%20wind&color=multicolor',
          color: 'text-zinc-600 dark:text-zinc-400',
          bg: 'bg-zinc-500/20',
          border: 'border-zinc-500/30',
          gradient: 'from-zinc-500/30 via-zinc-500/5 to-transparent',
          badge:
            'bg-zinc-100 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300',
          label: 'Ventos Fortes',
        }
      case 'snow':
        return {
          image: 'https://img.usecurling.com/i?q=snow&color=multicolor',
          color: 'text-cyan-600 dark:text-cyan-400',
          bg: 'bg-cyan-500/20',
          border: 'border-cyan-500/30',
          gradient: 'from-cyan-500/30 via-cyan-500/5 to-transparent',
          badge:
            'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
          label: 'Neve',
        }
      case 'fog':
        return {
          image: 'https://img.usecurling.com/i?q=fog&color=multicolor',
          color: 'text-slate-600 dark:text-slate-400',
          bg: 'bg-slate-500/20',
          border: 'border-slate-500/30',
          gradient: 'from-slate-500/30 via-slate-500/5 to-transparent',
          badge:
            'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300',
          label: 'Nevoeiro',
        }
      default:
        return {
          image: 'https://img.usecurling.com/i?q=warning&color=multicolor',
          color: 'text-yellow-600 dark:text-yellow-500',
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/30',
          gradient: 'from-yellow-500/30 via-yellow-500/5 to-transparent',
          badge:
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
          label: 'Alerta Meteorológico',
        }
    }
  }

  const config = getAlertConfig()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden border border-border/50 shadow-2xl sm:max-w-[400px] bg-background/95 backdrop-blur-xl gap-0">
        {/* Decorative Header Background */}
        <div
          className={cn(
            'absolute inset-0 h-40 bg-gradient-to-b opacity-100',
            config.gradient,
          )}
        />

        <div className="relative flex flex-col items-center pt-10 px-6 pb-8 text-center z-10">
          {/* Animated Icon Container */}
          <div className="relative mb-6 group">
            <div
              className={cn(
                'relative p-6 rounded-3xl ring-1 ring-inset shadow-lg backdrop-blur-sm transition-transform duration-700 hover:scale-105 flex items-center justify-center',
                config.bg,
                config.color,
                config.border,
              )}
            >
              <img
                src={config.image}
                alt={config.label}
                className="h-20 w-20 object-contain drop-shadow-md"
              />
            </div>
            {/* Pulse Effect */}
            <div
              className={cn(
                'absolute inset-0 -z-10 rounded-3xl animate-ping opacity-20',
                config.bg,
              )}
            />
          </div>

          <Badge
            variant="outline"
            className={cn(
              'mb-4 border font-bold px-3 py-1 uppercase tracking-wider text-[10px] shadow-sm',
              config.badge,
              'border-transparent',
            )}
          >
            {config.label}
          </Badge>

          <DialogHeader className="mb-2 space-y-3 w-full">
            <DialogTitle className="text-2xl font-black uppercase tracking-tight leading-tight text-foreground">
              {criticalAlert.title}
            </DialogTitle>
            <DialogDescription className="text-base font-medium text-muted-foreground leading-relaxed px-2">
              {criticalAlert.message}
            </DialogDescription>
          </DialogHeader>

          <div className="text-[11px] font-bold tracking-wide text-muted-foreground/60 mt-6 flex items-center gap-2 uppercase">
            <span>Defesa Civil</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>
              {new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        <DialogFooter className="p-4 bg-secondary/30 border-t border-border/50">
          <Button
            size="lg"
            className={cn(
              'w-full font-bold shadow-lg transition-all active:scale-[0.98] h-12 text-base rounded-xl',
              criticalAlert.severity === 'critical'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-primary hover:bg-primary/90',
            )}
            onClick={handleDismiss}
          >
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
