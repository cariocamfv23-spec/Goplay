import { supabase } from "@/lib/supabase/client"
import { pushNotificationService } from "@/services/push-notifications"

const db = supabase as any

export interface EventItem {
  id: string
  creatorId: string
  title: string
  description: string
  type: "event" | "tryout" | "championship"
  sport: string
  category?: string
  eventDate: string
  eventTime: string
  city: string
  state: string
  locationName: string
  address?: string
  bannerUrl?: string
  requirements?: string
  instructions?: string
  registrationDeadline?: string
  maxParticipants?: number
  price: number
  status: "draft" | "open" | "closed" | "canceled"
  createdAt: string
  creator?: {
    id: string
    name: string
    avatar: string
    type: string
  }
  registrationsCount?: number
  isRegistered?: boolean
  myRegistration?: {
    id: string
    status: RegistrationStatus
    attendance?: AttendanceStatus
    athleteStatus?: AthleteEvaluationStatus
    statusUpdatedAt?: string | null
  } | null
}
export type RegistrationStatus = "pending" | "approved" | "rejected" | "confirmed" | "canceled" | "waitlist"

export type AttendanceStatus = "present" | "absent" | null

export type AthleteEvaluationStatus = "inscrito" | "compareceu" | "aprovado" | "convocado" | "nao_selecionado" | null

export interface EventEvaluation {
  id: string
  eventId: string
  athleteId: string
  clubId: string
  rating: number | null
  strengths: string | null
  improvements: string | null
  internalNotes: string | null
  visibleToAthlete: boolean
  createdAt: string
  updatedAt: string
}

export interface RegistrationItem {
  id: string
  eventId: string
  userId: string
  status: RegistrationStatus
  notes?: string
  attendance?: AttendanceStatus
  athleteStatus?: AthleteEvaluationStatus
  statusUpdatedAt?: string | null
  createdAt: string
  eventTitle?: string
  participant?: {
    id: string
    name: string
    avatar: string
    sport?: string
    position?: string
    city?: string
    state?: string
    birthDate?: string
    experience?: string
  }
}

export interface EventOrganizerStats {
  totalEvents: number
  totalRegistrations: number
  pendingCount: number
  approvedCount: number
  rejectedCount: number
}

