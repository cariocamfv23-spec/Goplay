import { StatsHistoryChart } from '@/components/StatsHistoryChart'
import { TrainingSuggestions } from '@/components/TrainingSuggestions'
import {
  mockStatsHistory,
  mockTrainingSuggestions,
  mockAiAnalysis,
} from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap, TrendingUp, Target, Activity } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'

export default function StatsDetail() {
  const navigate = useNavigate()

  // Defensive coding: ensure aiStats exists before mapping
  // We use 'as any' to safely access properties that might not be inferred correctly in all contexts
  const aiStats = (mockAiAnalysis as any)?.aiStats || []

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Estatísticas Detalhadas</h1>
      </div>

      <div className="p-4 space-y-6">
        <StatsHistoryChart data={mockStatsHistory} />

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-bold text-primary">85%</span>
              <span className="text-xs text-muted-foreground">
                Precisão Geral
              </span>
            </CardContent>
          </Card>
          <Card className="bg-orange-500/5 border-orange-500/20">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-2xl font-bold text-orange-500">1250</span>
              <span className="text-xs text-muted-foreground">Power Score</span>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gold" /> Análise Recente
          </h3>
          <Card>
            <CardContent className="p-5 space-y-4">
              {aiStats && aiStats.length > 0 ? (
                aiStats.map((stat: any, i: number) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="font-bold">
                        {stat.value} {stat.unit}
                      </span>
                    </div>
                    <Progress
                      value={(stat.value / stat.max) * 100}
                      className="h-2"
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-20" />
                  <p>Dados insuficientes para análise detalhada.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <TrainingSuggestions suggestions={mockTrainingSuggestions} />
      </div>
    </div>
  )
}
