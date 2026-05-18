import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronDown,
  Activity,
  Star,
  Users,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

type TeamStat = {
  id: string
  name: string
  probability: number
  strength: number
  athleteLevel: number
  stats: {
    Tactical: number
    Physical: number
    Mental: number
    Technical: number
    Speed: number
  }
  keyPlayers: string[]
  description: string
  color: string
}

const TEAMS: TeamStat[] = [
  {
    id: 'br',
    name: 'Brazil',
    probability: 18.5,
    strength: 94,
    athleteLevel: 96,
    stats: { Tactical: 88, Physical: 90, Mental: 85, Technical: 98, Speed: 92 },
    keyPlayers: ['Vini Jr.', 'Rodrygo', 'Endrick'],
    description:
      'The quintessence of football flair. High technical ability and attacking power.',
    color: '#009c3b',
  },
  {
    id: 'fr',
    name: 'France',
    probability: 17.2,
    strength: 95,
    athleteLevel: 94,
    stats: { Tactical: 90, Physical: 95, Mental: 88, Technical: 92, Speed: 94 },
    keyPlayers: ['Mbappé", "Griezmann", "Camavinga'],
    description:
      'A powerhouse of athleticism and tactical discipline, with explosive forwards.',
    color: '#002395',
  },
  {
    id: 'ar',
    name: 'Argentina',
    probability: 15.8,
    strength: 92,
    athleteLevel: 91,
    stats: { Tactical: 92, Physical: 85, Mental: 95, Technical: 90, Speed: 84 },
    keyPlayers: ['Messi', 'Alvarez', 'Mac Allister'],
    description:
      'Reigning champions with unparalleled team cohesion and mental resilience.',
    color: '#74acdf',
  },
  {
    id: 'en',
    name: 'England',
    probability: 14.0,
    strength: 90,
    athleteLevel: 92,
    stats: { Tactical: 87, Physical: 88, Mental: 82, Technical: 89, Speed: 90 },
    keyPlayers: ['Bellingham', 'Kane', 'Saka'],
    description:
      'A golden generation blending youthful energy with experienced leadership.',
    color: '#ce1124',
  },
  {
    id: 'es',
    name: 'Spain',
    probability: 12.5,
    strength: 89,
    athleteLevel: 90,
    stats: { Tactical: 95, Physical: 82, Mental: 85, Technical: 94, Speed: 86 },
    keyPlayers: ['Pedri', 'Yamal', 'Rodri'],
    description:
      'Masters of possession and positional play, dictating the tempo of any game.',
    color: '#aa151b',
  },
  {
    id: 'de',
    name: 'Germany',
    probability: 10.0,
    strength: 88,
    athleteLevel: 89,
    stats: { Tactical: 89, Physical: 87, Mental: 90, Technical: 88, Speed: 85 },
    keyPlayers: ['Musiala', 'Wirtz', 'Kimmich'],
    description:
      'Tactically versatile and efficient, undergoing a powerful resurgence.',
    color: '#ffce00',
  },
  {
    id: 'pt',
    name: 'Portugal',
    probability: 8.5,
    strength: 87,
    athleteLevel: 90,
    stats: { Tactical: 85, Physical: 86, Mental: 84, Technical: 91, Speed: 88 },
    keyPlayers: ['Leão', 'Bruno Fernandes', 'Bernardo Silva'],
    description:
      'An incredibly deep squad with technical maestros in midfield and attack.',
    color: '#ff0000',
  },
  {
    id: 'it',
    name: 'Italy',
    probability: 3.5,
    strength: 85,
    athleteLevel: 86,
    stats: { Tactical: 92, Physical: 82, Mental: 88, Technical: 85, Speed: 80 },
    keyPlayers: ['Barella', 'Chiesa', 'Bastoni'],
    description: 'Historically formidable defenders with tactical astuteness.',
    color: '#0066cc',
  },
]

