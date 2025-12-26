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
  Briefcase,
  Activity,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DigitalCard } from '@/components/DigitalCard'
import { exploreCategories, mockEvents, mockVenues, tribes } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Explore() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeSport, setActiveSport] = useState('all')

  const hasActiveSearch = search.length > 0 || activeSport !== 'all'

  // Search Logic (Preserved)
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

  // Dashboard Grouping Logic
  const getCategoryData = (id: string) => {
    if (id === 'map-events') {
      return {
        id: 'map-events',
        label: 'Mapa',
        icon: MapIcon,
        bg: 'bg-emerald-100 dark:bg-emerald-900/20',
        color: 'text-emerald-600 dark:text-emerald-400',
        path: '/explore/map-events',
      }
    }
    const cat = exploreCategories.find((c) => c.id === id)
    if (cat) {
      return {
        ...cat,
        path:
          cat.id === 'international'
            ? '/explore/international'
            : `/explore/${cat.id}`,
      }
    }
    return null
  }

  const dashboardGroups = [
    {
      id: 'play',
      title: 'Competir & Jogar',
      icon: Trophy,
      description: 'Encontre seu jogo',
      items: ['venues', 'events', 'international', 'map-events'],
      color: 'text-primary',
    },
    {
      id: 'career',
      title: 'Carreira Pro',
      icon: Briefcase,
      description: 'Oportunidades reais',
      items: ['sponsorship', 'scholarships', 'agencies', 'talents'],
      color: 'text-blue-500',
    },
    {
      id: 'services',
      title: 'Serviços & Saúde',
      icon: Activity,
      description: 'Logística e bem-estar',
      items: [
        'nutrition',
        'clinics',
        'gyms',
        'fuel',
        'drivers',
        'photographers',
      ],
      color: 'text-green-500',
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle',
      icon: Sparkles,
      description: 'Diversão e família',
      items: ['kids'],
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in flex flex-col">
      {/* 1. Header & Search (Sticky) */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-30 px-4 py-3 border-b border-border/50 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Explorar
          </h1>
          <DigitalCard>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary gap-2 h-8 px-3"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span className="text-xs font-bold">Meu Cartão</span>
            </Button>
          </DigitalCard>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar arenas, eventos, serviços..."
                className="pl-9 pr-8 bg-secondary/50 border-transparent hover:bg-secondary/80 focus:bg-background focus:border-primary/20 rounded-xl transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <Button
              variant={activeSport !== 'all' ? 'default' : 'secondary'}
              size="icon"
              className={cn(
                'rounded-xl transition-all shadow-sm',
                activeSport !== 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80',
              )}
              onClick={() => setActiveSport('all')}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Filters (Tribes) */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 mask-fade-sides">
            {tribes.map((tribe) => (
              <Button
                key={tribe.id}
                variant={activeSport === tribe.id ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'rounded-full h-8 px-3 text-xs font-medium shrink-0 border-border/40 transition-all active:scale-95',
                  activeSport === tribe.id
                    ? 'shadow-md ring-2 ring-primary/20'
                    : 'bg-background hover:bg-secondary/80 hover:border-border',
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

      {/* 2. Main Content */}
      <div className="flex-1 p-4 space-y-8">
        {hasActiveSearch ? (
          // Search Results View (Preserved)
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
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
                    className="flex border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="w-24 h-24 relative shrink-0 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-1 left-1 text-[8px] h-4 px-1 backdrop-blur-md bg-black/60 border-none text-white">
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
                    className="border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
                    onClick={() => navigate(`/venues/${venue.id}`)}
                  >
                    <div className="h-32 relative overflow-hidden">
                      <img
                        src={venue.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          // Intelligent Dashboard View
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* HERO: Live Events */}
            <div
              onClick={() => navigate('/explore/live')}
              className="relative w-full h-40 rounded-3xl overflow-hidden cursor-pointer group shadow-xl ring-1 ring-white/10 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-900 to-black opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                <img
                  src="https://img.usecurling.com/p/800/300?q=stadium%20lights%20crowd&color=red"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 scale-100 group-hover:scale-105 transition-transform duration-1000"
                  alt="Background"
                />
              </div>

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
                  <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-sm mb-1">
                    Eventos ao Vivo
                  </h2>
                  <p className="text-white/70 text-xs font-medium max-w-[240px] leading-relaxed">
                    Assista agora aos maiores campeonatos e lutas em tempo real.
                  </p>
                </div>

                <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-red-600 flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* PRIORITY SHORTCUTS */}
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                Acesso Rápido
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-border/60 bg-card hover:bg-secondary/50 hover:border-primary/30 flex-shrink-0 gap-2 snap-start shadow-sm"
                  onClick={() => navigate('/explore/map-events')}
                >
                  <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <MapIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium text-xs">Mapa</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-border/60 bg-card hover:bg-secondary/50 hover:border-primary/30 flex-shrink-0 gap-2 snap-start shadow-sm"
                  onClick={() => navigate('/ranking')}
                >
                  <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="font-medium text-xs">Ranking</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-border/60 bg-card hover:bg-secondary/50 hover:border-primary/30 flex-shrink-0 gap-2 snap-start shadow-sm"
                  onClick={() => navigate('/explore/international')}
                >
                  <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="font-medium text-xs">Mundial</span>
                </Button>

                <DigitalCard>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-border/60 bg-card hover:bg-secondary/50 hover:border-primary/30 flex-shrink-0 gap-2 snap-start shadow-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-xs">Carteira</span>
                  </Button>
                </DigitalCard>
              </div>
            </div>

            {/* FUNCTIONAL GROUPS (Dashboard Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardGroups.map((group) => (
                <Card
                  key={group.id}
                  className="border-none shadow-sm bg-card/50 backdrop-blur-sm ring-1 ring-border/50"
                >
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          'p-2 rounded-lg bg-secondary/50',
                          group.color,
                        )}
                      >
                        <group.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold">
                          {group.title}
                        </CardTitle>
                        <p className="text-[10px] text-muted-foreground font-medium">
                          {group.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-3">
                    <div className="grid grid-cols-3 gap-2">
                      {group.items.map((itemId) => {
                        const data = getCategoryData(itemId)
                        if (!data) return null
                        return (
                          <div
                            key={itemId}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer active:scale-95 group/item"
                            onClick={() => navigate(data.path)}
                          >
                            <div
                              className={cn(
                                'h-10 w-10 rounded-full flex items-center justify-center transition-transform group-hover/item:scale-110 shadow-sm',
                                data.bg,
                              )}
                            >
                              <data.icon
                                className={cn('h-5 w-5', data.color)}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-center leading-tight line-clamp-1">
                              {data.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CONTENT FEED: Featured Events */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" /> Destaques
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto p-0 text-muted-foreground hover:text-primary gap-1"
                  onClick={() => navigate('/explore/events')}
                >
                  Ver todos <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide snap-x">
                {mockEvents.slice(0, 3).map((event) => (
                  <Card
                    key={event.id}
                    className="min-w-[260px] border-none shadow-sm bg-secondary/20 overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99] snap-start"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="h-32 bg-muted relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-background/90 text-foreground backdrop-blur-md shadow-sm border-none text-[10px]">
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

            {/* CONTENT FEED: Top Venues */}
            <div className="pb-8">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" /> Arenas Populares
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto p-0 text-muted-foreground hover:text-primary gap-1"
                  onClick={() => navigate('/explore/venues')}
                >
                  Ver todas <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-3">
                {mockVenues.slice(0, 3).map((venue) => (
                  <Card
                    key={venue.id}
                    className="flex border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:bg-secondary/20 transition-all active:scale-[0.99]"
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
                          className="text-[10px] h-5 px-1.5 font-normal bg-secondary border-none"
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
