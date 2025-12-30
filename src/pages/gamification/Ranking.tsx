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
  Flame,
  Shield,
  Star,
  Zap,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { mockCurrentUser, mockChallenges } from '@/lib/data'
import { getRankings } from '@/lib/ranking-utils'
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import ChallengesList from './ChallengesList'
import ChallengeRanking from './ChallengeRanking'
import EmotionalRanking from './EmotionalRanking'

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'all_time'
type MetricType = 'points' | 'matches' | 'wins' | 'assists'
type ViewMode = 'global' | 'challenges' | 'emotional'

export default function Ranking() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTab = (searchParams.get('tab') as TimeRange) || 'weekly'
  const initialMode =
    (searchParams.get('mode') as ViewMode) ||
    (searchParams.get('challengeId') ? 'challenges' : 'global')

  const [timeRange, setTimeRange] = useState<TimeRange>(initialTab)
  const [metric, setMetric] = useState<MetricType>('points')
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode)
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    searchParams.get('challengeId') || null,
  )

  // Use the shared deterministic logic for Global Ranking
  const rankings = useMemo(() => {
    return getRankings(timeRange, metric)
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

  const myRank = rankings.find((r) => r.user.id === mockCurrentUser.id)

  const handleChallengeSelect = (id: string) => {
    setSelectedChallengeId(id)
    setSearchParams({ mode: 'challenges', challengeId: id })
  }

  const handleBackToChallenges = () => {
    setSelectedChallengeId(null)
    setSearchParams({ mode: 'challenges' })
  }

  const handleModeChange = (mode: string) => {
    setViewMode(mode as ViewMode)
    if (mode === 'global' || mode === 'emotional') {
      setSelectedChallengeId(null)
      setSearchParams({ tab: timeRange, mode })
    } else {
      setSearchParams({ mode: 'challenges' })
    }
  }

  const selectedChallenge = mockChallenges.find(
    (c) => c.id === selectedChallengeId,
  )

  // Sub-components helpers for Global Ranking Item
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'mvp':
        return Star
      case 'streak':
        return Flame
      case 'veteran':
        return Shield
      case 'rising_star':
        return Zap
      default:
        return Star
    }
  }

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'mvp':
        return 'text-yellow-500'
      case 'streak':
        return 'text-orange-500'
      case 'veteran':
        return 'text-blue-500'
      case 'rising_star':
        return 'text-purple-500'
      default:
        return 'text-primary'
    }
  }

  const getAchievementBg = (type: string) => {
    switch (type) {
      case 'mvp':
        return 'bg-yellow-500/10 border-yellow-500/30'
      case 'streak':
        return 'bg-orange-500/10 border-orange-500/30'
      case 'veteran':
        return 'bg-blue-500/10 border-blue-500/30'
      case 'rising_star':
        return 'bg-purple-500/10 border-purple-500/30'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in flex flex-col">
      {/* Header Section */}
      <div className="bg-primary/5 pb-6 pt-6 px-4 relative z-10">
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
            <h1 className="text-xl font-bold">Ranking</h1>
            <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
              Temporada 2024
            </p>
          </div>
          <div className="w-10" />
        </div>

        {/* View Mode Toggle */}
        <div className="bg-background/60 p-1 rounded-xl backdrop-blur-md shadow-sm border border-white/20 dark:border-white/5 mb-4">
          <Tabs
            value={viewMode}
            onValueChange={handleModeChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 h-10 bg-transparent p-0 gap-1">
              <TabsTrigger
                value="global"
                className="text-sm font-medium h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Global
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className="text-sm font-medium h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Desafios
              </TabsTrigger>
              <TabsTrigger
                value="emotional"
                className="text-sm font-medium h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Emocional
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {viewMode === 'global' && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Period Tabs */}
            <div className="bg-background/60 p-1 rounded-xl backdrop-blur-md shadow-sm border border-white/20 dark:border-white/5">
              <Tabs
                value={timeRange}
                onValueChange={(v) => {
                  setTimeRange(v as TimeRange)
                  setSearchParams({ tab: v as string, mode: 'global' })
                }}
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
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-background rounded-t-[2rem] -mt-6 px-4 pt-8 pb-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-20 overflow-visible min-h-[500px]">
        {viewMode === 'challenges' ? (
          selectedChallenge ? (
            <ChallengeRanking
              challenge={selectedChallenge}
              onBack={handleBackToChallenges}
            />
          ) : (
            <ChallengesList onSelectChallenge={handleChallengeSelect} />
          )
        ) : viewMode === 'emotional' ? (
          <EmotionalRanking />
        ) : (
          /* Global Ranking List */
          <div className="space-y-3">
            {rankings.map((rank) => {
              const isMe = rank.user.id === mockCurrentUser.id
              const isTop3 = rank.position <= 3
              const achievement = rank.specialAchievement

              const achievementStyle = achievement
                ? getAchievementBg(achievement.type)
                : ''
              const Icon = achievement
                ? getAchievementIcon(achievement.type)
                : null

              return (
                <div
                  key={rank.id}
                  className={cn(
                    'relative flex items-center gap-4 p-3 pr-4 rounded-2xl border transition-all duration-300 group',
                    isTop3
                      ? 'bg-gradient-to-r from-card to-background border-border/60 shadow-sm'
                      : 'bg-card border-border/30 hover:border-border/60',
                    isMe &&
                      'bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.1)] scale-[1.02] z-10',
                    achievement && !isMe && achievementStyle,
                    achievement &&
                      isMe &&
                      'ring-1 ring-offset-1 ring-offset-background ring-primary/50',
                  )}
                >
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center w-8 shrink-0',
                      isTop3 ? 'scale-110' : '',
                    )}
                  >
                    {rank.position === 1 ? (
                      <Crown className="h-7 w-7 text-yellow-500 fill-yellow-500 animate-[bounce_2s_infinite]" />
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
                        achievement &&
                          !isMe &&
                          !isTop3 &&
                          cn(
                            'border-opacity-50',
                            getAchievementColor(achievement.type).replace(
                              'text-',
                              'border-',
                            ),
                          ),
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
                    {achievement && (
                      <div
                        className={cn(
                          'absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm bg-background',
                          getAchievementColor(achievement.type),
                        )}
                      >
                        {Icon && <Icon className="w-3 h-3 fill-current" />}
                      </div>
                    )}
                  </div>

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

                      {achievement && Icon && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                'cursor-help p-0.5 rounded-full hover:bg-muted transition-colors',
                                getAchievementColor(achievement.type),
                              )}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="text-xs bg-popover text-popover-foreground"
                          >
                            <p className="font-semibold">{achievement.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                      {rank.user.team || 'Atleta Independente'}
                    </p>
                  </div>

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
        )}
      </div>
    </div>
  )
}
