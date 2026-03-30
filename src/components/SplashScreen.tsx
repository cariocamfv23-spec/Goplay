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
    }, 1800)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = ''
    }, 2300) // 500ms duration for fade out

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-primary/30 blur-[60px] rounded-full animate-aura-pulse-slow" />

        <img
          src="https://img.usecurling.com/p/512/512?q=goplay%20logo&color=purple"
          alt="GoPlay Logo"
          className="relative z-10 w-32 h-32 md:w-40 md:h-40 object-cover rounded-[2rem] shadow-2xl animate-float"
        />

        <h1 className="relative z-10 mt-8 text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
          Go<span className="text-[#6d28d9]">Play</span>
        </h1>

        {/* Loading Dots */}
        <div className="relative z-10 mt-12 flex items-center justify-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full bg-[#6d28d9] animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-[#6d28d9] animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-[#6d28d9] animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  )
}
