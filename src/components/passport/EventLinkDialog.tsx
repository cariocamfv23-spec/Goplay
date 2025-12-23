import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Calendar, MapPin, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { mockEvents } from '@/lib/data'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { usePassportStore } from '@/stores/usePassportStore'

interface EventLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventLinkDialog({ open, onOpenChange }: EventLinkDialogProps) {
  const [search, setSearch] = useState('')
  const [linked, setLinked] = useState<string | null>(null)
  const { addCompetition } = usePassportStore()

  const handleLink = (event: (typeof mockEvents)[0]) => {
    setLinked(event.id)

    // Add to store
    addCompetition({
      id: `linked-${Date.now()}`,
      name: event.title,
      date: event.date,
      location: event.location,
      organizer: event.organizer,
      role: 'Atleta',
      result: 'Participante',
      verified: true,
    })

    setTimeout(() => {
      toast.success('Participação registrada!', {
        description: 'O evento foi adicionado ao seu histórico e validado.',
      })
      onOpenChange(false)
      setLinked(null)
    }, 1000)
  }

  const filteredEvents = mockEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Registrar Participação</DialogTitle>
          <DialogDescription>
            Busque o evento oficial para vincular ao seu passaporte.
          </DialogDescription>
        </DialogHeader>

        <div className="relative py-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar evento..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-3 pb-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-muted shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">
                      {event.title}
                    </h4>
                    <div className="flex flex-col text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={
                      linked === event.id
                        ? 'bg-green-600 hover:bg-green-700'
                        : ''
                    }
                    onClick={() => handleLink(event)}
                    disabled={linked !== null}
                  >
                    {linked === event.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      'Vincular'
                    )}
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground text-sm">
                Nenhum evento encontrado.
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
