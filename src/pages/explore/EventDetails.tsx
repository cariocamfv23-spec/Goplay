import { useParams, useNavigate } from 'react-router-dom'
import { mockEvents } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, MapPin, Ticket, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CheckInModal } from '@/components/CheckInModal'
import { useState } from 'react'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = mockEvents.find((e) => e.id === id) || mockEvents[0]
  const [showCheckIn, setShowCheckIn] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-28 animate-fade-in">
      <div className="relative h-72 w-full">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-md rounded-full hover:bg-background/80"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-5 -mt-10 relative z-10">
        <Badge className="mb-3">{event.category}</Badge>
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>

        <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">{event.date}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">{event.location}</p>
              <p className="text-xs text-muted-foreground">{event.address}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Detalhes</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Check-in Modal Integration */}
      <CheckInModal
        open={showCheckIn}
        onOpenChange={setShowCheckIn}
        venueName={event.location}
        points={150}
      />

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border/50 flex flex-row items-center gap-3 z-30 pb-safe">
        <div className="hidden sm:block min-w-[100px]">
          <p className="text-xs text-muted-foreground">Ingressos a partir de</p>
          <p className="text-xl font-bold text-primary">
            R$ {event.price.toFixed(2)}
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-full font-bold border-primary text-primary hover:bg-primary/5 gap-2 h-14"
          onClick={() => setShowCheckIn(true)}
        >
          <CheckCircle2 className="h-5 w-5" />
          Check-in
        </Button>

        <Button
          size="lg"
          className="flex-1 rounded-full font-bold shadow-lg shadow-primary/20 h-14"
        >
          <Ticket className="mr-2 h-5 w-5" /> Comprar
        </Button>
      </div>
    </div>
  )
}
