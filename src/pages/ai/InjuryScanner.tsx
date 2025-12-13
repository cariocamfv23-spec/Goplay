import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, CheckCircle, Watch } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import useDeviceStore from '@/stores/useDeviceStore'
import { AppIcon } from '@/components/AppIcon'

export default function InjuryScanner() {
  const navigate = useNavigate()
  const { connectedDevice, biometrics } = useDeviceStore()

  const stressLevel = connectedDevice
    ? Math.min(100, Math.max(30, (biometrics.heartRate - 60) * 0.8))
    : 65

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20 animate-fade-in">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-4 bg-zinc-950 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <AppIcon className="h-6 w-6" /> Scanner de Risco
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {!connectedDevice && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-center gap-3">
            <Watch className="h-5 w-5 text-yellow-500" />
            <div className="flex-1">
              <p className="text-xs text-yellow-500">
                Para maior precisão, conecte seu wearable.
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-yellow-500 hover:bg-yellow-500/10 h-8"
              onClick={() => navigate('/devices')}
            >
              Conectar
            </Button>
          </div>
        )}

        <div className="relative aspect-[3/4] bg-black rounded-2xl overflow-hidden border border-zinc-800">
          <img
            src="https://img.usecurling.com/p/600/800?q=human%20anatomy%20muscle%20highlight&color=red"
            className="w-full h-full object-cover opacity-60"
            alt="Body Scan"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute top-[40%] left-[60%] w-24 h-24 bg-red-500/30 rounded-full blur-xl animate-pulse" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2 text-red-400 font-bold">
              <AlertTriangle className="h-5 w-5" /> ALERTA DE RISCO{' '}
              {stressLevel > 75 ? 'ALTO' : 'MÉDIO'}
            </div>
            <p className="text-sm text-zinc-300 mb-4">
              {connectedDevice
                ? `Frequência cardíaca de ${biometrics.heartRate} bpm indica sobrecarga metabólica combinada com impacto no joelho.`
                : 'Sobrecarga detectada no joelho direito durante a aterrissagem.'}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>
                  Nível de Stress{' '}
                  {connectedDevice ? '(Biométrico + Mecânico)' : '(Mecânico)'}
                </span>
                <span>{Math.round(stressLevel)}%</span>
              </div>
              <Progress value={stressLevel} className="h-2 bg-zinc-800" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Prevenção Recomendada</h3>
          <div className="space-y-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">
                    Fortalecimento de Quadríceps
                  </h4>
                  <p className="text-xs text-zinc-400">3 séries de 15 reps</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">
                    Alongamento de Isquiotibiais
                  </h4>
                  <p className="text-xs text-zinc-400">
                    30 segundos cada perna
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
