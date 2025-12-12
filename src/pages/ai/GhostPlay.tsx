import { Button } from '@/components/ui/button'
import { ArrowLeft, Play, Box, Camera, Video, Settings2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'

export default function GhostPlay() {
  const navigate = useNavigate()
  const [view, setView] = useState<'normal' | 'drone' | 'tactical'>('normal')
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Box className="h-5 w-5 text-primary" /> Lance Fantasma 3D
        </h1>
        <Button variant="ghost" size="icon" className="text-white">
          <Settings2 className="h-6 w-6" />
        </Button>
      </div>

      {/* 3D Viewport Simulation */}
      <div className="flex-1 relative bg-zinc-900 overflow-hidden">
        <img
          src={
            view === 'drone'
              ? 'https://img.usecurling.com/p/800/600?q=soccer%20field%20top%20view&dpr=2'
              : view === 'tactical'
                ? 'https://img.usecurling.com/p/800/600?q=soccer%20tactics%20board&dpr=2'
                : 'https://img.usecurling.com/p/800/600?q=soccer%20action%203d%20render&dpr=2'
          }
          className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'scale-105' : ''}`}
          alt="3D Replay"
        />

        {/* 3D Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary/30 rounded-full animate-pulse opacity-50" />
          <div className="absolute bottom-32 left-8 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
            <p className="text-xs text-primary font-bold">VELOCIDADE DA BOLA</p>
            <p className="text-xl font-bold">108 km/h</p>
          </div>
          <div className="absolute top-24 right-8 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
            <p className="text-xs text-gold font-bold">TRAJETÓRIA</p>
            <p className="text-xl font-bold">Curva 35°</p>
          </div>
        </div>

        {/* Camera Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
          <Button
            size="icon"
            variant={view === 'normal' ? 'default' : 'ghost'}
            className="rounded-full h-10 w-10"
            onClick={() => setView('normal')}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant={view === 'drone' ? 'default' : 'ghost'}
            className="rounded-full h-10 w-10"
            onClick={() => setView('drone')}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant={view === 'tactical' ? 'default' : 'ghost'}
            className="rounded-full h-10 w-10"
            onClick={() => setView('tactical')}
          >
            <Box className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="h-32 bg-zinc-950 border-t border-zinc-800 p-4 pb-8 z-20">
        <div className="flex items-center gap-4 mb-4">
          <Button
            size="icon"
            className="rounded-full bg-white text-black hover:bg-zinc-200"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play className={`h-5 w-5 ml-1 ${isPlaying ? 'hidden' : ''}`} />
            <div
              className={`h-4 w-4 bg-black rounded-sm ${!isPlaying ? 'hidden' : ''}`}
            />
          </Button>
          <Slider defaultValue={[33]} max={100} step={1} className="flex-1" />
          <span className="text-xs font-mono text-zinc-400">00:04 / 00:12</span>
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          >
            Exportar Vídeo 3D
          </Button>
        </div>
      </div>
    </div>
  )
}
