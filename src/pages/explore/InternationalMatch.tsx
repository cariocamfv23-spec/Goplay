import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Globe,
  MessageCircle,
  Swords,
  Trophy,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockInternationalMatches, mockInternationalRanking } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export default function InternationalMatch() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 flex items-center gap-4 border-b bg-background/95 backdrop-blur sticky top-0 z-20">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold text-xl flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" /> Match Internacional
        </h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-sm text-blue-700 dark:text-blue-300">
          Conecte-se com atletas ao redor do mundo para desafios amistosos e
          veja sua posição no ranking global.
        </div>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="matches">Encontrar Oponentes</TabsTrigger>
            <TabsTrigger value="ranking">Ranking Global</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4 animate-in fade-in">
            {mockInternationalMatches.map((match) => (
              <Card key={match.id} className="overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
                  <div className="absolute top-2 right-2">
                    <img
                      src={match.flag}
                      alt={match.country}
                      className="w-8 h-6 object-cover rounded shadow-md border border-white/20"
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant={
                        match.status === 'online' ? 'default' : 'secondary'
                      }
                      className={cn(
                        'text-[10px] uppercase font-bold tracking-wider',
                        match.status === 'online'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-500/50 text-white',
                      )}
                    >
                      {match.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-0 relative">
                  <div className="flex justify-between items-end -mt-10 mb-4">
                    <Avatar className="h-20 w-20 border-4 border-background">
                      <AvatarImage src={match.avatar} />
                      <AvatarFallback>{match.opponentName[0]}</AvatarFallback>
                    </Avatar>
                    <Badge className="mb-2 bg-gold text-black hover:bg-gold/90">
                      {match.level}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold text-lg">{match.opponentName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {match.country}
                      <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50 mx-1" />
                      {match.rating} ★
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <Swords className="h-4 w-4" /> Desafiar
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <MessageCircle className="h-4 w-4" /> Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ranking" className="space-y-4 animate-in fade-in">
            <div className="bg-gradient-to-br from-gold/20 to-yellow-500/5 p-6 rounded-2xl border border-gold/30 text-center mb-6">
              <Trophy className="h-12 w-12 text-gold mx-auto mb-2 drop-shadow-md" />
              <h2 className="text-xl font-bold text-foreground">
                Ranking Mundial
              </h2>
              <p className="text-sm text-muted-foreground">
                Os melhores atletas da temporada internacional
              </p>
            </div>

            <div className="space-y-3">
              {mockInternationalRanking.map((rank) => (
                <div
                  key={rank.id}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] bg-card',
                    rank.position === 1
                      ? 'border-gold/50 shadow-md shadow-gold/5'
                      : 'border-border/50',
                  )}
                >
                  <div className="font-bold text-lg text-muted-foreground w-8 text-center flex items-center justify-center">
                    {rank.position === 1 ? (
                      <Crown className="h-6 w-6 text-gold fill-gold" />
                    ) : (
                      `#${rank.position}`
                    )}
                  </div>
                  <div className="relative">
                    <Avatar
                      className={cn(
                        'h-12 w-12 border-2',
                        rank.position === 1
                          ? 'border-gold'
                          : 'border-transparent',
                      )}
                    >
                      <AvatarImage src={rank.avatar} />
                      <AvatarFallback>{rank.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1">
                      <img
                        src={rank.flag}
                        alt={rank.country}
                        className="w-5 h-3.5 object-cover rounded shadow-sm border border-white/50"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{rank.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {rank.country}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
