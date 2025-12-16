import * as React from 'react'
import { cn } from '@/lib/utils'

interface GoplayIconProps extends React.ComponentProps<'svg'> {
  className?: string
}

export const GoplayIcon = ({ className, ...props }: GoplayIconProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <defs>
        <linearGradient
          id="goplay-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--gold))" />
        </linearGradient>
      </defs>

      {/* Outer Dynamic Ring - Abstract 'G' Motion */}
      <path
        d="M 85 35 A 45 45 0 1 0 70 88"
        stroke="hsl(var(--primary))"
        strokeWidth="12"
        strokeLinecap="round"
        className="opacity-100"
        fill="none"
      />

      {/* Inner Play Triangle - The 'Goal' */}
      <path
        d="M 42 32 L 82 52 L 42 72 Z"
        fill="hsl(var(--gold))"
        className="drop-shadow-sm"
      />

      {/* Futuristic Accent / Speed Notch */}
      <circle
        cx="85"
        cy="35"
        r="6"
        fill="hsl(var(--primary))"
        className="animate-pulse duration-1000"
      />
    </svg>
  )
}
