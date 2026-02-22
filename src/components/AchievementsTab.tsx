import { ACHIEVEMENTS } from '@/lib/achievements-data'
import { useAchievementStore } from '@/stores/useAchievementStore'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Lock, Star } from 'lucide-react'

export function AchievementsTab() {
  const { progress } = useAchievementStore()

  const rarityColors = {
    common: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
    rare: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    epic: 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20',
    legendary:
      'text-gold bg-gold/10 border-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.15)]',
  }

  const rarityLabels = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Lendário',
  }

  return (
    <div className="space-y-4 px-1 pb-4">
      {ACHIEVEMENTS.map((achievement) => {
        const userProg = progress[achievement.id] || {
          progress: 0,
          status: 'locked',
        }
        const isUnlocked = userProg.status === 'unlocked'
        const isHidden = achievement.isHidden && !isUnlocked

        const Icon = achievement.icon
        const percent = Math.min(
          100,
          Math.round((userProg.progress / achievement.target) * 100),
        )

        return (
          <Card
            key={achievement.id}
            className={cn(
              'overflow-hidden transition-all duration-300',
              isUnlocked
                ? rarityColors[achievement.rarity]
                : 'bg-secondary/30 border-dashed opacity-70 grayscale',
              isUnlocked &&
                achievement.rarity === 'legendary' &&
                'animate-[pulse_3s_ease-in-out_infinite]',
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center shrink-0',
                  isUnlocked ? 'bg-background shadow-sm' : 'bg-muted',
                )}
              >
                {isUnlocked ? (
                  <Icon className="w-6 h-6" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground opacity-50" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm truncate">
                    {isHidden ? 'Conquista Oculta' : achievement.name}
                  </h4>
                  {isUnlocked && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-background border border-current">
                      {rarityLabels[achievement.rarity]}
                    </span>
                  )}
                </div>

                <p className="text-xs opacity-80 leading-snug mb-2 line-clamp-2">
                  {isHidden
                    ? 'Continue explorando a plataforma para descobrir.'
                    : achievement.description}
                </p>

                {isUnlocked ? (
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold">
                      +{achievement.reward.points} Pontos
                    </span>
                    {achievement.reward.badge && (
                      <span className="text-[10px] bg-background px-1.5 py-0.5 rounded border border-current">
                        Badge: {achievement.reward.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span>
                        {userProg.progress} / {achievement.target}
                      </span>
                      <span>{percent}%</span>
                    </div>
                    <Progress value={percent} className="h-1.5" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
