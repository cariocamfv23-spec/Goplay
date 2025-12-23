import { useParams, useNavigate } from 'react-router-dom'
import { mockVenues } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MapPin,
  Star,
  Share2,
  Calendar,
  Video,
  CheckCircle2,
  Clock,
  Info,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { RecordHighlightDrawer } from '@/components/RecordHighlightDrawer'
import { useState } from 'react'
import { CheckInModal } from '@/components/CheckInModal'
import { toast } from 'sonner'

export default function VenueDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const venue = mockVenues.find((v) => v.id === id)
  const [showRecord, setShowRecord] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(false)

  if (!venue) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4">
        <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center">
          <MapPin className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold">Local não encontrado</h2>
        <p className="text-muted-foreground text-center">
          O local que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={() => navigate('/explore/venues')}>
          Voltar para Lista
        </Button>
      </div>
    )
  }

  const handleBooking = () => {
    toast.success('Solicitação de reserva enviada!', {
      description: 'O estabelecimento entrará em contato para confirmar.',
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in relative">
      {/* Hero Image */}
      <div className="relative h-72 w-full">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-md hover:bg-background/80 rounded-full text-foreground z-20"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-md hover:bg-background/80 rounded-full text-foreground"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              toast.info('Link copiado para a área de transferência')
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-5 -mt-10 relative z-10">
        <div className="flex justify-between items-end mb-4">
          <div className="flex-1 mr-4">
            <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none backdrop-blur-sm">
              {venue.type}
            </Badge>
            <h1 className="text-3xl font-bold leading-tight text-foreground drop-shadow-sm">
              {venue.name}
            </h1>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <div className="bg-background/80 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold text-sm shadow-sm border border-border/50">
              <Star className="h-4 w-4 fill-gold text-gold" /> {venue.rating}
            </div>
            <span className="text-xs text-muted-foreground mt-1 font-medium">
              {venue.reviews} avaliações
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6 p-4 rounded-2xl bg-secondary/30 border border-border/50">
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-medium">{venue.address}</span>
              <span className="text-xs text-muted-foreground">
                {venue.location} • {venue.distance} de você
              </span>
            </div>
          </div>

          {venue.openHours && (
            <div className="flex items-center gap-3 text-sm mt-2 pt-2 border-t border-border/40">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">{venue.openHours}</span>
              <span className="text-xs text-emerald-500 font-bold ml-auto px-2 py-0.5 bg-emerald-500/10 rounded-full">
                Aberto
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-md bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all hover:scale-[1.02] active:scale-95"
            onClick={() => setShowCheckIn(true)}
          >
            <CheckCircle2 className="mr-2 h-5 w-5" /> Check-in
          </Button>
          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-md bg-gradient-to-r from-primary to-purple-700 hover:from-primary/90 hover:to-purple-800 transition-all hover:scale-[1.02] active:scale-95"
            onClick={() => setShowRecord(true)}
          >
            <Video className="mr-2 h-5 w-5" /> Gravar Lance
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Sobre o Local
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {venue.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-lg">Comodidades</h3>
            <div className="flex flex-wrap gap-2">
              {venue.amenities.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm font-normal bg-secondary border border-border/50"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-20 safe-area-bottom">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="text-xs text-muted-foreground font-medium">
              Preço estimado
            </span>
            <div className="text-xl font-bold text-primary">{venue.price}</div>
          </div>
          <Button
            size="lg"
            className="rounded-full px-8 font-bold shadow-lg shadow-primary/20"
            onClick={handleBooking}
          >
            <Calendar className="mr-2 h-5 w-5" /> Reservar Horário
          </Button>
        </div>
      </div>

      <RecordHighlightDrawer
        open={showRecord}
        onOpenChange={setShowRecord}
        venueName={venue.name}
      />
      <CheckInModal
        open={showCheckIn}
        onOpenChange={setShowCheckIn}
        venueName={venue.name}
        points={100}
      />
    </div>
  )
}
