import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  Trophy,
  Calendar,
  Heart,
  CloudLightning,
  GraduationCap,
  Zap,
  TrendingUp,
  Clock,
  Target,
  ShieldCheck,
  Handshake,
  Baby,
  Info,
  TrendingDown,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useNotificationStore from '@/stores/useNotificationStore'
import { cn } from '@/lib/utils'

export function NotificationMenu() {
  const navigate = useNavigate()
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore()
  const [open, setOpen] = useState(false)

  const handleItemClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    setOpen(false)
    if (notification.link) {
      navigate(notification.link)
    }
  }

  const getIcon = (type: string, title: string = '') => {
    switch (type) {
      case 'challenge':
        return <Trophy className="h-4 w-4 text-gold" />
      case 'invite':
        return <Calendar className="h-4 w-4 text-blue-500" />
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />
      case 'weather':
        return <CloudLightning className="h-4 w-4 text-yellow-500" />
      case 'scholarship':
        return <GraduationCap className="h-4 w-4 text-emerald-500" />
      case 'level_up':
        return <Zap className="h-4 w-4 text-purple-500" />
      case 'ranking':
        if (
          title.toLowerCase().includes('caiu') ||
          title.toLowerCase().includes('desceu')
        ) {
          return <TrendingDown className="h-4 w-4 text-orange-500" />
        }
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'event_reminder':
        return <Clock className="h-4 w-4 text-orange-500" />
      case 'goal_deadline':
        return <Target className="h-4 w-4 text-red-500" />
      case 'verification':
        return <ShieldCheck className="h-4 w-4 text-blue-600" />
      case 'sponsorship_match':
        return <Handshake className="h-4 w-4 text-indigo-500" />
      case 'kids_zone':
        return <Baby className="h-4 w-4 text-pink-500" />
      default:
        return <Info className="h-4 w-4 text-primary" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/50 relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-background animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notificações</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-primary hover:bg-transparent"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    'flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b last:border-0 relative',
                    !notification.read && 'bg-muted/30',
                  )}
                  onClick={() => handleItemClick(notification)}
                >
                  {notification.type === 'live_stream' && notification.user ? (
                    <Avatar
                      className={cn(
                        'mt-1 h-8 w-8 shrink-0 ring-2 ring-offset-2 ring-offset-background',
                        notification.link?.includes('/replay/')
                          ? 'ring-primary'
                          : 'ring-red-500 animate-pulse',
                      )}
                    >
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback>
                        {notification.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div
                      className={cn(
                        'mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 border',
                        !notification.read
                          ? 'bg-background border-primary/20'
                          : 'bg-muted border-transparent',
                      )}
                    >
                      {getIcon(notification.type, notification.title)}
                    </div>
                  )}
                  <div className="flex-1 space-y-1 pr-4">
                    <p
                      className={cn(
                        'text-sm font-medium leading-none',
                        !notification.read && 'font-semibold',
                        notification.type === 'live_stream' &&
                          !notification.link?.includes('/replay/') &&
                          'text-red-500',
                      )}
                    >
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>

                    {notification.type === 'live_stream' &&
                    notification.link?.includes('/replay/') ? (
                      <div className="flex items-center gap-2 pt-1">
                        <Badge
                          variant="secondary"
                          className="h-4 text-[9px] px-1 uppercase border-0 bg-secondary/50"
                        >
                          REPLAY
                        </Badge>
                        <span className="text-[10px] text-primary font-bold">
                          Assistir Replay
                        </span>
                      </div>
                    ) : (
                      notification.type === 'live_stream' && (
                        <div className="flex items-center gap-2 pt-1">
                          <Badge
                            variant="destructive"
                            className="h-4 text-[9px] px-1 uppercase animate-pulse border-0"
                          >
                            LIVE
                          </Badge>
                          <span className="text-[10px] text-primary font-bold">
                            Assistir Agora
                          </span>
                        </div>
                      )
                    )}

                    <p className="text-[10px] text-muted-foreground pt-1">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-center p-4">
              <Bell className="h-8 w-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">
                Você não tem notificações no momento.
              </p>
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t text-center">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              setOpen(false)
              navigate('/notifications')
            }}
          >
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
