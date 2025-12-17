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

  // Extend mock data to support all filters and better visualization
  const allVenues = [
    ...mockVenues,
    {
      id: 'v3',
      name: 'Arena Beach',
      type: 'Quadra de Areia',
      rating: 4.8,
      reviews: 42,
      distance: '3.0 km',
      location: 'Barra Funda',
      address: 'Av. Marques, 100',
      image:
        'https://img.usecurling.com/p/400/300?q=beach%20volleyball&color=yellow',
      img: 'beach%20volleyball',
      price: 'R$ 180/h',
      amenities: ['Ducha', 'Bar', 'Areia Fina'],
      description: 'Quadra de areia oficial.',
    },
    {
      id: 'v4',
      name: 'Futsal Pro',
      type: 'Futsal',
      rating: 4.9,
      reviews: 156,
      distance: '1.2 km',
      location: 'Centro',
      address: 'Rua Central, 50',
      image:
        'https://img.usecurling.com/p/400/300?q=futsal%20indoor&color=blue',
      img: 'futsal%20indoor',
      price: 'R$ 120/h',
      amenities: ['Vestiário', 'Wi-Fi', 'Arquibancada'],
      description: 'Quadra de futsal profissional com dimensões oficiais.',
    },
    {
      id: 'v5',
      name: 'Society Club',
      type: 'Campo Society',
      rating: 4.6,
      reviews: 88,
      distance: '4.5 km',
      location: 'Zona Sul',
      address: 'Av. dos Bandeirantes, 2000',
      image:
        'https://img.usecurling.com/p/400/300?q=soccer%20field&color=green',
      img: 'soccer%20field',
      price: 'R$ 220/h',
      amenities: ['Churrasqueira', 'Estacionamento', 'Bar'],
      description: 'Campo society com grama sintética nova.',
    },
  ]

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'futsal', label: 'Futsal' },
    { id: 'society', label: 'Society' },
    { id: 'areia', label: 'Areia' },
  ]

  const filteredVenues = allVenues.filter((venue) => {
    // Search Filter
    const matchesSearch =
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.address.toLowerCase().includes(search.toLowerCase())

    // Category Filter
    let matchesFilter = true
    if (activeFilter !== 'todos') {
      const type = venue.type.toLowerCase()
      if (activeFilter === 'futsal') {
        matchesFilter =
          type.includes('futsal') ||
          type.includes('poliesportiva') ||
          type.includes('indoor')
      } else if (activeFilter === 'society') {
        matchesFilter = type.includes('society') || type.includes('campo')
      } else if (activeFilter === 'areia') {
        matchesFilter =
          type.includes('areia') ||
          type.includes('beach') ||
          type.includes('vôlei')
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
              className="overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform animate-slide-up hover:shadow-lg"
              onClick={() => navigate(`/venues/${venue.id.split('-')[0]}`)}
            >
              <div className="relative h-40">
                <img
                  src={
                    venue.img
                      ? `https://img.usecurling.com/p/600/400?q=${venue.img}&dpr=2`
                      : venue.image
                  }
                  className="w-full h-full object-cover"
                  alt={venue.name}
                  loading="lazy"
                />
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
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-10 text-muted-foreground animate-fade-in">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>
              Nenhuma quadra encontrada para o filtro "
              {filters.find((f) => f.id === activeFilter)?.label}".
            </p>
            <Button
              variant="link"
              onClick={() => setActiveFilter('todos')}
              className="mt-2 text-primary"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
