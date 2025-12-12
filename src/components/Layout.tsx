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
  const isMove = path === '/move' // Move usually has its own fullscreen layout, but spec says Global Layout Structure. We can adapt.

  // Spec says: "Top App Bar... visible when navigating deeper".
  // Let's hide TopBar on Splash and Auth.
  const showTopBar = !isSplash && !isAuth && !isMove

  // Bottom Nav visible on main tabs
  const showBottomNav = !isSplash && !isAuth

  return (
    <main className="flex flex-col min-h-screen bg-background relative">
      {showTopBar && <TopBar />}

      <div className={`flex-1 ${showBottomNav ? 'pb-16' : ''}`}>
        <Outlet />
      </div>

      {showBottomNav && <BottomNav />}
    </main>
  )
}
