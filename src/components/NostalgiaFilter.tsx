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

  // Layer 1: Mandatory Graphic Frames Implementation
  const renderFrame = () => {
    switch (activePreset) {
      case 'cassette':
        return (
          <>
            {/* --- K7 TAPE AESTHETIC --- */}
            {/* Physical Plastic Frame Container */}
            <div className="absolute inset-0 z-30 pointer-events-none border-[16px] border-[#2a2a2a] rounded-[24px] shadow-[inset_0_0_20px_rgba(0,0,0,0.9),_0_0_0_2px_#111] box-border flex flex-col justify-between">
              {/* Texture Layer on Frame */}
              <div className="absolute inset-[-16px] z-30 border-[16px] border-transparent filter-texture-plastic opacity-30 pointer-events-none rounded-[24px]" />

              {/* Top Section with Screws */}
              <div className="h-12 w-full relative flex justify-between px-4 items-center">
                {/* Screw Top Left */}
                <div className="w-5 h-5 rounded-full bg-zinc-600 border-2 border-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.1)] z-40 flex items-center justify-center">
                  <div className="w-full h-[2px] bg-zinc-800 rotate-45 transform" />
                  <div className="absolute w-full h-[2px] bg-zinc-800 -rotate-45 transform" />
                </div>
                {/* Screw Top Right */}
                <div className="w-5 h-5 rounded-full bg-zinc-600 border-2 border-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.1)] z-40 flex items-center justify-center">
                  <div className="w-full h-[2px] bg-zinc-800 rotate-12 transform" />
                  <div className="absolute w-full h-[2px] bg-zinc-800 -rotate-[78deg] transform" />
                </div>
              </div>

              {/* Sticker Label - Main Brand */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 bg-orange-600 px-6 py-1.5 shadow-md border-t border-white/20 rounded-sm transform -rotate-1 skew-x-1">
                <span className="font-handwriting font-black text-[14px] text-white uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-sm">
                  GOPLAY MIX VOL.1
                </span>
              </div>

              {/* Writeable Area Label */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 w-3/4 h-8 bg-white/90 transform rotate-[0.5deg] shadow-sm flex items-center justify-center">
                <span className="font-handwriting text-blue-800 text-xs">
                  Side A: Best Hits
                </span>
              </div>

              {/* Bottom Section with Screws */}
              <div className="h-12 w-full relative flex justify-between px-4 items-center">
                {/* Screw Bottom Left */}
                <div className="w-5 h-5 rounded-full bg-zinc-600 border-2 border-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.1)] z-40 flex items-center justify-center">
                  <div className="w-full h-[2px] bg-zinc-800 rotate-90 transform" />
                  <div className="absolute w-full h-[2px] bg-zinc-800 rotate-0 transform" />
                </div>
                {/* Screw Bottom Right */}
                <div className="w-5 h-5 rounded-full bg-zinc-600 border-2 border-zinc-700 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.1)] z-40 flex items-center justify-center">
                  <div className="w-full h-[2px] bg-zinc-800 rotate-45 transform" />
                  <div className="absolute w-full h-[2px] bg-zinc-800 -rotate-45 transform" />
                </div>
              </div>

              {/* Tape Window Outline (Simulated at bottom) */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-12 rounded-full border-4 border-zinc-700 bg-black/40 pointer-events-none backdrop-blur-[2px] flex items-center justify-center shadow-inner">
                {/* Spools */}
                <div className="w-8 h-8 rounded-full border-2 border-white/20 mr-12 animate-spin [animation-duration:10s] linear"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white/20 ml-12 animate-spin [animation-duration:10s] linear"></div>
              </div>
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
            {/* Cinematic Black Frame (Letterbox + Pillars) */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-black z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black z-20 pointer-events-none" />
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-black z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-3 bg-black z-20 pointer-events-none" />

            {/* Tracking Line Animation - More prominent */}
            <div className="absolute left-0 right-0 h-2 bg-white/20 blur-md z-30 animate-tracking pointer-events-none mix-blend-screen" />
            <div
              className="absolute left-0 right-0 h-1 bottom-[10%] bg-white/10 blur-sm z-30 animate-tracking pointer-events-none mix-blend-overlay"
              style={{ animationDelay: '2s', animationDuration: '7s' }}
            />

            {/* Color Bleed / Chromatic Aberration */}
            <div className="absolute inset-0 z-10 filter-vhs-color-shift opacity-50 pointer-events-none mix-blend-screen" />

            {/* Scanlines */}
            <div className="absolute inset-0 z-10 filter-vhs-lines opacity-30 pointer-events-none" />

            {/* Static Noise */}
            <div className="absolute inset-0 z-10 filter-grain opacity-15 mix-blend-overlay pointer-events-none" />

            {/* OSD (On Screen Display) - Green Font */}
            <div className="absolute top-14 left-6 pointer-events-none z-40 font-mono text-green-500/90 text-4xl font-bold tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] animate-pulse">
              PLAY
            </div>
            <div className="absolute bottom-14 left-6 pointer-events-none z-40 font-mono text-white/80 text-lg tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
              {time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              <span className="ml-4 text-sm opacity-80">SP</span>
            </div>
            <div className="absolute bottom-14 right-6 pointer-events-none z-40 font-mono text-white/80 text-lg tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
              {time.toLocaleDateString()}
            </div>
          </>
        )

      case '90s':
      case 'retro':
        return (
          <>
            {/* --- 90s RETRO CRT DISPLAY --- */}
            {/* CRT Monitor Frame (Thick Beige/Grey Border) */}
            <div className="absolute inset-0 z-30 border-[20px] border-[#d0d0c0] pointer-events-none rounded-[32px] box-border shadow-[inset_0_0_25px_rgba(0,0,0,0.4),_0_0_0_4px_rgba(0,0,0,0.2)]">
              {/* Bezel Specular Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/20" />
            </div>

            {/* Screen Curvature Vignette (Inner Shadow) */}
            <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_65%,rgba(0,0,0,0.6)_100%)] rounded-[20px] pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />

            {/* Scanlines (Crisp) */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none" />

            {/* RGB Subpixel effect simulated */}
            <div className="absolute inset-0 z-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,0,0,0.08)_3px,rgba(0,255,0,0.08)_4px,rgba(0,0,255,0.08)_5px)] bg-[length:6px_100%] pointer-events-none" />

            {/* Color Grading: Pop / Saturated */}
            <div className="absolute inset-0 z-0 backdrop-contrast-[1.2] backdrop-saturate-[1.4] backdrop-brightness-105 pointer-events-none" />

            {/* Camcorder Date */}
            <div className="absolute bottom-10 right-10 pointer-events-none z-40 font-digital text-[#ff8e25] text-lg tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] shadow-black">
              {time.toLocaleDateString('pt-BR')}
            </div>

            {/* REC indicator */}
            <div className="absolute top-10 right-10 pointer-events-none z-40 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_red]" />
              <span className="font-digital text-red-600 text-lg font-bold tracking-wider">
                REC
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

            {/* Terminal Frame */}
            <div className="absolute inset-0 z-30 border-8 border-green-900 pointer-events-none" />

            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-digital-grid opacity-20" />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-digital-scanlines opacity-30" />

            {/* System Status Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none z-30 font-digital text-green-500 text-xs uppercase tracking-wider drop-shadow-[0_0_5px_rgba(0,255,0,0.5)] bg-black/50 p-2 border border-green-800">
              SYSTEM_READY...
              <br />
              MEM: 640K OK
              <br />
              &gt; EXEC GOPLAY.EXE
            </div>
            <div className="absolute bottom-4 right-4 pointer-events-none z-30 font-digital text-green-500 text-xs uppercase tracking-wider drop-shadow-[0_0_5px_rgba(0,255,0,0.5)] animate-pulse">
              _CURSOR
            </div>
          </>
        )

      case 'pele':
        return (
          <>
            {/* 80s TV Frame */}
            <div className="absolute inset-0 z-30 border-[16px] border-[#333] rounded-[40px] pointer-events-none shadow-[inset_0_0_20px_black]" />

            {/* 80s Broadcast Look */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-yellow-500/10 mix-blend-overlay" />
            <div className="absolute inset-0 pointer-events-none z-10 filter-broadcast-bloom" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-saturate-[1.4] backdrop-contrast-[1.1] backdrop-brightness-105" />

            {/* TV Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-broadcast-scanlines opacity-20" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.4)_100%)]" />

            {/* Broadcast Overlay Logo */}
            <div className="absolute top-10 right-10 pointer-events-none z-30 flex flex-col items-end opacity-90">
              <span className="text-yellow-400 font-black text-2xl italic tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                AO VIVO
              </span>
              <span className="text-white font-bold text-sm tracking-widest drop-shadow-md bg-blue-800 px-2 py-0.5">
                ESPECIAL 1982
              </span>
            </div>
          </>
        )

      case 'ali':
        return (
          <>
            {/* B&W Film Frame */}
            <div className="absolute inset-0 z-30 border-[24px] border-black pointer-events-none" />

            {/* Vintage Cinematic B&W */}
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-grayscale backdrop-contrast-[1.4] backdrop-brightness-90" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-neutral-900/10 mix-blend-multiply" />

            {/* Heavy Film Grain */}
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-30 mix-blend-overlay" />

            {/* Film Scratches */}
            <div className="absolute inset-0 pointer-events-none z-20 filter-film-scratches" />

            {/* Heavy Vignette */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />

            {/* Reel Marker */}
            <div className="absolute top-8 left-8 pointer-events-none z-30 font-mono text-white/50 text-xs">
              REEL 4 - SCENE 12
            </div>
          </>
        )

      case 'analog':
      case 'polaroid':
      case 'grain':
      default:
        // For other presets, maintain original subtle overlay but allow wallpaper to shine
        return (
          <>
            {activePreset === 'polaroid' && (
              <div className="absolute inset-0 z-30 border-[16px] border-b-[60px] border-white pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] flex items-end justify-center pb-4">
                <span className="font-handwriting text-black/60 text-xl rotate-1">
                  Moments
                </span>
              </div>
            )}

            {activePreset === 'analog' && (
              <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-orange-500/10 via-transparent to-purple-500/10 mix-blend-screen opacity-60" />
            )}

            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-10" />

            {/* Fallback frame for consistency if needed, or just light vignette */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.2)_100%)]" />
          </>
        )
    }
  }

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none rounded-[inherit] overflow-hidden',
        className,
      )}
    >
      {renderFrame()}
    </div>
  )
}
