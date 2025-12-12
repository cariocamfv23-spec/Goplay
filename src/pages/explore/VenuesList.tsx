import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Trophy, Star } from 'lucide-react'
import { mockVenues } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function VenuesList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  // Duplicating mock data for better visualization
  const venues = [...mockVenues, ...mockVenues].map((v, i) => ({
    ...v,
    id: `${v.id}-${i}`,
  }))

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar quadras, campos..."
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
            Futsal
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Society
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-4 shadow-sm"
          >
            Areia
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Quadras e Espaços
        </h2>

        {filteredVenues.map((venue) => (
          <Card
            key={venue.id}
            className="overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform"
            onClick={() => navigate(`/venues/${venue.id.split('-')[0]}`)}
          >
            <div className="relative h-40">
              <img
                src={`https://img.usecurling.com/p/600/400?q=${venue.img}&dpr=2`}
                className="w-full h-full object-cover"
                alt={venue.name}
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" /> {venue.rating}
              </div>
              <div className="absolute bottom-2 left-2 bg-primary/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm">
                {venue.price}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg">{venue.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground truncate mb-3">
                {venue.address}
              </p>
              <div className="flex flex-wrap gap-2">
                {venue.amenities.map((item, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-[10px] h-6 bg-secondary/50"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVenues.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhuma quadra encontrada.</p>
          </div>
        )}
      </div>
    </div>
  )
}
