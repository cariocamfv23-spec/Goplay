import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { EcoHumanoWaves } from '@/components/EcoHumanoWaves'
import { Activity, Users, Zap, Waves } from 'lucide-react'
import { EcoConfig } from '@/lib/eco-utils'

interface EcoLegendProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EcoLegend({ open, onOpenChange }: EcoLegendProps) {
  const states: {
    title: string
    description: string
    icon: React.ElementType
    config: Partial<EcoConfig>
  }[] = [
    {
      title: 'Inspiração',
      description: 'Ondas suaves geradas por consistência nos treinos e jogos.',
      icon: Activity,
      config: {
        active: true,
        resonance: 30,
        frequency: 20,
        range: 30,
        colorTheme: 'nature',
        particles: false,
      },
    },
    {
      title: 'Influência',
      description:
        'Ondas frequentes de médio alcance geradas por engajamento social.',
      icon: Users,
      config: {
        active: true,
        resonance: 60,
        frequency: 70,
        range: 60,
        colorTheme: 'cyan',
        particles: false,
      },
    },
    {
      title: 'Transformação',
      description:
        'Ondas intensas e partículas geradas por grandes superações e MVPs.',
      icon: Zap,
      config: {
        active: true,
        resonance: 90,
        frequency: 80,
        range: 90,
        colorTheme: 'gold',
        particles: true,
      },
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Waves className="w-5 h-5 text-emerald-400" />
            Eco Humano
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Seu impacto positivo gera ondas reais no GoPlay.
            <br />
            Veja como suas ações expandem seu Eco.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {states.map((state, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-white/10 p-4 group"
            >
              {/* Background for Card */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-center gap-4">
                {/* Visual Preview */}
                <div className="relative shrink-0 w-16 h-16 flex items-center justify-center">
                  {/* Mini Simulation */}
                  <EcoHumanoWaves
                    configOverride={state.config}
                    className="scale-75"
                  />
                  <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/20 shadow-lg">
                    <state.icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h4 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                    {state.title}
                  </h4>
                  <p className="text-sm text-zinc-300 leading-snug mt-1">
                    {state.description}
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
