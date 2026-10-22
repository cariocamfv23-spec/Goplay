// PWA injection module:
// Preserves the authoritative static /manifest.json (with official icons and monochrome support).
// Sets up Apple touch icons and favicon fallback if not already provided in index.html.
const injectPwa = () => {
  if (typeof document === 'undefined') return

  // Only ensure apple-touch-icon and og:image if missing, never replace static link[rel="manifest"]
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const appleLink = document.createElement('link')
    appleLink.rel = 'apple-touch-icon'
    appleLink.href = '/icon-192.png'
    document.head.appendChild(appleLink)
  }

  if (!document.querySelector('meta[property="og:image"]')) {
    const ogMeta = document.createElement('meta')
    ogMeta.setAttribute('property', 'og:image')
    ogMeta.content = '/icon-512.png'
    document.head.appendChild(ogMeta)
  }

  // Ensure link[rel="manifest"] points directly to /manifest.json?v=8
  const manifestLink = document.querySelector(
    'link[rel="manifest"]',
  ) as HTMLLinkElement | null
  if (manifestLink) {
    manifestLink.href = '/manifest.json?v=8'
  }
}

if (typeof document !== 'undefined') {
  injectPwa()
}
