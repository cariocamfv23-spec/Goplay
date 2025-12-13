import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { AppIcon } from '@/components/AppIcon'

export default function Index() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://img.usecurling.com/p/1920/1080?q=sports%20stadium&color=black&dpr=2')] bg-cover bg-center opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-700">
        <div className="bg-background/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
          <AppIcon className="w-24 h-24" />
        </div>

        <div className="space-y-2">
          <Logo variant="full" className="h-12 justify-center text-3xl" />
          <p className="text-muted-foreground text-lg">
            O seu app definitivo de esportes
          </p>
        </div>

        <div className="grid gap-4 w-full mt-4">
          <Button
            size="lg"
            className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
            onClick={() => navigate('/login')}
          >
            Entrar
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-14 text-lg font-bold rounded-2xl border-2 hover:bg-accent transition-all hover:scale-[1.02]"
            onClick={() => navigate('/register')}
          >
            Criar conta
          </Button>
        </div>
      </div>
    </div>
  )
}
