import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { PageLoader } from '@/components/PageLoader'

export function ProtectedRoute() {
  const { isAuthenticated, hasHydrated } = useAuthStore()
  const location = useLocation()

  if (!hasHydrated) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users strictly to the login screen
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
