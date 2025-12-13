import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import { mockComparisonStats, mockProfiles, mockCurrentUser } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function StatsDetail() {
  const navigate = useNavigate()
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    mockProfiles[0].id.toString(),
  )

  const selectedProfile =
    mockProfiles.find((p) => p.id.toString() === selectedProfileId) ||
    mockProfiles[0]

  // Transform data for the selected profile comparison
  const chartData = mockComparisonStats.map((stat) => ({
    subject: stat.subject,
    me: stat.me,
    opponent: stat.opponent, // In a real app, this would come from selectedProfile.stats
  }))

  const chartConfig = {
    me: {
      label: 'Você',
      color: 'hsl(var(--primary))',
    },
    opponent: {
      label: selectedProfile.name,
      color: 'hsl(var(--muted-foreground))',
    },
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md p-4 border-b border-border/50 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Estatísticas</h1>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Comparison Selector */}
        <Card className="border-none shadow-sm bg-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={mockCurrentUser.avatar} />
                  <AvatarFallback>EU</AvatarFallback>
                </Avatar>
                <span className="text-xs font-bold text-muted-foreground">
                  VS
                </span>
                <Avatar className="h-10 w-10 border-2 border-muted-foreground">
                  <AvatarImage src={selectedProfile.avatar} />
                  <AvatarFallback>{selectedProfile.name[0]}</AvatarFallback>
                </Avatar>
              </div>

              <Select
                value={selectedProfileId}
                onValueChange={setSelectedProfileId}
              >
                <SelectTrigger className="w-[140px] h-9 text-xs">
                  <SelectValue placeholder="Comparar com" />
                </SelectTrigger>
                <SelectContent>
                  {mockProfiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id.toString()}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Radar Chart */}
            <div className="h-[300px] w-full mt-4">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <RadarChart data={chartData}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarGrid className="stroke-muted/30" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: 'hsl(var(--muted-foreground))',
                      fontSize: 10,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 150]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Você"
                    dataKey="me"
                    stroke="var(--color-me)"
                    fill="var(--color-me)"
                    fillOpacity={0.5}
                  />
                  <Radar
                    name={selectedProfile.name}
                    dataKey="opponent"
                    stroke="var(--color-opponent)"
                    fill="var(--color-opponent)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Stats Grid */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            Detalhamento <Info className="h-4 w-4 text-muted-foreground" />
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {chartData.map((stat) => (
              <Card
                key={stat.subject}
                className="border-none shadow-sm overflow-hidden"
              >
                <CardContent className="p-3 relative">
                  <h4 className="text-xs text-muted-foreground mb-1">
                    {stat.subject}
                  </h4>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-bold">{stat.me}</span>
                    <span
                      className={cn(
                        'text-xs font-medium mb-1',
                        stat.me >= stat.opponent
                          ? 'text-green-500'
                          : 'text-red-500',
                      )}
                    >
                      {stat.me >= stat.opponent ? '+' : ''}
                      {stat.me - stat.opponent}
                    </span>
                  </div>
                  {/* Progress Bar Visual */}
                  <div className="w-full h-1 bg-secondary mt-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(stat.me / 150) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
