import { useWeatherStore } from '@/stores/useWeatherStore'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, X, ThermometerSun, CloudRain, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function WeatherAlertBanner() {
  const { activeAlerts, dismissAlert, preferences } = useWeatherStore()

  if (!preferences.enabled || activeAlerts.length === 0) return null

  // Show only the most critical alert in the banner
  const alert = activeAlerts[0]

  if (!alert.active) return null

  const getAlertStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400'
      case 'high':
        return 'border-orange-500 bg-orange-500/10 text-orange-700 dark:text-orange-400'
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
      default:
        return 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400'
    }
  }

  const getIcon = () => {
    switch (alert.type) {
      case 'storm':
        return <Zap className="h-5 w-5" />
      case 'rainy':
        return <CloudRain className="h-5 w-5" />
      case 'sunny':
        return <ThermometerSun className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div className="px-4 py-2 animate-in slide-in-from-top-4 fade-in duration-500">
      <Alert
        className={cn(
          'relative pr-10 shadow-sm border-l-4',
          getAlertStyle(alert.severity),
        )}
      >
        {getIcon()}
        <AlertTitle className="font-extrabold flex items-center gap-2">
          {alert.title}
        </AlertTitle>
        <AlertDescription className="text-xs font-semibold opacity-90 mt-1 leading-snug">
          {alert.message}
        </AlertDescription>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-black/10"
          onClick={() => dismissAlert(alert.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  )
}
