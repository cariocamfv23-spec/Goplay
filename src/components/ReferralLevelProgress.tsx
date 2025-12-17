import { referralLevels } from '@/lib/data'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle2, Lock } from 'lucide-react'

interface ReferralLevelProgressProps {
  currentReferrals: number
}

export function ReferralLevelProgress({
  currentReferrals,
}: ReferralLevelProgressProps) {
  const currentLevelIndex = referralLevels.findIndex((level, index) => {
    const nextLevel = referralLevels[index + 1]
    return (
      currentReferrals >= level.minReferrals &&
      (!nextLevel || currentReferrals < nextLevel.minReferrals)
    )
  })

  const currentLevel = referralLevels[currentLevelIndex]
  const nextLevel = referralLevels[currentLevelIndex + 1]

  const calculateProgress = () => {
    if (!nextLevel) return 100
    const totalNeeded = nextLevel.minReferrals - currentLevel.minReferrals
    const currentProgress = currentReferrals - currentLevel.minReferrals
    return Math.min(Math.round((currentProgress / totalNeeded) * 100), 100)
  }

  const progress = calculateProgress()

  return (
    <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-12 w-12 rounded-full flex items-center justify-center bg-secondary shadow-sm',
                currentLevel.color
                  .replace('text-', 'bg-')
                  .replace('600', '100'),
              )}
            >
              <currentLevel.icon
                className={cn('h-6 w-6', currentLevel.color)}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                Nível Atual
              </p>
              <h3 className={cn('text-xl font-black', currentLevel.color)}>
                {currentLevel.name}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-foreground">
              {currentReferrals}
            </span>
            <p className="text-xs text-muted-foreground font-medium">
              Indicações
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
            <span className="text-muted-foreground">Progresso</span>
            {nextLevel ? (
              <span className="text-primary">
                {nextLevel.minReferrals - currentReferrals} para{' '}
                {nextLevel.name}
              </span>
            ) : (
              <span className="text-primary">Nível Máximo!</span>
            )}
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm font-bold text-muted-foreground flex items-center gap-2">
            Benefícios do Nível {currentLevel.name}:
          </p>
          <div className="grid gap-2">
            {currentLevel.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm bg-secondary/40 p-2 rounded-lg"
              >
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
            {nextLevel && (
              <div className="flex items-center gap-2 text-sm bg-muted/30 p-2 rounded-lg opacity-60 border border-dashed border-border">
                <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">
                  Próximo: {nextLevel.benefits[0]}...
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
