import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useBrandingStore from '@/stores/useBrandingStore'

const Index = () => {
  const navigate = useNavigate()
  const { logoUrl } = useBrandingStore()

  useEffect(() => {
    // Simulate initial app loading check
    const timer = setTimeout(() => {
      const userType = localStorage.getItem('userType')
      if (userType) {
        navigate('/home')
      } else {
        navigate('/onboarding')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background animate-fade-in relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none animate-pulse delay-75" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="p-6 rounded-3xl bg-background/50 backdrop-blur-xl border border-border/50 shadow-2xl animate-fade-in-up duration-700">
          <img
            src={logoUrl}
            alt="Goplay App"
            className="w-32 h-auto object-contain drop-shadow-lg"
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 animate-fade-in-up duration-1000 delay-300">
          <div className="h-1.5 w-32 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]"
              style={{ width: '50%' }}
            />
          </div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-2">
            Carregando
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index
