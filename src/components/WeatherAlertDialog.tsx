import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { AlertTriangle, CloudLightning, CloudRain, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

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
    // We don't dismiss from store immediately so it can remain in banner if needed,
    // or we can dismiss it. User story says "notification", usually dialog dismiss implies read.
    // Let's dismiss from store to clear it.
    dismissAlert(criticalAlert.id)
  }

  const getIcon = () => {
    switch (criticalAlert.type) {
      case 'storm':
        return <CloudLightning className="h-12 w-12 text-red-500" />
      case 'rainy':
        return <CloudRain className="h-12 w-12 text-orange-500" />
      case 'sunny':
        return <Sun className="h-12 w-12 text-orange-500" />
      default:
        return <AlertTriangle className="h-12 w-12 text-yellow-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] border-l-8 border-l-red-500">
        <DialogHeader className="flex flex-col items-center text-center gap-4 pt-4">
          <div className="p-4 rounded-full bg-red-50 dark:bg-red-900/20 animate-pulse">
            {getIcon()}
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-xl font-black text-red-600 dark:text-red-500 uppercase tracking-tight">
              {criticalAlert.title}
            </DialogTitle>
            <DialogDescription className="text-base font-medium text-foreground">
              {criticalAlert.message}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="bg-secondary/50 p-3 rounded-lg text-xs text-muted-foreground text-center mt-2">
          Fonte: Defesa Civil • {new Date().toLocaleDateString()}
        </div>
        <DialogFooter className="mt-4 sm:justify-center">
          <Button
            size="lg"
            variant="destructive"
            onClick={handleDismiss}
            className="w-full sm:w-auto font-bold"
          >
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
