import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Eye,
  User,
  Crown,
  Activity,
  Radio,
  MapPin,
  BarChart3,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { PaymentDialog } from '@/components/PaymentDialog'
import { cn } from '@/lib/utils'
import { AppIcon } from '@/components/AppIcon'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { GhostEmojiIcon } from '@/components/GhostEmojiIcon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// Mock Data Pools for Live Simulation
const LIVE_POOL = [
  {
    id: 'u10',
    name: 'Rafael Torres',
    type: 'Scout',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=78',
    pos: { top: '15%', left: '25%' },
  },
  {
    id: 'lv2',
    name: 'Agência NextLevel',
    type: 'Agência',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22',
    pos: { top: '65%', left: '75%' },
  },
  {
    id: 'u4',
    name: 'Carlos Eduardo',
    type: 'Coach',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
    pos: { top: '75%', left: '20%' },
  },
  {
    id: 'a1',
    name: 'GoGlobal Sports',
    type: 'Sponsor',
    avatar: 'https://img.usecurling.com/i?q=globe&color=blue',
    pos: { top: '25%', left: '80%' },
  },
  {
    id: 'lv5',
    name: 'Visitante Anônimo',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=44',
    pos: { top: '50%', left: '10%' },
  },
  {
    id: 'lv6',
    name: 'Marina Silva',
    type: 'Treinador',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=55',
    pos: { top: '40%', left: '85%' },
  },
]

const INITIAL_PAST = [
  {
    id: 'pv1',
    name: 'Red Bull Energy',
    type: 'Sponsor',
    avatar: 'https://img.usecurling.com/i?q=bull&color=red',
    date: 'Há 2 horas',
  },
  {
    id: 'pv2',
    name: 'Futsal Pro Club',
    type: 'Clube',
    avatar: 'https://img.usecurling.com/i?q=soccer&color=blue',
    date: 'Há 5 horas',
  },
  {
    id: 'pv3',
    name: 'Visitante Anônimo',
    type: 'Perfil Oculto',
    avatar: '',
    date: 'Ontem',
  },
  {
    id: 'pv4',
    name: 'Ana Souza',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=102',
    date: 'Ontem',
  },
]

const DAILY_ENGAGEMENT_DATA = [
  { time: '00h', views: 18, isPeak: false },
  { time: '04h', views: 12, isPeak: false },
  { time: '08h', views: 45, isPeak: false },
  { time: '12h', views: 85, isPeak: false },
  { time: '16h', views: 124, isPeak: false },
  { time: '20h', views: 210, isPeak: true }, // Horário de pico
  { time: '23h', views: 65, isPeak: false },
]

const chartConfig = {
  views: {
    label: 'Visitas',
    color: 'hsl(var(--primary))',
  },
  peak: {
    label: 'Pico',
    color: 'hsl(var(--gold))',
  },
} satisfies ChartConfig

