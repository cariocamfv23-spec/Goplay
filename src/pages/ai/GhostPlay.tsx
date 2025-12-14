import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Box,
  Layers,
  Video,
  Pause,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function GhostPlay() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30)
  const [viewMode, setViewMode] = useState<'normal' | 'ghost'>('ghost')

  return (
    <div className="min-h-screen bg-black text-white flex flex-col animate-fade-in font-sans">
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
          <h1 className="text-lg font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">
            <Box className="h-5 w-5 text-gold" /> Ghost Play 3D
          </h1>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
            Reconstrução Espacial
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'text-white hover:bg-white/10 rounded-full transition-colors',
            viewMode === 'ghost' ? 'bg-primary/20 text-primary' : '',
          )}
          onClick={() => setViewMode(viewMode === 'ghost' ? 'normal' : 'ghost')}
        >
          <Layers className="h-6 w-6" />
        </Button>
      </div>

      {/* 3D Viewer Area */}
      <div className="flex-1 relative bg-gradient-to-b from-zinc-900 to-black overflow-hidden flex items-center justify-center">
        {/* Mock 3D Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom animate-pulse duration-[10s]" />

        {/* Mock Players (3D effect) */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          {/* The "Ghost" Effect */}
          <div
            className={cn(
              'relative transition-all duration-700 w-full h-full',
              viewMode === 'ghost'
                ? 'opacity-90 mix-blend-screen filter brightness-125 contrast-125 grayscale'
                : 'opacity-100',
            )}
          >
            <img
              src="https://img.usecurling.com/p/800/800?q=3d%20soccer%20player%20wireframe%20running&color=cyan"
              alt="3D Simulation"
              className="w-full h-full object-contain"
            />
            {viewMode === 'ghost' && (
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay" />
            )}
          </div>

          {/* Ghost Trail */}
          {viewMode === 'ghost' && (
            <div className="absolute top-0 left-4 w-full h-full opacity-30 mix-blend-screen pointer-events-none blur-sm">
              <img
                src="https://img.usecurling.com/p/800/800?q=3d%20soccer%20player%20wireframe%20running&color=purple"
                alt="Ghost Trail"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[60px] animate-pulse" />
        </div>

        {/* Overlay Info */}
        <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
          <Badge
            variant="outline"
            className="text-gold border-gold/50 bg-gold/10 backdrop-blur-sm"
          >
            Câmera Tática
          </Badge>
          <Badge
            variant="outline"
            className="text-white border-white/20 bg-black/40 backdrop-blur-sm"
          >
            Velocidade: {isPlaying ? '1.0x' : '0.0x'}
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-zinc-950 border-t border-white/10 p-6 pb-8 space-y-6">
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

        <div className="flex items-center justify-center gap-8">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            onClick={() => setProgress(0)}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-[0_0_30px_hsl(var(--primary)/0.4)] border border-white/20 transition-transform active:scale-95"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 fill-current text-white" />
            ) : (
              <Play className="h-8 w-8 ml-1 fill-current text-white" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button
            variant="ghost"
            className="text-xs text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            Ponto de Vista
          </Button>
          <Button
            variant="ghost"
            className="text-xs text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            Mapa de Calor
          </Button>
          <Button
            variant="ghost"
            className="text-xs text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            Estatísticas
          </Button>
        </div>
      </div>
    </div>
  )
}
