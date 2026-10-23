import { supabase } from "@/lib/supabase/client"

// VAPID Public Key configurada para Web Push no GoPlay App
export const DEFAULT_VAPID_PUBLIC_KEY =
  "BJ8-dVxhiweb7IGbIVr0AuZb1CxEqkIjFVHyGI7hTNZ0q5480qWg6efiYYQV9YIYpjyW_CAPXvjMcOjmZnMsA1M"

/**
 * Converts a base64 or base64url string to a Uint8Array for applicationServerKey
 * Safely handles unpadded or padded Base64URL and standard Base64
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const cleanKey = base64String.trim()
  const padding = "=".repeat((4 - (cleanKey.length % 4)) % 4)
  const base64 = (cleanKey + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export interface PushStatus {
  supported: boolean
  isStandalone: boolean
  permission: NotificationPermission | "unsupported"
  isSubscribed: boolean
  iosWithoutPwa: boolean
  registration: ServiceWorkerRegistration | null
  subscriptionEndpoint?: string | null
}

export interface PushTestResult {
  success: boolean
  sentCount: number
  totalDevices: number
  prunedCount?: number
  message?: string
  error?: string
  reports?: Array<{
    subId: string
    host: string
    status: "delivered" | "failed" | "pruned"
    statusCode?: number
    error?: string
  }>
}

/**
 * Detects if the current environment is running on iOS (Safari/WebKit)
 */
export function isIOS(): boolean {
  if (typeof window === "undefined") return false
  const ua = window.navigator.userAgent || ""
  return (
    (/iPad|iPhone|iPod/.test(ua) ||
      (window.navigator.platform === "MacIntel" &&
        window.navigator.maxTouchPoints > 1)) &&
    !(window as any).MSStream
  )
}

/**
 * Detects if the PWA is installed and running in standalone display mode
 */
export function isStandalonePWA(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes("android-app://")
  )
}

/**
 * Registers and forces update check for the Service Worker explicitly
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null
  }

  try {
    // updateViaCache: 'none' guarantees the browser ALWAYS bypasses HTTP cache when re-fetching sw.js
    const reg = await navigator.serviceWorker.register("/sw.js?v=15", {
      scope: "/",
      updateViaCache: "none",
    })

    // If an updated worker is already waiting, tell it to take over immediately
    if (reg.waiting) {
      reg.waiting.postMessage({ type: "SKIP_WAITING" })
    }

    reg.addEventListener("updatefound", () => {
      const installingWorker = reg.installing
      if (installingWorker) {
        installingWorker.addEventListener("statechange", () => {
          if (
            installingWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // New version installed while old version was controlling: prompt takeover
            installingWorker.postMessage({ type: "SKIP_WAITING" })
          }
        })
      }
    })

    // Force immediate network update check for sw.js
    try {
      reg.update().catch(() => {})
    } catch {
      /* ignore */
    }

    await navigator.serviceWorker.ready
    return reg
  } catch (err) {
    console.error("[WebPush] Falha ao registrar Service Worker:", err)
    return null
  }
}

