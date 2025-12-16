import * as React from 'react'
import { cn } from '@/lib/utils'

interface GoplayIconProps extends React.ComponentProps<'svg'> {
  className?: string
}

export const GoplayIcon = ({ className, ...props }: GoplayIconProps) => {
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
    </svg>
  )
}
