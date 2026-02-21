import { useEffect, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import useNotificationStore from '@/stores/useNotificationStore'
import { mockFeedUsers, mockLiveEvents } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ToastAction } from '@/components/ui/toast'

export function LiveStreamManager() {
  const { toast } = useToast()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const navigate = useNavigate()
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (hasTriggered.current) return

    const timer = setTimeout(() => {
      hasTriggered.current = true

      const user = mockFeedUsers[0]
      const liveEvent = mockLiveEvents[0] || { id: 'live1' }

      addNotification({
        title: `${user.name} está ao vivo agora!`,
        message: 'Acompanhe a transmissão em tempo real.',
        type: 'live_stream',
        priority: 'high',
        link: `/explore/live/${liveEvent.id}`,
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
      })

      toast({
        title: (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 ring-1 ring-red-500 ring-offset-1 ring-offset-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <span>{user.name} iniciou uma transmissão ao vivo!</span>
          </div>
        ),
        description: (
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="destructive"
              className="h-4 text-[10px] px-1.5 animate-pulse border-0"
            >
              LIVE
            </Badge>
            <span className="text-xs text-muted-foreground">
              Clique para acompanhar.
            </span>
          </div>
        ),
        action: (
          <ToastAction
            altText="Assistir Agora"
            onClick={() => navigate(`/explore/live/${liveEvent.id}`)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 border-0 text-xs h-8 px-3"
          >
            Assistir Agora
          </ToastAction>
        ),
        duration: 8000,
      })
    }, 4000)

    return () => clearTimeout(timer)
  }, [addNotification, toast, navigate])

  return null
}
