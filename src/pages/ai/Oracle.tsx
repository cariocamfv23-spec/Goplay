import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Brain,
  Star,
  Search,
  MessageSquare,
  Target,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

// Local Mock Data for Oracle
const MOCK_ORACLE_DATA = {
  potentialIndex: 92,
  predictedPosition: 'Atacante de Elite',
  futureSkills: [
    { name: 'Visão de Jogo', current: 75, projected: 90 },
    { name: 'Finalização', current: 80, projected: 95 },
    { name: 'Físico', current: 70, projected: 85 },
  ],
  marketValueHistory: [
    { year: '2022', value: 1000 },
    { year: '2023', value: 2500 },
    { year: '2024', value: 5000 },
    { year: '2025', value: 12000 },
    { year: '2026', value: 25000 },
  ],
  comparisonData: [
    { subject: 'Téc', A: 80, fullMark: 100 },
    { subject: 'Tát', A: 70, fullMark: 100 },
    { subject: 'Fís', A: 85, fullMark: 100 },
    { subject: 'Men', A: 65, fullMark: 100 },
  ],
}

export default function Oracle() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative h-56 bg-gradient-to-br from-indigo-900 via-purple-900 to-background p-6 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 flex items-start justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs text-gold font-bold flex items-center gap-2 shadow-lg">
            <Sparkles className="h-3 w-3 animate-pulse" /> PREVISÃO 2026
          </div>
        </div>
        <div className="relative z-10 mt-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/20 rounded-xl border border-primary/30 backdrop-blur-sm">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Oráculo
              </h1>
              <p className="text-indigo-200 text-sm font-medium">
                IA Preditiva de Carreira
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-20 space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12 bg-background/95 backdrop-blur-md border border-border/50 shadow-sm rounded-xl p-1 mb-4">
            <TabsTrigger
              value="overview"
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="career"
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Carreira
            </TabsTrigger>
            <TabsTrigger
              value="advisor"
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Advisor
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="space-y-4 animate-in slide-in-from-bottom-4 duration-500"
          >
            {/* Potential Card */}
            <Card className="border-none shadow-lg bg-card border-border/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Índice de Potencial
                  </p>
                  <div className="text-5xl font-black text-primary mt-2 tracking-tighter">
                    {MOCK_ORACLE_DATA.potentialIndex}
                    <span className="text-2xl text-muted-foreground/50 font-normal ml-1">
                      /100
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-2 bg-primary/10 text-primary border-primary/20"
                  >
                    Top 5% da sua categoria
                  </Badge>
                </div>
                <div className="h-24 w-24 rounded-full border-8 border-primary/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-8 border-primary border-t-transparent rounded-full animate-[spin_3s_linear_infinite]" />
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Insight Card */}
            <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">
                      Sugestão do Oráculo
                    </h4>
                    <p className="text-sm text-indigo-100 mt-1 leading-relaxed">
                      Para atingir seu potencial máximo como{' '}
                      <span className="font-bold text-white underline decoration-gold underline-offset-2">
                        {MOCK_ORACLE_DATA.predictedPosition}
                      </span>
                      , foque em melhorar sua{' '}
                      <span className="font-bold">visão de jogo</span> nos
                      próximos 3 meses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Skills */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold flex items-center gap-2 px-1">
                <Star className="h-5 w-5 text-gold" /> Projeção de Skills
              </h3>
              <div className="grid gap-3">
                {MOCK_ORACLE_DATA.futureSkills.map((skill) => (
                  <Card
                    key={skill.name}
                    className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{skill.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Atual: {skill.current}
                          </span>
                          <span className="text-xs text-primary font-bold">
                            → {skill.projected}
                          </span>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold text-xs">
                        +{skill.projected - skill.current}
                      </div>
                    </div>
                    <div className="h-1 bg-secondary w-full">
                      <div
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: `${(skill.projected / 100) * 100}%` }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="career"
            className="space-y-6 animate-in slide-in-from-bottom-4 duration-500"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" /> Valor de
                  Mercado (Projeção)
                </CardTitle>
                <CardDescription>
                  Evolução estimada em pontos GoPlay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ChartContainer
                    config={{
                      value: { label: 'Valor', color: 'hsl(var(--primary))' },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_ORACLE_DATA.marketValueHistory}>
                        <defs>
                          <linearGradient
                            id="colorValue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-value)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-value)"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="year"
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                        />
                        <YAxis hide />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="var(--color-value)"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    2026
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Ano do Pico
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-green-500/5 border-green-500/20">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    25k
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Pontos Projetados
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="advisor"
            className="h-[500px] flex flex-col animate-in slide-in-from-bottom-4 duration-500"
          >
            <Card className="flex-1 flex flex-col border-border/50 shadow-lg">
              <CardHeader className="border-b pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" /> Chat com
                  Oráculo
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[350px] p-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-tl-none p-3 text-sm">
                        Olá! Sou sua IA de carreira. Pergunte-me sobre suas
                        chances de bolsa ou como melhorar seu passe.
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold">EU</span>
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-3 text-sm">
                        Quais minhas chances de jogar na Europa?
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-tl-none p-3 text-sm">
                        Com base na sua evolução atual (85% de melhoria física),
                        suas chances aumentaram para{' '}
                        <span className="font-bold text-primary">
                          High Potential
                        </span>
                        . Recomendo focar em agências listadas na aba
                        'Explorar'.
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <div className="p-3 border-t bg-secondary/20">
                <div className="relative">
                  <Input placeholder="Faça uma pergunta..." className="pr-10" />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full text-primary"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
