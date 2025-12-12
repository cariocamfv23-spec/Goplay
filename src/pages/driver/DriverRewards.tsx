import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Gift, Trophy, History, Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockDriverGoals, mockDriverRewards } from '@/lib/data'
import { toast } from 'sonner'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface RedemptionHistory {
  id: string
  title: string
  cost: number
  date: string
  status: 'completed' | 'processing'
}

export default function DriverRewards() {
  const navigate = useNavigate()
  const [points, setPoints] = useState(1250)
  const [history, setHistory] = useState<RedemptionHistory[]>([
    {
      id: 'h1',
      title: 'Vale Combustível R$ 50',
      cost: 1000,
      date: '10 Ago 2024',
      status: 'completed',
    },
  ])

  const handleRedeem = (cost: number, title: string) => {
    if (points >= cost) {
      // Simulate API call for payment integration
      const loadingToast = toast.loading('Processando pagamento com pontos...')

      setTimeout(() => {
        setPoints((prev) => prev - cost)
        const newHistory: RedemptionHistory = {
          id: Math.random().toString(36).substr(2, 9),
          title,
          cost,
          date: 'Hoje',
          status: 'completed',
        }
        setHistory((prev) => [newHistory, ...prev])

        toast.dismiss(loadingToast)
        toast.success('Resgate Confirmado!', {
          description: `Pagamento de ${title} processado com sucesso.`,
          action: {
            label: 'Ver Extrato',
            onClick: () => console.log('View history'),
          },
        })
      }, 1500)
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
            Converta pontos em pagamentos e serviços reais.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="redeem" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="redeem" className="flex-1">
            Resgatar
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex-1">
            Metas
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="redeem">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" /> Prêmios Disponíveis
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {mockDriverRewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden shadow-sm">
                <div className="h-24 bg-muted relative">
                  <img
                    src={reward.image}
                    className="w-full h-full object-cover"
                    alt={reward.title}
                  />
                  {points >= reward.cost && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      DISPONÍVEL
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-bold text-sm leading-tight mb-1">
                    {reward.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <Wallet className="h-3 w-3" />
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
        </TabsContent>

        <TabsContent value="goals">
          <h2 className="font-bold text-lg mb-4">Metas da Semana</h2>
          <div className="space-y-4 mb-8">
            {mockDriverGoals.map((goal) => (
              <Card
                key={goal.id}
                className="shadow-sm border-none bg-secondary/30"
              >
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
        </TabsContent>

        <TabsContent value="history">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-primary" /> Histórico de Resgates
          </h2>
          <div className="space-y-3">
            {history.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-500">
                      -{item.cost} pts
                    </p>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase font-bold">
                      {item.status === 'completed' ? 'Pago' : 'Processando'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {history.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Nenhum resgate realizado.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
