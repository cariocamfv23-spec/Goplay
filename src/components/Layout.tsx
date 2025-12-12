import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

export default function Layout() {
  const location = useLocation()
  const path = location.pathname

  // Routes where we typically hide the global layout elements
  const isSplash = path === '/'
  const isAuth = [
    '/login',
    '/register',
    '/onboarding',
    '/profile-selection',
  ].some((p) => path.startsWith(p))

  // Move usually has its own fullscreen layout, but spec says Global Layout Structure.
  // We keep bottom nav for easy navigation but might hide top bar or make it transparent.
  const isMove = path === '/move'

  // Spec says: "Top App Bar... visible when navigating deeper".
  const showTopBar = !isSplash && !isAuth && !isMove

  // Bottom Nav visible on main tabs
  const showBottomNav = !isSplash && !isAuth

  return (
    <main className="flex flex-col min-h-screen bg-background relative">
      {showTopBar && <TopBar />}

      {/* For MOVE page, we want it to be full screen, potentially behind bottom nav */}
      <div className={`flex-1 ${showBottomNav && !isMove ? 'pb-0' : ''}`}>
        <Outlet />
      </div>

      {showBottomNav && <BottomNav />}
    </main>
  )
}
