import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Trophy,
  MapPin,
  Clock,
  Calendar,
  Layers,
  Scale,
  Shuffle,
  Globe,
  Star,
  TrendingUp,
  Zap,
  ChevronRight,
  History,
  CheckCircle2,
  Radio,
  Flag,
  Megaphone,
  Sparkles,
} from 'lucide-react'
import { TransportMenu } from '@/components/TransportMenu'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import {
  MOCK_TEAMS,
  MOCK_FIELDS,
  MOCK_MATCH_HISTORY,
  MOCK_SCHEDULED,
  MY_TEAM,
  MODALITIES,
  CATEGORIES,
  MATCHMAKING_MODES,
  getMatchmakingScore,
  getFormColor,
  getWinRate,
  type Modality,
  type Category,
  type MatchmakingMode,
  type MatchTeam,
  type MatchField,
  type VisitorChecklistState,
  type SuggestionResult,
} from '@/lib/matchmaking-data'
import {
  MatchConfigCard,
  type MatchConfigState,
} from '@/components/matchmaking/MatchConfigCard'
import { VisitorChecklist } from '@/components/matchmaking/VisitorChecklist'
import { MatchFinancialsCard } from '@/components/matchmaking/MatchFinancialsCard'
import { TeamRoleBadge } from '@/components/matchmaking/TeamRoleBadge'
import { SuggestOpponentDialog } from '@/components/matchmaking/SuggestOpponentDialog'
import {
  MatchConfirmationCard,
  type ConfirmedMatch,
} from '@/components/matchmaking/MatchConfirmationCard'

const MODE_ICONS: Record<string, typeof Scale> = {
  scale: Scale,
  shuffle: Shuffle,
  globe: Globe,
}

function TeamFormBadge({ form }: { form: ('W' | 'L' | 'D')[] }) {
  return (
    <div className="flex gap-1">
      {form.map((r, i) => (
        <span
          key={i}
          className={cn(
            'w-5 h-5 rounded flex items-center justify-center text-[10px] font-black',
            getFormColor(r),
          )}
        >
          {r}
        </span>
      ))}
    </div>
  )
}

function ModalitySelector({
  value,
  onChange,
}: {
  value: Modality
  onChange: (m: Modality) => void
}) {
  return (
    <div className="flex gap-2">
      {MODALITIES.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border transition-all',
            value === m.id
              ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.1)] shadow-[0_0_12px_hsl(var(--gold)/0.2)]'
              : 'border-border/30 bg-secondary/20 hover:border-border/60',
          )}
        >
          <span
            className={cn(
              'text-sm font-black uppercase tracking-wider',
              value === m.id ? 'text-[hsl(var(--gold))]' : 'text-foreground',
            )}
          >
            {m.label}
          </span>
          <span className="text-[9px] text-muted-foreground font-medium">
            {m.sublabel}
          </span>
        </button>
      ))}
    </div>
  )
}

function CategorySelector({
  value,
  onChange,
}: {
  value: Category
  onChange: (c: Category) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={cn(
            'shrink-0 flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-full border transition-all',
            value === c.id
              ? 'border-primary bg-primary/10'
              : 'border-border/30 bg-secondary/20 hover:border-border/60',
          )}
        >
          <span
            className={cn(
              'text-xs font-bold uppercase tracking-wider',
              value === c.id ? 'text-primary' : 'text-foreground',
            )}
          >
            {c.label}
          </span>
          <span className="text-[8px] text-muted-foreground">{c.sublabel}</span>
        </button>
      ))}
    </div>
  )
}

