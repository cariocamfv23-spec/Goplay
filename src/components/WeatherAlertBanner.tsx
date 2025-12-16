import { useWeatherStore } from '@/stores/useWeatherStore'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function WeatherAlertBanner() {
  const { activeAlerts, dismissAlert, preferences } = useWeatherStore()

  if (!preferences.enabled || activeAlerts.length === 0) return null

  // Show only the most critical alert in the banner
  const alert = activeAlerts[0]

  if (!alert.active) return null

  const getTheme = () => {
    switch (alert.type) {
      case 'storm':
        return {
          border: 'border-red-500/20',
          bg: 'bg-gradient-to-r from-red-500/10 to-transparent',
          text: 'text-red-700 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          image: 'https://img.usecurling.com/i?q=thunderstorm&color=multicolor',
        }
      case 'rainy':
        return {
          border: 'border-blue-500/20',
          bg: 'bg-gradient-to-r from-blue-500/10 to-transparent',
          text: 'text-blue-700 dark:text-blue-400',
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          image: 'https://img.usecurling.com/i?q=heavy%20rain&color=multicolor',
        }
      case 'sunny':
        return {
          border: 'border-orange-500/20',
          bg: 'bg-gradient-to-r from-orange-500/10 to-transparent',
          text: 'text-orange-700 dark:text-orange-400',
          iconBg: 'bg-orange-100 dark:bg-orange-900/30',
          image:
            'https://img.usecurling.com/i?q=high%20temperature&color=multicolor',
        }
      case 'windy':
        return {
          border: 'border-zinc-500/20',
          bg: 'bg-gradient-to-r from-zinc-500/10 to-transparent',
          text: 'text-zinc-700 dark:text-zinc-400',
          iconBg: 'bg-zinc-100 dark:bg-zinc-800/50',
          image:
            'https://img.usecurling.com/i?q=strong%20wind&color=multicolor',
        }
      case 'snow':
        return {
          border: 'border-cyan-500/20',
          bg: 'bg-gradient-to-r from-cyan-500/10 to-transparent',
          text: 'text-cyan-700 dark:text-cyan-400',
          iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
          image: 'https://img.usecurling.com/i?q=snow&color=multicolor',
        }
      case 'fog':
        return {
          border: 'border-slate-500/20',
          bg: 'bg-gradient-to-r from-slate-500/10 to-transparent',
          text: 'text-slate-700 dark:text-slate-400',
          iconBg: 'bg-slate-100 dark:bg-slate-800/50',
          image: 'https://img.usecurling.com/i?q=fog&color=multicolor',
        }
      default:
        return {
          border: 'border-yellow-500/20',
          bg: 'bg-gradient-to-r from-yellow-500/10 to-transparent',
          text: 'text-yellow-700 dark:text-yellow-400',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
          image: 'https://img.usecurling.com/i?q=warning&color=multicolor',
        }
    }
  }

  const theme = getTheme()

  return (
    <div className="px-4 py-2 animate-in slide-in-from-top-4 fade-in duration-500 z-50 relative">
      <div
        className={cn(
          'relative flex items-center gap-3 p-3 rounded-2xl border shadow-sm backdrop-blur-md bg-background/80',
          theme.border,
        )}
      >
        <div
          className={cn('absolute inset-0 rounded-2xl opacity-50', theme.bg)}
        />

        <div
          className={cn(
            'relative p-1.5 rounded-xl shadow-sm shrink-0 flex items-center justify-center overflow-hidden',
            theme.iconBg,
          )}
        >
          <img
            src={theme.image}
            alt={alert.title}
            className="h-8 w-8 object-contain"
          />
        </div>

        <div className="relative flex-1 min-w-0 py-0.5">
          <h5
            className={cn(
              'text-xs font-bold uppercase tracking-wide mb-0.5',
              theme.text,
            )}
          >
            {alert.title}
          </h5>
          <p className="text-xs font-medium opacity-80 leading-snug text-foreground line-clamp-1">
            {alert.message}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full opacity-60 hover:opacity-100 hover:bg-background/50 transition-all shrink-0"
          onClick={() => dismissAlert(alert.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
