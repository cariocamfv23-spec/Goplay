import { Goal } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Trophy,
  Zap,
  Target,
  Brain,
  CheckCircle2,
  Clock,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useState } from 'react'
import { ShareDialog } from './ShareDialog'

interface GoalCardProps {
  goal: Goal
  onClick?: () => void
}

export function GoalCard({ goal, onClick }: GoalCardProps) {
  const [shareOpen, setShareOpen] = useState(false)

  const getIcon = (category: Goal['category']) => {
    switch (category) {
      case 'physical':
        return <Zap className="h-4 w-4" />
      case 'technical':
        return <Target className="h-4 w-4" />
      case 'tactical':
        return <Brain className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getColor = (category: Goal['category']) => {
    switch (category) {
      case 'physical':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'technical':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      case 'tactical':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/20'
      default:
        return 'text-gold bg-gold/10 border-gold/20'
    }
  }

  const daysLeft = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24),
  )

  const isCompleted = goal.status === 'completed'

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShareOpen(true)
  }

  return (
    <>
      <Card
        className={cn(
          'group cursor-pointer transition-all hover:border-primary/50 relative',
          isCompleted ? 'opacity-90' : '',
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          {/* Share Button Absolute */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/50 hover:bg-background/80 hover:text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleShare}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>

          <div className="flex items-start justify-between mb-3 pr-6">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'h-8 w-8 rounded-lg flex items-center justify-center border',
                  getColor(goal.category),
                )}
              >
                {getIcon(goal.category)}
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                  {goal.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {goal.metric}: {goal.targetValue} {goal.unit}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {isCompleted ? (
              <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Concluído
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className={cn(
                  'text-[10px]',
                  daysLeft < 7
                    ? 'text-red-500 border-red-500/30 bg-red-500/5'
                    : 'text-muted-foreground',
                )}
              >
                <Clock className="h-3 w-3 mr-1" />
                {daysLeft > 0 ? `${daysLeft} dias` : 'Vencido'}
              </Badge>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Progresso</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={
          isCompleted ? `Meta Alcançada: ${goal.title}` : `Meta: ${goal.title}`
        }
        description={`Meu objetivo no Goplay: Atingir ${goal.targetValue} ${goal.unit} em ${goal.metric}. Estou com ${goal.progress}% de progresso!`}
      />
    </>
  )
}
