import { useNostalgiaStore, NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import { SportsPatternPaths } from '@/components/SportsPatternPaths'

interface SportsWallpaperProps {
  className?: string
}

export function SportsWallpaper({ className }: SportsWallpaperProps) {
  const { isEnabled, preset } = useNostalgiaStore()

  if (!isEnabled) return null

  // Styles configuration based on preset to ensure consistency with user story
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
          opacity: 0.15,
          color: 'text-primary',
          bg: 'bg-white dark:bg-zinc-950', // Cleaner base for 90s pop
          blendMode: 'mix-blend-normal',
        }
      case 'cassette':
        return {
          opacity: 0.08,
          color: 'text-zinc-600 dark:text-zinc-400',
          bg: 'bg-[#f4f4f4] dark:bg-[#1a1a1a]', // Plastic grey feel
          blendMode: 'mix-blend-multiply dark:mix-blend-screen',
        }
      case 'retro':
        return {
          opacity: 0.12,
          color: 'text-amber-900/60 dark:text-amber-100/40',
          bg: 'bg-[#fdfbf7] dark:bg-[#1c1917]', // Cream/Sepia tone
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
          opacity: 0.08,
          color: 'text-black dark:text-white',
          bg: 'bg-zinc-200 dark:bg-zinc-900', // Monochrome
          blendMode: 'mix-blend-overlay',
        }
      case 'digital':
        return {
          opacity: 0.2,
          color: 'text-green-500',
          bg: 'bg-black',
          blendMode: 'mix-blend-screen',
        }
      case 'analog':
        return {
          opacity: 0.1,
          color: 'text-[#5c4a3d] dark:text-[#d6c4b0]',
          bg: 'bg-[#e8e0d5] dark:bg-[#2a2622]', // Warm paper
          blendMode: 'mix-blend-multiply dark:mix-blend-soft-light',
        }
      case 'polaroid':
        return {
          opacity: 0.08,
          color: 'text-[#2b2b2b] dark:text-[#e0e0e0]',
          bg: 'bg-[#fafafa] dark:bg-[#121212]', // Clean photo paper
          blendMode: 'mix-blend-multiply dark:mix-blend-overlay',
        }
      case 'grain':
        return {
          opacity: 0.12,
          color: 'text-black dark:text-white',
          bg: 'bg-zinc-400 dark:bg-zinc-800',
          blendMode: 'mix-blend-overlay',
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
              <SportsPatternPaths />
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none" />
      )}
    </div>
  )
}
