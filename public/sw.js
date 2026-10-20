importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
)

// Automated update & lifecycle logic
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})

// ==========================================
// PUSH EVENT HANDLER (Web Push / Background)
// ==========================================
self.addEventListener('push', (event) => {
  let data = {
    title: 'GoPlay App',
    body: 'Você tem uma nova notificação no GoPlay!',
    url: '/',
    tag: 'goplay-alert',
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
  }

  if (event.data) {
    try {
      const parsed = event.data.json()
      data = { ...data, ...parsed }
    } catch (_err) {
      const text = event.data.text()
      if (text) {
        data.body = text
      }
    }
  }

  const notificationOptions = {
    body: data.body,
    icon: data.icon || '/icon-192.svg',
    badge: data.badge || '/icon-192.svg',
    tag: data.tag || 'goplay-notification',
    data: {
      url: data.url || '/',
      dateOfArrival: Date.now(),
    },
    vibrate: [100, 50, 100],
    renotify: true,
  }

  event.waitUntil(
    self.registration.showNotification(data.title, notificationOptions),
  )
})

// ==========================================
// NOTIFICATION CLICK HANDLER
// Focus existing window or open target URL
// ==========================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const rawUrl = event.notification.data?.url || '/'
  // Ensure target URL is absolute relative to self.location.origin
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
      cacheName: 'goplay-assets',
    }),
  )

  // Cache index.html specifically for fallback
  workbox.routing.registerRoute(
    ({ url }) => url.pathname === '/' || url.pathname === '/index.html',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'goplay-index',
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
        const cache = await caches.open('goplay-index')
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
