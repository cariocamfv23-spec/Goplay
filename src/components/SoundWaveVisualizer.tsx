import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface SoundWaveVisualizerProps {
  isPlaying: boolean
  className?: string
  barCount?: number
}

export function SoundWaveVisualizer({
  isPlaying,
  className,
  barCount = 8,
}: SoundWaveVisualizerProps) {
  const [heights, setHeights] = useState<number[]>(Array(barCount).fill(10))

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setHeights(
          Array(barCount)
            .fill(0)
            .map(() => Math.random() * 80 + 20),
        )
      }, 100)
    } else {
      setHeights(Array(barCount).fill(10))
    }

    return () => clearInterval(interval)
  }, [isPlaying, barCount])

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-[2px] h-12',
        className,
      )}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1.5 bg-gold rounded-full transition-all duration-100 ease-in-out shadow-[0_0_8px_hsl(var(--gold)/0.5)]"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}
