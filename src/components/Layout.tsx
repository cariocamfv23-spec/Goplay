import { Outlet, useLocation } from 'react-router-dom'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'

export default function Layout() {
  const location = useLocation()

  // Define paths where BottomNav should be hidden
  const hideBottomNavPaths = [
    '/messages/', // Hide on chat rooms (except list)
  ]

  const shouldHideBottomNav =
    hideBottomNavPaths.some(
      (path) => location.pathname.includes(path) && location.pathname !== path,
    ) || location.pathname.includes('/messages/') // Specific check for messages sub-routes

  // Hide TopBar on immersive pages like Move
  const shouldHideTopBar = location.pathname === '/move'

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {!shouldHideTopBar && <TopBar />}
      <main className="flex-1 w-full pb-16">
        <Outlet />
      </main>
      {!shouldHideBottomNav && <BottomNav />}
    </div>
  )
}
