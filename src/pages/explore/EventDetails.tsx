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
import { ErrorState } from '@/components/ErrorState'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    return (
      <ErrorState
        title="Evento não encontrado"
        message="O evento que você procura pode ter sido cancelado, removido ou o link está incorreto. Verifique a URL e tente novamente."
        backPath="/explore"
        className="min-h-screen pt-20"
      />
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src={event.image}
          className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-700"
          alt={event.title}
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="px-4 -mt-10 relative z-10">
        <Card className="border-none shadow-xl mb-6 animate-slide-up bg-card/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none transition-colors duration-300">
                Esporte
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-secondary transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-2xl font-bold mb-2 leading-tight">
              {event.title}
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Organizado por{' '}
              <span className="font-semibold text-foreground">
                {event.organizer}
              </span>
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Data</p>
                  <p className="text-sm text-muted-foreground">
                    {event.date} • 09:00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Localização</p>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Participantes</p>
                  <p className="text-sm text-muted-foreground">
                    32 confirmados
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Sobre o Evento</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl mb-6 border border-border/50">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Valor</span>
                <span className="font-bold text-xl text-primary">
                  {event.price}
                </span>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-background rounded-md shadow-sm">
                por pessoa
              </span>
            </div>

            <div className="grid gap-3">
              <Button
                className="w-full h-12 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                onClick={() => {}}
              >
                Inscrever-se Agora
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full border-primary text-primary hover:bg-primary/5 gap-2 transition-colors"
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
