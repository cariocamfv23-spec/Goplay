import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  MapPin,
  GraduationCap,
  Filter,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { mockScholarships } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Scholarships() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    country: [] as string[],
    city: [] as string[],
  })

  // Extract unique values for filters
  const countries = Array.from(new Set(mockScholarships.map((s) => s.country)))
  const cities = Array.from(new Set(mockScholarships.map((s) => s.city)))

  const filteredScholarships = mockScholarships.filter((s) => {
    const matchesSearch =
      s.university.toLowerCase().includes(search.toLowerCase()) ||
      s.sport.toLowerCase().includes(search.toLowerCase()) ||
      (s.neighborhood &&
        s.neighborhood.toLowerCase().includes(search.toLowerCase()))

    const matchesCountry =
      filters.country.length === 0 || filters.country.includes(s.country)
    const matchesCity =
      filters.city.length === 0 || filters.city.includes(s.city)

    return matchesSearch && matchesCountry && matchesCity
  })

  const toggleFilter = (type: 'country' | 'city', value: string) => {
    setFilters((prev) => {
      const current = prev[type]
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return { ...prev, [type]: updated }
    })
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="p-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 hover:bg-secondary/50 rounded-full"
            onClick={() => navigate('/explore')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg">
              <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="font-bold text-lg">Bolsas & Match Acadêmico</h1>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-4 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar universidade, esporte ou bairro..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'rounded-full text-xs h-8 border-dashed',
                    filters.country.length > 0 &&
                      'bg-emerald-50 border-emerald-200 text-emerald-700 border-solid',
                  )}
                >
                  <Filter className="h-3 w-3 mr-1.5" />
                  País
                  {filters.country.length > 0 && (
                    <span className="ml-1 bg-emerald-200 text-emerald-800 rounded-full w-4 h-4 text-[9px] flex items-center justify-center">
                      {filters.country.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {countries.map((country) => (
                  <DropdownMenuCheckboxItem
                    key={country}
                    checked={filters.country.includes(country)}
                    onCheckedChange={() => toggleFilter('country', country)}
                  >
                    {country}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'rounded-full text-xs h-8 border-dashed',
                    filters.city.length > 0 &&
                      'bg-emerald-50 border-emerald-200 text-emerald-700 border-solid',
                  )}
                >
                  <MapPin className="h-3 w-3 mr-1.5" />
                  Cidade
                  {filters.city.length > 0 && (
                    <span className="ml-1 bg-emerald-200 text-emerald-800 rounded-full w-4 h-4 text-[9px] flex items-center justify-center">
                      {filters.city.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {cities.map((city) => (
                  <DropdownMenuCheckboxItem
                    key={city}
                    checked={filters.city.includes(city)}
                    onCheckedChange={() => toggleFilter('city', city)}
                  >
                    {city}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-10 opacity-60">
            <GraduationCap className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-medium">Nenhuma bolsa encontrada</h3>
            <p className="text-sm">Tente ajustar seus filtros de busca.</p>
          </div>
        ) : (
          filteredScholarships.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-none shadow-sm cursor-pointer hover:shadow-md transition-all group active:scale-[0.98]"
              onClick={() => navigate(`/explore/scholarships/${item.id}`)}
            >
              <div className="h-32 relative">
                <img
                  src={item.image}
                  alt={item.university}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                  <img
                    src={item.logo}
                    alt="Logo"
                    className="w-4 h-4 object-contain"
                  />
                  {item.university}
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-lg leading-tight">
                    {item.sport} Scholarship
                  </h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {item.city}, {item.country}
                  </p>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-lg">
                    {item.value}% Cobertura
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 bg-card">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>Processo Seletivo Aberto</span>
                  </div>
                  <span>Até {item.deadline}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
