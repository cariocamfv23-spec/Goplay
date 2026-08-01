import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Flag, Coins, Split, Home, Users } from 'lucide-react'
import type { PaymentResponsibility } from '@/lib/matchmaking-data'
import { toast } from 'sonner'

export interface MatchConfigState {
  hasReferee: boolean
  fieldFee: string
  refereeFee: string
  paymentResponsibility: PaymentResponsibility
}

interface MatchConfigCardProps {
  config: MatchConfigState
  onChange: (config: MatchConfigState) => void
}

export function MatchConfigCard({ config, onChange }: MatchConfigCardProps) {
  const [localConfig, setLocalConfig] = useState<MatchConfigState>(config)

  const update = (patch: Partial<MatchConfigState>) => {
    const next = { ...localConfig, ...patch }
    setLocalConfig(next)
    onChange(next)
  }

  const fieldFeeNum = parseFloat(localConfig.fieldFee) || 0
  const refFeeNum = localConfig.hasReferee
    ? parseFloat(localConfig.refereeFee) || 0
    : 0
  const total = fieldFeeNum + refFeeNum
  const perTeam = total / 2

  return (
    <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Coins className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Configuração da Partida
          </h3>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border/30 bg-background/40 p-3">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-primary" />
            <Label className="text-xs font-bold uppercase tracking-wide cursor-pointer">
              Árbitro na partida
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-[10px] font-black uppercase',
                localConfig.hasReferee
                  ? 'text-green-500'
                  : 'text-muted-foreground',
              )}
            >
              {localConfig.hasReferee ? 'Sim' : 'Não'}
            </span>
            <Switch
              checked={localConfig.hasReferee}
              onCheckedChange={(v) => update({ hasReferee: v })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Taxa do Campo
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                R$
              </span>
              <Input
                type="number"
                value={localConfig.fieldFee}
                onChange={(e) => update({ fieldFee: e.target.value })}
                className="pl-8 h-9 text-sm font-bold bg-background/40 border-border/30"
                placeholder="0"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Taxa do Árbitro
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                R$
              </span>
              <Input
                type="number"
                value={localConfig.refereeFee}
                onChange={(e) => update({ refereeFee: e.target.value })}
                disabled={!localConfig.hasReferee}
                className="pl-8 h-9 text-sm font-bold bg-background/40 border-border/30 disabled:opacity-40"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Responsabilidade de Pagamento
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                update({ paymentResponsibility: 'split' })
                toast.success('Pagamento dividido entre as equipes')
              }}
              className={cn(
                'flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all',
                localConfig.paymentResponsibility === 'split'
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border/30 bg-secondary/20 hover:border-border/60',
              )}
            >
              <Split className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-wide">
                Valor Dividido
              </span>
              <span className="text-[8px] text-muted-foreground">
                R$ {perTeam.toFixed(0)} / equipe
              </span>
            </button>
            <button
              onClick={() => {
                update({ paymentResponsibility: 'home' })
                toast.success('Pagamento responsabilidade do Mandante')
              }}
              className={cn(
                'flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all',
                localConfig.paymentResponsibility === 'home'
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border/30 bg-secondary/20 hover:border-border/60',
              )}
            >
              <Home className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-wide">
                Conta do Mandante
              </span>
              <span className="text-[8px] text-muted-foreground">
                R$ {total.toFixed(0)} / mandante
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-black/40 border border-[hsl(var(--gold)/0.2)] p-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Custo Total
          </span>
          <span className="text-lg font-black text-[hsl(var(--gold))]">
            R$ {total.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
