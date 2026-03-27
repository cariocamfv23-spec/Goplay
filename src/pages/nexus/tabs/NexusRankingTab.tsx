import { useState, useMemo } from 'react'
import { useNexusStore } from '@/stores/useNexusStore'
import { useNavigate } from 'react-router-dom'
import { Trophy, Flame, Calendar, Medal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function NexusRankingTab() {
  const { tribes } = useNexusStore()
  const navigate = useNavigate()
  const [metric, setMetric] = useState<'active' | 'events'>('active')

  const rankedTribes = useMemo(() => {
    return tribes
      .map((t) => {
        const mockEvents = (t.events?.length || 0) + (t.name.length % 5)
        const engagement =
          t.members.length * 15 +
          mockEvents * 20 +
          (t.id.charCodeAt(t.id.length - 1) % 10) * 5

        return {
          ...t,
          mockEvents,
          engagement,
        }
      })
      .sort((a, b) =>
        metric === 'events'
          ? b.mockEvents - a.mockEvents
          : b.engagement - a.engagement,
      )
  }, [tribes, metric])

  if (rankedTribes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 shadow-sm mt-8 animate-fade-in-up">
        <Trophy className="w-16 h-16 text-primary/30 mb-5 animate-float" />
        <h3 className="text-xl font-black text-foreground mb-2">
          Nenhuma tribo ranqueada
        </h3>
        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
          Nenhum evento agendado ainda. Seja o primeiro a liderar sua tribo para
          o topo do ranking!
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex bg-secondary/50 p-1.5 rounded-2xl w-full max-w-xs mx-auto shadow-inner">
        <button
          onClick={() => setMetric('active')}
          className={cn(
            'flex-1 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2',
            metric === 'active'
              ? 'bg-background shadow-md text-primary'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Flame
            className={cn('w-4 h-4', metric === 'active' && 'text-orange-500')}
          />
          Mais Ativas
        </button>
        <button
          onClick={() => setMetric('events')}
          className={cn(
            'flex-1 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2',
            metric === 'events'
              ? 'bg-background shadow-md text-primary'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Calendar
            className={cn('w-4 h-4', metric === 'events' && 'text-blue-500')}
          />
          Mais Eventos
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {rankedTribes.map((tribe, index) => {
          const rank = index + 1
          const metricValue =
            metric === 'active' ? tribe.engagement : tribe.mockEvents
          const metricLabel = metric === 'active' ? 'Engajamento' : 'Eventos'

          return (
            <div
              key={tribe.id}
              onClick={() => navigate(`/nexus/${tribe.id}`)}
              className={cn(
                'relative flex items-center p-4 rounded-3xl border backdrop-blur-xl shadow-sm cursor-pointer transition-all hover:-translate-y-1',
                rank === 1 &&
                  'bg-yellow-500/10 border-yellow-500/50 shadow-[0_4px_20px_rgba(234,179,8,0.15)]',
                rank === 2 && 'bg-slate-300/10 border-slate-300/50',
                rank === 3 && 'bg-amber-700/10 border-amber-700/50',
                rank > 3 &&
                  'bg-card/60 border-border/50 hover:border-primary/40',
              )}
            >
              <div className="w-12 sm:w-16 flex justify-center flex-shrink-0">
                {rank === 1 ? (
                  <Trophy className="text-yellow-500 w-8 h-8 drop-shadow-md animate-pulse" />
                ) : rank === 2 ? (
                  <Medal className="text-slate-400 w-7 h-7 drop-shadow-sm" />
                ) : rank === 3 ? (
                  <Medal className="text-amber-700 w-7 h-7 drop-shadow-sm" />
                ) : (
                  <span className="font-black text-xl text-muted-foreground">
                    #{rank}
                  </span>
                )}
              </div>

              <img
                src={tribe.icon}
                alt={tribe.name}
                className={cn(
                  'w-14 h-14 rounded-xl object-cover bg-secondary',
                  rank === 1 &&
                    'ring-2 ring-yellow-500 ring-offset-2 ring-offset-background',
                )}
              />

              <div className="flex-1 ml-4 min-w-0">
                <h3 className="font-bold text-base sm:text-lg leading-tight truncate">
                  {tribe.name}
                </h3>
                <Badge
                  variant="outline"
                  className={cn(
                    'mt-1.5 text-[10px] px-2 py-0',
                    rank === 1 &&
                      'border-yellow-500/30 text-yellow-600 dark:text-yellow-400',
                  )}
                >
                  {tribe.category}
                </Badge>
              </div>

              <div className="text-right ml-4 flex-shrink-0">
                <p
                  className={cn(
                    'font-black text-xl sm:text-2xl tabular-nums',
                    rank === 1
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-primary',
                  )}
                >
                  {metricValue}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-bold mt-0.5">
                  {metricLabel}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
