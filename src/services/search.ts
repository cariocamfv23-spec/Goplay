import { supabase } from '@/lib/supabase/client'
import type { AccountType, PublicProfileItem } from './profiles'

export interface ProfileSearchFilters {
  query?: string
  accountType?: AccountType | 'all'
  sport?: string
  city?: string
  state?: string
  page?: number
  pageSize?: number
}

export interface ProfileSearchResult {
  data: PublicProfileItem[]
  count: number | null
  error: Error | null
  hasMore: boolean
}

const DEFAULT_PAGE_SIZE = 12
const MAX_PAGE_SIZE = 50

export const searchService = {
  /**
   * Search real profiles from Supabase with safe column selection.
   * Private columns such as birth_date and phone are excluded from public search queries.
   * Query uses bounded ranges to prevent unbounded data fetching.
   */
  async searchProfiles(
    filters: ProfileSearchFilters = {},
  ): Promise<ProfileSearchResult> {
    try {
      const page = Math.max(1, filters.page ?? 1)
      const pageSize = Math.min(
        MAX_PAGE_SIZE,
        Math.max(1, filters.pageSize ?? DEFAULT_PAGE_SIZE),
      )
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Safe public fields only
      let query = supabase.from('profiles').select(
        `
          id,
          full_name,
          avatar_url,
          cover_url,
          cover_type,
          account_type,
          sport,
          position,
          city,
          state,
          bio,
          club_name,
          categories,
          specialties,
          created_at
        `,
        { count: 'exact' },
      )

      // Filter by account type if provided and not 'all'
      if (filters.accountType && filters.accountType !== 'all') {
        query = query.eq('account_type', filters.accountType)
      }

      // Filter by sport if provided
      if (
        filters.sport &&
        filters.sport.trim() !== '' &&
        filters.sport !== 'Todos'
      ) {
        query = query.ilike('sport', `%${filters.sport.trim()}%`)
      }

      // Filter by city if provided
      if (filters.city && filters.city.trim() !== '') {
        query = query.ilike('city', `%${filters.city.trim()}%`)
      }

      // Filter by state if provided
      if (filters.state && filters.state.trim() !== '') {
        query = query.ilike('state', `%${filters.state.trim()}%`)
      }

      // Search text by name or sport or position or club_name
      if (filters.query && filters.query.trim() !== '') {
        const cleanQuery = filters.query.trim()
        query = query.or(
          `full_name.ilike.%${cleanQuery}%,sport.ilike.%${cleanQuery}%,position.ilike.%${cleanQuery}%,club_name.ilike.%${cleanQuery}%,city.ilike.%${cleanQuery}%`,
        )
      }

      // Order and range
      query = query.order('created_at', { ascending: false }).range(from, to)

      const { data, count, error } = await query

      if (error) {
        return {
          data: [],
          count: 0,
          error: new Error(error.message),
          hasMore: false,
        }
      }

      const profiles = (data as unknown as PublicProfileItem[]) ?? []
      const totalCount = count ?? 0
      const hasMore = to + 1 < totalCount

      return {
        data: profiles,
        count: totalCount,
        error: null,
        hasMore,
      }
    } catch (err: any) {
      return {
        data: [],
        count: 0,
        error: err instanceof Error ? err : new Error(String(err)),
        hasMore: false,
      }
    }
  },
}
