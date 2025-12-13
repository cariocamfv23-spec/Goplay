import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Trophy,
  Crown,
  TrendingUp,
  Minus,
  TrendingDown,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockRankings } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export default function Ranking() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="bg-primary/5 p-6 pb-12 pt-16 text-center relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Trophy className="h-16 w-16 text-gold mx-auto mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold">Ranking Global</h1>
        <p className="text-muted-foreground">Temporada 2024</p>
      </div>

      <div className="bg-background rounded-t-3xl -mt-8 px-4 pt-6 pb-4 shadow-xl">
        <div className="space-y-4">
          {mockRankings.map((rank) => (
            <div
              key={rank.id}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02]',
                rank.position === 1
                  ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-gold/30'
                  : 'bg-card border-border/50',
              )}
            >
              <div className="font-bold text-lg text-muted-foreground w-6 text-center">
                {rank.position === 1 ? (
                  <Crown className="h-6 w-6 text-gold fill-gold" />
                ) : (
                  `#${rank.position}`
                )}
              </div>
              <Avatar
                className={cn(
                  'h-12 w-12 border-2',
                  rank.position === 1 ? 'border-gold' : 'border-transparent',
                )}
              >
                <AvatarImage src={rank.user.avatar} />
                <AvatarFallback>{rank.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold">{rank.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {rank.user.team || 'Atleta'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{rank.points}</p>
                <div className="flex items-center justify-end text-xs gap-1">
                  {rank.trend === 'up' && (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  )}
                  {rank.trend === 'down' && (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  {rank.trend === 'same' && (
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
