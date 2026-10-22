// Goplay App - Service Worker with Robust Web Push & Background Support
// Version: 2026.10.22-v8 (monochrome icon support + dynamic WebAPK cache bust)

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
)

// High-compatibility official raster icons for Android & OneUI (avoids SVG blank notification issue)
const DEFAULT_NOTIFICATION_ICON = '/icon-192.png'
const SW_VERSION = '2026.10.22-v8'

// Automated update & lifecycle logic - immediate takeover
self.addEventListener('install', (event) => {
  // Immediately activate new service worker logic without waiting for reload
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Prune old caches on version bump
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((k) => k.startsWith('goplay-') && !k.endsWith('-v8'))
              .map((k) => caches.delete(k)),
          ),
        ),
    ]),
  )
})

// Listen for explicit update/skip-waiting messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// ==========================================
// PUSH EVENT HANDLER (Web Push / Background)
// ==========================================
self.addEventListener('push', (event) => {
  let data = {
    title: 'Goplay App',
    body: 'Você tem uma nova notificação no Goplay!',
    url: '/',
    tag: 'goplay-alert',
    icon: DEFAULT_NOTIFICATION_ICON,
  }

  if (event.data) {
    try {
      const parsed = event.data.json()
      data = { ...data, ...parsed }
    } catch (_err) {
      try {
        const text = event.data.text()
        if (text) {
          data.body = text
        }
      } catch {
        // Fallback to default
      }
    }
  }

  // Ensure icons are valid PNG raster URLs for Android system tray & lockscreen
  const iconUrl =
    data.icon && !data.icon.endsWith('.svg')
      ? data.icon
      : DEFAULT_NOTIFICATION_ICON

  // Complete NotificationOptions compliant with Android Notification Drawer & Heads-up banners.
  // Note: badge is deliberately omitted so Android/OneUI does not render a secondary monochrome badge/symbol.
  const notificationOptions = {
    body: data.body || '',
    icon: iconUrl,
    tag: data.tag || `goplay-${Date.now()}`,
    data: {
      url: data.url || '/',
      dateOfArrival: Date.now(),
      swVersion: SW_VERSION,
    },
    // Vibrant pattern: [vibrate, pause, vibrate] to wake up Android vibration motors
    vibrate: [200, 100, 200],
    renotify: true,
    requireInteraction: false,
    silent: false,
  }

  // event.waitUntil guarantees the Service Worker process stays alive until Android posts notification
  event.waitUntil(
    self.registration
      .showNotification(data.title, notificationOptions)
      .catch((showErr) => {
        // Fallback without vibration or extra options if device rejects specific parameters
        return self.registration.showNotification(data.title, {
          body: data.body,
          icon: DEFAULT_NOTIFICATION_ICON,
          data: { url: data.url || '/' },
        })
      }),
  )
})

// ==========================================
// NOTIFICATION CLICK HANDLER
// Focus existing window or open target URL
// ==========================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const rawUrl = event.notification.data?.url || '/'
  const targetUrl = new URL(rawUrl, self.location.origin).href

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Look for an already open client on this origin
        for (const client of windowClients) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus()
          }
        }
        // If an open window exists, navigate and focus it
        if (windowClients.length > 0 && 'focus' in windowClients[0]) {
          const client = windowClients[0]
          if ('navigate' in client) {
            client.navigate(targetUrl)
          }
          return client.focus()
        }
        // Otherwise open a new window
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl)
        }
      }),
  )
})

// ==========================================
// WORKBOX ASSET ROUTING & CACHING
// ==========================================
if (typeof workbox !== 'undefined' && workbox) {
  // Resource caching for specific extensions
  workbox.routing.registerRoute(
    ({ url }) => /\.(js|css|html|svg|png|ico|woff2)$/i.test(url.pathname),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'goplay-assets-v8',
    }),
  )

  // Cache index.html specifically for fallback
  workbox.routing.registerRoute(
    ({ url }) => url.pathname === '/' || url.pathname === '/index.html',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'goplay-index-v8',
    }),
  )

  // Ensure application correctly handles navigation
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    async ({ request }) => {
      try {
        const response = await fetch(request)
        return response
      } catch (error) {
        const cache = await caches.open('goplay-index-v8')
        const cachedResponse =
          (await cache.match('/index.html')) || (await cache.match('/'))
        if (cachedResponse) {
          return cachedResponse
        }
        throw error
      }
    },
  )
}
