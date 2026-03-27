import { useEffect } from 'react'
import { usePassportStore } from '@/stores/usePassportStore'
import useNotificationStore from '@/stores/useNotificationStore'
import { useSmartNotificationState } from '@/stores/useSmartNotificationState'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Crown, Eye, Handshake, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockCurrentUser, mockProfiles } from '@/lib/data'

export function SmartNotificationManager() {
  const { competitions, goals, certifications, verifyCertification } =
    usePassportStore()
  const { addNotification } = useNotificationStore()
  const { hasNotified, addNotifiedId, canNotifyVip, recordVipView } =
    useSmartNotificationState()
  const { isInvisibleMode } = usePrivacyStore()
  const navigate = useNavigate()

  // Helper to parse DD/MM/YYYY
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  // VIP Profile View Simulation (within 2 seconds of landing on Home)
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

        const isScout = vip.role === 'Scout'
        const isSponsor = vip.role === 'Sponsor'

        const title = isScout
          ? 'Alerta de Olheiro'
          : isSponsor
            ? 'Oportunidade VIP'
            : 'Visitante VIP!'

        const message = isScout
          ? 'Um Olheiro visualizou seu Perfil VIP'
          : isSponsor
            ? 'Um Patrocinador demonstrou interesse no seu Perfil VIP'
            : `${vip.name} está visualizando seu perfil.`

        const NotificationIcon = isScout ? Eye : isSponsor ? Handshake : Crown

        addNotification({
          title,
          message,
          type: 'verification',
          priority: 'high',
          link: `/profile/${vip.id}`,
          user: {
            id: vip.id,
            name: vip.name,
            avatar: vip.avatar,
          },
        })

        // Custom Futuristic UI Feedback for VIP View
        toast.custom(
          (t) => (
            <div className="flex w-full items-center gap-3 rounded-2xl border-2 border-primary/30 bg-background/95 p-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-opacity-20',
                  isScout
                    ? 'bg-blue-500/20 text-blue-500'
                    : isSponsor
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-gold/20 text-gold',
                )}
              >
                <NotificationIcon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-tight">
                  {message}
                </p>
              </div>
              <button
                onClick={() => {
                  toast.dismiss(t)
                  navigate(`/profile/${vip.id}`)
                }}
                className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/20"
              >
                Ver Perfil
              </button>
            </div>
          ),
          { duration: 6000, position: 'top-center' },
        )
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

  // Simulate Friendship Suggestion (Proximity + Interests)
  useEffect(() => {
    const checkFriendshipSuggestions = () => {
      if (isInvisibleMode) return

      const myInterests = mockCurrentUser.interests || []
      if (myInterests.length === 0) return

      // Find users within 5km sharing at least 2 interests
      const suggestions = mockProfiles.filter((p) => {
        if (p.id === mockCurrentUser.id) return false
        if (!p.isDiscovered) return false

        const distance = p.distanceValue || Math.random() * 10
        if (distance > 5) return false

        const theirInterests = p.interests || []
        const sharedInterests = theirInterests.filter((i) =>
          myInterests.includes(i),
        )

        return sharedInterests.length >= 2
      })

      if (suggestions.length > 0) {
        // Pick a random suggestion to avoid always showing the same one if multiple match
        const friend =
          suggestions[Math.floor(Math.random() * suggestions.length)]
        const distance = friend.distanceValue || Math.random() * 4 + 1
        const shared = (friend.interests || []).filter((i) =>
          myInterests.includes(i),
        )

        const notificationId = `friend-suggestion-${friend.id}`

        if (!hasNotified(notificationId)) {
          addNotification({
            title: friend.name,
            message: `Tem interesses semelhantes aos seus! Gosta de ${shared.slice(0, 2).join(' e ')}.`,
            type: 'friend_suggestion',
            priority: 'medium',
            link: `/profile/${friend.id}`,
            user: {
              id: friend.id,
              name: friend.name,
              avatar: friend.avatar,
            },
          })
          addNotifiedId(notificationId)

          // Glassmorphism Toast for Friendship Suggestion
          toast.custom(
            (t) => (
              <div className="flex w-full items-center gap-3 rounded-2xl border-2 border-pink-500/30 bg-background/95 p-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/20 text-pink-500">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {friend.name}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-tight">
                    Tem interesses semelhantes aos seus!
                  </p>
                </div>
                <button
                  onClick={() => {
                    toast.dismiss(t)
                    navigate(`/profile/${friend.id}`)
                  }}
                  className="shrink-0 rounded-xl bg-pink-500 px-3 py-2 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-pink-500/20"
                >
                  Ver Perfil
                </button>
              </div>
            ),
            { duration: 6000, position: 'top-center' },
          )
        }
      }
    }

    // Delay slightly to not conflict with VIP notification
    const timer = setTimeout(checkFriendshipSuggestions, 6000)
    return () => clearTimeout(timer)
  }, [isInvisibleMode, addNotification, hasNotified, addNotifiedId, navigate])

  return null
}
