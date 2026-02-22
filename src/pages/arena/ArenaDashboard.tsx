import { useNavigate } from 'react-router-dom'
import { useArenaStore } from '@/stores/useArenaStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Plus, Clock, Trophy, Target } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export default function ArenaDashboard() {
  const navigate = useNavigate()
  const { challenges } = useArenaStore()

  const activeChallenges = challenges.filter((c) => c.status === 'active')
  const endedChallenges = challenges.filter((c) => c.status === 'ended')

  const renderChallenge = (challenge: any) => {
    const isEnded = challenge.status === 'ended'

    return (
      <Card
        key={challenge.id}
        className={cn(
          'overflow-hidden cursor-pointer group mb-4 transition-all hover:border-gold/50 shadow-sm hover:shadow-md',
          isEnded ? 'opacity-80 grayscale-[20%]' : '',
        )}
        onClick={() => navigate(`/arena/${challenge.id}`)}
      >
        <div className="relative h-32 w-full">
          <img
            src={challenge.banner}
            alt={challenge.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <Badge
                className={cn(
                  'mb-1.5 text-[10px] font-bold uppercase tracking-widest border-none',
                  isEnded
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-gold/90 text-black',
                )}
              >
                {challenge.type}
              </Badge>
              <h3 className="text-white font-bold leading-tight line-clamp-1">
                {challenge.title}
              </h3>
            </div>
            {isEnded ? (
              <Badge className="bg-black/60 text-white border-white/20 backdrop-blur-sm">
                Finalizado
              </Badge>
            ) : (
              <div className="flex items-center gap-1 text-[10px] text-white/90 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                <Clock className="w-3 h-3 text-gold" />
                {formatDistanceToNow(new Date(challenge.endDate), {
                  locale: ptBR,
                })}
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-3 bg-card/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5" /> IA Avaliada
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> Ranking + Pontos
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in relative">
      <div className="bg-zinc-950 p-6 text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-60" />
        <Shield className="w-12 h-12 text-gold mx-auto mb-3 relative z-10" />
        <h1 className="text-2xl font-black text-white italic tracking-tighter drop-shadow-md relative z-10">
          GOPLAY REALITY ARENA™
        </h1>
        <p className="text-sm text-zinc-400 mt-1 relative z-10">
          O campo de provas digital da nova geração.
        </p>
      </div>

      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50 h-11">
            <TabsTrigger
              value="active"
              className="text-xs font-bold data-[state=active]:bg-background"
            >
              Em Andamento
            </TabsTrigger>
            <TabsTrigger
              value="ended"
              className="text-xs font-bold data-[state=active]:bg-background"
            >
              Encerrados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0">
            {activeChallenges.length > 0 ? (
              activeChallenges.map(renderChallenge)
            ) : (
              <div className="text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                Nenhum desafio ativo.
              </div>
            )}
          </TabsContent>

          <TabsContent value="ended" className="mt-0">
            {endedChallenges.length > 0 ? (
              endedChallenges.map(renderChallenge)
            ) : (
              <div className="text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                Nenhum desafio encerrado.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Button
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-gold hover:bg-gold/90 text-black border border-gold/50 animate-in zoom-in"
        onClick={() => navigate('/arena/create')}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
