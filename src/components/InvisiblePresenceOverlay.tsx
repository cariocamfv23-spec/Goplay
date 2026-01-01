import { useEffect, useState } from 'react'
import { useInvisiblePresenceStore } from '@/stores/useInvisiblePresenceStore'
import { cn } from '@/lib/utils'
import { SportsPatternPaths } from '@/components/SportsPatternPaths'

export function InvisiblePresenceOverlay() {
  const { isVisible, message, hide } = useInvisiblePresenceStore()
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // Visible for exactly 4 seconds
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true)
      }, 4000)

      // Remove from DOM after fade animation (e.g., 1s duration)
      const hideTimer = setTimeout(() => {
        hide()
        setIsFadingOut(false)
      }, 5000)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [isVisible, hide])

  if (!isVisible || !message) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-1000',
        isFadingOut
          ? 'opacity-0'
          : 'opacity-100 animate-in fade-in duration-700',
      )}
      aria-live="polite"
      role="status"
    >
      {/* Subtle Texture - WhatsApp style pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect
            width="100%"
            height="100%"
            fill="currentColor"
            className="text-foreground"
          />
          <defs>
            <pattern
              id="invisible-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(12)"
            >
              <g transform="scale(0.5)">
                <SportsPatternPaths />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#invisible-pattern)" />
        </svg>
      </div>

      {/* Main Content - Minimalist, Centered */}
      <div className="relative z-10 max-w-md px-8 text-center space-y-6">
        {/* Abstract Breathing Element */}
        <div
          className="w-16 h-16 mx-auto rounded-full bg-primary/10 animate-pulse blur-2xl"
          style={{ animationDuration: '3s' }}
        />

        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-foreground/90 font-sans leading-relaxed">
          "{message}"
        </h2>

        {/* Small decorative line */}
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto rounded-full mt-8" />
      </div>
    </div>
  )
}