function MatchmakingModeSelector({
  value,
  onChange,
}: {
  value: MatchmakingMode
  onChange: (m: MatchmakingMode) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {MATCHMAKING_MODES.map((mode) => {
        const Icon = MODE_ICONS[mode.icon] || Scale
        const isActive = value === mode.id
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={cn(
              'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center',
              isActive
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border/30 bg-secondary/20 hover:border-border/60',
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                isActive
                  ? 'bg-primary/20 text-primary'
                  : 'bg-secondary/40 text-muted-foreground',
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span
              className={cn(
                'text-[11px] font-bold uppercase tracking-wider',
                isActive ? 'text-primary' : 'text-foreground',
              )}
            >
              {mode.label}
            </span>
            <span className="text-[8px] text-muted-foreground leading-tight line-clamp-2">
              {mode.description}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function TeamCard({
  team,
  matchScore,
  onChallenge,
}: {
  team: MatchTeam
  matchScore: number
  onChallenge: (team: MatchTeam) => void
}) {
  const winRate = getWinRate(team)
  return (
    <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg group relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/20 transition-colors" />
      <CardContent className="p-4 relative z-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-secondary/40 flex items-center justify-center overflow-hidden border border-border/50 shrink-0">
            <img
              src={team.logo}
              alt={team.name}
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-sm text-foreground uppercase tracking-wider truncate">
              {team.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <Badge
                variant="secondary"
                className="text-[9px] uppercase font-bold px-1.5 py-0"
              >
                {team.category}
              </Badge>
              <Badge
                variant="outline"
                className="text-[9px] uppercase font-bold px-1.5 py-0"
              >
                {team.modality}
              </Badge>
              <span className="text-[9px] text-muted-foreground font-bold uppercase">
                {team.ageRange} anos
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
              Match Score
            </span>
            <span
              className={cn(
                'text-xl font-black tabular-nums',
                matchScore >= 80
                  ? 'text-green-500'
                  : matchScore >= 60
                    ? 'text-yellow-500'
                    : 'text-red-500',
              )}
            >
              {matchScore}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-background/40 rounded-lg p-2 text-center border border-border/20">
            <span className="block font-black text-sm text-green-500">
              {team.wins}V
            </span>
            <span className="text-[8px] text-muted-foreground uppercase">
              Vitórias
            </span>
          </div>
          <div className="bg-background/40 rounded-lg p-2 text-center border border-border/20">
            <span className="block font-black text-sm text-red-500">
              {team.losses}D
            </span>
            <span className="text-[8px] text-muted-foreground uppercase">
              Derrotas
            </span>
          </div>
          <div className="bg-background/40 rounded-lg p-2 text-center border border-border/20">
            <span className="block font-black text-sm text-yellow-500">
              {team.draws}E
            </span>
            <span className="text-[8px] text-muted-foreground uppercase">
              Empates
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-muted-foreground">
              Skill: <span className="text-foreground">{team.skillRating}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[10px] font-bold text-muted-foreground">
              WR: <span className="text-foreground">{winRate}%</span>
            </span>
          </div>
          <TeamFormBadge form={team.recentForm} />
        </div>

        <div className="flex items-center gap-1.5 mb-3 text-[10px] text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate font-medium">{team.region}</span>
          <span className="w-1 h-1 rounded-full bg-border shrink-0" />
          <span className="font-bold text-foreground shrink-0">
            {team.distanceKm} km
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <TeamRoleBadge role="home" />
          <span className="text-[9px] text-muted-foreground font-bold">vs</span>
          <TeamRoleBadge role="visitor" />
        </div>

        <Button
          onClick={() => onChallenge(team)}
          className="w-full h-9 text-xs font-black uppercase tracking-widest"
          size="sm"
        >
          <Zap className="w-3.5 h-3.5 mr-1" />
          Desafiar como Mandante
        </Button>
      </CardContent>
    </Card>
  )
}

function FieldCard({
  field,
  onSelect,
}: {
  field: MatchField
  onSelect: (f: MatchField) => void
}) {
  return (
    <Card
      className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg group cursor-pointer"
      onClick={() => onSelect(field)}
    >
      <div className="relative h-36">
        <img
          src={field.image}
          alt={field.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <Badge
            className={cn(
              'text-[9px] uppercase font-black px-2 py-0.5',
              field.fieldType === 'sintetico'
                ? 'bg-green-500 text-white'
                : 'bg-orange-600 text-white',
            )}
          >
            {field.fieldType === 'sintetico' ? 'Sintético' : 'Terrão'}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
          <span className="text-[10px] font-bold text-white flex items-center gap-1">
            <Clock className="w-3 h-3 text-[hsl(var(--gold))]" />
            {field.startTime}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-black text-sm text-white uppercase tracking-wider truncate drop-shadow-md">
            {field.name}
          </h3>
          <p className="text-[10px] text-white/80 flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 shrink-0" />
            {field.address}
          </p>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-muted-foreground">
              {field.region}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[10px] font-bold text-primary">
              {field.distanceKm} km
            </span>
          </div>
          <span className="text-xs font-black text-[hsl(var(--gold))]">
            {field.pricePerHour}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {field.amenities.slice(0, 4).map((a) => (
            <Badge
              key={a}
              variant="secondary"
              className="text-[8px] px-1.5 py-0 font-medium bg-background/40"
            >
              {a}
            </Badge>
          ))}
        </div>
        <TransportMenu
          location={{
            address: field.address,
            lat: field.lat,
            lng: field.lng,
            name: field.name,
          }}
          label="Como Chegar"
        />
      </CardContent>
    </Card>
  )
}

function ScheduledMatchCard({ match }: { match: (typeof MOCK_SCHEDULED)[0] }) {
  const [visitorChecklist, setVisitorChecklist] =
    useState<VisitorChecklistState>(match.visitorChecklist)

  return (
    <Card className="border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-lg">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-wider">
              {match.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-xs font-bold text-[hsl(var(--gold))] flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              {match.startTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {match.config.hasReferee && (
              <Badge className="text-[8px] uppercase font-black px-1.5 py-0 bg-primary/15 text-primary border-none">
                <Megaphone className="w-2.5 h-2.5 mr-0.5" /> Árbitro
              </Badge>
            )}
            <Badge variant="outline" className="text-[9px] uppercase font-bold">
              {match.field.fieldType === 'sintetico' ? 'Sintético' : 'Terrão'}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src={match.teamA.logo}
              alt={match.teamA.name}
              className="w-10 h-10 rounded-full bg-secondary/40 p-1 border border-border/50"
            />
            <div className="min-w-0">
              <TeamRoleBadge role="home" />
              <span className="text-xs font-bold truncate block mt-0.5">
                {match.teamA.name}
              </span>
            </div>
          </div>
          <span className="text-xs font-black text-muted-foreground px-2">
            VS
          </span>
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <div className="min-w-0 text-right">
              <TeamRoleBadge role="visitor" className="ml-auto" />
              <span className="text-xs font-bold truncate block mt-0.5">
                {match.teamB.name}
              </span>
            </div>
            <img
              src={match.teamB.logo}
              alt={match.teamB.name}
              className="w-10 h-10 rounded-full bg-secondary/40 p-1 border border-border/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-background/30 rounded-lg p-2">
          <MapPin className="w-3 h-3 text-primary shrink-0" />
          <span className="truncate font-medium">
            {match.field.name} — {match.field.address}
          </span>
        </div>

        <MatchFinancialsCard
          config={match.config}
          visitorChecklist={visitorChecklist}
        />

        <VisitorChecklist
          initial={visitorChecklist}
          onChange={setVisitorChecklist}
        />

        <TransportMenu
          location={{
            address: match.field.address,
            lat: match.field.lat,
            lng: match.field.lng,
            name: match.field.name,
          }}
          label="Ir para o Local"
        />
      </CardContent>
    </Card>
  )
}

function HistoryRow({ entry }: { entry: (typeof MOCK_MATCH_HISTORY)[0] }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border/20 bg-secondary/10 hover:bg-secondary/20 transition-colors">
      <div className="w-10 h-10 rounded-full bg-secondary/40 flex items-center justify-center overflow-hidden border border-border/50 shrink-0">
        <img
          src={entry.opponentLogo}
          alt={entry.opponent}
          className="w-7 h-7 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-bold truncate block">
          {entry.opponent}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] text-muted-foreground">
            {entry.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-[10px] text-muted-foreground uppercase font-bold">
            {entry.fieldType === 'sintetico' ? 'Sintético' : 'Terrão'}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span
          className={cn(
            'text-lg font-black tabular-nums',
            entry.result === 'win'
              ? 'text-green-500'
              : entry.result === 'loss'
                ? 'text-red-500'
                : 'text-yellow-500',
          )}
        >
          {entry.scoreTeam} - {entry.scoreOpponent}
        </span>
        <Badge
          variant="outline"
          className={cn(
            'text-[8px] uppercase font-black px-1.5 py-0',
            entry.result === 'win'
              ? 'border-green-500/30 text-green-500 bg-green-500/10'
              : entry.result === 'loss'
                ? 'border-red-500/30 text-red-500 bg-red-500/10'
                : 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10',
          )}
        >
          {entry.result === 'win'
            ? 'Vitória'
            : entry.result === 'loss'
              ? 'Derrota'
              : 'Empate'}
        </Badge>
      </div>
    </div>
  )
}

export default function Matchmaking() {
  const navigate = useNavigate()
  const [modality, setModality] = useState<Modality>('society')
  const [category, setCategory] = useState<Category>('competitivo')
  const [mode, setMode] = useState<MatchmakingMode>('balanced')
  const [maxDistance, setMaxDistance] = useState(50)
  const [selectedField, setSelectedField] = useState<MatchField | null>(null)
  const [matchConfig, setMatchConfig] = useState<MatchConfigState>({
    hasReferee: true,
    fieldFee: '220',
    refereeFee: '80',
    paymentResponsibility: 'split',
  })
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [acceptedSuggestion, setAcceptedSuggestion] =
    useState<SuggestionResult | null>(null)
  const [confirmedMatches, setConfirmedMatches] = useState<ConfirmedMatch[]>([])

  const filteredTeams = useMemo(() => {
    let teams = MOCK_TEAMS.filter((t) => t.modality === modality)
    if (mode === 'balanced') {
      teams = teams.filter((t) => t.distanceKm <= maxDistance)
    } else if (mode === 'random') {
      teams = [...teams].sort(() => Math.random() - 0.5)
    } else if (mode === 'varied') {
      teams = [...teams].sort((a, b) => a.distanceKm - b.distanceKm)
    }

    if (mode !== 'balanced') return teams

    return [...teams]
      .map((t) => ({ team: t, score: getMatchmakingScore(t, MY_TEAM) }))
      .sort((a, b) => b.score - a.score)
      .map(({ team }) => team)
  }, [modality, mode, maxDistance])

  const filteredFields = useMemo(() => {
    return MOCK_FIELDS.filter((f) => f.distanceKm <= maxDistance).sort(
      (a, b) => a.distanceKm - b.distanceKm,
    )
  }, [maxDistance])

  const handleChallenge = useCallback(
    (team: MatchTeam) => {
      const field = selectedField ?? MOCK_FIELDS[0]
      const confirmed: ConfirmedMatch = {
        id: `confirmed-${Date.now()}`,
        teamA: MY_TEAM,
        teamB: team,
        field,
        date: '20 Jun 2026',
        startTime: field.startTime,
        config: matchConfig,
        visitorChecklist: { arrived: false, onTime: false },
      }
      setConfirmedMatches((prev) => [confirmed, ...prev])
      toast.success(`Acordo fechado com ${team.name}!`, {
        description:
          'Mandante: Red Wolves FC · Visitante: ' +
          team.name +
          '. Confira o resumo do acordo no topo da tela.',
      })
    },
    [selectedField, matchConfig],
  )

  const handleSelectField = useCallback((field: MatchField) => {
    setSelectedField(field)
    toast.info(`Campo selecionado: ${field.name}`, {
      description: `Horário sem atraso: ${field.startTime} | ${field.fieldType === 'sintetico' ? 'Sintético' : 'Terrão'}`,
    })
  }, [])

  const handleAcceptSuggestion = useCallback(
    (result: SuggestionResult, config: MatchConfigState) => {
      setAcceptedSuggestion(result)
      setMatchConfig(config)
      setSelectedField(result.field)
      const confirmed: ConfirmedMatch = {
        id: `confirmed-${Date.now()}`,
        teamA: MY_TEAM,
        teamB: result.team,
        field: result.field,
        date: '20 Jun 2026',
        startTime: result.field.startTime,
        config,
        visitorChecklist: { arrived: false, onTime: false },
      }
      setConfirmedMatches((prev) => [confirmed, ...prev])
      toast.success(`Acordo fechado com ${result.team.name}!`, {
        description: `Campo: ${result.field.name} · Taxa: R$ ${result.fieldFee} · Match Score: ${result.score}% · Confira o resumo no topo da tela.`,
      })
    },
    [],
  )

  return (
    <div className="min-h-screen bg-background pb-32 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" />
      </div>

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
              Matchmaking
            </h1>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Smart Game Scheduler
            </span>
          </div>
          <div className="w-10 shrink-0" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="px-4 mt-6 animate-in fade-in duration-700">
          <Card className="border-[hsl(var(--gold)/0.3)] bg-black/40 overflow-hidden relative shadow-[0_0_20px_hsl(var(--gold)/0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--gold)/0.1),transparent_70%)] pointer-events-none" />
            <CardContent className="p-5 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--gold))/0.1] flex items-center justify-center border border-[hsl(var(--gold))/0.2]">
                  <Trophy className="w-6 h-6 text-[hsl(var(--gold))]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-base font-black uppercase tracking-wider text-foreground">
                      {MY_TEAM.name}
                    </h2>
                    <TeamRoleBadge role="home" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge
                      variant="secondary"
                      className="text-[9px] uppercase font-bold px-1.5 py-0"
                    >
                      {MY_TEAM.skillRating} SR
                    </Badge>
                    <span className="text-[9px] text-muted-foreground font-bold">
                      {MY_TEAM.wins}V · {MY_TEAM.losses}D · {MY_TEAM.draws}E
                    </span>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                    Win Rate
                  </span>
                  <span className="text-xl font-black text-[hsl(var(--gold))]">
                    {getWinRate(MY_TEAM)}%
                  </span>
                </div>
              </div>
              <TeamFormBadge form={MY_TEAM.recentForm} />
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mt-6 animate-in fade-in duration-700">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Modalidade
          </h3>
          <ModalitySelector value={modality} onChange={setModality} />
        </div>

        <div className="px-4 mt-5 animate-in fade-in duration-700">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" /> Categoria
          </h3>
          <CategorySelector value={category} onChange={setCategory} />
        </div>

        <div className="px-4 mt-5 animate-in fade-in duration-700">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" /> Modo de Matchmaking
          </h3>
          <MatchmakingModeSelector value={mode} onChange={setMode} />
        </div>

        <div className="px-4 mt-5 animate-in fade-in duration-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Distância Máxima
            </h3>
            <span className="text-xs font-black text-primary">
              {maxDistance} km
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={50}
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="flex-1 accent-primary h-1.5 rounded-full bg-secondary"
            />
            <Select
              value={String(maxDistance)}
              onValueChange={(v) => setMaxDistance(Number(v))}
            >
              <SelectTrigger className="w-[90px] h-8 rounded-full bg-secondary/30 border-border/30 text-xs font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 50].map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d} km
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="px-4 mt-5 animate-in fade-in duration-700">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
            <Megaphone className="w-3.5 h-3.5" /> Gestão da Partida
          </h3>
          <MatchConfigCard config={matchConfig} onChange={setMatchConfig} />
        </div>

        <div className="px-4 mt-5 animate-in fade-in duration-700">
          <Button
            onClick={() => setSuggestOpen(true)}
            className="w-full h-12 text-sm font-black uppercase tracking-widest bg-gradient-to-r from-primary to-[hsl(var(--gold))] hover:opacity-90 border-none shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-1.5" /> Sugerir Adversário
          </Button>
          {acceptedSuggestion && (
            <div className="mt-3 rounded-xl border border-green-500/30 bg-green-500/10 p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-[10px] font-bold text-green-500 truncate">
                {acceptedSuggestion.team.name} selecionado ·{' '}
                {acceptedSuggestion.field.name}
              </span>
            </div>
          )}
        </div>

        {confirmedMatches.length > 0 && (
          <div className="px-4 mt-6 space-y-4 animate-in fade-in duration-700">
            <h3 className="text-xs font-black uppercase tracking-widest text-green-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Acordos Fechados
            </h3>
            {confirmedMatches.map((match) => (
              <MatchConfirmationCard key={match.id} match={match} />
            ))}
          </div>
        )}

        <Tabs defaultValue="teams" className="w-full mt-8">
          <div className="px-4">
            <TabsList className="w-full">
              <TabsTrigger value="teams" className="flex-1">
                <Zap className="w-3.5 h-3.5 mr-1" /> Equipes
              </TabsTrigger>
              <TabsTrigger value="fields" className="flex-1">
                <MapPin className="w-3.5 h-3.5 mr-1" /> Campos
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="flex-1">
                <Calendar className="w-3.5 h-3.5 mr-1" /> Agendados
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                <History className="w-3.5 h-3.5 mr-1" /> Histórico
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="teams" className="mt-4 animate-in fade-in">
            <div className="px-4 mb-4">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
                    Equipes Recomendadas
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium">
                    {filteredTeams.length} equipes compatíveis encontradas
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 flex flex-col gap-3">
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    matchScore={getMatchmakingScore(team, MY_TEAM)}
                    onChallenge={handleChallenge}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
                  Nenhuma equipe encontrada para os filtros selecionados.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="fields" className="mt-4 animate-in fade-in">
            <div className="px-4 mb-4">
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
                Campos Disponíveis
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Sintético e Terrão com horário sem atraso
              </p>
            </div>
            <div className="px-4 flex flex-col gap-4">
              {filteredFields.map((field) => (
                <FieldCard
                  key={field.id}
                  field={field}
                  onSelect={handleSelectField}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-4 animate-in fade-in">
            <div className="px-4 mb-4">
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground flex items-center gap-2">
                <Radio className="w-5 h-5 text-green-500 animate-pulse" />
                Partidas Agendadas
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                {MOCK_SCHEDULED.length} jogos confirmados
              </p>
            </div>
            <div className="px-4 flex flex-col gap-3">
              {MOCK_SCHEDULED.map((match) => (
                <ScheduledMatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4 animate-in fade-in">
            <div className="px-4 mb-4">
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground">
                Histórico Completo
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                {MOCK_MATCH_HISTORY.length} partidas registradas
              </p>
            </div>
            <div className="px-4 flex flex-col gap-3">
              {MOCK_MATCH_HISTORY.map((entry) => (
                <HistoryRow key={entry.id} entry={entry} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <SuggestOpponentDialog
        open={suggestOpen}
        onOpenChange={setSuggestOpen}
        modality={modality}
        onAccept={handleAcceptSuggestion}
      />
    </div>
  )
}
