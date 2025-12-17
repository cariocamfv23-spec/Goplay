import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Baby, MapPin, Check, Star, Clock } from 'lucide-react'
import { mockKidsVenues, KidsVenue } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { KidsFilterSheet, FilterState } from '@/components/KidsFilterSheet'
import { cn } from '@/lib/utils'

// Extended type for internal use
interface ExtendedVenue extends KidsVenue {
  minAge: number
  maxAge: number
  periods: string[]
  displayHours: string
}

// Enhance mock data with filtering fields
const extendedVenues: ExtendedVenue[] = mockKidsVenues.map((venue, index) => {
  // Mock logic to distribute properties for testing filters
  const minAge = index === 2 ? 0 : index === 1 ? 4 : 3
  const maxAge = index === 2 ? 6 : index === 1 ? 14 : 12

  let periods = ['afternoon']
  let displayHours = '12h - 18h'

  if (index === 0) {
    // Arena Kids Sports
    periods = ['morning', 'afternoon']
    displayHours = '08h - 18h'
  } else if (index === 1) {
    // Complexo Esportivo
    periods = ['afternoon', 'night']
    displayHours = '14h - 22h'
  } else {
    // Clube do Sol
    periods = ['morning', 'afternoon']
    displayHours = '09h - 17h'
  }

  return {
    ...venue,
    minAge,
    maxAge,
    periods,
    displayHours,
  }
})

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

  const filteredVenues = useMemo(() => {
    return extendedVenues.filter((venue) => {
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

        // Check for overlap: (StartA <= EndB) and (EndA >= StartB)
        // Venue Range: [venue.minAge, venue.maxAge]
        // Filter Range: [filterMin, filterMax]

        // Special case for '10+'
        if (filters.ageGroup === '10-14') {
          // Treat as 10 to 14
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
            <span className="sr-only">Voltar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left h-5 w-5"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold truncate">
            Locais Esportivos com Recreação Infantil
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar locais kids..."
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
              total: extendedVenues.length,
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
        {/* Active Filters Summary (Optional but helpful) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 animate-fade-in-down">
            {filters.ageGroup !== 'all' && (
              <Badge variant="secondary" className="pl-1 pr-2 py-1 gap-1">
                <X
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
                <X
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
            {filters.activities.map((a) => (
              <Badge
                key={a}
                variant="secondary"
                className="pl-1 pr-2 py-1 gap-1"
              >
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      activities: filters.activities.filter((x) => x !== a),
                    })
                  }
                />
                {a}
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
            className="overflow-hidden border-none shadow-md cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="relative h-44">
              <img
                src={venue.image}
                className="w-full h-full object-cover"
                alt={venue.name}
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" /> {venue.rating}
              </div>
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
                  {venue.displayHours}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg mb-1">{venue.name}</h3>
                <Badge
                  variant="outline"
                  className="text-[10px] whitespace-nowrap"
                >
                  {venue.minAge}-{venue.maxAge} anos
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" /> {venue.location}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {venue.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                  <Baby className="h-3 w-3" /> Atividades para Crianças
                </h4>
                <div className="flex flex-wrap gap-2">
                  {venue.activities.map((activity, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-[10px] py-0 h-6 border-pink-200 bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-300"
                    >
                      <Check className="h-2 w-2 mr-1" /> {activity}
                    </Badge>
                  ))}
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
    </div>
  )
}
