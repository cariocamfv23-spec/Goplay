import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { GoplayIcon } from '@/components/GoplayIcon'

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = 'hidden'

    // Simulate initial application load
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2000)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = ''
    }, 2500) // 500ms duration for fade out

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(hideTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500',
        // Force background color matching manifest initially
        'bg-[#ffffff] dark:bg-background',
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100',
      )}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] bg-primary/40 blur-[80px] rounded-full animate-aura-pulse-slow" />

        {/* Brand Typography */}
        <div className="animate-in zoom-in-75 fade-in duration-700">
          <h1 className="relative z-10 text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-gold drop-shadow-2xl mb-8">
            GoPlay
          </h1>
        </div>

        <div className="animate-in zoom-in-90 fade-in duration-1000 delay-150 fill-mode-both">
          <div className="relative z-10 w-[160px] h-[160px] md:w-[180px] md:h-[180px] flex items-center justify-center animate-float drop-shadow-[0_0_40px_rgba(109,40,217,0.8)]">
            <GoplayIcon className="w-full h-full" enableSeasonal={true} />
          </div>
        </div>

        {/* Loading Dots */}
        <div className="relative z-10 mt-12 flex items-center justify-center space-x-2 animate-in fade-in duration-1000 delay-300 fill-mode-both">
          <div
            className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  )
}
