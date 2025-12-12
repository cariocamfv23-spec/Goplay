import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowLeft,
  Navigation,
  MessageCircle,
  Phone,
  Shield,
  MapPin,
  CheckCircle,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockRideRequests } from '@/lib/data'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ActiveRide() {
  const navigate = useNavigate()
  const { id } = useParams()
  const request =
    mockRideRequests.find((r) => r.id === id) || mockRideRequests[0]
  const [status, setStatus] = useState<
    'going_to_pickup' | 'arrived' | 'in_progress' | 'completed'
  >('going_to_pickup')

  const handleAction = () => {
    if (status === 'going_to_pickup') {
      setStatus('arrived')
      toast.info('Notificamos o passageiro que você chegou.')
    } else if (status === 'arrived') {
      setStatus('in_progress')
      toast.success('Corrida iniciada!')
    } else if (status === 'in_progress') {
      setStatus('completed')
      toast.success('Corrida finalizada!', {
        description: `Você recebeu ${request.price}`,
      })
      setTimeout(() => navigate('/driver/dashboard'), 2000)
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case 'going_to_pickup':
        return 'Indo buscar passageiro'
      case 'arrived':
        return 'Aguardando passageiro'
      case 'in_progress':
        return 'Em rota para destino'
      case 'completed':
        return 'Corrida finalizada'
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b flex items-center gap-4 sticky top-0 bg-background z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-bold">Em Corrida</h1>
          <p className="text-xs text-primary font-medium animate-pulse">
            {getStatusLabel()}
          </p>
        </div>
      </div>

      <div className="flex-1 relative">
        {/* Mock Map */}
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=gps%20navigation&color=gray')] bg-cover bg-center" />

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="rounded-full">
            <Navigation className="h-5 w-5 text-blue-500" />
          </Button>
        </div>
      </div>

      <div className="p-4 bg-background rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.passenger.avatar} />
              <AvatarFallback>{request.passenger.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{request.passenger.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold text-gold" />{' '}
                {request.passenger.rating}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="bg-secondary/20 p-4 rounded-xl mb-6 flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Destino</p>
            <p className="font-bold text-sm">{request.dropoff}</p>
          </div>
        </div>

        <Button
          className={cn(
            'w-full h-14 rounded-full font-bold text-lg shadow-lg transition-all',
            status === 'completed'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-primary',
          )}
          onClick={handleAction}
          disabled={status === 'completed'}
        >
          {status === 'going_to_pickup' && 'Cheguei no Local'}
          {status === 'arrived' && 'Iniciar Corrida'}
          {status === 'in_progress' && 'Finalizar Corrida'}
          {status === 'completed' && (
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> Finalizado
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
