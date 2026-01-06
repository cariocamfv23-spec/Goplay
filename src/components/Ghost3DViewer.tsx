import { cn } from '@/lib/utils'
import { Video } from 'lucide-react'

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
        'relative w-full h-full bg-black overflow-hidden rounded-xl',
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
            <img
              src={videoSrc}
              alt="Original Footage"
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">
              <Video className="w-12 h-12 mb-2 opacity-50" />
            </div>
          )}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white z-10">
            ORIGINAL
          </div>
        </div>

        {/* GHOST 3D LAYER */}
        <div
          className={cn(
            'relative transition-all duration-500 bg-indigo-950/30 overflow-hidden',
            mode === 'original' ? 'w-0 h-0 opacity-0' : 'w-full h-full',
            mode === 'split' && 'h-1/2 md:h-full md:w-1/2',
          )}
        >
          {/* 3D Scene Container */}
          <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
            <div
              className={cn(
                'relative w-64 h-64 transform-style-3d transition-transform duration-2000 ease-in-out',
                isPlaying
                  ? 'animate-[camera-orbit_10s_linear_infinite]'
                  : 'rotate-x-[20deg] rotate-y-[30deg]',
              )}
            >
              {/* Floor Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-[size:20px_20px] transform rotate-x-90 translate-z-[-50px] w-[200%] h-[200%] -left-1/2 -top-1/2 opacity-50" />

              {/* Low Poly Character (Abstract Cubes) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-style-3d">
                {/* Torso */}
                <div
                  className={cn(
                    'absolute w-12 h-16 bg-indigo-500 border border-indigo-400 transform -translate-x-1/2 -translate-y-1/2 transition-transform',
                    isPlaying && 'animate-[bounce_0.5s_infinite_alternate]',
                  )}
                >
                  <div className="absolute inset-0 bg-indigo-600 transform translate-z-[-10px]" />
                </div>

                {/* Head */}
                <div
                  className={cn(
                    'absolute w-8 h-8 bg-indigo-300 border border-indigo-200 -top-12 left-1/2 transform -translate-x-1/2 transition-transform',
                    isPlaying && 'animate-[head-bob_1s_infinite_ease-in-out]',
                  )}
                />

                {/* Arms (Simulated with simple divs) */}
                <div
                  className={cn(
                    'absolute w-4 h-12 bg-indigo-600 -left-6 top-0 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[arm-swing_0.8s_infinite_alternate]'
                      : 'rotate-12',
                  )}
                />
                <div
                  className={cn(
                    'absolute w-4 h-12 bg-indigo-600 -right-6 top-0 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[arm-swing_0.8s_infinite_alternate-reverse]'
                      : '-rotate-12',
                  )}
                />

                {/* Legs */}
                <div
                  className={cn(
                    'absolute w-4 h-14 bg-indigo-700 left-1 top-16 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[leg-run_0.6s_infinite_alternate]'
                      : 'rotate-6',
                  )}
                />
                <div
                  className={cn(
                    'absolute w-4 h-14 bg-indigo-700 right-1 top-16 origin-top transition-transform',
                    isPlaying
                      ? 'animate-[leg-run_0.6s_infinite_alternate-reverse]'
                      : '-rotate-6',
                  )}
                />

                {/* Ball */}
                <div
                  className={cn(
                    'absolute w-6 h-6 bg-white border-2 border-black rounded-sm bottom-[-60px] left-10 transition-all',
                    isPlaying && 'animate-[ball-move_2s_infinite_linear]',
                  )}
                />
              </div>

              {/* Trajectory Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none transform translate-z-[20px] opacity-60">
                <path
                  d="M 20,100 Q 60,60 100,80 T 180,120"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className={cn(isPlaying && 'animate-pulse')}
                />
              </svg>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-indigo-600/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white z-10 border border-indigo-400/30">
            GHOST PLAY AI
          </div>

          {/* Retro UI Overlay */}
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-indigo-300 opacity-70">
            CAM_01: TRACKING
            <br />
            POLY_COUNT: 124
            <br />
            FPS: 60
          </div>
        </div>
      </div>
    </div>
  )
}
