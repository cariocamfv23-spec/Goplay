import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, Play, RotateCcw, Box, Layers, Video } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export default function GhostPlay() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Box className="h-5 w-5 text-primary" /> Ghost Play 3D
          </h1>
          <span className="text-[10px] text-zinc-400">
            Reconstrução Espacial
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-full"
        >
          <Layers className="h-6 w-6" />
        </Button>
      </div>

      {/* 3D Viewer Area */}
      <div className="flex-1 relative bg-gradient-to-b from-zinc-900 to-black overflow-hidden flex items-center justify-center">
        {/* Mock 3D Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />

        {/* Mock Players (3D effect) */}
        <div className="relative w-full max-w-md aspect-square">
          <img
            src="https://img.usecurling.com/p/800/800?q=3d%20soccer%20simulation%20wireframe&color=black"
            alt="3D Simulation"
            className="w-full h-full object-contain opacity-80 mix-blend-screen animate-pulse"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Overlay Info */}
        <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
          <Badge
            variant="outline"
            className="text-primary border-primary bg-primary/10 backdrop-blur-sm"
          >
            Câmera Tática
          </Badge>
          <Badge
            variant="outline"
            className="text-white border-white/20 bg-black/40 backdrop-blur-sm"
          >
            Velocidade: 1.0x
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-zinc-900 border-t border-white/10 p-6 pb-8 space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-500">00:04:12</span>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={(vals) => setProgress(vals[0])}
          />
          <span className="text-xs font-mono text-zinc-500">00:10:00</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Box className="h-8 w-8 fill-current" />
            ) : (
              <Play className="h-8 w-8 ml-1 fill-current" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="ghost"
            className="text-xs text-zinc-400 hover:text-white hover:bg-white/5"
          >
            Ponto de Vista
          </Button>
          <Button
            variant="ghost"
            className="text-xs text-zinc-400 hover:text-white hover:bg-white/5"
          >
            Mapa de Calor
          </Button>
          <Button
            variant="ghost"
            className="text-xs text-zinc-400 hover:text-white hover:bg-white/5"
          >
            Estatísticas
          </Button>
        </div>
      </div>
    </div>
  )
}
