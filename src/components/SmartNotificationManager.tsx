import { useEffect } from 'react'
import { usePassportStore } from '@/stores/usePassportStore'
import useNotificationStore from '@/stores/useNotificationStore'
import { useSmartNotificationState } from '@/stores/useSmartNotificationState'
import { mockCurrentUser } from '@/lib/data'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export function SmartNotificationManager() {
  const { competitions, goals, certifications, verifyCertification } =
    usePassportStore()
  const { addNotification } = useNotificationStore()
  const { hasNotified, addNotifiedId } = useSmartNotificationState()
  const navigate = useNavigate()

  // Helper to parse DD/MM/YYYY
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  // Check for upcoming events
  useEffect(() => {
    const checkUpcomingEvents = () => {
      const today = new Date()
      // Simulate checking for "tomorrow" or "today" for demonstration
      // We'll also check if any mock competition has a future date relative to real time

      competitions.forEach((comp) => {
        const compDate = parseDate(comp.date)
        const diffTime = compDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        // Notify if event is within 3 days (or passed recently for demo purposes if we consider mock data valid)
        // For strictly future events:
        if (diffDays >= 0 && diffDays <= 3) {
          const notificationId = `event-reminder-${comp.id}`
          if (!hasNotified(notificationId)) {
            addNotification({
              title: 'Lembrete de Evento',
              message: `Faltam ${diffDays === 0 ? 'poucas horas' : diffDays + ' dias'} para ${comp.name}. Prepare-se!`,
              type: 'event_reminder',
              priority: 'high',
              link: '/profile/passport',
            })
            addNotifiedId(notificationId)
          }
        }
      })
    }

    const timer = setTimeout(checkUpcomingEvents, 3000)
    return () => clearTimeout(timer)
  }, [competitions, addNotification, hasNotified, addNotifiedId])

  // Check for goal deadlines
  useEffect(() => {
    const checkGoalDeadlines = () => {
      const today = new Date()

      goals.forEach((goal) => {
        if (goal.status === 'achieved') return // Don't notify for completed goals

        const deadlineDate = parseDate(goal.targetDate)
        const diffTime = deadlineDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        // Notify if deadline is approaching (within 7 days)
        if (diffDays >= 0 && diffDays <= 7) {
          const notificationId = `goal-deadline-${goal.id}`
          if (!hasNotified(notificationId)) {
            addNotification({
              title: 'Prazo da Meta Próximo',
              message: `Atenção! Faltam ${diffDays} dias para atingir sua meta: "${goal.title}".`,
              type: 'goal_deadline',
              priority: 'medium',
              link: '/profile/passport', // Direct to goals tab ideally
            })
            addNotifiedId(notificationId)
          }
        } else if (diffDays < 0) {
          // Expired
          const notificationId = `goal-expired-${goal.id}`
          if (!hasNotified(notificationId)) {
            addNotification({
              title: 'Prazo da Meta Expirado',
              message: `O prazo para "${goal.title}" encerrou. Atualize seu status.`,
              type: 'goal_deadline',
              priority: 'medium',
              link: '/profile/passport',
            })
            addNotifiedId(notificationId)
          }
        }
      })
    }

    const timer = setTimeout(checkGoalDeadlines, 4000)
    return () => clearTimeout(timer)
  }, [goals, addNotification, hasNotified, addNotifiedId])

  // Simulate Verification Update
  useEffect(() => {
    // We will simulate that a pending certification gets verified automatically after a few seconds
    // just to demonstrate the real-time notification capability.
    const simulateVerification = () => {
      const pendingCert = certifications.find((c) => !c.verified)

      if (pendingCert) {
        const notificationId = `cert-verified-${pendingCert.id}`

        if (!hasNotified(notificationId)) {
          // Perform the verification update in store
          verifyCertification(pendingCert.id)

          // Notify user
          addNotification({
            title: 'Verificação Concluída',
            message: `Sua certificação "${pendingCert.name}" foi validada com sucesso!`,
            type: 'verification',
            priority: 'high',
            link: '/profile/passport',
          })
          addNotifiedId(notificationId)

          // Also show a toast for immediate feedback
          toast.success('Documento Verificado!', {
            description: `${pendingCert.name} agora consta como oficial no seu passaporte.`,
            action: {
              label: 'Ver Passaporte',
              onClick: () => navigate('/profile/passport'),
            },
          })
        }
      }
    }

    // Delay simulation to occur 10 seconds after mount/app load
    const timer = setTimeout(simulateVerification, 10000)
    return () => clearTimeout(timer)
  }, [
    certifications,
    verifyCertification,
    addNotification,
    hasNotified,
    addNotifiedId,
    navigate,
  ])

  return null
}
