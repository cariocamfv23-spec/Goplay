import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Crown,
  Eye,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  Trophy,
  ArrowRight,
  Send,
} from 'lucide-react'
import { ProfileVisitor } from '@/lib/profile-views-data'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ProfileViewerPaywallModalProps {
  visitor: ProfileVisitor | null
  open: boolean
  onClose: () => void
}

export function ProfileViewerPaywallModal({
  visitor,
  open,
  onClose,
}: ProfileViewerPaywallModalProps) {
  const { isPremium, upgradeToPremium } = usePrivacyStore()
  const [isSimulatingUpgrade, setIsSimulatingUpgrade] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>(
    'monthly',
  )

  if (!visitor) return null

  const handleSimulatedUpgrade = () => {
    setIsSimulatingUpgrade(true)
    setTimeout(() => {
      upgradeToPremium()
      setIsSimulatingUpgrade(false)
      toast.success('Plano Goplay Premium Ativado!', {
        description:
          'Agora você tem acesso irrestrito a todos os visitantes e contatos diretos.',
      })
    }, 1200)
  }

  const getTypeBadge = (type: ProfileVisitor['type']) => {
    switch (type) {
      case 'scout':
        return (
          <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 gap-1">
            <Eye className="w-3 h-3" /> Olheiro Oficial / Scout
          </Badge>
        )
      case 'university':
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1">
            <GraduationCap className="w-3 h-3" /> Recrutador de Faculdade &
            Bolsas
          </Badge>
        )
      case 'team':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1">
            <Users className="w-3 h-3" /> Time / Clube de Futebol
          </Badge>
        )
      default:
        return (
          <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30 gap-1">
            <ShieldCheck className="w-3 h-3" /> Parceiro Verificado
          </Badge>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border border-gold/30 bg-background max-h-[92vh] flex flex-col">
        {/* Header styling with Serenity Purple and Soft Gold */}
        <div className="relative p-6 bg-gradient-to-br from-primary/20 via-purple-900/30 to-amber-950/20 border-b border-gold/20 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30 shadow-[0_0_15px_hsl(var(--gold)/0.2)]">
                <Crown className="w-5 h-5 fill-gold text-gold" />
              </span>
              <div>
                <DialogTitle className="text-lg font-black tracking-tight text-foreground flex items-center gap-2">
                  Goplay Premium{' '}
                  <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-gold/20 text-gold font-bold">
                    VIP
                  </span>
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Desbloqueie quem tem interesse direto no seu talento
                </p>
              </div>
            </div>
            {isPremium && (
              <Badge className="bg-green-500/15 text-green-600 border-green-500/30">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Assinante Ativo
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Visitor Card: Blurred vs Unlocked */}
          <div className="relative rounded-2xl border border-border/60 bg-secondary/20 p-5 overflow-hidden transition-all shadow-sm">
            {!isPremium && (
              <div className="absolute top-3 right-3 z-20">
                <Badge
                  variant="outline"
                  className="bg-background/90 backdrop-blur-md text-gold border-gold/40 gap-1 px-2.5 py-1 text-xs font-bold shadow-sm"
                >
                  <Lock className="w-3 h-3 text-gold" /> Identidade Oculta
                </Badge>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-primary/40 shadow-md">
                  <AvatarImage
                    src={visitor.avatar}
                    className={cn(
                      !isPremium && 'blur-md grayscale transition-all',
                    )}
                  />
                  <AvatarFallback className="font-bold text-lg">
                    {visitor.name[0]}
                  </AvatarFallback>
                </Avatar>
                {visitor.isLive && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-gold border-2 border-background" />
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {getTypeBadge(visitor.type)}
                </div>

                {isPremium ? (
                  <>
                    <h3 className="font-black text-lg text-foreground flex items-center gap-1.5">
                      {visitor.name}
                      {visitor.verified && (
                        <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                      )}
                    </h3>
                    <p className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> {visitor.organization}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {visitor.role} • {visitor.location}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-base text-foreground/90 select-none">
                      {visitor.type === 'scout'
                        ? 'Olheiro de Clube de Elite'
                        : visitor.type === 'university'
                          ? 'Recrutador Universitário (Bolsa de Estudos)'
                          : 'Time Profissional / Rival de Liga'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-36 bg-muted-foreground/20 rounded blur-[3px]" />
                      <span className="text-[10px] text-muted-foreground italic">
                        (Nome & Organização bloqueados)
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                      Visualizou seu perfil{' '}
                      <strong className="text-foreground">
                        {visitor.visitsCount} vezes
                      </strong>{' '}
                      • {visitor.date}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* If university has scholarship offer */}
            {visitor.scholarshipOffer && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-amber-600 dark:text-amber-400">
                    Oportunidade de Bolsa Esportiva Identificada
                  </p>
                  <p className="text-muted-foreground">
                    {isPremium ? (
                      <span>
                        Programa:{' '}
                        <strong>{visitor.scholarshipOffer.program}</strong> (
                        {visitor.scholarshipOffer.coverage})
                      </span>
                    ) : (
                      <span>
                        Bolsa integral/parcial vinculada a este recrutador.
                        Desbloqueie para contatar o treinador.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Direct Contact (Unlocked Only) */}
            {isPremium ? (
              <div className="mt-4 pt-4 border-t border-border/50 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Canais Diretos de Contato
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href={`mailto:${visitor.contactEmail}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-background border hover:border-primary transition-colors text-foreground font-medium truncate"
                  >
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{visitor.contactEmail}</span>
                  </a>
                  <a
                    href={`tel:${visitor.contactPhone}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-background border hover:border-primary transition-colors text-foreground font-medium"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>{visitor.contactPhone}</span>
                  </a>
                </div>
                {visitor.notes && (
                  <p className="text-xs text-muted-foreground bg-background/50 p-2.5 rounded-lg border border-border/40">
                    <strong className="text-foreground">
                      Nota do visitante:
                    </strong>{' '}
                    {visitor.notes}
                  </p>
                )}
                <Button
                  className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2"
                  onClick={() => {
                    toast.success('Mensagem direta aberta no Goplay Chat!')
                    onClose()
                  }}
                >
                  <Send className="w-4 h-4" /> Iniciar Conversa com o Recrutador
                </Button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-gold" /> E-mail, telefone e
                  notas confidenciais ocultos
                </span>
                <span className="text-gold font-bold">Premium</span>
              </div>
            )}
          </div>

          {/* Upsell Pitch if not premium */}
          {!isPremium && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 via-gold/10 to-transparent p-4 rounded-2xl border border-gold/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold fill-gold" />
                  <h4 className="font-bold text-sm text-foreground">
                    Por que assinar o Goplay Premium?
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>
                      <strong>100% de Visibilidade:</strong> saiba exatamente
                      qual olheiro ou universidade viu você.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>
                      <strong>Contato Direto:</strong> envie mensagem, e-mail e
                      telefone para os recrutadores.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>
                      <strong>Bolsas de Estudo:</strong> descubra ofertas de
                      faculdades americanas e europeias.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>
                      <strong>Modo Invisível:</strong> visite perfis de outros
                      atletas e times sem ser detectado.
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('monthly')}
                  className={cn(
                    'p-3.5 rounded-xl border text-left transition-all',
                    selectedPlan === 'monthly'
                      ? 'border-gold bg-gold/10 ring-1 ring-gold shadow-sm'
                      : 'border-border bg-secondary/20 hover:border-border/80',
                  )}
                >
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
                    Plano Mensal
                  </div>
                  <div className="text-xl font-black text-foreground mt-0.5">
                    R$ 29,90
                    <span className="text-xs font-normal text-muted-foreground">
                      /mês
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    Cancele a qualquer momento
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('annual')}
                  className={cn(
                    'p-3.5 rounded-xl border text-left transition-all relative overflow-hidden',
                    selectedPlan === 'annual'
                      ? 'border-gold bg-gold/10 ring-1 ring-gold shadow-sm'
                      : 'border-border bg-secondary/20 hover:border-border/80',
                  )}
                >
                  <div className="absolute top-0 right-0 bg-gold text-black text-[9px] font-black px-2 py-0.5 rounded-bl">
                    ECONOMIZE 40%
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
                    Plano Anual
                  </div>
                  <div className="text-xl font-black text-foreground mt-0.5">
                    R$ 17,90
                    <span className="text-xs font-normal text-muted-foreground">
                      /mês
                    </span>
                  </div>
                  <div className="text-[10px] text-gold font-bold mt-1">
                    R$ 214,80 faturado anualmente
                  </div>
                </button>
              </div>

              {/* Action Button */}
              <Button
                disabled={isSimulatingUpgrade}
                onClick={handleSimulatedUpgrade}
                className="w-full h-12 text-base font-black bg-gradient-to-r from-gold via-amber-500 to-yellow-600 hover:from-yellow-400 hover:to-gold text-black shadow-[0_4px_20px_hsl(var(--gold)/0.35)] transition-all duration-300 border border-yellow-300/50"
              >
                {isSimulatingUpgrade ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Ativando Goplay Premium...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Crown className="w-5 h-5 fill-black text-black" />
                    Desbloquear Quem Viu Meu Perfil (Simulação)
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                )}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Ambiente de demonstração interativo • Ativação imediata simulada
              </p>
            </div>
          )}

          {isPremium && (
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={onClose}>
                Fechar Detalhes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
