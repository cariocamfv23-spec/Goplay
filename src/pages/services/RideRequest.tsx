import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Car, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function RideRequest() {
  const navigate = useNavigate()
  const { driverId } = useParams()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-1/2 bg-muted relative">
        {/* Map Placeholder */}
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/800?q=map%20view&color=gray')] bg-cover opacity-50" />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full shadow-md z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 bg-background -mt-6 rounded-t-3xl p-6 relative z-10 shadow-lg flex flex-col">
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />

        <h2 className="text-xl font-bold mb-6">Confirmar Corrida</h2>

        <div className="relative pl-8 space-y-8 mb-8">
          {/* Route Line */}
          <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-border" />

          <div className="relative">
            <div className="absolute -left-8 top-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Origem</p>
            <p className="font-semibold">Rua das Flores, 123</p>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-1 h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center">
              <MapPin className="h-3 w-3 text-gold fill-gold" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Destino</p>
            <p className="font-semibold">Arena Central</p>
          </div>
        </div>

        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=55" />
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold">Carlos Driver</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-gold text-gold" /> 4.9 • Honda
                Civic
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">R$ 24,90</div>
            </div>
          </CardContent>
        </Card>

        <Button
          size="lg"
          className="w-full mt-auto text-lg font-bold h-14 bg-black text-white hover:bg-black/90"
        >
          <Car className="mr-2 h-5 w-5" /> Solicitar Uber Goplay
        </Button>
      </div>
    </div>
  )
}
