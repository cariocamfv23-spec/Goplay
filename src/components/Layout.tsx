import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from '@/components/TopBar'
import { BottomNav } from '@/components/BottomNav'
import { RankingAlertManager } from '@/components/RankingAlertManager'
import { SmartNotificationManager } from '@/components/SmartNotificationManager'
import { ScholarshipAlertManager } from '@/components/ScholarshipAlertManager'
import { WeatherAlertManager } from '@/components/WeatherAlertManager'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

export default function Layout() {
  const location = useLocation()

  // Routes where we want a cleaner layout (e.g., Maps)
  const isMapRoute =
    location.pathname.includes('/map') || location.pathname.includes('/move')
  const isMessageRoute =
    location.pathname.includes('/messages/') &&
    location.pathname !== '/messages'

  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col relative">
      {/* Global Alert Managers */}
      <RankingAlertManager />
      <SmartNotificationManager />
      <ScholarshipAlertManager />
      <WeatherAlertManager />

      {/* Main Navigation */}
      <TopBar />

      {/* Content Area */}
      <main
        className={cn(
          'flex-1 w-full pb-20 md:pb-0 transition-all duration-300',
          // Add margin/padding adjustments if needed for desktop sidebar in future
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
