import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Crown,
  TrendingUp,
  Minus,
  TrendingDown,
  Trophy,
  Medal,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockRankings, mockCurrentUser, type RankingEntry } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'all_time'
type MetricType = 'points' | 'matches' | 'wins' | 'assists'

export default function Ranking() {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly')
  const [metric, setMetric] = useState<MetricType>('points')

  const rankings = useMemo(() => {
    // Generate some extra dummy users to flesh out the list for demonstration
    const extraUsers: RankingEntry[] = Array.from({ length: 20 }).map(
      (_, i) => ({
        id: `dummy_${i}`,
        position: 0, // placeholder, will be recalculated
        points: 1500 - i * 60 + Math.floor(Math.random() * 200),
        trend:
          Math.random() > 0.6
            ? 'up'
            : Math.random() > 0.3
              ? 'down'
              : ('same' as 'up' | 'down' | 'same'),
        user: {
          id: `u_dummy_${i}`,
          name: `Atleta ${['Alpha', 'Beta', 'Gama', 'Delta', 'Sigma'][i % 5]} ${i + 1}`,
          avatar: `https://img.usecurling.com/ppl/medium?gender=${i % 2 === 0 ? 'male' : 'female'}&seed=${i + 200}`,
          team: ['Red Wolves', 'Blue Sharks', 'Green Eagles', 'Iron Team'][
            i % 4
          ],
        },
      }),
    )

    // Combine original mock data with extra users
    // Filter out potential ID collisions
    const allEntries = [...mockRankings, ...extraUsers].filter(
      (v, i, a) => a.findIndex((t) => t.user.id === v.user.id) === i,
    )

    // Apply modifiers based on filters to simulate API response
    const seed = timeRange.length + metric.length

    const processedData = allEntries.map((entry) => {
      let baseValue = entry.points

      // Simulate different metrics scaling
      if (metric === 'wins') baseValue = Math.floor(baseValue / 20)
      else if (metric === 'matches') baseValue = Math.floor(baseValue / 15)
      else if (metric === 'assists') baseValue = Math.floor(baseValue / 40)

      // Simulate different time ranges scaling
      if (timeRange === 'daily') baseValue = Math.floor(baseValue / 30)
      else if (timeRange === 'weekly') baseValue = Math.floor(baseValue / 4)
      else if (timeRange === 'monthly') baseValue = Math.floor(baseValue / 1.5)

      // Add randomization to shuffle positions based on user ID and current filters
      const userFactor = entry.user.id.charCodeAt(entry.user.id.length - 1)
      const randomVariance = ((userFactor * seed) % 50) - 25

      // Ensure non-negative
      const finalValue = Math.max(0, baseValue + randomVariance)

      return {
        ...entry,
        points: finalValue,
      }
    })

    // Sort descending by value
    processedData.sort((a, b) => b.points - a.points)

    // Assign new positions
    return processedData.map((entry, index) => ({
      ...entry,
      position: index + 1,
    }))
  }, [timeRange, metric])

  const getMetricUnit = () => {
    switch (metric) {
      case 'points':
        return 'pts'
      case 'matches':
        return 'jogos'
      case 'wins':
        return 'vits'
      case 'assists':
        return 'asts'
      default:
        return 'pts'
    }
  }

  // Find my current stats in the filtered list
  const myRank = rankings.find((r) => r.user.id === mockCurrentUser.id)

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in flex flex-col">
      {/* Header Section */}
      <div className="bg-primary/5 pb-8 pt-6 px-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-primary/10 -ml-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold">Ranking Global</h1>
            <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
              Temporada 2024
            </p>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <div className="flex flex-col gap-4">
          {/* Period Tabs */}
          <div className="bg-background/60 p-1 rounded-xl backdrop-blur-md shadow-sm border border-white/20 dark:border-white/5">
            <Tabs
              value={timeRange}
              onValueChange={(v) => setTimeRange(v as TimeRange)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 h-9 bg-transparent p-0 gap-1">
                <TabsTrigger
                  value="daily"
                  className="text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Dia
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Semana
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Mês
                </TabsTrigger>
                <TabsTrigger
                  value="all_time"
                  className="text-xs h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Geral
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Metric Selector & My Position Summary */}
          <div className="flex gap-3">
            <div className="flex-1 bg-background/60 rounded-xl p-3 backdrop-blur-md border border-white/20 dark:border-white/5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-semibold">Métrica</span>
              </div>
              <Select
                value={metric}
                onValueChange={(v) => setMetric(v as MetricType)}
              >
                <SelectTrigger className="w-[120px] h-7 text-xs bg-white/50 dark:bg-black/20 border-0 focus:ring-0 px-2 py-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">Pontos</SelectItem>
                  <SelectItem value="wins">Vitórias</SelectItem>
                  <SelectItem value="matches">Partidas</SelectItem>
                  <SelectItem value="assists">Assistências</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* My Rank Mini Card */}
            <div className="flex-none bg-primary text-primary-foreground rounded-xl px-4 py-2 flex flex-col items-center justify-center shadow-md min-w-[80px]">
              <span className="text-[10px] opacity-80 uppercase font-bold">
                Você
              </span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold">
                  #{myRank?.position || '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking List */}
      <div className="flex-1 bg-background rounded-t-[2rem] -mt-6 px-4 pt-8 pb-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-20 overflow-visible">
        <div className="space-y-3">
          {rankings.map((rank) => {
            const isMe = rank.user.id === mockCurrentUser.id
            const isTop3 = rank.position <= 3

            return (
              <div
                key={rank.id}
                className={cn(
                  'relative flex items-center gap-4 p-3 pr-4 rounded-2xl border transition-all duration-300 group',
                  isTop3
                    ? 'bg-gradient-to-r from-card to-background border-border/60 shadow-sm'
                    : 'bg-card border-border/30 hover:border-border/60',
                  isMe &&
                    'bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.1)] scale-[1.02]',
                )}
              >
                {/* Position Badge */}
                <div
                  className={cn(
                    'flex flex-col items-center justify-center w-8 shrink-0',
                    isTop3 ? 'scale-110' : '',
                  )}
                >
                  {rank.position === 1 ? (
                    <Crown className="h-7 w-7 text-yellow-500 fill-yellow-500 animate-bounce duration-[2000ms]" />
                  ) : rank.position === 2 ? (
                    <div className="relative">
                      <Medal className="h-6 w-6 text-slate-400 fill-slate-200" />
                      <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-slate-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                        2
                      </span>
                    </div>
                  ) : rank.position === 3 ? (
                    <div className="relative">
                      <Medal className="h-6 w-6 text-orange-700 fill-orange-300" />
                      <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-orange-800 text-white w-4 h-4 flex items-center justify-center rounded-full">
                        3
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-muted-foreground/60">
                      #{rank.position}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="relative">
                  <Avatar
                    className={cn(
                      'h-12 w-12 border-2 transition-transform group-hover:scale-105',
                      rank.position === 1
                        ? 'border-yellow-500 ring-2 ring-yellow-500/20'
                        : rank.position === 2
                          ? 'border-slate-400'
                          : rank.position === 3
                            ? 'border-orange-700'
                            : 'border-transparent bg-muted',
                      isMe && 'border-primary ring-2 ring-primary/20',
                    )}
                  >
                    <AvatarImage
                      src={rank.user.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback>{rank.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {isMe && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        'font-bold text-sm truncate leading-tight',
                        isMe && 'text-primary',
                      )}
                    >
                      {isMe ? 'Você' : rank.user.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                    {rank.user.team || 'Atleta Independente'}
                  </p>
                </div>

                {/* Points & Trend */}
                <div className="text-right flex flex-col items-end">
                  <p
                    className={cn(
                      'font-bold text-lg leading-none',
                      isMe ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {rank.points}
                    <span className="text-[10px] font-normal text-muted-foreground ml-1">
                      {getMetricUnit()}
                    </span>
                  </p>

                  <div className="flex items-center gap-1 mt-1 bg-muted/50 px-1.5 py-0.5 rounded-full">
                    {rank.trend === 'up' && (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    )}
                    {rank.trend === 'down' && (
                      <TrendingDown className="h-3 w-3 text-rose-500" />
                    )}
                    {rank.trend === 'same' && (
                      <Minus className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        'text-[10px] font-medium',
                        rank.trend === 'up'
                          ? 'text-emerald-600'
                          : rank.trend === 'down'
                            ? 'text-rose-600'
                            : 'text-muted-foreground',
                      )}
                    >
                      {rank.trend === 'up'
                        ? 'Subiu'
                        : rank.trend === 'down'
                          ? 'Caiu'
                          : '-'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          {rankings.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum dado encontrado para este filtro.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
