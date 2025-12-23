import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Map as MapIcon,
  List,
  MapPin,
  Info,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Baby,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { mockKidZones, KidZone } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function KidsZoneMap() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const [selectedZone, setSelectedZone] = useState<KidZone | null>(null)

  const getStatusColor = (status: KidZone['status']) => {
    switch (status) {
      case 'open':
        return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'full':
        return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'maintenance':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'closed':
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
      default:
        return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getStatusLabel = (status: KidZone['status']) => {
    switch (status) {
      case 'open':
        return 'Disponível'
      case 'full':
        return 'Lotado'
      case 'maintenance':
        return 'Manutenção'
      case 'closed':
        return 'Fechado'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/move')}
              className="-ml-2 hover:bg-secondary/50 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold leading-tight flex items-center gap-2">
                Mapa Kids <Baby className="h-4 w-4 text-primary" />
              </h1>
              <p className="text-xs text-muted-foreground">
                Copa Goplay Finals • Arena XP
              </p>
            </div>
          </div>
          <div className="flex bg-secondary/50 p-1 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('map')}
              className={cn(
                'h-7 px-3 rounded-md transition-all',
                viewMode === 'map'
                  ? 'bg-background shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <MapIcon className="h-4 w-4 mr-1.5" />
              Mapa
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                'h-7 px-3 rounded-md transition-all',
                viewMode === 'list'
                  ? 'bg-background shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <List className="h-4 w-4 mr-1.5" />
              Lista
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {viewMode === 'map' ? (
          <div className="flex-1 relative bg-secondary/30 overflow-hidden">
            {/* Mock Map Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{
                backgroundImage:
                  "url('https://img.usecurling.com/p/1200/800?q=stadium%20layout%20plan&color=gray')",
              }}
            >
              {mockKidZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 transition-transform hover:scale-110 focus:outline-none"
                  style={{
                    left: `${zone.coordinates.x}%`,
                    top: `${zone.coordinates.y}%`,
                  }}
                >
                  <div className="relative">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-colors',
                        zone.status === 'open'
                          ? 'bg-green-500'
                          : zone.status === 'full'
                            ? 'bg-red-500'
                            : 'bg-gray-500',
                      )}
                    >
                      <Baby className="h-6 w-6 text-white" />
                    </div>
                    {/* Pulsing effect for open zones */}
                    {zone.status === 'open' && (
                      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 -z-10" />
                    )}
                    {/* Tooltip Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 backdrop-blur text-white text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {zone.name}
                    </div>
                  </div>
                  {/* Pin tail */}
                  <div
                    className={cn(
                      'absolute top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]',
                      zone.status === 'open'
                        ? 'border-t-green-500'
                        : zone.status === 'full'
                          ? 'border-t-red-500'
                          : 'border-t-gray-500',
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Map Legend/Overlay */}
            <div className="absolute bottom-6 left-4 right-4 bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Lotado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span>Fechado</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockKidZones.map((zone) => (
              <Card
                key={zone.id}
                className="overflow-hidden border-none shadow-md cursor-pointer hover:bg-accent/5 transition-colors"
                onClick={() => setSelectedZone(zone)}
              >
                <div className="flex h-32">
                  <div className="w-32 shrink-0">
                    <img
                      src={zone.image}
                      alt={zone.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm line-clamp-1">
                          {zone.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[10px] px-1.5 py-0 h-5 font-medium border',
                            getStatusColor(zone.status),
                          )}
                        >
                          {getStatusLabel(zone.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {zone.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground font-medium">
                        <Users className="h-3 w-3" /> {zone.ageGroup}
                      </span>
                      <span className="text-primary font-bold flex items-center gap-1">
                        Detalhes <ArrowLeft className="h-3 w-3 rotate-180" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Zone Detail Dialog */}
      <Dialog
        open={!!selectedZone}
        onOpenChange={(open) => !open && setSelectedZone(null)}
      >
        <DialogContent className="max-w-md p-0 overflow-hidden bg-background border-none">
          {selectedZone && (
            <>
              <div className="relative h-48">
                <img
                  src={selectedZone.image}
                  alt={selectedZone.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setSelectedZone(null)}
                >
                  <ArrowLeft className="h-6 w-6 rotate-180" />{' '}
                  {/* Close icon visual using arrow for style or X */}
                </Button>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge
                    className={cn(
                      'mb-2 border-0',
                      getStatusColor(selectedZone.status).replace(
                        'border',
                        'bg',
                      ),
                    )}
                  >
                    {getStatusLabel(selectedZone.status)}
                  </Badge>
                  <DialogTitle className="text-2xl font-bold text-white leading-tight">
                    {selectedZone.name}
                  </DialogTitle>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Localização</h4>
                    <DialogDescription className="text-sm mt-0.5">
                      {selectedZone.location}
                    </DialogDescription>
                  </div>
                </div>

                {/* Capacity Status */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>Lotação Atual</span>
                    <span
                      className={cn(
                        selectedZone.capacity.current >=
                          selectedZone.capacity.max
                          ? 'text-red-500'
                          : 'text-green-500',
                      )}
                    >
                      {selectedZone.capacity.current} /{' '}
                      {selectedZone.capacity.max} crianças
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedZone.capacity.current /
                        selectedZone.capacity.max) *
                      100
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    Atualizado há 2 min
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/30 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Users className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">Idade</span>
                    </div>
                    <p className="font-semibold">{selectedZone.ageGroup}</p>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase">Tempo</span>
                    </div>
                    <p className="font-semibold">Ilimitado</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" /> Atividades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedZone.activities.map((act) => (
                      <Badge
                        key={act}
                        variant="secondary"
                        className="font-normal"
                      >
                        {act}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" /> Regras e Segurança
                  </h4>
                  <ul className="space-y-2">
                    {selectedZone.rules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>
                      Monitores responsáveis: {selectedZone.monitors.join(', ')}
                    </span>
                  </div>
                </div>

                <Button className="w-full font-bold shadow-lg shadow-primary/20">
                  Solicitar Check-in
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
