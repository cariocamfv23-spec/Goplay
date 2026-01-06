import { cn } from '@/lib/utils'
import { Video, Box } from 'lucide-react'

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

        {/* GHOST 3D LAYER - LOW POLY AESTHETIC */}
        <div
          className={cn(
            'relative transition-all duration-500 bg-[#12121a] overflow-hidden',
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
              {/* Floor Grid - Tron/Cyber Style */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.2)_2px,transparent_2px),linear-gradient(90deg,rgba(59,130,246,0.2)_2px,transparent_2px)] bg-[size:40px_40px] transform rotate-x-90 translate-z-[-50px] w-[300%] h-[300%] -left-[100%] -top-[100%] opacity-30" />

              {/* Ground Glow */}
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl transform rotate-x-90 translate-z-[-60px] w-[200%] h-[200%] -left-[50%] -top-[50%]" />

              {/* Low Poly Character (Abstract Geometric Primitives) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-style-3d">
                {/* Torso - Solid Block */}
                <div
                  className={cn(
                    'absolute w-14 h-20 bg-blue-600 border border-blue-400/50 transform -translate-x-1/2 -translate-y-1/2 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.4)]',
                    isPlaying && 'animate-[bounce_0.5s_infinite_alternate]',
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 bg-white/10 transform translate-z-[10px]" />
                  <div className="absolute inset-0 bg-black/20 transform translate-z-[-10px]" />
                </div>

                {/* Head - Cube */}
                <div
                  className={cn(
                    'absolute w-10 h-10 bg-indigo-400 border border-indigo-200 -top-14 left-1/2 transform -translate-x-1/2 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]',
                    isPlaying && 'animate-[head-bob_1s_infinite_ease-in-out]',
                  )}
                />

                {/* Arms - Rectangular Prisms */}
                <div
                  className={cn(
                    'absolute w-5 h-16 bg-blue-500 -left-8 top-0 origin-top transition-transform border border-blue-400/30',
                    isPlaying
                      ? 'animate-[arm-swing_0.8s_infinite_alternate]'
                      : 'rotate-12',
                  )}
                />
                <div
                  className={cn(
                    'absolute w-5 h-16 bg-blue-500 -right-8 top-0 origin-top transition-transform border border-blue-400/30',
                    isPlaying
                      ? 'animate-[arm-swing_0.8s_infinite_alternate-reverse]'
                      : '-rotate-12',
                  )}
                />

                {/* Legs - Rectangular Prisms */}
                <div
                  className={cn(
                    'absolute w-6 h-20 bg-indigo-700 left-0 top-16 origin-top transition-transform border border-indigo-500/30',
                    isPlaying
                      ? 'animate-[leg-run_0.6s_infinite_alternate]'
                      : 'rotate-6',
                  )}
                />
                <div
                  className={cn(
                    'absolute w-6 h-20 bg-indigo-700 right-7 top-16 origin-top transition-transform border border-indigo-500/30',
                    isPlaying
                      ? 'animate-[leg-run_0.6s_infinite_alternate-reverse]'
                      : '-rotate-6',
                  )}
                />

                {/* Ball - Low Poly Sphere (Cube with rotation) */}
                <div
                  className={cn(
                    'absolute w-8 h-8 bg-yellow-400 border-2 border-yellow-200 bottom-[-70px] left-12 transition-all shadow-[0_0_25px_hsl(var(--gold))]',
                    isPlaying && 'animate-[ball-move_2s_infinite_linear]',
                  )}
                >
                  <div className="absolute inset-0 bg-white/20 rotate-45" />
                </div>
              </div>

              {/* Trajectory Line - Digital */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none transform translate-z-[20px] opacity-80 overflow-visible">
                <path
                  d="M 20,100 Q 60,60 100,80 T 180,120"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="4"
                  strokeDasharray="8 4"
                  strokeLinecap="square"
                  className={cn(isPlaying && 'animate-pulse')}
                  filter="drop-shadow(0 0 4px hsl(var(--gold)))"
                />
              </svg>
            </div>
          </div>

          <div className="absolute top-3 right-3 bg-indigo-600/30 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-indigo-300 z-10 border border-indigo-500/40 flex items-center gap-1.5">
            <Box className="w-3 h-3" />
            LOW-POLY 3D
          </div>

          {/* HUD Overlay */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-indigo-400/70 pointer-events-none tracking-wider">
            <div className="flex flex-col gap-0.5">
              <span>RENDER_MODE: LOW_POLY_V2</span>
              <span>POLYGONS: 124</span>
              <span>FRAME_TIME: 16ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
