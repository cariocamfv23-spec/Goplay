import { cn } from '@/lib/utils'
import useBrandingStore, { defaultLogo } from '@/stores/useBrandingStore'
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
  // Use logoUrl specifically for the Logo component
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
            // Updated text color to text-primary (Violet) to match the app icon and theme
            'font-bold tracking-tighter text-primary leading-none',
            textClassName,
          )}
        >
          Goplay
        </span>
      )}
    </div>
  )
}
