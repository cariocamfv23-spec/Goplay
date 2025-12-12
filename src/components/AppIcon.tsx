import { cn } from '@/lib/utils'
import useBrandingStore, { defaultIcon } from '@/stores/useBrandingStore'
import { useEffect, useState } from 'react'

interface AppIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export const AppIcon = ({
  className,
  alt = 'Goplay Icon',
  ...props
}: AppIconProps) => {
  const { iconUrl } = useBrandingStore()
  const [src, setSrc] = useState(iconUrl)

  // Sync with store changes
  useEffect(() => {
    setSrc(iconUrl)
  }, [iconUrl])

  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-contain', className)}
      onError={() => {
        // Fallback to defaultIcon if current src fails
        if (src !== defaultIcon) {
          setSrc(defaultIcon)
        }
      }}
      {...props}
    />
  )
}
