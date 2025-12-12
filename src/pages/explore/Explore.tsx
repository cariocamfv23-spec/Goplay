import { Input } from '@/components/ui/input'
import {
  Search,
  MapPin,
  SlidersHorizontal,
  List,
  Map as MapIcon,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockEvents } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Explore = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const categories = [
    'Todos',
    'Atletas',
    'Clubes',
    'Eventos',
    'Quadras',
    'Vagas',
  ]

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="p-4 sticky top-14 z-20 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar atletas, eventos..."
              className="pl-9 rounded-full bg-secondary border-none shadow-sm"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shrink-0 border-border bg-secondary/20"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mask-linear-fade">
            {categories.map((cat, i) => (
              <Badge
                key={cat}
                variant={i === 0 ? 'default' : 'outline'}
                className="px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer whitespace-nowrap"
              >
                {cat}
              </Badge>
            ))}
          </div>
          <div className="flex bg-secondary rounded-full p-1 ml-2 shrink-0">
            <button
              className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              className={`p-1.5 rounded-full transition-all ${viewMode === 'map' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('map')}
            >
              <MapIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="px-4 space-y-6 animate-fade-in">
          {/* Featured Events */}
          <div>
            <div className="flex justify-between items-center mb-4 mt-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Eventos em
                Destaque
              </h2>
              <Button
                variant="link"
                className="text-primary p-0 h-auto font-semibold text-xs"
              >
                Ver todos <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {mockEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden border-none shadow-md cursor-pointer hover:shadow-xl transition-all group"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={event.title}
                    />
                    <div className="absolute top-2 right-2 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-bold text-primary shadow-sm flex flex-col items-center leading-tight">
                      <span className="text-[10px] uppercase">AGO</span>
                      <span className="text-lg">15</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <div className="text-xs text-muted-foreground">
                        Organizado por{' '}
                        <span className="font-medium text-foreground">
                          {event.organizer}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {event.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Nearby Athletes Preview */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Atletas Próximos</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 min-w-[80px]"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden border-2 border-transparent hover:border-primary transition-all">
                    <img
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 20}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium truncate w-full text-center">
                    Jogador {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-180px)] w-full relative bg-secondary/50 animate-fade-in">
          {/* Mock Map */}
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=map&color=gray')] bg-cover bg-center opacity-40 grayscale" />

          {/* Map Pins */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
            <div className="bg-primary text-white p-2 rounded-full shadow-xl border-2 border-white">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow-md absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              Copa Regional
            </div>
          </div>

          <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gold text-white p-2 rounded-full shadow-xl border-2 border-white">
              <MapPin className="h-6 w-6" />
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-medium border border-border">
            25 locais encontrados
          </div>
        </div>
      )}
    </div>
  )
}

export default Explore
