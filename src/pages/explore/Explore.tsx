import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  MapPin,
  ListFilter,
  Briefcase,
  Tv,
  Paintbrush,
  Zap,
  Loader2,
  Users,
  Trophy,
  Filter,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  exploreCategories,
  mockProfiles,
  mockEvents,
  mockVenues,
  type ProfileData,
} from '@/lib/data'
import { TalentPreviewCard } from '@/components/TalentPreviewCard'
import { MapEventCard } from '@/components/MapEventCard'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { searchService } from '@/services/search'
import type { PublicProfileItem } from '@/services/profiles'

export default function Explore() {
  const [search, setSearch] = useState('')
  const [accountTypeFilter, setAccountTypeFilter] = useState<
    'all' | 'athlete' | 'club' | 'coach'
  >('all')
  const [sportFilter, setSportFilter] = useState('Todos')
  const [cityFilter, setCityFilter] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Real Supabase profiles state
  const [realProfiles, setRealProfiles] = useState<PublicProfileItem[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [loadingProfiles, setLoadingProfiles] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const navigate = useNavigate()

  // Restore menus: Live Games, Jobs, Flyer Creator, Matchmaking
  const extraCategories = [
    {
      id: 'live',
      label: 'Jogos ao Vivo',
      icon: Tv,
      bg: 'bg-red-100 dark:bg-red-900/20',
      color: 'text-red-600 dark:text-red-400',
    },
    {
      id: 'matchmaking',
      label: 'Matchmaking',
      icon: Zap,
      bg: 'bg-amber-100 dark:bg-amber-900/20',
      color: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'jobs',
      label: 'Vagas',
      icon: Briefcase,
      bg: 'bg-slate-100 dark:bg-slate-900/20',
      color: 'text-slate-600 dark:text-slate-400',
    },
    {
      id: 'flyer',
      label: 'Criar Flyer',
      icon: Paintbrush,
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      color: 'text-purple-600 dark:text-purple-400',
    },
  ]

  // Combine all categories for the main filtering logic
  const allCategories = [...extraCategories, ...exploreCategories]

  const getCategoryPath = (id: string) => {
    switch (id) {
      case 'contracts':
        return '/contracts'
      case 'jobs':
        return '/explore/jobs'
      case 'live':
        return '/explore/live'
      case 'flyer':
        return '/explore/flyer-creator'
      case 'matchmaking':
        return '/matchmaking'
      case 'map-events':
        return '/explore/map-events'
      default:
        return `/explore/${id}`
    }
  }

  // Filter Categories into Three Tiers: Amateur, Professional, Scouts
  const amateurIds = [
    'events',
    'venues',
    'live',
    'matchmaking',
    'gyms',
    'nutrition',
    'clinics',
    'flyer',
    'photographers',
    'kids',
    'drivers',
    'fuel',
  ]
  const proIds = [
    'sponsorship',
    'contracts',
    'scholarships',
    'agencies',
    'international',
    'jobs',
  ]
  const scoutIds = ['talents']

  const amateurCategories = amateurIds
    .map((id) => allCategories.find((c) => c.id === id))
    .filter(Boolean) as typeof allCategories

  const proCategories = proIds
    .map((id) => allCategories.find((c) => c.id === id))
    .filter(Boolean) as typeof allCategories

  const scoutCategories = scoutIds
    .map((id) => allCategories.find((c) => c.id === id))
    .filter(Boolean) as typeof allCategories

  // Fetch real profiles from Supabase with debounced search and active filters
  const loadRealProfiles = useCallback(
    async (currentPage = 1, append = false) => {
      setLoadingProfiles(true)
      setSearchError(null)

      try {
        const {
          data,
          count,
          error,
          hasMore: more,
        } = await searchService.searchProfiles({
          query: search,
          accountType: accountTypeFilter,
          sport: sportFilter === 'Todos' ? undefined : sportFilter,
          city: cityFilter,
          state: stateFilter,
          page: currentPage,
          pageSize: 8,
        })

        if (error) {
          setSearchError('Erro ao buscar perfis reais no banco de dados.')
          if (!append) setRealProfiles([])
        } else {
          setRealProfiles((prev) => (append ? [...prev, ...data] : data))
          setTotalCount(count)
          setHasMore(more)
          setPage(currentPage)
        }
      } catch (err: any) {
        setSearchError('Falha na conexão ao carregar perfis.')
      } finally {
        setLoadingProfiles(false)
      }
    },
    [search, accountTypeFilter, sportFilter, cityFilter, stateFilter],
  )

  // Trigger search on filter changes with small debounce for text
  useEffect(() => {
    const timer = setTimeout(() => {
      loadRealProfiles(1, false)
    }, 300)
    return () => clearTimeout(timer)
  }, [loadRealProfiles])

  // Convert real profile item to TalentPreviewCard shape
  const adaptRealProfileToCard = (rp: PublicProfileItem): ProfileData => {
    const loc = [rp.city, rp.state].filter(Boolean).join(', ') || 'Brasil'
    const name = rp.full_name || 'Usuário Sem Nome'
    const username = name.toLowerCase().replace(/\s+/g, '')
    return {
      id: rp.id,
      name,
      username,
      avatar:
        rp.avatar_url ||
        `https://img.usecurling.com/ppl/medium?seed=${rp.id.slice(0, 4)}`,
      cover: 'https://img.usecurling.com/p/800/300?q=sports%20stadium',
      sport: rp.sport || 'Atleta',
      position:
        rp.position ||
        (rp.account_type === 'club'
          ? 'Clube'
          : rp.account_type === 'coach'
            ? 'Coach'
            : 'Esportista'),
      location: loc,
      bio: rp.bio || '',
      type: rp.account_type,
      rating: 4.8,
      isDiscovered: false,
      stats: { matches: 0, mvp: 0 },
    }
  }

  const filteredEvents = mockEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredVenues = mockVenues.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border/50 px-4 py-3 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, esporte, clube ou cidade..."
              className="pl-9 h-11 bg-secondary border-none rounded-xl transition-all focus:ring-2 focus:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="icon"
            className="h-11 w-11 rounded-xl shrink-0"
            onClick={() => setShowFilters(!showFilters)}
            title="Filtros avançados"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Real Filter Drawer / Panel */}
        {showFilters && (
          <div className="p-3 bg-secondary/50 rounded-xl border border-border/60 space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Tipo de Perfil
                </span>
                <Select
                  value={accountTypeFilter}
                  onValueChange={(val: any) => setAccountTypeFilter(val)}
                >
                  <SelectTrigger className="h-9 bg-background">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="athlete">Atletas</SelectItem>
                    <SelectItem value="club">Clubes</SelectItem>
                    <SelectItem value="coach">Treinadores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Modalidade
                </span>
                <Select
                  value={sportFilter}
                  onValueChange={(val: string) => setSportFilter(val)}
                >
                  <SelectTrigger className="h-9 bg-background">
                    <SelectValue placeholder="Modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todas</SelectItem>
                    <SelectItem value="Futebol">Futebol</SelectItem>
                    <SelectItem value="Futsal">Futsal</SelectItem>
                    <SelectItem value="Basquete">Basquete</SelectItem>
                    <SelectItem value="Vôlei">Vôlei</SelectItem>
                    <SelectItem value="Natação">Natação</SelectItem>
                    <SelectItem value="Atletismo">Atletismo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Cidade
                </span>
                <Input
                  placeholder="Ex: Rio de Janeiro"
                  className="h-9 bg-background text-xs"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  UF
                </span>
                <Input
                  placeholder="Ex: RJ"
                  maxLength={2}
                  className="h-9 bg-background text-xs uppercase"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value.toUpperCase())}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => {
                  setAccountTypeFilter('all')
                  setSportFilter('Todos')
                  setCityFilter('')
                  setStateFilter('')
                  setSearch('')
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-8">
        {/* Tier 1: Amateur Athletes */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <h2 className="text-sm font-bold text-foreground tracking-tight uppercase">
              Atletas Amadores
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {amateurCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(getCategoryPath(cat.id))}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-sm',
                    cat.bg,
                  )}
                >
                  <cat.icon className={cn('w-6 h-6', cat.color)} />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight line-clamp-2 max-w-[60px] text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Tier 2: Professional Athletes */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-1 rounded-full bg-gold" />
            <h2 className="text-sm font-bold text-foreground tracking-tight uppercase">
              Atletas Profissionais
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {proCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(getCategoryPath(cat.id))}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-sm',
                    cat.bg,
                  )}
                >
                  <cat.icon className={cn('w-6 h-6', cat.color)} />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight line-clamp-2 max-w-[60px] text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Tier 3: Scouts (Olheiros) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-1 rounded-full bg-indigo-500" />
            <h2 className="text-sm font-bold text-foreground tracking-tight uppercase">
              Olheiros
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-6">
            {scoutCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(getCategoryPath(cat.id))}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-sm',
                    cat.bg,
                  )}
                >
                  <cat.icon className={cn('w-6 h-6', cat.color)} />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight line-clamp-2 max-w-[60px] text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          {/* Map Preview Banner - Grouped with Scouts */}
          <div
            className="relative h-32 rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer group border border-border/50 shadow-md transition-transform active:scale-[0.98]"
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
        </section>

        {/* Feed Tabs */}
        <Tabs defaultValue="talents" className="w-full pt-4 border-t">
          <div className="flex items-center justify-between mb-4 mt-2">
            <TabsList>
              <TabsTrigger value="talents">Talentos</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="venues">Locais</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="icon" title="Filtrar">
              <ListFilter className="w-4 h-4" />
            </Button>
          </div>

          <TabsContent
            value="talents"
            className="space-y-4 mt-0 animate-in fade-in"
          >
            {/* Header with real count */}
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>Perfis cadastrados no Supabase</span>
              {totalCount !== null && (
                <span className="font-semibold text-primary">
                  {totalCount}{' '}
                  {totalCount === 1
                    ? 'perfil encontrado'
                    : 'perfis encontrados'}
                </span>
              )}
            </div>

            {loadingProfiles && realProfiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-secondary/20 rounded-xl border border-border/50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground font-medium">
                  Carregando perfis cadastrados...
                </span>
              </div>
            ) : searchError ? (
              <div className="text-center py-8 text-destructive bg-destructive/10 rounded-xl border border-destructive/20 p-4 space-y-2">
                <p className="text-sm font-semibold">{searchError}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadRealProfiles(1, false)}
                >
                  Tentar Novamente
                </Button>
              </div>
            ) : realProfiles.length > 0 ? (
              <div className="space-y-4">
                {realProfiles.map((p) => {
                  const adapted = adaptRealProfileToCard(p)
                  return <TalentPreviewCard key={p.id} talent={adapted} />
                })}

                {hasMore && (
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={loadingProfiles}
                    onClick={() => loadRealProfiles(page + 1, true)}
                  >
                    {loadingProfiles ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Carregando mais...
                      </>
                    ) : (
                      'Carregar Mais Perfis'
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border p-6 space-y-2">
                <Users className="h-8 w-8 mx-auto text-muted-foreground/60" />
                <p className="font-medium text-foreground">
                  Nenhum perfil encontrado
                </p>
                <p className="text-xs text-muted-foreground">
                  Tente ajustar a busca ou limpar os filtros para visualizar
                  outros atletas e clubes.
                </p>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/explore/talents')}
            >
              Explorar Área de Recrutadores & Scouts
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
              <div className="text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
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
            {filteredVenues.length > 0 ? (
              filteredVenues.slice(0, 5).map((venue) => (
                <div
                  key={venue.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-card hover:bg-accent/5 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
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
                      <h4 className="font-bold truncate text-sm">
                        {venue.name}
                      </h4>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 h-5"
                      >
                        {venue.rating}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {venue.type} • {venue.distance}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {venue.address}
                    </p>
                    <p className="text-xs font-semibold text-primary mt-1.5">
                      {venue.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
                Nenhum local encontrado.
              </div>
            )}
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
