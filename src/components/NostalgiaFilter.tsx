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
    if (shouldRender) {
      const timer = setInterval(() => setTime(new Date()), 1000)
      return () => clearInterval(timer)
    }
  }, [shouldRender])

  if (!shouldRender) return null

  // Helper to render the specific overlay based on preset
  // IMPORTANT: All elements must have pointer-events-none to allow interaction with the app underneath
  const renderOverlay = () => {
    switch (activePreset) {
      case 'cassette':
        return (
          <>
            {/* --- K7 TAPE AESTHETIC --- */}
            {/* Physical Plastic Frame */}
            <div className="absolute inset-0 z-30 pointer-events-none border-[12px] border-[#222] rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] box-border">
              {/* Texture Layer on Frame */}
              <div className="absolute inset-[-12px] z-30 border-[12px] border-transparent filter-texture-plastic opacity-20 pointer-events-none rounded-2xl" />

              {/* Screws */}
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-zinc-600 border border-zinc-800 shadow-inner z-40 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-zinc-800 rotate-45 transform" />
                <div className="absolute w-full h-[1px] bg-zinc-800 -rotate-45 transform" />
              </div>
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-zinc-600 border border-zinc-800 shadow-inner z-40 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-zinc-800 rotate-45 transform" />
                <div className="absolute w-full h-[1px] bg-zinc-800 -rotate-45 transform" />
              </div>
              <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-zinc-600 border border-zinc-800 shadow-inner z-40 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-zinc-800 rotate-45 transform" />
                <div className="absolute w-full h-[1px] bg-zinc-800 -rotate-45 transform" />
              </div>
              <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-zinc-600 border border-zinc-800 shadow-inner z-40 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-zinc-800 rotate-45 transform" />
                <div className="absolute w-full h-[1px] bg-zinc-800 -rotate-45 transform" />
              </div>

              {/* Sticker Label - Top Right Corner */}
              <div className="absolute top-16 -right-1 z-40 bg-orange-600 px-3 py-1 shadow-md border-l border-t border-b border-white/20 transform rotate-90 origin-top-right rounded-sm">
                <span className="font-handwriting font-black text-[10px] text-white uppercase tracking-widest whitespace-nowrap">
                  GOPLAY MIX VOL.1
                </span>
              </div>

              {/* Tape Window Outline (Simulated) */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full border border-white/5 bg-white/5 pointer-events-none backdrop-blur-[1px]" />
            </div>

            {/* Vintage Warm Grading */}
            <div className="absolute inset-0 z-0 bg-amber-900/10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 z-0 backdrop-contrast-[0.9] backdrop-brightness-95 backdrop-sepia-[0.2] pointer-events-none" />
          </>
        )

      case 'vhs':
        return (
          <>
            {/* --- VHS CINEMATIC SKIN --- */}
            {/* Cinematic Black Bars (Letterbox Effect simulated at edges) */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/90 z-20 pointer-events-none blur-sm" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/90 z-20 pointer-events-none blur-sm" />

            {/* Tracking Line Animation */}
            <div className="absolute left-0 right-0 h-1.5 bg-white/10 blur-md z-30 animate-tracking pointer-events-none mix-blend-screen" />

            {/* Color Bleed / Chromatic Aberration */}
            <div className="absolute inset-0 z-10 filter-vhs-color-shift opacity-40 pointer-events-none mix-blend-screen" />

            {/* Scanlines */}
            <div className="absolute inset-0 z-10 filter-vhs-lines opacity-20 pointer-events-none" />

            {/* Static Noise */}
            <div className="absolute inset-0 z-10 filter-grain opacity-10 mix-blend-overlay pointer-events-none" />

            {/* CRT Flicker */}
            <div className="absolute inset-0 z-20 filter-crt-flicker pointer-events-none" />

            {/* Color Grading: Desaturated shadows, high contrast */}
            <div className="absolute inset-0 z-0 backdrop-contrast-125 backdrop-saturate-[0.8] pointer-events-none" />

            {/* OSD (On Screen Display) */}
            <div className="absolute top-6 left-6 pointer-events-none z-40 font-mono text-white/70 text-2xl font-bold tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
              PLAY
            </div>
            <div className="absolute bottom-6 left-6 pointer-events-none z-40 font-mono text-white/70 text-sm tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
              {time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              <span className="ml-4 text-xs opacity-80">SP</span>
            </div>
            <div className="absolute bottom-6 right-6 pointer-events-none z-40 font-mono text-white/70 text-sm tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
              {time.toLocaleDateString()}
            </div>
          </>
        )

      case '90s':
        return (
          <>
            {/* --- 90s RETRO CRT DISPLAY --- */}
            {/* CRT Bezel Frame (Graphic Art Style) */}
            <div className="absolute inset-0 z-30 border-[14px] border-purple-900/10 pointer-events-none rounded-[2rem] box-border">
              {/* Bezel Decoration Pattern */}
              <div className="absolute inset-[-14px] z-30 border-[14px] border-transparent filter-90s-pattern opacity-40 pointer-events-none rounded-[2rem]" />
            </div>

            {/* Screen Curvature Vignette (Inner Shadow) */}
            <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_75%,rgba(0,0,0,0.4)_100%)] rounded-[1.5rem] pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />

            {/* Scanlines (Crisp) */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none" />

            {/* Geometric Pattern Overlay in Corners */}
            <div className="absolute top-0 right-0 w-32 h-32 filter-90s-pattern opacity-20 pointer-events-none z-10 rounded-bl-[4rem]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 filter-90s-pattern opacity-20 pointer-events-none z-10 rounded-tr-[4rem]" />

            {/* Color Grading: Pop / Saturated */}
            <div className="absolute inset-0 z-0 backdrop-contrast-[1.1] backdrop-saturate-[1.3] backdrop-brightness-105 pointer-events-none" />

            {/* Date Stamp (Camcorder style) */}
            <div className="absolute bottom-6 right-6 pointer-events-none z-40 font-digital text-[#ff8e25] text-sm tracking-widest drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
              {time.toLocaleDateString('pt-BR')}
            </div>
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

      case 'grain':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-30 filter-grain" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-grayscale backdrop-contrast-125 backdrop-brightness-90 opacity-50" />
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
            {/* Polaroid Color Science */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[#fff5e6] mix-blend-multiply opacity-20" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-blue-900/10 mix-blend-screen" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-[1.1] backdrop-brightness-110 backdrop-saturate-[0.9]" />

            {/* White Frame Border */}
            <div className="absolute inset-0 pointer-events-none z-20 border-[10px] border-white/90 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]" />
          </>
        )

      case 'pele':
        return (
          <>
            {/* 80s Broadcast Look */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-yellow-500/10 mix-blend-overlay" />
            <div className="absolute inset-0 pointer-events-none z-10 filter-broadcast-bloom" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-saturate-[1.4] backdrop-contrast-[1.1] backdrop-brightness-105" />

            {/* TV Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-broadcast-scanlines opacity-20" />

            {/* Vignette */}
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
            {/* Vintage Cinematic B&W */}
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-grayscale backdrop-contrast-[1.4] backdrop-brightness-90" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-neutral-900/10 mix-blend-multiply" />

            {/* Heavy Film Grain */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-30 mix-blend-overlay" />

            {/* Film Scratches */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-film-scratches" />

            {/* Heavy Vignette */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
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
