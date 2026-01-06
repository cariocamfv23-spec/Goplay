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

        {/* Christmas Red Velvet Gradient - High Fidelity */}
        <radialGradient
          id="goplay-holiday-red"
          cx="30%"
          cy="30%"
          r="80%"
          fx="30%"
          fy="30%"
        >
          <stop offset="0%" stopColor="#ef4444" /> {/* Red 500 Highlight */}
          <stop offset="60%" stopColor="#b91c1c" /> {/* Red 700 Body */}
          <stop offset="100%" stopColor="#7f1d1d" /> {/* Red 900 Shadow */}
        </radialGradient>

        {/* Christmas Snow White Gradient - Fur Texture */}
        <linearGradient
          id="goplay-snow-white"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f3f4f6" /> {/* Gray 100 */}
          <stop offset="100%" stopColor="#d1d5db" /> {/* Gray 300 Shadow */}
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

        {/* Strong Shadow for Seasonal Elements (Hat) */}
        <filter id="hat-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="2"
            dy="8"
            stdDeviation="4"
            floodColor="black"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      {/* The 'G' - Styled as a futuristic stadium/track ring */}
      {/* Main Body - Preserving structural integrity */}
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
          className="animate-in fade-in zoom-in duration-1000 slide-in-from-top-4"
          filter="url(#hat-shadow)"
        >
          {/* 
             PREMIUM SANTA HAT 
             Proportionally scaled to match the G icon size.
             Positioned to "wear" on the top-left curve of the G.
          */}

          {/* Hat Body: Red Velvet Cone folded to the left */}
          <path
            d="M 125 95 
               L 195 105 
               C 180 20, 90 10, 60 50 
               C 50 70, 90 80, 125 95"
            fill="url(#goplay-holiday-red)"
            stroke="#7f1d1d"
            strokeWidth="0.5"
          />

          {/* Hat Band: Fluffy White Fur surrounding the G curve */}
          <path
            d="M 110 90
               Q 155 78 210 105
               Q 210 125 160 115
               Q 115 120 110 90
               Z"
            fill="url(#goplay-snow-white)"
            stroke="#d1d5db"
            strokeWidth="0.5"
          />

          {/* Pompom: Fluffy Ball at the tip of the fold */}
          <circle
            cx="65"
            cy="55"
            r="16"
            fill="url(#goplay-snow-white)"
            stroke="#d1d5db"
            strokeWidth="0.5"
          />

          {/* Subtle Shine on Hat Body for Plastic/3D Look */}
          <path
            d="M 135 85 Q 160 50 170 90"
            stroke="white"
            strokeWidth="3"
            strokeOpacity="0.2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}

      {theme === 'carnival' && (
        <g
          className="animate-in fade-in duration-1000"
          filter="url(#seasonal-glow)"
        >
          {/* Confetti & Streamers */}
          <path
            d="M 100 400 Q 150 350 120 300 Q 90 250 140 200"
            fill="none"
            stroke="#d946ef"
            strokeWidth="5"
            strokeLinecap="round"
            className="opacity-90"
          />
          <path
            d="M 400 100 Q 350 150 380 200"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="5"
            strokeLinecap="round"
            className="opacity-90"
          />
          {/* Confetti Dots - Increased size for visibility */}
          <circle cx="180" cy="150" r="8" fill="#fbbf24" />
          <circle cx="350" cy="350" r="6" fill="#d946ef" />
          <circle cx="300" cy="80" r="5" fill="#22c55e" />
          <circle cx="150" cy="380" r="6" fill="#0ea5e9" />
          <circle cx="450" cy="200" r="5" fill="#fbbf24" />
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
            opacity="0.9"
            stroke="#f3f4f6"
            strokeWidth="1"
          />
          <path
            d="M 280 64 Q 300 10 280 0 Q 260 10 270 64"
            fill="white"
            opacity="0.9"
            stroke="#f3f4f6"
            strokeWidth="1"
          />
          {/* Colored Egg accent near satellite */}
          <ellipse
            cx="480"
            cy="270"
            rx="14"
            ry="18"
            fill="#f472b6"
            transform="rotate(15 480 270)"
            stroke="white"
            strokeWidth="2"
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
            d="M 445 280 L 452 285 L 445 298 L 438 285 Z"
            fill="#16a34a"
            opacity="0.9"
          />
          {/* Brazilian/World Colors Streamer */}
          <path
            d="M 100 420 Q 256 500 412 420"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 100 435 Q 256 515 412 435"
            fill="none"
            stroke="#16a34a"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      )}

      {theme === 'commemorative' && (
        <g
          className="animate-in fade-in duration-1000"
          filter="url(#seasonal-glow)"
        >
          {/* Fireworks Burst - Enhanced visibility */}
          <g transform="translate(100, 100) scale(1.5)">
            <path
              d="M 0 0 L 0 -20 M 0 0 L 15 -15 M 0 0 L 20 0 M 0 0 L 15 15 M 0 0 L 0 20 M 0 0 L -15 15 M 0 0 L -20 0 M 0 0 L -15 -15"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </g>
          <g transform="translate(400, 400) scale(1.2)">
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
