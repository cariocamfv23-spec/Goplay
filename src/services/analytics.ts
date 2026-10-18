import { supabase } from '@/lib/supabase/client'

export type AnalyticsEventName =
  | 'user_signup_completed'
  | 'athlete_profile_created'
  | 'profile_fields_completed'
  | 'event_published'
  | 'event_viewed'
  | 'registration_started'
  | 'registration_completed'
  | 'registration_approved'
  | 'registration_rejected'
  | 'profile_shared'
  | 'event_shared'
  | 'user_session_active'

export interface AnalyticsEventPayload {
  eventName: AnalyticsEventName
  userId?: string | null
  targetId?: string | null
  metadata?: Record<string, any>
}

export interface AnalyticsEventRecord {
  id: string
  event_name: AnalyticsEventName
  user_id: string | null
  target_id: string | null
  session_id: string | null
  metadata: Record<string, any>
  created_at: string
}

// Memory throttle to deduplicate repeated views (e.g. fast page reloads, tab switches)
const DEDUPE_WINDOW_MS = 60 * 1000 // 1 minute per event target within session

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem('goplay_session_id')
    if (!sid) {
      sid = `ses_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      sessionStorage.setItem('goplay_session_id', sid)
    }
    return sid
  } catch {
    return 'ses_anon'
  }
}

function shouldThrottle(key: string): boolean {
  try {
    const last = sessionStorage.getItem(`th_${key}`)
    const now = Date.now()
    if (last && now - Number(last) < DEDUPE_WINDOW_MS) {
      return true
    }
    sessionStorage.setItem(`th_${key}`, String(now))
    return false
  } catch {
    return false
  }
}

export const analyticsService = {
  /**
   * Tracks an MVP telemetry event to Supabase.
   * Tolerant: failures do not block the UI or throw errors to the user.
   */
  async trackEvent({
    eventName,
    userId,
    targetId,
    metadata = {},
  }: AnalyticsEventPayload): Promise<void> {
    try {
      // Automatic session deduplication for noisy view events
      if (eventName === 'event_viewed' || eventName === 'user_session_active') {
        const dedupeKey = `${eventName}:${targetId || 'global'}:${userId || 'anon'}`
        if (shouldThrottle(dedupeKey)) {
          return
        }
      }

      const sessionId = getSessionId()

      // Sanitize metadata: strictly strip any passwords, tokens or financial secrets
      const safeMetadata = { ...metadata }
      delete (safeMetadata as any).password
      delete (safeMetadata as any).token
      delete (safeMetadata as any).credit_card
      delete (safeMetadata as any).pix_key

      // Insert into analytics_events table (casting supabase client to any to support newly migrated table)
      await (supabase as any).from('analytics_events').insert({
        event_name: eventName,
        user_id: userId || null,
        target_id: targetId || null,
        session_id: sessionId,
        metadata: safeMetadata,
      })
    } catch (err) {
      // Telemetry must never crash primary flows
      console.warn('[Analytics] Failed to record event:', err)
    }
  },

  /**
   * Helper specifically for sharing profile passport.
   */
  async trackProfileShare(
    profileId: string,
    method: string,
    currentUserId?: string | null,
  ) {
    return this.trackEvent({
      eventName: 'profile_shared',
      userId: currentUserId || null,
      targetId: profileId,
      metadata: { method },
    })
  },

  /**
   * Helper specifically for sharing events.
   */
  async trackEventShare(
    eventId: string,
    method: string,
    currentUserId?: string | null,
  ) {
    return this.trackEvent({
      eventName: 'event_shared',
      userId: currentUserId || null,
      targetId: eventId,
      metadata: { method },
    })
  },

  /**
   * Helper specifically for registration started attempt.
   */
  async trackRegistrationStarted(
    eventId: string,
    currentUserId?: string | null,
  ) {
    return this.trackEvent({
      eventName: 'registration_started',
      userId: currentUserId || null,
      targetId: eventId,
      metadata: { timestamp: new Date().toISOString() },
    })
  },

  /**
   * Helper specifically for viewing event details.
   */
  async trackEventView(eventId: string, currentUserId?: string | null) {
    return this.trackEvent({
      eventName: 'event_viewed',
      userId: currentUserId || null,
      targetId: eventId,
    })
  },

  /**
   * Fetches calculated MVP Metrics from database.
   * Access is protected by is_admin check in RLS / Supabase.
   */
  async getMvpMetrics(periodDays: number = 30): Promise<{
    data: {
      totalUsers: number
      totalAthletes: number
      totalClubs: number
      totalCoaches: number
      athletesWithCompleteProfile: number
      totalEvents: number
      eventsInPeriod: number
      eventViewsCount: number
      registrationsStartedCount: number
      registrationsCompletedCount: number
      registrationsApprovedCount: number
      registrationsRejectedCount: number
      profileSharesCount: number
      eventSharesCount: number
      conversionRate: number
      activeUsersInPeriod: number
      returningUsersCount: number
      periodDays: number
    } | null
    error: Error | null
  }> {
    try {
      const now = new Date()
      const startDate = new Date(
        now.getTime() - periodDays * 24 * 60 * 60 * 1000,
      ).toISOString()

      // 1. Query profiles table
      const { data: rawProfiles, error: pError } = await (supabase as any)
        .from('profiles')
        .select('*')

      if (pError) throw new Error(pError.message)

      const profiles = (rawProfiles || []) as any[]
      const totalUsers = profiles.length
      const totalAthletes = profiles.filter(
        (p) => p.account_type === 'athlete',
      ).length
      const totalClubs = profiles.filter(
        (p) => p.account_type === 'club',
      ).length
      const totalCoaches = profiles.filter(
        (p) => p.account_type === 'coach',
      ).length

      // Criteria for essential fields completed (Athlete: sport, position, city, bio OR experience/clubs)
      const athletesWithCompleteProfile = profiles.filter(
        (p) =>
          p.account_type === 'athlete' &&
          Boolean(p.sport) &&
          Boolean(p.position) &&
          Boolean(p.city) &&
          Boolean(p.bio || p.experience || p.previous_clubs || p.sports_goals),
      ).length

      // 2. Query events
      const { data: rawEvents, error: eError } = await (supabase as any)
        .from('events')
        .select('id, created_at, status')

      if (eError) throw new Error(eError.message)

      const events = (rawEvents || []) as any[]
      const totalEvents = events.length
      const eventsInPeriod = events.filter(
        (e) => e.created_at >= startDate,
      ).length

      // 3. Query registrations directly from event_registrations
      const { data: rawRegistrations, error: regError } = await (
        supabase as any
      )
        .from('event_registrations')
        .select('id, status, created_at, user_id, event_id')

      if (regError) throw new Error(regError.message)

      const registrations = (rawRegistrations || []) as any[]
      const registrationsApproved = registrations.filter(
        (r) => r.status === 'approved',
      ).length
      const registrationsRejected = registrations.filter(
        (r) => r.status === 'rejected',
      ).length

      // 4. Query telemetry events (allowed only for admins via RLS)
      const { data: rawTelemetry, error: tError } = await (supabase as any)
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate)

      // If non-admin, RLS returns empty or error
      if (tError) throw new Error(tError.message)

      const eventsList = (rawTelemetry || []) as AnalyticsEventRecord[]
      const eventViewsCount = eventsList.filter(
        (e) => e.event_name === 'event_viewed',
      ).length
      const registrationsStartedCount = eventsList.filter(
        (e) => e.event_name === 'registration_started',
      ).length
      const profileSharesCount = eventsList.filter(
        (e) => e.event_name === 'profile_shared',
      ).length
      const eventSharesCount = eventsList.filter(
        (e) => e.event_name === 'event_shared',
      ).length

      // Registrations completed in period from actual DB registrations
      const regsCompletedInPeriod = registrations.filter(
        (r) => r.created_at >= startDate,
      ).length
      const effectiveStarts = Math.max(
        registrationsStartedCount,
        regsCompletedInPeriod,
      )
      const conversionRate =
        effectiveStarts > 0
          ? (regsCompletedInPeriod / effectiveStarts) * 100
          : 0

      // Active users: unique user_ids who interacted or registered in period
      const activeUserIds = new Set<string>()
      eventsList.forEach((e) => {
        if (e.user_id) activeUserIds.add(e.user_id)
      })
      registrations.forEach((r) => {
        if (r.user_id && r.created_at >= startDate) activeUserIds.add(r.user_id)
      })

      // Returning users: active in period whose profile was created before the period
      let returningUsersCount = 0
      activeUserIds.forEach((uid) => {
        const found = profiles.find((p) => p.id === uid)
        if (found && found.created_at < startDate) {
          returningUsersCount++
        }
      })

      return {
        data: {
          totalUsers,
          totalAthletes,
          totalClubs,
          totalCoaches,
          athletesWithCompleteProfile,
          totalEvents,
          eventsInPeriod,
          eventViewsCount,
          registrationsStartedCount,
          registrationsCompletedCount: regsCompletedInPeriod,
          registrationsApprovedCount: registrationsApproved,
          registrationsRejectedCount: registrationsRejected,
          profileSharesCount,
          eventSharesCount,
          conversionRate,
          activeUsersInPeriod: activeUserIds.size,
          returningUsersCount,
          periodDays,
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
}
