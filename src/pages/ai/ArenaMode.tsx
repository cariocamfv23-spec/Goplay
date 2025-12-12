import { Button } from '@/components/ui/button'
import { ArrowLeft, Target, Scan, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export default function ArenaMode() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* AR Background Feed Simulation */}
      <img
        src="https://img.usecurling.com/p/800/1200?q=futsal%20court%20perspective"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        alt="AR View"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* AR HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header HUD */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 pointer-events-auto"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Badge
            variant="outline"
            className="bg-primary/20 text-primary border-primary animate-pulse"
          >
            <Zap className="h-3 w-3 mr-1" /> AR ATIVADO
          </Badge>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded text-right border-r-2 border-gold">
            <div className="text-[10px] text-zinc-300">PRECISÃO</div>
            <div className="text-lg font-bold text-white font-mono">92%</div>
          </div>
        </div>

        {/* Center Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Scan className="h-64 w-64 text-white/30 stroke-1" />
          <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary animate-ping" />
        </div>

        {/* AR Court Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-50">
          <path
            d="M0,500 L400,300 L800,500"
            stroke="cyan"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>

        {/* Floating Stats */}
        <div className="absolute top-1/3 right-10 flex flex-col items-end gap-2">
          <div className="bg-black/60 backdrop-blur text-white px-3 py-1 rounded-l-lg border-l-2 border-primary transform translate-x-4 animate-in slide-in-from-right duration-700">
            <span className="text-xs text-primary font-bold">DISTÂNCIA</span>
            <span className="block font-mono">12.4m</span>
          </div>
          <div className="bg-black/60 backdrop-blur text-white px-3 py-1 rounded-l-lg border-l-2 border-gold transform translate-x-4 animate-in slide-in-from-right duration-1000 delay-200">
            <span className="text-xs text-gold font-bold">ÂNGULO</span>
            <span className="block font-mono">45°</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 flex justify-center gap-6 pointer-events-auto">
        <Button className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white hover:bg-white/30 transition-all">
          <div className="h-12 w-12 rounded-full bg-red-600 animate-pulse" />
        </Button>
      </div>
    </div>
  )
}
