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

const defaultLogo =
  'https://res.cloudinary.com/subframe/image/upload/v1741178657/11628/11312/uploads/533f81e7-380d-400d-953e-028f8f0418c3.png'
const defaultIcon =
  'https://res.cloudinary.com/subframe/image/upload/v1741178657/11628/11312/uploads/049e9c80-bc90-4828-9842-8854ef205d52.png'

const oldDefault = 'https://img.usecurling.com/i?q=play&shape=fill&color=violet'

const BrandingContext = createContext<BrandingState | undefined>(undefined)

export const BrandingProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState(() => {
    const stored = localStorage.getItem('goplay_logo')
    // Migrate from old default to new brand
    if (stored === oldDefault) return defaultLogo
    return stored || defaultLogo
  })

  const [iconUrl, setIconUrl] = useState(() => {
    const stored = localStorage.getItem('goplay_icon')
    // Migrate from old default to new brand
    if (stored === oldDefault) return defaultIcon
    return stored || defaultIcon
  })

  useEffect(() => {
    localStorage.setItem('goplay_logo', logoUrl)
  }, [logoUrl])

  useEffect(() => {
    localStorage.setItem('goplay_icon', iconUrl)

    // Update favicon
    const updateFavicon = (url: string) => {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = url
    }

    updateFavicon(iconUrl)
  }, [iconUrl])

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
