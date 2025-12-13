import { mockRankings } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal } from 'lucide-react'

export default function Ranking() {
  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="bg-gradient-to-b from-primary/20 to-background p-6 pt-10 text-center">
        <Trophy className="h-16 w-16 mx-auto text-gold mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold mb-2">Ranking Global</h1>
        <p className="text-muted-foreground text-sm">Temporada 2024</p>
      </div>

      <div className="p-4 -mt-6">
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          {mockRankings.map((rank, index) => {
            let medalColor = 'text-muted-foreground'
            if (index === 0) medalColor = 'text-yellow-500'
            if (index === 1) medalColor = 'text-gray-400'
            if (index === 2) medalColor = 'text-amber-700'

            return (
              <div
                key={rank.id}
                className="flex items-center p-4 border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors"
              >
                <div
                  className={`w-8 font-bold text-lg text-center ${medalColor}`}
                >
                  {index < 3 ? (
                    <Medal className="h-6 w-6 mx-auto" />
                  ) : (
                    rank.position
                  )}
                </div>
                <Avatar className="h-10 w-10 mx-3 border border-border">
                  <AvatarImage src={rank.user.avatar} />
                  <AvatarFallback>{rank.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{rank.user.name}</h3>
                  <Badge variant="secondary" className="text-[10px] h-4 px-1">
                    {rank.league}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="font-bold block text-sm">
                    {rank.points.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">pts</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
