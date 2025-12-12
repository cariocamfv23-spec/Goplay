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
  'https://img.usecurling.com/i?q=play&shape=fill&color=violet'
const defaultIcon =
  'https://img.usecurling.com/i?q=play&shape=fill&color=violet'

const BrandingContext = createContext<BrandingState | undefined>(undefined)

export const BrandingProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState(
    () => localStorage.getItem('goplay_logo') || defaultLogo,
  )
  const [iconUrl, setIconUrl] = useState(
    () => localStorage.getItem('goplay_icon') || defaultIcon,
  )

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
