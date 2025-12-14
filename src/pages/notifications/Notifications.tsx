import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Bell,
  Calendar,
  Heart,
  Trophy,
  CloudLightning,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockNotifications } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Notifications() {
  const navigate = useNavigate()

  const getIcon = (type: string) => {
    switch (type) {
      case 'challenge':
        return <Trophy className="h-5 w-5 text-gold" />
      case 'invite':
        return <Calendar className="h-5 w-5 text-blue-500" />
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />
      case 'weather':
        return <CloudLightning className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  const getPriorityStyle = (priority?: string) => {
    if (priority === 'critical')
      return 'border-l-4 border-l-red-500 bg-red-500/5'
    if (priority === 'high')
      return 'border-l-4 border-l-orange-500 bg-orange-500/5'
    return ''
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Notificações</h1>
      </div>

      <div className="p-4 space-y-2">
        {mockNotifications.map((not) => (
          <div
            key={not.id}
            className={cn(
              'p-4 rounded-xl flex gap-4 transition-colors',
              not.read ? 'bg-background' : 'bg-primary/5',
              getPriorityStyle(not.priority),
            )}
          >
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              {getIcon(not.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-1">{not.title}</h4>
              <p className="text-sm text-muted-foreground">{not.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{not.time}</p>
            </div>
            {!not.read && (
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
            )}
          </div>
        ))}
        {mockNotifications.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhuma notificação nova.</p>
          </div>
        )}
      </div>
    </div>
  )
}
