import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { mockVenues } from '@/lib/data'
import {
  MapPin,
  Star,
  Share2,
  ArrowLeft,
  Camera,
  Calendar,
  Trophy,
  Wifi,
  ShowerHead,
  Coffee,
  Car,
} from 'lucide-react'
import { useState } from 'react'
import { RecordHighlightDrawer } from '@/components/RecordHighlightDrawer'

export default function VenueDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const venue = mockVenues.find((v) => v.id === id) || mockVenues[0]
  const [showRecordDrawer, setShowRecordDrawer] = useState(false)

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('Wi-Fi')) return <Wifi className="h-4 w-4" />
    if (amenity.includes('Chuveir') || amenity.includes('Vestiário'))
      return <ShowerHead className="h-4 w-4" />
    if (amenity.includes('Lanchonete') || amenity.includes('Bar'))
      return <Coffee className="h-4 w-4" />
    if (amenity.includes('Estacionamento')) return <Car className="h-4 w-4" />
    return <Trophy className="h-4 w-4" />
  }

  if (!venue) return <div>Local não encontrado</div>

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in relative">
      {/* Header Image */}
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
          className="absolute top-4 left-4 bg-black/20 text-white hover:bg-black/40 rounded-full backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-black/20 text-white hover:bg-black/40 rounded-full backdrop-blur-sm"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 -mt-8 relative z-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <Badge className="mb-2 bg-primary/90 hover:bg-primary">
              {venue.sports[0]}
            </Badge>
            <h1 className="text-3xl font-bold leading-tight text-foreground drop-shadow-sm">
              {venue.name}
            </h1>
          </div>
          <div className="flex flex-col items-center bg-card p-2 rounded-xl shadow-md border border-border/50">
            <span className="text-2xl font-bold text-primary">
              {venue.rating}
            </span>
            <div className="flex text-gold">
              <Star className="h-3 w-3 fill-current" />
              <Star className="h-3 w-3 fill-current" />
              <Star className="h-3 w-3 fill-current" />
              <Star className="h-3 w-3 fill-current" />
              <Star className="h-3 w-3 fill-current" />
            </div>
            <span className="text-[10px] text-muted-foreground">
              {venue.reviews} reviews
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <MapPin className="h-4 w-4 text-primary" />
          {venue.address}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            className="h-12 text-base font-bold shadow-lg"
            onClick={() => {}}
          >
            <Calendar className="mr-2 h-5 w-5" /> Agendar
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-bold border-primary text-primary hover:bg-primary/5"
            onClick={() => setShowRecordDrawer(true)}
          >
            <Camera className="mr-2 h-5 w-5" /> Gravar Lance
          </Button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-lg mb-3">Comodidades</h3>
            <div className="grid grid-cols-2 gap-3">
              {venue.amenities?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/50"
                >
                  <div className="p-2 bg-background rounded-full text-primary">
                    {getAmenityIcon(item)}
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">Preços</h3>
            <Card className="border-none shadow-sm bg-primary/5">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Aluguel Quadra</p>
                  <p className="text-xs text-muted-foreground">
                    Por hora / avulso
                  </p>
                </div>
                <span className="text-xl font-bold text-primary">
                  {venue.price}
                </span>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <RecordHighlightDrawer
        open={showRecordDrawer}
        onOpenChange={setShowRecordDrawer}
        venueName={venue.name}
      />
    </div>
  )
}
