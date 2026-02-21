import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowLeft,
  Bell,
  Calendar,
  Heart,
  Trophy,
  CloudLightning,
  GraduationCap,
  Zap,
  TrendingUp,
  Target,
  ShieldCheck,
  Clock,
  Handshake,
  Baby,
  TrendingDown,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useNotificationStore from '@/stores/useNotificationStore'
import { cn } from '@/lib/utils'

export default function Notifications() {
  const navigate = useNavigate()
  const { notifications, markAsRead, markAllAsRead, unreadCount } =
    useNotificationStore()

  const getIcon = (type: string, title: string = '') => {
    switch (type) {
      case 'challenge':
        return <Trophy className="h-5 w-5 text-gold" />
      case 'invite':
        return <Calendar className="h-5 w-5 text-blue-500" />
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />
      case 'weather':
        return <CloudLightning className="h-5 w-5 text-yellow-500" />
      case 'scholarship':
        return <GraduationCap className="h-5 w-5 text-emerald-500" />
      case 'level_up':
        return <Zap className="h-5 w-5 text-purple-500" />
      case 'ranking':
        if (
          title.toLowerCase().includes('caiu') ||
          title.toLowerCase().includes('desceu')
        ) {
          return <TrendingDown className="h-5 w-5 text-orange-500" />
        }
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case 'event_reminder':
        return <Clock className="h-5 w-5 text-orange-500" />
      case 'goal_deadline':
        return <Target className="h-5 w-5 text-red-500" />
      case 'verification':
        return <ShieldCheck className="h-5 w-5 text-blue-600" />
      case 'sponsorship_match':
        return <Handshake className="h-5 w-5 text-indigo-500" />
      case 'kids_zone':
        return <Baby className="h-5 w-5 text-pink-500" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  const getPriorityStyle = (priority?: string) => {
    if (priority === 'critical')
      return 'border-l-4 border-l-red-500 bg-red-500/10 dark:bg-red-900/20'
    if (priority === 'high')
      return 'border-l-4 border-l-green-500 bg-green-500/10 dark:bg-green-900/20'
    return 'hover:bg-secondary/30'
  }

  const handleNotificationClick = (not: any) => {
    if (!not.read) {
      markAsRead(not.id)
    }
    if (not.link) {
      navigate(not.link)
    }
  }

  const groupedNotifications = notifications.reduce(
    (acc, not) => {
      const date = not.date || 'Anteriores'
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(not)
      return acc
    },
    {} as Record<string, typeof notifications>,
  )

  const hasNotifications = notifications.length > 0

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-secondary/80"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Notificações</h1>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary text-xs h-8 px-2"
            onClick={markAllAsRead}
          >
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="p-4 space-y-6">
        {hasNotifications ? (
          Object.entries(groupedNotifications).map(([date, items]) => (
            <div key={date} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground px-1 uppercase tracking-wide">
                {date}
              </h3>
              <div className="space-y-2">
                {items.map((not) => (
                  <div
                    key={not.id}
                    className={cn(
                      'p-4 rounded-xl flex gap-4 transition-all relative overflow-hidden border border-border/30 shadow-sm',
                      not.read
                        ? 'bg-card opacity-90'
                        : 'bg-card ring-1 ring-primary/20 shadow-md',
                      getPriorityStyle(not.priority),
                      not.link && 'cursor-pointer active:scale-[0.98]',
                    )}
                    onClick={() => handleNotificationClick(not)}
                  >
                    {not.type === 'live_stream' && not.user ? (
                      <div className="relative shrink-0 mt-1">
                        <Avatar className="h-10 w-10 ring-2 ring-red-500 ring-offset-2 ring-offset-background">
                          <AvatarImage src={not.user.avatar} />
                          <AvatarFallback>
                            {not.user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-red-500 border-2 border-background rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 border border-border/50',
                          not.read ? 'bg-secondary/50' : 'bg-secondary',
                        )}
                      >
                        {getIcon(not.type, not.title)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4
                          className={cn(
                            'font-bold text-sm leading-tight',
                            not.read ? 'text-foreground/80' : 'text-foreground',
                            not.priority === 'critical' &&
                              'text-red-600 dark:text-red-400',
                            not.type === 'live_stream' && 'text-red-500',
                          )}
                        >
                          {not.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                        {not.message}
                      </p>

                      {not.type === 'live_stream' && (
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="destructive"
                            className="h-5 text-[10px] px-1.5 animate-pulse border-0"
                          >
                            LIVE
                          </Badge>
                          <span className="text-xs text-primary font-bold">
                            Assistir Agora
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground/70 font-medium">
                          {not.time}
                        </span>
                        {not.priority &&
                          not.priority !== 'low' &&
                          not.type !== 'live_stream' && (
                            <Badge
                              variant="outline"
                              className={cn(
                                'text-[10px] h-5 px-1.5 font-normal border-0',
                                not.priority === 'critical'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                  : not.priority === 'high'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
                              )}
                            >
                              {not.priority === 'critical'
                                ? 'Urgente'
                                : not.priority === 'high'
                                  ? 'Importante'
                                  : 'Info'}
                            </Badge>
                          )}
                      </div>
                    </div>
                    {!not.read && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="h-24 w-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
              <Bell className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-lg font-bold mb-2">Tudo limpo por aqui!</h3>
            <p className="text-muted-foreground max-w-[250px]">
              Você não tem notificações no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
