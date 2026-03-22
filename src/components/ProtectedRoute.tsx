import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the public landing page strictly
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}
