import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "npm:@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

interface SendMassEmailPayload {
  campaignId: string
  // If true, function runs only recipient resolution & status check without sending
  dryRun?: boolean
}

// Visual GoPlay email template wrapper (Purple Serenity + Soft Gold + LGPD footer)
function renderGoPlayEmailHtml(params: {
  subject: string
  contentHtml: string
  recipientName: string
  unsubscribeUrl: string
  senderClubOrOrg?: string
}): string {
  const {
    subject,
    contentHtml,
    recipientName,
    unsubscribeUrl,
    senderClubOrOrg,
  } = params

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0914; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0c0914; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #171126; border-radius: 16px; border: 1px solid #2d2247; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <!-- Header with GoPlay Brand -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #1f1438 0%, #2e1d52 100%); border-bottom: 2px solid #eab308;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                      Go<span style="color: #eab308;">Play</span>
                    </span>
                    <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a78bfa; margin-top: 2px;">
                      Plataforma Oficial do Esporte
                    </span>
                  </td>
                  ${
                    senderClubOrOrg
                      ? `<td align="right">
                          <span style="display: inline-block; padding: 4px 10px; background-color: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.4); border-radius: 8px; font-size: 11px; font-weight: 600; color: #fde047;">
                            ${escapeHtml(senderClubOrOrg)}
                          </span>
                        </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              ${
                recipientName
                  ? `<p style="font-size: 15px; color: #c4b5fd; margin: 0 0 16px 0;">Olá, <strong>${escapeHtml(
                      recipientName,
                    )}</strong>!</p>`
                  : ""
              }
              <div style="font-size: 15px; line-height: 1.6; color: #e2e8f0;">
                ${contentHtml}
              </div>
            </td>
          </tr>

          <!-- LGPD Footer & Unsubscribe -->
          <tr>
            <td style="padding: 24px 32px; background-color: #100b1c; border-top: 1px solid #2d2247; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                Você está recebendo este comunicado porque faz parte da comunidade esportiva <strong>GoPlay</strong>.
                Respeitamos sua privacidade e seus dados de acordo com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Caso não deseje mais receber comunicados deste tipo,
                <a href="${unsubscribeUrl}" target="_blank" rel="noopener noreferrer" style="color: #eab308; text-decoration: underline; font-weight: 600;">
                  clique aqui para se descadastrar
                </a>.
              </p>
              <p style="margin: 12px 0 0 0; font-size: 10px; color: #64748b;">
                GoPlay App • O ecossistema inteligente de conexão e oportunidades esportivas
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(str: string): string {
  if (!str) return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

Deno.serve(async (req: Request) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Supabase configuration missing on server." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // 1. Verify caller auth token
    const authHeader =
      req.headers.get("Authorization") || req.headers.get("authorization")
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: "Missing Authorization header",
          code: "UNAUTHORIZED",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim()
    const adminDb = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })

    // Validate user token
    const {
      data: { user: callerUser },
      error: authError,
    } = await adminDb.auth.getUser(token)

    if (authError || !callerUser) {
      return new Response(
        JSON.stringify({
          error: "Sessão inválida ou expirada. Faça login novamente.",
          details: authError?.message,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Verify caller is admin or club/coach
    const { data: callerProfile, error: profileErr } = await adminDb
      .from("profiles")
      .select("id, full_name, is_admin, account_type, club_name")
      .eq("id", callerUser.id)
      .maybeSingle()

    if (profileErr || !callerProfile) {
      return new Response(
        JSON.stringify({ error: "Perfil do autor não encontrado." }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    const isAdmin = Boolean(callerProfile.is_admin)
    const isClubOrCoach =
      callerProfile.account_type === "club" ||
      callerProfile.account_type === "coach"

    if (!isAdmin && !isClubOrCoach) {
      return new Response(
        JSON.stringify({
          error:
            "Apenas administradores e organizadores (clubes e treinadores) podem disparar e-mails em massa.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Parse payload
    const body: SendMassEmailPayload = await req.json()
    const { campaignId, dryRun } = body

    if (!campaignId) {
      return new Response(JSON.stringify({ error: "campaignId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    // Fetch campaign
    const { data: campaign, error: campErr } = await adminDb
      .from("email_campaigns")
      .select("*")
      .eq("id", campaignId)
      .maybeSingle()

    if (campErr || !campaign) {
      return new Response(
        JSON.stringify({ error: "Campanha não encontrada." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Authorization: owner or admin
    if (!isAdmin && campaign.sender_id !== callerUser.id) {
      return new Response(
        JSON.stringify({
          error: "Você só pode enviar campanhas criadas pela sua conta.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Derive base app URL for unsubscribe link
    const callerOrigin =
      req.headers.get("Origin") ||
      req.headers.get("origin") ||
      (req.headers.get("Referer")
        ? (() => {
            try {
              return new URL(req.headers.get("Referer")!).origin
            } catch {
              return ""
            }
          })()
        : "") ||
      "https://goplay.app"

    // 2. Fetch all recipients for this campaign
    const { data: recipients, error: recipErr } = await adminDb
      .from("email_campaign_recipients")
      .select("id, recipient_id, recipient_email, recipient_name, status")
      .eq("campaign_id", campaignId)

    if (recipErr) {
      return new Response(
        JSON.stringify({
          error: "Erro ao buscar destinatários: " + recipErr.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    const totalRecipients = recipients?.length || 0

    // Check external email provider configuration (Resend API key)
    const resendApiKey =
      Deno.env.get("RESEND_API_KEY") || Deno.env.get("EMAIL_API_KEY")
    const emailSenderFrom =
      Deno.env.get("EMAIL_FROM") || "GoPlay <comunicados@goplay.app>"

    // IF NO EMAIL KEY CONFIGURED:
    // Follow the strict project requirement:
    // "SE não existir, grava a campanha como 'pronta para envio' com registro claro no histórico de que falta a chave — nunca simular sucesso falso."
    if (!resendApiKey) {
      const pendingReason =
        "Chave de provedor de e-mail (RESEND_API_KEY) não configurada nos secrets do Supabase. A campanha foi validada, os destinatários foram processados e ela está gravada como 'pronta para envio' (ready_for_sending). Assim que a chave for adicionada no painel, o envio poderá ser acionado sem necessidade de rebuild."

      await adminDb
        .from("email_campaigns")
        .update({
          status: "ready_for_sending",
          total_recipients: totalRecipients,
          sent_count: 0,
          failed_count: 0,
          error_message: pendingReason,
          updated_at: new Date().toISOString(),
          metadata: {
            ...campaign.metadata,
            provider_configured: false,
            provider_type: "resend",
            ready_reason:
              "Aguardando cadastro de RESEND_API_KEY nos secrets do Supabase.",
            checked_at: new Date().toISOString(),
          },
        })
        .eq("id", campaignId)

      return new Response(
        JSON.stringify({
          success: true,
          status: "ready_for_sending",
          providerConfigured: false,
          totalRecipients,
          sentCount: 0,
          failedCount: 0,
          message: pendingReason,
          instructions:
            "Para ativar o envio real, acesse o painel do Supabase > Project Settings > Secrets, adicione 'RESEND_API_KEY' com sua chave do Resend (resend.com), e depois clique em 'Disparar Envio' no painel GoPlay.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // IF RESEND API KEY EXISTS:
    // Mark campaign as sending
    await adminDb
      .from("email_campaigns")
      .update({
        status: "sending",
        updated_at: new Date().toISOString(),
      })
      .eq("id", campaignId)

    // Rate limiting: batch size of 5 recipients with 100ms pause to prevent quota bursts
    const BATCH_SIZE = 5
    let sentCount = 0
    let failedCount = 0
    const errorsList: string[] = []

    const clubOrOrgName =
      callerProfile.club_name || callerProfile.full_name || "GoPlay"

    for (let i = 0; i < (recipients || []).length; i += BATCH_SIZE) {
      const batch = (recipients || []).slice(i, i + BATCH_SIZE)

      await Promise.all(
        batch.map(async (r) => {
          // If already sent or unsubscribed, skip
          if (r.status === "sent" || r.status === "unsubscribed") {
            sentCount++
            return
          }

          const unsubscribeUrl = `${callerOrigin.replace(/\/+$/, "")}/unsubscribe/${r.recipient_id}`
          const emailHtml = renderGoPlayEmailHtml({
            subject: campaign.subject,
            contentHtml:
              campaign.body_html || `<p>${escapeHtml(campaign.body_text)}</p>`,
            recipientName: r.recipient_name || "",
            unsubscribeUrl,
            senderClubOrOrg: clubOrOrgName,
          })

          try {
            const resendResponse = await fetch(
              "https://api.resend.com/emails",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${resendApiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: emailSenderFrom,
                  to: r.recipient_email,
                  subject: campaign.subject,
                  html: emailHtml,
                  text: campaign.body_text,
                  headers: {
                    "List-Unsubscribe": `<${unsubscribeUrl}>`,
                  },
                }),
              },
            )

            if (resendResponse.ok) {
              sentCount++
              await adminDb
                .from("email_campaign_recipients")
                .update({
                  status: "sent",
                  sent_at: new Date().toISOString(),
                  error_message: null,
                })
                .eq("id", r.id)
            } else {
              failedCount++
              const errBody = await resendResponse.text()
              const msg = `Resend HTTP ${resendResponse.status}: ${errBody.slice(0, 200)}`
              errorsList.push(`${r.recipient_email}: ${msg}`)
              await adminDb
                .from("email_campaign_recipients")
                .update({
                  status: "failed",
                  error_message: msg,
                })
                .eq("id", r.id)
            }
          } catch (fetchErr: any) {
            failedCount++
            const msg = fetchErr?.message || "Erro de conexão ao enviar email"
            errorsList.push(`${r.recipient_email}: ${msg}`)
            await adminDb
              .from("email_campaign_recipients")
              .update({
                status: "failed",
                error_message: msg,
              })
              .eq("id", r.id)
          }
        }),
      )

      // 100ms pause between batches
      if (i + BATCH_SIZE < (recipients || []).length) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    const finalStatus =
      failedCount === 0 ? "sent" : sentCount > 0 ? "partial_failure" : "failed"

    await adminDb
      .from("email_campaigns")
      .update({
        status: finalStatus,
        sent_count: sentCount,
        failed_count: failedCount,
        error_message:
          errorsList.length > 0 ? errorsList.slice(0, 5).join(" | ") : null,
        updated_at: new Date().toISOString(),
        metadata: {
          ...campaign.metadata,
          provider_configured: true,
          provider_type: "resend",
          completed_at: new Date().toISOString(),
        },
      })
      .eq("id", campaignId)

    return new Response(
      JSON.stringify({
        success: true,
        status: finalStatus,
        providerConfigured: true,
        totalRecipients,
        sentCount,
        failedCount,
        errors: errorsList.slice(0, 5),
        message:
          finalStatus === "sent"
            ? `Todos os ${sentCount} e-mails foram enviados com sucesso via Resend API.`
            : `Envio concluído com ${sentCount} enviados e ${failedCount} falhas.`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: err?.message || "Erro interno ao processar campanha de e-mail.",
        code: "INTERNAL_ERROR",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    )
  }
})
