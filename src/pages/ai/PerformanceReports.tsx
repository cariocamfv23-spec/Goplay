import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  TrendingUp,
  Target,
  Brain,
  Download,
  Share2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { StatsRadarChart } from '@/components/StatsRadarChart'
import { StatsHistoryChart } from '@/components/StatsHistoryChart'
import { mockStatsHistory } from '@/lib/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const mockSkills = [
  { label: 'Velocidade', value: 85, max: 100, unit: '%' },
  { label: 'Força', value: 72, max: 100, unit: '%' },
  { label: 'Resistência', value: 90, max: 100, unit: '%' },
  { label: 'Técnica', value: 65, max: 100, unit: '%' },
  { label: 'Tática', value: 78, max: 100, unit: '%' },
  { label: 'Mental', value: 88, max: 100, unit: '%' },
]

export default function PerformanceReports() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Relatório de Performance</h1>
            <p className="text-xs text-muted-foreground">Atualizado hoje</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Download className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <span className="text-xs text-muted-foreground uppercase font-bold mb-1">
                Score Geral
              </span>
              <span className="text-4xl font-black text-primary">82</span>
              <Badge className="mt-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">
                +4.5% este mês
              </Badge>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border-border/50">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <span className="text-xs text-muted-foreground uppercase font-bold mb-1">
                Treinos
              </span>
              <span className="text-4xl font-black text-foreground">14</span>
              <span className="text-xs text-muted-foreground mt-2">
                Sessões concluídas
              </span>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="history">Evolução</TabsTrigger>
          </TabsList>

          <TabsContent
            value="skills"
            className="space-y-4 animate-in fade-in slide-in-from-bottom-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Radar de Competências
                </CardTitle>
                <CardDescription>
                  Análise comparativa das suas principais valências.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center -ml-4">
                  <StatsRadarChart stats={mockSkills} />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-green-500">
                    Pontos Fortes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    <span className="font-bold text-foreground">
                      Resistência:
                    </span>{' '}
                    Seu condicionamento está 15% acima da média para sua
                    categoria.
                  </p>
                  <p>
                    <span className="font-bold text-foreground">Mental:</span>{' '}
                    Excelente foco e consistência durante séries longas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-yellow-500">
                    A Desenvolver
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    <span className="font-bold text-foreground">Técnica:</span>{' '}
                    Detectamos instabilidade no joelho esquerdo em agachamentos.
                  </p>
                  <p>
                    <span className="font-bold text-foreground">Força:</span>{' '}
                    Potência de explosão pode ser melhorada com pliometria.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="history"
            className="space-y-4 animate-in fade-in slide-in-from-bottom-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Histórico de Performance
                </CardTitle>
                <CardDescription>
                  Evolução do seu score técnico nos últimos 6 meses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <StatsHistoryChart data={mockStatsHistory} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Insights do AI Coach
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/30 p-4 rounded-lg text-sm">
                  "Notei uma melhora significativa na sua consistência. Seus
                  últimos 3 treinos mantiveram uma intensidade constante.
                  Continue assim!"
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg text-sm">
                  "Sua recuperação entre séries está ótima. Considere aumentar a
                  carga em 5% na próxima sessão de força."
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
