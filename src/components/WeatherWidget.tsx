import { WeatherCondition } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
  Droplets,
  Thermometer,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface WeatherWidgetProps {
  weather?: {
    temp: number
    condition: WeatherCondition
    humidity?: number
    windSpeed?: number
  }
  showForecast?: boolean
}

export function WeatherWidget({
  weather,
  showForecast = true,
}: WeatherWidgetProps) {
  if (!weather) return null

  const getWeatherIcon = (condition: WeatherCondition, className?: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className={cn('text-yellow-500', className)} />
      case 'cloudy':
        return <Cloud className={cn('text-gray-400', className)} />
      case 'rainy':
        return <CloudRain className={cn('text-blue-400', className)} />
      case 'storm':
        return <CloudLightning className={cn('text-purple-500', className)} />
      case 'snow':
        return <CloudSnow className={cn('text-cyan-200', className)} />
      case 'windy':
        return <Wind className={cn('text-blue-300', className)} />
      case 'fog':
        return <CloudFog className={cn('text-gray-300', className)} />
      default:
        return <CloudSun className={cn('text-orange-400', className)} />
    }
  }

  const getWeatherLabel = (condition: WeatherCondition) => {
    switch (condition) {
      case 'sunny':
        return 'Ensolarado'
      case 'cloudy':
        return 'Nublado'
      case 'rainy':
        return 'Chuvoso'
      case 'storm':
        return 'Tempestade'
      case 'snow':
        return 'Neve'
      case 'windy':
        return 'Ventania'
      case 'fog':
        return 'Neblina'
      default:
        return 'Parcialmente Nublado'
    }
  }

  // Mock forecast data relative to current temp
  const forecast = [
    { time: 'Agora', temp: weather.temp, condition: weather.condition },
    { time: '1h', temp: weather.temp + 1, condition: weather.condition },
    {
      time: '2h',
      temp: weather.temp - 1,
      condition: weather.condition === 'sunny' ? 'cloudy' : weather.condition,
    },
    {
      time: '3h',
      temp: weather.temp - 2,
      condition: 'cloudy' as WeatherCondition,
    },
    {
      time: '4h',
      temp: weather.temp - 3,
      condition: 'rainy' as WeatherCondition,
    },
  ]

  return (
    <Card className="border-none bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 overflow-hidden shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground mb-1">
            Condições Atuais
          </span>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background/50 backdrop-blur-sm rounded-xl shadow-sm">
              {getWeatherIcon(weather.condition, 'h-8 w-8')}
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tighter">
                {weather.temp}°
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {getWeatherLabel(weather.condition)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          {weather.humidity && (
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-blue-400" />
              <span>{weather.humidity}% Umidade</span>
            </div>
          )}
          {weather.windSpeed && (
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3 text-gray-400" />
              <span>{weather.windSpeed} km/h Vento</span>
            </div>
          )}
        </div>
      </div>

      {showForecast && (
        <div className="border-t border-border/10 bg-background/30 p-2">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 px-2">
              {forecast.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 min-w-[3rem]"
                >
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {item.time}
                  </span>
                  {getWeatherIcon(item.condition, 'h-4 w-4')}
                  <span className="text-xs font-bold">{item.temp}°</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      )}
    </Card>
  )
}
