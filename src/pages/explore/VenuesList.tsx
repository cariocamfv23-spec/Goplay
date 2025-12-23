import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Trophy, Star } from 'lucide-react'
import { mockVenues } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function VenuesList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('todos')

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'futebol', label: 'Futebol' },
    { id: 'areia', label: 'Areia' },
    { id: 'raquete', label: 'Raquete' },
    { id: 'outros', label: 'Outros' },
  ]

  const filteredVenues = mockVenues.filter((venue) => {
    // Search Filter
    const matchesSearch =
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.address.toLowerCase().includes(search.toLowerCase()) ||
      venue.type.toLowerCase().includes(search.toLowerCase())

    // Category Filter
    let matchesFilter = true
    if (activeFilter !== 'todos') {
      const type = venue.type.toLowerCase()
      if (activeFilter === 'futebol') {
        matchesFilter = type.includes('futsal') || type.includes('society')
      } else if (activeFilter === 'areia') {
        matchesFilter =
          type.includes('areia') ||
          type.includes('beach') ||
          type.includes('futevôlei') ||
          type.includes('vôlei')
      } else if (activeFilter === 'raquete') {
        matchesFilter =
          type.includes('tênis') ||
          type.includes('padel') ||
          type.includes('squash')
      } else if (activeFilter === 'outros') {
        matchesFilter =
          type.includes('basquete') || type.includes('poliesportiva')
      }
    }

    return matchesSearch && matchesFilter
  })

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
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'secondary'}
              size="sm"
              className={cn(
                'rounded-full px-4 shadow-sm transition-all',
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
              )}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Quadras e Espaços
        </h2>

        <div className="space-y-4">
          {filteredVenues.map((venue) => (
            <Card
              key={venue.id}
              className="overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform animate-slide-up hover:shadow-lg group"
              onClick={() => navigate(`/venues/${venue.id}`)}
            >
              <div className="relative h-44">
                <img
                  src={venue.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={venue.name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                  <Star className="h-3 w-3 fill-gold text-gold" />{' '}
                  {venue.rating}
                </div>
                <div className="absolute bottom-2 left-2 bg-primary/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white shadow-sm">
                  {venue.price}
                </div>
                <div className="absolute top-2 left-2">
                  <Badge
                    variant="secondary"
                    className="backdrop-blur-md bg-black/50 text-white border-none"
                  >
                    {venue.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg leading-tight">
                    {venue.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground truncate mb-3 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {venue.address}
                </p>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.slice(0, 3).map((item, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[10px] h-6 bg-secondary/50 font-normal"
                    >
                      {item}
                    </Badge>
                  ))}
                  {venue.amenities.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-6 bg-secondary/50 font-normal"
                    >
                      +{venue.amenities.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-10 text-muted-foreground animate-fade-in flex flex-col items-center">
            <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 opacity-40" />
            </div>
            <p className="font-medium">
              Nenhuma quadra encontrada para o filtro.
            </p>
            <p className="text-sm opacity-70 mb-4">
              Tente buscar por outro termo ou categoria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch('')
                setActiveFilter('todos')
              }}
              className="mt-2"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
