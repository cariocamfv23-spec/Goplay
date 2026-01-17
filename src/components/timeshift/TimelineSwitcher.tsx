import { useTimeShiftStore, TimelineType } from '@/stores/useTimeShiftStore'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TimelineSwitcher() {
  const { timeline, setTimeline, isPlaying, togglePlay } = useTimeShiftStore()

  const timelines: { id: TimelineType; label: string; color: string }[] = [
    { id: 'real', label: 'Real', color: 'bg-zinc-500' },
    { id: 'almost', label: 'Quase', color: 'bg-orange-500' },
    { id: 'ideal', label: 'Ideal', color: 'bg-emerald-500' },
  ]

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Timeline Tabs */}
      <div className="flex p-1 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 w-full relative">
        {timelines.map((t) => {
          const isActive = timeline === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTimeline(t.id)}
              className={cn(
                'flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all relative z-10',
                isActive ? 'text-white' : 'text-white/50 hover:text-white/80',
              )}
            >
              {t.label}
              {isActive && (
                <motion.div
                  layoutId="active-timeline-indicator"
                  className={cn(
                    'absolute inset-0 rounded-full z-[-1] opacity-80',
                    t.color,
                  )}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 border-white/10 bg-black/20 text-white hover:bg-white/10 hover:text-white"
          onClick={() => {
            // Reset logic could go here
            const video = document.querySelector('video')
            if (video) video.currentTime = 0
          }}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className={cn(
            'rounded-full h-16 w-16 shadow-lg transition-transform hover:scale-105',
            timeline === 'real'
              ? 'bg-zinc-600 hover:bg-zinc-500'
              : timeline === 'almost'
                ? 'bg-orange-500 hover:bg-orange-400'
                : 'bg-emerald-500 hover:bg-emerald-400',
          )}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 fill-current" />
          ) : (
            <Play className="h-8 w-8 fill-current ml-1" />
          )}
        </Button>
      </div>
    </div>
  )
}
