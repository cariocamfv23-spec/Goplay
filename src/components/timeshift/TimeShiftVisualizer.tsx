import { useEffect, useRef } from 'react'
import { useTimeShiftStore } from '@/stores/useTimeShiftStore'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function TimeShiftVisualizer() {
  const { timeline, sport, isPlaying } = useTimeShiftStore()
  const containerRef = useRef<HTMLDivElement>(null)

  // Gesture handling for navigation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      const { cycleTimeline } = useTimeShiftStore.getState()
      if (touchEndX < touchStartX - 50) cycleTimeline('next')
      if (touchEndX > touchStartX + 50) cycleTimeline('prev')
    }

    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const renderScene = () => {
    switch (sport) {
      case 'football':
        return <FootballScene timeline={timeline} isPlaying={isPlaying} />
      case 'martial_arts':
        return <MartialArtsScene timeline={timeline} isPlaying={isPlaying} />
      case 'swimming':
        return <SwimmingScene timeline={timeline} isPlaying={isPlaying} />
      default:
        return null
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Background Grid - Retro/Low Poly Vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform:
            'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
        }}
      />

      {/* Main Scene Content */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${sport}-${timeline}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay Info */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div
          className={cn(
            'text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 uppercase tracking-widest border',
            timeline === 'real'
              ? 'bg-zinc-500/20 border-zinc-500 text-zinc-300'
              : timeline === 'almost'
                ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                : 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
          )}
        >
          Timeline: {timeline}
        </div>
        <h3 className="text-2xl font-black text-white italic drop-shadow-lg">
          {sport === 'football' && timeline === 'real' && 'CHUTE DEFENDIDO'}
          {sport === 'football' && timeline === 'almost' && 'BOLA NA TRAVE'}
          {sport === 'football' && timeline === 'ideal' && 'GOL NO ÂNGULO'}

          {sport === 'martial_arts' && timeline === 'real' && 'BLOQUEIO TOTAL'}
          {sport === 'martial_arts' && timeline === 'almost' && 'RASPÃO'}
          {sport === 'martial_arts' && timeline === 'ideal' && 'KNOCKOUT'}

          {sport === 'swimming' && timeline === 'real' && 'SAÍDA ATRASADA'}
          {sport === 'swimming' && timeline === 'almost' && 'NO TEMPO'}
          {sport === 'swimming' && timeline === 'ideal' && 'REAÇÃO PERFEITA'}
        </h3>
      </div>
    </div>
  )
}

// --- SUB-SCENES ---

function FootballScene({
  timeline,
  isPlaying,
}: {
  timeline: string
  isPlaying: boolean
}) {
  // SVG Paths for Ball Trajectory
  const pathReal = 'M 50,350 Q 150,200 250,150' // To keeper hands
  const pathAlmost = 'M 50,350 Q 100,50 350,50' // To post
  const pathIdeal = 'M 50,350 Q 120,20 380,20' // To top corner

  const activePath =
    timeline === 'real'
      ? pathReal
      : timeline === 'almost'
        ? pathAlmost
        : pathIdeal
  const color =
    timeline === 'real'
      ? '#71717a'
      : timeline === 'almost'
        ? '#f97316'
        : '#10b981'

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-md overflow-visible"
    >
      {/* Goal Post - Abstract Wireframe */}
      <path
        d="M 50,380 L 50,50 L 350,50 L 350,380"
        fill="none"
        stroke="white"
        strokeWidth="4"
        className="opacity-80"
      />
      <path
        d="M 50,380 L 350,380"
        fill="none"
        stroke="white"
        strokeWidth="2"
        className="opacity-40"
      />

      {/* Keeper (Abstract Triangle) */}
      <motion.path
        d="M 200,300 L 230,380 L 170,380 Z"
        fill="#3b82f6"
        opacity="0.8"
        animate={
          timeline === 'real'
            ? { x: 50, y: -150, scale: 1.2 } // Jumps to save
            : timeline === 'almost'
              ? { x: 100, y: -100 } // Dives but misses
              : { x: -50, y: -50 } // Wrong side
        }
        transition={{
          duration: 1.5,
          repeat: isPlaying ? Infinity : 0,
          repeatType: 'reverse',
        }}
      />

      {/* Ball Trajectory Line */}
      <path
        d={activePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="5,5"
        className="opacity-50"
      />

      {/* The Ball */}
      <motion.circle
        r="12"
        fill="white"
        stroke={color}
        strokeWidth="3"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: isPlaying ? '100%' : '0%' }}
        style={{ offsetPath: `path("${activePath}")` }}
        transition={{
          duration: 1.5,
          ease: 'circOut',
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      />

      {/* Impact Effect */}
      {timeline === 'almost' && (
        <motion.circle
          cx="350"
          cy="50"
          r="20"
          fill="transparent"
          stroke="#f97316"
          strokeWidth="4"
          animate={{ scale: [1, 2], opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
            delay: 1.4,
          }}
        />
      )}
      {timeline === 'ideal' && (
        <motion.path
          d="M 360,30 L 390,10 L 400,40 Z"
          fill="#10b981"
          animate={{ scale: [0, 1.5], opacity: [1, 0], rotate: 360 }}
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
            delay: 1.4,
          }}
        />
      )}
    </svg>
  )
}

