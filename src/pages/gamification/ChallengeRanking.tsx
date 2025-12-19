import { useState, useMemo } from 'react'
import { Challenge, mockCurrentUser } from '@/lib/data'
import { getChallengeRankings } from '@/lib/ranking-utils'
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
  Calendar,
  Info,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ChallengeRankingProps {
  challenge: Challenge
  onBack: () => void
}

export default function ChallengeRanking({
  challenge,
  onBack,
}: ChallengeRankingProps) {
  const rankings = useMemo(() => {
    return getChallengeRankings(challenge.id)
  }, [challenge.id])

  const myRank = rankings.find((r) => r.user.id === mockCurrentUser.id)

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
    <div className="flex flex-col animate-in slide-in-from-right-4 fade-in duration-500">
      <div className="relative h-48 -mx-4 -mt-4 mb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
        <img
          src={challenge.banner}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="secondary"
            size="icon"
            onClick={onBack}
            className="rounded-full bg-black/30 text-white hover:bg-black/50 border border-white/10 backdrop-blur-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="flex justify-between items-end">
            <div>
              <Badge className="mb-2 bg-primary/80 backdrop-blur-md border-primary/20 hover:bg-primary">
                {challenge.metricLabel}
              </Badge>
              <h1 className="text-2xl font-bold text-white leading-tight drop-shadow-md">
                {challenge.title}
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
                >
                  <Info className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{challenge.title}</DialogTitle>
                  <DialogDescription>Detalhes do Desafio</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Período
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(challenge.startDate), "dd 'de' MMMM", {
                        locale: ptBR,
                      })}{' '}
                      até{' '}
                      {format(new Date(challenge.endDate), "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Regras</h4>
                    <p className="text-sm text-muted-foreground">
                      {challenge.rules}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Recompensas</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {challenge.rewards.map((reward, i) => (
                        <li key={i}>{reward}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {myRank && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src={mockCurrentUser.avatar} />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-primary">Sua Posição</p>
              <p className="text-xs text-muted-foreground">
                {mockCurrentUser.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-primary leading-none">
              #{myRank.position}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground uppercase">
              {myRank.points} {challenge.metricLabel}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3 pb-8">
        {rankings.map((rank) => {
          const isMe = rank.user.id === mockCurrentUser.id
          const isTop3 = rank.position <= 3
          const achievement = rank.specialAchievement
          const achievementStyle = achievement
            ? getAchievementBg(achievement.type)
            : ''
          const Icon = achievement ? getAchievementIcon(achievement.type) : null

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
                  <span className="text-[10px] font-normal text-muted-foreground ml-1 lowercase">
                    {challenge.metricLabel}
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
      </div>
    </div>
  )
}
