import { getGoplayIconFullSvg } from './icon-svg'
import { SeasonalTheme } from './seasonal-utils'

export function updateDynamicPWA(theme: SeasonalTheme | null) {
  if (typeof document === 'undefined') return

  const svgString = getGoplayIconFullSvg(theme)
  // Base64 encode the SVG string safely for data URI
  const encodedData = btoa(unescape(encodeURIComponent(svgString)))
  const svgDataUrl = `data:image/svg+xml;base64,${encodedData}`

  // Cache busting query string to force browser update
  const v = Date.now()

  // Update Favicon
  let iconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement
  if (!iconLink) {
    iconLink = document.createElement('link')
    iconLink.rel = 'icon'
    document.head.appendChild(iconLink)
  }
  iconLink.href = `${svgDataUrl}?v=${v}`
  iconLink.type = 'image/svg+xml'

  // Update Apple Touch Icon
  let appleLink = document.querySelector(
    "link[rel='apple-touch-icon']",
  ) as HTMLLinkElement
  if (!appleLink) {
    appleLink = document.createElement('link')
    appleLink.rel = 'apple-touch-icon'
    document.head.appendChild(appleLink)
  }
  appleLink.href = `${svgDataUrl}?v=${v}`

  // Update Manifest
  const manifest = {
    short_name: 'GoPlay',
    name: 'GoPlay',
    description:
      'Sua plataforma imersiva de atividades esportivas e gamificação.',
    icons: [
      {
        src: svgDataUrl,
        type: 'image/svg+xml',
        sizes: '512x512',
        purpose: 'any maskable',
      },
    ],
    start_url: '/',
    scope: '/',
    background_color: '#ffffff',
    theme_color: '#7c3aed',
    display: 'standalone',
    orientation: 'portrait',
  }

  const manifestBlob = new Blob([JSON.stringify(manifest)], {
    type: 'application/json',
  })
  const manifestUrl = URL.createObjectURL(manifestBlob)

  let manifestLink = document.querySelector(
    "link[rel='manifest']",
  ) as HTMLLinkElement
  if (!manifestLink) {
    manifestLink = document.createElement('link')
    manifestLink.rel = 'manifest'
    document.head.appendChild(manifestLink)
  }
  manifestLink.href = `${manifestUrl}?v=${v}`
}
