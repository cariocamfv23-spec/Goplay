const CACHE_NAME = 'goplay-pwa-cache-v1'

// Essential assets to cache immediately
const PRECACHE_ASSETS = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', (event) => {
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)),
  )
})

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        )
      })
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  // Only process HTTP and HTTPS GET requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Stale-While-Revalidate: Return cache immediately, but fetch in background to update cache
        // We avoid doing this for the main HTML to not conflict with router navigation unpredictably
        if (!event.request.url.includes('/index.html')) {
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse.clone())
                })
              }
            })
            .catch(() => {
              // Silently fail if offline during background sync
            })
        }
        return cachedResponse
      }

      // If not in cache, fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          // Check if valid response. Opaque responses (CORS) are also cached for images.
          if (
            !networkResponse ||
            (networkResponse.status !== 200 &&
              networkResponse.type !== 'opaque')
          ) {
            return networkResponse
          }

          // Clone and cache the new resource
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return networkResponse
        })
        .catch((error) => {
          console.log('Fetch failed, returning offline fallback', error)
          // For navigation requests, fallback to index.html to allow HashRouter to handle it
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html')
          }
          throw error
        })
    }),
  )
})