function MartialArtsScene({
  timeline,
  isPlaying,
}: {
  timeline: string
  isPlaying: boolean
}) {
  const color =
    timeline === 'real'
      ? '#71717a'
      : timeline === 'almost'
        ? '#f97316'
        : '#10b981'

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-md overflow-visible"
    >
      {/* Fighter A (Attacker) - Low Poly */}
      <motion.g
        animate={{ x: isPlaying ? [0, 20, 0] : 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <circle cx="100" cy="200" r="30" fill="white" opacity="0.2" />
        <path
          d="M 100,200 L 180,200"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
        />{' '}
        {/* Arm */}
        <circle cx="180" cy="200" r="15" fill={color} /> {/* Fist */}
      </motion.g>

      {/* Fighter B (Defender) */}
      <motion.g
        initial={{ x: 250 }}
        animate={
          timeline === 'real'
            ? { x: 220, rotate: -10 } // Blocks firmly
            : timeline === 'almost'
              ? { x: 240, rotate: 10 } // Stumbles back
              : { x: 300, rotate: 45, opacity: [1, 0.5] } // Knocked back
        }
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      >
        <path
          d="M 0,0 L 0,100"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
          opacity="0.5"
        />
        {timeline === 'real' && (
          <path d="M -20,20 L -20,80" stroke="#ef4444" strokeWidth="8" /> // Block visual
        )}
      </motion.g>

      {/* Impact Flash */}
      {timeline !== 'real' && (
        <motion.circle
          cx="200"
          cy="200"
          r="40"
          fill={color}
          animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
          transition={{
            duration: 0.3,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.7,
          }}
        />
      )}
    </svg>
  )
}

function SwimmingScene({
  timeline,
  isPlaying,
}: {
  timeline: string
  isPlaying: boolean
}) {
  const color =
    timeline === 'real'
      ? '#71717a'
      : timeline === 'almost'
        ? '#f97316'
        : '#10b981'

  // Y position simulates distance/advantage
  const yPos = timeline === 'real' ? 300 : timeline === 'almost' ? 200 : 100

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-md overflow-visible"
    >
      {/* Lanes */}
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="400"
        stroke="white"
        strokeWidth="2"
        opacity="0.2"
        strokeDasharray="10,10"
      />
      <line
        x1="150"
        y1="0"
        x2="150"
        y2="400"
        stroke="white"
        strokeWidth="2"
        opacity="0.2"
        strokeDasharray="10,10"
      />
      <line
        x1="250"
        y1="0"
        x2="250"
        y2="400"
        stroke="white"
        strokeWidth="2"
        opacity="0.2"
        strokeDasharray="10,10"
      />
      <line
        x1="350"
        y1="0"
        x2="350"
        y2="400"
        stroke="white"
        strokeWidth="2"
        opacity="0.2"
        strokeDasharray="10,10"
      />
      {/* Water Surface */}
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        fill="url(#water-gradient)"
        opacity="0.1"
      />
      <defs>
        <linearGradient id="water-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Ghost Swimmers (Comparison) */}
      <path
        d="M 100,400 L 100,300"
        stroke="white"
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0.1"
      />{' '}
      {/* Avg */}
      {/* Active Swimmer */}
      <motion.g
        initial={{ y: 400 }}
        animate={{ y: isPlaying ? -50 : 400 }}
        transition={{
          duration: timeline === 'real' ? 4 : timeline === 'almost' ? 3 : 2,
          ease: 'linear',
          repeat: isPlaying ? Infinity : 0,
        }}
      >
        {/* Body */}
        <path
          d="M 200,0 L 200,40"
          stroke={color}
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Wake */}
        <path
          d="M 190,40 L 180,60 M 210,40 L 220,60"
          stroke="white"
          strokeWidth="2"
          opacity="0.5"
        />
      </motion.g>
      {/* Start Signal */}
      <motion.circle
        cx="350"
        cy="350"
        r="10"
        fill={timeline === 'real' ? 'red' : 'green'}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 3,
        }}
      />
    </svg>
  )
}
