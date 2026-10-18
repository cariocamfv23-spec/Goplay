import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export type AccountType = 'athlete' | 'club' | 'coach'

export interface ProfileRow {
  id: string
  full_name: string | null
  avatar_url: string | null
  cover_url?: string | null
  cover_type?: 'image' | 'video' | string | null
  cover_position_x?: number | null
  cover_position_y?: number | null
  cover_zoom?: number | null
  account_type: AccountType
  sport: string | null
  position: string | null
  birth_date: string | null
  city: string | null
  state: string | null
  created_at: string
  updated_at: string
  // Additional fields for Athlete, Club, Coach
  bio?: string | null
  experience?: string | null
  previous_clubs?: string | null
  sports_goals?: string | null
  club_name?: string | null
  institutional_description?: string | null
  categories?: string | null
  contact_info?: string | null
  specialties?: string | null
  certifications?: string | null
  phone?: string | null
  is_admin?: boolean
}

export type ProfileUpdate = Partial<
  Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'>
>

export interface PublicProfileItem {
  id: string
  full_name: string | null
  avatar_url: string | null
  cover_url?: string | null
  cover_type?: 'image' | 'video' | string | null
  account_type: AccountType
  sport: string | null
  position: string | null
  city: string | null
  state: string | null
  bio?: string | null
  club_name?: string | null
  categories?: string | null
  specialties?: string | null
  created_at: string
  is_admin?: boolean
}

export const profileService = {
  /**
   * Fetches the authenticated user's complete profile.
   */
  async getMyProfile(
    userId: string,
  ): Promise<{ data: ProfileRow | null; error: Error | null }> {
    try {
      if (!userId) {
        return { data: null, error: new Error('ID do usuário não fornecido.') }
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        return { data: null, error: new Error(error.message) }
      }
      return { data: (data as unknown as ProfileRow) ?? null, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Fetches any user's profile by ID.
   * Note: sensitive fields like birth_date should not be shown publicly
   */
  async getProfileById(
    profileId: string,
  ): Promise<{ data: ProfileRow | null; error: Error | null }> {
    try {
      if (!profileId) {
        return { data: null, error: new Error('ID de perfil não fornecido.') }
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .maybeSingle()

      if (error) {
        return { data: null, error: new Error(error.message) }
      }
      return { data: (data as unknown as ProfileRow) ?? null, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Updates only permitted fields of the current user's profile.
   * RLS and database constraints prevent updating another user's profile or escalating privileges.
   */
  async updateMyProfile(
    userId: string,
    updates: ProfileUpdate,
  ): Promise<{ data: ProfileRow | null; error: Error | null }> {
    try {
      if (!userId) {
        return { data: null, error: new Error('ID do usuário não fornecido.') }
      }

      // Explicitly reject prohibited or unapproved fields
      const sanitizedUpdates = { ...updates }
      delete (sanitizedUpdates as any).id
      delete (sanitizedUpdates as any).created_at
      delete (sanitizedUpdates as any).updated_at
      delete (sanitizedUpdates as any).is_admin

      const { data, error } = await supabase
        .from('profiles')
        .update(sanitizedUpdates as any)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        return { data: null, error: new Error(error.message) }
      }
      return { data: (data as unknown as ProfileRow) ?? null, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Upload an avatar to the avatars bucket and return its public URL.
   */
  async uploadAvatar(
    userId: string,
    file: File,
  ): Promise<{ url: string | null; error: Error | null }> {
    try {
      if (!userId) {
        return {
          data: null,
          error: new Error('Usuário não autenticado.'),
        } as any
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const filePath = `${userId}/avatar_${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        })

      if (uploadError) {
        return { url: null, error: new Error(uploadError.message) }
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      return { url: data.publicUrl, error: null }
    } catch (err: any) {
      return {
        url: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Upload a cover image or short video loop to the covers bucket and return its public URL.
   */
  async uploadCover(
    userId: string,
    file: File,
  ): Promise<{
    url: string | null
    type: 'image' | 'video'
    error: Error | null
  }> {
    try {
      if (!userId) {
        return {
          url: null,
          type: 'image',
          error: new Error('Usuário não autenticado.'),
        }
      }

      const isVideo = file.type.startsWith('video/')
      const type: 'image' | 'video' = isVideo ? 'video' : 'image'

      const fileExt =
        file.name.split('.').pop()?.toLowerCase() || (isVideo ? 'mp4' : 'jpg')
      const filePath = `${userId}/cover_${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('covers')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        })

      if (uploadError) {
        return { url: null, type, error: new Error(uploadError.message) }
      }

      const { data } = supabase.storage.from('covers').getPublicUrl(filePath)
      return { url: data.publicUrl, type, error: null }
    } catch (err: any) {
      return {
        url: null,
        type: 'image',
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Remove the cover image/video for the authenticated user.
   */
  async removeCover(userId: string): Promise<{ error: Error | null }> {
    try {
      if (!userId) {
        return { error: new Error('Usuário não autenticado.') }
      }
      const { error } = await supabase
        .from('profiles')
        .update({
          cover_url: null,
          cover_type: 'image',
          cover_position_x: 50,
          cover_position_y: 50,
          cover_zoom: 1,
        } as any)
        .eq('id', userId)

      if (error) {
        return { error: new Error(error.message) }
      }
      return { error: null }
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(String(err)) }
    }
  },

  /**
   * Fetches official demo test accounts for navigation and demonstration.
   */
  async getDemoProfiles(): Promise<{
    data: ProfileRow[]
    error: Error | null
  }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .ilike('id', '11111111-0000-0000-0000-%')
        .order('created_at', { ascending: true })

      if (error) {
        return { data: [], error: new Error(error.message) }
      }
      return { data: (data as unknown as ProfileRow[]) ?? [], error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },
}
