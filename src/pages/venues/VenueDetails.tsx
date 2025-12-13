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
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { RecordHighlightDrawer } from '@/components/RecordHighlightDrawer'
import { useState } from 'react'
import { CheckInModal } from '@/components/CheckInModal'

export default function VenueDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const venue = mockVenues.find((v) => v.id === id) || mockVenues[0]
  const [showRecord, setShowRecord] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(false)

  if (!venue) return <div>Local não encontrado</div>

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in relative">
      {/* Hero Image */}
      <div className="relative h-64 w-full">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-md hover:bg-background/80 rounded-full text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-md hover:bg-background/80 rounded-full text-foreground"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">
              {venue.type}
            </Badge>
            <h1 className="text-3xl font-bold leading-tight">{venue.name}</h1>
          </div>
          <div className="flex flex-col items-end">
            <div className="bg-secondary/80 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-sm shadow-sm">
              <Star className="h-4 w-4 fill-gold text-gold" /> {venue.rating}
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {venue.reviews} reviews
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{venue.address}</span>
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
            {venue.distance}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-md bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            onClick={() => setShowCheckIn(true)}
          >
            <CheckCircle2 className="mr-2 h-5 w-5" /> Check-in
          </Button>
          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-md bg-gradient-to-r from-primary to-purple-700 hover:from-primary/90 hover:to-purple-800"
            onClick={() => setShowRecord(true)}
          >
            <Video className="mr-2 h-5 w-5" /> Gravar Lance
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Sobre</h3>
            <p className="text-muted-foreground leading-relaxed">
              {venue.description}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Comodidades</h3>
            <div className="flex flex-wrap gap-2">
              {venue.amenities.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-normal"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-20">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="text-xs text-muted-foreground">
              Preço por hora
            </span>
            <div className="text-xl font-bold text-primary">{venue.price}</div>
          </div>
          <Button size="lg" className="rounded-full px-8 font-bold">
            <Calendar className="mr-2 h-5 w-5" /> Reservar
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
