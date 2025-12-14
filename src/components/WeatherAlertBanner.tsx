import { useWeatherStore } from '@/stores/useWeatherStore'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function WeatherAlertBanner() {
  const { activeAlerts, dismissAlert, preferences } = useWeatherStore()

  if (!preferences.enabled || activeAlerts.length === 0) return null

  // Show only the most critical alert
  const alert = activeAlerts[0]

  if (!alert.active) return null

  const getAlertStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
      case 'high':
        return 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400'
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
      default:
        return 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
    }
  }

  return (
    <div className="px-4 pt-4 animate-slide-in-right">
      <Alert
        className={cn(
          'relative pr-10 shadow-sm',
          getAlertStyle(alert.severity),
        )}
      >
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="font-bold">{alert.title}</AlertTitle>
        <AlertDescription className="text-xs font-medium opacity-90 mt-1">
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
