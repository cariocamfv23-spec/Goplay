import { cn } from '@/lib/utils'
import * as React from 'react'

interface GhostEmojiIconProps extends React.SVGProps<SVGSVGElement> {
  active?: boolean
}

export function GhostEmojiIcon({
  className,
  active,
  ...props
}: GhostEmojiIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? '0' : '1.5'}
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        d="M12 2c-4.418 0-8 3.582-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10c0-4.418-3.582-8-8-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="10"
        r="1.5"
        fill={active ? 'hsl(var(--background))' : 'currentColor'}
        stroke="none"
      />
      <circle
        cx="15"
        cy="10"
        r="1.5"
        fill={active ? 'hsl(var(--background))' : 'currentColor'}
        stroke="none"
      />
      <path
        d="M10 14c.5 1 3.5 1 4 0"
        stroke={active ? 'hsl(var(--background))' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
