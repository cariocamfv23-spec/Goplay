import { cn } from '@/lib/utils'
import * as React from 'react'

export function Replay3DIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', className)}
      {...props}
    >
      <path d="M12.89 4.58a7 7 0 1 1-8.58 6.94" />
      <polyline points="2.5 5.5 4.5 10.5 9.5 8.5" />
      <path d="M12.5 8.5 L12.5 14.5 L17.5 17.5" />
      <path d="M21 12c0-4.97-4.03-9-9-9-1.38 0-2.68.31-3.84.86" />
      <path d="M12 14.5L12 21" />
      <path d="M12 21L7.5 18.5" />
      <path d="M12 21L16.5 18.5" />
      <path d="M16.5 18.5L16.5 13.5" />
      <path d="M7.5 18.5L7.5 13.5" />
      <path d="M3.23 15a8 8 0 0 1-.23-2" />
    </svg>
  )
}
