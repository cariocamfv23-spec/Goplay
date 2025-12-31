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
    if (
      activePreset === 'vhs' ||
      activePreset === '90s' ||
      activePreset === 'pele' ||
      activePreset === 'digital'
    ) {
      const timer = setInterval(() => setTime(new Date()), 1000)
      return () => clearInterval(timer)
    }
  }, [activePreset])

  if (!shouldRender) return null

  // Helper to render the specific overlay based on preset
  // IMPORTANT: We use backdrop-filter utilities to ensure the underlying image is affected visually
  const renderOverlay = () => {
    switch (activePreset) {
      case 'grain':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-30 filter-grain" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-grayscale backdrop-contrast-125 backdrop-brightness-90 opacity-50" />
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
            {/* Softening */}
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-sepia-[0.3]" />
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
            {/* Color Grading */}
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-125 backdrop-saturate-[0.8]" />

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
            {/* High Contrast & Saturation Boost via Backdrop */}
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-soft-light bg-blue-500/10" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-[1.15] backdrop-saturate-[1.3] backdrop-brightness-105" />
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
            {/* Soft Focus & Correction */}
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-blur-[0.5px] backdrop-brightness-105 backdrop-contrast-[0.95]" />
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
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-[1.1] backdrop-brightness-110 backdrop-saturate-[0.9]" />

            {/* Frame - Only applied if explicitly viewing media (not full app usually, but we can add a border vignette) */}
            <div className="absolute inset-0 pointer-events-none z-20 border-[20px] border-white/90 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-white/90 pointer-events-none z-20 flex items-center justify-center">
              <span className="font-handwriting text-black/70 text-2xl rotate-[-2deg]">
                #GoPlay
              </span>
            </div>
          </>
        )

      case 'pele':
        return (
          <>
            {/* 80s Broadcast Look: Warm, Saturated, Bloom */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-yellow-500/10 mix-blend-overlay" />
            <div className="absolute inset-0 pointer-events-none z-10 filter-broadcast-bloom" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-saturate-[1.4] backdrop-contrast-[1.1] backdrop-brightness-105" />

            {/* TV Scanlines (finer than VHS) */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-broadcast-scanlines opacity-20" />

            {/* Vignette (TV Tube effect) */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.3)_100%)]" />

            {/* Broadcast Overlay Logo */}
            <div className="absolute top-8 right-8 pointer-events-none z-30 flex flex-col items-end opacity-80">
              <span className="text-yellow-400 font-black text-xl italic tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                AO VIVO
              </span>
              <span className="text-white font-bold text-sm tracking-widest drop-shadow-md">
                1982
              </span>
            </div>
          </>
        )

      case 'ali':
        return (
          <>
            {/* Vintage Cinematic B&W High Contrast */}
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-grayscale backdrop-contrast-[1.4] backdrop-brightness-90" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-neutral-900/10 mix-blend-multiply" />

            {/* Heavy Film Grain */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-30 mix-blend-overlay" />

            {/* Film Scratches & Artifacts */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-film-scratches" />

            {/* Heavy Vignette (Noir style) */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
          </>
        )

      case 'cassette':
        return (
          <>
            {/* Cassette Plastic Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[#f0eee4] mix-blend-multiply opacity-10" />
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-5" />

            {/* Cassette Border Frame */}
            <div className="absolute inset-0 pointer-events-none z-30 border-[16px] border-[#333] rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />

            {/* Screws */}
            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner z-40 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-zinc-700 rotate-45 transform" />
              <div className="absolute w-full h-[1px] bg-zinc-700 -rotate-45 transform" />
            </div>
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner z-40 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-zinc-700 rotate-45 transform" />
              <div className="absolute w-full h-[1px] bg-zinc-700 -rotate-45 transform" />
            </div>
            <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner z-40 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-zinc-700 rotate-45 transform" />
              <div className="absolute w-full h-[1px] bg-zinc-700 -rotate-45 transform" />
            </div>
            <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-zinc-400 border border-zinc-600 shadow-inner z-40 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-zinc-700 rotate-45 transform" />
              <div className="absolute w-full h-[1px] bg-zinc-700 -rotate-45 transform" />
            </div>

            {/* Label Side A */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 bg-orange-500/90 px-3 py-0.5 rounded-sm shadow-sm pointer-events-none">
              <span className="font-handwriting font-bold text-xs text-black uppercase tracking-widest">
                SIDE A
              </span>
            </div>
          </>
        )

      case 'digital':
        return (
          <>
            {/* Green Tint & Contrast */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-green-500/5 mix-blend-overlay" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-[1.2] backdrop-brightness-90 backdrop-saturate-0 backdrop-sepia-[0.3] backdrop-hue-rotate-[50deg]" />

            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-digital-grid opacity-20" />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-digital-scanlines opacity-30" />

            {/* System Status Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none z-30 font-digital text-green-500 text-xs uppercase tracking-wider drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">
              SYSTEM_READY...
              <br />
              MEM: 640K OK
            </div>
            <div className="absolute bottom-4 right-4 pointer-events-none z-30 font-digital text-green-500 text-xs uppercase tracking-wider drop-shadow-[0_0_5px_rgba(0,255,0,0.5)] animate-pulse">
              _CURSOR
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
