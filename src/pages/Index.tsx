import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { AppIcon } from '@/components/AppIcon'
import { ArrowRight, Trophy, Users, Activity } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NostalgiaShowcase } from '@/components/NostalgiaShowcase'
import { cn } from '@/lib/utils'

export default function Index() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Background with improved performance */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 grayscale mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://img.usecurling.com/p/1000/1000?q=stadium%20lights&color=black')",
          }}
        />

        {/* Animated ambient blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[100px] pointer-events-none animate-pulse [animation-duration:4000ms]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse [animation-duration:5000ms]" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="home" className="flex-1 flex flex-col">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50 backdrop-blur-sm border border-border/50">
              <TabsTrigger value="home" className="font-semibold">
                Início
              </TabsTrigger>
              <TabsTrigger value="nostalgia" className="font-semibold">
                Modo Nostalgia
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="home"
            className="flex-1 flex flex-col outline-none animate-in fade-in slide-in-from-bottom-4 duration-500 data-[state=inactive]:hidden"
          >
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
              {/* Logo & Icon Section */}
              <div className="relative group cursor-default">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-[hsl(var(--gold)/0.3)] rounded-full blur-xl opacity-70 animate-pulse group-hover:opacity-100 transition-opacity duration-500" />
                <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-border/10 shadow-2xl relative transform transition-transform group-hover:scale-105 duration-500">
                  <AppIcon className="w-20 h-20 drop-shadow-md" />
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
                <p className="text-sm text-muted-foreground leading-relaxed">
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
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors duration-300"
                  >
                    <item.icon className="w-5 h-5 text-gold" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto pt-8 space-y-3">
              <Button
                size="lg"
                className="w-full h-14 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group"
                onClick={() => navigate('/login')}
              >
                Entrar no Goplay
                <ArrowRight className="w-5 h-5 ml-2 opacity-80 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-base font-bold rounded-2xl border-2 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-[1.02] active:scale-95"
                onClick={() => navigate('/register')}
              >
                Criar conta
              </Button>

              <div className="flex justify-center gap-4 pt-4 text-[10px] text-muted-foreground">
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
          </TabsContent>

          <TabsContent
            value="nostalgia"
            className="flex-1 flex flex-col outline-none animate-in fade-in zoom-in-95 duration-500 data-[state=inactive]:hidden"
          >
            <NostalgiaShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
