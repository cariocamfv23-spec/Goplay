import { useNavigate, useParams } from 'react-router-dom'
import { mockGyms } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Star, Dumbbell, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DigitalCard } from '@/components/DigitalCard'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function GymDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const gym = mockGyms.find((g) => g.id === id)

  // Simulate Auto Check-in
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success('Check-in na academia realizado!', {
        description: `Bom treino na ${gym?.name}!`,
        icon: <Dumbbell className="h-5 w-5 text-primary" />,
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [gym])

  if (!gym) return <div>Academia não encontrada</div>

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-64 w-full">
        <img
          src={`https://img.usecurling.com/p/600/400?q=${gym.img}&dpr=2`}
          alt={gym.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 text-white rounded-full backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 -mt-12 relative z-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{gym.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" /> {gym.location}
          </div>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" /> {gym.rating}
            </Badge>
          </div>

          <DigitalCard title="Goplay Fit" type="fit">
            <Button className="w-full h-14 rounded-full text-lg shadow-lg bg-gradient-to-r from-primary to-purple-800">
              <Dumbbell className="mr-2 h-5 w-5" /> Cartão Digital Goplay Fit
            </Button>
          </DigitalCard>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Planos & Preços</h3>
          <div className="grid gap-3">
            {gym.plans.map((plan, i) => (
              <Card
                key={i}
                className="bg-card border-l-4 border-l-primary shadow-sm"
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <span className="font-medium">{plan}</span>
                  <Button size="sm" variant="outline">
                    Ver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Benefícios Goplay</h3>
          <ul className="space-y-2">
            {gym.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
