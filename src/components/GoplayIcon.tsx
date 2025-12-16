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
          id="goplay-primary-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop
            offset="100%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.6"
          />
        </linearGradient>
        <linearGradient
          id="goplay-gold-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(var(--gold))" />
          <stop offset="100%" stopColor="#FFF" />
        </linearGradient>
        <filter id="goplay-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main G Arc - Modern & Dynamic */}
      <path
        d="M 88 30 A 42 42 0 1 0 88 70"
        stroke="url(#goplay-primary-gradient)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        className="opacity-100"
      />

      {/* Play Arrow - Geometric & Forward Motion */}
      <path
        d="M 52 38 L 85 50 L 52 62 L 56 50 Z"
        fill="url(#goplay-gold-gradient)"
        stroke="hsl(var(--background))"
        strokeWidth="2"
        strokeLinejoin="round"
        filter="url(#goplay-glow)"
        className="drop-shadow-sm"
      />

      {/* Futuristic Orbit/Satellite Dot */}
      <circle
        cx="88"
        cy="70"
        r="6"
        fill="hsl(var(--primary))"
        className="animate-pulse duration-1000"
      />
    </svg>
  )
}
