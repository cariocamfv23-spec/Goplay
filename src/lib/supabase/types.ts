// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | {
  [key: string]: Json | undefined
} | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_name: string
          id: string
          metadata: Json
          session_id: string | null
          target_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_name: string
          id?: string
          metadata?: Json
          session_id?: string | null
          target_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_name?: string
          id?: string
          metadata?: Json
          session_id?: string | null
          target_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string
          last_message_text: string | null
          participant1_id: string
          participant2_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_text?: string | null
          participant1_id: string
          participant2_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_text?: string | null
          participant1_id?: string
          participant2_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          file_name: string | null
          id: string
          media_url: string | null
          message_type: string
          metadata: Json | null
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content?: string
          conversation_id: string
          created_at?: string
          file_name?: string | null
          id?: string
          media_url?: string | null
          message_type?: string
          metadata?: Json | null
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          file_name?: string | null
          id?: string
          media_url?: string | null
          message_type?: string
          metadata?: Json | null
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [{
          foreignKeyName: "direct_messages_conversation_id_fkey"
          columns: ["conversation_id"]
          isOneToOne: false
          referencedRelation: "conversations"
          referencedColumns: ["id"]
        }]
      }
      event_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          notes: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          notes?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          notes?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [{
          foreignKeyName: "event_registrations_event_id_fkey"
          columns: ["event_id"]
          isOneToOne: false
          referencedRelation: "events"
          referencedColumns: ["id"]
        }]
      }
      events: {
        Row: {
          address: string | null
          banner_url: string | null
          category: string
          city: string
          created_at: string
          creator_id: string
          description: string
          event_date: string
          event_time: string
          id: string
          instructions: string | null
          location_name: string
          max_participants: number | null
          price: number
          registration_deadline: string | null
          requirements: string | null
          sport: string
          state: string
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          banner_url?: string | null
          category?: string
          city: string
          created_at?: string
          creator_id: string
          description?: string
          event_date: string
          event_time?: string
          id?: string
          instructions?: string | null
          location_name: string
          max_participants?: number | null
          price?: number
          registration_deadline?: string | null
          requirements?: string | null
          sport: string
          state: string
          status?: string
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          banner_url?: string | null
          category?: string
          city?: string
          created_at?: string
          creator_id?: string
          description?: string
          event_date?: string
          event_time?: string
          id?: string
          instructions?: string | null
          location_name?: string
          max_participants?: number | null
          price?: number
          registration_deadline?: string | null
          requirements?: string | null
          sport?: string
          state?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          actor_id: string | null
          created_at: string
          id: string
          link: string | null
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          id?: string
          link?: string | null
          message: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [{
          foreignKeyName: "post_comments_post_id_fkey"
          columns: ["post_id"]
          isOneToOne: false
          referencedRelation: "posts"
          referencedColumns: ["id"]
        }]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [{
          foreignKeyName: "post_likes_post_id_fkey"
          columns: ["post_id"]
          isOneToOne: false
          referencedRelation: "posts"
          referencedColumns: ["id"]
        }]
      }
      posts: {
        Row: {
          audio_url: string | null
          content: string
          created_at: string
          id: string
          media_urls: string[] | null
          mentions: Json | null
          music_link: Json | null
          post_type: string
          updated_at: string
          user_id: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          content?: string
          created_at?: string
          id?: string
          media_urls?: string[] | null
          mentions?: Json | null
          music_link?: Json | null
          post_type?: string
          updated_at?: string
          user_id: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string
          created_at?: string
          id?: string
          media_urls?: string[] | null
          mentions?: Json | null
          music_link?: Json | null
          post_type?: string
          updated_at?: string
          user_id?: string
          video_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type_enum"]
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          categories: string | null
          certifications: string | null
          city: string | null
          club_name: string | null
          contact_info: string | null
          cover_position_x: number | null
          cover_position_y: number | null
          cover_type: string | null
          cover_url: string | null
          cover_zoom: number | null
          created_at: string
          experience: string | null
          full_name: string | null
          id: string
          institutional_description: string | null
          is_admin: boolean
          phone: string | null
          position: string | null
          previous_clubs: string | null
          specialties: string | null
          sport: string | null
          sports_goals: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type_enum"]
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          categories?: string | null
          certifications?: string | null
          city?: string | null
          club_name?: string | null
          contact_info?: string | null
          cover_position_x?: number | null
          cover_position_y?: number | null
          cover_type?: string | null
          cover_url?: string | null
          cover_zoom?: number | null
          created_at?: string
          experience?: string | null
          full_name?: string | null
          id: string
          institutional_description?: string | null
          is_admin?: boolean
          phone?: string | null
          position?: string | null
          previous_clubs?: string | null
          specialties?: string | null
          sport?: string | null
          sports_goals?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type_enum"]
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          categories?: string | null
          certifications?: string | null
          city?: string | null
          club_name?: string | null
          contact_info?: string | null
          cover_position_x?: number | null
          cover_position_y?: number | null
          cover_type?: string | null
          cover_url?: string | null
          cover_zoom?: number | null
          created_at?: string
          experience?: string | null
          full_name?: string | null
          id?: string
          institutional_description?: string | null
          is_admin?: boolean
          phone?: string | null
          position?: string | null
          previous_clubs?: string | null
          specialties?: string | null
          sport?: string | null
          sports_goals?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          updated_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          content_id: string | null
          content_type: string
          created_at: string
          description: string | null
          id: string
          reason: string
          reported_user_id: string | null
          reporter_id: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
        }
        Insert: {
          content_id?: string | null
          content_type: string
          created_at?: string
          description?: string | null
          id?: string
          reason: string
          reported_user_id?: string | null
          reporter_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Update: {
          content_id?: string | null
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          reason?: string
          reported_user_id?: string | null
          reporter_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Relationships: []
      }
      user_blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          id: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          id?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      decide_event_registration: {
        Args: {
          p_new_status: string
          p_registration_id: string
        }
        Returns: Json
      }
      get_or_create_conversation: {
        Args: {
          other_user_id: string
        }
        Returns: string
      }
      is_current_user_admin: {
        Args: never
        Returns: boolean
      }
    }
    Enums: {
      account_type_enum: "athlete" | "club" | "coach"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

type PublicSchema = Database["public"]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | "public",
  TableName extends PublicTableNameOrOptions extends "public"
    ? keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    : never = never,
> = PublicTableNameOrOptions extends "public"
  ? (PublicSchema["Tables"] & PublicSchema["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | "public",
  TableName extends PublicTableNameOrOptions extends "public"
    ? keyof PublicSchema["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends "public"
  ? PublicSchema["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | "public",
  TableName extends PublicTableNameOrOptions extends "public"
    ? keyof PublicSchema["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends "public"
  ? PublicSchema["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | "public",
  EnumName extends PublicEnumNameOrOptions extends "public"
    ? keyof PublicSchema["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends "public"
  ? PublicSchema["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | "public",
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends "public"
    ? keyof PublicSchema["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends "public"
  ? PublicSchema["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
export const Constants = {
  public: {
    Enums: {
      account_type_enum: ["athlete", "club", "coach"],
    },
  },
} as const
