import { Card, CardContent } from '@/components/ui/card'
import { Target, ChevronRight, Trophy } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { mockGoals } from '@/lib/data'
import { useNavigate } from 'react-router-dom'

export function GoalCard() {
  const navigate = useNavigate()
  // Pick the first active goal or mock one if none
  const activeGoal = mockGoals.find((g) => g.status === 'active') || {
    id: 'g-mock',
    title: 'Meta Semanal',
    currentValue: 3,
    targetValue: 5,
    unit: 'treinos',
    progress: 60,
  }

  return (
    <Card
      className="border-none shadow-sm bg-gradient-to-br from-card to-secondary/50 overflow-hidden cursor-pointer group hover:border-primary/20 transition-all hover:shadow-md"
      onClick={() => navigate('/goals')}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Meu Foco
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        <h4 className="text-sm font-bold mb-3 line-clamp-1">
          {activeGoal.title}
        </h4>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">Progresso</span>
            <span className="text-primary">{activeGoal.progress}%</span>
          </div>
          <Progress value={activeGoal.progress} className="h-2" />
          <div className="flex justify-between text-[10px] text-muted-foreground pt-0.5">
            <span>0</span>
            <span>
              {activeGoal.targetValue} {activeGoal.unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
