import * as React from 'react'
import { cn } from '@/lib/utils'
import { getSeasonalTheme } from '@/lib/seasonal-utils'
import { getGoplayIconInnerSvg } from '@/lib/icon-svg'

interface GoplayIconProps extends React.ComponentProps<'svg'> {
  className?: string
  enableSeasonal?: boolean
}

export const GoplayIcon = ({
  className,
  enableSeasonal = false,
  ...props
}: GoplayIconProps) => {
  const theme = enableSeasonal ? getSeasonalTheme() : null

  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full drop-shadow-xl', className)}
      preserveAspectRatio="xMidYMid meet"
      dangerouslySetInnerHTML={{ __html: getGoplayIconInnerSvg(theme) }}
      {...props}
    />
  )
}
