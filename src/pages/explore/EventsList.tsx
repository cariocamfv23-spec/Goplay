import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, MapPin, Calendar, Ticket } from 'lucide-react'
import { mockEvents } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function EventsList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  // Duplicating mock data to demonstrate list view better since original data is sparse
  const events = [...mockEvents, ...mockEvents, ...mockEvents].map((e, i) => ({
    ...e,
    id: `${e.id}-${i}`,
  }))

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Todos
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Campeonatos
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Amistosos
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Peneiras
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Ticket className="h-5 w-5 text-primary" />
          Próximos Eventos
        </h2>

        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg active:scale-[0.99] transition-all"
            onClick={() => navigate(`/events/${event.id.split('-')[0]}`)}
          >
            <div className="h-48 relative">
              <img
                src={event.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={event.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <Badge className="w-fit mb-2 bg-primary/90 hover:bg-primary border-none text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {event.date}
                </Badge>
                <h3 className="font-bold text-white text-xl leading-tight mb-1">
                  {event.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center text-white/80 text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                  <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md">
                    {event.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Ticket className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum evento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
