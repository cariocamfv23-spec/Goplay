import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Scan,
  Target,
  Zap,
  Shield,
  Info,
  MapPin,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AppIcon } from '@/components/AppIcon'

export default function ArenaMode() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col font-sans">
      {/* Camera Feed Mock */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/600/1000?q=soccer%20field%20pov&dpr=2"
          alt="AR View"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />

        {/* AR Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20 [transform:perspective(1000px)_rotateX(20deg)] pointer-events-none" />
      </div>

      {/* AR Virtual Elements - Field Lines & Goals */}
      {!scanning && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[30%] left-[10%] w-[80%] h-[40%] border-4 border-primary/30 rounded-[40px] transform rotate-x-60 animate-pulse"></div>
          <div className="absolute top-[20%] left-[40%] w-[20%] h-[10%] border-2 border-gold/40 rounded-full animate-bounce delay-700"></div>
        </div>
      )}

      {/* AR Overlays (HUD) */}
      {!scanning && (
        <>
          <div className="absolute top-1/4 left-8 z-10 animate-fade-in duration-700">
            <div className="relative group">
              <div className="absolute -inset-2 border border-primary/50 rounded-full animate-ping opacity-50" />
              <div className="bg-black/70 backdrop-blur-md border border-primary/50 p-3 rounded-xl text-white text-xs shadow-[0_0_15px_rgba(var(--primary),0.4)]">
                <div className="flex items-center gap-2 font-bold text-primary mb-1 uppercase tracking-wide">
                  <Target className="h-3 w-3" /> 92% Precisão
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=30"
                    className="w-6 h-6 rounded-full border border-white/20"
                  />
                  <p className="font-medium">Lucas Oliveira</p>
                </div>
              </div>
              <div className="w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
            </div>
          </div>

          <div className="absolute top-1/3 right-8 z-10 animate-fade-in delay-300 duration-700">
            <div className="relative">
              <div className="bg-black/70 backdrop-blur-md border border-red-500/50 p-3 rounded-xl text-white text-xs shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                <div className="flex items-center gap-2 font-bold text-red-500 mb-1 uppercase tracking-wide">
                  <Zap className="h-3 w-3" /> Cansaço Alto
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=31"
                    className="w-6 h-6 rounded-full border border-white/20"
                  />
                  <p className="font-medium">Marcos Silva</p>
                </div>
              </div>
              <div className="w-0.5 h-12 bg-gradient-to-b from-red-500/50 to-transparent mx-auto" />
            </div>
          </div>
        </>
      )}

      {/* HUD UI Header */}
      <div className="relative z-20 flex-1 flex flex-col p-4">
        <div className="flex justify-between items-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 rounded-full backdrop-blur-md bg-black/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center">
            <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/30 text-xs text-white flex items-center gap-2 shadow-lg">
              <AppIcon className="w-4 h-4" />
              <span className="font-bold tracking-widest text-primary">
                ARENA MODE
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full backdrop-blur-md bg-black/20"
          >
            <Info className="h-6 w-6" />
          </Button>
        </div>

        {/* Center Scanner Reticle */}
        <div className="flex-1 flex items-center justify-center pointer-events-none">
          <div
            className={`relative w-72 h-72 border border-white/10 rounded-2xl transition-all duration-700 ease-out ${scanning ? 'scale-100 opacity-100' : 'scale-110 opacity-30'}`}
          >
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary shadow-[0_0_10px_hsl(var(--primary))]" />

            {scanning && (
              <div className="absolute inset-0 bg-primary/5 animate-pulse flex items-center justify-center backdrop-blur-sm rounded-2xl">
                <div className="flex flex-col items-center gap-4">
                  <Scan className="h-16 w-16 text-primary animate-spin-slow" />
                  <span className="text-primary font-mono text-xs animate-pulse">
                    ESCANEANDO CAMPO...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-2 text-primary mb-2 group-hover:scale-105 transition-transform">
              <Target className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Posse de Bola
              </span>
            </div>
            <div className="text-3xl font-black text-white">58%</div>
            <div className="w-full bg-white/10 h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[58%] shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>
          </div>
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl hover:border-blue-400/50 transition-colors group">
            <div className="flex items-center gap-2 text-blue-400 mb-2 group-hover:scale-105 transition-transform">
              <Shield className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Defesa
              </span>
            </div>
            <div className="text-3xl font-black text-white">Ótima</div>
            <div className="w-full bg-white/10 h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full w-[85%] shadow-[0_0_10px_#60a5fa]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
