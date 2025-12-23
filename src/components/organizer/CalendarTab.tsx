import { Championship } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Calendar as CalendarIcon, MapPin, Clock, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CalendarTabProps {
  championship: Championship
}

export function CalendarTab({ championship }: CalendarTabProps) {
  const { matches, participants, addMatch, deleteMatch } =
    useChampionshipStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMatch, setNewMatch] = useState({
    teamA: '',
    teamB: '',
    date: '',
    time: '',
    location: '',
    round: '',
  })

  const champMatches = matches.filter(
    (m) => m.championshipId === championship.id,
  )
  const champParticipants = participants.filter(
    (p) => p.championshipId === championship.id && p.status === 'approved',
  )

  const handleAddMatch = () => {
    if (
      !newMatch.teamA ||
      !newMatch.teamB ||
      !newMatch.date ||
      !newMatch.time
    ) {
      return
    }

    addMatch({
      championshipId: championship.id,
      ...newMatch,
    })
    setIsDialogOpen(false)
    setNewMatch({
      teamA: '',
      teamB: '',
      date: '',
      time: '',
      location: '',
      round: '',
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Calendário de Jogos</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <CalendarIcon className="h-4 w-4" /> Agendar Jogo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agendar Partida</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={newMatch.teamA}
                  onValueChange={(val) =>
                    setNewMatch({ ...newMatch, teamA: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Time A" />
                  </SelectTrigger>
                  <SelectContent>
                    {champParticipants.map((p) => (
                      <SelectItem key={p.id} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={newMatch.teamB}
                  onValueChange={(val) =>
                    setNewMatch({ ...newMatch, teamB: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Time B" />
                  </SelectTrigger>
                  <SelectContent>
                    {champParticipants.map((p) => (
                      <SelectItem key={p.id} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="date"
                value={newMatch.date}
                onChange={(e) =>
                  setNewMatch({ ...newMatch, date: e.target.value })
                }
              />
              <Input
                type="time"
                value={newMatch.time}
                onChange={(e) =>
                  setNewMatch({ ...newMatch, time: e.target.value })
                }
              />
              <Input
                placeholder="Local (Ex: Quadra 1)"
                value={newMatch.location}
                onChange={(e) =>
                  setNewMatch({ ...newMatch, location: e.target.value })
                }
              />
              <Input
                placeholder="Rodada (Ex: Final)"
                value={newMatch.round}
                onChange={(e) =>
                  setNewMatch({ ...newMatch, round: e.target.value })
                }
              />
              <Button onClick={handleAddMatch} className="w-full mt-2">
                Agendar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {champMatches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            Nenhuma partida agendada.
          </div>
        ) : (
          champMatches.map((match) => (
            <Card key={match.id} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    {match.round || 'Partida'}
                  </span>
                  <button
                    onClick={() => deleteMatch(match.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-base">{match.teamA}</span>
                  <span className="text-muted-foreground text-xs px-2">VS</span>
                  <span className="font-bold text-base">{match.teamB}</span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" /> {match.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {match.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {match.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
