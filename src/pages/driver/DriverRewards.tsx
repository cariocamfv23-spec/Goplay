import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Gift, Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockRewards } from '@/lib/data'
import { Progress } from '@/components/ui/progress'

export default function DriverRewards() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 flex items-center gap-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="font-bold text-xl">Recompensas</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-purple-800 text-white border-none shadow-lg">
          <CardContent className="p-6">
            <p className="text-white/80 text-sm font-medium mb-1">
              Seus Pontos
            </p>
            <div className="flex items-end gap-2 mb-4">
              <h2 className="text-4xl font-bold">2.450</h2>
              <span className="text-sm mb-1 opacity-80">pts</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs opacity-90">
                <span>Próximo Nível: Ouro</span>
                <span>550 pts restantes</span>
              </div>
              <Progress value={80} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>

        {/* Catalog */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Gift className="h-5 w-5 text-gold" /> Catálogo
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {mockRewards.map((reward) => (
              <Card
                key={reward.id}
                className="overflow-hidden group cursor-pointer hover:border-primary transition-colors"
              >
                <div className="aspect-square bg-secondary relative">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-full object-cover p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {reward.category}
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm line-clamp-2 h-10">
                    {reward.name}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">
                      {reward.points} pts
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 rounded-full hover:bg-primary hover:text-white"
                    >
                      <Ticket className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
