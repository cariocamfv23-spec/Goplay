import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { AppIcon } from '@/components/AppIcon'
import { ArrowRight, Trophy, Users, Activity } from 'lucide-react'
import { useEffect } from 'react'
import { useInvisiblePresenceStore } from '@/stores/useInvisiblePresenceStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { PageLoader } from '@/components/PageLoader'
import { SportsWallpaper } from '@/components/SportsWallpaper'

export default function Index() {
  const navigate = useNavigate()
  const { initializeSession } = useInvisiblePresenceStore()
  const { isAuthenticated, hasHydrated } = useAuthStore()

  // Initialize invisible presence logic on landing page load
  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  const handleAction = () => {
    if (isAuthenticated) {
      navigate('/home', { replace: true })
    } else {
      navigate('/login')
    }
  }

  if (!hasHydrated) {
    return <PageLoader />
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent relative overflow-hidden transition-colors duration-300">
      <SportsWallpaper />
      {/* Subtle additional background effects specifically for Index */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-background/80 z-10" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.15)] rounded-full blur-[100px] pointer-events-none animate-pulse [animation-duration:4000ms] z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[100px] pointer-events-none animate-pulse [animation-duration:5000ms] z-10" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto px-4 py-8 flex-1">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Logo & Icon Section */}
          <div className="relative group cursor-default">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-[hsl(var(--gold)/0.3)] rounded-full blur-xl opacity-70 animate-pulse group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-border/10 shadow-2xl relative transform transition-transform group-hover:scale-105 duration-500">
              {/* Enable Seasonal Elements for Landing Page Main Icon */}
              <AppIcon
                className="w-20 h-20 drop-shadow-md"
                enableSeasonal={true}
              />
            </div>
          </div>

          <div className="space-y-4 max-w-[280px]">
            <Logo variant="text" className="text-4xl justify-center" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
              O seu esporte, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">
                levado a sério.
              </span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Seu talento merece um palco do tamanho do mundo.
            </p>
          </div>

          {/* Value Props / Features Preview */}
          <div className="grid grid-cols-3 gap-3 w-full pt-4">
            {[
              { icon: Trophy, label: 'Compita' },
              { icon: Users, label: 'Conecte' },
              { icon: Activity, label: 'Evolua' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-secondary/60 border border-border/50 backdrop-blur-md hover:bg-secondary/80 transition-colors duration-300 shadow-sm"
              >
                <item.icon className="w-5 h-5 text-gold" />
                <span className="text-xs font-bold text-foreground/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-8 space-y-3 animate-in fade-in duration-1000 delay-300">
          <Button
            size="lg"
            className="w-full h-14 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group"
            onClick={handleAction}
          >
            Entrar no Goplay
            <ArrowRight className="w-5 h-5 ml-2 opacity-80 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex justify-center gap-4 pt-4 text-[10px] text-muted-foreground font-medium">
            <span className="cursor-pointer hover:text-primary transition-colors">
              Termos de Uso
            </span>
            <span>•</span>
            <span className="cursor-pointer hover:text-primary transition-colors">
              Privacidade
            </span>
            <span>•</span>
            <span className="cursor-pointer hover:text-primary transition-colors">
              Ajuda
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
