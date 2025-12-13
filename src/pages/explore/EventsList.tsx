import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Calendar, MapPin } from 'lucide-react'
import { mockEvents } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function EventsList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = mockEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50">
        <h1 className="text-xl font-bold mb-4">Eventos Esportivos</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-9 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filtered.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden border-none shadow-md cursor-pointer hover:scale-[1.01] transition-transform"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <div className="h-32 relative">
              <img
                src={event.image}
                className="w-full h-full object-cover"
                alt={event.title}
              />
              <Badge className="absolute top-2 right-2">{event.category}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {event.location}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
