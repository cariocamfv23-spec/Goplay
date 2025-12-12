import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockPointsHistory } from '@/lib/data'
import {
  ArrowLeft,
  Trophy,
  ShoppingBag,
  TrendingUp,
  History,
  Star,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'

export default function MyPoints() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-primary text-white pb-10 rounded-b-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://img.usecurling.com/p/800/800?q=abstract%20purple%20waves')] bg-cover opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold">Meus Pontos</h1>
        </div>

        <div className="flex flex-col items-center justify-center pt-8 relative z-10">
          <div className="relative mb-4">
            <div className="h-32 w-32 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-[pulse_3s_ease-in-out_infinite]">
              <Trophy className="h-16 w-16 text-gold drop-shadow-lg" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-primary">
              Nível 12
            </div>
          </div>
          <h2 className="text-5xl font-black tracking-tighter mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
            1.250
          </h2>
          <p className="text-white/80 font-medium uppercase tracking-widest text-xs">
            Goplay Points
          </p>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-20 space-y-6">
        {/* Actions Card */}
        <Card className="border-none shadow-lg bg-card">
          <CardContent className="p-4 grid grid-cols-2 gap-4">
            <Button
              className="h-auto flex-col py-4 bg-secondary/50 hover:bg-secondary text-foreground border border-border/50"
              variant="ghost"
              onClick={() => navigate('/marketplace')}
            >
              <ShoppingBag className="h-6 w-6 text-primary mb-2" />
              <span className="font-bold text-sm">Trocar Pontos</span>
              <span className="text-[10px] text-muted-foreground">
                Ir para Loja
              </span>
            </Button>
            <Button
              className="h-auto flex-col py-4 bg-secondary/50 hover:bg-secondary text-foreground border border-border/50"
              variant="ghost"
            >
              <TrendingUp className="h-6 w-6 text-green-500 mb-2" />
              <span className="font-bold text-sm">Ranking</span>
              <span className="text-[10px] text-muted-foreground">
                Ver Posição
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Progress to Next Level */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold">Próximo Nível</span>
            <span className="text-xs text-muted-foreground">
              250 pts restantes
            </span>
          </div>
          <Progress value={85} className="h-3 bg-secondary" />
          <p className="text-xs text-muted-foreground mt-2">
            Desbloqueie o emblema "Lenda do Esporte" ao atingir 1.500 pontos.
          </p>
        </div>

        {/* History */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <History className="h-5 w-5" /> Histórico
          </h3>
          <div className="space-y-3">
            {mockPointsHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center',
                      item.type === 'earned'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-red-100 text-red-500',
                    )}
                  >
                    {item.type === 'earned' ? (
                      <Star className="h-5 w-5" />
                    ) : (
                      <ShoppingBag className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'font-bold text-sm',
                    item.type === 'earned' ? 'text-green-600' : 'text-red-500',
                  )}
                >
                  {item.points > 0 ? '+' : ''}
                  {item.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
