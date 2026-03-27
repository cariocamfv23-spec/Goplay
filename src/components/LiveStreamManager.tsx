import { useEffect } from 'react'
import { toast } from 'sonner'
import useNotificationStore from '@/stores/useNotificationStore'

export function LiveStreamManager() {
  const { addNotification, notifications } = useNotificationStore()

  useEffect(() => {
    const hasAlreadyNotified = notifications.some(
      (n) => n.type === 'live_stream' && n.title === 'Transmissão Ao Vivo',
    )

    if (!hasAlreadyNotified) {
      const timer = setTimeout(() => {
        addNotification({
          title: 'Transmissão Ao Vivo',
          message:
            'A grande final do campeonato regional começou! Não perca os melhores lances.',
          type: 'live_stream',
          priority: 'high',
          link: '/explore/live',
        })
        toast.message('Ao Vivo Agora!', {
          description:
            'A final do campeonato regional começou. Assista em tempo real.',
        })
      }, 45000)

      return () => clearTimeout(timer)
    }
  }, [addNotification, notifications])

  return null
}
