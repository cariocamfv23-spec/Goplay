import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockEvents } from '@/lib/data'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  Users,
  MessageCircle,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    return <div>Evento não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-64">
        <img
          src={event.image}
          className="w-full h-full object-cover"
          alt={event.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="px-4 -mt-10 relative">
        <Card className="border-none shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                Esporte
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            <p className="text-muted-foreground text-sm mb-4">
              Organizado por{' '}
              <span className="font-semibold text-foreground">
                {event.organizer}
              </span>
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Data</p>
                  <p className="text-xs text-muted-foreground">
                    {event.date} • 09:00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Localização</p>
                  <p className="text-xs text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Participantes</p>
                  <p className="text-xs text-muted-foreground">
                    32 confirmados
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-2">Sobre o Evento</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {event.description}
            </p>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl mb-6">
              <span className="font-bold text-xl text-primary">
                {event.price}
              </span>
              <span className="text-xs text-muted-foreground">por pessoa</span>
            </div>

            <div className="grid gap-3">
              <Button
                className="w-full h-12 rounded-full text-base font-semibold"
                onClick={() => {}}
              >
                Inscrever-se Agora
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full border-primary text-primary hover:bg-primary/5 gap-2"
                onClick={() => navigate(`/messages/event-${event.id}`)}
              >
                <MessageCircle className="h-5 w-5" /> Chat do Evento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EventDetails
