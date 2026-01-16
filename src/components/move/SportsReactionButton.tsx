import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface SportsReactionButtonProps {
  modality: string
  isLiked: boolean
  likesCount: number
  onLike: () => void
  className?: string
}

const getEmoji = (modality: string) => {
  const map: Record<string, string> = {
    futebol: '⚽',
    soccer: '⚽',
    futsal: '⚽',
    basquete: '🏀',
    basketball: '🏀',
    volei: '🏐',
    volleyball: '🏐',
    tenis: '🎾',
    tennis: '🎾',
    bike: '🚴',
    cycling: '🚴',
    running: '🏃',
    crossfit: '🏋️',
    swimming: '🏊',
    boxing: '🥊',
    climbing: '🧗',
    martial_arts: '🥋',
    lutas: '🥋',
    skate: '🛹',
    surf: '🏄',
    golf: '⛳',
    baseball: '⚾',
    rugby: '🏉',
  }

  // normalize modality string
  const key = modality.toLowerCase().replace('ê', 'e').replace('ç', 'c')
  return map[key] || '🔥' // Default fallback
}

export function SportsReactionButton({
  modality,
  isLiked,
  likesCount,
  onLike,
  className,
}: SportsReactionButtonProps) {
  const [emoji, setEmoji] = useState('🔥')

  useEffect(() => {
    setEmoji(getEmoji(modality))
  }, [modality])

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <Button
        size="icon"
        variant="ghost"
        className="h-12 w-12 rounded-full bg-transparent hover:bg-transparent overflow-visible group"
        onClick={onLike}
      >
        <span
          className={cn(
            'text-4xl transition-all duration-300 filter select-none leading-none flex items-center justify-center',
            isLiked
              ? 'animate-like-bounce opacity-100 scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'
              : 'grayscale opacity-60 scale-100 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105',
          )}
          role="img"
          aria-label={`Like with ${emoji}`}
        >
          {emoji}
        </span>
      </Button>
      <span className="text-white text-xs font-bold drop-shadow-md">
        {likesCount}
      </span>
    </div>
  )
}
