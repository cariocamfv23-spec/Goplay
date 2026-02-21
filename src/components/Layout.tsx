import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from '@/components/TopBar'
import { BottomNav } from '@/components/BottomNav'
import { RankingAlertManager } from '@/components/RankingAlertManager'
import { SmartNotificationManager } from '@/components/SmartNotificationManager'
import { ScholarshipAlertManager } from '@/components/ScholarshipAlertManager'
import { WeatherAlertManager } from '@/components/WeatherAlertManager'
import { LiveStreamManager } from '@/components/LiveStreamManager'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { SportsWallpaper } from '@/components/SportsWallpaper'
import { useNostalgiaStore } from '@/stores/useNostalgiaStore'
import { useEffect, useRef, useState } from 'react'
import { useInvisiblePresenceStore } from '@/stores/useInvisiblePresenceStore'
import { InvisiblePresenceOverlay } from '@/components/InvisiblePresenceOverlay'
import { useDepthStore } from '@/stores/useDepthStore'

export default function Layout() {
  const location = useLocation()
  const { isEnabled, preset } = useNostalgiaStore()
  const { isEnabled: isDepthEnabled, intensity: depthIntensity } =
    useDepthStore()
  const { initializeSession } = useInvisiblePresenceStore()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  // Initialize invisible presence logic (Silent Latent Trigger)
  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  // Parallax Effect Handler - Listens to the main container scroll
  useEffect(() => {
    if (!isDepthEnabled) {
      setScrollY(0)
      return
    }

    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrollY(container.scrollTop)
    }

    // Add listener to the scroll container
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [isDepthEnabled])

  // Apply Global Theme Classes to Body
  useEffect(() => {
    const root = document.body
    // Remove all nostalgia classes
    root.classList.remove(
      'theme-nostalgia-vhs',
      'theme-nostalgia-90s',
      'theme-nostalgia-retro',
      'theme-nostalgia-pele',
      'theme-nostalgia-ali',
      'theme-nostalgia-cassette',
      'theme-nostalgia-digital',
      'theme-nostalgia-analog',
    )

    if (isEnabled) {
      if (preset === 'vhs') {
        root.classList.add('theme-nostalgia-vhs')
      } else if (preset === '90s') {
        root.classList.add('theme-nostalgia-90s')
      } else if (preset === 'retro') {
        root.classList.add('theme-nostalgia-retro')
      } else if (preset === 'pele') {
        root.classList.add('theme-nostalgia-pele')
      } else if (preset === 'ali') {
        root.classList.add('theme-nostalgia-ali')
      } else if (preset === 'cassette') {
        root.classList.add('theme-nostalgia-cassette')
      } else if (preset === 'digital') {
        root.classList.add('theme-nostalgia-digital')
      } else if (preset === 'analog') {
        root.classList.add('theme-nostalgia-retro') // Reuse retro for analog
      }
    }

    return () => {
      root.classList.remove(
        'theme-nostalgia-vhs',
        'theme-nostalgia-90s',
        'theme-nostalgia-retro',
        'theme-nostalgia-pele',
        'theme-nostalgia-ali',
        'theme-nostalgia-cassette',
        'theme-nostalgia-digital',
        'theme-nostalgia-analog',
      )
    }
  }, [isEnabled, preset])

  const isMessageRoute =
    location.pathname.includes('/messages/') &&
    location.pathname !== '/messages'

  const isMoveRoute = location.pathname === '/move'

  return (
    <div className="h-screen w-full bg-background font-sans antialiased flex flex-col relative overflow-hidden transition-colors duration-500 perspective-2000">
      {/* 3D Parallax Background Layer - Fixed to Viewport (Absolute to Container) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          transform: isDepthEnabled
            ? `translateY(${scrollY * 0.1 * depthIntensity}px)`
            : 'none',
          transition: 'transform 0.1s linear',
        }}
      >
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--foreground)_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Layer 2: Illustrated Sports Wallpaper (Background Layer) */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          transform: isDepthEnabled
            ? `translateY(${scrollY * 0.05 * depthIntensity}px)`
            : 'none', // Slight parallax for wallpaper
        }}
      >
        <SportsWallpaper className="z-0" />
      </div>

      {/* Global Alert Managers */}
      <RankingAlertManager />
      <SmartNotificationManager />
      <ScholarshipAlertManager />
      <WeatherAlertManager />
      <LiveStreamManager />

      {/* Invisible Presence Overlay - Z-200 to be above everything when active */}
      <InvisiblePresenceOverlay />

      {/* Layer 1: Mandatory Graphic Frame (Foreground Overlay) */}
      <div className="fixed inset-0 pointer-events-none z-[100] w-full h-full overflow-hidden">
        <NostalgiaFilter forceEnable={isEnabled} />
      </div>

      {/* Scrollable Content Container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          'flex-1 w-full relative z-10 scroll-smooth no-scrollbar',
          // Disable vertical overflow on Move route to let the page handle snap scrolling
          isMoveRoute ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden',
        )}
      >
        {/* Main Navigation - Sticky to ensure visibility during scroll */}
        <div className="sticky top-0 z-50 depth-element translate-z-10">
          <TopBar />
        </div>

        {/* Content Area */}
        {/* Ensure main is z-10 to sit above the wallpaper (z-0) */}
        <main
          className={cn(
            'flex-1 w-full pb-24 md:pb-0 transition-all duration-300 relative bg-transparent transform-style-3d',
            // On Move route, remove padding to allow full immersive experience behind nav
            isMoveRoute && 'h-[calc(100vh-64px)] pb-0',
          )}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation - Fixed at bottom of Outer Container - Outside of Scroll View */}
      {!isMessageRoute && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-50 depth-element translate-z-20">
          <BottomNav />
        </div>
      )}

      {/* Toast Container */}
      <Toaster />
    </div>
  )
}
