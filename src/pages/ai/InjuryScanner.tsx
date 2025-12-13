import { Button } from '@/components/ui/button'
import { ArrowLeft, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function InjuryScanner() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="p-4 flex items-center justify-between sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-red-500" /> Scanner Biométrico
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="relative w-full max-w-sm aspect-[3/4] bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
          {/* Body Outline Mock */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <img
              src="https://img.usecurling.com/i?q=human%20body%20silhouette&color=white&shape=outline"
              alt="Body Silhouette"
              className="h-3/4 w-auto object-contain"
            />
          </div>

          {/* Scanning Line */}
          {scanning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
          )}

          {/* Results Overlay */}
          {!scanning && (
            <div className="absolute inset-0 p-6 flex flex-col justify-between animate-fade-in bg-black/40 backdrop-blur-sm">
              <div className="self-end">
                <div className="bg-green-500/20 border border-green-500 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Ombros OK
                </div>
              </div>

              <div className="self-start mt-20">
                <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="h-3 w-3" /> Joelho Direito
                </div>
                <p className="text-[10px] text-zinc-300 mt-1 max-w-[120px] bg-black/60 p-1 rounded">
                  Sobrecarga detectada. Risco moderado de tendinite.
                </p>
              </div>

              <div className="mt-auto bg-zinc-900/90 border border-zinc-700 p-4 rounded-xl">
                <h3 className="font-bold mb-2">Análise Concluída</h3>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-zinc-400">Fadiga Muscular</span>
                  <span className="text-yellow-500 font-bold">Moderada</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-yellow-500" />
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Ver Exercícios Preventivos
                </Button>
              </div>
            </div>
          )}
        </div>

        {scanning && (
          <p className="mt-6 text-zinc-400 animate-pulse">
            Analisando biomecânica...
          </p>
        )}
      </div>
    </div>
  )
}
