import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Filter,
  Map as MapIcon,
  List,
  Search,
  MapPin,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { mockEvents } from '@/lib/data'
import { MapEventCard } from '@/components/MapEventCard'

export default function MapEvents() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const [search, setSearch] = useState('')
  const [selectedModality, setSelectedModality] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const modalities = Array.from(
    new Set(mockEvents.map((e) => e.modality).filter(Boolean)),
  )
  const locations = Array.from(
    new Set(mockEvents.map((e) => e.city).filter(Boolean)),
  )

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
    const matchesModality =
      selectedModality === 'all' || event.modality === selectedModality
    const matchesLocation =
      selectedLocation === 'all' || event.city === selectedLocation
    return matchesSearch && matchesModality && matchesLocation
  })

  return (
    <div className="min-h-screen bg-background flex flex-col relative pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="flex items-center gap-2 p-4 pb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="-ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-secondary border-none"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
            className="rounded-xl bg-secondary"
          >
            {viewMode === 'map' ? (
              <List className="h-5 w-5" />
            ) : (
              <MapIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-4 pt-0 overflow-x-auto scrollbar-hide">
          <Select value={selectedModality} onValueChange={setSelectedModality}>
            <SelectTrigger className="w-[140px] h-9 rounded-full bg-secondary border-none text-xs font-medium">
              <SelectValue placeholder="Modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Modalidades</SelectItem>
              {modalities.map((m) => (
                <SelectItem key={m} value={m as string}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[130px] h-9 rounded-full bg-secondary border-none text-xs font-medium">
              <SelectValue placeholder="Localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Cidades</SelectItem>
              {locations.map((l) => (
                <SelectItem key={l} value={l as string}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border/50 bg-background h-9 px-3 gap-1"
          >
            <Globe className="h-3 w-3" />
            <span className="text-xs">Global</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {viewMode === 'map' ? (
          <div className="absolute inset-0 bg-secondary/30">
            {/* Mock Map Image */}
            <div
              className="w-full h-full bg-cover bg-center relative opacity-80"
              style={{
                backgroundImage:
                  "url('https://img.usecurling.com/p/1200/1200?q=map%20street%20view&color=gray')",
              }}
            >
              {filteredEvents.map((event) =>
                event.coordinates ? (
                  <Popover key={event.id}>
                    <PopoverTrigger asChild>
                      <button
                        className="absolute w-8 h-8 -ml-4 -mt-8 hover:scale-125 transition-transform duration-200 z-10"
                        style={{
                          left: `${event.coordinates.x}%`,
                          top: `${event.coordinates.y}%`,
                        }}
                      >
                        <div className="w-full h-full bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-in zoom-in">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 -mt-1 border-r border-b border-white" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-64 p-0 border-none shadow-xl bg-transparent"
                      sideOffset={5}
                    >
                      <MapEventCard event={event} compact />
                    </PopoverContent>
                  </Popover>
                ) : null,
              )}
            </div>

            {/* Floating Info */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-border/50">
              <p className="text-xs font-medium flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" />
                {filteredEvents.length} eventos encontrados nesta região
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <MapEventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Filter className="h-12 w-12 mb-4 opacity-20" />
                <p>Nenhum evento encontrado.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
