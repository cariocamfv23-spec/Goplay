import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "npm:@supabase/supabase-js@2"
import {
  sendPushNotification,
  WebPushError,
} from "npm:@mmmike/web-push@1.3.0/send"
import { corsHeaders } from "../_shared/cors.ts"

interface PushRequestPayload {
  userId: string
  title: string
  body: string
  url?: string
  tag?: string
  icon?: string
  badge?: string
  image?: string
  actorId?: string
  isTest?: boolean
}

// Fallback high-compatibility official PNG icons for Android & Samsung OneUI
const DEFAULT_ICON_PATH = "/icon-192.png"

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
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

    if (!supabaseUrl) {
      return new Response(JSON.stringify({ error: "Missing SUPABASE_URL" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
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
      image,
      actorId,
      isTest,
    } = body

    // 1. Verify caller authorization (must have valid JWT or service role)
    const authHeader =
      req.headers.get("Authorization") || req.headers.get("authorization")
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: "Missing Authorization header",
          code: "UNAUTHORIZED_NO_HEADER",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim()
    let callerUser: {
      id: string
      email?: string
    } | null = null

    if (serviceRoleKey && token === serviceRoleKey) {
      callerUser = { id: "service-role", email: "service@supabase.internal" }
    } else {
      // Primary verification: getUser(token) via anon client
      const authClient = createClient(supabaseUrl, supabaseAnonKey || "")
      const {
        data: { user },
        error: authError,
      } = await authClient.auth.getUser(token)

      if (user) {
        callerUser = user
      } else {
        // Fallback verification: if anon getUser fails (e.g. gateway auth header rewriting),
        // try verifying using admin client
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
              "Sua sessão de usuário expirou ou o token de autorização é inválido.",
            details: authError?.message || "Invalid or expired user session",
            code: "AUTH_INVALID_TOKEN",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          },
        )
      }
    }

    if (!userId || !title) {
      return new Response(
        JSON.stringify({ error: "userId and title are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Security & Safety rules:
    // - If isTest is requested, caller MUST be testing their OWN account only
    if (
      isTest &&
      callerUser.id !== "service-role" &&
      callerUser.id !== userId
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Test push can only be triggered for your own authenticated device.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // - If NOT a test, anti-self-notification prevents echoing author's own actions
    if (!isTest && callerUser.id === userId) {
      return new Response(
        JSON.stringify({
          success: true,
          skipped: true,
          reason: "Self-notifications are ignored",
          sentCount: 0,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Retrieve and sanitize VAPID credentials from environment
    const rawPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")
    const rawPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")
    const rawSubject = Deno.env.get("VAPID_SUBJECT")

    /**
     * Ultra-tolerant sanitizer for Base64/Base64URL keys.
     * Cleans wrapping/internal quotes, commas, semicolons, tabs, newlines, spaces,
     * strips trailing '=' padding, and standardizes '+' -> '-' and '/' -> '_'.
     */
    const sanitizeVapidKey = (raw: string | undefined | null): string => {
      if (!raw || typeof raw !== "string") return ""
      let s = raw.trim()
      // Strip outer wrapping quotes/backticks/brackets if copied with code syntax
      s = s.replace(/^["'`\[\(]+|["'`\]\)]+$/g, "")
      // Strip outer punctuation like commas, semicolons
      s = s.replace(/^[,;]+|[,;]+$/g, "")
      // Remove any whitespace (spaces, tabs, newlines, non-breaking spaces)
      s = s.replace(/\s+/g, "")
      // Strip stray quotes, commas, semicolons that might have been pasted inside
      s = s.replace(/["'`,;]/g, "")
      // Normalize standard Base64 characters to Base64URL (RFC 7515 / RFC 8292)
      s = s.replace(/\+/g, "-").replace(/\//g, "_")
      // Remove Base64URL trailing '=' padding (Web Push standard requires unpadded base64url)
      s = s.replace(/=+$/, "")
      return s
    }

    /**
     * Tolerant sanitizer for VAPID_SUBJECT.
     */
    const sanitizeVapidSubject = (raw: string | undefined | null): string => {
      if (!raw || typeof raw !== "string") return "mailto:contato@goplay.app"
      let s = raw.trim()
      s = s.replace(/^["'`]+|["'`]+$/g, "").trim()
      s = s.replace(/^[,;]+|[,;]+$/g, "").trim()
      s = s.replace(/\s+/g, "")
      if (!s) return "mailto:contato@goplay.app"
      if (!s.startsWith("mailto:") && !s.startsWith("https://")) {
        s = `mailto:${s}`
      }
      return s
    }

    const vapidPublicKey = rawPublicKey ? sanitizeVapidKey(rawPublicKey) : null
    const vapidPrivateKey = rawPrivateKey
      ? sanitizeVapidKey(rawPrivateKey)
      : null
    const vapidSubject = sanitizeVapidSubject(rawSubject)

    // Detailed diagnostic logging for VAPID env (without exposing secret values)
    console.log("[send-push] VAPID env diagnostics:", {
      hasPublicKey: Boolean(rawPublicKey),
      rawPubLen: rawPublicKey?.length ?? 0,
      sanitizedPubLen: vapidPublicKey?.length ?? 0,
      pubHasQuotes: rawPublicKey ? /["']/.test(rawPublicKey) : false,
      pubHasComma: rawPublicKey ? /,/.test(rawPublicKey) : false,
      pubHasWhitespace: rawPublicKey ? /\s/.test(rawPublicKey) : false,
      hasPrivateKey: Boolean(rawPrivateKey),
      rawPrivLen: rawPrivateKey?.length ?? 0,
      sanitizedPrivLen: vapidPrivateKey?.length ?? 0,
      privHasQuotes: rawPrivateKey ? /["']/.test(rawPrivateKey) : false,
      privHasComma: rawPrivateKey ? /,/.test(rawPrivateKey) : false,
      privHasWhitespace: rawPrivateKey ? /\s/.test(rawPrivateKey) : false,
      hasSubject: Boolean(rawSubject),
      subjectScheme: vapidSubject.split(":")[0],
    })

    const decodeBase64UrlBytes = (str: string, label: string, rawLen: number): {
      valid: boolean
      length: number
      bytes?: Uint8Array
      error?: string
    } => {
      try {
        if (!str || typeof str !== "string") {
          return {
            valid: false,
            length: 0,
            error: `${label}: chave vazia após sanitização (comprimento bruto: ${rawLen}).`,
          }
        }
        // Base64URL string must contain only valid Base64URL characters [A-Za-z0-9_-]
        const invalidCharMatch = str.match(/[^A-Za-z0-9_-]/)
        if (invalidCharMatch) {
          return {
            valid: false,
            length: 0,
            error: `${label}: caractere inválido '${invalidCharMatch[0]}' encontrado (comprimento bruto: ${rawLen}, sanitizado: ${str.length}).`,
          }
        }

        const padding = "=".repeat((4 - (str.length % 4)) % 4)
        const base64 = (str + padding).replace(/-/g, "+").replace(/_/g, "/")
        const binaryString = atob(base64)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        return { valid: true, length: bytes.length, bytes }
      } catch (e: any) {
        return {
          valid: false,
          length: 0,
          error: `${label}: falha ao decodificar Base64URL (${e?.message || "atob falhou"}) — comprimento bruto: ${rawLen}, sanitizado: ${str.length}.`,
        }
      }
    }

    if (!vapidPublicKey || !vapidPrivateKey) {
      return new Response(
        JSON.stringify({
          error: "Credenciais VAPID não configuradas no servidor Supabase.",
          code: "VAPID_NOT_CONFIGURED",
          configured: false,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Validate VAPID keys format and byte lengths locally before invoking @mmmike/web-push
    const pubValidation = decodeBase64UrlBytes(
      vapidPublicKey,
      "VAPID_PUBLIC_KEY",
      rawPublicKey?.length ?? 0,
    )
    const privValidation = decodeBase64UrlBytes(
      vapidPrivateKey,
      "VAPID_PRIVATE_KEY",
      rawPrivateKey?.length ?? 0,
    )

    if (!pubValidation.valid || !privValidation.valid) {
      const errDetail =
        (!pubValidation.valid ? pubValidation.error : null) ||
        (!privValidation.valid ? privValidation.error : null) ||
        "Falha ao decodificar base64url"
      console.error(
        "[send-push] Erro de validação base64 nas chaves VAPID:",
        errDetail,
      )
      return new Response(
        JSON.stringify({
          error: `Erro nas chaves VAPID do servidor: ${errDetail}. Verifique os secrets VAPID no Supabase.`,
          code: "VAPID_BASE64_DECODE_ERROR",
          details: errDetail,
          diagnostics: {
            pubRawLength: rawPublicKey?.length ?? 0,
            pubSanitizedLength: vapidPublicKey?.length ?? 0,
            privRawLength: rawPrivateKey?.length ?? 0,
            privSanitizedLength: vapidPrivateKey?.length ?? 0,
          },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    if (pubValidation.length !== 65) {
      const msg = `VAPID_PUBLIC_KEY deve ter 65 bytes decodificados (P-256 não comprimido, iniciado em 0x04), porém foram encontrados ${pubValidation.length} bytes (comprimento bruto: ${rawPublicKey?.length ?? 0}, caracteres sanitizados: ${vapidPublicKey.length}). O secret VAPID_PUBLIC_KEY colado no Supabase provavelmente não é a chave pública correta.`
      console.error("[send-push]", msg)
      return new Response(
        JSON.stringify({
          error: msg,
          code: "VAPID_PUBLIC_KEY_INVALID_LENGTH",
          diagnostics: {
            pubRawLength: rawPublicKey?.length ?? 0,
            pubSanitizedLength: vapidPublicKey.length,
            pubDecodedBytes: pubValidation.length,
            expectedBytes: 65,
          },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    if (privValidation.length !== 32) {
      const msg = `VAPID_PRIVATE_KEY deve ter 32 bytes decodificados (P-256 escalar privado), porém foram encontrados ${privValidation.length} bytes (comprimento bruto: ${rawPrivateKey?.length ?? 0}, caracteres sanitizados: ${vapidPrivateKey.length}). O secret VAPID_PRIVATE_KEY colado no Supabase provavelmente não é a chave privada correta.`
      console.error("[send-push]", msg)
      return new Response(
        JSON.stringify({
          error: msg,
          code: "VAPID_PRIVATE_KEY_INVALID_LENGTH",
          diagnostics: {
            privRawLength: rawPrivateKey?.length ?? 0,
            privSanitizedLength: vapidPrivateKey.length,
            privDecodedBytes: privValidation.length,
            expectedBytes: 32,
          },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    // Connect to Supabase using service-role key to fetch recipient's push subscriptions
    const adminDb = createClient(
      supabaseUrl,
      serviceRoleKey || supabaseAnonKey || "",
      {
        auth: { persistSession: false },
      },
    )

    const { data: subscriptions, error: subError } = await adminDb
      .from("push_subscriptions")
      .select("id, endpoint, p256dh, auth, user_agent")
      .eq("user_id", userId)

    if (subError) {
      return new Response(
        JSON.stringify({
          error: "Error fetching subscriptions",
          details: subError.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
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
            "Nenhuma assinatura push ativa encontrada para este usuário no banco.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      )
    }

    const vapid = {
      publicKey: vapidPublicKey,
      privateKey: vapidPrivateKey,
      subject: vapidSubject,
    }

    // Android/Samsung notification guidelines:
    // Avoid SVGs in icon: use official raster PNG to guarantee native system banner display.
    // Origin strategy: NEVER rely on a hardcoded production or staging domain.
    // 1. Caller request Origin / Referer header (when invoked by active client)
    // 2. User-Agent / Subscription origin if available
    // 3. Fallback to origin-relative '/icon-192.png' (which sw.js resolves against self.location.origin on the device)
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
        : "")

    // Official Goplay default icon (origin-relative fallback)
    const officialLogoPath = callerOrigin
      ? `${callerOrigin.replace(/\/+$/, "")}/icon-192.png`
      : DEFAULT_ICON_PATH

    // Helper to sanitize avatar / image URLs
    // allowSquareTransform: if true, appends Supabase width/height/resize for square fallback
    // For circular PNG variants (-round.png), keep uncompressed/untransformed so alpha channel remains intact
    const sanitizeImageUrl = (
      rawUrl: string | undefined | null,
      allowSquareTransform = false,
    ): string | null => {
      if (!rawUrl || typeof rawUrl !== "string") return null
      const trimmed = rawUrl.trim()
      if (!trimmed) return null
      // Do not allow URLs with auth bearer tokens or explicit key query params
      if (
        /[?&](token|access_token|apikey|secret)=/i.test(trimmed) ||
        trimmed.startsWith("javascript:") ||
        trimmed.startsWith("data:")
      ) {
        return null
      }
      try {
        const parsed = new URL(trimmed, callerOrigin || "https://goplay.app")
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
          // If square transformation is requested and it's Supabase public storage without transform params
          if (
            allowSquareTransform &&
            parsed.pathname.includes("/storage/v1/object/public/") &&
            !parsed.searchParams.has("width")
          ) {
            parsed.searchParams.set("width", "192")
            parsed.searchParams.set("height", "192")
            parsed.searchParams.set("resize", "cover")
          }
          return parsed.href
        }
      } catch {
        return null
      }
      return null
    }

    /**
     * Resolves avatar variant URL with cascading fallback:
     * 1. Circular PNG variant (-round.png with alpha) if exists
     * 2. Original / square avatar URL (with 192x192 cover transform)
     * 3. Fallback: null (caller will fall back to official Goplay logo)
     */
    const resolveCircularOrSquareAvatar = async (
      rawAvatarUrl: string | null | undefined,
    ): Promise<string | null> => {
      if (!rawAvatarUrl || typeof rawAvatarUrl !== "string") return null

      // If the incoming URL is already the circular variant
      if (rawAvatarUrl.includes("-round.png")) {
        const sanitized = sanitizeImageUrl(rawAvatarUrl, false)
        if (sanitized) return sanitized
      }

      // Check if it belongs to Supabase avatars bucket
      if (rawAvatarUrl.includes("/storage/v1/object/public/avatars/")) {
        // Derive potential circular variant path
        // e.g. .../avatars/<userId>/avatar_123.jpg -> .../avatars/<userId>/avatar_123-round.png
        const roundCandidateUrl = rawAvatarUrl.replace(
          /\.[a-zA-Z0-9]+(\?.*)?$/,
          "-round.png",
        )
        if (roundCandidateUrl !== rawAvatarUrl) {
          try {
            // Quick HEAD check to verify if circular file actually exists in storage bucket
            const headRes = await fetch(roundCandidateUrl, { method: "HEAD" })
            if (headRes.ok) {
              const sanitizedRound = sanitizeImageUrl(roundCandidateUrl, false)
              if (sanitizedRound) {
                return sanitizedRound
              }
            }
          } catch {
            // Non-blocking fallback to square original
          }
        }

        // Fallback to square original with cover transform
        return sanitizeImageUrl(rawAvatarUrl, true)
      }

      // External or standard URL: return with square transform if applicable
      return sanitizeImageUrl(rawAvatarUrl, true)
    }

    // Determine the actor's profile photo to display on the RIGHT of the notification (in the `icon` slot)
    // Accept candidate from `icon` (if not the default logo) or `image`
    let candidateAvatarInput: string | undefined = undefined
    if (
      icon &&
      !icon.endsWith(".svg") &&
      !icon.includes("icon-192") &&
      !icon.includes("icon-512")
    ) {
      candidateAvatarInput = icon
    } else if (image && !image.endsWith(".svg")) {
      candidateAvatarInput = image
    }

    // If an actorId is provided (e.g. author of like/comment/follow/message) or actor was the caller,
    // fetch their public avatar from profiles if not already explicitly supplied
    const effectiveActorId =
      actorId ||
      (callerUser.id !== "service-role" && !isTest ? callerUser.id : null)

    let rawAvatarToResolve = candidateAvatarInput || null

    if (!rawAvatarToResolve && effectiveActorId) {
      try {
        const { data: actorProfile } = await adminDb
          .from("profiles")
          .select("avatar_url")
          .eq("id", effectiveActorId)
          .maybeSingle()

        if (actorProfile?.avatar_url) {
          rawAvatarToResolve = actorProfile.avatar_url
        }
      } catch (errProfile) {
        console.warn(
          "[send-push] Could not fetch actor profile avatar:",
          errProfile,
        )
      }
    }

    // Resolve circular -> square -> null
    const resolvedAvatar: string | null =
      await resolveCircularOrSquareAvatar(rawAvatarToResolve)

    // TikTok layout rule:
    // Android One UI displays the app identity (GoPlay logo) on the left automatically.
    // The `icon` parameter in NotificationOptions is rendered on the RIGHT aligned with the text.
    // Therefore, if we have the actor's profile photo (preferably circular PNG with alpha), send it as `icon`.
    // If not, fallback in cascade to the official Goplay logo.
    const finalIcon = resolvedAvatar || officialLogoPath

    // Top-level payload for RFC 8030 Web Push data.
    // FCM web-push encryption transports this data directly to the client's PushEvent handler in sw.js.
    // Notice: we also pass `avatarUrl` for explicit semantic clarity, and DO NOT send `image`
    // to ensure the large expanded photo banner is never rendered.
    const payload: Record<string, any> = {
      title,
      body: messageBody || "",
      url: url || "/",
      tag: tag || (isTest ? `goplay-test-${Date.now()}` : "goplay-alert"),
      icon: finalIcon,
      badge: badge || "/notification-badge.png",
      avatarUrl: resolvedAvatar || null,
    }

    let successCount = 0
    const deadSubIds: string[] = []
    const deliveryReports: Array<{
      subId: string
      host: string
      status: "delivered" | "failed" | "pruned"
      statusCode?: number
      error?: string
    }> = []

    for (const sub of subscriptions) {
      let endpointHost = "unknown"
      try {
        endpointHost = new URL(sub.endpoint).host
      } catch {
        endpointHost = "invalid-url"
      }

      try {
        console.log(
          `[send-push] Sending to sub ${sub.id}, endpoint host: ${endpointHost}`,
        )
        // Ensure client keys from subscription are clean Base64URL without accidental whitespace or quotes
        const cleanP256dh = sanitizeVapidKey(sub.p256dh)
        const cleanAuth = sanitizeVapidKey(sub.auth)

        // Pre-validate client subscription keys before invoking sendPushNotification
        const p256Validation = decodeBase64UrlBytes(
          cleanP256dh,
          "p256dh",
          sub.p256dh?.length ?? 0,
        )
        const authValidation = decodeBase64UrlBytes(
          cleanAuth,
          "auth",
          sub.auth?.length ?? 0,
        )

        if (!p256Validation.valid || !authValidation.valid) {
          const keyErr =
            p256Validation.error ||
            authValidation.error ||
            "Invalid client key base64"
          deadSubIds.push(sub.id)
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: "pruned",
            statusCode: 400,
            error: `Chaves do cliente corrompidas no banco (${keyErr}). Assinatura limpa.`,
          })
          continue
        }

        const subData = {
          endpoint: sub.endpoint.trim(),
          keys: {
            p256dh: cleanP256dh,
            auth: cleanAuth,
          },
        }

        const delivered = await sendPushNotification(subData, payload, vapid, {
          ttl: 86400, // 24 hours retention on FCM push service
          urgency: "high",
          vapidExpiration: 43200, // 12 hours JWT lifetime
        })

        if (!delivered) {
          // Status 404 or 410: device uninstalled or revoked subscription
          deadSubIds.push(sub.id)
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: "pruned",
            statusCode: 410,
            error:
              "Assinatura expirada ou revogada pelo serviço push do Google (410 Gone)",
          })
        } else {
          successCount++
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: "delivered",
            statusCode: 201, // RFC 8030 standard push service acceptance
          })
        }
      } catch (sendErr: any) {
        const statusCode =
          sendErr?.statusCode ||
          sendErr?.status ||
          (sendErr instanceof WebPushError ? sendErr.statusCode : undefined)
        const rawBody = sendErr?.body || ""
        const errMsg = sendErr?.message || String(sendErr)
        console.error(`[send-push] Send error for sub ${sub.id}:`, {
          name: sendErr?.name,
          message: errMsg,
          statusCode,
          body: rawBody,
          stack: sendErr?.stack,
        })

        if (statusCode === 404 || statusCode === 410) {
          deadSubIds.push(sub.id)
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: "pruned",
            statusCode,
            error:
              "Endpoint desativado pelo serviço push do navegador (404/410). Assinatura removida.",
          })
        } else if (statusCode === 401 || statusCode === 403) {
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: "failed",
            statusCode,
            error: `Rejeição de credencial VAPID pelo FCM Google (${statusCode}): chave pública/privada não coincide com a assinatura registrada.`,
          })
        } else {
          deliveryReports.push({
            subId: sub.id,
            host: endpointHost,
            status: "failed",
            statusCode,
            error:
              rawBody ||
              errMsg ||
              "Falha de comunicação com o servidor de push da Google (FCM).",
          })
        }
      }
    }

    // Clean up expired or revoked subscriptions automatically
    if (deadSubIds.length > 0) {
      await adminDb.from("push_subscriptions").delete().in("id", deadSubIds)
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
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error:
          error?.message ||
          "Erro interno no servidor Supabase ao processar o push Web.",
        code: "EDGE_FUNCTION_EXCEPTION",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    )
  }
})
