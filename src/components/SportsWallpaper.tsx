import { useNostalgiaStore, NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import { SportsPatternPaths } from '@/components/SportsPatternPaths'
import { useLocation } from 'react-router-dom'

interface SportsWallpaperProps {
  className?: string
}

export function SportsWallpaper({ className }: SportsWallpaperProps) {
  const { isEnabled, preset } = useNostalgiaStore()
  const location = useLocation()

  // Exclusion Rule: Hide on "Nostalgia" menu/function pages (e.g. Retrospective)
  // Also implicitly hidden on pages where this component is not mounted,
  // but explicitly checking route here adds an extra safety layer.
  if (location.pathname.includes('/retrospective')) {
    return null
  }

  if (!isEnabled) return null

  // Styles configuration based on preset to ensure consistency with user story
  // Adapts visual style (colors and aesthetic) to match the selected "Modo Nostalgia"
  const getWallpaperStyles = (preset: NostalgiaPreset) => {
    switch (preset) {
      case 'vhs':
        // VHS: Glitchy, dark, digital noise aesthetic
        return {
          opacity: 0.08,
          color: 'text-green-500/50',
          bg: 'bg-zinc-900',
          blendMode: 'mix-blend-overlay',
          animation: 'animate-pulse',
        }
      case 'cassette':
        // Cassette: Plastic texture, high contrast, warm darks
        return {
          opacity: 0.1,
          color: 'text-zinc-600 dark:text-zinc-400',
          bg: 'bg-[#f4f4f4] dark:bg-[#1a1a1a]',
          blendMode: 'mix-blend-multiply dark:mix-blend-screen',
          animation: '',
        }
      case '90s':
        // 90s: Pop colors, vibrant, playful
        return {
          opacity: 0.15,
          color: 'text-primary',
          bg: 'bg-white dark:bg-zinc-950',
          blendMode: 'mix-blend-normal',
          animation: '',
        }
      case 'retro':
        // Retro: Sepia, classic camera
        return {
          opacity: 0.12,
          color: 'text-amber-900/60 dark:text-amber-100/40',
          bg: 'bg-[#fdfbf7] dark:bg-[#1c1917]',
          blendMode: 'mix-blend-multiply dark:mix-blend-overlay',
          animation: '',
        }
      case 'pele':
        // 80s Soccer: Green/Yellow/Gold aesthetics
        return {
          opacity: 0.15,
          color: 'text-green-800 dark:text-yellow-400',
          bg: 'bg-yellow-50 dark:bg-green-950/40',
          blendMode: 'mix-blend-multiply dark:mix-blend-screen',
          animation: '',
        }
      case 'ali':
        // Vintage Boxing: Monochrome, high contrast
        return {
          opacity: 0.1,
          color: 'text-black dark:text-white',
          bg: 'bg-zinc-200 dark:bg-zinc-900',
          blendMode: 'mix-blend-overlay',
          animation: '',
        }
      case 'digital':
        // Digital: Matrix/Terminal style
        return {
          opacity: 0.2,
          color: 'text-green-500',
          bg: 'bg-black',
          blendMode: 'mix-blend-screen',
          animation: 'animate-pulse',
        }
      case 'analog':
        // Analog: Warm, film grain
        return {
          opacity: 0.1,
          color: 'text-[#5c4a3d] dark:text-[#d6c4b0]',
          bg: 'bg-[#e8e0d5] dark:bg-[#2a2622]',
          blendMode: 'mix-blend-multiply dark:mix-blend-soft-light',
          animation: '',
        }
      default:
        // Fallback
        return {
          opacity: 0.05,
          color: 'text-foreground',
          bg: 'bg-background',
          blendMode: 'mix-blend-normal',
          animation: '',
        }
    }
  }

  const styles = getWallpaperStyles(preset)

  return (
    <div
      className={cn(
        'fixed inset-0 z-0 pointer-events-none w-full h-full transition-all duration-700 overflow-hidden',
        styles.bg,
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-all duration-700',
          styles.color,
          styles.blendMode,
          styles.animation,
        )}
        style={{ opacity: styles.opacity }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="sports-wallpaper-pattern"
              x="0"
              y="0"
              width="340"
              height="340"
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

      {/* Preset specific visual overlays/tweaks for immersive experience */}
      {preset === 'vhs' && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />
      )}
      {preset === '90s' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none" />
      )}
    </div>
  )
}
