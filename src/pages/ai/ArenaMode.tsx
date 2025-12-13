import { Button } from '@/components/ui/button'
import { ArrowLeft, Scan, Target, Zap, Shield, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ArenaMode() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Camera Feed Mock */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/600/1000?q=soccer%20field%20pov&dpr=2"
          alt="AR View"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* AR Overlays */}
      {!scanning && (
        <>
          <div className="absolute top-1/4 left-1/4 z-10 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-primary/50 rounded-full animate-ping" />
              <div className="bg-black/60 backdrop-blur-md border border-primary/50 p-2 rounded-lg text-white text-xs">
                <div className="flex items-center gap-1 font-bold text-primary mb-1">
                  <Target className="h-3 w-3" /> 92% Precisão
                </div>
                <p>Lucas Oliveira</p>
              </div>
              <div className="w-0.5 h-8 bg-primary/50 mx-auto" />
            </div>
          </div>

          <div className="absolute top-1/3 right-1/4 z-10 animate-fade-in delay-150">
            <div className="relative">
              <div className="bg-black/60 backdrop-blur-md border border-red-500/50 p-2 rounded-lg text-white text-xs">
                <div className="flex items-center gap-1 font-bold text-red-500 mb-1">
                  <Zap className="h-3 w-3" /> Cansaço
                </div>
                <p>Marcos Silva</p>
              </div>
              <div className="w-0.5 h-8 bg-red-500/50 mx-auto" />
            </div>
          </div>
        </>
      )}

      {/* HUD UI */}
      <div className="relative z-20 flex-1 flex flex-col p-4">
        <div className="flex justify-between items-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{' '}
            AO VIVO
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full"
          >
            <Info className="h-6 w-6" />
          </Button>
        </div>

        {/* Center Scanner Reticle */}
        <div className="flex-1 flex items-center justify-center pointer-events-none">
          <div
            className={`relative w-64 h-64 border border-white/20 rounded-lg transition-all duration-500 ${scanning ? 'scale-100 opacity-100' : 'scale-110 opacity-50'}`}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

            {scanning && (
              <div className="absolute inset-0 bg-primary/5 animate-pulse flex items-center justify-center">
                <Scan className="h-12 w-12 text-primary animate-spin-slow" />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-bold uppercase">Posse de Bola</span>
            </div>
            <div className="text-2xl font-bold text-white">58%</div>
            <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[58%]" />
            </div>
          </div>
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-bold uppercase">Defesa</span>
            </div>
            <div className="text-2xl font-bold text-white">Ótima</div>
            <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full w-[85%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
