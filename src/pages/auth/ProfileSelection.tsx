import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { User, Camera, Car, Dumbbell, Shield } from 'lucide-react'
import { Logo } from '@/components/Logo'

const profileTypes = [
  {
    id: 'athlete',
    label: 'Atleta',
    icon: User,
    desc: 'Para quem pratica esportes',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'coach',
    label: 'Treinador',
    icon: Dumbbell,
    desc: 'Para quem treina atletas',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    id: 'photographer',
    label: 'Fotógrafo',
    icon: Camera,
    desc: 'Para quem registra momentos',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    id: 'club',
    label: 'Clube/Arena',
    icon: Shield,
    desc: 'Para gestores de espaços',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    id: 'driver',
    label: 'Motorista',
    icon: Car,
    desc: 'Para parceiros de transporte',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
]

export default function ProfileSelection() {
  const navigate = useNavigate()

  const handleSelect = (type: string) => {
    // Save type to local storage or context if needed
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="text-center space-y-4 mb-8 pt-8">
        <Logo variant="icon" className="h-16 w-16 mx-auto" />
        <h1 className="text-2xl font-bold">Como você vai usar o Goplay?</h1>
        <p className="text-muted-foreground">
          Escolha o perfil que melhor se adapta a você.
        </p>
      </div>

      <div className="grid gap-4 flex-1">
        {profileTypes.map((type) => (
          <Card
            key={type.id}
            className="border-2 border-transparent hover:border-primary/50 cursor-pointer transition-all hover:bg-secondary/30"
            onClick={() => handleSelect(type.id)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${type.bg}`}
              >
                <type.icon className={`h-6 w-6 ${type.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
