import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { StatsHistoryPoint } from '@/lib/data'
import { TrendingUp, Activity } from 'lucide-react'

const chartConfig = {
  rating: {
    label: 'Nota Média',
    color: 'hsl(var(--primary))',
  },
  matches: {
    label: 'Partidas',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

interface StatsHistoryChartProps {
  data: StatsHistoryPoint[]
}

export function StatsHistoryChart({ data }: StatsHistoryChartProps) {
  if (!data || data.length === 0) return null

  // Calculate trends
  const lastMonth = data[data.length - 1]
  const previousMonth = data[data.length - 2]
  const ratingTrend =
    lastMonth && previousMonth
      ? ((lastMonth.rating - previousMonth.rating) / previousMonth.rating) * 100
      : 0

  return (
    <Card className="border-none shadow-sm bg-gradient-to-br from-card to-secondary/10 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Evolução de Performance
            </CardTitle>
            <CardDescription>Desempenho nos últimos 6 meses</CardDescription>
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${ratingTrend >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
          >
            <TrendingUp className="h-3 w-3" />
            {ratingTrend > 0 ? '+' : ''}
            {ratingTrend.toFixed(1)}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full mt-2">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillRating" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-rating)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-rating)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                domain={[0, 5]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="rating"
                type="monotone"
                fill="url(#fillRating)"
                fillOpacity={0.4}
                stroke="var(--color-rating)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-rating)', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
