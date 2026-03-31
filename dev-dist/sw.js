const CACHE_NAME = 'goplay-cache-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Minimal fetch handler required by browsers to trigger the "Add to Home Screen" prompt
  // In a full implementation, you would implement proper caching strategies here
})
