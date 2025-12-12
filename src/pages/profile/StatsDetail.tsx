import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { mockComparisonStats, mockProfiles } from '@/lib/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, TrendingUp, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { StatsHistoryChart } from '@/components/StatsHistoryChart'

const comparisonChartConfig = {
  user: {
    label: 'Você',
    color: 'hsl(var(--primary))',
  },
  avg: {
    label: 'Média da Liga',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig

export default function StatsDetail() {
  const navigate = useNavigate()
  const profile = mockProfiles[0] // Assuming current user

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg">Estatísticas Detalhadas</h1>
      </div>

      <div className="p-4 space-y-6">
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="comparison">
              <Users className="h-4 w-4 mr-2" /> Comparativo
            </TabsTrigger>
            <TabsTrigger value="history">
              <TrendingUp className="h-4 w-4 mr-2" /> Evolução
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-4 animate-fade-in">
            <Card className="border-none shadow-sm bg-gradient-to-b from-secondary/20 to-transparent">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-lg">
                  Análise de Performance
                </CardTitle>
                <CardDescription>
                  Comparação com a média da sua categoria
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-[300px] w-full">
                  <ChartContainer
                    config={comparisonChartConfig}
                    className="w-full h-full"
                  >
                    <RadarChart data={mockComparisonStats}>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <PolarGrid className="stroke-muted/30" />
                      <PolarAngleAxis
                        dataKey="subject"
                        className="text-xs font-bold fill-foreground"
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 150]}
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        dataKey="user"
                        fill="var(--color-user)"
                        fillOpacity={0.5}
                        stroke="var(--color-user)"
                        strokeWidth={2}
                      />
                      <Radar
                        dataKey="avg"
                        fill="var(--color-avg)"
                        fillOpacity={0.2}
                        stroke="var(--color-avg)"
                        strokeWidth={2}
                      />
                      <ChartLegend
                        content={<ChartLegendContent />}
                        className="mt-4"
                      />
                    </RadarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {mockComparisonStats.map((stat) => {
                const diff = stat.user - stat.avg
                return (
                  <Card
                    key={stat.subject}
                    className="border-none shadow-sm bg-secondary/10"
                  >
                    <CardContent className="p-3">
                      <div className="text-xs text-muted-foreground mb-1">
                        {stat.subject}
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-xl font-bold">{stat.user}</span>
                        <span
                          className={`text-xs font-bold ${diff >= 0 ? 'text-green-500' : 'text-red-500'}`}
                        >
                          {diff > 0 ? '+' : ''}
                          {diff}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            {profile.statsHistory ? (
              <StatsHistoryChart data={profile.statsHistory} />
            ) : (
              <p>Sem dados históricos.</p>
            )}

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mt-4">
              <h3 className="font-bold text-primary mb-2">Insight AI</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Sua evolução técnica nos últimos 3 meses foi de{' '}
                <span className="font-bold text-green-500">+12%</span>. Mantenha
                o foco nos treinos de resistência para equilibrar com sua força
                explosiva.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
