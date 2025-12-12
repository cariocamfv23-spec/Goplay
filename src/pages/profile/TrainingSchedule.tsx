import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { mockTrainingEvents } from '@/lib/data'
import { Plus, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function TrainingSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState(mockTrainingEvents)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'training',
  })

  const selectedDateEvents = events.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )

  const handleAddEvent = () => {
    if (!newEvent.title || !date) return

    const event = {
      id: Math.random().toString(),
      title: newEvent.title,
      date: date,
      type: newEvent.type,
      completed: false,
    }

    setEvents([...events, event])
    setIsAddOpen(false)
    setNewEvent({ title: '', type: 'training' })
    toast.success('Evento adicionado ao calendário!')
  }

  const toggleComplete = (id: string) => {
    setEvents(
      events.map((evt) =>
        evt.id === id ? { ...evt, completed: !evt.completed } : evt,
      ),
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" /> Agenda de Treinos
        </h3>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1 rounded-full">
              <Plus className="h-3 w-3" /> Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Evento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Ex: Treino de Força"
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(val) =>
                    setNewEvent({ ...newEvent, type: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="training">Treino</SelectItem>
                    <SelectItem value="match">Jogo</SelectItem>
                    <SelectItem value="recovery">Recuperação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddEvent} className="w-full">
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-2 flex justify-center bg-card">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-0"
            modifiers={{
              hasEvent: (date) =>
                events.some(
                  (evt) =>
                    evt.date.getDate() === date.getDate() &&
                    evt.date.getMonth() === date.getMonth() &&
                    evt.date.getFullYear() === date.getFullYear(),
                ),
            }}
            modifiersClassNames={{
              hasEvent: 'font-bold text-primary underline decoration-primary',
            }}
          />
        </div>
      </Card>

      <div className="space-y-3 mt-4">
        <h4 className="text-sm font-semibold text-muted-foreground">
          Eventos do Dia
        </h4>
        {selectedDateEvents.length > 0 ? (
          selectedDateEvents.map((event) => (
            <div
              key={event.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-xl border transition-all',
                event.completed
                  ? 'bg-secondary/30 border-transparent opacity-70'
                  : 'bg-card border-border/50 shadow-sm',
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center',
                    event.type === 'match'
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20'
                      : event.type === 'recovery'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                        : 'bg-primary/10 text-primary',
                  )}
                >
                  {event.type === 'match' ? (
                    <CalendarIcon className="h-5 w-5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h5
                    className={cn(
                      'font-medium text-sm',
                      event.completed && 'line-through text-muted-foreground',
                    )}
                  >
                    {event.title}
                  </h5>
                  <p className="text-xs text-muted-foreground capitalize">
                    {event.type}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleComplete(event.id)}
                className={cn(
                  'rounded-full',
                  event.completed ? 'text-green-500' : 'text-muted-foreground',
                )}
              >
                <CheckCircle2 className="h-5 w-5" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-muted-foreground py-6">
            Nenhum evento para este dia.
          </p>
        )}
      </div>
    </div>
  )
}
