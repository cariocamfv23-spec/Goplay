import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Eye,
  Crown,
  MapPin,
  BarChart3,
  Lock,
  Sparkles,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  Calendar,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { PaymentDialog } from '@/components/PaymentDialog'
import { cn } from '@/lib/utils'
import { AppIcon } from '@/components/AppIcon'
import { Badge } from '@/components/ui/badge'
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
import {
  mockProfileVisitors,
  VISITOR_STATS,
  ProfileVisitor,
  ProfileVisitorType,
} from '@/lib/profile-views-data'
import { ProfileViewerPaywallModal } from '@/components/ProfileViewerPaywallModal'

const DAILY_ENGAGEMENT_DATA = [
  { time: '00h', views: 18, isPeak: false },
  { time: '04h', views: 12, isPeak: false },
  { time: '08h', views: 45, isPeak: false },
  { time: '12h', views: 85, isPeak: false },
  { time: '16h', views: 124, isPeak: false },
  { time: '20h', views: 210, isPeak: true },
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

  const {
    isInvisibleMode,
    isPremium,
    toggleInvisibleMode,
    upgradeToPremium,
    isPreviewLocked,
  } = usePrivacyStore()

  const [activeFilter, setActiveFilter] = useState<'all' | ProfileVisitorType>(
    'all',
  )
  const [selectedVisitor, setSelectedVisitor] = useState<ProfileVisitor | null>(
    null,
  )
  const [isPaywallOpen, setIsPaywallOpen] = useState(false)

  const viewsThisWeek = VISITOR_STATS.viewsThisWeek
  const totalViews = VISITOR_STATS.totalViews
  const totalVisitsToday = DAILY_ENGAGEMENT_DATA.reduce(
    (acc, curr) => acc + curr.views,
    0,
  )
  const peakHour = DAILY_ENGAGEMENT_DATA.find((d) => d.isPeak)?.time || '20h'

  const filteredVisitors = mockProfileVisitors.filter((v) => {
    if (activeFilter === 'all') return true
    return v.type === activeFilter
  })

  const handleVisitorClick = (visitor: ProfileVisitor) => {
    setSelectedVisitor(visitor)
    setIsPaywallOpen(true)
  }

  const getTypeBadge = (type: ProfileVisitorType) => {
    switch (type) {
      case 'scout':
        return (
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px] gap-1">
            <Eye className="w-3 h-3" /> Olheiro / Scout
          </Badge>
        )
      case 'university':
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] gap-1">
            <GraduationCap className="w-3 h-3" /> Recrutador Universitário
          </Badge>
        )
      case 'team':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] gap-1">
            <Users className="w-3 h-3" /> Time / Clube
          </Badge>
        )
      default:
        return (
          <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30 text-[10px] gap-1">
            <ShieldCheck className="w-3 h-3" /> Visitante Verificado
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-40 w-full h-16 bg-background/85 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <AppIcon className="w-6 h-6" />
            <h1 className="font-bold text-lg">Quem Viu Seu Perfil</h1>
          </div>
        </div>

        {isPremium ? (
          <Badge className="bg-gold/20 text-gold border-gold/40 gap-1 text-xs">
            <Crown className="w-3.5 h-3.5 fill-gold text-gold" /> Premium Ativo
          </Badge>
        ) : (
          <Button
            size="sm"
            onClick={() => {
              setSelectedVisitor(mockProfileVisitors[0])
              setIsPaywallOpen(true)
            }}
            className="h-8 text-xs font-black bg-gradient-to-r from-gold to-amber-600 hover:from-amber-500 hover:to-gold text-black border border-yellow-300/40 gap-1 shadow-sm"
          >
            <Crown className="w-3.5 h-3.5 fill-black text-black" />
            Assinar Premium
          </Button>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Banner LinkedIn Upsell Header */}
        {!isPremium && (
          <Card className="border border-gold/40 bg-gradient-to-br from-primary/15 via-purple-900/15 to-amber-950/20 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/15 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <CardContent className="p-4 sm:p-5 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-gold/20 text-gold">
                    <Crown className="w-4 h-4 fill-gold text-gold" />
                  </span>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gold">
                    Funcionalidade Premium Goplay
                  </span>
                </div>
                <h2 className="text-lg font-black text-foreground">
                  Olheiros e Recrutadores viram você esta semana!
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                  Saiba quais clubes da elite, recrutadores de universidades
                  americanas com ofertas de bolsa e times adversários estão de
                  olho no seu desempenho.
                </p>
              </div>

              <Button
                onClick={() => {
                  setSelectedVisitor(mockProfileVisitors[0])
                  setIsPaywallOpen(true)
                }}
                className="w-full sm:w-auto h-10 px-5 text-xs font-black bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-gold text-black shadow-md border border-yellow-300/50 shrink-0 gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-black" />
                Desbloquear Identidades
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Global Counter & Metrics Action Bar */}
        <div className="flex flex-col gap-4 bg-secondary/30 rounded-2xl p-5 border border-border/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground font-medium">
                Visualizações Totais
              </p>
              <h2 className="text-3xl font-black text-foreground">
                {totalViews}
              </h2>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-background px-3 py-1.5 rounded-full text-xs font-bold border border-border/50 shadow-sm flex items-center gap-1.5">
                <span className="text-primary font-black">
                  +{viewsThisWeek}
                </span>{' '}
                esta semana
              </div>
              {isInvisibleMode && (
                <Badge
                  variant="outline"
                  className="text-[9px] text-gold border-gold/30 bg-gold/5 shadow-[0_0_10px_hsl(var(--gold)/0.1)] uppercase tracking-widest px-1.5 py-0"
                >
                  Navegação Invisível
                </Badge>
              )}
            </div>
          </div>

          <div className="h-px w-full bg-border/50 my-1" />

          {/* Breakdown cards: Scouts, Universities, Teams */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block">
                Olheiros
              </span>
              <span className="text-xl font-black text-foreground">
                {VISITOR_STATS.scoutsCount}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block">
                Bolsas de Estudo
              </span>
              <span className="text-xl font-black text-foreground">
                {VISITOR_STATS.universitiesCount}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                Outros Times
              </span>
              <span className="text-xl font-black text-foreground">
                {VISITOR_STATS.teamsCount}
              </span>
            </div>
          </div>

          {/* Actions: Eye, Invisible Mode Toggle, Status */}
          <div className="flex items-center justify-center gap-6 pt-2">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-11 h-11 rounded-full bg-primary/5 border border-primary/20 shadow-sm flex items-center justify-center cursor-default">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  <p>Métricas de Visualização</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  {isPremium ? (
                    <button
                      onClick={() => toggleInvisibleMode(!isInvisibleMode)}
                      className={cn(
                        'w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm',
                        isInvisibleMode
                          ? 'bg-gold/15 border-gold/50 shadow-[0_0_15px_hsl(var(--gold)/0.3)] text-gold'
                          : 'bg-primary/5 border-primary/20 text-primary',
                      )}
                    >
                      <GhostEmojiIcon
                        active={isInvisibleMode}
                        className="w-5 h-5"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedVisitor(mockProfileVisitors[0])
                        setIsPaywallOpen(true)
                      }}
                      className="w-11 h-11 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center relative group"
                    >
                      <GhostEmojiIcon className="w-5 h-5 text-primary opacity-80" />
                      <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border border-border">
                        <Crown className="w-3 h-3 text-gold fill-gold" />
                      </div>
                    </button>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  <p>
                    {isPremium
                      ? isInvisibleMode
                        ? 'Modo Invisível Ativo'
                        : 'Ativar Modo Invisível'
                      : 'Modo Invisível (Exclusivo Premium)'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0 font-medium mr-1">
            <Filter className="w-3 h-3" /> Filtrar:
          </span>
          <Button
            size="sm"
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
            className="h-8 text-xs rounded-full shrink-0"
          >
            Todos ({mockProfileVisitors.length})
          </Button>
          <Button
            size="sm"
            variant={activeFilter === 'scout' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('scout')}
            className="h-8 text-xs rounded-full shrink-0 gap-1.5"
          >
            <Eye className="w-3 h-3" /> Olheiros & Scouts
          </Button>
          <Button
            size="sm"
            variant={activeFilter === 'university' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('university')}
            className="h-8 text-xs rounded-full shrink-0 gap-1.5"
          >
            <GraduationCap className="w-3 h-3" /> Faculdades & Bolsas
          </Button>
          <Button
            size="sm"
            variant={activeFilter === 'team' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('team')}
            className="h-8 text-xs rounded-full shrink-0 gap-1.5"
          >
            <Users className="w-3 h-3" /> Times & Clubes
          </Button>
        </div>

        {/* Visitors List with Masking & Paywall Trigger */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Visitantes que olharam você
            </h3>
            {!isPremium && (
              <span className="text-xs text-gold font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Nomes Ocultos
              </span>
            )}
          </div>

          <div className="space-y-3">
            {filteredVisitors.map((visitor) => {
              return (
                <Card
                  key={visitor.id}
                  onClick={() => handleVisitorClick(visitor)}
                  className={cn(
                    'border transition-all duration-200 cursor-pointer overflow-hidden relative hover:scale-[1.01]',
                    'bg-card hover:bg-secondary/20 border-border/60 shadow-sm',
                    visitor.isLive && 'ring-1 ring-gold/40 border-gold/30',
                  )}
                >
                  <CardContent className="p-4 flex items-center gap-4 relative z-10">
                    <div className="relative shrink-0">
                      <Avatar className="h-14 w-14 border-2 border-primary/30 shadow-md">
                        <AvatarImage
                          src={visitor.avatar}
                          className={cn(
                            !isPremium && 'blur-[4px] grayscale transition-all',
                          )}
                        />
                        <AvatarFallback className="font-bold">
                          {visitor.name[0]}
                        </AvatarFallback>
                      </Avatar>

                      {visitor.isLive && (
                        <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold border-2 border-background" />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        {getTypeBadge(visitor.type)}
                        <span className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                          {visitor.date}
                        </span>
                      </div>

                      {isPremium ? (
                        <>
                          <h4 className="font-black text-sm text-foreground truncate flex items-center gap-1.5">
                            {visitor.name}
                            {visitor.verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
                            )}
                          </h4>
                          <p className="text-xs text-primary font-medium truncate flex items-center gap-1">
                            <Building2 className="w-3 h-3" />{' '}
                            {visitor.organization}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {visitor.role} • {visitor.location}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-foreground/90 select-none">
                              {visitor.type === 'scout'
                                ? 'Olheiro de Clube da Série A'
                                : visitor.type === 'university'
                                  ? 'Recrutador de Universidade Americana'
                                  : 'Comissão Técnica de Clube Rival'}
                            </h4>
                            <div className="flex items-center gap-2">
                              <div className="h-3.5 w-32 bg-muted-foreground/25 rounded blur-[3px]" />
                              <span className="text-[10px] text-muted-foreground italic">
                                (bloqueado)
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Visited count note */}
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground">
                        <span>
                          Visitou seu perfil{' '}
                          <strong>{visitor.visitsCount}x</strong>
                        </span>
                        {visitor.scholarshipOffer && (
                          <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                            • Oferta de Bolsa disponível
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {!isPremium ? (
                        <Button
                          size="sm"
                          className="h-8 px-3 rounded-full text-xs font-bold bg-gold/15 text-gold hover:bg-gold/25 border border-gold/40"
                        >
                          <Lock className="w-3 h-3 mr-1" /> Ver
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-xs font-bold text-primary"
                        >
                          Contatar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Daily Engagement Chart */}
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 delay-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Engajamento Diário
            </h3>

            <Badge
              variant="outline"
              className={cn(
                'text-[9px] uppercase tracking-widest',
                !isPreviewLocked
                  ? 'text-gold border-gold/30 bg-gold/5'
                  : 'text-muted-foreground border-border/50 bg-secondary/50',
              )}
            >
              {!isPreviewLocked ? 'Premium' : 'Básico'}
            </Badge>
          </div>

          <Card className="border border-border/50 bg-secondary/10 shadow-sm relative overflow-hidden">
            {isPreviewLocked && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[6px] p-6 text-center animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center mb-3 border border-gold/30 shadow-md">
                  <Lock className="w-7 h-7 text-gold" />
                </div>
                <h4 className="text-lg font-black text-foreground mb-1">
                  Métricas Detalhadas Premium
                </h4>
                <p className="text-xs text-muted-foreground mb-4 max-w-[260px] leading-relaxed">
                  Identifique horários de pico dos olheiros e planeje suas
                  postagens de lances.
                </p>

                <PaymentDialog
                  title="Métricas de Engajamento Premium"
                  price={29.9}
                  pointsPrice={1500}
                  onSuccess={() => upgradeToPremium()}
                >
                  <Button className="bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-gold text-black font-bold h-10 px-5 shadow-md border border-yellow-400/50">
                    <Crown className="w-4 h-4 mr-1.5 fill-black text-black" />
                    Desbloquear R$ 29,90
                  </Button>
                </PaymentDialog>
              </div>
            )}

            <CardContent
              className={cn(
                'p-4 pt-6 transition-all duration-500',
                isPreviewLocked &&
                  'opacity-30 grayscale blur-[3px] pointer-events-none select-none',
              )}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col bg-secondary/20 p-3 rounded-xl border border-border/50 shadow-sm">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Total Visitas Hoje
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    {totalVisitsToday}
                  </span>
                </div>
                <div className="flex flex-col bg-secondary/20 p-3 rounded-xl border border-border/50 shadow-sm">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    Horário de Pico
                  </span>
                  <span className="text-2xl font-black text-gold">
                    {peakHour}
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
                                  isPeak ? 'bg-gold' : 'bg-primary',
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
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Viewer Paywall Modal */}
      <ProfileViewerPaywallModal
        visitor={selectedVisitor}
        open={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </div>
  )
}
