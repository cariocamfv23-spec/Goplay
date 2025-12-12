import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import useBrandingStore from '@/stores/useBrandingStore'

const Onboarding = () => {
  const navigate = useNavigate()
  const { logoUrl } = useBrandingStore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-background animate-fade-in relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full flex justify-end relative z-10 pt-4">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/login')}
        >
          Pular
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md w-full relative z-10 space-y-8">
        <div className="p-8 rounded-full bg-background/30 backdrop-blur-xl border border-white/10 shadow-2xl animate-float">
          <img
            src={logoUrl}
            alt="Goplay App"
            className="h-28 w-auto object-contain drop-shadow-xl"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Seu esporte, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              sua paixão.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed px-4">
            Conecte-se com atletas, clubes e profissionais. Encontre eventos,
            vagas e eleve seu jogo para o próximo nível.
          </p>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 pb-8 relative z-10">
        <Button
          className="w-full h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]"
          onClick={() => navigate('/register')}
        >
          Começar agora
        </Button>
        <Button
          variant="outline"
          className="w-full h-14 rounded-full text-lg font-semibold border-border/60 hover:bg-secondary/50 transition-all"
          onClick={() => navigate('/login')}
        >
          Já tenho uma conta
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
