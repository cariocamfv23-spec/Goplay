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
  if (location.pathname.includes('/retrospective')) {
    return null
  }

  // Determine styles based on state (Global vs Nostalgia)
  const getWallpaperStyles = (preset: NostalgiaPreset, enabled: boolean) => {
    // Standard Mode (Global Update): High visibility, vibrant, distinct brand identity
    if (!enabled) {
      return {
        opacity: 0.08, // Increased for better visibility (was 0.05 or hidden)
        color: 'text-violet-600 dark:text-violet-400', // Vibrant Brand Purple
        bg: 'bg-background', // Clean base
        blendMode: 'mix-blend-normal',
        animation: '',
      }
    }

    // Nostalgia Modes: Enhanced for clarity and saturation
    switch (preset) {
      case 'vhs':
        return {
          opacity: 0.15, // Boosted from 0.08
          color: 'text-emerald-500', // Saturated Green
          bg: 'bg-zinc-900',
          blendMode: 'mix-blend-overlay',
          animation: 'animate-pulse',
        }
      case 'cassette':
        return {
          opacity: 0.18, // Boosted from 0.1
          color: 'text-zinc-700 dark:text-zinc-300', // Stronger contrast
          bg: 'bg-[#f4f4f4] dark:bg-[#1a1a1a]',
          blendMode: 'mix-blend-multiply dark:mix-blend-screen',
          animation: '',
        }
      case '90s':
        return {
          opacity: 0.22, // Boosted from 0.15
          color: 'text-pink-500', // Vibrant Pop Pink
          bg: 'bg-white dark:bg-zinc-950',
          blendMode: 'mix-blend-normal',
          animation: '',
        }
      case 'retro':
        return {
          opacity: 0.18, // Boosted
          color: 'text-amber-800 dark:text-amber-100',
          bg: 'bg-[#fdfbf7] dark:bg-[#1c1917]',
          blendMode: 'mix-blend-multiply dark:mix-blend-overlay',
          animation: '',
        }
      case 'pele':
        return {
          opacity: 0.2, // Boosted
          color: 'text-green-700 dark:text-yellow-400',
          bg: 'bg-yellow-50 dark:bg-green-900/40',
          blendMode: 'mix-blend-multiply dark:mix-blend-screen',
          animation: '',
        }
      case 'ali':
        return {
          opacity: 0.15,
          color: 'text-black dark:text-white', // Max contrast
          bg: 'bg-zinc-200 dark:bg-zinc-900',
          blendMode: 'mix-blend-overlay',
          animation: '',
        }
      case 'digital':
        return {
          opacity: 0.25,
          color: 'text-green-500',
          bg: 'bg-black',
          blendMode: 'mix-blend-screen',
          animation: 'animate-pulse',
        }
      case 'analog':
        return {
          opacity: 0.15,
          color: 'text-[#5c4a3d] dark:text-[#d6c4b0]',
          bg: 'bg-[#e8e0d5] dark:bg-[#2a2622]',
          blendMode: 'mix-blend-multiply dark:mix-blend-soft-light',
          animation: '',
        }
      default:
        return {
          opacity: 0.1,
          color: 'text-primary',
          bg: 'bg-background',
          blendMode: 'mix-blend-normal',
          animation: '',
        }
    }
  }

  const styles = getWallpaperStyles(preset, isEnabled)

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

      {isEnabled && preset === 'vhs' && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />
      )}
      {isEnabled && preset === '90s' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none" />
      )}
    </div>
  )
}
