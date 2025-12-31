import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from '@/components/TopBar'
import { BottomNav } from '@/components/BottomNav'
import { RankingAlertManager } from '@/components/RankingAlertManager'
import { SmartNotificationManager } from '@/components/SmartNotificationManager'
import { ScholarshipAlertManager } from '@/components/ScholarshipAlertManager'
import { WeatherAlertManager } from '@/components/WeatherAlertManager'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { useNostalgiaStore } from '@/stores/useNostalgiaStore'
import { useEffect } from 'react'

export default function Layout() {
  const location = useLocation()
  const { isEnabled, preset } = useNostalgiaStore()

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
    )

    if (isEnabled) {
      if (preset === 'vhs') {
        root.classList.add('theme-nostalgia-vhs')
      } else if (preset === '90s') {
        root.classList.add('theme-nostalgia-90s')
      } else if (preset === 'retro' || preset === 'analog') {
        root.classList.add('theme-nostalgia-retro')
      } else if (preset === 'pele') {
        root.classList.add('theme-nostalgia-pele')
      } else if (preset === 'ali') {
        root.classList.add('theme-nostalgia-ali')
      }
    }

    return () => {
      root.classList.remove(
        'theme-nostalgia-vhs',
        'theme-nostalgia-90s',
        'theme-nostalgia-retro',
        'theme-nostalgia-pele',
        'theme-nostalgia-ali',
      )
    }
  }, [isEnabled, preset])

  const isMessageRoute =
    location.pathname.includes('/messages/') &&
    location.pathname !== '/messages'

  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col relative overflow-hidden transition-colors duration-500">
      {/* Global Alert Managers */}
      <RankingAlertManager />
      <SmartNotificationManager />
      <ScholarshipAlertManager />
      <WeatherAlertManager />

      {/* Global Nostalgia Filter Overlay */}
      {/* z-index is set high to cover everything but allow pointer events to pass through */}
      <div className="fixed inset-0 pointer-events-none z-[100] w-full h-full overflow-hidden">
        <NostalgiaFilter forceEnable={isEnabled} />
      </div>

      {/* Main Navigation */}
      <TopBar />

      {/* Content Area */}
      <main
        className={cn(
          'flex-1 w-full pb-20 md:pb-0 transition-all duration-300',
        )}
      >
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      {!isMessageRoute && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNav />
        </div>
      )}

      {/* Toast Container */}
      <Toaster />
    </div>
  )
}
