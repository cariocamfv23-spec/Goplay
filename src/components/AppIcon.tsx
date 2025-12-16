import { cn } from '@/lib/utils'
import useBrandingStore, { defaultIcon } from '@/stores/useBrandingStore'
import { useEffect, useState } from 'react'
import { GoplayIcon } from '@/components/GoplayIcon'

interface AppIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export const AppIcon = ({
  className,
  alt = 'Goplay App Icon',
  ...props
}: AppIconProps) => {
  const { iconUrl } = useBrandingStore()
  const [src, setSrc] = useState(iconUrl)

  useEffect(() => {
    setSrc(iconUrl)
  }, [iconUrl])

  if (src === defaultIcon) {
    return (
      <div
        className={cn('relative flex items-center justify-center', className)}
      >
        <GoplayIcon className="w-full h-full" aria-label={alt} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-contain', className)}
      onError={() => {
        if (src !== defaultIcon) {
          setSrc(defaultIcon)
        }
      }}
      {...props}
    />
  )
}
