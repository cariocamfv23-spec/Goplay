// Goplay App - Service Worker with Robust Web Push & Background Support
// Version: 2026.10.23-v16 (TikTok style push notifications: circular avatar in icon, official logo at left, no expanded big image, v2 versioned icons)

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js",
)

// High-compatibility official raster icons for Android & OneUI (origin-relative URL)
const DEFAULT_NOTIFICATION_ICON = "/icon-192-v2.png"
const NOTIFICATION_BADGE_ICON = "/notification-badge-v2.png"
const SW_VERSION = "2026.10.23-v16"

// Automated update & lifecycle logic - immediate takeover
self.addEventListener("install", (event) => {
  // Immediately activate new service worker logic without waiting for reload
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Prune old caches on version bump to v16 (cleans legacy v1-v15 caches)
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((k) => k.startsWith("goplay-") && !k.endsWith("-v16"))
              .map((k) => caches.delete(k)),
          ),
        ),
    ]),
  )
})

// Listen for explicit update/skip-waiting messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

// ==========================================
// PUSH EVENT HANDLER (Web Push / Background)
// ==========================================
self.addEventListener("push", (event) => {
  let data = {
    title: "Goplay App",
    body: "Você tem uma nova notificação no Goplay!",
    url: "/",
    tag: "goplay-alert",
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

  // TikTok-style push notification layout for Android / Samsung OneUI:
  // 1. Official Goplay logo is kept at the left by the OS/PWA application identity.
  // 2. The `icon` property is rendered by Android/One UI on the RIGHT, aligned with the notification text.
  //    We set `icon` to the real profile photo of the user/actor who generated the event (like, comment, follower, message).
  //    If no actor photo is present, fallback to the official Goplay raster logo (/icon-192-v2.png).
  // 3. The `image` property is STRICTLY OMITTED to prevent the giant expanded photo banner below the text.
  // 4. The `badge` property uses the official monochrome badge icon (/notification-badge-v2.png).

  // Resolve actor avatar or fallback icon:
  // Accept photo URL from `data.icon`, `data.avatarUrl`, or `data.image` (for payload backward compatibility)
  const candidateAvatar = data.avatarUrl || data.icon || data.image || null
  let resolvedIconUrl = null

  if (candidateAvatar && typeof candidateAvatar === "string") {
    const trimmed = candidateAvatar.trim()
    if (trimmed && !trimmed.endsWith(".svg")) {
      try {
        const parsed = new URL(trimmed, self.location.origin)
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
          resolvedIconUrl = parsed.href
        }
      } catch {
        resolvedIconUrl = null
      }
    }
  }

  // Fallback to official Goplay raster logo if no valid profile avatar is present
  if (!resolvedIconUrl) {
    resolvedIconUrl = new URL(DEFAULT_NOTIFICATION_ICON, self.location.origin)
      .href
  }

  // Resolve official monochrome badge for the status bar
  let resolvedBadgeUrl = null
  try {
    const candidateBadge = data.badge || NOTIFICATION_BADGE_ICON
    resolvedBadgeUrl = new URL(candidateBadge, self.location.origin).href
  } catch {
    resolvedBadgeUrl = new URL(NOTIFICATION_BADGE_ICON, self.location.origin)
      .href
  }

  // Complete NotificationOptions compliant with Android Notification Drawer & Heads-up banners.
  // Note: NO `image` property is included, matching the TikTok compact layout.
  const notificationOptions = {
    body: data.body || "",
    icon: resolvedIconUrl,
    badge: resolvedBadgeUrl,
    tag: data.tag || `goplay-${Date.now()}`,
    data: {
      url: data.url || "/",
      dateOfArrival: Date.now(),
      swVersion: SW_VERSION,
      hasActorPhoto:
        resolvedIconUrl !==
        new URL(DEFAULT_NOTIFICATION_ICON, self.location.origin).href,
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
        console.warn(
          "[SW] Push notification display failed, trying safe fallback:",
          showErr,
        )
        // Fallback without badge/vibration if device OS/browser rejects extended parameters
        const fallbackIcon = new URL(
          DEFAULT_NOTIFICATION_ICON,
          self.location.origin,
        ).href
        return self.registration.showNotification(data.title, {
          body: data.body || "",
          icon: fallbackIcon,
          data: { url: data.url || "/" },
        })
      }),
  )
})

// ==========================================
// NOTIFICATION CLICK HANDLER
// Focus existing window or open target URL
// ==========================================
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  const rawUrl = event.notification.data?.url || "/"
  const targetUrl = new URL(rawUrl, self.location.origin).href

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Look for an already open client on this origin
        for (const client of windowClients) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus()
          }
        }
        // If an open window exists, navigate and focus it
        if (windowClients.length > 0 && "focus" in windowClients[0]) {
          const client = windowClients[0]
          if ("navigate" in client) {
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
if (typeof workbox !== "undefined" && workbox) {
  // Resource caching for specific extensions
  workbox.routing.registerRoute(
    ({ url }) => /\.(js|css|html|svg|png|ico|woff2)$/i.test(url.pathname),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "goplay-assets-v16",
    }),
  )

  // Cache index.html specifically for fallback
  workbox.routing.registerRoute(
    ({ url }) => url.pathname === "/" || url.pathname === "/index.html",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "goplay-index-v16",
    }),
  )

  // Ensure application correctly handles navigation with fallback to /index.html
  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    async ({ request }) => {
      try {
        const response = await fetch(request)
        return response
      } catch (error) {
        const cache = await caches.open("goplay-index-v16")
        const cachedResponse =
          (await cache.match("/index.html")) || (await cache.match("/"))
        if (cachedResponse) {
          return cachedResponse
        }
        throw error
      }
    },
  )
}
