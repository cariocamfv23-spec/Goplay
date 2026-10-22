import { useParams, useNavigate } from "react-router-dom"
import { mockEvents } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Users,
  AlertCircle,
  FileText,
  Loader2,
  ShieldAlert,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Search,
} from "lucide-react"
import { useState, useEffect } from "react"
import {
  eventsService,
  type EventItem,
  type RegistrationItem,
  type RegistrationStatus,
} from "@/services/events"
import { useAuth } from "@/hooks/use-auth"
import { analyticsService } from "@/services/analytics"
import { ShareDialog } from "@/components/ShareDialog"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function EventDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [realEvent, setRealEvent] = useState<EventItem | null>(null)
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [actionRegistration, setActionRegistration] = useState<{
    item: RegistrationItem
    action: "approved" | "rejected"
  } | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [regFilter, setRegFilter] =
    useState<"all" | "pending" | "approved" | "rejected">("all")
  const [isShareOpen, setIsShareOpen] = useState(false)

  // Check if ?share=1 is present in URL to trigger share dialog automatically
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("share") === "1") {
      setIsShareOpen(true)
    }
  }, [])

  const isSupabaseId =
    typeof id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  const mockEvent = !isSupabaseId
    ? mockEvents.find((e) => String(e.id) === String(id)) as any
    : null

  useEffect(() => {
    if (isSupabaseId && id) {
      setLoading(true)
      eventsService.getEventById(id, user?.id).then(({ data, error }) => {
        setLoading(false)
        if (error || !data) {
          toast.error("Evento não encontrado.")
          return
        }
        setRealEvent(data)
        setIsRegistered(data.isRegistered ?? false)

        // Record deduplicated event view metric
        analyticsService.trackEventView(id, user?.id)

        // If current user is the creator, fetch the registrations list
        if (user?.id && data.creatorId === user.id) {
          eventsService.getEventRegistrations(id).then((regs) => {
            setRegistrations(regs)
          })
        }
      })
    } else {
      setLoading(false)
    }
  }, [id, isSupabaseId, user?.id])

  const handleRegister = async () => {
    // Record registration intent metric
    if (id) {
      analyticsService.trackRegistrationStarted(id, user?.id)
    }

    if (!user?.id) {
      toast.info("Faça login para concluir sua inscrição no evento.", {
        description: "Você retornará diretamente para este evento.",
        action: {
          label: "Fazer Login",
          onClick: () =>
            navigate(
              `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
            ),
        },
      })
      return
    }

    if (isSupabaseId && id) {
      setSubmitting(true)
      const { error } = await eventsService.registerForEvent({
        eventId: id,
        userId: user.id,
      })
      setSubmitting(false)

      if (error) {
        toast.error(error.message)
        return
      }

      setIsRegistered(true)

      // Record successful registration completion metric
      analyticsService.trackEvent({
        eventName: "registration_completed",
        userId: user.id,
        targetId: id,
        metadata: {
          event_title: realEvent?.title,
          sport: realEvent?.sport,
        },
      })

      toast.success("Inscrição confirmada com sucesso!", {
        description:
          "Verifique suas notificações e compareça no horário indicado.",
      })
      if (realEvent) {
        setRealEvent({
          ...realEvent,
          registrationsCount: (realEvent.registrationsCount || 0) + 1,
        })
      }
    } else {
      setIsRegistered(true)
      toast.success("Inscrição confirmada!")
    }
  }

  const handleCancelRegistration = async () => {
    if (!user?.id || !isSupabaseId || !id) return
    if (!confirm("Deseja realmente cancelar sua inscrição?")) return

    setSubmitting(true)
    const { error } = await eventsService.cancelRegistration(id, user.id)
    setSubmitting(false)

    if (error) {
      toast.error("Erro ao cancelar inscrição.")
      return
    }

    setIsRegistered(false)
    toast.success("Inscrição cancelada com sucesso.")
    if (realEvent) {
      setRealEvent({
        ...realEvent,
        registrationsCount: Math.max(
          0,
          (realEvent.registrationsCount || 0) - 1,
        ),
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">
          Carregando detalhes do evento...
        </span>
      </div>
    )
  }

  // Compute registration status flags
  const isPastDeadline = realEvent?.registrationDeadline
    ? new Date() > new Date(`${realEvent.registrationDeadline}T23:59:59`)
    : false

  const isSoldOut = realEvent?.maxParticipants
    ? (realEvent.registrationsCount || 0) >= realEvent.maxParticipants
    : false

  const isClosed =
    realEvent?.status === "closed" || realEvent?.status === "canceled"

  const event = realEvent
    ? {
        title: realEvent.title,
        description: realEvent.description,
        image:
          realEvent.bannerUrl ||
          "https://img.usecurling.com/p/800/400?q=stadium%20field",
        sport: realEvent.sport,
        type: realEvent.type === "tryout" ? "Peneira Oficial" : "Campeonato",
        date: new Date(realEvent.eventDate).toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        time: realEvent.eventTime,
        location: `${realEvent.locationName} - ${realEvent.city}, ${realEvent.state}`,
        address: realEvent.address,
        price:
          realEvent.price === 0
            ? "Gratuito"
            : `R$ ${realEvent.price.toFixed(2)}`,
        attendees: realEvent.registrationsCount || 0,
        maxAttendees: realEvent.maxParticipants || null,
        creator: realEvent.creator,
        requirements: realEvent.requirements,
        instructions: realEvent.instructions,
        deadline: realEvent.registrationDeadline
          ? new Date(
              `${realEvent.registrationDeadline}T00:00:00`,
            ).toLocaleDateString("pt-BR")
          : null,
        isCreator: user?.id && realEvent.creatorId === user.id,
      }
    : mockEvent
      ? {
          title: mockEvent.title,
          description: mockEvent.description,
          image: mockEvent.image,
          sport: mockEvent.sport,
          type: "Evento",
          date: mockEvent.date,
          time: "09:00",
          location: mockEvent.location,
          address: undefined,
          price: mockEvent.price,
          attendees: mockEvent.attendees,
          maxAttendees: 50,
          creator: { name: "Organizador Oficial", avatar: "", type: "club" },
          requirements: undefined,
          instructions: undefined,
          deadline: null,
          isCreator: false,
        }
      : null

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-2">Evento não encontrado</h2>
        <Button onClick={() => navigate("/events")}>Voltar para a lista</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      {/* Banner */}
      <div className="relative h-64 md:h-80 w-full">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-md shadow-md"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1)
              } else {
                navigate("/explore")
              }
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            className="rounded-full bg-background/90 backdrop-blur-md hover:bg-background text-foreground font-semibold text-xs px-3.5 py-1.5 h-9 shadow-md flex items-center gap-1.5 border border-border/50"
            onClick={() => setIsShareOpen(true)}
            aria-label="Compartilhar evento"
          >
            <Share2 className="w-4 h-4 text-primary" />
            <span>Compartilhar</span>
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
          <Badge className="bg-primary text-white font-bold">
            {event.sport}
          </Badge>
          {event.type && (
            <Badge
              variant="outline"
              className={
                event.type.includes("Peneira")
                  ? "bg-amber-500/90 text-black border-amber-400 font-extrabold"
                  : "bg-background/80 backdrop-blur-md"
              }
            >
              {event.type}
            </Badge>
          )}
          {isRegistered && (
            <Badge className="bg-emerald-600 text-white font-bold">
              ✓ Sua Vaga Está Garantida
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-3xl mx-auto">
        {/* Title and Organizer */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center gap-3 py-2 border-b border-border/40">
            <Avatar className="w-10 h-10 border border-border">
              <AvatarImage src={event.creator?.avatar} />
              <AvatarFallback>{event.creator?.name?.[0] || "O"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">
                {event.creator?.name || "Organizador Goplay"}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {event.creator?.type === "club"
                  ? "Clube Oficial"
                  : "Organizador Autorizado"}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border border-border/50 bg-secondary/20">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                  Data
                </span>
                <p className="text-xs font-semibold capitalize truncate">
                  {event.date}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-secondary/20">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                  Horário
                </span>
                <p className="text-xs font-semibold truncate">{event.time}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-secondary/20">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                  Valor
                </span>
                <p className="text-xs font-semibold text-primary truncate">
                  {event.price}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-secondary/20">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">
                  Vagas
                </span>
                <p className="text-xs font-semibold truncate">
                  {event.attendees} inscritos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location */}
        <Card className="border border-border/50">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">Local do Evento</h3>
                <p className="text-xs text-muted-foreground">
                  {event.location}
                </p>
                {event.address && (
                  <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                    {event.address}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-base font-bold">Sobre o Evento</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
            {event.description || "Nenhuma descrição detalhada informada."}
          </p>
        </div>

        {/* Requirements & Instructions (crucial for tryouts) */}
        {(event.requirements || event.instructions) && (
          <div className="space-y-3">
            {event.requirements && (
              <Card className="border border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-amber-500 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Requisitos Obrigatórios para Participar
                  </h4>
                  <p className="text-xs text-foreground/90 whitespace-pre-line leading-relaxed">
                    {event.requirements}
                  </p>
                </CardContent>
              </Card>
            )}

            {event.instructions && (
              <Card className="border border-primary/30 bg-primary/5">
                <CardContent className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Instruções no Dia
                  </h4>
                  <p className="text-xs text-foreground/90 whitespace-pre-line leading-relaxed">
                    {event.instructions}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Organizer Privileged Section: Participants list */}
        {event.isCreator && isSupabaseId && (
          <div className="p-4 rounded-xl border border-primary/30 bg-secondary/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Inscrições Recebidas ({registrations.length})
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Gerencie aprovações e recusas com notificações automáticas
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-[11px] border-primary/40 text-primary gap-1"
                  onClick={() => navigate("/organizer")}
                >
                  <ExternalLink className="w-3 h-3" />
                  Painel Geral do Clube
                </Button>
                <Badge variant="secondary" className="text-[10px]">
                  Organizador
                </Badge>
              </div>
            </div>

            {/* Filter tags for organizer */}
            <div className="flex items-center gap-1.5 pt-1">
              <Button
                size="sm"
                variant={regFilter === "all" ? "default" : "outline"}
                className="h-6 text-[10px] px-2 rounded-full"
                onClick={() => setRegFilter("all")}
              >
                Todas ({registrations.length})
              </Button>
              <Button
                size="sm"
                variant={regFilter === "pending" ? "default" : "outline"}
                className="h-6 text-[10px] px-2 rounded-full border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                onClick={() => setRegFilter("pending")}
              >
                Pendentes (
                {registrations.filter((r) => r.status === "pending").length})
              </Button>
              <Button
                size="sm"
                variant={regFilter === "approved" ? "default" : "outline"}
                className="h-6 text-[10px] px-2 rounded-full border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                onClick={() => setRegFilter("approved")}
              >
                Aprovadas (
                {
                  registrations.filter(
                    (r) => r.status === "approved" || r.status === "confirmed",
                  ).length
                }
                )
              </Button>
              <Button
                size="sm"
                variant={regFilter === "rejected" ? "default" : "outline"}
                className="h-6 text-[10px] px-2 rounded-full border-red-500/50 text-red-500 hover:bg-red-500/10"
                onClick={() => setRegFilter("rejected")}
              >
                Recusadas (
                {registrations.filter((r) => r.status === "rejected").length})
              </Button>
            </div>

            {registrations.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">
                Nenhum participante inscrito até o momento.
              </p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {registrations
                  .filter((r) => {
                    if (regFilter === "all") return true
                    if (regFilter === "pending") return r.status === "pending"
                    if (regFilter === "approved")
                      return r.status === "approved" || r.status === "confirmed"
                    if (regFilter === "rejected") return r.status === "rejected"
                    return true
                  })
                  .map((r) => (
                    <div
                      key={r.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-background border border-border/40 text-xs gap-2"
                    >
                      <div
                        className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
                        onClick={() => navigate(`/profile/${r.userId}`)}
                      >
                        <Avatar className="w-8 h-8 border border-border">
                          <AvatarImage src={r.participant?.avatar} />
                          <AvatarFallback>
                            {r.participant?.name?.[0] || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-foreground hover:text-primary transition-colors">
                              {r.participant?.name}
                            </p>
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <p className="text-[10px] text-muted-foreground">
                            {r.participant?.sport || "Atleta"}{" "}
                            {r.participant?.position
                              ? `• ${r.participant.position}`
                              : ""}{" "}
                            • {r.participant?.city || "Brasil"}
                            {r.participant?.state
                              ? `/${r.participant.state}`
                              : ""}
                          </p>
                          <span className="text-[10px] text-muted-foreground/80">
                            Inscrito em{" "}
                            {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <Badge
                          variant="outline"
                          className={
                            r.status === "approved" || r.status === "confirmed"
                              ? "text-[10px] text-emerald-600 border-emerald-500/40 bg-emerald-500/10"
                              : r.status === "rejected"
                                ? "text-[10px] text-red-600 border-red-500/40 bg-red-500/10"
                                : "text-[10px] text-amber-500 border-amber-500/40 bg-amber-500/10"
                          }
                        >
                          {r.status === "approved"
                            ? "Aprovado"
                            : r.status === "confirmed"
                              ? "Confirmado"
                              : r.status === "rejected"
                                ? "Recusado"
                                : "Pendente"}
                        </Badge>

                        {/* Action buttons */}
                        {r.status !== "canceled" && (
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={
                                r.status === "approved" ||
                                r.status === "confirmed"
                              }
                              className="h-7 px-2 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-medium"
                              onClick={() =>
                                setActionRegistration({
                                  item: r,
                                  action: "approved",
                                })
                              }
                            >
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={r.status === "rejected"}
                              className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium"
                              onClick={() =>
                                setActionRegistration({
                                  item: r,
                                  action: "rejected",
                                })
                              }
                            >
                              <X className="w-3.5 h-3.5 mr-1" />
                              Recusar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Approval / Rejection */}
      <AlertDialog
        open={!!actionRegistration}
        onOpenChange={(open) => !open && setActionRegistration(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionRegistration?.action === "approved"
                ? "Confirmar Aprovação da Inscrição"
                : "Confirmar Recusa da Inscrição"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionRegistration?.action === "approved" ? (
                <>
                  Deseja realmente aprovar a inscrição de{" "}
                  <strong>{actionRegistration?.item.participant?.name}</strong>?
                  O atleta receberá uma notificação oficial de aprovação e sua
                  vaga será confirmada.
                </>
              ) : (
                <>
                  Deseja realmente recusar a inscrição de{" "}
                  <strong>{actionRegistration?.item.participant?.name}</strong>?
                  O atleta será notificado de maneira respeitosa sobre o
                  resultado da seletiva. O registro será mantido com status
                  recusado.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={actionLoading}
              className={
                actionRegistration?.action === "approved"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }
              onClick={async (e) => {
                e.preventDefault()
                if (!actionRegistration || !user?.id) return

                setActionLoading(true)
                const { error, success } =
                  await eventsService.updateRegistrationStatus({
                    registrationId: actionRegistration.item.id,
                    newStatus: actionRegistration.action,
                    organizerId: user.id,
                  })
                setActionLoading(false)

                if (error || !success) {
                  toast.error(
                    error?.message ||
                      "Não foi possível atualizar o status da inscrição.",
                  )
                  return
                }

                // Update local state smoothly
                setRegistrations((prev) =>
                  prev.map((r) =>
                    r.id === actionRegistration.item.id
                      ? {
                          ...r,
                          status:
                            actionRegistration.action as RegistrationStatus,
                        }
                      : r,
                  ),
                )

                toast.success(
                  actionRegistration.action === "approved"
                    ? "Inscrição aprovada com sucesso! O atleta foi notificado."
                    : "Inscrição recusada com sucesso. O atleta foi notificado.",
                )

                // Track approval/rejection metrics
                analyticsService.trackEvent({
                  eventName:
                    actionRegistration.action === "approved"
                      ? "registration_approved"
                      : "registration_rejected",
                  userId: user?.id,
                  targetId: actionRegistration.item.id,
                  metadata: {
                    event_id: id,
                    athlete_id: actionRegistration.item.userId,
                  },
                })

                setActionRegistration(null)
              }}
            >
              {actionLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : null}
              {actionRegistration?.action === "approved"
                ? "Confirmar Aprovação"
                : "Confirmar Recusa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Floating Bottom Action Bar */}
      {/* Positioned above BottomNav on mobile (z-40 + bottom-16 / md:bottom-0) */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 p-3.5 sm:p-4 bg-background/95 backdrop-blur-md border-t border-border/50 z-40 shadow-xl transition-all">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {/* Quick share action button in bottom bar */}
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-xl shrink-0 border-primary/40 text-primary hover:bg-primary/10"
            onClick={() => setIsShareOpen(true)}
            title="Compartilhar Peneira via WhatsApp"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">
              Inscrição
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-primary">
                {event.price}
              </span>
              {realEvent?.maxParticipants && (
                <span className="text-[11px] text-muted-foreground hidden sm:inline">
                  •{" "}
                  {Math.max(
                    0,
                    realEvent.maxParticipants -
                      (realEvent.registrationsCount || 0),
                  )}{" "}
                  vagas restantes
                </span>
              )}
            </div>
          </div>

          {isRegistered ? (
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors text-xs sm:text-sm h-11 px-4 sm:px-5 font-semibold shrink-0"
              onClick={handleCancelRegistration}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600 shrink-0" />
              )}
              <span>Inscrição Confirmada</span>
              <span className="text-[10px] opacity-75 ml-1 hidden xs:inline">
                (Cancelar)
              </span>
            </Button>
          ) : isClosed ? (
            <Button
              variant="outline"
              disabled
              className="px-5 sm:px-6 h-11 font-bold text-muted-foreground border-border shrink-0 text-xs sm:text-sm"
            >
              Inscrições Encerradas
            </Button>
          ) : isPastDeadline ? (
            <Button
              variant="outline"
              disabled
              className="px-5 sm:px-6 h-11 font-bold text-muted-foreground border-border shrink-0 text-xs sm:text-sm"
            >
              Prazo Encerrado
            </Button>
          ) : isSoldOut ? (
            <Button
              variant="outline"
              disabled
              className="px-5 sm:px-6 h-11 font-bold text-muted-foreground border-border shrink-0 text-xs sm:text-sm"
            >
              Sem Vagas
            </Button>
          ) : (
            <Button
              className="px-6 sm:px-8 h-11 font-bold text-xs sm:text-sm shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 text-white transition-all active:scale-95 shrink-0"
              onClick={handleRegister}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Inscrição em andamento...
                </>
              ) : (
                "Inscrever-se"
              )}
            </Button>
          )}
        </div>
      </div>
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        title={
          event.type?.includes("Peneira")
            ? `⭐ Peneira Oficial: ${event.title}`
            : event.title
        }
        description={
          event.type?.includes("Peneira")
            ? `⚽ Seletiva/Peneira Oficial aberta: "${event.title}" (${event.sport}) no Goplay App! Local: ${event.location}. Vagas abertas, inscreva-se já pelo link:`
            : `🏆 Participe de "${event.title}" (${event.sport}) no Goplay App! Local: ${event.location}. Acesse e faça sua inscrição:`
        }
        url={
          typeof window !== "undefined"
            ? `${window.location.origin}/events/${id}`
            : undefined
        }
        onShareAction={(platform) => {
          if (id) {
            analyticsService.trackEventShare(id, platform || "native", user?.id)
          }
        }}
      />
    </div>
  )
}
