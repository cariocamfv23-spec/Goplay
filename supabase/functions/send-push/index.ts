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

    // 1. Verify caller authorization (must have valid JWT or service role)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
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
      const authClient = createClient(supabaseUrl, supabaseAnonKey || '')
      // In Deno Edge Runtime, token must be passed directly into getUser(token)
      const {
        data: { user },
        error: authError,
      } = await authClient.auth.getUser(token)

      if (authError || !user) {
        return new Response(
          JSON.stringify({
            error: 'Unauthorized caller',
            details: authError?.message || 'Invalid or expired user session',
          }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          },
        )
      }
      callerUser = user
    }

    // Parse body
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

    // Retrieve VAPID credentials from environment
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')
    const vapidSubject =
      Deno.env.get('VAPID_SUBJECT') || 'mailto:contato@goplay.app'

    if (!vapidPublicKey || !vapidPrivateKey) {
      return new Response(
        JSON.stringify({
          error: 'VAPID credentials not configured on backend',
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
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        }

        // Web Push options with high urgency so Android wakes up from Doze / Background
        const delivered = await sendPushNotification(subData, payload, vapid, {
          ttl: 86400, // 24h retrying on push service
          urgency: 'high', // CRITICAL for Android: wakes up background/standby PWA
        })

        if (!delivered) {
          // Status 404 or 410: device uninstalled or revoked subscription
          deadSubIds.push(sub.id)
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: 'pruned',
            statusCode: 410,
            error: 'Subscription expired or revoked by push service (410 Gone)',
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
      } catch (sendErr) {
        if (sendErr instanceof WebPushError) {
          if (sendErr.statusCode === 404 || sendErr.statusCode === 410) {
            deadSubIds.push(sub.id)
            deliveryReports.push({
              subId: sub.id,
              host: endpointHost,
              status: 'pruned',
              statusCode: sendErr.statusCode,
              error: 'Push service reports endpoint no longer valid',
            })
          } else {
            console.warn(
              `[send-push] WebPushError from ${endpointHost} [${sendErr.statusCode}]:`,
              sendErr.message,
            )
            deliveryReports.push({
              subId: sub.id,
              host: endpointHost,
              status: 'failed',
              statusCode: sendErr.statusCode,
              error: sendErr.message,
            })
          }
        } else {
          console.error(
            `[send-push] Unexpected error sending push to ${endpointHost}:`,
            sendErr,
          )
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: 'failed',
            error:
              sendErr instanceof Error
                ? sendErr.message
                : 'Unexpected network error',
          })
        }
      }
    }

    // Clean up expired or revoked subscriptions automatically
    if (deadSubIds.length > 0) {
      await adminDb.from('push_subscriptions').delete().in('id', deadSubIds)
    }

    return new Response(
      JSON.stringify({
        success: successCount > 0,
        sentCount: successCount,
        prunedCount: deadSubIds.length,
        totalDevices: subscriptions.length,
        isTest: Boolean(isTest),
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
          'Internal server error processing push notification',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      },
    )
  }
})
