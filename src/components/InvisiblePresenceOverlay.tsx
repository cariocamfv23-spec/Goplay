import { useEffect, useState } from 'react'
import { useInvisiblePresenceStore } from '@/stores/useInvisiblePresenceStore'
import { cn } from '@/lib/utils'

export function InvisiblePresenceOverlay() {
  const { isVisible, message, hide } = useInvisiblePresenceStore()
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // Total duration: 5 seconds
      // Start fade out animation at 4 seconds
      const fadeOutTimer = setTimeout(() => {
        setFadingOut(true)
      }, 4000)

      // Complete dismissal and reset state at 5 seconds
      const dismissTimer = setTimeout(() => {
        hide()
        setFadingOut(false)
      }, 5000)

      return () => {
        clearTimeout(fadeOutTimer)
        clearTimeout(dismissTimer)
      }
    }
  }, [isVisible, hide])

  if (!isVisible || !message) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center px-8 transition-all duration-1000',
        'bg-background/95 backdrop-blur-3xl supports-[backdrop-filter]:bg-background/80',
        fadingOut ? 'opacity-0' : 'animate-in fade-in zoom-in-95 duration-1000',
      )}
      aria-live="polite"
      role="status"
    >
      <div className="max-w-lg text-center mx-auto relative">
        {/* Decorative elements to enhance the 'invisible/ethereal' feel */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-[80px] animate-pulse" />

        <p className="relative z-10 text-xl md:text-3xl font-light leading-relaxed text-foreground tracking-wide italic font-sans opacity-90">
          "{message}"
        </p>

        <div className="mt-8 flex justify-center opacity-0 animate-in fade-in delay-1000 duration-1000">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>
    </div>
  )
}
