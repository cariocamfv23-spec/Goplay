import { useEffect } from 'react'
import { toast } from 'sonner'
import useNotificationStore from '@/stores/useNotificationStore'

export function RankingAlertManager() {
  const { addNotification, notifications } = useNotificationStore()

  useEffect(() => {
    const hasAlreadyNotified = notifications.some(
      (n) => n.type === 'ranking' && n.title === 'Atualização de Ranking',
    )

    if (!hasAlreadyNotified) {
      const timer = setTimeout(() => {
        addNotification({
          title: 'Atualização de Ranking',
          message:
            'Excelente! Você subiu 3 posições no Ranking Global de Atletas.',
          type: 'ranking',
          priority: 'high',
          link: '/ranking',
        })
        toast.success('Ranking Atualizado!', {
          description:
            'Você subiu 3 posições no Ranking Global. Continue assim!',
        })
      }, 12000)

      return () => clearTimeout(timer)
    }
  }, [addNotification, notifications])

  return null
}
