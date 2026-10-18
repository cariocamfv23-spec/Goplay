import { useParams, useNavigate } from 'react-router-dom'
import { mockEvents } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
} from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  eventsService,
  type EventItem,
  type RegistrationItem,
} from '@/services/events'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

export default function EventDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [realEvent, setRealEvent] = useState<EventItem | null>(null)
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const isSupabaseId =
    typeof id === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  const mockEvent = !isSupabaseId
    ? (mockEvents.find((e) => String(e.id) === String(id)) as any)
    : null

  useEffect(() => {
    if (isSupabaseId && id) {
      setLoading(true)
      eventsService.getEventById(id, user?.id).then(({ data, error }) => {
        setLoading(false)
        if (error || !data) {
          toast.error('Evento não encontrado.')
          return
        }
        setRealEvent(data)
        setIsRegistered(data.isRegistered ?? false)

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
    if (!user?.id) {
      toast.error('Você precisa fazer login para se inscrever.', {
        action: {
          label: 'Fazer Login',
          onClick: () => navigate('/login'),
        },
      })
      return
    }

    if (isSupabaseId && id) {
      setSubmitting(true)
      const { success, error } = await eventsService.registerForEvent({
        eventId: id,
        userId: user.id,
      })
      setSubmitting(false)

      if (error) {
        toast.error(error.message)
        return
      }

      setIsRegistered(true)
      toast.success('Inscrição confirmada com sucesso!', {
        description:
          'Verifique suas notificações e compareça no horário indicado.',
      })
      if (realEvent) {
        setRealEvent({
          ...realEvent,
          registrationsCount: (realEvent.registrationsCount || 0) + 1,
        })
      }
    } else {
      setIsRegistered(true)
      toast.success('Inscrição confirmada!')
    }
  }

  const handleCancelRegistration = async () => {
    if (!user?.id || !isSupabaseId || !id) return
    if (!confirm('Deseja realmente cancelar sua inscrição?')) return

    setSubmitting(true)
    const { error } = await eventsService.cancelRegistration(id, user.id)
    setSubmitting(false)

    if (error) {
      toast.error('Erro ao cancelar inscrição.')
      return
    }

    setIsRegistered(false)
    toast.success('Inscrição cancelada com sucesso.')
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

  const event = realEvent
    ? {
        title: realEvent.title,
        description: realEvent.description,
        image:
          realEvent.bannerUrl ||
          'https://img.usecurling.com/p/800/400?q=stadium%20field',
        sport: realEvent.sport,
        type: realEvent.type === 'tryout' ? 'Peneira Oficial' : 'Campeonato',
        date: new Date(realEvent.eventDate).toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        time: realEvent.eventTime,
        location: `${realEvent.locationName} - ${realEvent.city}, ${realEvent.state}`,
        address: realEvent.address,
        price:
          realEvent.price === 0
            ? 'Gratuito'
            : `R$ ${realEvent.price.toFixed(2)}`,
        attendees: realEvent.registrationsCount || 0,
        maxAttendees: realEvent.maxParticipants || 100,
        creator: realEvent.creator,
        requirements: realEvent.requirements,
        instructions: realEvent.instructions,
        deadline: realEvent.registrationDeadline
          ? new Date(realEvent.registrationDeadline).toLocaleDateString('pt-BR')
          : null,
        isCreator: user?.id && realEvent.creatorId === user.id,
      }
    : mockEvent
      ? {
          title: mockEvent.title,
          description: mockEvent.description,
          image: mockEvent.image,
          sport: mockEvent.sport,
          type: 'Evento',
          date: mockEvent.date,
          time: '09:00',
          location: mockEvent.location,
          address: undefined,
          price: mockEvent.price,
          attendees: mockEvent.attendees,
          maxAttendees: 50,
          creator: { name: 'Organizador Oficial', avatar: '', type: 'club' },
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
        <Button onClick={() => navigate('/events')}>Voltar para a lista</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
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
            className="rounded-full bg-background/80 backdrop-blur-md"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-md"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href)
              toast.success('Link do evento copiado!')
            }}
          >
            <Share2 className="w-5 h-5" />
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
                event.type.includes('Peneira')
                  ? 'bg-amber-500/90 text-black border-amber-400 font-extrabold'
                  : 'bg-background/80 backdrop-blur-md'
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
              <AvatarFallback>{event.creator?.name?.[0] || 'O'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">
                {event.creator?.name || 'Organizador Goplay'}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {event.creator?.type === 'club'
                  ? 'Clube Oficial'
                  : 'Organizador Autorizado'}
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
            {event.description || 'Nenhuma descrição detalhada informada.'}
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Inscrições Recebidas ({registrations.length})
              </h3>
              <Badge variant="secondary" className="text-[10px]">
                Visão do Organizador
              </Badge>
            </div>
            {registrations.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">
                Nenhum participante inscrito até o momento.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {registrations.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-background border border-border/40 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={r.participant?.avatar} />
                        <AvatarFallback>
                          {r.participant?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{r.participant?.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {r.participant?.sport || 'Atleta'} •{' '}
                          {r.participant?.city || 'Brasil'}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-emerald-600 border-emerald-500/40"
                    >
                      Confirmado
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border/40 z-20 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">
              Inscrição
            </span>
            <span className="text-lg font-bold text-primary">
              {event.price}
            </span>
          </div>

          {isRegistered ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 bg-emerald-50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors text-xs h-11"
                onClick={handleCancelRegistration}
                disabled={submitting}
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                )}
                Inscrito (Cancelar)
              </Button>
            </div>
          ) : (
            <Button
              className="px-6 h-11 font-bold shadow-lg shadow-primary/25 bg-primary text-white"
              onClick={handleRegister}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                'Quero me Inscrever'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
