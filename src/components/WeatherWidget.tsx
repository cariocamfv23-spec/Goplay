import { CloudSun, Droplets, Wind, MapPin, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useWeatherStore } from '@/stores/useWeatherStore'

export function WeatherWidget() {
  const { currentLocation } = useWeatherStore()

  return (
    <Card className="relative overflow-hidden border-0 bg-transparent shadow-none group h-full cursor-pointer">
      {/* Futuristic Glassmorphism Background Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-background/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl transition-all duration-500 group-hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] group-hover:border-primary/30" />

      {/* Subtle Neon Glow Orb */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-[40px] group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none" />

      {/* Optimal Weather Indicator Line */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.6)] transition-all duration-500" />

      <CardContent className="p-4 relative z-10 flex flex-col justify-between h-full">
        {/* Header: Location & Icon */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-foreground/5 backdrop-blur-md border border-foreground/5 shadow-sm w-fit">
              <MapPin className="w-2.5 h-2.5 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/80 truncate max-w-[80px]">
                {currentLocation.split(',')[0]}
              </span>
            </div>
            <div className="flex items-start gap-0.5 mt-2">
              <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60">
                24
              </span>
              <span className="text-xs font-bold text-foreground/50 mt-1.5">
                °C
              </span>
            </div>
          </div>
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full" />
            <CloudSun className="w-9 h-9 text-yellow-400 relative z-10 animate-float-slow drop-shadow-[0_0_12px_rgba(250,204,21,0.5)]" />
          </div>
        </div>

        {/* Condition & Metrics */}
        <div className="flex flex-col gap-2 mb-3 mt-1">
          <span className="text-[11px] font-bold text-foreground/90 uppercase tracking-widest">
            Parcialmente Nublado
          </span>
          <div className="flex items-center gap-3 text-[10px] font-semibold text-muted-foreground">
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-blue-400" />
              <span>45%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-teal-400" />
              <span>12 km/h</span>
            </div>
          </div>
        </div>

        {/* Smart Tip Footer */}
        <div className="pt-2.5 border-t border-border/50 relative mt-auto">
          {/* Techy corner accents */}
          <div className="absolute top-0 right-0 w-1 h-[1px] bg-primary/40" />
          <div className="absolute top-0 right-0 w-[1px] h-1 bg-primary/40" />

          <div className="flex items-start gap-1.5">
            <div className="p-1 rounded-md bg-emerald-500/10 shrink-0 mt-0.5">
              <Sparkles className="w-3 h-3 text-emerald-500" />
            </div>
            <p className="text-[9px] leading-snug text-muted-foreground group-hover:text-foreground/90 transition-colors">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Dica AI:
              </span>{' '}
              Clima perfeito para HIIT ao ar livre. Mantenha-se hidratado.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
