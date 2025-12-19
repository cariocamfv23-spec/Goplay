import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RankingEntry, mockRankings, mockCurrentUser } from '@/lib/data'
import {
  Trophy,
  TrendingUp,
  Minus,
  TrendingDown,
  Crown,
  Star,
  Flame,
  Shield,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function RankingWidget() {
  const topRankings = mockRankings.filter((r) => r.position <= 3)
  const userRank = mockRankings.find((r) => r.user.id === mockCurrentUser.id)

  const isUserInTop = userRank && userRank.position <= 3

  return (
    <Card className="w-full bg-background/50 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold animate-pulse" />
            <span className="font-bold tracking-tight">Ranking Global</span>
          </div>
          <span className="text-xs font-normal text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full border border-border/30">
            Top Players
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* List */}
        <div className="divide-y divide-border/30">
          {topRankings.map((rank) => (
            <RankingItem key={rank.id} rank={rank} />
          ))}
        </div>

        {/* User Rank Sticky Section - Only show if user exists and is not in top 3 */}
        {userRank && !isUserInTop && (
          <div className="relative">
            <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            <div className="bg-primary/5 border-t border-primary/10 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50" />
              <RankingItem rank={userRank} isMe />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RankingItem({
  rank,
  isMe = false,
}: {
  rank: RankingEntry
  isMe?: boolean
}) {
  const isFirst = rank.position === 1
  const achievement = rank.specialAchievement

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

  const AchievementIcon = achievement
    ? getAchievementIcon(achievement.type)
    : null

  return (
    <div
      className={cn(
        'flex items-center gap-4 px-5 py-3 transition-colors hover:bg-secondary/30',
        isMe && 'bg-primary/5 hover:bg-primary/10',
      )}
    >
      <div className="flex-shrink-0 w-8 text-center font-bold text-sm text-muted-foreground">
        {isFirst ? (
          <Crown className="w-5 h-5 text-gold fill-gold mx-auto drop-shadow-sm" />
        ) : (
          <span
            className={cn(
              rank.position <= 3 && 'text-foreground font-extrabold',
            )}
          >
            #{rank.position}
          </span>
        )}
      </div>

      <div className="relative">
        <Avatar
          className={cn(
            'h-10 w-10 border-2',
            isFirst ? 'border-gold' : 'border-border/50',
          )}
        >
          <AvatarImage src={rank.user.avatar} />
          <AvatarFallback>{rank.user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        {isFirst && (
          <div className="absolute -bottom-1 -right-1 bg-gold text-[10px] font-bold px-1 rounded-full text-black shadow-sm">
            1st
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p
            className={cn(
              'font-semibold text-sm truncate',
              isMe && 'text-primary',
            )}
          >
            {isMe ? 'Você' : rank.user.name}
          </p>
          {achievement && AchievementIcon && (
            <Tooltip>
              <TooltipTrigger>
                <AchievementIcon
                  className={cn(
                    'w-3 h-3',
                    getAchievementColor(achievement.type),
                  )}
                />
              </TooltipTrigger>
              <TooltipContent className="text-xs">
                {achievement.label}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {rank.user.team || 'Atleta'}
        </p>
      </div>

      <div className="text-right flex flex-col items-end">
        <span className="font-bold text-sm tabular-nums">{rank.points}</span>
        <div className="flex items-center text-[10px] gap-1">
          {rank.trend === 'up' && (
            <>
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-500 font-medium">Subiu</span>
            </>
          )}
          {rank.trend === 'down' && (
            <>
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-red-500 font-medium">Caiu</span>
            </>
          )}
          {rank.trend === 'same' && (
            <>
              <Minus className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">Igual</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