function TeamCard({ team, rank }: { team: TeamStat; rank: number }) {
  const [isOpen, setIsOpen] = useState(false)

  const radarData = Object.entries(team.stats).map(([subject, value]) => ({
    subject,
    value,
  }))

  const chartConfig = {
    value: { label: 'Score', color: team.color },
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className={cn(
          'border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative group transition-all duration-300',
          isOpen
            ? 'border-border/60 shadow-lg shadow-black/20'
            : 'hover:border-border/50',
        )}
      >
        <div
          className="absolute inset-0 opacity-[0.03] transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${team.color})`,
          }}
        />

        <CollapsibleTrigger asChild>
          <div className="p-4 flex items-center justify-between cursor-pointer select-none">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-muted-foreground/30 w-6 text-center tabular-nums">
                {rank}
              </span>
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 shadow-sm"
                style={{ borderColor: team.color }}
              >
                <img
                  src={`https://img.usecurling.com/p/100/100?q=${encodeURIComponent(
                    team.name,
                  )}%20flag`}
                  alt={`${team.name} Flag`}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold uppercase tracking-wider text-foreground leading-tight">
                  {team.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge
                    variant="secondary"
                    className="px-1.5 py-0 text-[10px] bg-background/50 text-muted-foreground border-border/50 font-medium"
                  >
                    TPI:{' '}
                    <span className="text-foreground ml-1 font-bold">
                      {team.strength}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Win Prob
                </span>
                <span
                  className="text-lg font-black tabular-nums tracking-tighter"
                  style={{ color: team.color }}
                >
                  {team.probability.toFixed(1)}%
                </span>
              </div>
              <div
                className={cn(
                  'p-1.5 rounded-full bg-secondary/50 transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 pt-0 border-t border-border/10 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 animate-in slide-in-from-top-2 duration-300">
            {/* Radar Chart */}
            <div className="flex flex-col gap-2 pt-4">
              <h4 className="text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-widest text-muted-foreground">
                <Activity className="w-3.5 h-3.5" /> Technical Profile
              </h4>
              <div className="h-[200px] w-full -ml-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <RadarChart
                    data={radarData}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  >
                    <PolarGrid
                      stroke="hsl(var(--border))"
                      strokeDasharray="3 3"
                    />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <Radar
                      name={team.name}
                      dataKey="value"
                      stroke={team.color}
                      strokeWidth={2}
                      fill={team.color}
                      fillOpacity={0.25}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
            </div>

            {/* Stats Details */}
            <div className="flex flex-col justify-center gap-5 pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> Overall Squad Level
                  </h4>
                  <span className="text-xs font-black">
                    {team.athleteLevel}/100
                  </span>
                </div>
                <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 ease-out relative"
                    style={{
                      width: `${team.athleteLevel}%`,
                      backgroundColor: team.color,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Key Players
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {team.keyPlayers.map((player) => (
                    <Badge
                      key={player}
                      variant="outline"
                      className="bg-background/40 border-border/30 text-xs font-medium"
                    >
                      {player}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <p
                  className="text-xs text-muted-foreground leading-relaxed italic border-l-2 pl-3 py-1"
                  style={{ borderColor: team.color }}
                >
                  "{team.description}"
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export default function CopaStatsDashboard() {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<'probability' | 'strength' | 'name'>(
    'probability',
  )

  const sortedTeams = useMemo(() => {
    return [...TEAMS].sort((a, b) => {
      if (sortBy === 'probability') return b.probability - a.probability
      if (sortBy === 'strength') return b.strength - a.strength
      return a.name.localeCompare(b.name)
    })
  }, [sortBy])

  const top5Teams = [...TEAMS]
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-background pb-32 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm">
        <div className="flex items-center justify-between p-4 px-4 pt-safe-top">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full shrink-0 hover:bg-secondary/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(var(--gold))]">
              Copa 26 Stats
            </h1>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Power Index & Probabilities
            </span>
          </div>
          <div className="w-10 shrink-0" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Top Favorites Chart */}
        <div className="px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden relative shadow-lg">
            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <CardHeader className="pb-0 pt-5">
              <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Title Favorites
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[220px] w-full">
                <ChartContainer
                  config={{ value: { label: 'Win Probability %' } }}
                  className="h-full w-full"
                >
                  <BarChart
                    data={top5Teams}
                    layout="vertical"
                    margin={{ left: 0, right: 30, top: 0, bottom: 0 }}
                  >
                    <XAxis type="number" hide domain={[0, 25]} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: 'hsl(var(--foreground))',
                        fontWeight: 600,
                      }}
                      width={70}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                      cursor={{ fill: 'hsl(var(--secondary)/0.3)' }}
                    />
                    <Bar
                      dataKey="probability"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      label={{
                        position: 'right',
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 10,
                        fontWeight: 600,
                        formatter: (val: number) => `${val}%`,
                      }}
                    >
                      {top5Teams.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* List Header & Controls */}
        <div className="px-4 mt-8 mb-4 flex items-end justify-between animate-in fade-in duration-700 delay-200">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
              Power Rankings
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Detailed technical breakdown
            </p>
          </div>
          <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
            <SelectTrigger className="w-[140px] h-8 bg-secondary/30 border-border/30 text-xs font-semibold rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="probability">Win Probability</SelectItem>
              <SelectItem value="strength">TPI Strength</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Teams List */}
        <div className="px-4 flex flex-col gap-3 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {sortedTeams.map((team, index) => (
            <TeamCard key={team.id} team={team} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}
