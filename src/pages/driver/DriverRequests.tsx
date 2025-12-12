import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, MapPin, Navigation, Star, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockRideRequests } from '@/lib/data'
import { toast } from 'sonner'

export default function DriverRequests() {
  const navigate = useNavigate()

  const handleAccept = (id: string) => {
    toast.success('Corrida aceita!', {
      description: 'Navegando para o local de embarque.',
    })
    navigate(`/driver/active/${id}`)
  }

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      <div className="p-4 border-b flex items-center gap-4 sticky top-0 bg-background z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Solicitações Próximas</h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {mockRideRequests.map((request) => (
          <Card key={request.id} className="overflow-hidden shadow-md">
            <div className="bg-secondary/30 p-3 flex justify-between items-center border-b">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">
                  {request.time} até buscar
                </span>
              </div>
              <span className="font-bold text-lg text-primary">
                {request.price}
              </span>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={request.passenger.avatar} />
                  <AvatarFallback>{request.passenger.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{request.passenger.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    <span className="text-xs text-muted-foreground">
                      {request.passenger.rating}
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-xs font-bold bg-muted px-2 py-1 rounded-full">
                    {request.distance}
                  </span>
                </div>
              </div>

              <div className="space-y-3 relative pl-4 border-l-2 border-dashed border-muted ml-2 mb-4">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 h-3 w-3 bg-blue-500 rounded-full ring-2 ring-background" />
                  <p className="text-xs text-muted-foreground">Embarque</p>
                  <p className="text-sm font-medium">{request.pickup}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 h-3 w-3 bg-red-500 rounded-square ring-2 ring-background" />
                  <p className="text-xs text-muted-foreground">Destino</p>
                  <p className="text-sm font-medium">{request.dropoff}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  Recusar
                </Button>
                <Button
                  className="w-full font-bold"
                  onClick={() => handleAccept(request.id)}
                >
                  Aceitar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {mockRideRequests.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
            <p className="text-muted-foreground">
              Nenhuma solicitação no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
