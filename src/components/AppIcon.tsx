import { cn } from '@/lib/utils'
import useBrandingStore, { defaultIcon } from '@/stores/useBrandingStore'

interface AppIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export const AppIcon = ({
  className,
  alt = 'Goplay Icon',
  ...props
}: AppIconProps) => {
  const { iconUrl } = useBrandingStore()

  return (
    <img
      src={iconUrl}
      alt={alt}
      className={cn('object-contain', className)}
      onError={(e) => {
        const target = e.currentTarget
        if (target.src !== defaultIcon) {
          target.src = defaultIcon
        }
      }}
      {...props}
    />
  )
}
