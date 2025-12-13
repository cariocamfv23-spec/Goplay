import { mockNotifications } from '@/lib/data'
import useNotificationStore from '@/stores/useNotificationStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Bell } from 'lucide-react'
import { useEffect } from 'react'

export default function Notifications() {
  const { notifications, markAllAsRead } = useNotificationStore()
  // Use mock notifications if store is empty for demo
  const displayNotifications =
    notifications.length > 0 ? notifications : mockNotifications

  useEffect(() => {
    // Optionally mark all as read on mount or leave for user action
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md p-4 border-b border-border/50 flex justify-between items-center">
        <h1 className="text-xl font-bold">Notificações</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          className="text-xs"
        >
          <Check className="h-4 w-4 mr-1" /> Marcar lidas
        </Button>
      </div>

      <div className="p-4 space-y-3">
        {displayNotifications.map((notif) => (
          <Card
            key={notif.id}
            className={`border-none shadow-sm ${!notif.read ? 'bg-secondary/30 border-l-2 border-l-primary' : 'bg-card'}`}
          >
            <CardContent className="p-4 flex gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${!notif.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
              >
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`text-sm ${!notif.read ? 'font-bold' : 'font-medium'}`}
                  >
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-muted-foreground">
                    {notif.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-snug">
                  {notif.message}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {displayNotifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhuma notificação.</p>
          </div>
        )}
      </div>
    </div>
  )
}
