import { Tribe } from '@/stores/useNexusStore'
import { Calendar, MapPin, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TribeEventsTab({ tribe }: { tribe: Tribe }) {
  if (!tribe.events || tribe.events.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-secondary/20 rounded-2xl border border-border border-dashed mt-4">
        <Calendar className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground font-medium">
          Nenhum evento agendado para esta tribo no momento.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-4">
      {tribe.events.map((event) => (
        <div
          key={event.id}
          className="p-5 bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors group"
        >
          <div className="space-y-2.5">
            <h4 className="font-bold text-lg leading-none">{event.title}</h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" /> {event.date}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> {event.location}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full md:w-auto gap-2 group-hover:bg-primary/10 group-hover:text-primary border-border/50 group-hover:border-primary/30 transition-all"
          >
            Ver Detalhes <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
