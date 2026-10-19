import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  moderationService,
  REPORT_REASONS,
  type ReportContentType,
  type ReportReason,
} from '@/services/moderation'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { ShieldAlert, Loader2, CheckCircle2 } from 'lucide-react'

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contentType: ReportContentType
  contentId?: string | number | null
  reportedUserId?: string | null
  reportedUserName?: string
  contentTitle?: string
  onReportSubmitted?: () => void
}

export function ReportDialog({
  open,
  onOpenChange,
  contentType,
  contentId,
  reportedUserId,
  reportedUserName,
  contentTitle,
  onReportSubmitted,
}: ReportDialogProps) {
  const { user } = useAuth()
  const [selectedReason, setSelectedReason] =
    useState<ReportReason>('offensive_content')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleClose = () => {
    if (!loading) {
      onOpenChange(false)
      // Reset after closing animation
      setTimeout(() => {
        setSubmitted(false)
        setDescription('')
        setSelectedReason('offensive_content')
      }, 300)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      toast.error('Faça login para enviar uma denúncia.')
      return
    }

    setLoading(true)

    const { error } = await moderationService.createReport({
      reporterId: user.id,
      reportedUserId: reportedUserId || null,
      contentType,
      contentId: contentId ? String(contentId) : null,
      reason: selectedReason,
      description,
    })

    setLoading(false)

    if (error) {
      toast.error('Não foi possível registrar a denúncia: ' + error.message)
      return
    }

    setSubmitted(true)
    toast.success('Denúncia recebida com sucesso.', {
      description:
        'Nossa equipe de moderação irá analisar o conteúdo para manter a comunidade segura.',
    })

    if (onReportSubmitted) {
      onReportSubmitted()
    }
  }

  const getContentTypeLabel = () => {
    switch (contentType) {
      case 'profile':
        return 'perfil'
      case 'post':
        return 'publicação'
      case 'comment':
        return 'comentário'
      case 'event':
        return 'evento/peneira'
      case 'passport':
        return 'passaporte esportivo'
      default:
        return 'conteúdo'
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-lg">Denúncia Registrada</h3>
              <p className="text-xs text-muted-foreground leading-relaxed px-2">
                Obrigado por ajudar a manter o Goplay seguro. Analisamos com
                rigor denúncias envolvendo conduta, fraude e especialmente a
                segurança de atletas menores de idade.
              </p>
            </div>
            <Button className="w-full font-semibold mt-2" onClick={handleClose}>
              Concluir
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <div className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <DialogTitle className="text-lg">
                  Denunciar {getContentTypeLabel()}
                </DialogTitle>
              </div>
              <DialogDescription className="text-xs leading-relaxed">
                {reportedUserName ? (
                  <>
                    Conteúdo relacionado a{' '}
                    <strong className="text-foreground">
                      {reportedUserName}
                    </strong>
                    . Selecione o motivo que melhor descreve o problema.
                  </>
                ) : (
                  'Selecione a categoria que melhor descreve a infração para avaliação da moderação.'
                )}
                {contentTitle && (
                  <span className="block mt-1 italic text-muted-foreground truncate">
                    &quot;{contentTitle}&quot;
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 py-1">
              <Label className="text-xs font-semibold text-foreground">
                Motivo da denúncia:
              </Label>
              <RadioGroup
                value={selectedReason}
                onValueChange={(val) => setSelectedReason(val as ReportReason)}
                className="space-y-2"
              >
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r.value}
                    htmlFor={`reason-${r.value}`}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedReason === r.value
                        ? 'border-primary/60 bg-primary/5 text-foreground'
                        : 'border-border/60 hover:bg-secondary/40 text-muted-foreground'
                    }`}
                  >
                    <RadioGroupItem
                      value={r.value}
                      id={`reason-${r.value}`}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="flex-1 space-y-0.5">
                      <span className="font-semibold block text-foreground">
                        {r.label}
                      </span>
                      <span className="text-[11px] leading-tight block text-muted-foreground">
                        {r.description}
                      </span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="report-desc" className="text-xs font-semibold">
                Detalhes adicionais (opcional):
              </Label>
              <Textarea
                id="report-desc"
                placeholder="Descreva brevemente o que aconteceu ou forneça detalhes para ajudar na apuração..."
                className="text-xs resize-none h-20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
              />
              <span className="text-[10px] text-muted-foreground block text-right">
                {description.length}/500 caracteres
              </span>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={loading}
                className="text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={loading}
                className="text-xs font-bold gap-1.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Enviando denúncia...
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Confirmar Denúncia
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
