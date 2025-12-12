import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X, Activity, Dumbbell, Zap, Target, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'

interface AiAnalysisDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: any
}

export function AiAnalysisDrawer({
  open,
  onOpenChange,
  data,
}: AiAnalysisDrawerProps) {
  if (!data) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] flex flex-col rounded-t-3xl bg-zinc-950 text-white border-zinc-800">
        <DrawerHeader className="relative text-left px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 gap-1"
            >
              <Zap className="h-3 w-3" /> AI Analysis 2.0
            </Badge>
          </div>
          <DrawerTitle className="text-2xl font-bold">
            Análise de Performance
          </DrawerTitle>
          <DrawerDescription className="text-zinc-400">
            Detalhamento técnico da sua jogada e pontos de melhoria
          </DrawerDescription>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 bg-zinc-800 rounded-full hover:bg-zinc-700 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6 bg-zinc-900">
              <TabsTrigger
                value="stats"
                className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
              >
                Estatísticas
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
              >
                O que Melhorar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6 animate-fade-in">
              <div className="grid gap-6">
                {data.aiStats?.map((stat: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="font-semibold flex items-center gap-2 text-zinc-200">
                        <Activity className="h-4 w-4 text-primary" />
                        {stat.label}
                      </span>
                      <span className="font-bold text-primary text-lg">
                        {stat.value}
                        <span className="text-sm text-zinc-500 font-normal ml-1">
                          {stat.unit}
                        </span>
                      </span>
                    </div>
                    <Progress
                      value={(stat.value / stat.max) * 100}
                      className="h-2 bg-zinc-800"
                    />
                  </div>
                ))}
              </div>

              <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                <CardContent className="p-4">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-yellow-500" /> Insight do
                    Coach AI
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Sua técnica está excelente! A IA detectou uma melhoria de
                    12% na potência comparada ao último vídeo. Foque em manter a
                    estabilidade do core para maximizar a precisão.
                  </p>
                </CardContent>
              </Card>

              <Link to="/profile/stats">
                <Button
                  variant="outline"
                  className="w-full mt-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  Ver Estatísticas Detalhadas
                </Button>
              </Link>
            </TabsContent>

            <TabsContent value="training" className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-br from-primary/20 to-purple-900/20 p-4 rounded-xl border border-primary/20 mb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-primary">
                      {data.trainingPlan?.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Recomendado com base na sua performance
                    </p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="space-y-3">
                {data.trainingPlan?.exercises.map(
                  (exercise: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm gap-3"
                    >
                      <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                        <Dumbbell className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-sm text-zinc-200">
                        {exercise}
                      </span>
                    </div>
                  ),
                )}
              </div>

              <Button className="w-full rounded-full mt-4 font-bold bg-white text-black hover:bg-zinc-200">
                Salvar Rotina de Treino
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
