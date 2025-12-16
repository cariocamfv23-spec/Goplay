import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'
import { WeatherAlertManager } from './WeatherAlertManager'

export default function Layout() {
  const location = useLocation()

  // Define paths where BottomNav should be hidden
  const hideBottomNavPaths = [
    '/messages/', // Hide on chat rooms (except list)
    '/ai/motion-analysis', // Hide on immersive motion analysis page
    '/ai/avatar', // Hide on immersive AI Avatar page
  ]

  const shouldHideBottomNav = hideBottomNavPaths.some(
    (path) =>
      location.pathname.includes(path) &&
      (path === '/messages/' ? location.pathname !== '/messages' : true),
  )

  // Hide TopBar on immersive pages
  const shouldHideTopBar =
    location.pathname === '/move' ||
    location.pathname === '/ai/motion-analysis' ||
    location.pathname === '/ai/avatar' ||
    location.pathname === '/profile/passport'

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {!shouldHideTopBar && <TopBar />}
      <WeatherAlertManager />
      <main className={`flex-1 w-full ${!shouldHideBottomNav ? 'pb-16' : ''}`}>
        <Outlet />
      </main>
      {!shouldHideBottomNav && <BottomNav />}
    </div>
  )
}
