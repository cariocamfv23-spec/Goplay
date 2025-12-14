import { Input } from '@/components/ui/input'
import { Search, MapPin, Filter, CreditCard } from 'lucide-react'
import { exploreCategories, mockEvents, mockVenues } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DigitalCard } from '@/components/DigitalCard'

export default function Explore() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header & Search */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Explorar</h1>
          <DigitalCard>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary gap-2"
            >
              <CreditCard className="h-4 w-4" />
              <span className="text-xs font-bold">Meu Cartão</span>
            </Button>
          </DigitalCard>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar arenas, eventos, pessoas..."
              className="pl-9 bg-secondary border-none rounded-xl"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-secondary rounded-xl"
          >
            <Filter className="h-4 w-4 text-foreground" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-3">
          {exploreCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              onClick={() => navigate(`/explore/${cat.id}`)}
            >
              <div className={`p-3 rounded-full ${cat.bg}`}>
                <cat.icon className={`h-5 w-5 ${cat.color}`} />
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Featured Events */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Eventos em Destaque</h2>
            <Button
              variant="link"
              className="text-xs text-primary h-auto p-0"
              onClick={() => navigate('/explore/events')}
            >
              Ver tudo
            </Button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {mockEvents.map((event) => (
              <Card
                key={event.id}
                className="min-w-[280px] border-none shadow-sm bg-secondary/20 overflow-hidden cursor-pointer hover:shadow-md transition-all"
              >
                <div className="h-32 bg-muted relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-md">
                    {event.category}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-bold text-sm mb-1 truncate">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" /> {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">
                      {event.date}
                    </span>
                    <span className="text-sm font-bold">
                      R$ {event.price.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Venues */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Arenas Populares</h2>
            <Button
              variant="link"
              className="text-xs text-primary h-auto p-0"
              onClick={() => navigate('/explore/venues')}
            >
              Ver tudo
            </Button>
          </div>
          <div className="space-y-3">
            {mockVenues.map((venue) => (
              <Card
                key={venue.id}
                className="flex border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => navigate(`/venues/${venue.id}`)}
              >
                <div className="w-24 h-24 bg-muted relative shrink-0">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-sm mb-1">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" /> {venue.location}
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-5 px-1 bg-green-500/10 text-green-600"
                    >
                      {venue.rating} ★
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {venue.reviews} avaliações
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
