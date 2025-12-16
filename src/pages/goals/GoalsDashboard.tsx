import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Target, Award, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GoalCard } from '@/components/GoalCard'
import { CreateGoalDrawer } from '@/components/CreateGoalDrawer'
import { useGoalStore } from '@/stores/useGoalStore'
import { StatsHistoryChart } from '@/components/StatsHistoryChart'
import { mockStatsHistory } from '@/lib/data'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'

export default function GoalsDashboard() {
  const navigate = useNavigate()
  const { goals } = useGoalStore()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const activeGoals = goals.filter((g) => g.status === 'active')
  const completedGoals = goals.filter((g) => g.status === 'completed')

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Metas de Treino
              <Target className="h-5 w-5 text-primary" />
            </h1>
            <p className="text-xs text-muted-foreground">
              Planeje e acompanhe sua evolução
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => setIsCreateOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Nova Meta
        </Button>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Trend Summary */}
        <Card className="bg-gradient-to-br from-secondary/50 to-background border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Tendência de Performance
            </CardTitle>
            <CardDescription>
              Sua evolução em relação às metas definidas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[150px] w-full">
              <StatsHistoryChart data={mockStatsHistory} />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">
              Em Progresso ({activeGoals.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Concluídas ({completedGoals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="active"
            className="space-y-4 animate-in slide-in-from-bottom-2"
          >
            {activeGoals.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Nenhuma meta ativa no momento.</p>
                <Button variant="link" onClick={() => setIsCreateOpen(true)}>
                  Criar primeira meta
                </Button>
              </div>
            ) : (
              activeGoals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
            )}
          </TabsContent>

          <TabsContent
            value="completed"
            className="space-y-4 animate-in slide-in-from-bottom-2"
          >
            {completedGoals.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Nenhuma meta concluída ainda.</p>
              </div>
            ) : (
              completedGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CreateGoalDrawer open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  )
}
