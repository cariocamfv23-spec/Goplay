import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AURA_CONFIGS, AuraType } from '@/lib/aura-utils'
import { Trophy, Zap, Sparkles, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuraLegendProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuraLegend({ open, onOpenChange }: AuraLegendProps) {
  const auras = Object.entries(AURA_CONFIGS).filter(
    ([key]) => key !== 'none',
  ) as [AuraType, typeof AURA_CONFIGS.gold][]

  const getIcon = (type: AuraType) => {
    switch (type) {
      case 'gold':
        return <Trophy className="w-5 h-5 text-yellow-100" />
      case 'neon':
        return <Zap className="w-5 h-5 text-cyan-100" />
      case 'nature':
        return <Sparkles className="w-5 h-5 text-emerald-100" />
      case 'royal':
        return <Eye className="w-5 h-5 text-purple-100" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-gold" />
            Identidade Aura Viva
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Sua aura evolui com sua performance no GoPlay.
            <br />
            Entenda o significado de cada energia visual.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {auras.map(([type, config]) => (
            <div
              key={type}
              className="relative overflow-hidden rounded-xl border border-white/10 p-4 group"
            >
              {/* Background Gradient */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${config.colorStart}, ${config.colorEnd})`,
                }}
              />

              <div className="relative flex items-start gap-4">
                {/* Visual Preview */}
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center shadow-lg',
                      type === 'gold' && 'animate-aura-pulse-fast',
                      type === 'royal' && 'animate-aura-spin',
                    )}
                    style={{
                      background: `linear-gradient(135deg, ${config.colorStart}, ${config.colorEnd})`,
                    }}
                  >
                    {getIcon(type)}
                  </div>
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-60 -z-10"
                    style={{ background: config.glowColor }}
                  />
                </div>

                {/* Text Content */}
                <div>
                  <h4
                    className="font-bold text-base"
                    style={{ color: config.colorStart }}
                  >
                    {config.title}
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed mt-1">
                    {config.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
