import { Event } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Calendar,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Trophy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface MapEventCardProps {
  event: Event
  compact?: boolean
}

export function MapEventCard({ event, compact = false }: MapEventCardProps) {
  const navigate = useNavigate()

  const getWeatherIcon = (condition?: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-4 w-4 text-yellow-500" />
      case 'rainy':
        return <CloudRain className="h-4 w-4 text-blue-500" />
      case 'windy':
        return <Wind className="h-4 w-4 text-gray-500" />
      case 'cloudy':
      default:
        return <Cloud className="h-4 w-4 text-gray-400" />
    }
  }

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Avançado':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      case 'Profissional':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-secondary text-muted-foreground'
    }
  }

  return (
    <Card
      className={cn(
        'overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]',
        compact ? 'bg-background' : 'bg-card',
      )}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <div className={cn('relative', compact ? 'h-24' : 'h-36')}>
        <img
          src={event.image}
          className="w-full h-full object-cover"
          alt={event.title}
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge className="bg-background/80 text-foreground backdrop-blur-md shadow-sm hover:bg-background">
            {event.modality}
          </Badge>
        </div>
        {event.weather && (
          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
            {getWeatherIcon(event.weather.condition)}
            <span className="text-xs font-bold">{event.weather.temp}°</span>
          </div>
        )}
      </div>

      <CardContent className={cn('p-3', compact ? 'p-2' : 'p-3')}>
        <div className="flex justify-between items-start mb-1">
          <h3
            className={cn(
              'font-bold leading-tight line-clamp-1',
              compact ? 'text-sm' : 'text-base',
            )}
          >
            {event.title}
          </h3>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              {event.date} • {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">
              {event.city}, {event.state}
            </span>
          </div>
        </div>

        {!compact && (
          <div className="mt-3 flex items-center justify-between">
            <Badge
              variant="secondary"
              className={cn(
                'text-[10px] h-5 px-1.5 font-medium border-0',
                getLevelColor(event.level),
              )}
            >
              <Trophy className="h-3 w-3 mr-1" />
              {event.level}
            </Badge>
            <span className="text-sm font-bold text-primary">
              {event.price === 0 ? 'Grátis' : `R$ ${event.price.toFixed(2)}`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
