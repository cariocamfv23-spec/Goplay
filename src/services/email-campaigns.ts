import { supabase } from "@/lib/supabase/client"

const db = supabase as any

export type TargetAudience = "all" | "athletes" | "clubs" | "event_attendees" | "followers"

export type CampaignStatus = "draft" | "ready_for_sending" | "sending" | "sent" | "partial_failure" | "failed"

export interface EmailCampaign {
  id: string
  sender_id: string
  title: string
  subject: string
  body_text: string
  body_html: string
  target_audience: TargetAudience
  target_event_id: string | null
  target_user_id: string | null
  status: CampaignStatus
  total_recipients: number
  sent_count: number
  failed_count: number
  error_message: string | null
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface EmailCampaignRecipient {
  id: string
  campaign_id: string
  recipient_id: string
  recipient_email: string
  recipient_name: string | null
  status: "pending" | "sent" | "failed" | "unsubscribed" | "skipped"
  error_message: string | null
  sent_at: string | null
  created_at: string
}

export interface CreateCampaignInput {
  title: string
  subject: string
  body_text: string
  body_html?: string
  target_audience: TargetAudience
  target_event_id?: string | null
  target_user_id?: string | null
}

export interface SendCampaignResult {
  success: boolean
  status: CampaignStatus
  providerConfigured: boolean
  totalRecipients: number
  sentCount: number
  failedCount: number
  message?: string
  instructions?: string
  errors?: string[]
}

export const emailCampaignsService = {
  /**
   * Obtém a estimativa de destinatários para um segmento antes de criar a campanha
   */
  async getAudienceCount(
    audience: TargetAudience,
    targetEventId?: string | null,
    targetUserId?: string | null,
  ): Promise<{
    count: number
    error?: string
  }> {
    try {
      const { data, error } = await db.rpc("get_audience_count", {
        p_audience: audience,
        p_target_event_id: targetEventId || null,
        p_target_user_id: targetUserId || null,
      })

      if (error) {
        return { count: 0, error: error.message }
      }
      return { count: Number(data) || 0 }
    } catch (err: any) {
      return { count: 0, error: err?.message }
    }
  },

  /**
   * Lista campanhas do usuário atual (ou todas se for admin)
   */
  async listCampaigns(): Promise<{
    data: EmailCampaign[]
    error?: string
  }> {
    try {
      const { data, error } = await db
        .from("email_campaigns")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        return { data: [], error: error.message }
      }
      return { data: data as EmailCampaign[] || [] }
    } catch (err: any) {
      return { data: [], error: err?.message }
    }
  },

  /**
   * Obtém detalhes de uma campanha com seus destinatários
   */
  async getCampaignDetails(campaignId: string): Promise<{
    campaign: EmailCampaign | null
    recipients: EmailCampaignRecipient[]
    error?: string
  }> {
    try {
      const [campRes, recipRes] = await Promise.all([
        db
          .from("email_campaigns")
          .select("*")
          .eq("id", campaignId)
          .maybeSingle(),
        db
          .from("email_campaign_recipients")
          .select("*")
          .eq("campaign_id", campaignId)
          .order("created_at", { ascending: true })
          .limit(100),
      ])

      if (campRes.error) {
        return { campaign: null, recipients: [], error: campRes.error.message }
      }

      return {
        campaign: campRes.data as EmailCampaign || null,
        recipients: recipRes.data as EmailCampaignRecipient[] || [],
      }
    } catch (err: any) {
      return { campaign: null, recipients: [], error: err?.message }
    }
  },

  /**
   * Cria uma nova campanha e popula a lista de destinatários de forma segura
   */
  async createCampaign(input: CreateCampaignInput, senderId: string): Promise<{
    campaign: EmailCampaign | null
    error?: string
  }> {
    try {
      // 1. Inserir campanha
      const { data: newCampaign, error: insertError } = await db
        .from("email_campaigns")
        .insert({
          sender_id: senderId,
          title: input.title.trim(),
          subject: input.subject.trim(),
          body_text: input.body_text.trim(),
          body_html: input.body_html || input.body_text.trim(),
          target_audience: input.target_audience,
          target_event_id: input.target_event_id || null,
          target_user_id: input.target_user_id || null,
          status: "draft",
          total_recipients: 0,
          sent_count: 0,
          failed_count: 0,
          metadata: {
            created_via: "web_dashboard",
          },
        })
        .select("*")
        .single()

      if (insertError || !newCampaign) {
        return {
          campaign: null,
          error: insertError?.message || "Falha ao criar campanha",
        }
      }

      // 2. Chamar RPC para popular os destinatários com base no segmento
      const { data: popData, error: popError } = await db.rpc(
        "populate_campaign_recipients",
        {
          p_campaign_id: newCampaign.id,
        },
      )

      if (popError) {
        console.warn(
          "[emailCampaignsService] Erro ao popular destinatários:",
          popError,
        )
      }

      const totalRecipients =
        popData && typeof popData === "object" && "total_recipients" in popData
          ? (popData as any).total_recipients
          : 0

      return {
        campaign: {
          ...newCampaign as EmailCampaign,
          total_recipients: totalRecipients,
        },
      }
    } catch (err: any) {
      return { campaign: null, error: err?.message }
    }
  },

  /**
   * Dispara o envio da campanha chamando a Edge Function send-mass-email.
   * Se RESEND_API_KEY existir nos secrets do Supabase, o envio real é realizado.
   * Se não existir, a Edge Function grava como 'ready_for_sending' com aviso explícito.
   */
  async triggerCampaignSend(campaignId: string): Promise<SendCampaignResult> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "send-mass-email",
        {
          body: { campaignId },
        },
      )

      if (error) {
        return {
          success: false,
          status: "failed",
          providerConfigured: false,
          totalRecipients: 0,
          sentCount: 0,
          failedCount: 0,
          message:
            error.message || "Falha ao acionar a função de envio de e-mails.",
        }
      }

      return data as SendCampaignResult
    } catch (err: any) {
      return {
        success: false,
        status: "failed",
        providerConfigured: false,
        totalRecipients: 0,
        sentCount: 0,
        failedCount: 0,
        message:
          err?.message || "Erro inesperado ao conectar ao serviço de envio.",
      }
    }
  },

  /**
   * Descadastra um usuário (LGPD - Opt-out público)
   */
  async unsubscribeUser(userId: string): Promise<{
    success: boolean
    message: string
  }> {
    try {
      const { data, error } = await db.rpc("unsubscribe_user_email", {
        target_user_id: userId,
      })

      if (error) {
        return { success: false, message: error.message }
      }

      return {
        success: Boolean((data as any)?.success),
        message: (data as any)?.message || "Descadastro processado.",
      }
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Erro ao processar descadastro.",
      }
    }
  },
}
