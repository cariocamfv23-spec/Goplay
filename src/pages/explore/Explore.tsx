import { useState } from 'react'
import { Search, MapPin, Grid, ListFilter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  exploreCategories,
  mockProfiles,
  mockEvents,
  mockVenues,
} from '@/lib/data'
import { TalentPreviewCard } from '@/components/TalentPreviewCard'
import { MapEventCard } from '@/components/MapEventCard'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Explore() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredProfiles = mockProfiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sport?.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredEvents = mockEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar atletas, eventos, locais..."
            className="pl-9 h-11 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Quick Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {exploreCategories.map((cat) => (
            <Badge
              key={cat.id}
              variant="outline"
              className="whitespace-nowrap cursor-pointer hover:bg-secondary py-1.5 px-3 border-border/60"
              onClick={() => navigate(`/explore/${cat.id}`)}
            >
              <cat.icon className="w-3 h-3 mr-1.5" />
              {cat.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Map Preview Banner */}
        <div
          className="relative h-32 rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer group border border-border/50"
          onClick={() => navigate('/explore/talent-map')}
        >
          <img
            src="https://img.usecurling.com/p/800/300?q=dark%20map&color=black"
            alt="Map"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Mapa de Talentos
            </h3>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Descubra atletas e oportunidades perto de você.
            </p>
          </div>
        </div>

        <Tabs defaultValue="talents" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="talents">Talentos</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="venues">Locais</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="icon">
              <ListFilter className="w-4 h-4" />
            </Button>
          </div>

          <TabsContent
            value="talents"
            className="space-y-4 mt-0 animate-in fade-in"
          >
            {filteredProfiles.length > 0 ? (
              filteredProfiles
                .slice(0, 5)
                .map((profile) => (
                  <TalentPreviewCard key={profile.id} profile={profile} />
                ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Nenhum talento encontrado.
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/explore/talents')}
            >
              Ver Todos os Talentos
            </Button>
          </TabsContent>

          <TabsContent
            value="events"
            className="space-y-4 mt-0 animate-in fade-in"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <MapEventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Nenhum evento encontrado.
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/explore/events')}
            >
              Ver Todos os Eventos
            </Button>
          </TabsContent>

          <TabsContent
            value="venues"
            className="space-y-4 mt-0 animate-in fade-in"
          >
            {mockVenues.slice(0, 3).map((venue) => (
              <div
                key={venue.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                onClick={() => navigate(`/venues/${venue.id}`)}
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold truncate">{venue.name}</h4>
                    <Badge variant="secondary" className="text-[10px]">
                      {venue.rating}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {venue.type} • {venue.distance}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {venue.address}
                  </p>
                  <p className="text-xs font-semibold text-primary mt-1">
                    {venue.price}
                  </p>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/explore/venues')}
            >
              Ver Todos os Locais
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
