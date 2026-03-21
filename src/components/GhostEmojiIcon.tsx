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
        d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="9"
        cy="10"
        rx="1.5"
        ry="2"
        fill={active ? 'hsl(var(--background))' : 'currentColor'}
        stroke="none"
      />
      <ellipse
        cx="15"
        cy="10"
        rx="1.5"
        ry="2"
        fill={active ? 'hsl(var(--background))' : 'currentColor'}
        stroke="none"
      />
      <ellipse
        cx="12"
        cy="14"
        rx="2"
        ry="2.5"
        fill={active ? 'hsl(var(--background))' : 'currentColor'}
        stroke="none"
      />
    </svg>
  )
}
