import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Activity,
  Dumbbell,
  PlayCircle,
  TrendingUp,
  Brain,
  Watch,
  Heart,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppIcon } from '@/components/AppIcon'
import useDeviceStore from '@/stores/useDeviceStore'
import { useEffect } from 'react'

export default function AiCoach() {
  const navigate = useNavigate()
  const { connectedDevice, biometrics, updateBiometrics } = useDeviceStore()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (connectedDevice) {
      interval = setInterval(updateBiometrics, 2000)
    }
    return () => clearInterval(interval)
  }, [connectedDevice, updateBiometrics])

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
          <AppIcon className="h-6 w-6" /> Coach IA
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Biometrics Integration Alert */}
        {!connectedDevice ? (
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Watch className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-primary">
                  Conecte seu Smartwatch
                </h3>
                <p className="text-xs text-zinc-400">
                  Obtenha dados biométricos em tempo real.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 text-xs"
              onClick={() => navigate('/devices')}
            >
              Conectar
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-3 flex flex-col justify-between h-24">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase">
                  <Heart className="h-3 w-3 text-red-500 animate-pulse" />{' '}
                  Batimentos
                </div>
                <div className="text-3xl font-bold text-white">
                  {biometrics.heartRate}{' '}
                  <span className="text-sm font-normal text-zinc-500">BPM</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-3 flex flex-col justify-between h-24">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase">
                  <Activity className="h-3 w-3 text-gold" /> Calorias
                </div>
                <div className="text-3xl font-bold text-white">
                  {biometrics.calories}{' '}
                  <span className="text-sm font-normal text-zinc-500">
                    kcal
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
                <Brain className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase">
                  Feedback em Tempo Real
                </span>
              </div>
              <p className="font-semibold">
                {connectedDevice && biometrics.heartRate > 140
                  ? 'Frequência cardíaca elevada. Respire e foque na técnica.'
                  : 'Aumente a passada e corrija a postura do tronco.'}
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
