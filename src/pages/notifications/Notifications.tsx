import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCircle,
  CreditCard,
  User,
  Car,
  CalendarClock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useNotificationStore from '@/stores/useNotificationStore'
import { cn } from '@/lib/utils'

export default function Notifications() {
  const navigate = useNavigate()
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore()

  const getIcon = (type: string) => {
    switch (type) {
      case 'profile_update':
        return <User className="h-5 w-5 text-blue-500" />
      case 'transaction':
        return <CreditCard className="h-5 w-5 text-green-500" />
      case 'ride_request':
        return <Car className="h-5 w-5 text-orange-500" />
      case 'scheduled_ride':
        return <CalendarClock className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Notificações</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={markAllAsRead}
        >
          Marcar todas como lidas
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Nenhuma notificação no momento.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                'transition-all duration-300 border-l-4 cursor-pointer hover:bg-secondary/10',
                notification.read ? 'border-l-border' : 'border-l-primary',
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4 flex gap-4">
                <div
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center shrink-0',
                    notification.read ? 'bg-secondary' : 'bg-primary/10',
                  )}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4
                      className={cn(
                        'font-semibold text-sm',
                        !notification.read && 'text-primary',
                      )}
                    >
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {notification.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
