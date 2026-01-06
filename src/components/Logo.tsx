import * as React from 'react'
import { cn } from '@/lib/utils'
import useBrandingStore, { defaultLogo } from '@/stores/useBrandingStore'
import { useEffect, useState } from 'react'
import { GoplayIcon } from '@/components/GoplayIcon'

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'full' | 'icon' | 'text'
  iconClassName?: string
  textClassName?: string
  enableSeasonal?: boolean
}

export const Logo = ({
  className,
  variant = 'full',
  iconClassName,
  textClassName,
  enableSeasonal = false,
  ...props
}: LogoProps) => {
  const { logoUrl } = useBrandingStore()
  const [src, setSrc] = useState(logoUrl)

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
  const isDefault = src === defaultLogo

  return (
    <div
      className={cn(
        'flex items-center gap-2 select-none pointer-events-none',
        className,
      )}
      {...props}
    >
      {showIcon && (
        <>
          {isDefault ? (
            <div
              className={cn(
                'h-10 w-10 aspect-square filter drop-shadow-sm',
                iconClassName,
              )}
            >
              <GoplayIcon
                className="w-full h-full"
                enableSeasonal={enableSeasonal}
              />
            </div>
          ) : (
            <img
              src={src}
              alt="Goplay App Logo"
              className={cn('object-contain h-full w-auto', iconClassName)}
              onError={handleError}
            />
          )}
        </>
      )}
      {showText && (
        <span
          className={cn(
            'font-bold tracking-tighter leading-none text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold drop-shadow-sm',
            textClassName,
          )}
        >
          Goplay
        </span>
      )}
    </div>
  )
}
