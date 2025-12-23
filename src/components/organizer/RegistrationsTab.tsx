import { Championship } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import {
  CheckCircle,
  XCircle,
  MoreVertical,
  Plus,
  Trash2,
  Users,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface RegistrationsTabProps {
  championship: Championship
}

export function RegistrationsTab({ championship }: RegistrationsTabProps) {
  const {
    participants,
    addParticipant,
    updateParticipantStatus,
    removeParticipant,
  } = useChampionshipStore()
  const [newParticipant, setNewParticipant] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const championshipParticipants = participants.filter(
    (p) => p.championshipId === championship.id,
  )

  const handleAdd = () => {
    if (!newParticipant) return
    addParticipant({
      championshipId: championship.id,
      name: newParticipant,
    })
    setNewParticipant('')
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">
          Participantes ({championshipParticipants.length})
        </h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Participante</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Nome do Time ou Atleta"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
              />
              <Button onClick={handleAdd} className="w-full">
                Cadastrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {championshipParticipants.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            Nenhum participante registrado.
          </div>
        ) : (
          championshipParticipants.map((p) => (
            <Card key={p.id} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{p.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          p.status === 'approved'
                            ? 'default'
                            : p.status === 'rejected'
                              ? 'destructive'
                              : 'secondary'
                        }
                        className="text-[10px]"
                      >
                        {p.status === 'approved'
                          ? 'Confirmado'
                          : p.status === 'rejected'
                            ? 'Rejeitado'
                            : 'Pendente'}
                      </Badge>
                      {p.contact && (
                        <span className="text-xs text-muted-foreground">
                          {p.contact}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => updateParticipantStatus(p.id, 'approved')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Aprovar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => updateParticipantStatus(p.id, 'rejected')}
                    >
                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                      Rejeitar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => updateParticipantStatus(p.id, 'pending')}
                    >
                      Marcar como Pendente
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500"
                      onClick={() => removeParticipant(p.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
