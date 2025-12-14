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
import { X, Activity, Zap, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { StatsHistoryChart } from './StatsHistoryChart'
import { TrainingSuggestions } from './TrainingSuggestions'
import { StatsRadarChart } from './StatsRadarChart'

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
      <DrawerContent className="h-[90vh] flex flex-col rounded-t-3xl bg-zinc-950 text-white border-zinc-800">
        <DrawerHeader className="relative text-left px-6 pt-6 pb-2 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 gap-1"
            >
              <Zap className="h-3 w-3" /> AI Skip Analysis
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
              {/* Score Card */}
              <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <div>
                  <h4 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Score da Jogada
                  </h4>
                  <span className="text-4xl font-black text-white">
                    {data.score}
                  </span>
                  <span className="text-zinc-500 text-sm font-medium">
                    /100
                  </span>
                </div>
                <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center bg-primary/10">
                  <Zap className="h-6 w-6 text-primary fill-current" />
                </div>
              </div>

              {/* Technical Stats Bars */}
              <div className="grid gap-4">
                {data.aiStats?.map((stat: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="font-semibold flex items-center gap-2 text-zinc-200 text-sm">
                        <Activity className="h-3.5 w-3.5 text-primary" />
                        {stat.label}
                      </span>
                      <span className="font-bold text-primary text-base">
                        {stat.value}
                        <span className="text-xs text-zinc-500 font-normal ml-1">
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

              {/* Radar Chart */}
              {data.aiStats && (
                <div className="mt-4">
                  <StatsRadarChart stats={data.aiStats} />
                </div>
              )}

              {/* Insight Card */}
              <Card className="bg-zinc-900/50 border-zinc-800 mt-2">
                <CardContent className="p-4">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-white text-sm">
                    <Target className="h-4 w-4 text-yellow-500" /> Insight do
                    Coach AI
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {data.feedback ||
                      'Sua técnica está excelente! Continue treinando para melhorar seus resultados.'}
                  </p>
                </CardContent>
              </Card>

              {/* Stats History Chart */}
              {data.history && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <StatsHistoryChart data={data.history} />
                </div>
              )}

              <Link to="/profile/stats" className="block mt-4">
                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  Ver Estatísticas Detalhadas
                </Button>
              </Link>
            </TabsContent>

            <TabsContent value="training" className="space-y-4 animate-fade-in">
              <TrainingSuggestions suggestions={data.suggestions || []} />
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
