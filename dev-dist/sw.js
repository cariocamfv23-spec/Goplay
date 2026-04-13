importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
)

if (workbox) {
  // Automated update logic
  self.addEventListener('install', (event) => {
    self.skipWaiting()
  })

  self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim())
  })

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
