import { cn } from '@/lib/utils'
import { useMemo } from 'react'

interface SportSeparator3DProps {
  sport?: string
  className?: string
  index?: number
}

// Colors available in the image service
type ValidColor =
  | 'black'
  | 'blue'
  | 'gray'
  | 'green'
  | 'orange'
  | 'red'
  | 'white'
  | 'yellow'
  | 'purple'
  | 'cyan'
  | 'pink'

interface SportConfig {
  query: string
  color: ValidColor
}

export function SportSeparator3D({
  sport,
  className,
  index = 0,
}: SportSeparator3DProps) {
  // Memoize configuration to prevent recalculation on renders
  // Moved before the conditional return to comply with Rules of Hooks
  const config = useMemo<SportConfig | null>(() => {
    if (!sport) return null
    const s = sport.toLowerCase()

    if (s.includes('futebol') || s.includes('soccer')) {
      return { query: 'soccer ball 3d render', color: 'white' }
    }
    if (s.includes('bike') || s.includes('cycl')) {
      return { query: 'bicycle helmet 3d render', color: 'orange' }
    }
    if (s.includes('box') || s.includes('fight')) {
      return { query: 'boxing glove 3d render', color: 'red' }
    }
    if (
      s.includes('jiu') ||
      s.includes('judo') ||
      s.includes('bjj') ||
      s.includes('martial')
    ) {
      return { query: 'black belt martial arts 3d', color: 'black' }
    }
    if (s.includes('gym') || s.includes('crossfit') || s.includes('muscul')) {
      return { query: 'dumbbell 3d render', color: 'purple' }
    }
    if (s.includes('run') || s.includes('corri')) {
      return { query: 'running shoe 3d render', color: 'green' }
    }
    if (s.includes('tenis') || s.includes('tennis')) {
      return { query: 'tennis ball 3d render', color: 'yellow' }
    }
    if (s.includes('basket') || s.includes('basquete')) {
      return { query: 'basketball 3d render', color: 'orange' }
    }
    if (s.includes('volei') || s.includes('volley')) {
      return { query: 'volleyball 3d render', color: 'yellow' }
    }
    if (s.includes('swim') || s.includes('nata')) {
      return { query: 'swimming goggles 3d render', color: 'cyan' }
    }
    if (s.includes('skate')) {
      return { query: 'skateboard 3d render', color: 'black' }
    }
    if (s.includes('surf')) {
      return { query: 'surfboard 3d render', color: 'blue' }
    }

    // Default Fallback
    return { query: 'gold trophy 3d render', color: 'yellow' }
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
      {/* 3D Object Container - No Background, just the object */}
      <div
        className={cn(
          'relative w-7 h-7 flex items-center justify-center transition-transform will-change-transform',
          animationClass,
        )}
      >
        {/* Removed Glow/Shadow Effect for clean floating look */}

        {/* The 3D Render Image */}
        <img
          src={`https://img.usecurling.com/p/64/64?q=${encodeURIComponent(config.query)}&color=${config.color}&dpr=2`}
          alt={sport}
          className="w-full h-full object-contain drop-shadow-sm filter contrast-[1.1] saturate-[1.1]"
          loading="lazy"
        />
      </div>
    </div>
  )
}
