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
  Crown,
  MessageCircle,
  MessageSquare,
  Megaphone,
  History,
  UserPlus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useNotificationStore from '@/stores/useNotificationStore'
import { useFlashbackStore } from '@/stores/useFlashbackStore'
import { cn } from '@/lib/utils'

export function NotificationMenu() {
  const navigate = useNavigate()
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore()
  const { openFlashback } = useFlashbackStore()
  const [open, setOpen] = useState(false)

  const hasUnreadMemory = notifications.some(
    (n) => !n.read && (n.type === 'time_travel' || n.type === 'memory'),
  )

  const handleItemClick = (notification: any) => {
    setOpen(false)

    if (notification.type === 'time_travel' || notification.type === 'memory') {
      const memoryId =
        notification.link?.replace('modal:', '')?.replace('/memory/', '') ||
        'today'
      openFlashback(memoryId, notification.id)
      return
    }

    if (!notification.read) {
      markAsRead(notification.id)
    }

    if (notification.link) {
      navigate(notification.link)
    } else if (notification.type === 'friend_suggestion') {
      const profileId =
        notification.suggestedUserId || notification.id || 'new-friend'
      navigate(`/profile/${profileId}`)
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
        if (title.toLowerCase().includes('vip')) {
          return <Crown className="h-4 w-4 text-gold" />
        }
        return <ShieldCheck className="h-4 w-4 text-blue-600" />
      case 'sponsorship_match':
        return <Handshake className="h-4 w-4 text-indigo-500" />
      case 'kids_zone':
        return <Baby className="h-4 w-4 text-pink-500" />
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'thread_comment':
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case 'system_update':
        return <Megaphone className="h-4 w-4 text-primary" />
      case 'memory':
      case 'time_travel':
        return <History className="h-4 w-4 text-purple-500" />
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
            <span
              className={cn(
                'absolute top-2 right-2 h-2.5 w-2.5 rounded-full border-2 border-background animate-pulse',
                hasUnreadMemory
                  ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                  : 'bg-red-500',
              )}
            />
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
                    'flex gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b last:border-0 relative',
                    notification.type === 'friend_suggestion'
                      ? 'items-center'
                      : 'items-start',
                    !notification.read && 'bg-muted/30',
                    notification.title.toLowerCase().includes('vip') &&
                      !notification.read &&
                      'bg-gold/5',
                    (notification.type === 'time_travel' ||
                      notification.type === 'memory') &&
                      !notification.read &&
                      'bg-purple-500/5',
                  )}
                  onClick={() => handleItemClick(notification)}
                >
                  {notification.user ||
                  notification.imageUrl ||
                  notification.avatarUrl ||
                  notification.type === 'friend_suggestion' ? (
                    <div
                      className={cn(
                        'relative shrink-0',
                        notification.type !== 'friend_suggestion' && 'mt-1',
                      )}
                    >
                      <Avatar
                        className={cn(
                          'h-8 w-8 ring-2 ring-offset-2 ring-offset-background',
                          notification.type === 'live_stream'
                            ? notification.link?.includes('/replay/')
                              ? 'ring-primary'
                              : 'ring-red-500 animate-pulse'
                            : notification.type === 'friend_suggestion'
                              ? 'ring-pink-500'
                              : 'ring-transparent border border-border',
                        )}
                      >
                        <AvatarImage
                          src={
                            notification.user?.avatar ||
                            notification.avatarUrl ||
                            notification.imageUrl ||
                            `https://img.usecurling.com/ppl/thumbnail?seed=${notification.id}`
                          }
                        />
                        <AvatarFallback>
                          {(
                            notification.user?.name ||
                            notification.title ||
                            'U'
                          )
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {notification.type === 'live_stream' &&
                        !notification.link?.includes('/replay/') && (
                          <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 bg-red-500 border-2 border-background rounded-full animate-pulse" />
                        )}
                      {notification.type === 'comment' && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 border-2 border-background rounded-full flex items-center justify-center shadow-sm">
                          <MessageCircle className="h-2 w-2 text-white" />
                        </div>
                      )}
                      {notification.type === 'thread_comment' && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 border-2 border-background rounded-full flex items-center justify-center shadow-sm">
                          <MessageSquare className="h-2 w-2 text-white" />
                        </div>
                      )}
                      {notification.type === 'friend_suggestion' && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-pink-500 border-2 border-background rounded-full flex items-center justify-center shadow-sm">
                          <UserPlus className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 border',
                        !notification.read
                          ? 'bg-background border-primary/20'
                          : 'bg-muted border-transparent',
                        notification.title.toLowerCase().includes('vip') &&
                          'bg-gold/10 border-gold/30',
                        notification.type === 'system_update' &&
                          'bg-primary/10 border-primary/30',
                        (notification.type === 'time_travel' ||
                          notification.type === 'memory') &&
                          'bg-purple-500/10 border-purple-500/30',
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
                        notification.title.toLowerCase().includes('vip') &&
                          'text-gold',
                        notification.type === 'live_stream' &&
                          !notification.link?.includes('/replay/') &&
                          'text-red-500',
                        (notification.type === 'time_travel' ||
                          notification.type === 'memory') &&
                          'text-purple-600 dark:text-purple-400',
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
                            AO VIVO
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
                    <div
                      className={cn(
                        'absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full',
                        notification.title.toLowerCase().includes('vip')
                          ? 'bg-gold'
                          : notification.type === 'time_travel' ||
                              notification.type === 'memory'
                            ? 'bg-purple-500'
                            : 'bg-primary',
                      )}
                    />
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
