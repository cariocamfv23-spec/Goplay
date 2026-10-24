import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Star, Eye, EyeOff, ShieldCheck, Award } from "lucide-react"
import { toast } from "sonner"
import {
  eventsService,
  type EventEvaluation,
  type RegistrationItem,
} from "@/services/events"

interface TryoutEvaluationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  registration: RegistrationItem | null
  currentUserId: string
  onSaved?: (evaluation: EventEvaluation) => void
}

export function TryoutEvaluationModal({
  open,
  onOpenChange,
  registration,
  currentUserId,
  onSaved,
}: TryoutEvaluationModalProps) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [rating, setRating] = useState<number>(8)
  const [strengths, setStrengths] = useState("")
  const [improvements, setImprovements] = useState("")
  const [internalNotes, setInternalNotes] = useState("")
  const [visibleToAthlete, setVisibleToAthlete] = useState(false)

  // Load existing evaluation if present
  const registrationEventId = registration?.eventId
  const registrationUserId = registration?.userId

  useEffect(() => {
    if (!open || !registrationEventId || !registrationUserId || !currentUserId)
      return

    let cancelled = false
    setLoading(true)

    eventsService
      .getAthleteEvaluation({
        eventId: registrationEventId,
        athleteId: registrationUserId,
      })
      .then(({ data, error }) => {
        if (cancelled) return
        setLoading(false)
        if (error) {
          console.warn("Erro ao buscar avaliação existente:", error)
          return
        }
        if (data) {
          setRating(data.rating ?? 8)
          setStrengths(data.strengths ?? "")
          setImprovements(data.improvements ?? "")
          setInternalNotes(data.internalNotes ?? "")
          setVisibleToAthlete(data.visibleToAthlete ?? false)
        } else {
          // Reset default values
          setRating(8)
          setStrengths("")
          setImprovements("")
          setInternalNotes("")
          setVisibleToAthlete(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [open, registrationEventId, registrationUserId, currentUserId])

  const handleSave = async () => {
    if (!registration || !currentUserId) return

    if (rating < 1 || rating > 10) {
      toast.error("A nota técnica deve ser entre 1 e 10.")
      return
    }

    setSaving(true)
    const { data, error } = await eventsService.saveAthleteEvaluation({
      eventId: registration.eventId,
      athleteId: registration.userId,
      clubId: currentUserId,
      rating,
      strengths,
      improvements,
      internalNotes,
      visibleToAthlete,
    })
    setSaving(false)

    if (error || !data) {
      toast.error(error?.message || "Erro ao salvar avaliação do atleta.")
      return
    }

    toast.success(
      visibleToAthlete
        ? "Avaliação salva e visível para o atleta!"
        : "Avaliação salva com sucesso (privada ao clube).",
    )

    onSaved?.(data)
    onOpenChange(false)
  }

  const athleteName = registration?.participant?.name || "Atleta"
  const athleteAvatar = registration?.participant?.avatar
  const athleteSport = registration?.participant?.sport || "Futebol"
  const athletePosition = registration?.participant?.position

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold">
                Avaliação Técnica do Atleta
              </DialogTitle>
              <DialogDescription className="text-xs">
                Feedback estruturado para o piloto com clubes e atletas
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground">
              Carregando avaliação...
            </span>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Athlete mini-header */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50">
              <Avatar className="w-12 h-12 border border-border">
                <AvatarImage src={athleteAvatar} />
                <AvatarFallback>{athleteName[0] || "A"}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm truncate">{athleteName}</h4>
                <p className="text-xs text-muted-foreground">
                  {athleteSport} {athletePosition ? `• ${athletePosition}` : ""}
                </p>
                {registration?.eventTitle && (
                  <p className="text-[11px] text-primary truncate font-medium">
                    {registration.eventTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Rating (1-10) with interactive stars or number picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Nota Geral de Desempenho (1 a 10)
                </Label>
                <Badge
                  variant="outline"
                  className="font-extrabold text-sm px-2.5 py-0.5 border-amber-500/40 text-amber-500 bg-amber-500/10"
                >
                  {rating} / 10
                </Badge>
              </div>

              {/* Number buttons 1 to 10 */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const isSelected = rating === num
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`h-9 rounded-lg font-bold text-xs transition-all ${
                        isSelected
                          ? "bg-amber-500 text-black shadow-md scale-105"
                          : "bg-secondary/60 hover:bg-secondary text-foreground border border-border/40"
                      }`}
                    >
                      {num}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Strengths (visible if toggle on) */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground">
                Pontos Fortes Observados
              </Label>
              <Textarea
                placeholder="Ex.: Excelente visão de jogo, passe preciso, velocidade de arranque e liderança positiva em campo..."
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                rows={3}
                className="text-xs resize-none bg-secondary/30"
              />
              <p className="text-[10px] text-muted-foreground">
                Será exibido ao atleta se o botão de visibilidade estiver ativo.
              </p>
            </div>

            {/* Improvements (visible if toggle on) */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground">
                Pontos a Desenvolver / Oportunidades
              </Label>
              <Textarea
                placeholder="Ex.: Melhorar perna não-dominante, recomposição tática defensiva, controle emocional sob pressão..."
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                rows={3}
                className="text-xs resize-none bg-secondary/30"
              />
              <p className="text-[10px] text-muted-foreground">
                Orientações construtivas para o plano de treino do atleta.
              </p>
            </div>

            {/* Internal Notes (NEVER visible to athlete, enforced by RLS) */}
            <div className="space-y-1.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/30">
              <Label className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Notas Internas do Clube (Confidenciais)
              </Label>
              <Textarea
                placeholder="Anotações privadas da comissão técnica, scout e diretoria. Nunca exibidas ao atleta, nem pela API..."
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={2}
                className="text-xs resize-none bg-background/80"
              />
              <p className="text-[10px] text-amber-700/80 dark:text-amber-300/80">
                🔒 Protegido: a interface do atleta nunca renderiza este campo.
              </p>
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/50">
              <div className="space-y-0.5 pr-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  {visibleToAthlete ? (
                    <Eye className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                  Visível para o Atleta
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {visibleToAthlete
                    ? "O atleta poderá visualizar nota, pontos fortes e melhorias no card do evento."
                    : "Apenas a comissão do clube terá acesso a esta avaliação por enquanto."}
                </p>
              </div>
              <Switch
                checked={visibleToAthlete}
                onCheckedChange={setVisibleToAthlete}
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={saving || loading}
            onClick={handleSave}
            className="text-xs bg-primary text-white font-semibold"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                Salvando...
              </>
            ) : (
              "Salvar Avaliação"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
