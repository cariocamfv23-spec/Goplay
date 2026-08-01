import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Coins, Flag, Split, Home } from 'lucide-react'
import type { MatchConfigState } from './MatchConfigCard'
import type { VisitorChecklistState } from './VisitorChecklist'

interface MatchFinancialsCardProps {
  config: MatchConfigState
  visitorChecklist: VisitorChecklistState
}

export function MatchFinancialsCard({
  config,
  visitorChecklist,
}: MatchFinancialsCardProps) {
  const fieldFee = parseFloat(config.fieldFee) || 0
  const refFee = config.hasReferee ? parseFloat(config.refereeFee) || 0 : 0
  const total = fieldFee + refFee
  const isSplit = config.paymentResponsibility === 'split'
  const perTeam = total / 2

  return (
    <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-[hsl(var(--gold))]" />
          <span className="text-xs font-black uppercase tracking-widest">
            Gestão Financeira
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-background/40 border border-border/20 p-2.5">
            <span className="text-[8px] font-bold text-muted-foreground uppercase">
              Taxa do Campo
            </span>
            <span className="block text-sm font-black text-foreground">
              R$ {fieldFee.toFixed(2)}
            </span>
          </div>
          <div
            className={cn(
              'rounded-lg border p-2.5',
              config.hasReferee
                ? 'bg-background/40 border-border/20'
                : 'bg-secondary/20 border-border/10 opacity-50',
            )}
          >
            <span className="text-[8px] font-bold text-muted-foreground uppercase flex items-center gap-1">
              <Flag className="w-2.5 h-2.5" /> Taxa do Árbitro
            </span>
            <span className="block text-sm font-black text-foreground">
              {config.hasReferee ? `R$ ${refFee.toFixed(2)}` : '—'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-black/40 border border-[hsl(var(--gold)/0.2)] p-2.5">
          <span className="text-[10px] font-black uppercase tracking-wide text-muted-foreground">
            Total
          </span>
          <span className="text-base font-black text-[hsl(var(--gold))]">
            R$ {total.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isSplit ? (
            <Split className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Home className="w-3.5 h-3.5 text-primary" />
          )}
          <span className="text-[10px] font-bold text-muted-foreground uppercase">
            {isSplit ? 'Valor Dividido' : 'Conta do Mandante'}
          </span>
          <Badge
            variant="outline"
            className="text-[8px] uppercase font-black ml-auto"
          >
            {isSplit
              ? `R$ ${perTeam.toFixed(0)}/equipe`
              : `R$ ${total.toFixed(0)}/mandante`}
          </Badge>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-border/20">
          <span className="text-[8px] font-black uppercase tracking-wide text-muted-foreground">
            Visitante:
          </span>
          <Badge
            variant="outline"
            className={cn(
              'text-[8px] uppercase font-bold',
              visitorChecklist.arrived
                ? 'border-green-500/30 text-green-500 bg-green-500/10'
                : 'text-muted-foreground',
            )}
          >
            {visitorChecklist.arrived ? '✓ Compareceu' : '○ Pendente'}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              'text-[8px] uppercase font-bold',
              visitorChecklist.onTime
                ? 'border-green-500/30 text-green-500 bg-green-500/10'
                : 'text-muted-foreground',
            )}
          >
            {visitorChecklist.onTime ? '✓ No horário' : '○ Pendente'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
