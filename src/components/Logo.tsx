import { cn } from '@/lib/utils'
import useBrandingStore, { defaultLogo } from '@/stores/useBrandingStore'

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export const Logo = ({
  className,
  alt = 'Goplay Logo',
  ...props
}: LogoProps) => {
  const { logoUrl } = useBrandingStore()

  return (
    <img
      src={logoUrl}
      alt={alt}
      className={cn('object-contain', className)}
      onError={(e) => {
        const target = e.currentTarget
        if (target.src !== defaultLogo) {
          target.src = defaultLogo
        }
      }}
      {...props}
    />
  )
}
