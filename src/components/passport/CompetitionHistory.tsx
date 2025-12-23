import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Trophy,
  Calendar,
  MapPin,
  CheckCircle2,
  Plus,
  MoreVertical,
  Trash2,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePassportStore } from '@/stores/usePassportStore'
import { toast } from 'sonner'

export function CompetitionHistory() {
  const { competitions, removeCompetition } = usePassportStore()

  const handleDelete = (id: string) => {
    removeCompetition(id)
    toast.success('Competição removida do histórico.')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-lg">Histórico de Competições</h3>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" /> Adicionar
        </Button>
      </div>

      <div className="space-y-3">
        {competitions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl">
            Nenhuma competição registrada.
          </div>
        ) : (
          competitions.map((comp) => (
            <Card
              key={comp.id}
              className="overflow-hidden border-none shadow-sm"
            >
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  <div className="w-1.5 bg-primary flex-shrink-0" />
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-sm">{comp.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {comp.organizer}
                        </p>
                      </div>
                      {comp.verified && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] h-5 px-1.5 gap-1"
                        >
                          <CheckCircle2 className="h-3 w-3" /> Verificado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {comp.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {comp.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">
                          {comp.role}
                        </Badge>
                        {comp.result && (
                          <span className="text-xs font-bold text-primary flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-gold" />{' '}
                            {comp.result}
                          </span>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-500 focus:text-red-600"
                            onClick={() => handleDelete(comp.id)}
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
