import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { mockDriverStats } from '@/lib/data'
import { ArrowLeft, Car, Clock, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DriverMetricsCard } from '@/components/DriverMetricsCard'

const chartConfig = {
  rides: {
    label: 'Corridas',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

export default function DriverPerformance() {
  const navigate = useNavigate()

  // Calculated aggregate stats
  const totalDrivers = mockDriverStats.length
  const totalRides = mockDriverStats.reduce((acc, curr) => acc + curr.rides, 0)
  const avgRating = (
    mockDriverStats.reduce((acc, curr) => acc + curr.rating, 0) / totalDrivers
  ).toFixed(1)

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Performance de Motoristas</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <DriverMetricsCard
          title="Total Corridas"
          value={totalRides.toString()}
          icon={Car}
          description="Todos os motoristas"
        />
        <DriverMetricsCard
          title="Média Avaliação"
          value={avgRating}
          icon={Star}
          description="Geral da frota"
          iconColor="text-gold"
        />
        <DriverMetricsCard
          title="Total Motoristas"
          value={totalDrivers.toString()}
          icon={Users}
          description="Ativos"
        />
        <DriverMetricsCard
          title="Tempo Resposta"
          value="~3.6m"
          icon={Clock}
          description="Média geral"
        />
      </div>

      <Card className="mb-6 border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Corridas por Motorista</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart
                data={mockDriverStats}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={10}
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="rides"
                  fill="var(--color-rides)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <h2 className="font-bold text-lg mb-4">Detalhamento</h2>
      <div className="space-y-3">
        {mockDriverStats.map((driver) => (
          <Card
            key={driver.id}
            className="shadow-sm border-none bg-secondary/20"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={driver.avatar} />
                  <AvatarFallback>{driver.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-sm">{driver.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-gold text-gold" />{' '}
                      {driver.rating}
                    </span>
                    <span>• {driver.rides} corridas</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs text-muted-foreground">
                  Resp.
                </span>
                <span className="font-bold text-sm text-primary">
                  {driver.responseTime}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
