import { cn } from '@/lib/utils'

interface GoplayIconProps {
  className?: string
  enableSeasonal?: boolean
}

export function GoplayIcon({
  className,
  enableSeasonal = false,
}: GoplayIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full drop-shadow-sm', className)}
    >
      <defs>
        <linearGradient
          id="goplay-bg-icon"
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient
          id="goplay-gold-icon"
          x1="150"
          y1="150"
          x2="400"
          y2="400"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <filter id="shadow-icon" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor="#000000"
            floodOpacity="0.3"
          />
        </filter>
      </defs>

      {/* App Icon Shape with rounded corners */}
      <rect width="512" height="512" rx="112" fill="url(#goplay-bg-icon)" />

      {/* Motion / Double Play Button Effect */}
      <path
        d="M140 180 L320 256 L140 332 Z"
        fill="white"
        fillOpacity="0.2"
        filter="url(#shadow-icon)"
        className="animate-pulse"
        style={{ animationDuration: '3s' }}
      />

      {/* Main Play Symbol */}
      <path
        d="M180 140 L400 256 L180 372 Z"
        fill="url(#goplay-gold-icon)"
        filter="url(#shadow-icon)"
      />

      {/* Optional Seasonal Badge */}
      {enableSeasonal && (
        <circle
          cx="420"
          cy="92"
          r="32"
          fill="#EF4444"
          className="animate-bounce"
          style={{ animationDuration: '2s' }}
        />
      )}
    </svg>
  )
}
