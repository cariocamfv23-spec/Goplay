import { cn } from '@/lib/utils'
import { useMemo } from 'react'

interface SportSeparator3DProps {
  sport?: string
  className?: string
  index?: number
}

// Colors available in the icon service for transparency
type ValidIconColor =
  | 'gradient'
  | 'solid-black'
  | 'multicolor'
  | 'azure'
  | 'black'
  | 'blue'
  | 'chartreuse'
  | 'cyan'
  | 'gray'
  | 'green'
  | 'orange'
  | 'red'
  | 'rose'
  | 'spring-green'
  | 'violet'
  | 'white'
  | 'yellow'

interface SportConfig {
  query: string
  color: ValidIconColor
}

export function SportSeparator3D({
  sport,
  className,
  index = 0,
}: SportSeparator3DProps) {
  // Memoize configuration to prevent recalculation on renders
  const config = useMemo<SportConfig | null>(() => {
    if (!sport) return null
    const s = sport.toLowerCase()

    // Using 'multicolor' to provide a premium, 3D-like appearance with full transparency
    // Switching to /i endpoint ensures transparent backgrounds unlike /p which may return squares
    if (s.includes('futebol') || s.includes('soccer')) {
      return { query: 'soccer-ball', color: 'multicolor' }
    }
    if (s.includes('bike') || s.includes('cycl')) {
      return { query: 'bicycle', color: 'multicolor' }
    }
    if (s.includes('box') || s.includes('fight')) {
      return { query: 'boxing-glove', color: 'multicolor' }
    }
    if (
      s.includes('jiu') ||
      s.includes('judo') ||
      s.includes('bjj') ||
      s.includes('martial')
    ) {
      return { query: 'kimono', color: 'multicolor' }
    }
    if (s.includes('gym') || s.includes('crossfit') || s.includes('muscul')) {
      return { query: 'dumbbell', color: 'multicolor' }
    }
    if (s.includes('run') || s.includes('corri')) {
      return { query: 'running-shoe', color: 'multicolor' }
    }
    if (s.includes('tenis') || s.includes('tennis')) {
      return { query: 'tennis-ball', color: 'multicolor' }
    }
    if (s.includes('basket') || s.includes('basquete')) {
      return { query: 'basketball', color: 'multicolor' }
    }
    if (s.includes('volei') || s.includes('volley')) {
      return { query: 'volleyball', color: 'multicolor' }
    }
    if (s.includes('swim') || s.includes('nata')) {
      return { query: 'swimming-goggles', color: 'multicolor' }
    }
    if (s.includes('skate')) {
      return { query: 'skateboard', color: 'multicolor' }
    }
    if (s.includes('surf')) {
      return { query: 'surfboard', color: 'multicolor' }
    }

    // Default Fallback
    return { query: 'trophy', color: 'multicolor' }
  }, [sport])

  // Memoize animation selection based on index to create variety
  const animationClass = useMemo(() => {
    // 4 Distinct animations to cycle through
    const animations = [
      'animate-float', // Standard float
      'animate-wiggle-slow', // Subtle rotation/wiggle
      'animate-hover-3d', // Combined float + tilt
      'animate-pulse-slow', // Gentle scale pulse
    ]
    return animations[index % animations.length]
  }, [index])

  // If no sport is provided, return a placeholder or empty div
  if (!sport || !config)
    return (
      <div className="flex flex-col justify-center h-full pb-4 opacity-30 pointer-events-none select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
      </div>
    )

  return (
    <div
      className={cn(
        'flex flex-col justify-center h-full pb-3 select-none pointer-events-none relative z-10',
        className,
      )}
    >
      {/* 3D Object Container - Layout footprint preserved (w-7 h-7) */}
      <div
        className={cn(
          'relative w-7 h-7 flex items-center justify-center transition-transform will-change-transform',
          animationClass,
        )}
      >
        {/* The 3D Render Image - Using /i endpoint for guaranteed transparency */}
        {/* Adjusted scale from 110 to 90 for refined, premium look without affecting layout */}
        {/* Using object-contain ensures adaptive sizing within the container */}
        <img
          src={`https://img.usecurling.com/i?q=${encodeURIComponent(config.query)}&color=${config.color}`}
          alt={sport}
          className="w-full h-full object-contain drop-shadow-sm filter contrast-[1.05] saturate-[1.15] scale-90"
          loading="lazy"
        />
      </div>
    </div>
  )
}
