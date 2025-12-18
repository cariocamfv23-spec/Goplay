import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RetrospectiveYear } from '@/lib/data'

interface EvolutionChartProps {
  data: RetrospectiveYear[]
}

export function EvolutionChart({ data }: EvolutionChartProps) {
  const chartData = [...data]
    .sort((a, b) => a.year - b.year)
    .map((item) => ({
      year: item.year,
      Partidas: item.stats.matches,
      Gols: item.stats.goals,
      Rating: item.stats.rating,
    }))

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-white text-sm font-medium uppercase tracking-wider opacity-90">
          Atividade Anual
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="year"
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              hide
              yAxisId="left"
              orientation="left"
              stroke="rgba(255,255,255,0.5)"
            />
            <YAxis
              hide
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.5)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff',
              }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar
              yAxisId="left"
              dataKey="Partidas"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="Gols"
              fill="hsl(var(--gold))"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
