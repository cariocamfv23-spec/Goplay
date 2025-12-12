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
import { X, Activity, Dumbbell, Zap, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

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
      <DrawerContent className="h-[85vh] flex flex-col rounded-t-3xl">
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
          <DrawerDescription>
            Detalhamento técnico da sua jogada
          </DrawerDescription>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 bg-secondary/50 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="stats">Métricas Avançadas</TabsTrigger>
              <TabsTrigger value="training">Plano de Treino</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6 animate-fade-in">
              <div className="grid gap-6">
                {data.aiStats?.map((stat: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="font-semibold flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        {stat.label}
                      </span>
                      <span className="font-bold text-primary text-lg">
                        {stat.value}
                        <span className="text-sm text-muted-foreground font-normal ml-1">
                          {stat.unit}
                        </span>
                      </span>
                    </div>
                    <Progress
                      value={(stat.value / stat.max) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>

              <Card className="bg-secondary/30 border-none mt-6">
                <CardContent className="p-4">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-gold" /> Insight do Coach AI
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sua técnica está excelente! A IA detectou uma melhoria de
                    12% na potência comparada ao último vídeo. Foque em manter a
                    estabilidade do core para maximizar a precisão.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-br from-primary/10 to-purple-500/5 p-4 rounded-xl border border-primary/10 mb-4">
                <h3 className="font-bold text-lg mb-1 text-primary">
                  {data.trainingPlan?.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Recomendado com base na sua performance
                </p>
              </div>

              <div className="space-y-3">
                {data.trainingPlan?.exercises.map(
                  (exercise: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-card border rounded-xl shadow-sm gap-3"
                    >
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Dumbbell className="h-5 w-5 text-foreground" />
                      </div>
                      <span className="font-medium text-sm">{exercise}</span>
                    </div>
                  ),
                )}
              </div>

              <Button className="w-full rounded-full mt-4 font-bold">
                Salvar Rotina de Treino
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
