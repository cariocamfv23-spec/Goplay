import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, Calendar, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockEvolution } from '@/lib/data'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function EvolutionMode() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold text-xl">Modo Evolução</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Timeline */}
        <div className="relative border-l-2 border-primary/30 ml-3 space-y-8 pl-6 py-4">
          {mockEvolution.map((event, index) => (
            <div
              key={index}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-primary">
                  {event.year}
                </span>
                <div className="h-px bg-border flex-1" />
              </div>
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {event.title}
                    {index === 0 && (
                      <span className="text-[10px] bg-gold text-black px-2 py-0.5 rounded-full">
                        Atual
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        VEL
                      </div>
                      <div className="font-bold text-primary">
                        {event.stats.speed}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        FOR
                      </div>
                      <div className="font-bold text-primary">
                        {event.stats.power}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        TEC
                      </div>
                      <div className="font-bold text-primary">
                        {event.stats.technique}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Motivation Card */}
        <Card className="bg-gradient-to-r from-primary to-purple-600 text-white border-none">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-gold fill-current" />
            <h3 className="font-bold text-lg">Continue Evoluindo!</h3>
            <p className="text-sm opacity-90 mb-4">
              Você está a 120 pontos de atingir o nível Elite.
            </p>
            <Button
              variant="secondary"
              className="w-full text-primary font-bold"
            >
              Ver Treinos Recomendados
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
