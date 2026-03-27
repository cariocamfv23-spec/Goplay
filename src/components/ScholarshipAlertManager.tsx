import { useEffect } from 'react'
import { toast } from 'sonner'
import useNotificationStore from '@/stores/useNotificationStore'

export function ScholarshipAlertManager() {
  const { addNotification, notifications } = useNotificationStore()

  useEffect(() => {
    const hasAlreadyNotified = notifications.some(
      (n) => n.type === 'scholarship' && n.title === 'Nova Bolsa de Estudos',
    )

    if (!hasAlreadyNotified) {
      const timer = setTimeout(() => {
        addNotification({
          title: 'Nova Bolsa de Estudos',
          message:
            'Uma universidade internacional está buscando atletas com as suas habilidades.',
          type: 'scholarship',
          priority: 'high',
          link: '/explore/scholarships',
        })
        toast.info('Match de Bolsa Encontrado!', {
          description:
            'Uma nova oportunidade acadêmica internacional compatível com seu perfil.',
        })
      }, 20000)

      return () => clearTimeout(timer)
    }
  }, [addNotification, notifications])

  return null
}
