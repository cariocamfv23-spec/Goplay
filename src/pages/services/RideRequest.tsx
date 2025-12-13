import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Navigation, ArrowLeft, Star, Car, Clock } from 'lucide-react'
import { mockDrivers } from '@/lib/data'
import { useState } from 'react'
import { toast } from 'sonner'

export default function RideRequest() {
  const { driverId } = useParams()
  const navigate = useNavigate()
  const driver =
    mockDrivers.find((d) => d.id.toString() === driverId) || mockDrivers[0]
  const [status, setStatus] = useState<'confirm' | 'searching' | 'arriving'>(
    'confirm',
  )

  const handleRequest = () => {
    setStatus('searching')
    setTimeout(() => {
      setStatus('arriving')
      toast.success('Motorista Confirmado!', {
        description: `${driver.name} está a caminho. Chegada em 4 min.`,
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* Map Placeholder */}
      <div className="flex-1 bg-muted relative">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=map%20street%20view&color=gray')] bg-cover opacity-50 grayscale" />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full shadow-lg z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        {/* Route Overlay */}
        <div className="absolute top-20 left-4 right-4 bg-background/90 backdrop-blur rounded-xl p-4 shadow-lg border border-border/50 z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="flex-1 border-b border-border/50 pb-2">
              <p className="text-xs text-muted-foreground">Partida</p>
              <p className="font-semibold text-sm">Sua localização atual</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Destino</p>
              <p className="font-semibold text-sm">Arena Central</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-background rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6 z-20 animate-slide-in-from-bottom-10">
        {status === 'confirm' && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={driver.avatar} />
                <AvatarFallback>{driver.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{driver.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-gold text-gold" />{' '}
                    {driver.rating}
                  </span>
                  <span>•</span>
                  <span>{driver.car}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">R$ 15,90</p>
                <p className="text-xs text-muted-foreground">Estimado</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-secondary/20 border-none">
                <CardContent className="p-3 flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Distância</p>
                    <p className="font-bold">3.2 km</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary/20 border-none">
                <CardContent className="p-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Tempo</p>
                    <p className="font-bold">12 min</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              className="w-full h-14 text-lg font-bold rounded-full shadow-lg"
              onClick={handleRequest}
            >
              Confirmar Goplay Ride
            </Button>
          </>
        )}

        {status === 'searching' && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <h3 className="font-bold text-lg">Conectando com o motorista...</h3>
            <p className="text-muted-foreground">Aguarde um momento</p>
          </div>
        )}

        {status === 'arriving' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-green-600">
                Motorista a caminho
              </h3>
              <span className="font-mono font-bold bg-secondary px-2 py-1 rounded">
                4 min
              </span>
            </div>
            <div className="flex items-center gap-4 bg-secondary/30 p-4 rounded-xl">
              <Avatar className="h-12 w-12">
                <AvatarImage src={driver.avatar} />
              </Avatar>
              <div>
                <p className="font-bold">{driver.plate}</p>
                <p className="text-sm text-muted-foreground">{driver.car}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <Button size="icon" className="rounded-full h-10 w-10">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Cancelar Corrida
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
