import { Input } from '@/components/ui/input'
import {
  Search,
  MapPin,
  SlidersHorizontal,
  List,
  Map as MapIcon,
  Calendar,
  ArrowRight,
  User,
  Camera,
  Car,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockEvents, mockCourts, mockProfiles } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Explore = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [activeCategory, setActiveCategory] = useState('Todos')

  const categories = [
    { label: 'Todos', icon: null },
    { label: 'Atletas', icon: User },
    { label: 'Eventos', icon: Calendar },
    { label: 'Quadras', icon: MapPin },
    { label: 'Fotógrafos', icon: Camera },
    { label: 'Motoristas', icon: Car },
  ]

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="p-4 sticky top-14 z-20 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar atletas, eventos, motoristas..."
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
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mask-linear-fade pr-4">
            {categories.map((cat) => (
              <Badge
                key={cat.label}
                variant={activeCategory === cat.label ? 'default' : 'outline'}
                className="px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer whitespace-nowrap flex items-center gap-2"
                onClick={() => setActiveCategory(cat.label)}
              >
                {cat.icon && <cat.icon className="h-3 w-3" />}
                {cat.label}
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
          {(activeCategory === 'Todos' || activeCategory === 'Eventos') && (
            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Eventos em
                  Destaque
                </h2>
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
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 leading-tight">
                        {event.title}
                      </h3>
                      <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 inline mr-1" />{' '}
                          {event.location}
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
          )}

          {/* Service Providers List (Drivers & Photographers) */}
          {(activeCategory === 'Todos' ||
            activeCategory === 'Motoristas' ||
            activeCategory === 'Fotógrafos') && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  Profissionais Recomendados
                </h2>
              </div>
              <div className="space-y-3">
                {mockProfiles
                  .filter(
                    (p) => p.type === 'driver' || p.type === 'photographer',
                  )
                  .map((profile) => (
                    <Card
                      key={profile.id}
                      className="border-none shadow-sm cursor-pointer hover:bg-secondary/30 transition-colors"
                      onClick={() => navigate(`/profile/${profile.id}`)}
                    >
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img
                            src={profile.avatar}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm">{profile.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {profile.type === 'driver'
                              ? 'Motorista'
                              : 'Fotógrafo'}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs gap-1">
                          <Star className="h-3 w-3 fill-gold text-gold" />{' '}
                          {profile.rating}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Courts */}
          {(activeCategory === 'Todos' || activeCategory === 'Quadras') && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Quadras Próximas</h2>
              </div>
              <div className="grid gap-4">
                {mockCourts.map((court) => (
                  <Card
                    key={court.id}
                    className="overflow-hidden border-none shadow-sm"
                  >
                    <div className="h-32 bg-muted relative">
                      <img
                        src={`https://img.usecurling.com/p/400/200?q=${court.img}`}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-white text-black hover:bg-white">
                        {court.price}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-bold">{court.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Star className="h-3 w-3 fill-gold text-gold" />{' '}
                        {court.rating}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[calc(100vh-180px)] w-full relative bg-secondary/50 animate-fade-in">
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=map&color=gray')] bg-cover bg-center opacity-40 grayscale" />

          {/* Map Pins Simulation */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-bounce cursor-pointer group">
            <div className="bg-primary text-white p-2 rounded-full shadow-xl border-2 border-white group-hover:scale-110 transition-transform">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow-md absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block z-10">
              Copa Regional
            </div>
          </div>

          <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
            <div className="bg-black text-white p-2 rounded-full shadow-xl border-2 border-white">
              <Car className="h-5 w-5" />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow-md absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block z-10">
              Motorista Carlos
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Explore
