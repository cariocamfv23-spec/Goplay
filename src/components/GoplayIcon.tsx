import * as React from 'react'
import { cn } from '@/lib/utils'
import { getSeasonalTheme } from '@/lib/seasonal-utils'

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
      {...props}
    >
      <defs>
        {/* Primary Purple Deep Gradient for 3D Volume */}
        <linearGradient
          id="goplay-purple-deep"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop
            offset="60%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.9"
          />
          <stop offset="100%" stopColor="#1a0b2e" /> {/* Deep shadow color */}
        </linearGradient>

        {/* Surface Shine Gradient for Glass/Plastic effect */}
        <linearGradient
          id="goplay-purple-shine"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="50%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Gold Metallic Gradient for Play Button */}
        <linearGradient
          id="goplay-gold-metallic"
          x1="20%"
          y1="20%"
          x2="80%"
          y2="80%"
        >
          <stop offset="0%" stopColor="#FFFACD" /> {/* LemonChiffon Light */}
          <stop offset="30%" stopColor="hsl(var(--gold))" />
          <stop offset="70%" stopColor="#B8860B" /> {/* Dark GoldenRod */}
          <stop offset="100%" stopColor="hsl(var(--gold))" />
        </linearGradient>

        {/* Inner Glow/Shadow for 3D realism */}
        <filter id="goplay-bevel" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset in="blur" dx="4" dy="6" result="offsetBlur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="5"
            specularConstant="0.75"
            specularExponent="20"
            lightingColor="#ffffff"
            result="specOut"
          >
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite
            in="specOut"
            in2="SourceAlpha"
            operator="in"
            result="specOut"
          />
          <feComposite
            in="SourceGraphic"
            in2="specOut"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="litPaint" />
          </feMerge>
        </filter>

        {/* Gold Glow Effect */}
        <filter
          id="goplay-gold-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Seasonal Filters */}
        <filter id="seasonal-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* The 'G' - Styled as a futuristic stadium/track ring */}
      {/* Main Body */}
      <path
        d="M 430 150
           C 400 100 330 64 256 64
           C 150 64 64 150 64 256
           C 64 362 150 448 256 448
           C 350 448 430 380 445 290"
        fill="none"
        stroke="url(#goplay-purple-deep)"
        strokeWidth="68"
        strokeLinecap="round"
        filter="url(#goplay-bevel)"
      />

      {/* Top Shine Highlight on the G */}
      <path
        d="M 430 150
           C 400 100 330 64 256 64
           C 150 64 64 150 64 256
           C 64 362 150 448 256 448
           C 350 448 430 380 445 290"
        fill="none"
        stroke="url(#goplay-purple-shine)"
        strokeWidth="12"
        strokeLinecap="round"
        className="opacity-60"
        style={{ mixBlendMode: 'overlay' }}
      />

      {/* The Play Button - Centerpiece */}
      <g filter="url(#goplay-gold-glow)">
        <path
          d="M 215 170 L 365 256 L 215 342 L 225 256 Z"
          fill="url(#goplay-gold-metallic)"
          stroke="#B8860B"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </g>

      {/* Orbiting Satellite Dot - Represents connection/social */}
      <circle
        cx="445"
        cy="290"
        r="18"
        fill="hsl(var(--gold))"
        className="animate-pulse"
        style={{ animationDuration: '3s' }}
        filter="url(#goplay-gold-glow)"
      />

      {/* --- SEASONAL MICRO-ELEMENTS --- */}
      {theme === 'christmas' && (
        <g
          className="animate-in fade-in duration-1000"
          filter="url(#seasonal-glow)"
        >
          {/* Stylized Holly Berry at Top Left of G */}
          <circle cx="120" cy="110" r="12" fill="#ef4444" />
          <circle cx="105" cy="125" r="12" fill="#ef4444" />
          <circle cx="135" cy="125" r="12" fill="#ef4444" />
          {/* Leaves */}
          <path
            d="M 120 110 Q 150 80 180 100 Q 150 120 120 110"
            fill="#22c55e"
            opacity="0.9"
          />
          <path
            d="M 105 125 Q 70 150 90 180 Q 120 160 105 125"
            fill="#22c55e"
            opacity="0.9"
          />
          {/* Subtle Snow Dust on Top Curve */}
          <circle cx="256" cy="40" r="4" fill="white" opacity="0.8" />
          <circle cx="280" cy="45" r="3" fill="white" opacity="0.6" />
          <circle cx="230" cy="48" r="3" fill="white" opacity="0.6" />
        </g>
      )}

      {theme === 'carnival' && (
        <g
          className="animate-in fade-in duration-1000"
          filter="url(#seasonal-glow)"
        >
          {/* Confetti & Streamers */}
          {/* Streamer */}
          <path
            d="M 100 400 Q 150 350 120 300 Q 90 250 140 200"
            fill="none"
            stroke="#d946ef"
            strokeWidth="4"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M 400 100 Q 350 150 380 200"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="4"
            strokeLinecap="round"
            className="opacity-80"
          />
          {/* Confetti Dots */}
          <circle cx="180" cy="150" r="6" fill="#fbbf24" />
          <circle cx="350" cy="350" r="5" fill="#d946ef" />
          <circle cx="300" cy="80" r="4" fill="#22c55e" />
          <circle cx="150" cy="380" r="5" fill="#0ea5e9" />
          <circle cx="450" cy="200" r="4" fill="#fbbf24" />
        </g>
      )}

      {theme === 'easter' && (
        <g
          className="animate-in fade-in duration-1000"
          filter="url(#seasonal-glow)"
        >
          {/* Minimalist Bunny Ears peaking behind the G top */}
          <path
            d="M 230 64 Q 210 10 230 0 Q 250 10 240 64"
            fill="white"
            opacity="0.8"
          />
          <path
            d="M 280 64 Q 300 10 280 0 Q 260 10 270 64"
            fill="white"
            opacity="0.8"
          />
          {/* Colored Egg accent near satellite */}
          <ellipse
            cx="480"
            cy="270"
            rx="12"
            ry="16"
            fill="#f472b6"
            transform="rotate(15 480 270)"
          />
        </g>
      )}

      {theme === 'world-cup' && (
        <g
          className="animate-in fade-in duration-1000"
          filter="url(#seasonal-glow)"
        >
          {/* Soccer Ball Hexagon Pattern Hint on Satellite */}
          <circle
            cx="445"
            cy="290"
            r="18"
            fill="url(#goplay-gold-metallic)"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M 445 280 L 450 285 L 445 295 L 440 285 Z"
            fill="#16a34a"
            opacity="0.8"
          />
          {/* Brazilian/World Colors Streamer */}
          <path
            d="M 100 420 Q 256 500 412 420"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 100 430 Q 256 510 412 430"
            fill="none"
            stroke="#16a34a"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      )}

      {theme === 'commemorative' && (
        <g
          className="animate-in fade-in duration-1000"
          filter="url(#seasonal-glow)"
        >
          {/* Fireworks Burst */}
          <g transform="translate(100, 100)">
            <path
              d="M 0 0 L 0 -20 M 0 0 L 15 -15 M 0 0 L 20 0 M 0 0 L 15 15 M 0 0 L 0 20 M 0 0 L -15 15 M 0 0 L -20 0 M 0 0 L -15 -15"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </g>
          <g transform="translate(400, 400) scale(0.8)">
            <path
              d="M 0 0 L 0 -20 M 0 0 L 15 -15 M 0 0 L 20 0 M 0 0 L 15 15 M 0 0 L 0 20 M 0 0 L -15 15 M 0 0 L -20 0 M 0 0 L -15 -15"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </g>
        </g>
      )}
    </svg>
  )
}
