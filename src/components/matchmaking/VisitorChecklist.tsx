import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { MapPin, Clock, CheckCircle2, Circle } from 'lucide-react'
import { toast } from 'sonner'

export interface VisitorChecklistState {
  arrived: boolean
  onTime: boolean
}

interface VisitorChecklistProps {
  initial?: Partial<VisitorChecklistState>
  onChange?: (state: VisitorChecklistState) => void
}

export function VisitorChecklist({
  initial = {},
  onChange,
}: VisitorChecklistProps) {
  const [state, setState] = useState<VisitorChecklistState>({
    arrived: initial.arrived ?? false,
    onTime: initial.onTime ?? false,
  })

  const toggle = useCallback(
    (key: keyof VisitorChecklistState) => {
      const next = { ...state, [key]: !state[key] }
      setState(next)
      onChange?.(next)
      if (key === 'arrived' && next.arrived) {
        toast.success('Equipe visitante confirmou comparecimento!')
      }
      if (key === 'onTime' && next.onTime) {
        toast.success('Chegada no horário confirmada!')
      }
    },
    [state, onChange],
  )

  const items: {
    key: keyof VisitorChecklistState
    label: string
    icon: typeof MapPin
  }[] = [
    { key: 'arrived', label: 'Equipe compareceu ao local?', icon: MapPin },
    { key: 'onTime', label: 'Chegada no horário correto?', icon: Clock },
  ]

  return (
    <div className="rounded-xl border border-border/30 bg-secondary/10 p-3 space-y-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
        Checklist do Visitante
      </span>
      {items.map((item) => {
        const checked = state[item.key]
        const Icon = item.icon
        return (
          <button
            key={item.key}
            onClick={() => toggle(item.key)}
            className={cn(
              'w-full flex items-center gap-2 p-2 rounded-lg border transition-all text-left',
              checked
                ? 'border-green-500/30 bg-green-500/10'
                : 'border-border/20 bg-background/30 hover:bg-secondary/20',
            )}
          >
            <Icon
              className={cn(
                'w-4 h-4 shrink-0',
                checked ? 'text-green-500' : 'text-muted-foreground',
              )}
            />
            <span
              className={cn(
                'flex-1 text-[11px] font-bold',
                checked ? 'text-green-500' : 'text-foreground',
              )}
            >
              {item.label}
            </span>
            {checked ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
          </button>
        )
      })}
    </div>
  )
}
