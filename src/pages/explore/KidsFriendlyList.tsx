import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Search,
  Filter,
  Baby,
  MapPin,
  Check,
  Star,
  Clock,
  ArrowLeft,
  X as XIcon,
  ShieldCheck,
  Calendar,
  Users,
} from 'lucide-react'
import { mockKidsVenues, KidsVenue } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { KidsFilterSheet, FilterState } from '@/components/KidsFilterSheet'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

const allActivities = Array.from(
  new Set(mockKidsVenues.flatMap((v) => v.activities)),
).sort()

export default function KidsFriendlyList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    activities: [],
    ageGroup: 'all',
    periods: [],
  })
  const [selectedVenue, setSelectedVenue] = useState<KidsVenue | null>(null)

  const filteredVenues = useMemo(() => {
    return mockKidsVenues.filter((venue) => {
      // 1. Text Search
      if (search && !venue.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }

      // 2. Activities Filter (OR logic: has at least one selected)
      if (filters.activities.length > 0) {
        const hasActivity = venue.activities.some((act) =>
          filters.activities.includes(act),
        )
        if (!hasActivity) return false
      }

      // 3. Age Group Filter
      if (filters.ageGroup !== 'all') {
        const [minStr, maxStr] = filters.ageGroup.split('-')
        const filterMin = parseInt(minStr)
        const filterMax = parseInt(maxStr)

        // Special case for '10+'
        if (filters.ageGroup === '10-14') {
          if (!(venue.minAge <= 14 && venue.maxAge >= 10)) return false
        } else {
          if (!(venue.minAge <= filterMax && venue.maxAge >= filterMin))
            return false
        }
      }

      // 4. Time Periods Filter (OR logic)
      if (filters.periods.length > 0) {
        const hasPeriod = venue.periods.some((p) => filters.periods.includes(p))
        if (!hasPeriod) return false
      }

      return true
    })
  }, [search, filters])

  const activeFiltersCount =
    filters.activities.length +
    filters.periods.length +
    (filters.ageGroup !== 'all' ? 1 : 0)

  const handleBooking = () => {
    toast.success('Solicitação enviada!', {
      description:
        'Sua reserva foi encaminhada para aprovação. Verifique seu email.',
    })
    setSelectedVenue(null)
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="-ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold truncate">
            Recreação para Crianças
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar locais e eventos..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <KidsFilterSheet
            filters={filters}
            setFilters={setFilters}
            availableActivities={allActivities}
            counts={{
              total: mockKidsVenues.length,
              filtered: filteredVenues.length,
            }}
          >
            <Button
              variant={activeFiltersCount > 0 ? 'default' : 'outline'}
              size="icon"
              className={cn(
                'shrink-0 rounded-xl relative',
                activeFiltersCount > 0 &&
                  'bg-primary text-primary-foreground border-primary',
              )}
            >
              <Filter className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-background" />
              )}
            </Button>
          </KidsFilterSheet>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 animate-fade-in-down">
            {filters.ageGroup !== 'all' && (
              <Badge variant="secondary" className="pl-1 pr-2 py-1 gap-1">
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, ageGroup: 'all' })}
                />
                Idade: {filters.ageGroup}
              </Badge>
            )}
            {filters.periods.map((p) => (
              <Badge
                key={p}
                variant="secondary"
                className="pl-1 pr-2 py-1 gap-1 capitalize"
              >
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      periods: filters.periods.filter((x) => x !== p),
                    })
                  }
                />
                {p === 'morning'
                  ? 'Manhã'
                  : p === 'afternoon'
                    ? 'Tarde'
                    : 'Noite'}
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({ activities: [], ageGroup: 'all', periods: [] })
              }
              className="h-6 text-xs text-muted-foreground px-2"
            >
              Limpar tudo
            </Button>
          </div>
        )}

        {filteredVenues.map((venue) => (
          <Card
            key={venue.id}
            className="overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform hover:shadow-lg"
            onClick={() => setSelectedVenue(venue)}
          >
            <div className="relative h-44">
              <img
                src={venue.image}
                className="w-full h-full object-cover"
                alt={venue.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" /> {venue.rating}
              </div>

              {venue.linkedEvent && (
                <div className="absolute top-2 left-2">
                  <Badge
                    variant="default"
                    className="bg-primary/90 hover:bg-primary backdrop-blur-md shadow-sm border-0 gap-1 pl-1.5"
                  >
                    <Calendar className="h-3 w-3" />
                    {venue.linkedEvent}
                  </Badge>
                </div>
              )}

              <div className="absolute bottom-2 left-2 flex gap-2">
                <Badge
                  variant="secondary"
                  className={`backdrop-blur shadow-sm ${
                    venue.isFree
                      ? 'bg-green-500/90 text-white'
                      : 'bg-yellow-500/90 text-white'
                  }`}
                >
                  {venue.isFree ? 'Grátis' : 'Pago'}
                </Badge>
                <Badge
                  variant="secondary"
                  className="backdrop-blur shadow-sm bg-black/50 text-white gap-1 pl-1"
                >
                  <Clock className="h-3 w-3" />
                  {venue.hours}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg mb-1 leading-tight">
                  {venue.name}
                </h3>
                <Badge
                  variant="outline"
                  className="text-[10px] whitespace-nowrap shrink-0 ml-2"
                >
                  {venue.minAge}-{venue.maxAge} anos
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 shrink-0" /> {venue.location}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {venue.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                  <Baby className="h-3 w-3" /> Atividades
                </h4>
                <div className="flex flex-wrap gap-2">
                  {venue.activities.slice(0, 3).map((activity, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-[10px] py-0 h-6 border-pink-200 bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-300"
                    >
                      <Check className="h-2 w-2 mr-1" /> {activity}
                    </Badge>
                  ))}
                  {venue.activities.length > 3 && (
                    <Badge variant="outline" className="text-[10px] py-0 h-6">
                      +{venue.activities.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVenues.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <Baby className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="mb-2">Nenhum local encontrado com esses filtros.</p>
            <Button
              variant="link"
              onClick={() =>
                setFilters({ activities: [], ageGroup: 'all', periods: [] })
              }
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog
        open={!!selectedVenue}
        onOpenChange={(open) => !open && setSelectedVenue(null)}
      >
        <DialogContent className="max-w-md p-0 overflow-hidden bg-background border-none h-[85vh] sm:h-auto flex flex-col">
          {selectedVenue && (
            <>
              <div className="relative h-56 shrink-0">
                <img
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full bg-black/20 backdrop-blur-sm"
                  onClick={() => setSelectedVenue(null)}
                >
                  <XIcon className="h-5 w-5" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {selectedVenue.linkedEvent && (
                    <Badge className="bg-primary/90 backdrop-blur mb-2 border-none">
                      {selectedVenue.linkedEvent}
                    </Badge>
                  )}
                  <DialogTitle className="text-2xl font-bold text-white leading-tight drop-shadow-md">
                    {selectedVenue.name}
                  </DialogTitle>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Localização</h4>
                    <DialogDescription className="text-sm mt-0.5 text-foreground">
                      {selectedVenue.location}
                    </DialogDescription>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/30 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-1 text-primary">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">
                        Horário
                      </span>
                    </div>
                    <p className="font-semibold text-sm">
                      {selectedVenue.hours}
                    </p>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-1 text-primary">
                      <Users className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">
                        Capacidade
                      </span>
                    </div>
                    <p className="font-semibold text-sm">
                      {selectedVenue.capacity}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Sobre o Local</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedVenue.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Protocolos
                    de Segurança
                  </h4>
                  <ul className="space-y-2">
                    {selectedVenue.safetyProtocols?.map((protocol, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                        {protocol}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedVenue.monitorsList &&
                  selectedVenue.monitorsList.length > 0 && (
                    <div className="bg-secondary/20 p-3 rounded-lg border border-border/50">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">
                        Equipe Responsável
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedVenue.monitorsList.map((monitor) => (
                          <Badge
                            key={monitor}
                            variant="secondary"
                            className="bg-background"
                          >
                            {monitor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Baby className="h-4 w-4 text-primary" /> Atividades
                    Inclusas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVenue.activities.map((act) => (
                      <Badge
                        key={act}
                        variant="outline"
                        className="font-normal"
                      >
                        {act}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="p-4 pt-2 border-t border-border/50 bg-background/95 backdrop-blur shrink-0">
                <div className="flex gap-3 w-full">
                  <div className="flex-1">
                    <span className="text-xs text-muted-foreground block">
                      Valor por criança
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {selectedVenue.isFree ? 'Grátis' : 'Sob consulta'}
                    </span>
                  </div>
                  <Button
                    onClick={handleBooking}
                    className="flex-[2] font-bold shadow-lg shadow-primary/20 rounded-xl"
                  >
                    Reservar Vaga
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
