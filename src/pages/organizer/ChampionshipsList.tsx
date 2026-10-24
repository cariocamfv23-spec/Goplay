import { useChampionshipStore } from "@/stores/useChampionshipStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Plus,
  Trophy,
  Calendar,
  Users,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Check,
  X,
  Loader2,
  MessageSquare,
  Award,
  UserCheck,
  UserX,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  eventsService,
  type EventItem,
  type RegistrationItem,
  type RegistrationStatus,
  type AttendanceStatus,
  type AthleteEvaluationStatus,
} from "@/services/events"
import { TryoutEvaluationModal } from "@/components/organizer/TryoutEvaluationModal"
import MassEmailManager from "@/components/organizer/MassEmailManager"
import { Mail } from "lucide-react"
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

export default function ChampionshipsList() {
  const { championships } = useChampionshipStore()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] =
    useState<"peneiras" | "events" | "registrations" | "emails" | "tournaments">(
      "peneiras",
    )
  const [statusFilter, setStatusFilter] =
    useState<"all" | "pending" | "approved" | "rejected">("all")

  // Selected event filter for Peneiras tab
  const [selectedTryoutId, setSelectedTryoutId] = useState<string>("all")

  const [realEvents, setRealEvents] = useState<EventItem[]>([])
  const [realRegistrations, setRealRegistrations] =
    useState<RegistrationItem[]>([])
  const [loading, setLoading] = useState(true)

  // Evaluation modal state
  const [evaluationModalReg, setEvaluationModalReg] =
    useState<RegistrationItem | null>(null)
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false)

  // Updating registration attendance/status spinner
  const [updatingRegId, setUpdatingRegId] = useState<string | null>(null)

  // Decision state for confirmation modal
  const [decisionItem, setDecisionItem] = useState<{
    item: RegistrationItem
    action: "approved" | "rejected"
  } | null>(null)
  const [decisionLoading, setDecisionLoading] = useState(false)

  // Load real events & registrations for current organizer
  const loadOrganizerData = useCallback(async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }
    setLoading(true)
    const [eventsRes, regsRes] = await Promise.all([
      eventsService.getOrganizerEvents(user.id),
      eventsService.getOrganizerAllRegistrations(user.id),
    ])
    setRealEvents(eventsRes.data || [])
    setRealRegistrations(regsRes.data || [])
    setLoading(false)
  }, [user?.id])

  useEffect(() => {
    loadOrganizerData()
  }, [loadOrganizerData])

  const filteredTournaments = championships.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredRealEvents = realEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.sport.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredRegistrations = realRegistrations.filter((r) => {
    const matchesSearch =
      (r.participant?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (r.eventTitle || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.participant?.sport || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (r.participant?.city || "").toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "pending"
          ? r.status === "pending"
          : statusFilter === "approved"
            ? r.status === "approved" || r.status === "confirmed"
            : r.status === "rejected"

    return matchesSearch && matchesStatus
  })

  // Metric counts
  const totalEventsCount = realEvents.length
  const totalRegistrationsCount = realRegistrations.length
  const pendingCount = realRegistrations.filter(
    (r) => r.status === "pending",
  ).length
  const approvedCount = realRegistrations.filter(
    (r) => r.status === "approved" || r.status === "confirmed",
  ).length
  const rejectedCount = realRegistrations.filter(
    (r) => r.status === "rejected",
  ).length

  const handleDecisionConfirm = async () => {
    if (!decisionItem || !user?.id) return
    setDecisionLoading(true)
    const { error, success } = await eventsService.updateRegistrationStatus({
      registrationId: decisionItem.item.id,
      newStatus: decisionItem.action,
      organizerId: user.id,
    })
    setDecisionLoading(false)

    if (error || !success) {
      toast.error(error?.message || "Erro ao processar decisão.")
      return
    }

    setRealRegistrations((prev) =>
      prev.map((r) =>
        r.id === decisionItem.item.id
          ? { ...r, status: decisionItem.action as RegistrationStatus }
          : r,
      ),
    )

    toast.success(
      decisionItem.action === "approved"
        ? "Inscrição aprovada com sucesso! O atleta foi notificado."
        : "Inscrição recusada com sucesso. O atleta foi notificado.",
    )
    setDecisionItem(null)
  }

  // Handle Attendance mark (Present / Absent)
  const handleAttendanceChange = async (
    reg: RegistrationItem,
    newAttendance: AttendanceStatus,
  ) => {
    if (!user?.id) return
    setUpdatingRegId(reg.id)

    // Automatically set athlete_status to 'compareceu' if marking present and not already decided
    let nextAthleteStatus = reg.athleteStatus
    if (
      newAttendance === "present" &&
      (!reg.athleteStatus || reg.athleteStatus === "inscrito")
    ) {
      nextAthleteStatus = "compareceu"
    }

    const { error, success } = await eventsService.updateAthleteTryoutStatus({
      registrationId: reg.id,
      organizerId: user.id,
      attendance: newAttendance,
      athleteStatus: nextAthleteStatus,
      previousAthleteStatus: reg.athleteStatus,
    })
    setUpdatingRegId(null)

    if (error || !success) {
      toast.error(error?.message || "Erro ao atualizar presença do atleta.")
      return
    }

    setRealRegistrations((prev) =>
      prev.map((r) =>
        r.id === reg.id
          ? {
              ...r,
              attendance: newAttendance,
              athleteStatus: nextAthleteStatus,
              statusUpdatedAt: new Date().toISOString(),
            }
          : r,
      ),
    )

    toast.success(
      newAttendance === "present"
        ? "Presença confirmada no treino/peneira!"
        : "Atleta marcado como ausente.",
    )
  }

  // Handle Athlete Status change (inscrito | compareceu | aprovado | convocado | nao_selecionado)
  const handleAthleteStatusChange = async (
    reg: RegistrationItem,
    newStatus: AthleteEvaluationStatus,
  ) => {
    if (!user?.id) return
    setUpdatingRegId(reg.id)

    const { error, success } = await eventsService.updateAthleteTryoutStatus({
      registrationId: reg.id,
      organizerId: user.id,
      athleteStatus: newStatus,
      previousAthleteStatus: reg.athleteStatus,
    })
    setUpdatingRegId(null)

    if (error || !success) {
      toast.error(error?.message || "Erro ao atualizar status do atleta.")
      return
    }

    setRealRegistrations((prev) =>
      prev.map((r) =>
        r.id === reg.id
          ? {
              ...r,
              athleteStatus: newStatus,
              statusUpdatedAt: new Date().toISOString(),
            }
          : r,
      ),
    )

    const labelMap: Record<string, string> = {
      inscrito: "Inscrito",
      compareceu: "Compareceu",
      aprovado: "Aprovado",
      convocado: "Convocado",
      nao_selecionado: "Não Selecionado",
    }

    toast.success(
      `Status atualizado para "${labelMap[newStatus || ""] || newStatus}". O atleta foi notificado!`,
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600"
      case "completed":
        return "bg-zinc-500 hover:bg-zinc-600"
      case "open":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-yellow-500 hover:bg-yellow-600"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Em Andamento"
      case "completed":
        return "Finalizado"
      case "open":
        return "Inscrições"
      default:
        return "Rascunho"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Trophy className="h-6 w-6 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  Painel do Clube & Organizador
                </h1>
                {profile?.account_type && (
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold border-primary/30 text-primary"
                  >
                    {profile.account_type === "club"
                      ? "Clube Oficial"
                      : profile.account_type === "coach"
                        ? "Treinador"
                        : "Atleta"}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Administre eventos, peneiras oficiais e inscrições com dados
                reais do Supabase
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/organizer/create")}
            className="gap-2 bg-primary text-white shadow-md rounded-xl h-10 px-4 text-xs font-semibold"
          >
            <Plus className="h-4 w-4" /> Criar Evento / Peneira
          </Button>
        </div>
      </div>

      {/* Helpful banner if user is currently logged in as athlete */}
      {user && profile && profile.account_type === "athlete" && (
        <div className="mb-6 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="text-xs text-amber-800 dark:text-amber-200">
            Você está conectado com o perfil de{" "}
            <strong>{profile.full_name}</strong> (Atleta). Para gerenciar
            seletivas oficiais completas como Clube ou Treinador, você pode
            alterar seu tipo no perfil ou usar uma das contas demo oficiais.
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-amber-500/40 text-amber-600 hover:bg-amber-500/10 shrink-0 self-start sm:self-auto"
            onClick={() => navigate("/profile/me")}
          >
            Editar Perfil
          </Button>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card className="border border-border/50 bg-secondary/20 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">
                Meus Eventos
              </span>
              <span className="text-2xl font-black text-foreground">
                {totalEventsCount}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Calendar className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-amber-500/20 bg-amber-500/5 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block">
                Pendentes
              </span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {pendingCount}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-emerald-500/20 bg-emerald-500/5 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                Aprovadas
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {approvedCount}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-500/20 bg-red-500/5 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-red-600 dark:text-red-400 font-bold uppercase tracking-wider block">
                Recusadas
              </span>
              <span className="text-2xl font-black text-red-600 dark:text-red-400">
                {rejectedCount}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-red-500/20 text-red-600">
              <XCircle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as any)}
        className="w-full"
      >
        <TabsList className="w-full h-auto p-1 bg-secondary/50 rounded-xl mb-4 grid grid-cols-2 sm:grid-cols-5 gap-1">
          <TabsTrigger
            value="peneiras"
            className="rounded-lg text-xs font-semibold py-2 data-[state=active]:bg-background data-[state=active]:shadow-xs text-amber-500 font-bold"
          >
            ⭐ Peneiras
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="rounded-lg text-xs font-semibold py-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            Eventos ({realEvents.length})
          </TabsTrigger>
          <TabsTrigger
            value="registrations"
            className="rounded-lg text-xs font-semibold py-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            Inscrições ({realRegistrations.length})
          </TabsTrigger>
          <TabsTrigger
            value="emails"
            className="rounded-lg text-xs font-semibold py-2 data-[state=active]:bg-background data-[state=active]:shadow-xs text-primary font-bold flex items-center justify-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            E-mails
          </TabsTrigger>
          <TabsTrigger
            value="tournaments"
            className="rounded-lg text-xs font-semibold py-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            Chaveamentos ({championships.length})
          </TabsTrigger>
        </TabsList>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={
              activeTab === "peneiras"
                ? "Buscar atleta ou peneira pelo nome..."
                : activeTab === "registrations"
                  ? "Buscar atleta pelo nome, modalidade, cidade ou evento..."
                  : activeTab === "events"
                    ? "Buscar por título, modalidade ou cidade..."
                    : "Buscar campeonato..."
            }
            className="pl-9 bg-secondary/50 border border-border/40 rounded-xl h-10 text-xs sm:text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TAB 0: Peneiras Operantes (Presença, Status do Atleta e Avaliação Técnica) */}
        <TabsContent value="peneiras" className="space-y-4">
          {/* Tryout filter dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-secondary/30 rounded-xl border border-border/40">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-foreground">
                Selecione a Peneira / Evento
              </span>
              <p className="text-[11px] text-muted-foreground">
                Gerencie presença, notas técnicas e status de aprovação de cada
                candidato
              </p>
            </div>
            <div className="w-full sm:w-64">
              <Select
                value={selectedTryoutId}
                onValueChange={(val) => setSelectedTryoutId(val)}
              >
                <SelectTrigger className="h-9 text-xs bg-background">
                  <SelectValue placeholder="Todas as minhas peneiras" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as minhas peneiras</SelectItem>
                  {realEvents.map((ev) => (
                    <SelectItem key={ev.id} value={ev.id}>
                      {ev.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">
                Carregando atletas inscritos na seletiva...
              </span>
            </div>
          ) : (
            (() => {
              const tryoutRegistrations = realRegistrations.filter((r) => {
                if (
                  selectedTryoutId !== "all" &&
                  r.eventId !== selectedTryoutId
                ) {
                  return false
                }
                if (search.trim()) {
                  const q = search.toLowerCase()
                  const name = r.participant?.name?.toLowerCase() || ""
                  const evTitle = r.eventTitle?.toLowerCase() || ""
                  const pos = r.participant?.position?.toLowerCase() || ""
                  return (
                    name.includes(q) || evTitle.includes(q) || pos.includes(q)
                  )
                }
                return true
              })

              if (tryoutRegistrations.length === 0) {
                return (
                  <Card className="border-dashed border-border/60 bg-secondary/20">
                    <CardContent className="py-10 text-center space-y-2">
                      <Award className="h-10 w-10 mx-auto text-amber-500/40" />
                      <p className="font-semibold text-sm">
                        Nenhum atleta inscrito nesta peneira ainda.
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Divulgue sua peneira para receber inscrições. Quando os
                        atletas se inscreverem, você poderá marcar presença,
                        avaliar nota técnica de 1 a 10 e definir se foi aprovado
                        ou convocado.
                      </p>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <div className="space-y-3">
                  {tryoutRegistrations.map((r) => {
                    const isUpdating = updatingRegId === r.id
                    const athleteStatusLabel =
                      r.athleteStatus === "aprovado"
                        ? "Aprovado"
                        : r.athleteStatus === "convocado"
                          ? "Convocado"
                          : r.athleteStatus === "compareceu"
                            ? "Compareceu"
                            : r.athleteStatus === "nao_selecionado"
                              ? "Não Selecionado"
                              : r.athleteStatus === "inscrito"
                                ? "Inscrito"
                                : "Sem status"

                    return (
                      <Card
                        key={r.id}
                        className="border border-border/40 shadow-xs hover:border-border/80 transition-all overflow-hidden"
                      >
                        <CardContent className="p-4 space-y-3">
                          {/* Top row: Athlete identity and Quick Info */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <Avatar
                                className="w-12 h-12 border border-border cursor-pointer hover:opacity-85 shrink-0"
                                onClick={() => navigate(`/profile/${r.userId}`)}
                              >
                                <AvatarImage src={r.participant?.avatar} />
                                <AvatarFallback>
                                  {r.participant?.name?.[0] || "A"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4
                                    onClick={() =>
                                      navigate(`/profile/${r.userId}`)
                                    }
                                    className="font-bold text-sm sm:text-base text-foreground hover:text-primary cursor-pointer transition-colors"
                                  >
                                    {r.participant?.name}
                                  </h4>

                                  {/* Attendance badge */}
                                  {r.attendance === "present" && (
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px] font-bold">
                                      <UserCheck className="w-3 h-3 mr-1" />
                                      Presente
                                    </Badge>
                                  )}
                                  {r.attendance === "absent" && (
                                    <Badge className="bg-red-500/10 text-red-600 border-red-500/30 text-[10px] font-bold">
                                      <UserX className="w-3 h-3 mr-1" />
                                      Ausente
                                    </Badge>
                                  )}

                                  {/* Athlete status badge */}
                                  {r.athleteStatus && (
                                    <Badge
                                      variant="outline"
                                      className={
                                        r.athleteStatus === "aprovado" ||
                                        r.athleteStatus === "convocado"
                                          ? "bg-amber-500/10 text-amber-500 border-amber-500/40 text-[10px] font-bold"
                                          : r.athleteStatus ===
                                              "nao_selecionado"
                                            ? "bg-zinc-500/10 text-zinc-500 border-zinc-500/30 text-[10px]"
                                            : "bg-blue-500/10 text-blue-500 border-blue-500/30 text-[10px]"
                                      }
                                    >
                                      {athleteStatusLabel}
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-xs text-muted-foreground mt-0.5">
                                  <strong className="text-foreground/90">
                                    {r.participant?.sport || "Atleta"}
                                  </strong>
                                  {r.participant?.position &&
                                    ` • ${r.participant.position}`}
                                  {r.participant?.city &&
                                    ` • ${r.participant.city}/${r.participant.state || ""}`}
                                </p>

                                <p className="text-[11px] text-primary truncate font-medium mt-0.5">
                                  Peneira: {r.eventTitle}
                                </p>
                              </div>
                            </div>

                            {/* Quick profile actions */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => navigate(`/profile/${r.userId}`)}
                              >
                                Ver Perfil
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-8 text-xs"
                                onClick={() =>
                                  navigate(`/messages/user-${r.userId}`)
                                }
                              >
                                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                                Mensagem
                              </Button>
                            </div>
                          </div>

                          {/* Interactive Controls Row: Attendance + Status + Evaluation */}
                          <div className="pt-2 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
                            {/* Attendance toggle buttons */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-muted-foreground shrink-0 w-16">
                                Presença:
                              </span>
                              <div className="flex items-center gap-1 flex-1">
                                <Button
                                  size="sm"
                                  variant={
                                    r.attendance === "present"
                                      ? "default"
                                      : "outline"
                                  }
                                  disabled={isUpdating}
                                  onClick={() =>
                                    handleAttendanceChange(r, "present")
                                  }
                                  className={`h-8 flex-1 text-xs ${
                                    r.attendance === "present"
                                      ? "bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                                      : "border-border/60 hover:bg-emerald-500/10 hover:text-emerald-600"
                                  }`}
                                >
                                  <UserCheck className="w-3.5 h-3.5 mr-1" />
                                  Presente
                                </Button>
                                <Button
                                  size="sm"
                                  variant={
                                    r.attendance === "absent"
                                      ? "default"
                                      : "outline"
                                  }
                                  disabled={isUpdating}
                                  onClick={() =>
                                    handleAttendanceChange(r, "absent")
                                  }
                                  className={`h-8 flex-1 text-xs ${
                                    r.attendance === "absent"
                                      ? "bg-red-600 hover:bg-red-700 text-white font-bold"
                                      : "border-border/60 hover:bg-red-500/10 hover:text-red-600"
                                  }`}
                                >
                                  <UserX className="w-3.5 h-3.5 mr-1" />
                                  Ausente
                                </Button>
                              </div>
                            </div>

                            {/* Athlete status selector */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-muted-foreground shrink-0">
                                Status:
                              </span>
                              <div className="flex-1">
                                <Select
                                  value={r.athleteStatus || "inscrito"}
                                  disabled={isUpdating}
                                  onValueChange={(val) =>
                                    handleAthleteStatusChange(
                                      r,
                                      val as AthleteEvaluationStatus,
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs bg-background">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="inscrito">
                                      Inscrito
                                    </SelectItem>
                                    <SelectItem value="compareceu">
                                      Compareceu
                                    </SelectItem>
                                    <SelectItem value="aprovado">
                                      Aprovado ⭐
                                    </SelectItem>
                                    <SelectItem value="convocado">
                                      Convocado 🏆
                                    </SelectItem>
                                    <SelectItem value="nao_selecionado">
                                      Não Selecionado
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Open Evaluation modal button */}
                            <div className="flex justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEvaluationModalReg(r)
                                  setIsEvaluationOpen(true)
                                }}
                                className="w-full sm:w-auto h-8 text-xs font-bold border-amber-500/40 text-amber-500 hover:bg-amber-500/10 gap-1.5"
                              >
                                <Award className="w-3.5 h-3.5" />
                                Avaliação Técnica (1–10)
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )
            })()
          )}
        </TabsContent>

        {/* TAB 1: Peneiras & Eventos Oficiais */}
        <TabsContent value="events" className="space-y-3">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">
                Carregando eventos do clube...
              </span>
            </div>
          ) : filteredRealEvents.length === 0 ? (
            <Card className="border-dashed border-border/60 bg-secondary/20">
              <CardContent className="py-10 text-center space-y-3">
                <Trophy className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <div>
                  <p className="font-semibold text-sm">
                    {search
                      ? "Nenhum evento encontrado para esta busca."
                      : "Nenhum evento ou peneira criado ainda."}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Crie sua primeira peneira oficial para receber inscrições de
                    atletas pelo Goplay.
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/organizer/create")}
                  className="bg-primary text-white text-xs"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Criar Peneira Oficial
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredRealEvents.map((ev) => (
              <Card
                key={ev.id}
                className="border border-border/40 shadow-xs hover:border-primary/40 transition-all overflow-hidden"
              >
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src={
                        ev.bannerUrl ||
                        "https://img.usecurling.com/p/800/400?q=sports%20stadium"
                      }
                      alt={ev.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-border/40"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <Badge
                          variant="outline"
                          className={
                            ev.type === "tryout"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/30 text-[10px] font-bold"
                              : "bg-primary/10 text-primary border-primary/30 text-[10px]"
                          }
                        >
                          {ev.type === "tryout"
                            ? "⭐ Peneira Oficial"
                            : "Torneio / Evento"}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {ev.sport}
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">
                          {ev.category}
                        </span>
                      </div>
                      <h3
                        onClick={() => navigate(`/events/${ev.id}`)}
                        className="font-bold text-sm sm:text-base leading-snug truncate hover:text-primary cursor-pointer transition-colors"
                      >
                        {ev.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(ev.eventDate).toLocaleDateString("pt-BR")} às{" "}
                        {ev.eventTime} • {ev.city}/{ev.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-border/40 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-semibold text-primary block">
                        {ev.registrationsCount || 0} candidatos
                      </span>
                      {ev.maxParticipants && (
                        <span className="text-[10px] text-muted-foreground">
                          máx. {ev.maxParticipants} vagas
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs gap-1 border-primary/30 text-primary"
                        onClick={() => navigate(`/events/${ev.id}`)}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver Inscrições
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* TAB 2: Inscrições e Candidatos Reais */}
        <TabsContent value="registrations" className="space-y-3">
          {/* Status filter chips */}
          <div className="flex flex-wrap items-center gap-1.5 pb-1">
            <Button
              size="sm"
              variant={statusFilter === "all" ? "default" : "outline"}
              className="h-7 text-xs rounded-full"
              onClick={() => setStatusFilter("all")}
            >
              Todas ({realRegistrations.length})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === "pending" ? "default" : "outline"}
              className="h-7 text-xs rounded-full border-amber-500/40 text-amber-500 hover:bg-amber-500/10"
              onClick={() => setStatusFilter("pending")}
            >
              Pendentes ({pendingCount})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === "approved" ? "default" : "outline"}
              className="h-7 text-xs rounded-full border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10"
              onClick={() => setStatusFilter("approved")}
            >
              Aprovadas ({approvedCount})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === "rejected" ? "default" : "outline"}
              className="h-7 text-xs rounded-full border-red-500/40 text-red-500 hover:bg-red-500/10"
              onClick={() => setStatusFilter("rejected")}
            >
              Recusadas ({rejectedCount})
            </Button>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">
                Buscando candidatos inscritos...
              </span>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <Card className="border-dashed border-border/60 bg-secondary/20">
              <CardContent className="py-10 text-center space-y-2">
                <Users className="h-10 w-10 mx-auto text-muted-foreground/30" />
                <p className="font-semibold text-sm">
                  {statusFilter !== "all"
                    ? `Nenhuma inscrição com status "${statusFilter}".`
                    : "Nenhuma inscrição registrada ainda."}
                </p>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Quando atletas se inscreverem nas suas peneiras e torneios,
                  eles aparecerão aqui com dados completos de perfil para
                  aprovação.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRegistrations.map((r) => (
              <Card
                key={r.id}
                className="border border-border/40 shadow-xs hover:border-border/80 transition-colors"
              >
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <Avatar
                      className="w-11 h-11 border border-border cursor-pointer hover:opacity-85"
                      onClick={() => navigate(`/profile/${r.userId}`)}
                    >
                      <AvatarImage src={r.participant?.avatar} />
                      <AvatarFallback>
                        {r.participant?.name?.[0] || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4
                          onClick={() => navigate(`/profile/${r.userId}`)}
                          className="font-bold text-sm text-foreground hover:text-primary cursor-pointer transition-colors flex items-center gap-1.5"
                        >
                          {r.participant?.name}
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </h4>
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
                      </div>

                      <p className="text-xs text-muted-foreground mt-0.5">
                        <strong className="text-foreground/80">
                          {r.participant?.sport || "Atleta"}
                        </strong>
                        {r.participant?.position &&
                          ` • ${r.participant.position}`}
                        {r.participant?.city && ` • ${r.participant.city}`}
                        {r.participant?.state && `/${r.participant.state}`}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground mt-1">
                        <span className="text-primary font-medium truncate">
                          Evento: {r.eventTitle}
                        </span>
                        <span>•</span>
                        <span>
                          Inscrição em{" "}
                          {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs gap-1"
                      onClick={() => navigate(`/profile/${r.userId}`)}
                    >
                      Ver Perfil
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 text-xs gap-1 bg-secondary hover:bg-secondary/80 text-foreground"
                      onClick={() => navigate(`/messages/user-${r.userId}`)}
                      title="Enviar mensagem direta ao atleta"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1" />
                      Mensagem
                    </Button>

                    <Button
                      size="sm"
                      variant="default"
                      disabled={
                        r.status === "approved" || r.status === "confirmed"
                      }
                      className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                      onClick={() =>
                        setDecisionItem({ item: r, action: "approved" })
                      }
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Aprovar
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={r.status === "rejected"}
                      className="h-8 px-3 text-xs text-red-600 border-red-500/30 hover:bg-red-500/10 font-semibold"
                      onClick={() =>
                        setDecisionItem({ item: r, action: "rejected" })
                      }
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Recusar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* TAB: E-mails em Massa */}
        <TabsContent value="emails" className="space-y-4">
          <MassEmailManager />
        </TabsContent>

        {/* TAB 3: Torneios e Chaveamentos */}
        <TabsContent value="tournaments" className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-muted-foreground">
              Estruturas de ligas e chaves de mata-mata
            </p>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={() => navigate("/organizer/create")}
            >
              Novo Torneio
            </Button>
          </div>

          {filteredTournaments.length === 0 ? (
            <div className="text-center py-10 opacity-60">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">
                Nenhum campeonato encontrado.
              </p>
            </div>
          ) : (
            filteredTournaments.map((champ) => (
              <Card
                key={champ.id}
                className="border border-border/40 shadow-md cursor-pointer hover:scale-[1.01] transition-transform overflow-hidden"
                onClick={() => navigate(`/organizer/${champ.id}`)}
              >
                <div className="h-1.5 bg-gradient-to-r from-primary to-purple-600" />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-base leading-tight">
                      {champ.name}
                    </h3>
                    <Badge
                      className={`${getStatusColor(champ.status)} text-white border-none text-[10px]`}
                    >
                      {getStatusLabel(champ.status)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {champ.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3.5 w-3.5" />
                      {champ.modality}
                    </span>
                    {champ.startDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(champ.startDate).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={!!decisionItem}
        onOpenChange={(open) => !open && setDecisionItem(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {decisionItem?.action === "approved"
                ? "Confirmar Aprovação do Atleta"
                : "Confirmar Recusa da Inscrição"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {decisionItem?.action === "approved" ? (
                <>
                  Deseja aprovar a inscrição de{" "}
                  <strong>{decisionItem?.item.participant?.name}</strong> no
                  evento <strong>"{decisionItem?.item.eventTitle}"</strong>?
                  <br />
                  <br />O atleta receberá uma notificação instantânea e sua vaga
                  será oficializada.
                </>
              ) : (
                <>
                  Deseja recusar a inscrição de{" "}
                  <strong>{decisionItem?.item.participant?.name}</strong> no
                  evento <strong>"{decisionItem?.item.eventTitle}"</strong>?
                  <br />
                  <br />O atleta será notificado de forma cordial e a inscrição
                  será marcada como recusada, mantendo o histórico seguro.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={decisionLoading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={decisionLoading}
              className={
                decisionItem?.action === "approved"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              }
              onClick={(e) => {
                e.preventDefault()
                handleDecisionConfirm()
              }}
            >
              {decisionLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : null}
              {decisionItem?.action === "approved"
                ? "Confirmar Aprovação"
                : "Confirmar Recusa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Tryout Evaluation Modal */}
      <TryoutEvaluationModal
        open={isEvaluationOpen}
        onOpenChange={setIsEvaluationOpen}
        registration={evaluationModalReg}
        currentUserId={user?.id || ""}
      />
    </div>
  )
}
