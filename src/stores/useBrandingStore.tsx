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

// Official Goplay App Assets
// Using 'play' icon in violet (Roxo Serenity) to match brand identity consistently
export const defaultIcon =
  'https://img.usecurling.com/i?q=play&color=violet&shape=fill'
// The logo URL acts as the brand mark source for the logo component
export const defaultLogo =
  'https://img.usecurling.com/i?q=play&color=violet&shape=fill'

const BrandingContext = createContext<BrandingState | undefined>(undefined)

export const BrandingProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState(() => {
    const stored = localStorage.getItem('goplay_logo')
    // Auto-revert if stored logo is from potentially problematic sources or broken
    if (
      stored &&
      (stored.includes('cloudinary') || stored.includes('subframe'))
    ) {
      return defaultLogo
    }
    return stored || defaultLogo
  })

  const [iconUrl, setIconUrl] = useState(() => {
    const stored = localStorage.getItem('goplay_icon')
    if (
      stored &&
      (stored.includes('cloudinary') || stored.includes('subframe'))
    ) {
      return defaultIcon
    }
    return stored || defaultIcon
  })

  // Preload images to prevent visual artifacts
  useEffect(() => {
    const preloadImage = (url: string) => {
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
