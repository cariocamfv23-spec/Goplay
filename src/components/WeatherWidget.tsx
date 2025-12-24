import { CloudSun, Droplets, Wind, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { cn } from '@/lib/utils'

export function WeatherWidget() {
  const { currentLocation } = useWeatherStore()

  return (
    <Card className="border-none shadow-sm bg-gradient-to-br from-sky-400 to-blue-600 text-white overflow-hidden relative group cursor-pointer hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

      <CardContent className="p-4 flex flex-col justify-between h-full relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white/80 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {currentLocation.split(',')[0]}
            </span>
            <span className="text-3xl font-bold tracking-tighter mt-1">
              26°
            </span>
          </div>
          <CloudSun className="w-8 h-8 text-yellow-300 animate-pulse" />
        </div>

        <div className="flex items-center gap-3 mt-3 text-[10px] font-medium text-white/90">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            <span>45%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3" />
            <span>12km/h</span>
          </div>
          <div className="ml-auto">Ensolarado</div>
        </div>
      </CardContent>
    </Card>
  )
}
