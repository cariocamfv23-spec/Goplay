import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page instead of throwing 403 Forbidden
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
