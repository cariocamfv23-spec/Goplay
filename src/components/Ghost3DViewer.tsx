import { cn } from '@/lib/utils'
import { Video, Box, Layers, Play } from 'lucide-react'

export type GhostViewMode = 'original' | 'split' | 'ghost'

interface Ghost3DViewerProps {
  videoSrc: string | null
  mode: GhostViewMode
  isPlaying: boolean
  className?: string
}

export function Ghost3DViewer({
  videoSrc,
  mode,
  isPlaying,
  className,
}: Ghost3DViewerProps) {
  return (
    <div
      className={cn(
        'relative w-full h-full bg-black overflow-hidden rounded-xl shadow-inner border border-zinc-800',
        className,
      )}
    >
      {/* Container Layout based on Mode */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-500 flex',
          mode === 'split' ? 'flex-col md:flex-row' : 'flex-col',
        )}
      >
        {/* ORIGINAL VIDEO LAYER */}
        <div
          className={cn(
            'relative transition-all duration-500 overflow-hidden bg-zinc-900',
            mode === 'ghost' ? 'w-0 h-0 opacity-0' : 'w-full h-full',
            mode === 'split' &&
              'h-1/2 md:h-full md:w-1/2 border-b md:border-b-0 md:border-r border-zinc-800',
          )}
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              className="w-full h-full object-cover opacity-90"
              autoPlay={isPlaying}
              loop
              muted
              playsInline
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 bg-zinc-900">
              <Video className="w-12 h-12 mb-2 opacity-30" />
              <span className="text-xs font-medium opacity-50">
                Sem vídeo original
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white z-10 border border-white/10 flex items-center gap-1.5">
            <Video className="w-3 h-3" />
            ORIGINAL
          </div>
        </div>

        {/* GHOST 3D LAYER */}
        <div
          className={cn(
            'relative transition-all duration-500 bg-[#0f0f1a] overflow-hidden',
            mode === 'original' ? 'w-0 h-0 opacity-0' : 'w-full h-full',
            mode === 'split' && 'h-1/2 md:h-full md:w-1/2',
          )}
        >
          {/* 3D Scene Container */}
          <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
            <div
              className={cn(
                'relative w-64 h-64 transform-style-3d transition-transform duration-1000 ease-in-out',
                isPlaying
                  ? 'animate-[camera-orbit_12s_linear_infinite]'
                  : 'rotate-x-[20deg] rotate-y-[30deg]',
              )}
            >
              {/* Floor Grid - Tron Style */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.3)_1px,transparent_1px)] bg-[size:40px_40px] transform rotate-x-90 translate-z-[-50px] w-[300%] h-[300%] -left-[100%] -top-[100%] opacity-40" />

              {/* Low Poly Character (Abstract Cubes) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-style-3d">
                {/* Torso */}
                <div
                  className={cn(
                    'absolute w-12 h-16 bg-primary border border-primary-foreground/20 transform -translate-x-1/2 -translate-y-1/2 transition-transform shadow-[0_0_15px_hsl(var(--primary)/0.5)]',
                    isPlaying && 'animate-[bounce_0.5s_infinite_alternate]',
                  )}
                >
                  <div className="absolute inset-0 bg-white/10 transform translate-z-[5px]" />
                </div>

                {/* Head */}
                <div
                  className={cn(
                    'absolute w-8 h-8 bg-indigo-300 border border-indigo-200 -top-12 left-1/2 transform -translate-x-1/2 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.5)]',
                    isPlaying && 'animate-[head-bob_1s_infinite_ease-in-out]',
                  )}
                />

                {/* Arms (Simulated with simple divs) */}
                <div
                  className={cn(
                    'absolute w-4 h-12 bg-indigo-500 -left-6 top-0 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[arm-swing_0.8s_infinite_alternate]'
                      : 'rotate-12',
                  )}
                />
                <div
                  className={cn(
                    'absolute w-4 h-12 bg-indigo-500 -right-6 top-0 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[arm-swing_0.8s_infinite_alternate-reverse]'
                      : '-rotate-12',
                  )}
                />

                {/* Legs */}
                <div
                  className={cn(
                    'absolute w-4 h-14 bg-indigo-600 left-1 top-16 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[leg-run_0.6s_infinite_alternate]'
                      : 'rotate-6',
                  )}
                />
                <div
                  className={cn(
                    'absolute w-4 h-14 bg-indigo-600 right-1 top-16 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[leg-run_0.6s_infinite_alternate-reverse]'
                      : '-rotate-6',
                  )}
                />

                {/* Ball */}
                <div
                  className={cn(
                    'absolute w-6 h-6 bg-yellow-400 border border-yellow-200 rounded-sm bottom-[-60px] left-10 transition-all shadow-[0_0_20px_hsl(var(--gold))]',
                    isPlaying && 'animate-[ball-move_2s_infinite_linear]',
                  )}
                />
              </div>

              {/* Trajectory Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none transform translate-z-[20px] opacity-80">
                <path
                  d="M 20,100 Q 60,60 100,80 T 180,120"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  className={cn(isPlaying && 'animate-pulse')}
                />
              </svg>
            </div>
          </div>

          <div className="absolute top-3 right-3 bg-primary/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary z-10 border border-primary/20 flex items-center gap-1.5">
            <Box className="w-3 h-3" />
            3D REPLAY
          </div>

          {/* Retro UI Overlay */}
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-indigo-300 opacity-60 pointer-events-none">
            AI_TRACKING: ACTIVE
            <br />
            NODES: 24/24
            <br />
            LATENCY: 12ms
          </div>
        </div>
      </div>
    </div>
  )
}