export const eventsService = {
  /**
   * Fetches events with optional filter by sport or type ('tryout', 'event', 'championship').
   */
  async getEvents(params?: {
    type?: string
    sport?: string
    currentUserId?: string
  }): Promise<{
    data: EventItem[]
    error: Error | null
  }> {
    try {
      let query = db
        .from("events")
        .select("*")
        .order("event_date", { ascending: true })

      if (params?.type && params.type !== "all") {
        if (params.type === "tryout") {
          query = query.eq("type", "tryout")
        } else if (params.type === "event") {
          // Both championships and tournaments or general events
          query = query.in("type", ["event", "championship"])
        } else {
          query = query.eq("type", params.type)
        }
      }
      if (params?.sport && params.sport !== "Todos") {
        query = query.ilike("sport", `%${params.sport}%`)
      }

      const { data: rawEvents, error } = await query
      if (error) throw error
      if (!rawEvents || rawEvents.length === 0) return { data: [], error: null }

      // Batch fetch creator profiles
      const creatorIds = Array.from(
        new Set(rawEvents.map((e: any) => e.creator_id)),
      )
      const { data: creators } = await db
        .from("profiles")
        .select("id, full_name, avatar_url, account_type")
        .in("id", creatorIds)

      const creatorMap = new Map<string, any>()
      creators?.forEach((c: any) => creatorMap.set(c.id, c))

      // Batch check registrations count and if current user is registered
      const eventIds = rawEvents.map((e: any) => e.id)
      const { data: regData } = await db
        .from("event_registrations")
        .select("event_id, user_id, status")
        .in("event_id", eventIds)

      const regCountMap = new Map<string, number>()
      const userRegSet = new Set<string>()

      regData?.forEach((r: any) => {
        if (r.status !== "canceled") {
          regCountMap.set(r.event_id, (regCountMap.get(r.event_id) || 0) + 1)
        }
        if (
          params?.currentUserId &&
          r.user_id === params.currentUserId &&
          r.status !== "canceled"
        ) {
          userRegSet.add(r.event_id)
        }
      })

      const formatted: EventItem[] = rawEvents.map((e: any) => {
        const creator = creatorMap.get(e.creator_id)
        return {
          id: e.id,
          creatorId: e.creator_id,
          title: e.title,
          description: e.description || "",
          type: e.type as any || "event",
          sport: e.sport,
          category: e.category,
          eventDate: e.event_date,
          eventTime: e.event_time,
          city: e.city,
          state: e.state,
          locationName: e.location_name,
          address: e.address,
          bannerUrl: e.banner_url,
          requirements: e.requirements,
          instructions: e.instructions,
          registrationDeadline: e.registration_deadline,
          maxParticipants: e.max_participants,
          price: Number(e.price) || 0,
          status: e.status as any || "open",
          createdAt: e.created_at,
          creator: {
            id: e.creator_id,
            name: creator?.full_name || "Organizador",
            avatar:
              creator?.avatar_url ||
              `https://img.usecurling.com/ppl/thumbnail?seed=${e.creator_id.slice(0, 4)}`,
            type: creator?.account_type || "club",
          },
          registrationsCount: regCountMap.get(e.id) || 0,
          isRegistered: userRegSet.has(e.id),
        }
      })

      return { data: formatted, error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Fetches a single event by ID.
   */
  async getEventById(eventId: string, currentUserId?: string): Promise<{
    data: EventItem | null
    error: Error | null
  }> {
    try {
      const { data: e, error } = await db
        .from("events")
        .select("*")
        .eq("id", eventId)
        .maybeSingle()

      if (error) throw error
      if (!e) return { data: null, error: new Error("Evento não encontrado.") }

      const { data: creator } = await db
        .from("profiles")
        .select("id, full_name, avatar_url, account_type")
        .eq("id", e.creator_id)
        .maybeSingle()

      // Count
      const { count } = await db
        .from("event_registrations")
        .select("id", { count: "exact", head: true })
        .eq("event_id", eventId)

      let isRegistered = false
      let myRegistration: any = null
      if (currentUserId) {
        const { data: reg } = await db
          .from("event_registrations")
          .select("id, status, attendance, athlete_status, status_updated_at")
          .eq("event_id", eventId)
          .eq("user_id", currentUserId)
          .maybeSingle()
        isRegistered = !!reg && reg.status !== "canceled"
        if (reg) {
          myRegistration = {
            id: reg.id,
            status: reg.status,
            attendance: reg.attendance || null,
            athleteStatus: reg.athlete_status || null,
            statusUpdatedAt: reg.status_updated_at || null,
          }
        }
      }

      const item: EventItem = {
        id: e.id,
        creatorId: e.creator_id,
        title: e.title,
        description: e.description,
        type: e.type as any,
        sport: e.sport,
        category: e.category,
        eventDate: e.event_date,
        eventTime: e.event_time,
        city: e.city,
        state: e.state,
        locationName: e.location_name,
        address: e.address,
        bannerUrl: e.banner_url,
        requirements: e.requirements,
        instructions: e.instructions,
        registrationDeadline: e.registration_deadline,
        maxParticipants: e.max_participants,
        price: Number(e.price) || 0,
        status: e.status as any,
        createdAt: e.created_at,
        creator: {
          id: e.creator_id,
          name: creator?.full_name || "Organizador",
          avatar:
            creator?.avatar_url ||
            "https://img.usecurling.com/ppl/thumbnail?seed=org",
          type: creator?.account_type || "club",
        },
        registrationsCount: count || 0,
        isRegistered,
        myRegistration,
      }

      return { data: item, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Creates a new event or tryout.
   */
  async createEvent(params: {
    creatorId?: string
    title: string
    description?: string
    type: "event" | "tryout" | "championship"
    sport: string
    category?: string
    eventDate: string
    eventTime?: string
    city: string
    state: string
    locationName: string
    address?: string
    bannerUrl?: string
    requirements?: string
    instructions?: string
    registrationDeadline?: string
    maxParticipants?: number
    price?: number
  }): Promise<{
    data: EventItem | null
    error: Error | null
  }> {
    try {
      // 1. Resolve active user session from Supabase client if not passed or to guarantee fresh session
      let activeUserId = params.creatorId
      if (!activeUserId) {
        const { data: sessionData } = await supabase.auth.getSession()
        activeUserId = sessionData.session?.user?.id
      }
      if (!activeUserId) {
        const { data: userData } = await supabase.auth.getUser()
        activeUserId = userData.user?.id
      }

      if (!activeUserId) {
        throw new Error(
          "Sessão não identificada. Faça login para publicar a peneira/evento.",
        )
      }
      if (!params.title || !params.title.trim()) {
        throw new Error("O título ou nome da peneira é obrigatório.")
      }
      if (!params.sport || !params.sport.trim()) {
        throw new Error("A modalidade esportiva é obrigatória.")
      }
      if (!params.eventDate) {
        throw new Error("A data de realização da peneira é obrigatória.")
      }
      if (
        !params.city ||
        !params.city.trim() ||
        !params.state ||
        !params.state.trim()
      ) {
        throw new Error("Cidade e UF do evento são obrigatórios.")
      }

      // Sanitize price
      let cleanPrice = 0
      if (params.price !== undefined && params.price !== null) {
        const parsed = Number(params.price)
        cleanPrice = isNaN(parsed) || parsed < 0 ? 0 : parsed
      }

      const payload = {
        creator_id: activeUserId,
        title: params.title.trim(),
        description: params.description?.trim() || "",
        type: params.type || "tryout",
        sport: params.sport.trim(),
        category: params.category?.trim() || "Livre",
        event_date: params.eventDate,
        event_time: params.eventTime?.trim() || "08:30",
        city: params.city.trim(),
        state: params.state.trim().toUpperCase().slice(0, 2),
        location_name: params.locationName?.trim() || "Local a definir",
        address: params.address?.trim() || null,
        banner_url:
          params.bannerUrl ||
          `https://img.usecurling.com/p/800/400?q=${encodeURIComponent(params.sport)}%20stadium`,
        requirements: params.requirements?.trim() || null,
        instructions: params.instructions?.trim() || null,
        registration_deadline: params.registrationDeadline || null,
        max_participants:
          params.maxParticipants && params.maxParticipants > 0
            ? Math.floor(params.maxParticipants)
            : null,
        price: cleanPrice,
        status: "open",
      }

      const { data, error } = await db
        .from("events")
        .insert(payload as any)
        .select()
        .single()

      if (error) {
        // Detailed error parsing for friendly user feedback
        if (
          error.code === "42501" ||
          error.message?.includes("policy") ||
          error.message?.includes("row-level security")
        ) {
          throw new Error(
            "Permissão negada pelo servidor. Verifique se você está conectado com uma conta ativa.",
          )
        }
        if (error.message?.includes("violates foreign key")) {
          throw new Error(
            "Conta de criador inválida no banco de dados. Tente sair e entrar novamente.",
          )
        }
        throw new Error(
          error.message || "Erro ao gravar evento no banco de dados.",
        )
      }

      return {
        data: {
          id: data.id,
          creatorId: data.creator_id,
          title: data.title,
          description: data.description,
          type: data.type as any,
          sport: data.sport,
          category: data.category,
          eventDate: data.event_date,
          eventTime: data.event_time,
          city: data.city,
          state: data.state,
          locationName: data.location_name,
          address: data.address,
          bannerUrl: data.banner_url,
          price: Number(data.price) || 0,
          status: data.status as any,
          createdAt: data.created_at,
          registrationsCount: 0,
          isRegistered: false,
        },
        error: null,
      }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Registers current athlete into an open event/tryout.
   */
  async registerForEvent(params: {
    eventId: string
    userId: string
    notes?: string
  }): Promise<{
    success: boolean
    error: Error | null
  }> {
    try {
      const { eventId, userId, notes } = params
      if (!userId)
        throw new Error("Você precisa estar autenticado para se inscrever.")

      // Check event deadline & status
      const { data: ev, error: evErr } = await db
        .from("events")
        .select("title, status, registration_deadline, creator_id")
        .eq("id", eventId)
        .single()

      if (evErr || !ev) throw new Error("Evento não encontrado.")
      if (ev.status !== "open")
        throw new Error("Este evento não está aberto para inscrições.")

      if (ev.registration_deadline) {
        // Parse deadline set to end of day 23:59:59
        const deadline = new Date(`${ev.registration_deadline}T23:59:59`)
        if (new Date() > deadline) {
          throw new Error(
            "Inscrições encerradas. O prazo para este evento expirou.",
          )
        }
      }

      // Check max participants if configured
      if (ev.max_participants) {
        const { count: currentCount } = await db
          .from("event_registrations")
          .select("id", { count: "exact", head: true })
          .eq("event_id", eventId)
          .neq("status", "canceled")

        if (currentCount && currentCount >= ev.max_participants) {
          throw new Error("Não há mais vagas disponíveis para este evento.")
        }
      }

      // Upsert / Insert handling for re-registration after cancel
      const { data: existingReg } = await db
        .from("event_registrations")
        .select("id, status")
        .eq("event_id", eventId)
        .eq("user_id", userId)
        .maybeSingle()

      let insErr: any = null
      if (existingReg) {
        if (existingReg.status === "confirmed") {
          throw new Error("Você já está inscrito neste evento!")
        }
        const { error: updErr } = await db
          .from("event_registrations")
          .update({
            status: "confirmed",
            notes: notes?.trim() || null,
            created_at: new Date().toISOString(),
          })
          .eq("id", existingReg.id)
        insErr = updErr
      } else {
        const { error } = await db.from("event_registrations").insert({
          event_id: eventId,
          user_id: userId,
          status: "confirmed",
          notes: notes?.trim() || null,
        })
        insErr = error
      }
      if (insErr) {
        if (insErr.message.includes("duplicate") || insErr.code === "23505") {
          throw new Error("Você já está inscrito neste evento!")
        }
        throw insErr
      }

      // Automatically register a notification for the organizer and the athlete
      try {
        const { data: athleteProf } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", userId)
          .maybeSingle()

        // Notification for event organizer
        if (ev.creator_id && ev.creator_id !== userId) {
          await db.from("notifications").insert({
            user_id: ev.creator_id,
            actor_id: userId,
            type: "registration_received",
            title: "Nova Inscrição Recebida",
            message: `${athleteProf?.full_name || "Um atleta"} se inscreveu em "${ev.title}".`,
            link: `/events/${eventId}`,
          })

          pushNotificationService
            .triggerServerPush({
              userId: ev.creator_id,
              title: "Nova Inscrição Recebida",
              body: `${athleteProf?.full_name || "Um atleta"} se inscreveu em "${ev.title}".`,
              url: `/events/${eventId}`,
              tag: `reg-received-${eventId}`,
            })
            .catch(() => {})
        }

        // Notification confirmation for the athlete
        await db.from("notifications").insert({
          user_id: userId,
          type: "event_registration",
          title: "Inscrição Confirmada!",
          message: `Sua vaga para "${ev.title}" está garantida. Bom treino!`,
          link: `/events/${eventId}`,
        })
      } catch {
        // Notification failure is non-blocking
      }

      return { success: true, error: null }
    } catch (err: any) {
      return {
        success: false,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Cancels athlete's registration.
   */
  async cancelRegistration(eventId: string, userId: string): Promise<{
    error: Error | null
  }> {
    try {
      // Instead of hard deleting, set status to canceled so user can toggle, or delete if allowed
      const { error } = await db
        .from("event_registrations")
        .update({ status: "canceled" })
        .eq("event_id", eventId)
        .eq("user_id", userId)

      if (error) {
        // Fallback to hard delete if update fails
        const { error: delErr } = await db
          .from("event_registrations")
          .delete()
          .eq("event_id", eventId)
          .eq("user_id", userId)
        if (delErr) throw delErr
      }
      return { error: null }
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(String(err)) }
    }
  },

  /**
   * Fetches registrations for an event (Only allowed for the organizer or the user themselves by RLS).
   */
  async getEventRegistrations(
    eventId: string,
    options?: { includeCanceled?: boolean },
  ): Promise<RegistrationItem[]> {
    try {
      let query = db
        .from("event_registrations")
        .select("*")
        .eq("event_id", eventId)

      if (!options?.includeCanceled) {
        query = query.neq("status", "canceled")
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      })

      if (error || !data) return []

      const userIds = data.map((d: any) => d.user_id)
      const { data: profiles } = await db
        .from("profiles")
        .select(
          "id, full_name, avatar_url, sport, position, city, state, birth_date, experience",
        )
        .in("id", userIds)

      const profMap = new Map<string, any>()
      profiles?.forEach((p: any) => profMap.set(p.id, p))

      return data.map((r: any) => {
        const prof = profMap.get(r.user_id)
        return {
          id: r.id,
          eventId: r.event_id,
          userId: r.user_id,
          status: r.status as RegistrationStatus,
          notes: r.notes,
          attendance: r.attendance || null,
          athleteStatus: r.athlete_status || null,
          statusUpdatedAt: r.status_updated_at || null,
          createdAt: r.created_at,
          participant: {
            id: r.user_id,
            name: prof?.full_name || "Atleta",
            avatar:
              prof?.avatar_url ||
              `https://img.usecurling.com/ppl/thumbnail?seed=${r.user_id.slice(0, 4)}`,
            sport: prof?.sport,
            position: prof?.position,
            city: prof?.city,
            state: prof?.state,
            birthDate: prof?.birth_date,
            experience: prof?.experience,
          },
        }
      })
    } catch {
      return []
    }
  },

  /**
   * Fetches all events created by an organizer.
   */
  async getOrganizerEvents(creatorId: string): Promise<{
    data: EventItem[]
    error: Error | null
  }> {
    try {
      if (!creatorId) return { data: [], error: null }

      const { data: rawEvents, error } = await db
        .from("events")
        .select("*")
        .eq("creator_id", creatorId)
        .order("event_date", { ascending: false })

      if (error) throw error
      if (!rawEvents || rawEvents.length === 0) return { data: [], error: null }

      const eventIds = rawEvents.map((e: any) => e.id)
      const { data: regData } = await db
        .from("event_registrations")
        .select("event_id, status")
        .in("event_id", eventIds)

      const countsMap = new Map<string, {
        total: number
        pending: number
        approved: number
        rejected: number
      }>()

      regData?.forEach((r: any) => {
        const curr = countsMap.get(r.event_id) || {
          total: 0,
          pending: 0,
          approved: 0,
          rejected: 0,
        }
        if (r.status !== "canceled") {
          curr.total += 1
          if (r.status === "pending") curr.pending += 1
          else if (r.status === "approved" || r.status === "confirmed")
            curr.approved += 1
          else if (r.status === "rejected") curr.rejected += 1
        }
        countsMap.set(r.event_id, curr)
      })

      const formatted: EventItem[] = rawEvents.map((e: any) => {
        const counts = countsMap.get(e.id) || { total: 0 }
        return {
          id: e.id,
          creatorId: e.creator_id,
          title: e.title,
          description: e.description || "",
          type: e.type as any || "event",
          sport: e.sport,
          category: e.category,
          eventDate: e.event_date,
          eventTime: e.event_time,
          city: e.city,
          state: e.state,
          locationName: e.location_name,
          address: e.address,
          bannerUrl: e.banner_url,
          requirements: e.requirements,
          instructions: e.instructions,
          registrationDeadline: e.registration_deadline,
          maxParticipants: e.max_participants,
          price: Number(e.price) || 0,
          status: e.status as any || "open",
          createdAt: e.created_at,
          registrationsCount: counts.total,
        }
      })

      return { data: formatted, error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Fetches all registrations across all events owned by an organizer.
   */
  async getOrganizerAllRegistrations(creatorId: string): Promise<{
    data: RegistrationItem[]
    error: Error | null
  }> {
    try {
      if (!creatorId) return { data: [], error: null }

      // Get event IDs owned by organizer
      const { data: myEvents, error: evErr } = await db
        .from("events")
        .select("id, title")
        .eq("creator_id", creatorId)

      if (evErr) throw evErr
      if (!myEvents || myEvents.length === 0) return { data: [], error: null }

      const eventMap = new Map<string, string>()
      myEvents.forEach((e: any) => eventMap.set(e.id, e.title))
      const eventIds = myEvents.map((e: any) => e.id)

      const { data: rawRegs, error: regErr } = await db
        .from("event_registrations")
        .select("*")
        .in("event_id", eventIds)
        .order("created_at", { ascending: false })

      if (regErr) throw regErr
      if (!rawRegs || rawRegs.length === 0) return { data: [], error: null }

      const userIds = Array.from(
        new Set(rawRegs.map((r: any) => r.user_id)),
      ) as string[]
      const { data: profiles } = await db
        .from("profiles")
        .select(
          "id, full_name, avatar_url, sport, position, city, state, birth_date, experience",
        )
        .in("id", userIds)

      const profMap = new Map<string, any>()
      profiles?.forEach((p: any) => profMap.set(p.id, p))

      const items: RegistrationItem[] = rawRegs.map((r: any) => {
        const prof = profMap.get(r.user_id)
        return {
          id: r.id,
          eventId: r.event_id,
          userId: r.user_id,
          status: r.status as RegistrationStatus,
          notes: r.notes,
          attendance: r.attendance || null,
          athleteStatus: r.athlete_status || null,
          statusUpdatedAt: r.status_updated_at || null,
          createdAt: r.created_at,
          eventTitle: eventMap.get(r.event_id) || "Evento",
          participant: {
            id: r.user_id,
            name: prof?.full_name || "Atleta",
            avatar:
              prof?.avatar_url ||
              `https://img.usecurling.com/ppl/thumbnail?seed=${r.user_id.slice(0, 4)}`,
            sport: prof?.sport,
            position: prof?.position,
            city: prof?.city,
            state: prof?.state,
            birthDate: prof?.birth_date,
            experience: prof?.experience,
          },
        }
      })

      return { data: items, error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Updates an athlete's registration status (Approve / Reject / Pending),
   * strictly verifying permissions and creating a real Supabase notification for the athlete.
   */
  async updateRegistrationStatus(params: {
    registrationId: string
    newStatus: "approved" | "rejected" | "pending"
    organizerId: string
  }): Promise<{
    success: boolean
    error: Error | null
    newStatus?: RegistrationStatus
  }> {
    try {
      const { registrationId, newStatus, organizerId } = params
      if (!organizerId) throw new Error("Organizador não autenticado.")

      // Call database secure RPC function first
      const { data: rpcRes, error: rpcErr } = await db.rpc(
        "decide_event_registration",
        {
          p_registration_id: registrationId,
          p_new_status: newStatus,
        },
      )

      if (rpcErr || (rpcRes && rpcRes.success === false)) {
        const msg =
          rpcRes?.error ||
          rpcErr?.message ||
          "Não foi possível atualizar o status da inscrição."
        throw new Error(msg)
      }

      const athleteId = rpcRes?.user_id
      const eventId = rpcRes?.event_id
      const eventTitle = rpcRes?.event_title || "Evento / Peneira"

      // Dispatch real Supabase notification to the athlete
      if (athleteId) {
        try {
          const isApproval = newStatus === "approved"
          const isRejection = newStatus === "rejected"

          // Get organizer profile name
          const { data: orgProfile } = await supabase
            .from("profiles")
            .select("full_name, club_name")
            .eq("id", organizerId)
            .maybeSingle()

          const orgName =
            orgProfile?.club_name ||
            orgProfile?.full_name ||
            "O Clube / Organizador"

          const notifTitle = isApproval
            ? "Inscrição Aprovada! 🎉"
            : isRejection
              ? "Resultado da Inscrição"
              : "Status da Inscrição Atualizado"

          const notifMessage = isApproval
            ? `${orgName} aprovou sua inscrição na peneira/evento "${eventTitle}". Fique atento aos detalhes e horários!`
            : isRejection
              ? `${orgName} avaliou sua inscrição para "${eventTitle}". Desta vez a vaga não foi preenchida, mas continue treinando!`
              : `Sua inscrição em "${eventTitle}" voltou para análise pendente.`

          await db.from("notifications").insert({
            user_id: athleteId,
            actor_id: organizerId,
            type: isApproval
              ? "registration_approved"
              : isRejection
                ? "registration_rejected"
                : "event_registration",
            title: notifTitle,
            message: notifMessage,
            link: `/events/${eventId}`,
          })

          // Trigger push to athlete with decision
          pushNotificationService
            .triggerServerPush({
              userId: athleteId,
              title: notifTitle,
              body: notifMessage,
              url: `/events/${eventId}`,
              tag: `reg-decision-${eventId}`,
            })
            .catch(() => {})
        } catch (notifErr) {
          // If notification dispatch fails, do not silently roll back the decision
          console.warn("Falha ao enviar notificação de decisão:", notifErr)
        }
      }

      return { success: true, error: null, newStatus }
    } catch (err: any) {
      return {
        success: false,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Updates registration attendance and/or athlete status.
   * If athlete_status changes, sends a friendly PT-BR notification and server push.
   */
  async updateAthleteTryoutStatus(params: {
    registrationId: string
    organizerId: string
    attendance?: AttendanceStatus
    athleteStatus?: AthleteEvaluationStatus
    previousAthleteStatus?: AthleteEvaluationStatus
  }): Promise<{
    success: boolean
    error: Error | null
  }> {
    try {
      const {
        registrationId,
        organizerId,
        attendance,
        athleteStatus,
        previousAthleteStatus,
      } = params

      if (!organizerId) {
        throw new Error("Organizador não autenticado.")
      }

      // Fetch registration and event to ensure permissions and context
      const { data: reg, error: regErr } = await db
        .from("event_registrations")
        .select("id, event_id, user_id, attendance, athlete_status")
        .eq("id", registrationId)
        .single()

      if (regErr || !reg) {
        throw new Error("Inscrição não encontrada.")
      }

      const { data: event, error: eventErr } = await db
        .from("events")
        .select("id, title, creator_id")
        .eq("id", reg.event_id)
        .single()

      if (eventErr || !event) {
        throw new Error("Evento não encontrado.")
      }

      if (event.creator_id !== organizerId) {
        throw new Error(
          "Apenas o organizador do evento pode atualizar o status do atleta.",
        )
      }

      const updatePayload: Record<string, any> = {
        status_updated_at: new Date().toISOString(),
      }

      if (attendance !== undefined) {
        updatePayload.attendance = attendance
      }

      if (athleteStatus !== undefined) {
        updatePayload.athlete_status = athleteStatus
      }

      const { error: updErr } = await db
        .from("event_registrations")
        .update(updatePayload)
        .eq("id", registrationId)

      if (updErr) {
        throw updErr
      }

      // Determine if a real status change happened that warrants a notification
      const oldStatus =
        previousAthleteStatus !== undefined
          ? previousAthleteStatus
          : reg.athlete_status
      const newStatus =
        athleteStatus !== undefined ? athleteStatus : reg.athlete_status

      const statusChanged = Boolean(newStatus && newStatus !== oldStatus)

      if (statusChanged && newStatus) {
        try {
          const { data: orgProfile } = await supabase
            .from("profiles")
            .select("full_name, club_name")
            .eq("id", organizerId)
            .maybeSingle()

          const orgName =
            orgProfile?.club_name ||
            orgProfile?.full_name ||
            "O Clube / Organizador"

          let notifTitle = "Atualização na Seletiva"
          let notifMessage = `${orgName} atualizou o status da sua avaliação na peneira "${event.title}".`

          if (newStatus === "aprovado") {
            notifTitle = "Aprovado na Peneira! 🎉"
            notifMessage = `Parabéns! Você foi aprovado por ${orgName} na peneira "${event.title}". Fique atento aos próximos passos!`
          } else if (newStatus === "convocado") {
            notifTitle = "Convocado para o Elenco! 🏆"
            notifMessage = `Grande notícia! Você foi convocado por ${orgName} para integrar a equipe após a peneira "${event.title}".`
          } else if (newStatus === "compareceu") {
            notifTitle = "Presença Confirmada na Peneira"
            notifMessage = `Sua presença na peneira "${event.title}" foi confirmada por ${orgName}. Aguarde a avaliação técnica.`
          } else if (newStatus === "nao_selecionado") {
            notifTitle = "Resultado da Peneira"
            notifMessage = `${orgName} agradece sua dedicação e participação na peneira "${event.title}". Desta vez seu perfil não foi selecionado para esta vaga específica, mas continue firme nos treinos!`
          } else if (newStatus === "inscrito") {
            notifTitle = "Inscrição Registrada"
            notifMessage = `Sua inscrição na peneira "${event.title}" está com status inicial registrado.`
          }

          // Insert into notifications
          await db.from("notifications").insert({
            user_id: reg.user_id,
            actor_id: organizerId,
            type: "athlete_status_update",
            title: notifTitle,
            message: notifMessage,
            link: `/events/${event.id}`,
          })

          // Trigger push
          pushNotificationService
            .triggerServerPush({
              userId: reg.user_id,
              title: notifTitle,
              body: notifMessage,
              url: `/events/${event.id}`,
              tag: `tryout-status-${event.id}`,
              actorId: organizerId,
            })
            .catch(() => {})
        } catch (notifErr) {
          console.warn(
            "Falha ao enviar notificação de status de seletiva:",
            notifErr,
          )
        }
      }

      return { success: true, error: null }
    } catch (err: any) {
      return {
        success: false,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Fetches the evaluation for a given athlete in an event.
   * RLS automatically controls visibility:
   * - Organizer sees everything (including internal_notes)
   * - Athlete sees only if visible_to_athlete = true (RLS blocks if false)
   */
  async getAthleteEvaluation(params: {
    eventId: string
    athleteId: string
  }): Promise<{
    data: EventEvaluation | null
    error: Error | null
  }> {
    try {
      const { eventId, athleteId } = params

      const { data, error } = await db
        .from("event_evaluations")
        .select("*")
        .eq("event_id", eventId)
        .eq("athlete_id", athleteId)
        .maybeSingle()

      if (error) {
        throw error
      }

      if (!data) {
        return { data: null, error: null }
      }

      const item: EventEvaluation = {
        id: data.id,
        eventId: data.event_id,
        athleteId: data.athlete_id,
        clubId: data.club_id,
        rating: data.rating,
        strengths: data.strengths,
        improvements: data.improvements,
        internalNotes: data.internal_notes,
        visibleToAthlete: data.visible_to_athlete,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }

      return { data: item, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Upserts an evaluation for an athlete in an event.
   * Strictly checked by RLS: caller must be the creator of the event (club_id = auth.uid()).
   */
  async saveAthleteEvaluation(params: {
    eventId: string
    athleteId: string
    clubId: string
    rating: number | null
    strengths?: string | null
    improvements?: string | null
    internalNotes?: string | null
    visibleToAthlete: boolean
  }): Promise<{
    data: EventEvaluation | null
    error: Error | null
  }> {
    try {
      const {
        eventId,
        athleteId,
        clubId,
        rating,
        strengths,
        improvements,
        internalNotes,
        visibleToAthlete,
      } = params

      if (!clubId) {
        throw new Error("Clube não autenticado.")
      }

      if (rating !== null && rating !== undefined) {
        if (rating < 1 || rating > 10) {
          throw new Error("A nota deve ser um valor entre 1 e 10.")
        }
      }

      const payload = {
        event_id: eventId,
        athlete_id: athleteId,
        club_id: clubId,
        rating: rating ?? null,
        strengths: strengths?.trim() || null,
        improvements: improvements?.trim() || null,
        internal_notes: internalNotes?.trim() || null,
        visible_to_athlete: visibleToAthlete,
      }

      const { data, error } = await db
        .from("event_evaluations")
        .upsert(payload, { onConflict: "event_id,athlete_id" })
        .select()
        .single()

      if (error) {
        throw error
      }

      const item: EventEvaluation = {
        id: data.id,
        eventId: data.event_id,
        athleteId: data.athlete_id,
        clubId: data.club_id,
        rating: data.rating,
        strengths: data.strengths,
        improvements: data.improvements,
        internalNotes: data.internal_notes,
        visibleToAthlete: data.visible_to_athlete,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }

      return { data: item, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },
}
