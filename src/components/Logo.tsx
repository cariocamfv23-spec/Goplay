import { cn } from '@/lib/utils'
import useBrandingStore, { defaultIcon } from '@/stores/useBrandingStore'
import { useEffect, useState } from 'react'

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'full' | 'icon' | 'text'
  iconClassName?: string
  textClassName?: string
}

export const Logo = ({
  className,
  variant = 'full',
  iconClassName,
  textClassName,
  ...props
}: LogoProps) => {
  const { iconUrl } = useBrandingStore()
  const [src, setSrc] = useState(iconUrl)

  // Sync with store changes
  useEffect(() => {
    setSrc(iconUrl)
  }, [iconUrl])

  const handleError = () => {
    if (src !== defaultIcon) {
      setSrc(defaultIcon)
    }
  }

  const showIcon = variant === 'full' || variant === 'icon'
  const showText = variant === 'full' || variant === 'text'

  return (
    <div
      className={cn(
        'flex items-center gap-2 select-none pointer-events-none',
        className,
      )}
      {...props}
    >
      {showIcon && (
        <img
          src={src}
          alt="Goplay App Logo"
          className={cn('object-contain h-full w-auto', iconClassName)}
          onError={handleError}
        />
      )}
      {showText && (
        <span
          className={cn(
            'font-bold tracking-tighter text-foreground leading-none',
            textClassName,
          )}
        >
          Goplay
        </span>
      )}
    </div>
  )
}
