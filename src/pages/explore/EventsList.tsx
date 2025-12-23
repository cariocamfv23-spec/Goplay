import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Calendar, MapPin, X } from 'lucide-react'
import { mockEvents } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function EventsList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = mockEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50">
        <h1 className="text-xl font-bold mb-4">Eventos Esportivos</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar eventos, locais..."
            className="pl-9 pr-8 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filtered.length > 0 ? (
          filtered.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border-none shadow-md cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.99]"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="h-32 relative">
                <img
                  src={event.image}
                  className="w-full h-full object-cover"
                  alt={event.title}
                />
                <Badge className="absolute top-2 right-2 shadow-sm">
                  {event.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="absolute bottom-2 left-2 bg-black/60 text-white backdrop-blur-sm border-none"
                >
                  {event.price === 0
                    ? 'Grátis'
                    : `R$ ${event.price.toFixed(2)}`}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 leading-tight">
                  {event.title}
                </h3>
                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> {event.date} •{' '}
                    {event.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> {event.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300">
            <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="font-bold text-lg mb-1">Nenhum evento encontrado</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
              Tente buscar por outro termo ou verifique a ortografia.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearch('')}
            >
              Limpar busca
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
