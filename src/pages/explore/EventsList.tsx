import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Calendar, MapPin, X, PlusCircle, Loader2 } from 'lucide-react'
import { mockEvents } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { eventsService, type EventItem } from '@/services/events'
import { useAuth } from '@/hooks/use-auth'

export default function EventsList() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'tryout' | 'event'>(
    'all',
  )
  const [realEvents, setRealEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    eventsService
      .getEvents({
        type: selectedType,
        currentUserId: user?.id,
      })
      .then(({ data }) => {
        setRealEvents(data || [])
        setLoading(false)
      })
  }, [selectedType, user?.id])

  const mappedRealEvents = realEvents.map((e) => ({
    id: e.id,
    title: e.title,
    date: `${new Date(e.eventDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}, ${e.eventTime}`,
    location: `${e.locationName} - ${e.city}, ${e.state}`,
    attendees: e.registrationsCount || 0,
    price: e.price === 0 ? 'Gratuito' : `R$ ${e.price.toFixed(2)}`,
    image:
      e.bannerUrl || 'https://img.usecurling.com/p/800/400?q=sports%20stadium',
    sport: e.sport,
    type: e.type === 'tryout' ? 'Peneira Oficial' : 'Evento / Torneio',
    isRegistered: e.isRegistered,
  }))

  const allDisplayEvents: any[] = [...mappedRealEvents, ...mockEvents]

  const filtered = allDisplayEvents.filter((e: any) => {
    const matchesSearch =
      (e.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (e.sport || '').toLowerCase().includes(search.toLowerCase()) ||
      (e.location || '').toLowerCase().includes(search.toLowerCase())

    const matchesType =
      selectedType === 'all'
        ? true
        : selectedType === 'tryout'
          ? (e.type?.toLowerCase().includes('peneira') ?? false)
          : !(e.type?.toLowerCase().includes('peneira') ?? false)

    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-border/40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Eventos & Peneiras
            </h1>
            <p className="text-xs text-muted-foreground">
              Inscrições reais e seletivas oficiais
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full gap-1.5 text-xs bg-primary text-white shadow-sm"
            onClick={() => navigate('/organizer/create')}
          >
            <PlusCircle className="w-4 h-4" />
            Criar Evento
          </Button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 mb-3">
          <Button
            size="sm"
            variant={selectedType === 'all' ? 'default' : 'outline'}
            className="h-7 text-xs rounded-full"
            onClick={() => setSelectedType('all')}
          >
            Todos
          </Button>
          <Button
            size="sm"
            variant={selectedType === 'tryout' ? 'default' : 'outline'}
            className="h-7 text-xs rounded-full border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
            onClick={() => setSelectedType('tryout')}
          >
            ⭐ Peneiras Oficiais
          </Button>
          <Button
            size="sm"
            variant={selectedType === 'event' ? 'default' : 'outline'}
            className="h-7 text-xs rounded-full"
            onClick={() => setSelectedType('event')}
          >
            Torneios
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar campeonatos, peneiras, treinos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary/50 rounded-xl pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/40"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground">
              Buscando eventos e seletivas...
            </span>
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((event: any) => (
            <Card
              key={event.id}
              className="overflow-hidden border-none shadow-md cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.99]"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="h-32 relative">
                <img
                  src={
                    event.image ||
                    'https://img.usecurling.com/p/800/400?q=sports%20event'
                  }
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {event.sport && (
                    <Badge
                      variant="secondary"
                      className="backdrop-blur-md bg-background/80"
                    >
                      {event.sport}
                    </Badge>
                  )}
                  {event.type && (
                    <Badge
                      variant="outline"
                      className={
                        event.type.includes('Peneira')
                          ? 'backdrop-blur-md bg-amber-500/20 border-amber-500 text-amber-500 font-bold'
                          : 'backdrop-blur-md bg-background/80'
                      }
                    >
                      {event.type}
                    </Badge>
                  )}
                  {event.isRegistered && (
                    <Badge className="bg-emerald-600 text-white font-bold">
                      Inscrito ✓
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1 mb-2">
                  {event.title}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">
                    {event.attendees || 0} inscritos
                  </span>
                  <span className="font-semibold text-primary">
                    {event.price || 'Gratuito'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum evento encontrado.
          </div>
        )}
      </div>
    </div>
  )
}
