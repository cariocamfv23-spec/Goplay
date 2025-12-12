import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useBrandingStore from '@/stores/useBrandingStore'

const Index = () => {
  const navigate = useNavigate()
  const { logoUrl } = useBrandingStore()

  useEffect(() => {
    // Splash screen timeout - giving enough time for branding perception
    const timer = setTimeout(() => {
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
      {/* Premium Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Animated Logo Container */}
      <div className="relative z-10 animate-fade-in-up duration-1000 flex flex-col items-center">
        <div className="p-8 rounded-[2rem] bg-background/30 backdrop-blur-2xl border border-white/10 shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-500">
          <img
            src={logoUrl}
            alt="Goplay App"
            className="w-40 h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Loading Indicator */}
        <div className="h-1 w-32 bg-secondary/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-purple-400 to-gold w-1/2 animate-[shimmer_1.5s_infinite_linear]" />
        </div>
      </div>

      <div className="absolute bottom-10 text-xs font-medium text-muted-foreground/60 tracking-widest">
        GOPLAY APP V1.0
      </div>
    </div>
  )
}

export default Index
