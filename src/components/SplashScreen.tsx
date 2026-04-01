import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

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
          <img
            src="https://img.usecurling.com/p/512/512?q=purple%20letter%20g%20logo&color=purple"
            alt="GoPlay Logo"
            className="relative z-10 w-[180px] h-[180px] max-w-[180px] object-cover rounded-[2.5rem] shadow-[0_0_50px_rgba(109,40,217,0.6)] animate-float"
          />
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
