import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockLiveEvents, LiveEvent } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  ArrowLeft,
  MapPin,
  Trophy,
  Filter,
  PlayCircle,
  Clock,
  Radio,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const modalities: { id: LiveEvent['modality'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'futebol', label: 'Futebol' },
  { id: 'futsal', label: 'Futsal' },
  { id: 'tênis', label: 'Tênis' },
  { id: 'surf', label: 'Surf' },
  { id: 'boxe', label: 'Boxe' },
  { id: 'lutas', label: 'Lutas' },
  { id: 'outros', label: 'Outros' },
]

export default function LiveEvents() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModality, setSelectedModality] = useState<
    LiveEvent['modality'] | 'all'
  >('all')
  const [selectedCity, setSelectedCity] = useState<string>('all')

  // Get unique cities for filter
  const cities = Array.from(new Set(mockLiveEvents.map((e) => e.city))).sort()

  const filteredEvents = mockLiveEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.championship.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModality =
      selectedModality === 'all' || event.modality === selectedModality
    const matchesCity = selectedCity === 'all' || event.city === selectedCity
    return matchesSearch && matchesModality && matchesCity
  })

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 hover:bg-secondary/50 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="h-5 w-5 text-red-500 animate-pulse" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping opacity-75"></span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              Eventos ao Vivo
            </h1>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="px-4 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar jogos, campeonatos..."
              className="pl-9 bg-secondary border-none rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[140px] bg-secondary border-none rounded-xl h-9 text-xs font-medium">
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <SelectValue placeholder="Cidade" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Cidades</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ScrollArea className="flex-1 whitespace-nowrap">
              <div className="flex gap-2">
                {modalities.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModality(m.id)}
                    className={`
                        px-3 py-1.5 rounded-full text-xs font-medium transition-all
                        ${
                          selectedModality === m.id
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }
                      `}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-10 opacity-60">
            <Trophy className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium">Nenhum evento encontrado.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden border-none shadow-md bg-card hover:bg-secondary/20 transition-all cursor-pointer relative"
              onClick={() => navigate(`/explore/live/${event.id}`)}
            >
              {/* Image Section */}
              <div className="relative h-48 w-full">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {event.status === 'live' ? (
                    <Badge
                      variant="destructive"
                      className="animate-pulse shadow-lg font-bold"
                    >
                      AO VIVO • {event.viewers}
                    </Badge>
                  ) : event.status === 'upcoming' ? (
                    <Badge
                      variant="secondary"
                      className="bg-black/50 text-white backdrop-blur-md"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {event.startTime}
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300"
                    >
                      ENCERRADO
                    </Badge>
                  )}
                </div>

                {/* Play Button Overlay (visible on hover or always subtle) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <PlayCircle className="h-10 w-10 text-white drop-shadow-md" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center gap-2 mb-1 text-white/80 text-xs font-medium uppercase tracking-wider">
                    <span>{event.modality}</span>
                    <span>•</span>
                    <span>{event.city}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/70">{event.championship}</p>
                </div>
              </div>

              {/* Score / Info Bar */}
              {event.status !== 'upcoming' && event.score && (
                <CardContent className="p-3 bg-secondary/30 flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Placar
                  </span>
                  <span className="text-lg font-mono font-bold text-primary">
                    {event.score}
                  </span>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
