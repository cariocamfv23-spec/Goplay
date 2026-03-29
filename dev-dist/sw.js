const CACHE_NAME = 'goplay-pwa-cache-v4'

// Ativos essenciais para realizar cache de imediato
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json?v=1',
  '/og-image.png',
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)),
  )
})

self.addEventListener('activate', (event) => {
  // Limpar caches antigos
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
  // Processar apenas requisições HTTP/HTTPS via GET
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Stale-While-Revalidate: Retornar o cache imediatamente e atualizar no background
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
              // Silenciosamente ignora a falha estando offline
            })
        }
        return cachedResponse
      }

      // Se não estiver em cache, buscar via internet
      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            (networkResponse.status !== 200 &&
              networkResponse.type !== 'opaque')
          ) {
            return networkResponse
          }

          // Clonar e guardar o novo recurso acessado
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return networkResponse
        })
        .catch((error) => {
          console.log('Fetch failed, returning offline fallback', error)
          // Em requisições de navegação offline, retornar o index.html
          if (
            event.request.mode === 'navigate' ||
            event.request.headers.get('accept').includes('text/html')
          ) {
            return caches.match('/index.html')
          }
          throw error
        })
    }),
  )
})
