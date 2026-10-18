import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export type ProfileRow = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export const profileService = {
  async getMyProfile(
    userId: string,
  ): Promise<{ data: ProfileRow | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        return { data: null, error: new Error(error.message) }
      }
      return { data, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  async updateMyProfile(
    userId: string,
    updates: ProfileUpdate,
  ): Promise<{ data: ProfileRow | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        return { data: null, error: new Error(error.message) }
      }
      return { data, error: null }
    } catch (err: any) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  async getAllProfiles(): Promise<{ data: ProfileRow[]; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return { data: [], error: new Error(error.message) }
      }
      return { data: data ?? [], error: null }
    } catch (err: any) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },
}
