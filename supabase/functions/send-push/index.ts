import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  sendPushNotification,
  WebPushError,
} from 'npm:@mmmike/web-push@1.3.0/send'
import { corsHeaders } from '../_shared/cors.ts'

interface PushRequestPayload {
  userId: string
  title: string
  body: string
  url?: string
  tag?: string
  icon?: string
  badge?: string
  isTest?: boolean
}

// Fallback high-compatibility PNG icons for Android & Samsung OneUI
const DEFAULT_ICON_PNG =
  'https://img.usecurling.com/p/192/192?q=goplay%20logo&color=purple&v=4'
const DEFAULT_BADGE_PNG =
  'https://img.usecurling.com/p/96/96?q=goplay%20badge&color=white&v=4'

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl) {
      return new Response(JSON.stringify({ error: 'Missing SUPABASE_URL' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Parse body early so we know the target userId
    const body: PushRequestPayload = await req.json()
    const {
      userId,
      title,
      body: messageBody,
      url,
      tag,
      icon,
      badge,
      isTest,
    } = body

    // 1. Verify caller authorization (must have valid JWT or service role)
    const authHeader =
      req.headers.get('Authorization') || req.headers.get('authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: 'Missing Authorization header',
          code: 'UNAUTHORIZED_NO_HEADER',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    const token = authHeader.replace(/^Bearer\s+/i, '').trim()
    let callerUser: { id: string; email?: string } | null = null

    if (serviceRoleKey && token === serviceRoleKey) {
      callerUser = { id: 'service-role', email: 'service@supabase.internal' }
    } else {
      // Primary verification: getUser(token) via anon client
      const authClient = createClient(supabaseUrl, supabaseAnonKey || '')
      const {
        data: { user },
        error: authError,
      } = await authClient.auth.getUser(token)

      if (user) {
        callerUser = user
      } else {
        // Fallback verification: if anon getUser fails (e.g. gateway auth header rewriting),
        // try verifying using admin client or inspect JWT payload
        if (serviceRoleKey) {
          try {
            const adminClient = createClient(supabaseUrl, serviceRoleKey)
            const { data: adminUserData } =
              await adminClient.auth.getUser(token)
            if (adminUserData?.user) {
              callerUser = adminUserData.user
            }
          } catch {
            // Admin fallback attempt
          }
        }
      }

      if (!callerUser) {
        return new Response(
          JSON.stringify({
            error:
              'Sua sessão de usuário expirou ou o token de autorização é inválido.',
            details: authError?.message || 'Invalid or expired user session',
            code: 'AUTH_INVALID_TOKEN',
          }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          },
        )
      }
    }

    if (!userId || !title) {
      return new Response(
        JSON.stringify({ error: 'userId and title are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    // Security & Safety rules:
    // - If isTest is requested, caller MUST be testing their OWN account only
    if (
      isTest &&
      callerUser.id !== 'service-role' &&
      callerUser.id !== userId
    ) {
      return new Response(
        JSON.stringify({
          error:
            'Test push can only be triggered for your own authenticated device.',
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    // - If NOT a test, anti-self-notification prevents echoing author's own actions
    if (!isTest && callerUser.id === userId) {
      return new Response(
        JSON.stringify({
          success: true,
          skipped: true,
          reason: 'Self-notifications are ignored',
          sentCount: 0,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    // Retrieve and sanitize VAPID credentials from environment
    const rawPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')
    const rawPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')
    const rawSubject = Deno.env.get('VAPID_SUBJECT')

    const vapidPublicKey = rawPublicKey
      ? rawPublicKey.trim().replace(/^["']|["']$/g, '')
      : null
    const vapidPrivateKey = rawPrivateKey
      ? rawPrivateKey.trim().replace(/^["']|["']$/g, '')
      : null
    let vapidSubject = rawSubject
      ? rawSubject.trim().replace(/^["']|["']$/g, '')
      : 'mailto:contato@goplay.app'
    if (
      !vapidSubject.startsWith('mailto:') &&
      !vapidSubject.startsWith('https://')
    ) {
      vapidSubject = `mailto:${vapidSubject}`
    }

    if (!vapidPublicKey || !vapidPrivateKey) {
      return new Response(
        JSON.stringify({
          error: 'Credenciais VAPID não configuradas no servidor Supabase.',
          code: 'VAPID_NOT_CONFIGURED',
          configured: false,
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    // Connect to Supabase using service-role key to fetch recipient's push subscriptions
    const adminDb = createClient(
      supabaseUrl,
      serviceRoleKey || supabaseAnonKey || '',
      {
        auth: { persistSession: false },
      },
    )

    const { data: subscriptions, error: subError } = await adminDb
      .from('push_subscriptions')
      .select('id, endpoint, p256dh, auth, user_agent')
      .eq('user_id', userId)

    if (subError) {
      return new Response(
        JSON.stringify({
          error: 'Error fetching subscriptions',
          details: subError.message,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          sentCount: 0,
          totalDevices: 0,
          message:
            'Nenhuma assinatura push ativa encontrada para este usuário no banco.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    const vapid = {
      publicKey: vapidPublicKey,
      privateKey: vapidPrivateKey,
      subject: vapidSubject,
    }

    // Android/Samsung notification guidelines:
    // Avoid SVGs in icon and badge: use raster PNGs to guarantee native system banner display
    const safeIcon = icon && !icon.endsWith('.svg') ? icon : DEFAULT_ICON_PNG
    const safeBadge =
      badge && !badge.endsWith('.svg') ? badge : DEFAULT_BADGE_PNG

    const payload = {
      title,
      body: messageBody || '',
      url: url || '/',
      tag: tag || (isTest ? `goplay-test-${Date.now()}` : 'goplay-alert'),
      icon: safeIcon,
      badge: safeBadge,
    }

    let successCount = 0
    const deadSubIds: string[] = []
    const deliveryReports: Array<{
      subId: string
      host: string
      status: 'delivered' | 'failed' | 'pruned'
      statusCode?: number
      error?: string
    }> = []

    for (const sub of subscriptions) {
      let endpointHost = 'unknown'
      try {
        endpointHost = new URL(sub.endpoint).host
      } catch {
        endpointHost = 'invalid-url'
      }

      try {
        const subData = {
          endpoint: sub.endpoint.trim(),
          keys: {
            p256dh: sub.p256dh.trim(),
            auth: sub.auth.trim(),
          },
        }

        // Web Push options with high urgency so Android wakes up from Doze / Background
        // Note: RFC 8292 caps VAPID token lifetime to 24h (86400s), but ttl can be 86400.
        // We set vapidExpiration to 43200 (12h) to avoid any edge boundary clamp.
        const delivered = await sendPushNotification(subData, payload, vapid, {
          ttl: 86400, // 24h retention on FCM push service
          urgency: 'high', // CRITICAL for Android: wakes up background/standby PWA
          vapidExpiration: 43200,
        })

        if (!delivered) {
          // Status 404 or 410: device uninstalled or revoked subscription
          deadSubIds.push(sub.id)
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: 'pruned',
            statusCode: 410,
            error:
              'Assinatura expirada ou revogada pelo serviço push do Google (410 Gone)',
          })
        } else {
          successCount++
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: 'delivered',
            statusCode: 201, // RFC 8030 standard push service acceptance
          })
        }
      } catch (sendErr: any) {
        const statusCode =
          sendErr?.statusCode ||
          sendErr?.status ||
          (sendErr instanceof WebPushError ? sendErr.statusCode : undefined)
        const errMsg = sendErr?.message || String(sendErr)

        if (statusCode === 404 || statusCode === 410) {
          deadSubIds.push(sub.id)
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: 'pruned',
            statusCode,
            error:
              'Endpoint desativado pelo serviço push do navegador (404/410). Assinatura removida.',
          })
        } else if (statusCode === 401 || statusCode === 403) {
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: 'failed',
            statusCode,
            error: `Rejeição de credencial VAPID pelo FCM Google (${statusCode}): chave pública/privada não coincide com a assinatura registrada.`,
          })
        } else {
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: 'failed',
            statusCode,
            error:
              errMsg ||
              'Falha de comunicação com o servidor de push da Google (FCM).',
          })
        }
      }
    }

    // Clean up expired or revoked subscriptions automatically
    if (deadSubIds.length > 0) {
      await adminDb.from('push_subscriptions').delete().in('id', deadSubIds)
    }

    // Always return 200 with delivery details for client clarity even if 0 succeeded,
    // so client can read full JSON deliveryReports and status codes (201, 401, 410, etc.)
    return new Response(
      JSON.stringify({
        success: successCount > 0,
        sentCount: successCount,
        prunedCount: deadSubIds.length,
        totalDevices: subscriptions.length,
        isTest: Boolean(isTest),
        message:
          successCount > 0
            ? `${successCount} aparelho(s) notificado(s) com sucesso via FCM Google (HTTP 201).`
            : `Nenhum aparelho pôde ser notificado (${subscriptions.length} dispositivo(s) cadastrado(s)). Verifique os detalhes do relatório.`,
        reports: deliveryReports,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      },
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error:
          error?.message ||
          'Erro interno no servidor Supabase ao processar o push Web.',
        code: 'EDGE_FUNCTION_EXCEPTION',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      },
    )
  }
})
