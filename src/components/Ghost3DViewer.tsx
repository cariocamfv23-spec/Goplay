import { cn } from '@/lib/utils'
import { Video, Box, Cuboid } from 'lucide-react'
import { useMemo } from 'react'

export type GhostViewMode = 'original' | 'split' | 'ghost'

interface Ghost3DViewerProps {
  videoSrc: string | null
  mode: GhostViewMode
  isPlaying: boolean
  className?: string
  sport?: string
}

export function Ghost3DViewer({
  videoSrc,
  mode,
  isPlaying,
  className,
  sport = 'futebol',
}: Ghost3DViewerProps) {
  // Determine asset based on sport
  const assetUrl = useMemo(() => {
    const s = sport.toLowerCase()
    let query = 'trophy'
    if (s.includes('futebol') || s.includes('soccer') || s.includes('futsal'))
      query = 'soccer-ball'
    else if (s.includes('basket') || s.includes('basquete'))
      query = 'basketball'
    else if (s.includes('tenis') || s.includes('tennis')) query = 'tennis-ball'
    else if (s.includes('volei') || s.includes('volley')) query = 'volleyball'
    else if (s.includes('americano') || s.includes('football'))
      query = 'american-football'

    // Using 'multicolor' for high-fidelity 3D sprite feel
    return `https://img.usecurling.com/i?q=${query}&color=multicolor`
  }, [sport])

  return (
    <div
      className={cn(
        'relative w-full h-full bg-black overflow-hidden',
        className,
      )}
    >
      {/* Container Layout based on Mode */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-700 flex ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          mode === 'split' ? 'flex-col md:flex-row' : 'flex-col',
        )}
      >
        {/* ORIGINAL VIDEO LAYER */}
        <div
          className={cn(
            'relative transition-all duration-700 overflow-hidden bg-zinc-950',
            mode === 'ghost' ? 'w-0 h-0 opacity-0' : 'w-full h-full',
            mode === 'split' &&
              'h-1/2 md:h-full md:w-1/2 border-b md:border-b-0 md:border-r border-white/10',
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
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900">
              <Video className="w-12 h-12 mb-2 opacity-30" />
              <span className="text-xs font-medium opacity-50">
                Aguardando vídeo...
              </span>
            </div>
          )}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white/90 z-10 border border-white/10 flex items-center gap-1.5 shadow-sm">
            <Video className="w-3 h-3" />
            ORIGINAL
          </div>
        </div>

        {/* PREMIUM 3D VIEWPORT LAYER */}
        <div
          className={cn(
            'relative transition-all duration-700 bg-black overflow-hidden perspective-[1200px]',
            mode === 'original' ? 'w-0 h-0 opacity-0' : 'w-full h-full',
            mode === 'split' && 'h-1/2 md:h-full md:w-1/2',
          )}
        >
          {/* Advanced Lighting: Skybox & Environment */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#11111f] to-[#1a1a2e]" />

          {/* Dynamic Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* 3D Scene Container */}
          <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
            <div
              className={cn(
                'relative w-80 h-80 transform-style-3d transition-transform duration-[2000ms] ease-linear',
                isPlaying
                  ? 'animate-[camera-orbit_20s_linear_infinite]'
                  : 'rotate-x-[25deg] rotate-y-[35deg]',
              )}
            >
              {/* Premium Floor: Grid + Reflection + Glow */}
              <div
                className="absolute inset-0 transform rotate-x-90 translate-z-[-80px] w-[300%] h-[300%] -left-[100%] -top-[100%]"
                style={{
                  background: `
                    linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                    radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)
                  `,
                  backgroundSize: '60px 60px, 60px 60px, 100% 100%',
                  maskImage:
                    'radial-gradient(circle at 50% 50%, black 30%, transparent 70%)',
                }}
              />

              {/* Character: High-Fidelity Hologram Ghost */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-style-3d">
                {/* Hologram Base Glow */}
                <div className="absolute bottom-[-75px] left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/30 rounded-full blur-xl transform rotate-x-90" />

                {/* Player Model Construction (Stylized Abstract Humanoid) */}
                <div
                  className={cn(
                    'relative transform-style-3d transition-transform duration-500',
                    isPlaying && 'animate-[float_3s_ease-in-out_infinite]',
                  )}
                >
                  {/* Head */}
                  <div className="absolute -top-[90px] left-1/2 -translate-x-1/2 w-12 h-14 bg-gradient-to-tr from-indigo-400 to-indigo-600 rounded-2xl opacity-90 shadow-[0_0_20px_rgba(99,102,241,0.6)] border border-indigo-300/50 backdrop-blur-md transform-style-3d">
                    <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                  </div>

                  {/* Torso */}
                  <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 w-20 h-28 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl opacity-80 shadow-[0_0_30px_rgba(59,130,246,0.4)] border border-blue-400/30 transform-style-3d">
                    {/* Cybernetic Spine Line */}
                    <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-1 bg-white/40 blur-[1px]" />
                  </div>

                  {/* Dynamic Limbs - Simulated with simpler shapes for performance but high style */}
                  {/* Left Arm */}
                  <div
                    className={cn(
                      'absolute -top-[60px] -left-[20px] w-6 h-24 bg-indigo-500/80 rounded-full origin-top transform-style-3d',
                      isPlaying
                        ? 'animate-[arm-swing_1s_infinite_alternate]'
                        : 'rotate-12',
                    )}
                  />
                  {/* Right Arm */}
                  <div
                    className={cn(
                      'absolute -top-[60px] -right-[20px] w-6 h-24 bg-indigo-500/80 rounded-full origin-top transform-style-3d',
                      isPlaying
                        ? 'animate-[arm-swing_1s_infinite_alternate-reverse]'
                        : '-rotate-12',
                    )}
                  />

                  {/* Left Leg */}
                  <div
                    className={cn(
                      'absolute top-[30px] left-1 w-7 h-28 bg-indigo-700/80 rounded-full origin-top transform-style-3d',
                      isPlaying
                        ? 'animate-[leg-run_0.8s_infinite_alternate]'
                        : 'rotate-6',
                    )}
                  />
                  {/* Right Leg */}
                  <div
                    className={cn(
                      'absolute top-[30px] right-1 w-7 h-28 bg-indigo-700/80 rounded-full origin-top transform-style-3d',
                      isPlaying
                        ? 'animate-[leg-run_0.8s_infinite_alternate-reverse]'
                        : '-rotate-6',
                    )}
                  />
                </div>

                {/* Realistic 3D Asset: Sports Object */}
                <div
                  className={cn(
                    'absolute w-16 h-16 bottom-[-100px] left-16 transition-all duration-[2000ms] transform-style-3d',
                    isPlaying && 'animate-[ball-orbit_3s_infinite_linear]',
                  )}
                >
                  {/* Sprite Billboard - Always facing camera simulation or rotating with logic */}
                  <img
                    src={assetUrl}
                    alt="Sport Object"
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] filter contrast-125 saturate-150 animate-[spin_4s_linear_infinite]"
                  />
                  {/* Ball Shadow */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-black/60 blur-md rounded-full transform rotate-x-90 scale-y-50" />
                </div>
              </div>

              {/* Trajectory Visualization - 3D Curve */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none transform translate-z-[10px] overflow-visible opacity-60 mix-blend-screen">
                <defs>
                  <linearGradient
                    id="trace-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <path
                  d="M 40,240 Q 120,100 240,160"
                  fill="none"
                  stroke="url(#trace-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={cn(isPlaying && 'animate-pulse')}
                  filter="drop-shadow(0 0 8px rgba(99,102,241,0.8))"
                />
              </svg>
            </div>
          </div>

          {/* Premium UI Overlay */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-lg text-[10px] font-bold text-indigo-300 z-10 border border-indigo-500/30 flex items-center gap-2 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            3D LIVE VIEW
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/50 pointer-events-none tracking-widest z-10">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2">
                <Cuboid className="w-3 h-3" /> MESH: HIGH_POLY
              </span>
              <span>LIGHTING: RAY_TRACE_SIM</span>
              <span>PHYSICS: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
