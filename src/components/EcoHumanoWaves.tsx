import { ProfileData } from '@/lib/data'
import { getEcoConfig } from '@/lib/eco-utils'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

interface EcoHumanoWavesProps {
  profile: ProfileData
  className?: string
}

export function EcoHumanoWaves({ profile, className }: EcoHumanoWavesProps) {
  const config = useMemo(() => getEcoConfig(profile), [profile])

  if (!config.active) return null

  // Map theme to colors (gradient definitions)
  const themeColors = {
    gold: {
      core: 'bg-gold/30',
      wave: 'border-gold/20',
      glow: 'shadow-[0_0_30px_rgba(255,215,0,0.3)]',
    },
    purple: {
      core: 'bg-primary/30',
      wave: 'border-primary/20',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    },
    cyan: {
      core: 'bg-cyan-500/30',
      wave: 'border-cyan-500/20',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    },
    nature: {
      core: 'bg-emerald-500/30',
      wave: 'border-emerald-500/20',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    },
    neutral: {
      core: 'bg-white/10',
      wave: 'border-white/10',
      glow: 'shadow-[0_0_30px_rgba(255,255,255,0.1)]',
    },
  }

  const colors = themeColors[config.colorTheme]

  // Calculate dynamic scales
  // Base scale is 1.0, expands up to 2.0 based on range
  const maxScale = 1.0 + config.range / 100

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center pointer-events-none z-0',
        className,
      )}
      aria-label={`Eco Humano: ${config.description}`}
    >
      {/* Container for the waves - centered on the avatar */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Core Organic Blob - The "Source" of the Echo */}
        <div
          className={cn(
            'absolute w-[110%] h-[110%] rounded-full animate-blob-pulse mix-blend-screen opacity-40 blur-xl',
            colors.core,
            colors.glow,
          )}
        />

        {/* Primary Ripple - Fast & Frequent */}
        <div
          className={cn(
            'absolute rounded-full border-2 animate-eco-ripple',
            colors.wave,
          )}
          style={{
            width: '100%',
            height: '100%',
            animationDuration: `${4000 - config.frequency * 20}ms`, // Faster frequency = lower duration
          }}
        />

        {/* Secondary Ripple - Delayed & Wider */}
        <div
          className={cn(
            'absolute rounded-full border animate-eco-ripple-delayed',
            colors.wave,
          )}
          style={{
            width: '100%',
            height: '100%',
            animationDuration: `${5000 - config.frequency * 20}ms`,
            transform: `scale(${maxScale})`,
          }}
        />

        {/* Outer Influence Field - Subtle wide aura */}
        {config.range > 50 && (
          <div
            className={cn(
              'absolute rounded-full opacity-20 blur-2xl animate-pulse',
              colors.core,
            )}
            style={{
              width: '180%',
              height: '180%',
              animationDuration: '6s',
            }}
          />
        )}

        {/* "Overcoming" Particles - visual cues for special achievements */}
        {config.particles && (
          <>
            <div
              className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full animate-ping opacity-60"
              style={{ animationDuration: '3s' }}
            />
            <div
              className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-40"
              style={{ animationDuration: '4s', animationDelay: '1s' }}
            />
            <div className="absolute top-1/2 -right-4 w-1 h-1 bg-white rounded-full animate-pulse opacity-50" />
          </>
        )}
      </div>
    </div>
  )
}
