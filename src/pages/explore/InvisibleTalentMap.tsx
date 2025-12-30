import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Radar, Target, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { mockTalents } from '@/lib/data'
import { TalentMapMarker } from '@/components/TalentMapMarker'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

// Helper to generate consistent coordinates based on ID
const generateCoordinates = (id: string | number) => {
  const strId = id.toString()
  const seedX = strId.charCodeAt(0) + (strId.charCodeAt(1) || 0)
  const seedY = strId.charCodeAt(strId.length - 1) * 2

  // Keep within 15% - 85% to avoid edges
  const x = ((seedX * 13) % 70) + 15
  const y = ((seedY * 17) % 70) + 15

  return { x, y }
}

export default function InvisibleTalentMap() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sportFilter, setSportFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [showDiscoveriesOnly, setShowDiscoveriesOnly] = useState(false)

  // Initialize talents with coordinates
  const mapData = useMemo(() => {
    return mockTalents.map((t) => ({
      ...t,
      // Priority: explicit coordinates > generated coordinates
      ...(t.coordinates ? t.coordinates : generateCoordinates(t.id)),
    }))
  }, [])

  // Filter Logic
  const filteredTalents = mapData.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(search.toLowerCase()) ||
      talent.location.toLowerCase().includes(search.toLowerCase())

    const matchesSport =
      sportFilter === 'all' ||
      talent.sport?.toLowerCase() === sportFilter.toLowerCase()

    const matchesPosition =
      positionFilter === 'all' ||
      talent.position?.toLowerCase().includes(positionFilter.toLowerCase())

    const matchesRating =
      ratingFilter === 'all' || (talent.rating || 0) >= parseFloat(ratingFilter)

    const matchesDiscovery =
      !showDiscoveriesOnly || talent.isDiscovered === true

    return (
      matchesSearch &&
      matchesSport &&
      matchesPosition &&
      matchesRating &&
      matchesDiscovery
    )
  })

  // Unique values for filters
  const sports = Array.from(
    new Set(mockTalents.map((t) => t.sport).filter(Boolean)),
  )
  const positions = Array.from(
    new Set(mockTalents.map((t) => t.position).filter(Boolean)),
  )

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Interactive Map Background */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        {/* Dark Satellite Map Style Base */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale contrast-125"
          style={{
            backgroundImage:
              "url('https://img.usecurling.com/p/1600/1200?q=satellite%20city%20map%20dark&color=blue')",
          }}
        />
        {/* Grid Overlay for "Scanner" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Hotspots - Visual representation of density */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />

        {/* Radar Sweep Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent w-[200%] h-full animate-[spin_8s_linear_infinite] origin-bottom-left opacity-30 pointer-events-none" />
      </div>

      {/* Header UI */}
      <div className="relative z-30 flex flex-col gap-2 p-4 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Buscar talento, região..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary/50"
            />
          </div>

          <Badge
            variant="outline"
            className="hidden md:flex h-10 px-4 rounded-full border-primary/50 text-primary bg-primary/10 backdrop-blur-md gap-2"
          >
            <Radar className="h-4 w-4 animate-pulse" />
            <span className="font-bold">LIVE SCAN</span>
          </Badge>
        </div>

        {/* Filters Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-right items-center">
          <Toggle
            pressed={showDiscoveriesOnly}
            onPressedChange={setShowDiscoveriesOnly}
            className={cn(
              'h-8 rounded-full border border-white/10 text-xs px-3 gap-1.5 transition-all',
              showDiscoveriesOnly
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-black/40 text-white hover:bg-white/10',
            )}
          >
            <Trophy className="w-3.5 h-3.5" />
            Descobertas
          </Toggle>

          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-[120px] h-8 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-xs text-white">
              <SelectValue placeholder="Esporte" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white">
              <SelectItem value="all">Todos Esportes</SelectItem>
              {sports.map((s) => (
                <SelectItem key={s} value={s || 'unknown'}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[120px] h-8 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-xs text-white">
              <SelectValue placeholder="Posição" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white">
              <SelectItem value="all">Todas Posições</SelectItem>
              {positions.map((p) => (
                <SelectItem key={p} value={p || 'unknown'}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[120px] h-8 rounded-full bg-black/40 backdrop-blur-md border-white/10 text-xs text-white">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white">
              <SelectItem value="all">Qualquer Rating</SelectItem>
              <SelectItem value="4.0">4.0+</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
              <SelectItem value="4.8">4.8+ (Elite)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20 text-xs px-3"
            onClick={() => {
              setSportFilter('all')
              setPositionFilter('all')
              setRatingFilter('all')
              setSearch('')
              setShowDiscoveriesOnly(false)
            }}
          >
            Limpar
          </Button>
        </div>
      </div>

      {/* Map Content Area */}
      <div className="flex-1 relative z-10 w-full h-full overflow-hidden">
        {/* Markers */}
        <div className="relative w-full h-full">
          {filteredTalents.map((talent) => {
            const isTopTalent =
              (talent.rating || 0) >= 4.8 || (talent.stats?.mvp || 0) >= 5
            return (
              <TalentMapMarker
                key={talent.id}
                talent={talent}
                isTopTalent={isTopTalent}
              />
            )
          })}
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-6 left-4 right-4 z-20 flex justify-between items-end pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl pointer-events-auto">
            <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold mb-1">
              Talentos na Área
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">
                {filteredTalents.length}
              </span>
              <span className="text-xs text-white/60">encontrados</span>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-xl pointer-events-auto">
            <Button
              size="icon"
              className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_hsl(var(--primary))]"
              onClick={() => {
                setShowDiscoveriesOnly(!showDiscoveriesOnly)
              }}
            >
              <Target
                className={cn(
                  'h-5 w-5 transition-transform',
                  showDiscoveriesOnly && 'scale-110',
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
