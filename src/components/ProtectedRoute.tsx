import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to the entry page (Index) instead of throwing 403 Forbidden or redirecting to /login
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}
