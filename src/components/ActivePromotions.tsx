import { Promotion } from '@/lib/referral-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Gift, Sparkles, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow, isWithinInterval, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ActivePromotionsProps {
  promotions: Promotion[]
}

export function ActivePromotions({ promotions }: ActivePromotionsProps) {
  const activePromotions = promotions.filter((promo) => {
    const now = new Date()
    const start = new Date(promo.startDate)
    const end = new Date(promo.endDate)
    return isWithinInterval(now, { start, end })
  })

  if (activePromotions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-gold" />
          Promoções Ativas
        </h3>
        <Badge variant="outline" className="bg-primary/5 border-primary/20">
          {activePromotions.length} disponível(is)
        </Badge>
      </div>

      <div className="grid gap-4">
        {activePromotions.map((promo) => {
          const endDate = new Date(promo.endDate)
          const timeLeft = formatDistanceToNow(endDate, {
            locale: ptBR,
            addSuffix: false,
          })

          return (
            <Card
              key={promo.id}
              className="border-none overflow-hidden relative group"
            >
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-r opacity-10 group-hover:opacity-15 transition-opacity',
                  promo.color,
                )}
              />
              <div
                className={cn(
                  'absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b',
                  promo.color,
                )}
              />

              <CardContent className="p-5 relative z-10">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-[10px] px-1.5 py-0 h-5 bg-gradient-to-r text-white border-0 font-bold tracking-wider',
                          promo.color,
                        )}
                      >
                        TEMPORADA
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Termina em {timeLeft}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg leading-tight">
                      {promo.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {promo.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center min-w-[80px] bg-background/50 backdrop-blur-sm rounded-xl p-2 border border-border/50 shadow-sm">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      Bônus
                    </span>
                    <div className="flex items-center gap-0.5 text-primary">
                      <span className="text-xl font-black">
                        +{promo.bonusPoints}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-primary">
                      PTS
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground bg-secondary/30 p-2 rounded-lg">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span>
                    Válido de{' '}
                    {new Date(promo.startDate).toLocaleDateString('pt-BR')} até{' '}
                    {new Date(promo.endDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
