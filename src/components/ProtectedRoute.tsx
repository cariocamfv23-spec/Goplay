import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { PageLoader } from '@/components/PageLoader'
import { useEffect, useState } from 'react'

export function ProtectedRoute() {
  const { isAuthenticated, hasHydrated } = useAuthStore()
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (hasHydrated) {
      // Explicit loading state during authentication check to prevent flickering
      const timer = setTimeout(() => {
        setIsChecking(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [hasHydrated])

  if (!hasHydrated || isChecking) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users strictly to the opening screen
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}
