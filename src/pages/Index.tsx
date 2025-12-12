import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLoader } from '@/components/PageLoader'

export default function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate initial app loading / splash screen time
    const timer = setTimeout(() => {
      // Check if user has seen onboarding (mock logic)
      const hasSeenOnboarding = localStorage.getItem(
        'goplay_has_seen_onboarding',
      )

      if (hasSeenOnboarding) {
        // If logged in (mock), go to home, else login
        const userType = localStorage.getItem('userType')
        if (userType) {
          navigate('/home')
        } else {
          navigate('/login')
        }
      } else {
        navigate('/onboarding')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return <PageLoader />
}
