import { useEffect } from 'react'
import { toast } from 'sonner'
import useNotificationStore from '@/stores/useNotificationStore'

export function WeatherAlertManager() {
  const { addNotification, notifications } = useNotificationStore()

  useEffect(() => {
    const hasAlreadyNotified = notifications.some(
      (n) => n.type === 'weather' && n.title === 'Alerta da Defesa Civil',
    )

    if (!hasAlreadyNotified) {
      const timer = setTimeout(() => {
        addNotification({
          title: 'Alerta da Defesa Civil',
          message:
            'Atenção: Previsão de chuva forte na sua região. Partidas ao ar livre podem ser suspensas.',
          type: 'weather',
          priority: 'critical',
        })
        toast.warning('Alerta Climático Regional', {
          description:
            'Previsão de chuvas fortes. Cuidado com eventos ao ar livre.',
        })
      }, 35000)

      return () => clearTimeout(timer)
    }
  }, [addNotification, notifications])

  return null
}
