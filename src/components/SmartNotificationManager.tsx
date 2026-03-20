import { useEffect } from 'react'
import { usePassportStore } from '@/stores/usePassportStore'
import useNotificationStore from '@/stores/useNotificationStore'
import { useSmartNotificationState } from '@/stores/useSmartNotificationState'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Crown } from 'lucide-react'

export function SmartNotificationManager() {
  const { competitions, goals, certifications, verifyCertification } =
    usePassportStore()
  const { addNotification } = useNotificationStore()
  const { hasNotified, addNotifiedId, canNotifyVip, recordVipView } =
    useSmartNotificationState()
  const navigate = useNavigate()

  // Helper to parse DD/MM/YYYY
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  // VIP View Simulation (within 2 seconds of landing)
  useEffect(() => {
    const simulateVipView = () => {
      const vipVisitors = [
        {
          id: 'u10',
          name: 'Rafael Torres',
          role: 'Scout',
          avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=78',
        },
        {
          id: 'u4',
          name: 'Carlos Eduardo',
          role: 'Coach',
          avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=45',
        },
        {
          id: 'a1',
          name: 'GoGlobal Sports',
          role: 'Sponsor',
          avatar: 'https://img.usecurling.com/i?q=globe&color=blue',
        },
      ]

      // Pick a random VIP
      const vip = vipVisitors[Math.floor(Math.random() * vipVisitors.length)]
      const now = Date.now()

      if (canNotifyVip(vip.id, now)) {
        recordVipView(vip.id, now)

        const message = `${vip.role} is viewing your profile right now! Tap to see who it is.`

        addNotification({
          title: 'VIP Profile View!',
          message,
          type: 'system',
          priority: 'critical',
          link: `/profile/${vip.id}`,
          user: {
            id: vip.id,
            name: vip.name,
            avatar: vip.avatar,
          },
        })

        toast('VIP Profile View!', {
          description: message,
          icon: <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />,
          action: {
            label: 'Ver Perfil',
            onClick: () => navigate(`/profile/${vip.id}`),
          },
          duration: 8000,
        })
      }
    }

    const timer = setTimeout(simulateVipView, 2000)
    return () => clearTimeout(timer)
  }, [canNotifyVip, recordVipView, addNotification, navigate])

  // Check for upcoming events
  useEffect(() => {
    const checkUpcomingEvents = () => {
      const today = new Date()

      competitions.forEach((comp) => {
        const compDate = parseDate(comp.date)
        const diffTime = compDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

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
        if (goal.status === 'achieved') return

        const deadlineDate = parseDate(goal.targetDate)
        const diffTime = deadlineDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays >= 0 && diffDays <= 7) {
          const notificationId = `goal-deadline-${goal.id}`
          if (!hasNotified(notificationId)) {
            addNotification({
              title: 'Prazo da Meta Próximo',
              message: `Atenção! Faltam ${diffDays} dias para atingir sua meta: "${goal.title}".`,
              type: 'goal_deadline',
              priority: 'medium',
              link: '/profile/passport',
            })
            addNotifiedId(notificationId)
          }
        } else if (diffDays < 0) {
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
    const simulateVerification = () => {
      const pendingCert = certifications.find((c) => !c.verified)

      if (pendingCert) {
        const notificationId = `cert-verified-${pendingCert.id}`

        if (!hasNotified(notificationId)) {
          verifyCertification(pendingCert.id)

          addNotification({
            title: 'Verificação Concluída',
            message: `Sua certificação "${pendingCert.name}" foi validada com sucesso!`,
            type: 'verification',
            priority: 'high',
            link: '/profile/passport',
          })
          addNotifiedId(notificationId)

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