export const pushNotificationService = {
  /**
   * Evaluates the push capability and current status of the client device
   */
  async checkStatus(): Promise<PushStatus> {
    if (typeof window === "undefined") {
      return {
        supported: false,
        isStandalone: false,
        permission: "unsupported",
        isSubscribed: false,
        iosWithoutPwa: false,
        registration: null,
      }
    }

    const hasSW = "serviceWorker" in navigator
    const hasPushManager = "PushManager" in window
    const hasNotification = "Notification" in window
    const standalone = isStandalonePWA()
    const ios = isIOS()

    const iosWithoutPwa = ios && !standalone
    const supported = Boolean(hasSW && hasPushManager && hasNotification)
    const permission: NotificationPermission | "unsupported" = hasNotification
      ? Notification.permission
      : "unsupported"

    if (!supported) {
      return {
        supported: false,
        isStandalone: standalone,
        permission,
        isSubscribed: false,
        iosWithoutPwa,
        registration: null,
      }
    }

    try {
      const reg = await navigator.serviceWorker.ready
      const subscription = await reg.pushManager.getSubscription()
      return {
        supported: true,
        isStandalone: standalone,
        permission,
        isSubscribed: Boolean(subscription),
        iosWithoutPwa: false,
        registration: reg,
        subscriptionEndpoint: subscription ? subscription.endpoint : null,
      }
    } catch {
      return {
        supported: true,
        isStandalone: standalone,
        permission,
        isSubscribed: false,
        iosWithoutPwa: false,
        registration: null,
      }
    }
  },

  /**
   * Prompts user for permission and subscribes to push notifications
   */
  async subscribeUser(
    userId: string,
    publicKey: string = DEFAULT_VAPID_PUBLIC_KEY,
  ): Promise<{
    success: boolean
    error?: string
    permissionDenied?: boolean
  }> {
    if (!userId) {
      return { success: false, error: "Usuário não autenticado." }
    }

    const status = await this.checkStatus()
    if (!status.supported) {
      if (status.iosWithoutPwa) {
        return {
          success: false,
          error:
            "No iOS, é necessário adicionar o Goplay à Tela de Início (PWA) para habilitar notificações.",
        }
      }
      return {
        success: false,
        error: "Notificações push não são suportadas neste navegador.",
      }
    }

    // 1. Request user permission
    let currentPerm = Notification.permission
    if (currentPerm === "default") {
      currentPerm = await Notification.requestPermission()
    }

    if (currentPerm !== "granted") {
      return {
        success: false,
        permissionDenied: true,
        error:
          "Permissão de notificações recusada no navegador ou dispositivo.",
      }
    }

    try {
      // 2. Ensure Service Worker registration is active
      let reg = status.registration
      if (!reg) {
        reg = await registerServiceWorker()
      }
      if (!reg) {
        return {
          success: false,
          error: "Não foi possível inicializar o Service Worker.",
        }
      }

      // 3. Obtain PushSubscription
      let sub = await reg.pushManager.getSubscription()
      if (!sub) {
        const applicationServerKey = urlBase64ToUint8Array(publicKey)
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        })
      }

      const subJson = sub.toJSON()
      if (!subJson.endpoint || !subJson.keys?.p256dh || !subJson.keys?.auth) {
        return {
          success: false,
          error: "Chaves da assinatura inválidas pelo navegador.",
        }
      }

      // 4. Upsert into Supabase push_subscriptions table
      const userAgent = navigator.userAgent || "PWA Client"
      const { error: dbError } = await (supabase as any)
        .from("push_subscriptions")
        .upsert(
          {
            user_id: userId,
            endpoint: subJson.endpoint,
            p256dh: subJson.keys.p256dh,
            auth: subJson.keys.auth,
            user_agent: userAgent,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "endpoint" },
        )

      if (dbError) {
        console.error("[WebPush] Falha ao salvar assinatura no banco:", dbError)
        return {
          success: false,
          error: "Falha ao registrar assinatura no servidor.",
        }
      }

      return { success: true }
    } catch (err: any) {
      console.error("[WebPush] Erro durante subscrição:", err)
      return {
        success: false,
        error: err?.message || "Falha ao ativar notificações push.",
      }
    }
  },

  /**
   * Unsubscribes from push notifications and removes the record from database
   */
  async unsubscribeUser(userId: string): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.getSubscription()
        if (sub) {
          const endpoint = sub.endpoint
          await sub.unsubscribe()

          if (userId && endpoint) {
            await (supabase as any)
              .from("push_subscriptions")
              .delete()
              .eq("endpoint", endpoint)
              .eq("user_id", userId)
          }
        }
      }

      return { success: true }
    } catch (err: any) {
      console.error("[WebPush] Erro ao desinscrever:", err)
      return {
        success: false,
        error: err?.message || "Falha ao desativar notificações.",
      }
    }
  },

  /**
   * Cleans up local push subscriptions on user logout to prevent shared-device mixups
   */
  async handleLogout(userId?: string): Promise<void> {
    try {
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.getSubscription()
        if (sub) {
          const endpoint = sub.endpoint
          await sub.unsubscribe().catch(() => {})

          if (userId && endpoint) {
            await (supabase as any)
              .from("push_subscriptions")
              .delete()
              .eq("endpoint", endpoint)
              .eq("user_id", userId)
          }
        }
      }
    } catch {
      // Non-blocking logout handler
    }
  },

  /**
   * Invokes the backend Edge Function send-push with authenticated session token
   * Extracts detailed server response even when HTTP error status (4xx, 5xx) is returned.
   */
  async triggerServerPush(params: {
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
  }): Promise<{
    success: boolean
    error?: string
    data?: any
    statusCode?: number
  }> {
    try {
      // Ensure fresh access token before invoking
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token

      const invokeHeaders: Record<string, string> = {}
      if (accessToken) {
        invokeHeaders["Authorization"] = `Bearer ${accessToken}`
      }

      const { data, error } = await supabase.functions.invoke("send-push", {
        body: params,
        headers: invokeHeaders,
      })

      if (error) {
        let detailedError = error.message || "Erro ao invocar Edge Function"
        let statusCode: number | undefined
        let responsePayload: any = null

        // Handle FunctionsHttpError containing error.context Response object
        if ((error as any)?.context) {
          const contextObj = (error as any).context
          if (typeof contextObj.status === "number") {
            statusCode = contextObj.status
          }

          // Try parsing response body if available as cloneable or text/json
          try {
            if (typeof contextObj.json === "function") {
              responsePayload = await contextObj
                .clone()
                .json()
                .catch(async () => {
                  const text = await contextObj
                    .clone()
                    .text()
                    .catch(() => "")
                  return text ? { rawText: text } : null
                })
            } else if (typeof contextObj.text === "function") {
              const text = await contextObj.text().catch(() => "")
              try {
                responsePayload = JSON.parse(text)
              } catch {
                responsePayload = text ? { rawText: text } : null
              }
            }
          } catch {
            // Body extraction failed
          }
        }

        if (responsePayload?.error) {
          detailedError = responsePayload.error
          if (responsePayload.details) {
            detailedError += ` — Detalhes: ${responsePayload.details}`
          }
        } else if (responsePayload?.message) {
          detailedError = responsePayload.message
        } else if (responsePayload?.rawText) {
          detailedError = `${detailedError} [Resposta bruta: ${responsePayload.rawText.slice(0, 200)}]`
        }

        // Clarify specific standard HTTP edge error cases
        if (statusCode === 401) {
          detailedError =
            detailedError.includes("AUTH_INVALID_TOKEN") ||
            detailedError.includes("sessão")
              ? detailedError
              : "Sessão expirada ou não autorizada pelo servidor (HTTP 401). Faça logout e login novamente no app."
        } else if (statusCode === 403) {
          detailedError =
            "Permissão negada pelo servidor para disparar teste neste aparelho (HTTP 403)."
        } else if (statusCode === 503) {
          detailedError =
            "Chaves VAPID não configuradas no servidor Supabase (HTTP 503)."
        } else if (statusCode === 500 && !responsePayload?.error) {
          detailedError = `Erro interno da Edge Function send-push (HTTP 500): ${detailedError}`
        }

        console.warn(
          "[WebPush] Retorno com erro da Edge Function:",
          detailedError,
          { statusCode, responsePayload },
        )
        return {
          success: false,
          error: detailedError,
          data: responsePayload || data,
          statusCode,
        }
      }

      return { success: Boolean(data?.success), data, statusCode: 200 }
    } catch (err: any) {
      console.warn("[WebPush] Falha de conexão ao disparar push:", err)
      const message =
        err instanceof Error ? err.message : String(err || "Erro desconhecido")
      return {
        success: false,
        error: `Falha de rede/cliente ao invocar Edge Function: ${message}`,
      }
    }
  },

  /**
   * Independent Push Test:
   * Sends a REAL server-side push notification ONLY to the current authenticated user's device.
   * Ensures subscription exists in the DB first, then invokes send-push with isTest: true.
   */
  async sendSelfTestPush(
    userId: string,
    options?: {
      includeAvatar?: boolean
      avatarUrl?: string
    },
  ): Promise<PushTestResult> {
    if (!userId) {
      return {
        success: false,
        sentCount: 0,
        totalDevices: 0,
        error: "Usuário não autenticado.",
      }
    }

    try {
      // 1. Verify and ensure push subscription is active on client & DB
      const subRes = await this.subscribeUser(userId)
      if (!subRes.success && subRes.permissionDenied) {
        return {
          success: false,
          sentCount: 0,
          totalDevices: 0,
          error:
            "Permissão de notificação negada no navegador. Habilite nas configurações do aparelho.",
        }
      }

      // 2. Trigger real Edge Function test push
      const testTimestamp = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      const invokeRes = await this.triggerServerPush({
        userId,
        title: "Goplay App • Teste de Notificação",
        body: options?.includeAvatar
          ? `Disparado às ${testTimestamp} com formato estilo TikTok (sua foto de perfil em destaque)!`
          : `Disparado pelo servidor às ${testTimestamp}. Notificações Web Push funcionando perfeitamente no seu Android!`,
        url: "/settings/pwa",
        tag: `test-${Date.now()}`,
        image: options?.avatarUrl,
        actorId: options?.includeAvatar ? userId : undefined,
        isTest: true,
      })

      const resData = invokeRes.data || {}

      if (!invokeRes.success) {
        let errorMsg = invokeRes.error || resData?.error || resData?.message

        if (!errorMsg) {
          const statusSuffix = invokeRes.statusCode
            ? ` (HTTP ${invokeRes.statusCode})`
            : ""
          errorMsg = `Falha ao processar a notificação no servidor Supabase${statusSuffix}. Verifique se a Edge Function send-push está ativa.`
        }

        // If reports has specific errors, append the first one for direct visibility
        if (Array.isArray(resData?.reports) && resData.reports.length > 0) {
          const failedReport = resData.reports.find((r: any) => r.error)
          if (failedReport?.error && !errorMsg.includes(failedReport.error)) {
            errorMsg = `${errorMsg} [${failedReport.host}: ${failedReport.error}]`
          }
        }

        return {
          success: false,
          sentCount: resData.sentCount || 0,
          totalDevices: resData.totalDevices || 0,
          prunedCount: resData.prunedCount || 0,
          error: errorMsg,
          reports: resData.reports,
        }
      }

      return {
        success: Boolean(resData.success),
        sentCount: resData.sentCount || 0,
        totalDevices: resData.totalDevices || 0,
        prunedCount: resData.prunedCount || 0,
        message: resData.message,
        reports: resData.reports,
      }
    } catch (err: any) {
      return {
        success: false,
        sentCount: 0,
        totalDevices: 0,
        error:
          err instanceof Error
            ? err.message
            : "Erro inesperado ao executar teste de push.",
      }
    }
  },
}
