import { supabase } from '@/lib/supabase/client'

const db = supabase as any

export interface EventItem {
  id: string
  creatorId: string
  title: string
  description: string
  type: 'event' | 'tryout' | 'championship'
  sport: string
  category: string
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
  status: 'open' | 'closed' | 'canceled'
  createdAt: string
  creator?: {
    id: string
    name: string
    avatar: string
    type: string
  }
  registrationsCount?: number
  isRegistered?: boolean
}

export interface RegistrationItem {
  id: string
  eventId: string
  userId: string
  status: 'confirmed' | 'canceled' | 'waitlist'
  notes?: string
  createdAt: string
  participant?: {
    id: string
    name: string
    avatar: string
    sport?: string
    position?: string
    city?: string
  }
}

export const eventsService = {
  /**
   * Fetches events with optional filter by sport or type ('tryout', 'event', 'championship').
   */
  async getEvents(params?: {
    type?: string
    sport?: string
    currentUserId?: string
  }): Promise<{ data: EventItem[]; error: Error | null }> {
    try {
      let query = db
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (params?.type && params.type !== 'all') {
        query = query.eq('type', params.type)
      }
      if (params?.sport && params.sport !== 'Todos') {
        query = query.ilike('sport', `%${params.sport}%`)
      }

      const { data: rawEvents, error } = await query
      if (error) throw error
      if (!rawEvents || rawEvents.length === 0) return { data: [], error: null }

      // Batch fetch creator profiles
      const creatorIds = Array.from(
        new Set(rawEvents.map((e: any) => e.creator_id)),
      )
      const { data: creators } = await db
        .from('profiles')
        .select('id, full_name, avatar_url, account_type')
        .in('id', creatorIds)

      const creatorMap = new Map<string, any>()
      creators?.forEach((c: any) => creatorMap.set(c.id, c))

      // Batch check registrations count and if current user is registered
      const eventIds = rawEvents.map((e: any) => e.id)
      const { data: regData } = await db
        .from('event_registrations')
        .select('event_id, user_id')
        .in('event_id', eventIds)

      const regCountMap = new Map<string, number>()
      const userRegSet = new Set<string>()

      regData?.forEach((r: any) => {
        regCountMap.set(r.event_id, (regCountMap.get(r.event_id) || 0) + 1)
        if (params?.currentUserId && r.user_id === params.currentUserId) {
          userRegSet.add(r.event_id)
        }
      })

      const formatted: EventItem[] = rawEvents.map((e: any) => {
        const creator = creatorMap.get(e.creator_id)
        return {
          id: e.id,
          creatorId: e.creator_id,
          title: e.title,
          description: e.description || '',
          type: (e.type as any) || 'event',
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
          status: (e.status as any) || 'open',
          createdAt: e.created_at,
          creator: {
            id: e.creator_id,
            name: creator?.full_name || 'Organizador',
            avatar:
              creator?.avatar_url ||
              `https://img.usecurling.com/ppl/thumbnail?seed=${e.creator_id.slice(0, 4)}`,
            type: creator?.account_type || 'club',
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
  async getEventById(
    eventId: string,
    currentUserId?: string,
  ): Promise<{ data: EventItem | null; error: Error | null }> {
    try {
      const { data: e, error } = await db
        .from('events')
        .select('*')
        .eq('id', eventId)
        .maybeSingle()

      if (error) throw error
      if (!e) return { data: null, error: new Error('Evento não encontrado.') }

      const { data: creator } = await db
        .from('profiles')
        .select('id, full_name, avatar_url, account_type')
        .eq('id', e.creator_id)
        .maybeSingle()

      // Count
      const { count } = await db
        .from('event_registrations')
        .select('id', { count: 'exact', head: true })
        .eq('event_id', eventId)

      let isRegistered = false
      if (currentUserId) {
        const { data: reg } = await db
          .from('event_registrations')
          .select('id')
          .eq('event_id', eventId)
          .eq('user_id', currentUserId)
          .maybeSingle()
        isRegistered = !!reg
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
          name: creator?.full_name || 'Organizador',
          avatar:
            creator?.avatar_url ||
            'https://img.usecurling.com/ppl/thumbnail?seed=org',
          type: creator?.account_type || 'club',
        },
        registrationsCount: count || 0,
        isRegistered,
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
    creatorId: string
    title: string
    description?: string
    type: 'event' | 'tryout' | 'championship'
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
  }): Promise<{ data: EventItem | null; error: Error | null }> {
    try {
      if (!params.creatorId) throw new Error('Usuário não autenticado.')
      if (!params.title.trim()) throw new Error('Título é obrigatório.')
      if (!params.sport) throw new Error('Modalidade esportiva é obrigatória.')
      if (!params.eventDate) throw new Error('Data do evento é obrigatória.')
      if (!params.city || !params.state)
        throw new Error('Cidade e Estado são obrigatórios.')

      const { data, error } = await db
        .from('events')
        .insert({
          creator_id: params.creatorId,
          title: params.title.trim(),
          description: params.description?.trim() || '',
          type: params.type,
          sport: params.sport,
          category: params.category?.trim() || 'Livre',
          event_date: params.eventDate,
          event_time: params.eventTime || '09:00',
          city: params.city.trim(),
          state: params.state.trim().toUpperCase(),
          location_name: params.locationName.trim() || 'Local a definir',
          address: params.address?.trim() || null,
          banner_url:
            params.bannerUrl ||
            `https://img.usecurling.com/p/800/400?q=${encodeURIComponent(params.sport)}%20stadium`,
          requirements: params.requirements?.trim() || null,
          instructions: params.instructions?.trim() || null,
          registration_deadline: params.registrationDeadline || null,
          max_participants: params.maxParticipants || null,
          price: params.price || 0,
          status: 'open',
        } as any)
        .select()
        .single()

      if (error) throw error

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
  }): Promise<{ success: boolean; error: Error | null }> {
    try {
      const { eventId, userId, notes } = params
      if (!userId)
        throw new Error('Você precisa estar autenticado para se inscrever.')

      // Check event deadline & status
      const { data: ev, error: evErr } = await db
        .from('events')
        .select('title, status, registration_deadline, creator_id')
        .eq('id', eventId)
        .single()

      if (evErr || !ev) throw new Error('Evento não encontrado.')
      if (ev.status !== 'open')
        throw new Error('Este evento não está aberto para inscrições.')

      if (ev.registration_deadline) {
        const deadline = new Date(ev.registration_deadline)
        if (new Date() > deadline) {
          throw new Error('O prazo de inscrição para este evento encerrou.')
        }
      }

      const { error: insErr } = await db.from('event_registrations').insert({
        event_id: eventId,
        user_id: userId,
        status: 'confirmed',
        notes: notes?.trim() || null,
      })

      if (insErr) {
        if (insErr.message.includes('duplicate') || insErr.code === '23505') {
          throw new Error('Você já está inscrito neste evento!')
        }
        throw insErr
      }

      // Automatically register a notification for the organizer and the athlete
      try {
        const { data: athleteProf } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', userId)
          .maybeSingle()

        // Notification for event organizer
        if (ev.creator_id && ev.creator_id !== userId) {
          await db.from('notifications').insert({
            user_id: ev.creator_id,
            actor_id: userId,
            type: 'registration_received',
            title: 'Nova Inscrição Recebida',
            message: `${athleteProf?.full_name || 'Um atleta'} se inscreveu em "${ev.title}".`,
            link: `/events/${eventId}`,
          })
        }

        // Notification confirmation for the athlete
        await db.from('notifications').insert({
          user_id: userId,
          type: 'event_registration',
          title: 'Inscrição Confirmada!',
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
  async cancelRegistration(
    eventId: string,
    userId: string,
  ): Promise<{ error: Error | null }> {
    try {
      const { error } = await db
        .from('event_registrations')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', userId)

      if (error) throw error
      return { error: null }
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(String(err)) }
    }
  },

  /**
   * Fetches registrations for an event (Only allowed for the organizer or the user themselves by RLS).
   */
  async getEventRegistrations(eventId: string): Promise<RegistrationItem[]> {
    try {
      const { data, error } = await db
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: true })

      if (error || !data) return []

      const userIds = data.map((d: any) => d.user_id)
      const { data: profiles } = await db
        .from('profiles')
        .select('id, full_name, avatar_url, sport, position, city')
        .in('id', userIds)

      const profMap = new Map<string, any>()
      profiles?.forEach((p) => profMap.set(p.id, p))

      return data.map((r) => {
        const prof = profMap.get(r.user_id)
        return {
          id: r.id,
          eventId: r.event_id,
          userId: r.user_id,
          status: r.status as any,
          notes: r.notes,
          createdAt: r.created_at,
          participant: {
            id: r.user_id,
            name: prof?.full_name || 'Atleta',
            avatar:
              prof?.avatar_url ||
              'https://img.usecurling.com/ppl/thumbnail?seed=reg',
            sport: prof?.sport,
            position: prof?.position,
            city: prof?.city,
          },
        }
      })
    } catch {
      return []
    }
  },
}
