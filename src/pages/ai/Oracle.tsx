import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Sparkles, TrendingUp, Brain, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockOracle } from '@/lib/data'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'

export default function Oracle() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-primary via-purple-900 to-black p-4 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 flex items-start justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs text-gold font-bold flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> PREVISÃO 2026
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-1">
            Oráculo Goplay
          </h1>
          <p className="text-white/70 text-sm">IA Preditiva de Carreira</p>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-6 relative z-20">
        {/* Potential Card */}
        <Card className="border-none shadow-lg bg-card/95 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Índice de Potencial
              </p>
              <div className="text-4xl font-black text-primary mt-1">
                {mockOracle.potentialIndex}
              </div>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
              <Brain className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin-slow" />
            </div>
          </CardContent>
        </Card>

        {/* Prediction Chart */}
        <div className="space-y-2">
          <h3 className="font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gold" /> Projeção de Evolução
          </h3>
          <Card>
            <CardContent className="p-4 pt-6">
              <div className="h-[200px] w-full">
                <ChartContainer
                  config={{
                    score: { label: 'Pontuação', color: 'hsl(var(--primary))' },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockOracle.comparisonData}>
                      <XAxis
                        dataKey="subject"
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                      />
                      <YAxis hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="A"
                        fill="var(--color-score)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Skills */}
        <div className="space-y-2">
          <h3 className="font-bold flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-500" /> Habilidades Futuras
          </h3>
          <div className="grid gap-3">
            {mockOracle.futureSkills.map((skill) => (
              <Card key={skill.name} className="overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{skill.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Atual: {skill.current}
                      </span>
                      <span className="text-xs text-primary font-bold">
                        → Projeção: {skill.projected}
                      </span>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs">
                    +{skill.projected - skill.current}
                  </div>
                </div>
                <div className="h-1 bg-secondary w-full">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(skill.projected / 100) * 100}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-none text-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Sparkles className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gold">
                  Sugestão do Oráculo
                </h4>
                <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                  Para atingir seu potencial máximo como{' '}
                  {mockOracle.predictedPosition}, foque em melhorar sua visão de
                  jogo nos próximos 3 meses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
