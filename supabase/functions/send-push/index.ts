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
}

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

    const authClient = createClient(supabaseUrl, supabaseAnonKey || '', {
      global: { headers: { Authorization: authHeader } },
    })
    const {
      data: { user: callerUser },
      error: authError,
    } = await authClient.auth.getUser()

    if (authError || !callerUser) {
      return new Response(JSON.stringify({ error: 'Unauthorized caller' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Parse body
    const body: PushRequestPayload = await req.json()
    const { userId, title, body: messageBody, url, tag, icon, badge } = body

    if (!userId || !title) {
      return new Response(
        JSON.stringify({ error: 'userId and title are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }

    // Anti-self-notification safety rule: NEVER push to the caller themselves
    if (callerUser.id === userId) {
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

    // Connect to Supabase using service-role (or caller token if service key absent) to fetch recipient's subscriptions
    const adminDb = createClient(
      supabaseUrl,
      serviceRoleKey || supabaseAnonKey || '',
      {
        auth: { persistSession: false },
      },
    )

    const { data: subscriptions, error: subError } = await adminDb
      .from('push_subscriptions')
      .select('id, endpoint, p256dh, auth')
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
          message: 'No active push subscriptions for this user',
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

    const payload = {
      title,
      body: messageBody || '',
      url: url || '/',
      tag: tag || 'goplay-alert',
      icon: icon || '/icon-192.svg',
      badge: badge || '/icon-192.svg',
    }

    let successCount = 0
    const deadSubIds: string[] = []

    for (const sub of subscriptions) {
      try {
        const subData = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        }

        const delivered = await sendPushNotification(subData, payload, vapid, {
          ttl: 86400, // 24h retrying on push service
        })

        if (!delivered) {
          // Status 404 or 410: device uninstalled or revoked subscription
          deadSubIds.push(sub.id)
        } else {
          successCount++
        }
      } catch (sendErr) {
        if (sendErr instanceof WebPushError) {
          // If status is 404 or 410, push service removed subscription
          if (sendErr.statusCode === 404 || sendErr.statusCode === 410) {
            deadSubIds.push(sub.id)
          } else {
            console.warn(
              `WebPushError [${sendErr.statusCode}]:`,
              sendErr.message,
            )
          }
        } else {
          console.error('Unexpected error sending push notification:', sendErr)
        }
      }
    }

    // Clean up expired or revoked subscriptions automatically
    if (deadSubIds.length > 0) {
      await adminDb.from('push_subscriptions').delete().in('id', deadSubIds)
    }

    return new Response(
      JSON.stringify({
        success: true,
        sentCount: successCount,
        prunedCount: deadSubIds.length,
        totalDevices: subscriptions.length,
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
