import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Gift, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockDriverGoals, mockDriverRewards } from '@/lib/data'
import { toast } from 'sonner'
import { useState } from 'react'

export default function DriverRewards() {
  const navigate = useNavigate()
  const [points, setPoints] = useState(1250)

  const handleRedeem = (cost: number, title: string) => {
    if (points >= cost) {
      setPoints((prev) => prev - cost)
      toast.success('Recompensa resgatada!', {
        description: `Você resgatou: ${title}`,
      })
    } else {
      toast.error('Pontos insuficientes', {
        description: `Você precisa de mais ${cost - points} pontos.`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 p-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Recompensas do Motorista</h1>
      </div>

      <Card className="bg-primary text-primary-foreground border-none shadow-lg mb-8">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-gold fill-gold" />
          </div>
          <p className="text-sm opacity-90 mb-1">Seus Pontos</p>
          <h2 className="text-4xl font-black tracking-tight">{points}</h2>
          <p className="text-xs mt-2 opacity-75">
            Complete metas para ganhar mais pontos
          </p>
        </CardContent>
      </Card>

      <h2 className="font-bold text-lg mb-4">Metas da Semana</h2>
      <div className="space-y-4 mb-8">
        {mockDriverGoals.map((goal) => (
          <Card key={goal.id} className="shadow-sm border-none bg-secondary/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg text-primary">
                    <goal.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{goal.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Ganhe +{goal.rewardPoints} pts
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <Progress
                value={(goal.current / goal.target) * 100}
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="font-bold text-lg mb-4">Resgatar Prêmios</h2>
      <div className="grid grid-cols-2 gap-4">
        {mockDriverRewards.map((reward) => (
          <Card key={reward.id} className="overflow-hidden shadow-sm">
            <div className="h-24 bg-muted">
              <img
                src={reward.image}
                className="w-full h-full object-cover"
                alt={reward.title}
              />
            </div>
            <CardContent className="p-3">
              <h3 className="font-bold text-sm leading-tight mb-1">
                {reward.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {reward.cost} pts
              </p>
              <Button
                size="sm"
                className="w-full h-8 text-xs font-bold"
                variant={points >= reward.cost ? 'default' : 'outline'}
                disabled={points < reward.cost}
                onClick={() => handleRedeem(reward.cost, reward.title)}
              >
                {points >= reward.cost ? 'Resgatar' : 'Bloqueado'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
