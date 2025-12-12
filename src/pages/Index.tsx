import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useBrandingStore from '@/stores/useBrandingStore'

const Index = () => {
  const navigate = useNavigate()
  const { logoUrl } = useBrandingStore()

  useEffect(() => {
    // Splash screen timeout
    const timer = setTimeout(() => {
      // Check if user has visited before or is logged in (mock check)
      const hasVisited = localStorage.getItem('has_visited_onboarding')
      if (hasVisited) {
        navigate('/login')
      } else {
        navigate('/onboarding')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

      {/* Animated Logo */}
      <div className="relative z-10 animate-fade-in-up duration-1000 flex flex-col items-center">
        <div className="p-6 rounded-3xl bg-background/50 backdrop-blur-xl border border-white/10 shadow-2xl mb-6">
          <img
            src={logoUrl}
            alt="Goplay"
            className="w-32 h-auto object-contain drop-shadow-lg"
          />
        </div>
        <div className="h-1 w-24 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/2 animate-[shimmer_1s_infinite_linear]" />
        </div>
      </div>

      <div className="absolute bottom-10 text-xs text-muted-foreground/60">
        Version 1.0.0
      </div>
    </div>
  )
}

export default Index
