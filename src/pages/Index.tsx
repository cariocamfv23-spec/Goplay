import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLoader } from '@/components/PageLoader'

export default function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate splash screen delay and auth check
    const timer = setTimeout(() => {
      const userType = localStorage.getItem('userType')
      if (userType) {
        navigate('/home')
      } else {
        navigate('/login')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return <PageLoader />
}
