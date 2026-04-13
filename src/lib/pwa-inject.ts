import goplayIcon from '@/assets/goplay-icon-0e955.png'

const injectPwa = () => {
  const selectorsToRemove = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'meta[property="og:image"]',
    'link[rel="manifest"]',
  ]

  selectorsToRemove.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove())
  })

  const addLink = (
    rel: string,
    href: string,
    type?: string,
    sizes?: string,
  ) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (type) link.type = type
    if (sizes) link.sizes = sizes
    document.head.appendChild(link)
  }

  const addMeta = (property: string, content: string) => {
    const meta = document.createElement('meta')
    meta.setAttribute('property', property)
    meta.content = content
    document.head.appendChild(meta)
  }

  addLink('icon', goplayIcon, 'image/png', '192x192')
  addLink('shortcut icon', goplayIcon, 'image/png')
  addLink('apple-touch-icon', goplayIcon)
  addMeta('og:image', goplayIcon)

  const manifest = {
    name: 'GoPlay App',
    short_name: 'GoPlay',
    description:
      'Sua plataforma imersiva de atividades e notificações motivacionais.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#7c3aed',
    icons: [
      {
        src: goplayIcon,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: goplayIcon,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }

  const manifestUrl = URL.createObjectURL(
    new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' }),
  )

  addLink('manifest', manifestUrl)
}

if (typeof document !== 'undefined') {
  injectPwa()
}
