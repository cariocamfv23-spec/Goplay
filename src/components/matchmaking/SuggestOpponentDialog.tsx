import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Sparkles,
  Loader2,
  MapPin,
  Coins,
  Check,
  Zap,
  Target,
  Crown,
} from 'lucide-react'
import {
  getWinRate,
  suggestOpponent,
  type SuggestionResult,
  type Modality,
} from '@/lib/matchmaking-data'
import { TeamRoleBadge } from '@/components/matchmaking/TeamRoleBadge'
import type { MatchConfigState } from '@/components/matchmaking/MatchConfigCard'

type SearchState = 'idle' | 'searching' | 'result' | 'no-result'
type SkillTolerance = 'precise' | 'balanced' | 'wide'

interface SuggestOpponentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  modality: Modality
  onAccept: (result: SuggestionResult, config: MatchConfigState) => void
}

const SKILL_OPTIONS: { id: SkillTolerance; label: string; desc: string }[] = [
  { id: 'precise', label: 'Preciso', desc: '±50 SR' },
  { id: 'balanced', label: 'Equilibrado', desc: '±100 SR' },
  { id: 'wide', label: 'Amplo', desc: '±200 SR' },
]

export function SuggestOpponentDialog({
  open,
  onOpenChange,
  modality,
  onAccept,
}: SuggestOpponentDialogProps) {
  const [maxDistance, setMaxDistance] = useState(20)
  const [maxBudget, setMaxBudget] = useState(250)
  const [skillTolerance, setSkillTolerance] =
    useState<SkillTolerance>('balanced')
  const [searchState, setSearchState] = useState<SearchState>('idle')
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null)

  useEffect(() => {
    if (!open) {
      setSearchState('idle')
      setSuggestion(null)
    }
  }, [open])

  const handleSearch = useCallback(() => {
    setSearchState('searching')
    setSuggestion(null)
    setTimeout(() => {
      const result = suggestOpponent(
        modality,
        maxDistance,
        maxBudget,
        skillTolerance,
      )
      setSearchState(result ? 'result' : 'no-result')
      setSuggestion(result)
    }, 2200)
  }, [modality, maxDistance, maxBudget, skillTolerance])

  const handleAccept = useCallback(() => {
    if (!suggestion) return
    onAccept(suggestion, {
      hasReferee: true,
      fieldFee: suggestion.fieldFee,
      refereeFee: suggestion.refereeFee,
      paymentResponsibility: 'split',
    })
    onOpenChange(false)
  }, [suggestion, onAccept, onOpenChange])

  const winRate = suggestion ? getWinRate(suggestion.team) : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-background border-border/30 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-black uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-[hsl(var(--gold))]" />
            Sugerir Adversário
          </DialogTitle>
          <DialogDescription className="text-xs">
            Encontre o oponente ideal baseado em nível, localização e orçamento.
          </DialogDescription>
        </DialogHeader>

        {searchState === 'idle' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Distância Máxima
                </label>
                <span className="text-xs font-black text-primary">
                  {maxDistance} km
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-primary h-1.5 rounded-full bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" /> Orçamento Máx. (Campo/h)
                </label>
                <span className="text-xs font-black text-[hsl(var(--gold))]">
                  R$ {maxBudget}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={400}
                step={10}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[hsl(var(--gold))] h-1.5 rounded-full bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Precisão de Nível
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SKILL_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSkillTolerance(opt.id)}
                    className={cn(
                      'flex flex-col items-center gap-0.5 p-2 rounded-xl border transition-all',
                      skillTolerance === opt.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/30 bg-secondary/20 hover:border-border/60',
                    )}
                  >
                    <span
                      className={cn(
                        'text-[10px] font-black uppercase',
                        skillTolerance === opt.id
                          ? 'text-primary'
                          : 'text-foreground',
                      )}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[8px] text-muted-foreground">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className="w-full h-11 text-sm font-black uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4 mr-1.5" /> Buscar Adversário
            </Button>
          </div>
        )}

        {searchState === 'searching' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <Sparkles className="w-5 h-5 text-[hsl(var(--gold))] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-wider animate-pulse">
                Buscando o melhor adversário...
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Analisando nível, localização e orçamento
              </p>
            </div>
          </div>
        )}

        {searchState === 'no-result' && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <p className="text-sm font-bold text-muted-foreground text-center">
              Nenhum adversário encontrado com esses critérios.
            </p>
            <Button
              onClick={() => setSearchState('idle')}
              variant="outline"
              className="text-xs font-bold uppercase"
            >
              Ajustar Critérios
            </Button>
          </div>
        )}

        {searchState === 'result' && suggestion && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(var(--gold)/0.15)] to-primary/10 border border-[hsl(var(--gold)/0.3)] p-2.5">
              <Crown className="w-4 h-4 text-[hsl(var(--gold))]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--gold))]">
                Melhor Compatibilidade
              </span>
              <span className="ml-auto text-lg font-black text-[hsl(var(--gold))]">
                {suggestion.score}%
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-2xl bg-secondary/40 flex items-center justify-center overflow-hidden border border-border/50 shrink-0">
                <img
                  src={suggestion.team.logo}
                  alt={suggestion.team.name}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-sm text-foreground uppercase tracking-wider truncate">
                  {suggestion.team.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="text-[9px] uppercase font-bold px-1.5 py-0"
                  >
                    {suggestion.team.category}
                  </Badge>
                  <span className="text-[9px] text-muted-foreground font-bold uppercase">
                    {suggestion.team.ageRange} anos
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                  Win Rate
                </span>
                <span className="text-lg font-black text-[hsl(var(--gold))]">
                  {winRate}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-background/40 rounded-lg p-2 text-center border border-border/20">
                <span className="block font-black text-sm text-green-500">
                  {suggestion.team.wins}V
                </span>
                <span className="text-[8px] text-muted-foreground uppercase">
                  Vitórias
                </span>
              </div>
              <div className="bg-background/40 rounded-lg p-2 text-center border border-border/20">
                <span className="block font-black text-sm text-red-500">
                  {suggestion.team.losses}D
                </span>
                <span className="text-[8px] text-muted-foreground uppercase">
                  Derrotas
                </span>
              </div>
              <div className="bg-background/40 rounded-lg p-2 text-center border border-border/20">
                <span className="block font-black text-sm text-yellow-500">
                  {suggestion.team.draws}E
                </span>
                <span className="text-[8px] text-muted-foreground uppercase">
                  Empates
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              {suggestion.reasons.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg bg-secondary/20 p-2 border border-border/20"
                >
                  <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-[10px] font-bold text-foreground">
                    {r.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto">
                    {r.detail}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-background/30 rounded-lg p-2">
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span className="truncate font-medium">
                {suggestion.field.name}
              </span>
              <span className="font-black text-[hsl(var(--gold))] ml-auto shrink-0">
                {suggestion.field.pricePerHour}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <TeamRoleBadge role="home" />
              <span className="text-[9px] text-muted-foreground font-bold">
                vs
              </span>
              <TeamRoleBadge role="visitor" />
            </div>

            <Button
              onClick={handleAccept}
              className="w-full h-11 text-sm font-black uppercase tracking-widest"
            >
              <Zap className="w-4 h-4 mr-1.5" /> Selecionar Time
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
