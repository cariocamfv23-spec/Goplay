import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Search,
  Camera,
  MapPin,
  Calendar,
  Trophy,
  Filter,
  Zap,
  Globe2,
  Ghost,
  ScanLine,
} from 'lucide-react'
import {
  mockEvents,
  mockVenues,
  mockGyms,
  mockNutritionPartners,
  mockClinics,
} from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Link, useNavigate } from 'react-router-dom'

export default function Explore() {
  const navigate = useNavigate()

  const categories = [
    { id: 'all', label: 'Tudo' },
    { id: 'photographers', label: 'Fotógrafos' },
    { id: 'events', label: 'Eventos' },
    { id: 'venues', label: 'Quadras' },
    { id: 'gyms', label: 'Academias' },
    { id: 'nutrition', label: 'Nutrição' },
    { id: 'clinics', label: 'Clínicas' },
  ]

  const aiFeatures = [
    {
      title: 'Lance Fantasma',
      icon: Ghost,
      color: 'text-purple-400',
      bg: 'bg-purple-900/20',
      path: '/ai/ghost-play',
    },
    {
      title: 'Modo Arena AR',
      icon: Zap,
      color: 'text-yellow-400',
      bg: 'bg-yellow-900/20',
      path: '/ai/arena',
    },
    {
      title: 'Match Internacional',
      icon: Globe2,
      color: 'text-blue-400',
      bg: 'bg-blue-900/20',
      path: '/play/international',
    },
    {
      title: 'Scanner de Lesão',
      icon: ScanLine,
      color: 'text-red-400',
      bg: 'bg-red-900/20',
      path: '/ai/scanner',
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/40 p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar quadras, eventos, pessoas..."
              className="pl-9 bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-2 pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={cat.id === 'all' ? 'default' : 'secondary'}
                size="sm"
                className="rounded-full px-4 h-8 text-xs"
                onClick={() =>
                  cat.id !== 'all' && navigate(`/explore/${cat.id}`)
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      <div className="p-4 space-y-8">
        {/* AI Features Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-gold fill-gold animate-pulse" />
              Goplay AI Suite
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {aiFeatures.map((feat) => (
              <Link to={feat.path} key={feat.title}>
                <Card
                  className={`border-none shadow-sm hover:shadow-md transition-shadow ${feat.bg}`}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <feat.icon className={`h-8 w-8 ${feat.color}`} />
                    <span className="font-bold text-xs leading-tight">
                      {feat.title}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Events */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Eventos em Destaque</h2>
            <Link
              to="/explore/events"
              className="text-xs text-primary font-bold"
            >
              Ver todos
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {mockEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="shrink-0 w-64"
              >
                <Card className="overflow-hidden border-none shadow-md h-full hover:shadow-xl transition-shadow">
                  <div className="aspect-[16/9] relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-sm">
                      {event.date}
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-bold text-sm truncate mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Venues */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Quadras Populares</h2>
            <Link
              to="/explore/venues"
              className="text-xs text-primary font-bold"
            >
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {mockVenues.map((venue) => (
              <Link key={venue.id} to={`/venues/${venue.id}`}>
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="w-1/3 relative">
                      <img
                        src={`https://img.usecurling.com/p/300/300?q=${venue.img}`}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="w-2/3 p-3 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm line-clamp-1">
                          {venue.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-secondary px-1.5 py-0.5 rounded text-[10px] font-bold">
                          <span className="text-gold">★</span> {venue.rating}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                        {venue.address}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-bold text-primary">
                          {venue.price}
                        </span>
                        <Button size="sm" className="h-7 text-xs px-3">
                          Reservar
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
