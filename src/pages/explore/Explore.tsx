import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  CreditCard,
  Map as MapIcon,
  Globe,
  Radio,
  Play,
  Baby,
  Sparkles,
  MapPin,
  Calendar,
  X,
  Trophy,
  Star,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DigitalCard } from '@/components/DigitalCard'
import { exploreCategories, mockEvents, mockVenues, tribes } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Explore() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeSport, setActiveSport] = useState('all')

  const hasActiveSearch = search.length > 0 || activeSport !== 'all'

  const filteredResults = useMemo(() => {
    if (!hasActiveSearch) return { venues: [], events: [] }

    const searchLower = search.toLowerCase()

    const filterItem = (item: any) => {
      // Text Search
      const matchesSearch =
        !search ||
        (item.name && item.name.toLowerCase().includes(searchLower)) ||
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        item.location?.toLowerCase().includes(searchLower) ||
        item.address?.toLowerCase().includes(searchLower) ||
        (item.type && item.type.toLowerCase().includes(searchLower)) ||
        (item.category && item.category.toLowerCase().includes(searchLower))

      // Sport Filter
      let matchesSport = true
      if (activeSport !== 'all') {
        const type = (
          item.type ||
          item.category ||
          item.modality ||
          ''
        ).toLowerCase()

        // Improve matching logic based on tribe IDs
        if (activeSport === 'futebol') {
          matchesSport =
            type.includes('futebol') ||
            type.includes('society') ||
            type.includes('campo')
        } else if (activeSport === 'martial_arts') {
          matchesSport =
            type.includes('luta') || type.includes('artes marciais')
        } else if (activeSport === 'boxing') {
          matchesSport = type.includes('boxe')
        } else {
          matchesSport = type.includes(activeSport)
        }
      }

      return matchesSearch && matchesSport
    }

    return {
      venues: mockVenues.filter(filterItem),
      events: mockEvents.filter(filterItem),
    }
  }, [search, activeSport, hasActiveSearch])

  const clearFilters = () => {
    setSearch('')
    setActiveSport('all')
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in flex flex-col">
      {/* Header & Search */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-30 p-4 border-b border-border/50">
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

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar arenas, eventos, esportes..."
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
            <Button
              variant={activeSport !== 'all' ? 'default' : 'ghost'}
              size="icon"
              className={cn(
                'rounded-xl transition-colors',
                activeSport === 'all' && 'bg-secondary',
              )}
              onClick={() => setActiveSport('all')}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Category Filters (Tribes) */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
            {tribes.map((tribe) => (
              <Button
                key={tribe.id}
                variant={activeSport === tribe.id ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'rounded-full h-8 px-3 text-xs font-medium shrink-0 border-border/50',
                  activeSport === tribe.id
                    ? 'shadow-md'
                    : 'bg-background hover:bg-secondary',
                )}
                onClick={() =>
                  setActiveSport(activeSport === tribe.id ? 'all' : tribe.id)
                }
              >
                <tribe.icon className="w-3 h-3 mr-1.5" />
                {tribe.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 space-y-6">
        {hasActiveSearch ? (
          // Search Results View
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Resultados</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-auto p-0 text-muted-foreground hover:text-primary"
                onClick={clearFilters}
              >
                Limpar tudo
              </Button>
            </div>

            {/* Events Results */}
            {filteredResults.events.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Eventos (
                  {filteredResults.events.length})
                </h3>
                {filteredResults.events.map((event) => (
                  <Card
                    key={event.id}
                    className="flex border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="w-24 h-24 relative shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-1 left-1 text-[8px] h-4 px-1">
                        {event.category}
                      </Badge>
                    </div>
                    <CardContent className="p-3 flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm mb-1 line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs font-medium text-primary">
                          {event.date}
                        </span>
                        <span className="text-xs font-bold bg-secondary px-2 py-0.5 rounded-full">
                          {event.price === 0 ? 'Grátis' : `R$ ${event.price}`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Venues Results */}
            {filteredResults.venues.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Arenas (
                  {filteredResults.venues.length})
                </h3>
                {filteredResults.venues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                    onClick={() => navigate(`/venues/${venue.id}`)}
                  >
                    <div className="h-32 relative">
                      <img
                        src={venue.image}
                        className="w-full h-full object-cover"
                        alt={venue.name}
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star className="h-3 w-3 fill-gold text-gold" />{' '}
                        {venue.rating}
                      </div>
                      <Badge
                        variant="secondary"
                        className="absolute top-2 left-2 backdrop-blur-md bg-black/50 text-white border-none"
                      >
                        {venue.type}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-base">{venue.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3" /> {venue.address}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {venue.amenities.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-1.5 py-0.5 bg-secondary rounded text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredResults.venues.length === 0 &&
              filteredResults.events.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300">
                  <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[250px] mx-auto mb-6">
                    Não encontramos nada com "{search}"{' '}
                    {activeSport !== 'all' ? `na categoria ${activeSport}` : ''}
                    .
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              )}
          </div>
        ) : (
          // Default Dashboard View
          <div className="space-y-6 animate-fade-in">
            {/* NEW FEATURE: Live Events (Cinematic/Premium Card) */}
            <div
              onClick={() => navigate('/explore/live')}
              className="relative w-full h-36 rounded-2xl overflow-hidden cursor-pointer group shadow-lg ring-1 ring-white/10"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-900 to-black opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                <img
                  src="https://img.usecurling.com/p/800/300?q=stadium%20lights%20crowd&color=red"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 scale-100 group-hover:scale-105 transition-transform duration-1000"
                  alt="Background"
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                      <Radio className="h-4 w-4 text-white animate-pulse" />
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-black animate-bounce shadow-lg"></span>
                    </div>
                    <Badge
                      variant="destructive"
                      className="bg-red-600 text-white border-0 shadow-lg tracking-wider font-bold text-[10px]"
                    >
                      AO VIVO
                    </Badge>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight drop-shadow-sm mb-1">
                    Eventos ao Vivo
                  </h2>
                  <p className="text-white/60 text-xs font-medium max-w-[240px] leading-relaxed">
                    Assista agora aos maiores campeonatos e lutas em tempo real.
                  </p>
                </div>

                <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-red-600 flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Featured Kids Card */}
            <div
              onClick={() => navigate('/explore/kids')}
              className="relative w-full h-28 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <img
                src="https://img.usecurling.com/p/800/300?q=kids%20playing%20sports&color=pink"
                alt="Recreação Infantil"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center px-6 justify-between">
                <div className="flex flex-col z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Baby className="h-5 w-5 text-white" />
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-md"
                    >
                      Área Kids
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Recreação Infantil
                  </h2>
                  <p className="text-white/80 text-xs max-w-[200px] leading-relaxed">
                    Segurança e diversão para as crianças enquanto você curte o
                    esporte.
                  </p>
                </div>
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {exploreCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 group"
                  onClick={() => {
                    if (cat.id === 'international') {
                      navigate('/explore/international')
                    } else {
                      navigate(`/explore/${cat.id}`)
                    }
                  }}
                >
                  <div
                    className={`p-3 rounded-full transition-transform group-hover:scale-110 ${cat.bg}`}
                  >
                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <span className="text-[10px] font-medium text-center leading-tight">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* International Match Feature */}
              <div
                onClick={() => navigate('/explore/international')}
                className="relative w-full h-24 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-800 opacity-90" />
                <img
                  src="https://img.usecurling.com/p/400/200?q=world%20map&color=blue"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-500"
                  alt="Mundial"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <Globe className="h-5 w-5 text-white/90" />
                  <span className="text-sm font-bold text-white leading-tight">
                    Match Mundial
                  </span>
                </div>
              </div>

              {/* Map Feature */}
              <div
                onClick={() => navigate('/explore/map-events')}
                className="relative w-full h-24 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-700 opacity-90" />
                <img
                  src="https://img.usecurling.com/p/400/200?q=map%203d%20city&color=green"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-500"
                  alt="Mapa"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <MapIcon className="h-5 w-5 text-white/90" />
                  <span className="text-sm font-bold text-white leading-tight">
                    Mapa Interativo
                  </span>
                </div>
              </div>
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
                {mockEvents.slice(0, 3).map((event) => (
                  <Card
                    key={event.id}
                    className="min-w-[280px] border-none shadow-sm bg-secondary/20 overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="h-32 bg-muted relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-md shadow-sm">
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
                        <span className="text-xs font-medium text-primary flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {event.date}
                        </span>
                        <span className="text-sm font-bold">
                          {event.price === 0
                            ? 'Grátis'
                            : `R$ ${event.price.toFixed(2)}`}
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
                    className="flex border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:bg-secondary/20 transition-colors active:scale-[0.99]"
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
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm mb-1">{venue.name}</h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-gold">
                          <Star className="h-3 w-3 fill-current" />{' '}
                          {venue.rating}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3" /> {venue.location}
                      </div>
                      <div className="flex items-center gap-2 mt-auto">
                        <Badge
                          variant="secondary"
                          className="text-[10px] h-5 px-1.5 font-normal bg-secondary"
                        >
                          {venue.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