export default function ProfileViews() {
  const navigate = useNavigate()

  const { isInvisibleMode, isPremium, toggleInvisibleMode, upgradeToPremium } =
    usePrivacyStore()

  // Real-time Simulation State
  const [liveViewers, setLiveViewers] = useState([LIVE_POOL[0], LIVE_POOL[1]])
  const [pastViewers, setPastViewers] = useState(INITIAL_PAST)
  const [totalViews, setTotalViews] = useState(142)

  // Admin Toggle State for Paywall Preview
  const [isPreviewLocked, setIsPreviewLocked] = useState(!isPremium)

  useEffect(() => {
    setIsPreviewLocked(!isPremium)
  }, [isPremium])

  const viewsThisWeek = 28
  const totalVisitsToday = DAILY_ENGAGEMENT_DATA.reduce(
    (acc, curr) => acc + curr.views,
    0,
  )
  const peakHour = DAILY_ENGAGEMENT_DATA.find((d) => d.isPeak)?.time || '20h'

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((current) => {
        const shouldRemove = current.length > 0 && Math.random() > 0.6
        const shouldAdd = current.length < 4 && Math.random() > 0.4

        const next = [...current]

        if (shouldRemove) {
          const idx = Math.floor(Math.random() * next.length)
          const removed = next[idx]
          next.splice(idx, 1)

          setPastViewers((prev) => [
            {
              id: `moved-${Date.now()}`,
              name: removed.name,
              type: removed.type,
              avatar: removed.avatar,
              date: 'Agora mesmo',
            },
            ...prev,
          ])
        }

        if (shouldAdd) {
          const available = LIVE_POOL.filter(
            (p) => !next.find((n) => n.id === p.id),
          )
          if (available.length) {
            const picked =
              available[Math.floor(Math.random() * available.length)]
            next.push(picked)
            setTotalViews((prev) => prev + 1)
          }
        }

        return next
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const allViewers = [
    ...liveViewers.map((v) => ({ ...v, isLive: true })),
    ...pastViewers.map((v) => ({ ...v, isLive: false })),
  ]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center gap-3 px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <AppIcon className="w-6 h-6" />
          <h1 className="font-bold text-lg">Goplay Views</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Real-Time Live Radar */}
        <Card className="border-none bg-gradient-to-b from-primary/10 via-background to-background overflow-hidden relative shadow-inner">
          <CardContent className="p-0 h-56 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/30 shadow-[0_0_15px_hsl(var(--gold)/0.15)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold shadow-[0_0_8px_hsl(var(--gold))]" />
              </span>
              <span className="text-xs font-black font-sans text-gold tracking-widest uppercase drop-shadow-sm">
                {liveViewers.length} AO VIVO
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <Badge
                variant="secondary"
                className="bg-black/80 text-primary border-primary/30 flex items-center gap-1 backdrop-blur-md shadow-[0_0_10px_hsl(var(--primary)/0.2)]"
              >
                <Radio className="w-3 h-3 animate-pulse text-primary" /> Radar
                Ativo
              </Badge>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div
                className="w-24 h-24 bg-primary/20 rounded-full absolute animate-ping"
                style={{ animationDuration: '3s' }}
              />
              <div className="w-40 h-40 border border-primary/20 rounded-full absolute shadow-[0_0_20px_hsl(var(--primary)/0.1)]" />
              <div className="w-64 h-64 border border-primary/10 rounded-full absolute" />
              <div className="w-96 h-96 border border-primary/5 rounded-full absolute" />
            </div>

            <div className="z-10 bg-background/90 backdrop-blur-sm p-3 rounded-full ring-2 ring-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.3)] border border-primary/30 relative">
              <div className="absolute -inset-1 bg-primary/20 rounded-full animate-pulse blur-sm" />
              <AppIcon className="w-8 h-8 opacity-90 relative z-10" />
            </div>

            {liveViewers.map((v) => {
              const isVipRadar = ['Scout', 'Coach', 'Sponsor'].includes(v.type)

              return (
                <div
                  key={v.id}
                  className="absolute z-20 animate-in zoom-in duration-500 fade-in cursor-pointer hover:scale-110 transition-transform"
                  style={v.pos}
                  onClick={() => {
                    navigate(`/profile/${v.id}`)
                  }}
                >
                  <div className="relative group flex flex-col items-center">
                    <Avatar
                      className={cn(
                        'w-10 h-10 border-2 transition-all duration-300',
                        isVipRadar
                          ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                          : 'border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]',
                      )}
                    >
                      <AvatarImage src={v.avatar} />
                      <AvatarFallback>
                        <User className="w-5 h-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        'absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-background rounded-full animate-pulse',
                        isVipRadar
                          ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                          : 'bg-gold shadow-[0_0_8px_hsl(var(--gold))]',
                      )}
                    />

                    {isVipRadar && (
                      <div className="absolute -top-2 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full p-0.5 shadow-md">
                        <Crown className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Global Counter & Metrics Action Bar */}
        <div className="flex flex-col gap-4 bg-secondary/30 rounded-2xl p-5 border border-border/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground font-medium">
                Total de Visitas
              </p>
              <h2 className="text-3xl font-black text-foreground">
                {totalViews}
              </h2>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-background px-3 py-1.5 rounded-full text-xs font-bold border border-border/50 shadow-sm flex items-center gap-1.5">
                <span className="text-primary">+{viewsThisWeek}</span> semana
              </div>
              {isInvisibleMode && (
                <Badge
                  variant="outline"
                  className="text-[9px] text-gold border-gold/30 bg-gold/5 shadow-[0_0_10px_hsl(var(--gold)/0.1)] uppercase tracking-widest px-1.5 py-0"
                >
                  Invisível
                </Badge>
              )}
            </div>
          </div>

          <div className="h-px w-full bg-border/50 my-1" />

          {/* Action Icons Horizontal Layout */}
          <div className="flex items-center justify-center gap-6">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/20 shadow-sm flex items-center justify-center cursor-default hover:bg-primary/10 transition-colors group">
                    <Eye className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-medium text-xs">
                  <p>Visualizações do Perfil</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  {isPremium ? (
                    <button
                      onClick={() => toggleInvisibleMode(!isInvisibleMode)}
                      className={cn(
                        'w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 active:scale-95 group shadow-sm',
                        isInvisibleMode
                          ? 'bg-gold/10 border-gold/50 shadow-[0_0_15px_hsl(var(--gold)/0.3)] text-gold'
                          : 'bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary',
                      )}
                      aria-label="Toggle Invisible Mode"
                    >
                      <GhostEmojiIcon
                        active={isInvisibleMode}
                        className={cn(
                          'w-5 h-5 transition-all duration-300',
                          isInvisibleMode
                            ? 'drop-shadow-[0_0_8px_hsl(var(--gold)/0.6)] scale-110'
                            : 'opacity-90 group-hover:scale-110 group-hover:opacity-100',
                        )}
                      />
                    </button>
                  ) : (
                    <PaymentDialog
                      title="Desbloquear Modo Invisível"
                      price={19.9}
                      pointsPrice={1000}
                      onSuccess={() => {
                        upgradeToPremium()
                        toggleInvisibleMode(true)
                      }}
                    >
                      <button
                        className="w-12 h-12 rounded-full bg-primary/5 border border-primary/20 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 group relative outline-none shadow-sm"
                        aria-label="Unlock Invisible Mode"
                      >
                        <GhostEmojiIcon className="w-5 h-5 text-primary opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300" />
                        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow-sm border border-border group-hover:border-gold/50 transition-colors z-10">
                          <Crown className="w-3 h-3 text-gold fill-gold" />
                        </div>
                      </button>
                    </PaymentDialog>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="text-xs font-bold border-border/50 bg-background/95 backdrop-blur-md text-foreground shadow-xl rounded-lg py-2 px-3 flex items-center gap-2"
                >
                  {isInvisibleMode ? (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold shadow-[0_0_5px_hsl(var(--gold))]"></span>
                    </span>
                  ) : (
                    <span className="relative flex h-2 w-2 rounded-full bg-muted-foreground/50"></span>
                  )}
                  <span>
                    {isInvisibleMode
                      ? 'Modo Invisível: Ativado'
                      : 'Modo Invisível: Desativado'}
                  </span>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-12 h-12 rounded-full bg-red-500/5 border border-red-500/20 shadow-sm flex items-center justify-center cursor-default hover:bg-red-500/10 transition-colors group">
                    <Radio className="w-5 h-5 text-red-500 animate-pulse group-hover:scale-110 transition-transform" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-medium text-xs">
                  <p>Status: Ao Vivo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Daily Engagement Dashboard */}
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 delay-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Engajamento Diário
            </h3>

            <div className="flex items-center gap-3">
              {/* Admin Toggle */}
              <div className="flex items-center gap-2 bg-secondary/30 px-2.5 py-1 rounded-full border border-border/50">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  Admin: Lock
                </span>
                <Switch
                  checked={isPreviewLocked}
                  onCheckedChange={setIsPreviewLocked}
                  className="scale-75 data-[state=checked]:bg-gold"
                />
              </div>

              <Badge
                variant="outline"
                className={cn(
                  'text-[9px] uppercase tracking-widest',
                  !isPreviewLocked
                    ? 'text-gold border-gold/30 bg-gold/5 shadow-[0_0_10px_hsl(var(--gold)/0.1)]'
                    : 'text-muted-foreground border-border/50 bg-secondary/50',
                )}
              >
                {!isPreviewLocked ? 'Premium' : 'Básico'}
              </Badge>
            </div>
          </div>

          <Card className="border border-border/50 bg-secondary/10 shadow-sm relative overflow-hidden group/chart-card">
            {/* Locked State Overlay */}
            {isPreviewLocked && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[6px] p-6 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center mb-4 border border-gold/30 shadow-[0_0_20px_hsl(var(--gold)/0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold/20 animate-pulse blur-md" />
                  <Lock className="w-8 h-8 text-gold drop-shadow-md relative z-10" />
                </div>
                <h4 className="text-xl font-black text-foreground mb-2 drop-shadow-sm flex items-center gap-2">
                  Métricas Premium{' '}
                  <Crown className="w-5 h-5 text-gold fill-gold" />
                </h4>
                <p className="text-sm text-muted-foreground mb-6 max-w-[280px] leading-relaxed">
                  Desbloqueie o gráfico de engajamento diário, identifique
                  horários de pico e saiba exatamente como maximizar seu
                  alcance.
                </p>

                <PaymentDialog
                  title="Métricas de Engajamento Premium"
                  price={29.9}
                  pointsPrice={1500}
                  onSuccess={() => {
                    upgradeToPremium()
                    setIsPreviewLocked(false)
                  }}
                >
                  <Button className="bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-gold text-black font-bold w-full max-w-[240px] shadow-[0_4px_15px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_20px_hsl(var(--gold)/0.4)] transition-all duration-300 border border-yellow-400/50 group">
                    <Lock className="w-4 h-4 mr-2 group-hover:hidden" />
                    <Crown className="w-4 h-4 mr-2 hidden group-hover:block text-black fill-black" />
                    Desbloquear R$ 29,90
                  </Button>
                </PaymentDialog>
              </div>
            )}

            <CardContent
              className={cn(
                'p-4 pt-6 transition-all duration-500',
                isPreviewLocked &&
                  'opacity-30 grayscale-[0.8] blur-[4px] pointer-events-none select-none',
              )}
            >
              {/* Detailed Statistics Section */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col bg-secondary/20 p-3 rounded-xl border border-border/50 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Total Visitas Hoje
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    {totalVisitsToday}
                  </span>
                </div>
                <div className="flex flex-col bg-secondary/20 p-3 rounded-xl border border-border/50 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Horário de Pico
                  </span>
                  <span className="text-2xl font-black text-gold">
                    {peakHour.replace('h', ':00')}{' '}
                    <span className="text-xs font-medium text-muted-foreground">
                      - {(parseInt(peakHour) + 1).toString().padStart(2, '0')}
                      :00
                    </span>
                  </span>
                </div>
              </div>

              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <BarChart
                  data={DAILY_ENGAGEMENT_DATA}
                  margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                    opacity={0.4}
                  />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="text-[10px] font-medium fill-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickCount={4}
                    className="text-[10px] font-medium fill-muted-foreground"
                  />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        formatter={(value, _name, props) => {
                          const isPeak = props.payload.isPeak
                          return (
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'w-2 h-2 rounded-full',
                                  isPeak
                                    ? 'bg-gold shadow-[0_0_5px_hsl(var(--gold))]'
                                    : 'bg-primary',
                                )}
                              />
                              <span className="font-medium text-foreground">
                                {value} visitas
                              </span>
                              {isPeak && (
                                <span className="text-[10px] text-gold font-bold uppercase ml-1">
                                  Pico
                                </span>
                              )}
                            </div>
                          )
                        }}
                      />
                    }
                  />
                  <Bar dataKey="views" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {DAILY_ENGAGEMENT_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.isPeak
                            ? 'hsl(var(--gold))'
                            : 'hsl(var(--primary))'
                        }
                        className={cn(
                          'transition-all duration-300',
                          entry.isPeak &&
                            'drop-shadow-[0_-2px_8px_hsl(var(--gold)/0.4)]',
                        )}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Lists Area (Fully Unlocked) */}
        <div className="relative pb-10">
          <div className="space-y-4">
            {allViewers.map((viewer, index) => {
              const isFirstLive = viewer.isLive && index === 0
              const isFirstPast = !viewer.isLive && index === liveViewers.length
              const isVip = ['Scout', 'Coach', 'Sponsor'].includes(viewer.type)

              return (
                <div
                  key={viewer.id}
                  className="animate-in slide-in-from-bottom-2 fade-in duration-500"
                >
                  {isFirstLive && (
                    <h3 className="font-bold text-sm text-gold uppercase tracking-widest mb-3 flex items-center gap-2 drop-shadow-sm">
                      <Activity className="w-4 h-4 animate-pulse text-gold" />
                      Assistindo Agora
                    </h3>
                  )}
                  {isFirstPast && (
                    <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mt-6 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Últimos Visitantes
                    </h3>
                  )}

                  <Card
                    className={cn(
                      'border-none shadow-sm transition-all relative overflow-hidden cursor-pointer hover:scale-[1.02]',
                      viewer.isLive &&
                        !isVip &&
                        'ring-1 ring-gold/30 bg-gradient-to-r from-primary/5 to-transparent shadow-[0_0_15px_hsl(var(--primary)/0.05)]',
                      isVip &&
                        'ring-2 ring-purple-500/50 bg-gradient-to-r from-purple-500/10 to-gold/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]',
                    )}
                    onClick={() => {
                      navigate(`/profile/${viewer.id}`)
                    }}
                  >
                    <CardContent className="p-4 flex items-center gap-4 relative z-10">
                      {viewer.isLive && !isVip && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                      )}
                      {isVip && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                      )}

                      <div className="relative z-10">
                        <Avatar
                          className={cn(
                            'h-12 w-12 border-2',
                            viewer.isLive && !isVip
                              ? 'border-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)]'
                              : '',
                            isVip
                              ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                              : '',
                            !viewer.isLive && !isVip ? 'border-border' : '',
                          )}
                        >
                          <AvatarImage src={viewer.avatar} />
                          <AvatarFallback>
                            <User className="h-6 w-6 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        {viewer.isLive && (
                          <div
                            className={cn(
                              'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-background rounded-full animate-pulse',
                              isVip
                                ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                                : 'bg-gold shadow-[0_0_8px_hsl(var(--gold))]',
                            )}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 z-10">
                        <div className="flex justify-between items-start">
                          <p className="font-bold truncate flex items-center gap-1.5 text-foreground">
                            {viewer.name}
                            {isVip && (
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-purple-600 to-yellow-600 text-white border-none text-[9px] px-1.5 py-0 uppercase tracking-widest gap-0.5 shadow-sm"
                              >
                                <Crown className="w-2.5 h-2.5 fill-white" /> VIP
                              </Badge>
                            )}
                          </p>
                          <span
                            className={cn(
                              'whitespace-nowrap',
                              viewer.isLive
                                ? isVip
                                  ? 'text-[10px] font-black tracking-widest uppercase rounded-full px-2 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm'
                                  : 'text-[10px] font-black tracking-widest uppercase rounded-full px-2 py-0.5 bg-gold/10 text-gold border border-gold/20 shadow-sm'
                                : 'text-xs font-bold text-muted-foreground',
                            )}
                          >
                            {viewer.isLive ? 'Ao Vivo' : viewer.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p
                            className={cn(
                              'text-xs font-medium',
                              isVip
                                ? 'text-purple-600/80 dark:text-purple-400/80'
                                : 'text-muted-foreground',
                            )}
                          >
                            {viewer.type}
                          </p>
                          {!viewer.isLive && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/40" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
