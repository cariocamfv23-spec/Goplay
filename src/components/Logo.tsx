import { cn } from '@/lib/utils'
import useBrandingStore, { defaultLogo } from '@/stores/useBrandingStore'
import { useEffect, useState } from 'react'

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export const Logo = ({
  className,
  alt = 'Goplay App Logo',
  ...props
}: LogoProps) => {
  const { logoUrl } = useBrandingStore()
  const [src, setSrc] = useState(logoUrl)

  // Sync with store changes
  useEffect(() => {
    setSrc(logoUrl)
  }, [logoUrl])

  const handleError = () => {
    if (src !== defaultLogo) {
      setSrc(defaultLogo)
    }
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-contain', className)}
      onError={handleError}
      {...props}
    />
  )
}
