import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Zap,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockRetrospectiveHistory, RetrospectiveYear } from '@/lib/data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { EvolutionChart } from '@/components/EvolutionChart'

export default function EvolutionMode() {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState<string>(
    mockRetrospectiveHistory[0].year.toString(),
  )

  const currentData = mockRetrospectiveHistory.find(
    (h) => h.year.toString() === selectedYear,
  ) as RetrospectiveYear

  const previousData = mockRetrospectiveHistory.find(
    (h) => h.year === parseInt(selectedYear) - 1,
  )

  const calculateGrowth = (current: number, previous?: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }

  const renderTrend = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
    return <Minus className="w-4 h-4 text-gray-500 mr-1" />
  }

  const renderTrendBadge = (growth: number) => {
    const color =
      growth > 0
        ? 'text-green-600 bg-green-100 dark:bg-green-900/30'
        : growth < 0
          ? 'text-red-600 bg-red-100 dark:bg-red-900/30'
          : 'text-gray-600 bg-gray-100 dark:bg-gray-800'

    return (
      <div
        className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${color}`}
      >
        {renderTrend(growth)}
        {Math.abs(growth).toFixed(0)}%
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold text-xl">Painel de Evolução</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Year Selector */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Ano de Referência
          </span>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {mockRetrospectiveHistory.map((h) => (
                <SelectItem key={h.year} value={h.year.toString()}>
                  {h.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground uppercase font-bold">
                Partidas
              </span>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-black">
                  {currentData.stats.matches}
                </span>
                {previousData &&
                  renderTrendBadge(
                    calculateGrowth(
                      currentData.stats.matches,
                      previousData.stats.matches,
                    ),
                  )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground uppercase font-bold">
                Rating Médio
              </span>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-black">
                  {currentData.stats.rating}
                </span>
                {previousData &&
                  renderTrendBadge(
                    calculateGrowth(
                      currentData.stats.rating,
                      previousData.stats.rating,
                    ),
                  )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground uppercase font-bold">
                Gols
              </span>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-black">
                  {currentData.stats.goals}
                </span>
                {previousData &&
                  renderTrendBadge(
                    calculateGrowth(
                      currentData.stats.goals,
                      previousData.stats.goals,
                    ),
                  )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground uppercase font-bold">
                Assistências
              </span>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-black">
                  {currentData.stats.assists}
                </span>
                {previousData &&
                  renderTrendBadge(
                    calculateGrowth(
                      currentData.stats.assists,
                      previousData.stats.assists,
                    ),
                  )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Comparativo Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EvolutionChart data={mockRetrospectiveHistory} />
          </CardContent>
        </Card>

        {/* Motivation Card */}
        <Card className="bg-gradient-to-r from-primary to-purple-800 text-white border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-gold fill-current" />
            <h3 className="font-bold text-lg">
              {previousData ? 'Evolução Constante!' : 'Começando Forte!'}
            </h3>
            <p className="text-sm opacity-90 mb-4 mt-1">
              {previousData
                ? `Você melhorou em ${Object.keys(currentData.stats).filter((k) => (currentData.stats as any)[k] > (previousData.stats as any)[k]).length} métricas comparado ao ano anterior.`
                : 'Este é o início da sua jornada histórica. Continue assim para ver sua evolução ano que vem!'}
            </p>
            <Button
              variant="secondary"
              className="w-full text-primary font-bold shadow-md"
              onClick={() => navigate('/retrospective')}
            >
              Ver Retrospectiva Completa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
