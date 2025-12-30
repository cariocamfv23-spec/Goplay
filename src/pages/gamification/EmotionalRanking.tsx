import { mockPsychologicalRankings, mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  Brain,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Medal,
  Crown,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export default function EmotionalRanking() {
  const sortedRankings = [...mockPsychologicalRankings].sort(
    (a, b) => b.totalScore - a.totalScore,
  )

  const myRank = sortedRankings.find((r) => r.user.id === mockCurrentUser.id)

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-full">
            <Brain className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">
              Ranking Emocional
            </h3>
            <p className="text-xs text-muted-foreground">
              Inteligência Emocional & Resiliência
            </p>
          </div>
        </div>
        {myRank && (
          <div className="text-right">
            <p className="text-2xl font-black text-purple-500 leading-none">
              #{myRank.position}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground uppercase">
              Sua Posição
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3 pb-8">
        {sortedRankings.map((rank) => {
          const isMe = rank.user.id === mockCurrentUser.id
          const isTop3 = rank.position <= 3

          return (
            <div
              key={rank.id}
              className={cn(
                'relative flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-300 group',
                isTop3
                  ? 'bg-gradient-to-r from-card to-background border-border/60 shadow-sm'
                  : 'bg-card border-border/30 hover:border-border/60',
                isMe &&
                  'bg-purple-500/5 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.1)] scale-[1.01] z-10',
              )}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'flex flex-col items-center justify-center w-8 shrink-0',
                    isTop3 ? 'scale-110' : '',
                  )}
                >
                  {rank.position === 1 ? (
                    <Crown className="h-7 w-7 text-yellow-500 fill-yellow-500" />
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
                      isMe
                        ? 'border-purple-500 ring-2 ring-purple-500/20'
                        : 'border-transparent bg-muted',
                    )}
                  >
                    <AvatarImage
                      src={rank.user.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback>{rank.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {isMe && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        'font-bold text-sm truncate leading-tight',
                        isMe && 'text-purple-600',
                      )}
                    >
                      {isMe ? 'Você' : rank.user.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                    {rank.user.team || 'Atleta Independente'}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end">
                  <Badge
                    className={cn(
                      'text-xs font-bold px-2 py-0.5',
                      isMe
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : 'bg-primary hover:bg-primary/90',
                    )}
                  >
                    {rank.totalScore.toFixed(1)}
                  </Badge>

                  <div className="flex items-center gap-1 mt-1">
                    {rank.trend === 'up' && (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    )}
                    {rank.trend === 'down' && (
                      <TrendingDown className="h-3 w-3 text-rose-500" />
                    )}
                    {rank.trend === 'same' && (
                      <Minus className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bars Section */}
              <div className="grid grid-cols-2 gap-4 mt-1 px-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-wide text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Brain className="w-3 h-3 text-purple-500" /> EQ
                    </span>
                    <span className="text-purple-600">{rank.eqScore}</span>
                  </div>
                  <Progress
                    value={rank.eqScore}
                    className="h-1.5 bg-purple-100 dark:bg-purple-900/20"
                    indicatorClassName="bg-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-wide text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-orange-500" /> Resiliência
                    </span>
                    <span className="text-orange-600">
                      {rank.resilienceScore}
                    </span>
                  </div>
                  <Progress
                    value={rank.resilienceScore}
                    className="h-1.5 bg-orange-100 dark:bg-orange-900/20"
                    indicatorClassName="bg-orange-500"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
