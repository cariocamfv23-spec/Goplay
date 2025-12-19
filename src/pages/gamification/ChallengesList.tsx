import { useState } from 'react'
import { mockChallenges, Challenge } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Trophy, Users, ChevronRight, Gift } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ChallengesListProps {
  onSelectChallenge: (id: string) => void
}

export default function ChallengesList({
  onSelectChallenge,
}: ChallengesListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>(
    'all',
  )

  const filteredChallenges = mockChallenges.filter(
    (c) => filter === 'all' || c.status === filter,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
      case 'upcoming':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      case 'ended':
        return 'text-muted-foreground bg-muted border-muted-foreground/20'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Em Andamento'
      case 'upcoming':
        return 'Em Breve'
      case 'ended':
        return 'Encerrado'
      default:
        return status
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'active', 'upcoming', 'ended'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f as any)}
            className="rounded-full h-8 text-xs font-medium capitalize"
          >
            {f === 'all'
              ? 'Todos'
              : f === 'active'
                ? 'Ativos'
                : f === 'upcoming'
                  ? 'Breve'
                  : 'Fim'}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredChallenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="overflow-hidden border-border/50 hover:border-primary/30 transition-all cursor-pointer group active:scale-[0.99]"
            onClick={() => onSelectChallenge(challenge.id)}
          >
            <div className="relative h-32 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src={challenge.banner}
                alt={challenge.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-3 left-3 z-20">
                <Badge
                  className={cn(
                    'mb-2 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                    getStatusColor(challenge.status),
                  )}
                >
                  {getStatusLabel(challenge.status)}
                </Badge>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {challenge.title}
                </h3>
              </div>
            </div>
            <CardContent className="p-4 space-y-4 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>
                    {challenge.status === 'active'
                      ? 'Termina em '
                      : 'Inicia em '}
                    {formatDistanceToNow(
                      new Date(
                        challenge.status === 'upcoming'
                          ? challenge.startDate
                          : challenge.endDate,
                      ),
                      { locale: ptBR },
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span>{challenge.participants} inscritos</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {challenge.description}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-gold/10 p-1.5 rounded-full">
                    <Gift className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-xs font-medium text-gold/90 truncate max-w-[150px]">
                    {challenge.rewards[0]}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs hover:bg-primary/10 hover:text-primary gap-1 pl-2 pr-1"
                >
                  Ver Ranking
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12 px-4 rounded-xl border border-dashed border-border/50 bg-muted/20">
            <Trophy className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-medium">
              Nenhum desafio encontrado com este filtro.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
