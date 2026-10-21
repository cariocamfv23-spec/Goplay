import { supabase } from '@/lib/supabase/client'

// VAPID Public Key configurada para Web Push no GoPlay
export const DEFAULT_VAPID_PUBLIC_KEY =
  'BJ8-dVxhiweb7IGbIVr0AuZb1CxEqkIjFVHyGI7hTNZ0q5480qWg6efiYYQV9YIYpjyW_CAPXvjMcOjmZnMsA1M'

/**
 * Converts a base64 or base64url string to a Uint8Array for applicationServerKey
 * Safely handles unpadded or padded Base64URL and standard Base64
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const cleanKey = base64String.trim()
  const padding = '='.repeat((4 - (cleanKey.length % 4)) % 4)
  const base64 = (cleanKey + padding).replace(/-/g, '+').replace(/_/g, '/')

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
  permission: NotificationPermission | 'unsupported'
  isSubscribed: boolean
  iosWithoutPwa: boolean
  registration: ServiceWorkerRegistration | null
}

/**
 * Detects if the current environment is running on iOS (Safari/WebKit)
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent || ''
  return (
    (/iPad|iPhone|iPod/.test(ua) ||
      (window.navigator.platform === 'MacIntel' &&
        window.navigator.maxTouchPoints > 1)) &&
    !(window as any).MSStream
  )
}

/**
 * Detects if the PWA is installed and running in standalone display mode
 */
export function isStandalonePWA(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  )
}

/**
 * Registers the Service Worker explicitly if supported
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null
  }

  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
    // Wait until it's ready/active
    await navigator.serviceWorker.ready
    return reg
  } catch (err) {
    console.error('[WebPush] Falha ao registrar Service Worker:', err)
    return null
  }
}

export const pushNotificationService = {
  /**
   * Evaluates the push capability and current status of the client device
   */
  async checkStatus(): Promise<PushStatus> {
    if (typeof window === 'undefined') {
      return {
        supported: false,
        isStandalone: false,
        permission: 'unsupported',
        isSubscribed: false,
        iosWithoutPwa: false,
        registration: null,
      }
    }

    const hasSW = 'serviceWorker' in navigator
    const hasPushManager = 'PushManager' in window
    const hasNotification = 'Notification' in window
    const standalone = isStandalonePWA()
    const ios = isIOS()

    // iOS 16.4+ requires the PWA to be installed on Home Screen (standalone) for PushManager to exist
    const iosWithoutPwa = ios && !standalone

    const supported = Boolean(hasSW && hasPushManager && hasNotification)
    const permission: NotificationPermission | 'unsupported' = hasNotification
      ? Notification.permission
      : 'unsupported'

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
  ): Promise<{ success: boolean; error?: string; permissionDenied?: boolean }> {
    if (!userId) {
      return { success: false, error: 'Usuário não autenticado.' }
    }

    const status = await this.checkStatus()
    if (!status.supported) {
      if (status.iosWithoutPwa) {
        return {
          success: false,
          error:
            'No iOS, é necessário adicionar o GoPlay à Tela de Início (PWA) para habilitar notificações.',
        }
      }
      return {
        success: false,
        error: 'Notificações push não são suportadas neste navegador.',
      }
    }

    // 1. Request user permission
    let currentPerm = Notification.permission
    if (currentPerm === 'default') {
      currentPerm = await Notification.requestPermission()
    }

    if (currentPerm !== 'granted') {
      return {
        success: false,
        permissionDenied: true,
        error:
          'Permissão de notificações recusada no navegador ou dispositivo.',
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
          error: 'Não foi possível inicializar o Service Worker.',
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
          error: 'Chaves da assinatura inválidas pelo navegador.',
        }
      }

      // 4. Upsert into Supabase push_subscriptions table
      const userAgent = navigator.userAgent || 'PWA Client'
      const { error: dbError } = await (supabase as any)
        .from('push_subscriptions')
        .upsert(
          {
            user_id: userId,
            endpoint: subJson.endpoint,
            p256dh: subJson.keys.p256dh,
            auth: subJson.keys.auth,
            user_agent: userAgent,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'endpoint' },
        )

      if (dbError) {
        console.error('[WebPush] Falha ao salvar assinatura no banco:', dbError)
        return {
          success: false,
          error: 'Falha ao registrar assinatura no servidor.',
        }
      }

      return { success: true }
    } catch (err: any) {
      console.error('[WebPush] Erro durante subscrição:', err)
      return {
        success: false,
        error: err?.message || 'Falha ao ativar notificações push.',
      }
    }
  },

  /**
   * Unsubscribes from push notifications and removes the record from database
   */
  async unsubscribeUser(
    userId: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.getSubscription()
        if (sub) {
          const endpoint = sub.endpoint
          await sub.unsubscribe()

          if (userId && endpoint) {
            await (supabase as any)
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', endpoint)
              .eq('user_id', userId)
          }
        }
      }

      return { success: true }
    } catch (err: any) {
      console.error('[WebPush] Erro ao desinscrever:', err)
      return {
        success: false,
        error: err?.message || 'Falha ao desativar notificações.',
      }
    }
  },

  /**
   * Cleans up local push subscriptions on user logout to prevent shared-device mixups
   */
  async handleLogout(userId?: string): Promise<void> {
    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.getSubscription()
        if (sub) {
          const endpoint = sub.endpoint
          // Invalidate browser subscription so next user on device doesn't inherit it
          await sub.unsubscribe().catch(() => {})

          if (userId && endpoint) {
            await (supabase as any)
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', endpoint)
              .eq('user_id', userId)
          }
        }
      }
    } catch {
      // Non-blocking logout handler
    }
  },

  /**
   * Invokes the backend Edge Function send-push with authenticated session token
   */
  async triggerServerPush(params: {
    userId: string
    title: string
    body: string
    url?: string
    tag?: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.functions.invoke('send-push', {
        body: params,
      })

      if (error) {
        // Edge function error (non-fatal for caller flow)
        console.warn('[WebPush] Retorno da Edge Function:', error.message)
        return { success: false, error: error.message }
      }

      return { success: Boolean(data?.success) }
    } catch (err: any) {
      console.warn('[WebPush] Falha não bloqueante ao disparar push:', err)
      return { success: false, error: err?.message }
    }
  },
}
