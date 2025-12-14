import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target } from 'lucide-react'

const chartConfig = {
  value: {
    label: 'Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

interface StatsRadarChartProps {
  stats: {
    label: string
    value: number
    max: number
    unit: string
  }[]
}

export function StatsRadarChart({ stats }: StatsRadarChartProps) {
  if (!stats || stats.length === 0) return null

  // Normalize data for radar chart (0-100 scale)
  const data = stats.map((stat) => ({
    subject: stat.label,
    value: Math.round((stat.value / stat.max) * 100),
    fullMark: 100,
    originalValue: stat.value,
    unit: stat.unit,
  }))

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0 pb-2 text-center">
        <CardTitle className="text-sm font-medium text-zinc-400 flex items-center justify-center gap-2">
          <Target className="h-4 w-4" /> Radar de Habilidades
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full flex items-center justify-center">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <RadarChart data={data} outerRadius={70}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="bg-zinc-900 border-zinc-800 text-white"
                    formatter={(value, name, item) => (
                      <>
                        <span className="font-bold text-primary">
                          {item.payload.originalValue}
                        </span>
                        <span className="text-zinc-400 text-xs ml-1">
                          {item.payload.unit}
                        </span>
                      </>
                    )}
                  />
                }
              />
            </RadarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
