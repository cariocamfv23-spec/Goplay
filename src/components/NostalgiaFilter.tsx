import { useNostalgiaStore, NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface NostalgiaFilterProps {
  className?: string
  intensity?: number
  manualPreset?: NostalgiaPreset
  forceEnable?: boolean
}

export function NostalgiaFilter({
  className,
  intensity = 1,
  manualPreset,
  forceEnable = false,
}: NostalgiaFilterProps) {
  const { isEnabled, preset: storePreset } = useNostalgiaStore()
  const [time, setTime] = useState(new Date())

  const activePreset = manualPreset || storePreset
  const shouldRender = forceEnable || isEnabled

  useEffect(() => {
    if (activePreset === 'vhs' || activePreset === '90s') {
      const timer = setInterval(() => setTime(new Date()), 1000)
      return () => clearInterval(timer)
    }
  }, [activePreset])

  if (!shouldRender) return null

  // Helper to render the specific overlay based on preset
  const renderOverlay = () => {
    switch (activePreset) {
      case 'grain':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-30 filter-grain" />
            <div className="absolute inset-0 pointer-events-none z-10 grayscale contrast-125 brightness-90 opacity-50" />
          </>
        )

      case 'retro':
        return (
          <>
            {/* Sepia & Warmth */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[#7a5c29] mix-blend-overlay opacity-20" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-br from-[#f8e8c8]/30 to-[#4a3b2a]/50 mix-blend-multiply" />
            {/* Subtle Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-10" />
          </>
        )

      case 'vhs':
        return (
          <>
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-vhs-lines opacity-10" />
            {/* Color Shift/Bleed */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-red-500/5 to-blue-500/5 mix-blend-color-dodge animate-pulse" />
            {/* Static Noise */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-20 mix-blend-screen" />
            {/* CRT Flicker */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-crt-flicker" />

            {/* OSD (On Screen Display) */}
            <div className="absolute top-8 left-8 pointer-events-none z-30 font-mono text-white/80 text-xl tracking-widest uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              PLAY
            </div>
            <div className="absolute bottom-8 left-8 pointer-events-none z-30 font-mono text-white/80 text-lg tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              {time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              <span className="text-sm ml-2">{time.toLocaleDateString()}</span>
            </div>
            <div className="absolute bottom-8 right-8 pointer-events-none z-30 font-mono text-white/80 text-lg tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              SP
            </div>
          </>
        )

      case '90s':
        return (
          <>
            {/* High Contrast & Saturation Boost */}
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-soft-light bg-blue-500/10" />
            <div className="absolute inset-0 pointer-events-none z-10 contrast-[1.15] saturate-[1.3] brightness-105" />
            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-90s-pattern" />
            {/* Date Stamp */}
            <div className="absolute bottom-4 right-4 pointer-events-none z-30 font-mono text-sm text-[#ff8e25] font-bold tracking-widest drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] font-digital">
              {time.toLocaleDateString('pt-BR')}
            </div>
          </>
        )

      case 'analog':
        return (
          <>
            {/* Light Leaks */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-orange-500/20 via-transparent to-purple-500/10 mix-blend-screen opacity-60" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-500/10 to-transparent mix-blend-screen" />
            {/* Soft Focus */}
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-blur-[0.5px] brightness-105 contrast-[0.95]" />
            {/* Film Grain */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-20" />
            {/* Film Border Imitation (Vignette) */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_70%,rgba(20,20,20,0.3)_100%)]" />
          </>
        )

      case 'polaroid':
        return (
          <>
            {/* Polaroid Color Science: Creamy whites, muted blacks, green/blue tint in shadows */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[#fff5e6] mix-blend-multiply opacity-20" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-blue-900/10 mix-blend-screen" />
            <div className="absolute inset-0 pointer-events-none z-10 contrast-[1.1] brightness-110 saturate-[0.9]" />

            {/* Frame - Only applied if explicitly viewing media (not full app usually, but we can add a border vignette) */}
            <div className="absolute inset-0 pointer-events-none z-20 border-[20px] border-white/90 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-white/90 pointer-events-none z-20 flex items-center justify-center">
              <span className="font-handwriting text-black/70 text-2xl rotate-[-2deg]">
                #GoPlay
              </span>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none rounded-[inherit] overflow-hidden',
        className,
      )}
    >
      {renderOverlay()}
    </div>
  )
}
