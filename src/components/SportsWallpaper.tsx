import { useNostalgiaStore, NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface SportsWallpaperProps {
  className?: string
}

export function SportsWallpaper({ className }: SportsWallpaperProps) {
  const { isEnabled, preset } = useNostalgiaStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Styles configuration based on preset
  const getWallpaperStyles = (preset: NostalgiaPreset) => {
    switch (preset) {
      case 'vhs':
        return {
          opacity: 0.06,
          color: 'text-white',
          bg: 'bg-zinc-900',
          blendMode: 'mix-blend-overlay',
        }
      case '90s':
        return {
          opacity: 0.12,
          color: 'text-primary',
          bg: 'bg-background',
          blendMode: 'mix-blend-normal',
        }
      case 'cassette':
        return {
          opacity: 0.08,
          color: 'text-zinc-600 dark:text-zinc-400',
          bg: 'bg-[#f4f4f4] dark:bg-[#1a1a1a]',
          blendMode: 'mix-blend-multiply dark:mix-blend-screen',
        }
      case 'retro':
        return {
          opacity: 0.1,
          color: 'text-amber-900/80 dark:text-amber-100/40',
          bg: 'bg-stone-100 dark:bg-stone-900',
          blendMode: 'mix-blend-multiply dark:mix-blend-overlay',
        }
      case 'pele':
        return {
          opacity: 0.12,
          color: 'text-green-800 dark:text-yellow-400',
          bg: 'bg-yellow-50 dark:bg-green-950/40',
          blendMode: 'mix-blend-multiply dark:mix-blend-screen',
        }
      case 'ali':
        return {
          opacity: 0.06,
          color: 'text-black dark:text-white',
          bg: 'bg-zinc-200 dark:bg-zinc-900',
          blendMode: 'mix-blend-overlay',
        }
      case 'digital':
        return {
          opacity: 0.15,
          color: 'text-green-500',
          bg: 'bg-black',
          blendMode: 'mix-blend-screen',
        }
      default:
        return {
          opacity: 0.03,
          color: 'text-foreground',
          bg: 'bg-background',
          blendMode: 'mix-blend-normal',
        }
    }
  }

  const styles = getWallpaperStyles(preset)

  if (!isEnabled) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-0 pointer-events-none w-full h-full transition-all duration-700',
        styles.bg,
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-all duration-700',
          styles.color,
          styles.blendMode,
        )}
        style={{ opacity: styles.opacity }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="sports-wallpaper-pattern"
              x="0"
              y="0"
              width="360"
              height="360"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(12)"
            >
              <g fill="currentColor">
                {/* 
                  WhatsApp Wallpaper Style Layout:
                  Staggered grid (Brick pattern) for organic look.
                  Row 1: Y=40, X offsets
                  Row 2: Y=130, X offsets shifted
                  Row 3: Y=220, X offsets normal
                  Row 4: Y=310, X offsets shifted
                */}

                {/* ROW 1 (y=40) */}
                {/* Trophy */}
                <path
                  d="M18 20c0 .66-.36 1.27-.92 1.63L12 25l-5.08-3.37C6.36 21.27 6 20.66 6 20v-5h12v5zM22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v2c0 2.21 1.79 4 4 4h1v1.61c0 2.61 1.67 4.83 4 5.65V23h2v-3.74c2.33-.82 4-3.04 4-5.65V12h1c2.21 0 4-1.79 4-4V6zM4 6h16v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6z"
                  transform="translate(30, 30) scale(1.4)"
                />
                {/* Racket */}
                <path
                  d="M19.78 3.57c-1.93-1.93-5.07-1.93-7 0l-1.66 1.66c-.19.19-.19.51 0 .7l.95.95c.19.19.51.19.7 0l1.66-1.66c1.54-1.54 4.05-1.54 5.59 0s1.54 4.05 0 5.59l-5.32 5.32-4.04-4.04 5.32-5.32c.19-.19.19-.51 0-.7l-.95-.95c-.19-.19-.51-.19-.7 0l-5.32 5.32c-.19.19-.19.51 0 .7l4.04 4.04c.19.19.51.19.7 0l5.32-5.32c1.94-1.94 1.94-5.08.01-7.01zM7.27 15.68L14.68 8.27l1.05 1.05-7.41 7.41zM5.5 17.5l-2.8 2.8c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.8-2.8"
                  transform="translate(120, 25) scale(1.1) rotate(45)"
                />
                {/* Medal */}
                <path
                  d="M12 7l-2.5 5.5h5L12 7zM12 2C9.24 2 7 4.24 7 7c0 1.5.69 2.82 1.77 3.73L6.55 16l5.45-2.18L17.45 16l-2.22-5.27C16.31 9.82 17 8.5 17 7c0-2.76-2.24-5-5-5z"
                  transform="translate(210, 30) scale(1.3)"
                />
                {/* Whistle */}
                <path
                  d="M8 10h3v4H8z M19 7h-6V5c0-1.1-.9-2-2-2H7c-2.21 0-4 1.79-4 4v7c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3v-4.17l2.59 2.59L23 11.02 19 7z"
                  transform="translate(300, 30) scale(1.1)"
                />

                {/* ROW 2 (y=130) - Shifted X */}
                {/* Soccer Ball */}
                <path
                  d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M6.05,17.58l3.37-3.37l-1.05-3.03L5.03,12 C5.2,14.07,5.55,15.96,6.05,17.58z M12,14.65l3.5,2.69l-1.34,4.2C13.59,21.84,12.81,22,12,22c-1.55,0-3.02-0.42-4.31-1.15L9.62,16.5 L12,14.65z M12,4c2.61,0,4.98,1.06,6.7,2.77l-2.48,3.96l-3.34-1.08L8.29,11.2l-2.09-4.2C8.01,5.15,9.92,4,12,4z M17.38,19.22 l-1.96-5.01l3.37-1.07l2.13,3.75C19.98,17.92,18.79,18.71,17.38,19.22z"
                  transform="translate(75, 120) scale(1.2)"
                />
                {/* Kimono */}
                <path
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-7h3V5h4v5h3l-5 7z"
                  transform="translate(165, 120) scale(1.1)"
                />
                {/* Cleat (Chuteira) */}
                <path
                  d="M21.24 12.23l-1.36-1.36c-1.09-1.09-2.52-1.76-4.05-1.92l-5.69-.57c-.75-.08-1.5.17-2.05.67L5.59 11.5c-1.63 1.48-2.59 3.55-2.59 5.75V19h18v-4.5c0-.85-.34-1.66-.94-2.27z"
                  transform="translate(255, 125) scale(1.2)"
                />
                {/* Glove */}
                <path
                  d="M19 6c0-2.21-1.79-4-4-4h-2c-2.21 0-4 1.79-4 4v7c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6z M12 17c-1.1 0-2 .9-2 2v2c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2c0-1.1-.9-2-2-2h-2z"
                  transform="translate(345, 120) scale(1.2)"
                />

                {/* ROW 3 (y=220) - Aligned with Row 1 */}
                {/* Dumbbell */}
                <path
                  d="M6 5v14h3v-2.25L15 19V5l-6 2.25V5H6z M18 5v14h3v-2.25l-1-1.75V9l1-1.75V5h-3z"
                  transform="translate(30, 210) scale(1.0)"
                />
                {/* Surfboard */}
                <path
                  d="M12 2C9 2 7 6 7 12s2 10 5 10 5-6 5-10S15 2 12 2zm0 18c-1.5 0-3-3.5-3-8s1.5-8 3-8 3 3.5 3 8-1.5 8-3 8z"
                  transform="translate(120, 210) scale(1.1) rotate(-15)"
                />
                {/* Net (Stylized) */}
                <path
                  d="M2 6h20v12H2V6zm2 2v8h16V8H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8 4h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"
                  transform="translate(210, 215) scale(1.0)"
                />
                {/* Tatami / Yoga Mat */}
                <path
                  d="M4 18h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2zm2-10h12v8H6V8z M8 10h8v4H8z"
                  transform="translate(300, 210) scale(1.2)"
                />

                {/* ROW 4 (y=310) - Shifted X like Row 2 */}
                {/* Sneaker/Shoe */}
                <path
                  d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 10v10h20v-7.5c0-4.14-3.36-7.5-7.5-7.5-1.1 0-2.14.23-3.09.64l-1.2-1.6C11.13 8.35 11.8 8 12.5 8z"
                  transform="translate(75, 300) scale(1.0)"
                />
                {/* Water Bottle */}
                <path
                  d="M16 6v2h-2v14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8H4V6h4V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h4zm-6-2h4v2h-4V4z"
                  transform="translate(165, 300) scale(0.9)"
                />
                {/* Stopwatch */}
                <path
                  d="M12 2c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                  transform="translate(255, 300) scale(1.1)"
                />
                {/* Heart/Health (Filler) */}
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  transform="translate(345, 305) scale(0.9)"
                />
              </g>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#sports-wallpaper-pattern)"
          />
        </svg>
      </div>

      {/* Preset specific visual tweaks */}
      {preset === 'vhs' && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />
      )}
      {preset === '90s' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] pointer-events-none" />
      )}
    </div>
  )
}
