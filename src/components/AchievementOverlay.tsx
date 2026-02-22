import { useEffect, useState } from 'react'
import { useAchievementStore } from '@/stores/useAchievementStore'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Trophy, Star, Sparkles } from 'lucide-react'
import useSoundStore from '@/stores/useSoundStore'

export function AchievementOverlay() {
  const { recentlyUnlocked, clearRecentlyUnlocked } = useAchievementStore()
  const [open, setOpen] = useState(false)
  const { playSound } = useSoundStore()

  useEffect(() => {
    if (recentlyUnlocked) {
      setOpen(true)
      // @ts-expect-error - Expected dynamic sound type
      playSound('notification_store')
    }
  }, [recentlyUnlocked, playSound])

  const handleOpenChange = (v: boolean) => {
    setOpen(v)
    if (!v) {
      setTimeout(clearRecentlyUnlocked, 300)
    }
  }

  if (!recentlyUnlocked) return null

  const rarityConfig = {
    common: {
      bg: 'from-slate-400 to-slate-600',
      text: 'text-slate-100',
      border: 'border-slate-400',
    },
    rare: {
      bg: 'from-blue-400 to-cyan-600',
      text: 'text-cyan-100',
      border: 'border-cyan-400',
    },
    epic: {
      bg: 'from-purple-500 to-pink-600',
      text: 'text-fuchsia-100',
      border: 'border-fuchsia-400',
    },
    legendary: {
      bg: 'from-yellow-400 via-yellow-500 to-orange-500',
      text: 'text-yellow-100',
      border: 'border-yellow-400',
      shiny: true,
    },
  }

  const config = rarityConfig[recentlyUnlocked.rarity] || rarityConfig.common
  const Icon = recentlyUnlocked.icon || Trophy

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          'sm:max-w-md border-0 bg-transparent shadow-none p-0 overflow-visible',
          config.shiny && 'animate-pulse',
        )}
      >
        <DialogTitle className="sr-only">Conquista Desbloqueada</DialogTitle>
        <DialogDescription className="sr-only">
          {recentlyUnlocked.description}
        </DialogDescription>

        <div className="relative flex flex-col items-center justify-center p-8 animate-in zoom-in-90 duration-500">
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-20 blur-3xl rounded-full',
              config.bg,
            )}
          />

          <div
            className={cn(
              'relative w-full overflow-hidden rounded-3xl border-2 p-8 text-center bg-black/90 backdrop-blur-xl shadow-2xl',
              config.border,
            )}
          >
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-b opacity-20',
                config.bg,
              )}
            />

            {config.shiny && (
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer" />
            )}

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Nova Conquista
              </span>

              <div
                className={cn(
                  'w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl border-4',
                  'bg-gradient-to-br',
                  config.bg,
                  config.border,
                )}
              >
                <Icon className="w-12 h-12 text-white drop-shadow-md" />
              </div>

              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                {recentlyUnlocked.name}
              </h2>

              <p className="text-white/80 text-sm mb-6 max-w-[250px] mx-auto">
                {recentlyUnlocked.description}
              </p>

              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="font-bold text-white">
                  +{recentlyUnlocked.reward.points} Pts
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
