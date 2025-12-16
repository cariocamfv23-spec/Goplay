import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

type BrandingState = {
  logoUrl: string
  iconUrl: string
  setLogoUrl: (url: string) => void
  setIconUrl: (url: string) => void
  resetBranding: () => void
}

// Set 'default' as the identifier for the internal SVG logo
export const defaultIcon = 'default'
export const defaultLogo = 'default'

const BrandingContext = createContext<BrandingState | undefined>(undefined)

export const BrandingProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState(() => {
    const stored = localStorage.getItem('goplay_logo')
    // Migrate old image URLs to the new SVG default
    if (
      stored &&
      (stored.includes('cloudinary') ||
        stored.includes('subframe') ||
        stored.includes('usecurling'))
    ) {
      return defaultLogo
    }
    return stored || defaultLogo
  })

  const [iconUrl, setIconUrl] = useState(() => {
    const stored = localStorage.getItem('goplay_icon')
    // Migrate old image URLs to the new SVG default
    if (
      stored &&
      (stored.includes('cloudinary') ||
        stored.includes('subframe') ||
        stored.includes('usecurling'))
    ) {
      return defaultIcon
    }
    return stored || defaultIcon
  })

  useEffect(() => {
    const preloadImage = (url: string) => {
      if (url === 'default') return
      const img = new Image()
      img.src = url
    }
    preloadImage(logoUrl)
    preloadImage(iconUrl)
  }, [logoUrl, iconUrl])

  useEffect(() => {
    localStorage.setItem('goplay_logo', logoUrl)
  }, [logoUrl])

  useEffect(() => {
    localStorage.setItem('goplay_icon', iconUrl)
    updateFavicon(iconUrl)
  }, [iconUrl])

  const updateFavicon = (url: string) => {
    // We don't update favicon for the SVG default yet as it requires a URL
    if (url === 'default') return

    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = url

    let appleLink = document.querySelector(
      "link[rel='apple-touch-icon']",
    ) as HTMLLinkElement
    if (!appleLink) {
      appleLink = document.createElement('link')
      appleLink.rel = 'apple-touch-icon'
      document.head.appendChild(appleLink)
    }
    appleLink.href = url
  }

  const resetBranding = () => {
    setLogoUrl(defaultLogo)
    setIconUrl(defaultIcon)
  }

  return (
    <BrandingContext.Provider
      value={{ logoUrl, iconUrl, setLogoUrl, setIconUrl, resetBranding }}
    >
      {children}
    </BrandingContext.Provider>
  )
}

const useBrandingStore = () => {
  const context = useContext(BrandingContext)
  if (!context) {
    throw new Error('useBrandingStore must be used within a BrandingProvider')
  }
  return context
}

export default useBrandingStore
