import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Activity,
  Dumbbell,
  PlayCircle,
  TrendingUp,
  Brain,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AiCoach() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20 animate-fade-in">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-4 sticky top-0 bg-zinc-950 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" /> Coach IA
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Real-time Feedback Card */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <div className="aspect-video relative bg-black">
            <img
              src="https://img.usecurling.com/p/600/400?q=athlete%20running%20skeleton&dpr=2"
              className="w-full h-full object-cover opacity-60"
              alt="Skeleton Analysis"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-lg border border-primary/30">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase">
                  Feedback em Tempo Real
                </span>
              </div>
              <p className="font-semibold">
                "Aumente a passada e corrija a postura do tronco."
              </p>
            </div>
          </div>
          <CardContent className="p-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
              <PlayCircle className="mr-2 h-5 w-5" /> Iniciar Nova Análise
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Evolution */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gold" /> Evolução Semanal
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-zinc-400 text-xs uppercase">Técnica</span>
              <div className="text-2xl font-bold text-green-500 mt-1">+12%</div>
              <div className="h-1 w-full bg-zinc-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-green-500" />
              </div>
            </div>
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="text-zinc-400 text-xs uppercase">Força</span>
              <div className="text-2xl font-bold text-primary mt-1">+5%</div>
              <div className="h-1 w-full bg-zinc-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Drills */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-white" /> Treinos Recomendados
          </h3>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="h-12 w-12 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                  <PlayCircle className="h-6 w-6 text-zinc-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Correção de Postura</h4>
                  <p className="text-xs text-zinc-400">
                    10 min • Baixa Intensidade
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
