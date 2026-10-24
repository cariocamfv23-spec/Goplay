import { useState, useEffect, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Mail,
  Send,
  Users,
  Eye,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  KeyRound,
  ExternalLink,
  FileText,
  Loader2,
  HelpCircle,
  RefreshCw,
  Info,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  emailCampaignsService,
  type EmailCampaign,
  type EmailCampaignRecipient,
  type TargetAudience,
} from "@/services/email-campaigns"
import { eventsService, type EventItem } from "@/services/events"
import { toast } from "sonner"

export default function MassEmailManager() {
  const { user, profile } = useAuth()
  const isAdmin = Boolean(profile?.is_admin)
  const isClubOrCoach =
    profile?.account_type === "club" || profile?.account_type === "coach"
  const canSend = isAdmin || isClubOrCoach

  // Form State
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [bodyText, setBodyText] = useState("")
  const [targetAudience, setTargetAudience] = useState<TargetAudience>("all")
  const [targetEventId, setTargetEventId] = useState<string>("")
  const [eventsList, setEventsList] = useState<EventItem[]>([])

  // Audience Count Preview
  const [audienceCount, setAudienceCount] = useState<number | null>(null)
  const [countingAudience, setCountingAudience] = useState(false)

  // Preview Modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Campaign History & Execution
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Selected Campaign Details Modal
  const [selectedCampaign, setSelectedCampaign] =
    useState<EmailCampaign | null>(null)
  const [selectedRecipients, setSelectedRecipients] =
    useState<EmailCampaignRecipient[]>([])
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  // Dispatch sending spinner
  const [dispatchingId, setDispatchingId] = useState<string | null>(null)

  // 1. Load events list for target selection
  useEffect(() => {
    async function loadEvents() {
      if (!user?.id) return
      const res = await eventsService.getEvents()
      if (res.data) {
        setEventsList(res.data)
      }
    }
    loadEvents()
  }, [user?.id])

  // 2. Fetch audience count whenever segment changes
  useEffect(() => {
    let active = true
    async function fetchCount() {
      if (!canSend) return
      setCountingAudience(true)
      const res = await emailCampaignsService.getAudienceCount(
        targetAudience,
        targetEventId || null,
        user?.id || null,
      )
      if (active) {
        setAudienceCount(res.count)
        setCountingAudience(false)
      }
    }
    fetchCount()
    return () => {
      active = false
    }
  }, [targetAudience, targetEventId, user?.id, canSend])

  // 3. Load Campaign History
  const loadCampaigns = useCallback(async () => {
    if (!canSend) return
    setLoadingCampaigns(true)
    const res = await emailCampaignsService.listCampaigns()
    if (res.data) {
      setCampaigns(res.data)
    }
    setLoadingCampaigns(false)
  }, [canSend])

  useEffect(() => {
    loadCampaigns()
  }, [loadCampaigns])

  // Create Campaign handler
  const handleCreateCampaign = async (triggerSendImmediately: boolean) => {
    if (!user?.id) {
      toast.error("Você precisa estar autenticado.")
      return
    }
    if (!title.trim() || !subject.trim() || !bodyText.trim()) {
      toast.error("Preencha título, assunto e mensagem do e-mail.")
      return
    }

    if (targetAudience === "event_attendees" && !targetEventId) {
      toast.error("Selecione um evento específico para este público.")
      return
    }

    setSubmitting(true)
    const formattedHtml = bodyText
      .split("\n\n")
      .map(
        (p) =>
          `<p style="margin: 0 0 14px 0;">${p.replace(/\n/g, "<br/>")}</p>`,
      )
      .join("")

    const { campaign, error } = await emailCampaignsService.createCampaign(
      {
        title: title.trim(),
        subject: subject.trim(),
        body_text: bodyText.trim(),
        body_html: formattedHtml,
        target_audience: targetAudience,
        target_event_id: targetEventId || null,
        target_user_id: user.id,
      },
      user.id,
    )

    if (error || !campaign) {
      setSubmitting(false)
      toast.error("Erro ao criar campanha: " + (error || "Tente novamente."))
      return
    }

    toast.success("Campanha gravada com sucesso! Destinatários vinculados.")

    // Clear form
    setTitle("")
    setSubject("")
    setBodyText("")
    setIsPreviewOpen(false)

    if (triggerSendImmediately) {
      await handleTriggerSend(campaign.id)
    } else {
      await loadCampaigns()
      setSubmitting(false)
    }
  }

  // Trigger Send handler (calls Edge Function)
  const handleTriggerSend = async (campaignId: string) => {
    setDispatchingId(campaignId)
    const result = await emailCampaignsService.triggerCampaignSend(campaignId)
    setDispatchingId(null)
    setSubmitting(false)

    if (result.success) {
      if (result.providerConfigured) {
        toast.success(
          result.message || "E-mails disparados com sucesso via Resend API!",
        )
      } else {
        toast.info(
          "Campanha gravada como 'Pronta para Envio'. Conecte RESEND_API_KEY no Supabase para disparar de verdade.",
          { duration: 7000 },
        )
      }
    } else {
      toast.error(result.message || "Erro ao processar envio da campanha.")
    }

    loadCampaigns()
  }

  // View Details Modal handler
  const handleViewDetails = async (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign)
    setDetailsModalOpen(true)
    setLoadingDetails(true)
    const res = await emailCampaignsService.getCampaignDetails(campaign.id)
    if (res.recipients) {
      setSelectedRecipients(res.recipients)
    }
    setLoadingDetails(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px]">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Enviado (Resend)
          </Badge>
        )
      case "ready_for_sending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-[10px] font-semibold">
            <KeyRound className="w-3 h-3 mr-1" />
            Pronta para Envio (Aguardando Chave)
          </Badge>
        )
      case "sending":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30 text-[10px] animate-pulse">
            <Clock className="w-3 h-3 mr-1" />
            Enviando...
          </Badge>
        )
      case "partial_failure":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/30 text-[10px]">
            <AlertCircle className="w-3 h-3 mr-1" />
            Parcialmente Enviado
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30 text-[10px]">
            <AlertCircle className="w-3 h-3 mr-1" />
            Falha
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-[10px]">
            Rascunho
          </Badge>
        )
    }
  }

  const getAudienceLabel = (aud: TargetAudience) => {
    switch (aud) {
      case "all":
        return "Todos os usuários cadastrados"
      case "athletes":
        return "Apenas Atletas"
      case "clubs":
        return "Apenas Clubes e Treinadores"
      case "event_attendees":
        return "Inscritos em evento específico"
      case "followers":
        return "Meus seguidores no GoPlay"
      default:
        return aud
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Card */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/10 via-secondary/30 to-background shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary text-white shadow-md">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    E-mails em Massa • GoPlay
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Disparo inteligente com templates oficiais GoPlay, proteção
                    LGPD e provedor plugável
                  </CardDescription>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-xs border-gold/40 text-gold bg-gold/5 font-semibold"
              >
                Fase 4 • Roadmap
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* External provider status banner */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2">
              <KeyRound className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">
                  Provedor Plugável (Resend API)
                </span>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  As campanhas podem ser compostas e salvas imediatamente.
                  Quando uma chave (<code>RESEND_API_KEY</code>) estiver
                  cadastrada nos secrets do Supabase, o envio real é realizado
                  automaticamente sem necessidade de rebuild.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8 shrink-0 border-border/60"
              onClick={loadCampaigns}
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Compositor vs Histórico */}
      <Tabs defaultValue="compose" className="w-full space-y-4">
        <TabsList className="bg-secondary/60 p-1 rounded-xl grid grid-cols-2 max-w-sm">
          <TabsTrigger
            value="compose"
            className="text-xs font-semibold gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            Nova Campanha
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="text-xs font-semibold gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Histórico ({campaigns.length})
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Compositor */}
        <TabsContent value="compose" className="space-y-4">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                Compositor de E-mails em Massa
              </CardTitle>
              <CardDescription className="text-xs">
                Crie um comunicado formatado com o padrão visual GoPlay
                (cabeçalho oficial + rodapé LGPD de descadastro).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Row 1: Title & Audience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    Título Interno da Campanha
                  </label>
                  <Input
                    placeholder="Ex: Convocação Peneira Sub-17 • Outubro"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xs h-9 bg-secondary/30"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Apenas para controle no seu histórico interno.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center justify-between">
                    <span>Público-Alvo (Segmento)</span>
                    <span className="text-[11px] font-semibold text-primary">
                      {countingAudience ? (
                        <span className="flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />{" "}
                          Calculando...
                        </span>
                      ) : (
                        `${audienceCount ?? 0} destinatário(s) apto(s)`
                      )}
                    </span>
                  </label>
                  <Select
                    value={targetAudience}
                    onValueChange={(val) =>
                      setTargetAudience(val as TargetAudience)
                    }
                  >
                    <SelectTrigger className="text-xs h-9 bg-secondary/30">
                      <SelectValue placeholder="Selecione o público" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        Todos os usuários (Geral)
                      </SelectItem>
                      <SelectItem value="athletes">Apenas Atletas</SelectItem>
                      <SelectItem value="clubs">
                        Apenas Clubes e Treinadores
                      </SelectItem>
                      <SelectItem value="event_attendees">
                        Inscritos em Evento Específico
                      </SelectItem>
                      <SelectItem value="followers">Meus Seguidores</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">
                    Usuários que clicaram em descadastro (LGPD) são
                    automaticamente filtrados e excluídos.
                  </p>
                </div>
              </div>

              {/* Conditional Event Selector if audience is event_attendees */}
              {targetAudience === "event_attendees" && (
                <div className="p-3 bg-secondary/30 rounded-xl border border-border/40 space-y-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-foreground">
                    Selecione o Evento / Peneira
                  </label>
                  <Select
                    value={targetEventId}
                    onValueChange={(val) => setTargetEventId(val)}
                  >
                    <SelectTrigger className="text-xs h-9 bg-background">
                      <SelectValue placeholder="Escolha o evento" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventsList.map((ev) => (
                        <SelectItem key={ev.id} value={ev.id}>
                          {ev.title} ({ev.sport} •{" "}
                          {new Date(ev.eventDate).toLocaleDateString("pt-BR")})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  Assunto do E-mail (visível para o destinatário)
                </label>
                <Input
                  placeholder="Ex: [GoPlay] Você foi convocado para a etapa presencial!"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="text-xs h-9 bg-secondary/30"
                />
              </div>

              {/* Body */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center justify-between">
                  <span>Mensagem / Conteúdo</span>
                  <span className="text-[10px] text-muted-foreground">
                    Separe parágrafos com duas quebras de linha
                  </span>
                </label>
                <Textarea
                  placeholder={`Prezado atleta,\n\nTemos novidades importantes sobre a próxima rodada de avaliações no GoPlay...\n\nCompareça no local com 30 minutos de antecedência munido de documento com foto.`}
                  rows={8}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="text-xs bg-secondary/30 font-sans leading-relaxed resize-y"
                />
              </div>

              {/* LGPD Compliance note */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-[11px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Proteção de Privacidade & LGPD:
                  </strong>{" "}
                  Todo e-mail enviado por esta ferramenta inclui automaticamente
                  rodapé com link individualizado de descadastro (opt-out
                  público), preservando a conformidade legal da plataforma e a
                  reputação de envio do seu clube.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-border/40">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreviewOpen(true)}
                  className="text-xs h-9 gap-1.5 border-primary/40 text-primary hover:bg-primary/10"
                >
                  <Eye className="w-4 h-4" />
                  Visualizar Template Oficial
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={submitting}
                    onClick={() => handleCreateCampaign(false)}
                    className="text-xs h-9"
                  >
                    Salvar Rascunho
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    disabled={submitting}
                    onClick={() => handleCreateCampaign(true)}
                    className="text-xs h-9 gap-1.5 bg-primary text-white font-semibold shadow-md"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Criar e Enviar Campanha
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: Histórico */}
        <TabsContent value="history" className="space-y-4">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Histórico de Campanhas de E-mail
              </CardTitle>
              <CardDescription className="text-xs">
                Acompanhe o status de cada envio, quantidade de destinatários e
                visualize o conteúdo emitido.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingCampaigns ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 text-muted-foreground text-xs">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  Carregando histórico de campanhas...
                </div>
              ) : campaigns.length === 0 ? (
                <div className="py-12 text-center space-y-2 border border-dashed border-border/60 rounded-xl">
                  <Mail className="w-10 h-10 text-muted-foreground/30 mx-auto" />
                  <p className="text-sm font-semibold">
                    Nenhuma campanha de e-mail criada ainda.
                  </p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Utilize a aba "Nova Campanha" para compor seu primeiro
                    comunicado oficial para atletas e parceiros.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {campaigns.map((camp) => (
                    <div
                      key={camp.id}
                      className="p-4 rounded-xl border border-border/50 bg-secondary/20 hover:border-border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-sm text-foreground truncate">
                            {camp.title}
                          </h4>
                          {getStatusBadge(camp.status)}
                          <Badge
                            variant="outline"
                            className="text-[10px] text-muted-foreground"
                          >
                            {getAudienceLabel(camp.target_audience)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          <strong className="text-foreground/90">
                            Assunto:
                          </strong>{" "}
                          {camp.subject}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                          <span>
                            Criado em:{" "}
                            {new Date(camp.created_at).toLocaleDateString(
                              "pt-BR",
                            )}{" "}
                            {new Date(camp.created_at).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-foreground">
                            {camp.total_recipients} destinatário(s)
                          </span>
                          {camp.sent_count > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-500 font-semibold">
                                {camp.sent_count} enviado(s)
                              </span>
                            </>
                          )}
                          {camp.failed_count > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-destructive font-semibold">
                                {camp.failed_count} falha(s)
                              </span>
                            </>
                          )}
                        </div>
                        {camp.error_message && (
                          <p className="text-[10px] text-amber-500/90 leading-tight bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 mt-1">
                            {camp.error_message}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs gap-1 border-border/60"
                          onClick={() => handleViewDetails(camp)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Detalhes
                        </Button>

                        {(camp.status === "draft" ||
                          camp.status === "ready_for_sending") && (
                          <Button
                            size="sm"
                            variant="default"
                            className="h-8 text-xs gap-1.5 bg-primary text-white font-semibold"
                            disabled={dispatchingId === camp.id}
                            onClick={() => handleTriggerSend(camp.id)}
                          >
                            {dispatchingId === camp.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Send className="w-3.5 h-3.5" />
                            )}
                            Disparar Envio
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Visual Template Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              Pré-visualização do Template Oficial GoPlay
            </DialogTitle>
            <DialogDescription className="text-xs">
              Veja exatamente como o atleta ou participante visualizará o e-mail
              no cliente dele.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 bg-[#0c0914] rounded-2xl border border-[#2d2247] text-[#f4f4f8] shadow-inner space-y-4">
            {/* Header Mock */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#1f1438] to-[#2e1d52] border-b-2 border-gold flex items-center justify-between">
              <div>
                <span className="text-xl font-black text-white">
                  Go<span className="text-gold">Play</span>
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-purple-300 font-semibold">
                  Plataforma Oficial do Esporte
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-gold/40 text-gold text-[10px] bg-gold/10"
              >
                {profile?.club_name ||
                  profile?.full_name ||
                  "Organizador Oficial"}
              </Badge>
            </div>

            {/* Content Mock */}
            <div className="p-4 bg-[#171126] rounded-xl border border-[#2d2247] space-y-3">
              <p className="text-xs text-purple-200">
                Olá, <strong>Atleta Participante</strong>!
              </p>
              <div className="text-xs text-slate-200 leading-relaxed space-y-2">
                {bodyText ? bodyText.split("\n\n").map((par, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {par}
                    </p>
                  )) : <p className="italic text-slate-400">
                    O texto digitado no compositor aparecerá aqui formatado...
                  </p>}
              </div>
            </div>

            {/* Footer Mock */}
            <div className="p-3 rounded-xl bg-[#100b1c] border border-[#2d2247] text-center space-y-1">
              <p className="text-[10px] text-slate-400 leading-tight">
                Você está recebendo este comunicado porque faz parte da
                comunidade esportiva <strong>GoPlay</strong>. Respeitamos sua
                privacidade de acordo com a <strong>LGPD</strong>.
              </p>
              <p className="text-[10px] text-slate-400">
                Caso não deseje mais receber comunicados,{" "}
                <span className="text-gold underline font-semibold cursor-pointer">
                  clique aqui para se descadastrar
                </span>
                .
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewOpen(false)}
              className="text-xs"
            >
              Fechar Visualização
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Selected Campaign Details Modal */}
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Detalhes da Campanha: {selectedCampaign?.title}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Visualização completa dos destinatários e status de entrega.
            </DialogDescription>
          </DialogHeader>

          {selectedCampaign && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-3 bg-secondary/30 rounded-xl text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Status
                  </span>
                  <div className="mt-1">
                    {getStatusBadge(selectedCampaign.status)}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Público
                  </span>
                  <span className="font-semibold text-foreground">
                    {getAudienceLabel(selectedCampaign.target_audience)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Assunto
                  </span>
                  <span className="font-semibold text-foreground truncate block">
                    {selectedCampaign.subject}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">
                    Total
                  </span>
                  <span className="font-semibold text-foreground">
                    {selectedCampaign.total_recipients} destinatário(s)
                  </span>
                </div>
              </div>

              {/* Message Content preview */}
              <div className="p-3 bg-secondary/20 rounded-xl border border-border/40 space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Mensagem Enviada
                </span>
                <p className="text-xs whitespace-pre-wrap leading-relaxed text-foreground/90">
                  {selectedCampaign.body_text}
                </p>
              </div>

              {/* Recipients list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    Destinatários Vinculados ({selectedRecipients.length})
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Exibindo até 100 registros
                  </span>
                </div>

                {loadingDetails ? (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-primary mb-1" />
                    Carregando destinatários...
                  </div>
                ) : selectedRecipients.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic text-center py-4">
                    Nenhum destinatário registrado para esta campanha.
                  </p>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                    {selectedRecipients.map((r) => (
                      <div
                        key={r.id}
                        className="p-2 rounded-lg bg-secondary/30 border border-border/30 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-semibold text-foreground block truncate">
                            {r.recipient_name || "Usuário GoPlay"}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono truncate block">
                            {r.recipient_email}
                          </span>
                        </div>
                        <div className="shrink-0">
                          {r.status === "sent" ? (
                            <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px]">
                              Enviado
                            </Badge>
                          ) : r.status === "failed" ? (
                            <Badge className="bg-destructive/10 text-destructive text-[9px]">
                              Falhou
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[9px]">
                              Pendente
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setDetailsModalOpen(false)}
              className="text-xs"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
