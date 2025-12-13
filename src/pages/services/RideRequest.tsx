import { useParams, useNavigate } from 'react-router-dom'
import { mockDrivers, mockCurrentUser } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, CreditCard, Clock, Navigation } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function RideRequest() {
  const { driverId } = useParams()
  const navigate = useNavigate()
  const driver = mockDrivers.find((d) => d.id === driverId) || mockDrivers[0]

  const handleRequest = () => {
    toast.success('Corrida Solicitada!', {
      description: `Aguardando confirmação de ${driver.name}.`,
    })
    setTimeout(() => {
      navigate('/home')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Map Background Placeholder */}
      <div className="absolute inset-0 z-0 bg-muted">
        <img
          src="https://img.usecurling.com/p/1000/1000?q=map%20gps&color=gray"
          className="w-full h-full object-cover opacity-30 grayscale"
          alt="Map"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute opacity-75"></div>
            <div className="w-4 h-4 bg-primary rounded-full relative border-2 border-white shadow-lg"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-md"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-auto relative z-10 bg-background rounded-t-3xl shadow-2xl p-6 border-t border-border/50 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
              <AvatarImage src={driver.avatar} />
              <AvatarFallback>{driver.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{driver.name}</h3>
              <p className="text-xs text-muted-foreground">
                {driver.car?.model} • {driver.car?.plate}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">R$ 24,90</p>
            <p className="text-xs text-muted-foreground">Estimado</p>
          </div>
        </div>

        <div className="space-y-4 mb-6 relative">
          <div className="absolute left-[11px] top-8 bottom-8 w-[2px] bg-border z-0"></div>

          <div className="flex items-start gap-3 relative z-10">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
            </div>
            <div className="flex-1 border-b border-border/50 pb-2">
              <p className="text-xs text-muted-foreground font-medium">
                Origem
              </p>
              <p className="text-sm font-semibold truncate">
                Localização Atual
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 relative z-10">
            <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <MapPin className="h-3 w-3 text-red-500" />
            </div>
            <div className="flex-1 pb-2">
              <p className="text-xs text-muted-foreground font-medium">
                Destino
              </p>
              <p className="text-sm font-semibold truncate">
                Arena Goplay Central
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-secondary/30 border-none shadow-none">
            <CardContent className="p-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Goplay Wallet</span>
            </CardContent>
          </Card>
          <Card className="bg-secondary/30 border-none shadow-none">
            <CardContent className="p-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">12 min</span>
            </CardContent>
          </Card>
        </div>

        <Button
          size="lg"
          className="w-full h-14 rounded-xl text-lg font-bold shadow-lg"
          onClick={handleRequest}
        >
          <Navigation className="mr-2 h-5 w-5" /> Confirmar Corrida
        </Button>
      </div>
    </div>
  )
}
