import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Plus,
  CheckCircle,
  Circle,
  TrendingUp,
  Clock,
  Trash2,
} from 'lucide-react'
import { usePassportStore } from '@/stores/usePassportStore'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function GoalsTracker() {
  const { goals, updateGoalStatus, removeGoal } = usePassportStore()

  const handleDelete = (id: string) => {
    removeGoal(id)
    toast.success('Objetivo removido.')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-lg">Objetivos Futuros</h3>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" /> Novo Objetivo
        </Button>
      </div>

      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-xl">
            Nenhum objetivo definido.
          </div>
        ) : (
          goals.map((goal) => (
            <Card
              key={goal.id}
              className={cn(
                'border-l-4 shadow-sm transition-all group',
                goal.status === 'achieved'
                  ? 'border-l-green-500 bg-green-500/5'
                  : goal.status === 'in_progress'
                    ? 'border-l-blue-500'
                    : 'border-l-zinc-300',
              )}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <button
                  onClick={() => updateGoalStatus(goal.id)}
                  className="hover:scale-110 transition-transform"
                >
                  {goal.status === 'achieved' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : goal.status === 'in_progress' ? (
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4
                      className={cn(
                        'font-bold text-sm',
                        goal.status === 'achieved' &&
                          'line-through text-muted-foreground',
                      )}
                    >
                      {goal.title}
                    </h4>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-5 px-1.5"
                    >
                      {goal.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Meta: {goal.targetDate}
                    </span>
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
