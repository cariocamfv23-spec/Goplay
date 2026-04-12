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

  // Update Favicon only, preserve static PWA manifest and apple-touch-icon for official install branding
  let iconLink = document.querySelector(
    "link[rel='icon'][type='image/svg+xml']",
  ) as HTMLLinkElement
  if (!iconLink) {
    iconLink = document.createElement('link')
    iconLink.rel = 'icon'
    iconLink.type = 'image/svg+xml'
    document.head.appendChild(iconLink)
  }
  iconLink.href = `${svgDataUrl}?v=${v}`
}
