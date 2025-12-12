import { useNavigate, useParams } from 'react-router-dom'
import { mockVenues, mockHighlights } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MapPin,
  Star,
  Info,
  Clock,
  Video,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RecordHighlightDrawer } from '@/components/RecordHighlightDrawer'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function VenueDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const venue = mockVenues.find((v) => v.id === id)
  const [recordOpen, setRecordOpen] = useState(false)

  // Simulate Auto Check-in
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success('Check-in automático realizado!', {
        description: `Bem-vindo à ${venue?.name}. Prepare-se para jogar!`,
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [venue])

  if (!venue) return <div>Local não encontrado</div>

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-64 w-full">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 text-white rounded-full backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 -mt-12 relative z-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{venue.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" /> {venue.address}
          </div>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" /> {venue.rating}
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/30">
              Aberto Agora
            </Badge>
          </div>

          {/* Main Action - Record Highlight */}
          <Button
            className="w-full h-14 rounded-full text-lg shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-purple-800 animate-pulse"
            onClick={() => setRecordOpen(true)}
          >
            <Video className="mr-2 h-6 w-6" /> Gravar Lance (Highlight)
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-secondary/20 border-none">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Info className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">Regras</span>
              <span className="font-bold text-sm">Visualizar</span>
            </CardContent>
          </Card>
          <Card className="bg-secondary/20 border-none">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Clock className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-muted-foreground">Horários</span>
              <span className="font-bold text-sm">08h - 23h</span>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Comodidades</h3>
          <div className="flex flex-wrap gap-2">
            {venue.amenities.map((item) => (
              <Badge key={item} variant="outline" className="px-3 py-1">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <CalendarDays className="h-5 w-5" /> Histórico de Partidas
          </h3>
          <ScrollArea className="h-40 w-full rounded-xl border border-border/50 bg-secondary/10 p-4">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold text-sm">Partida {i}</p>
                    <p className="text-xs text-muted-foreground">
                      1{i} Ago • 19:00
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    Venceu
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <RecordHighlightDrawer
        open={recordOpen}
        onOpenChange={setRecordOpen}
        venueName={venue.name}
      />
    </div>
  )
}
