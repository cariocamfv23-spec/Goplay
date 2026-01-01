import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { User, Camera, Trophy, Briefcase, Car } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SportsWallpaper } from '@/components/SportsWallpaper'

const profileTypes = [
  {
    id: 'athlete',
    icon: User,
    title: 'Atleta',
    description: 'Para jogadores amadores e profissionais',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'club',
    icon: Trophy,
    title: 'Clube/Time',
    description: 'Para gestão de times e campeonatos',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    id: 'scout',
    icon: Briefcase,
    title: 'Profissional',
    description: 'Olheiros, treinadores e agentes',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    id: 'photographer',
    icon: Camera,
    title: 'Fotógrafo',
    description: 'Venda suas fotos esportivas',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    id: 'driver',
    icon: Car,
    title: 'Motorista',
    description: 'Transporte para eventos esportivos',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
]

export default function ProfileSelection() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('athlete')

  const handleContinue = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Global Background Pattern */}
      <SportsWallpaper />

      <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold">Escolha seu Perfil</h1>
          <p className="text-muted-foreground">Como você quer usar o Goplay?</p>
        </div>

        <Card className="border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl">
          <CardContent className="p-6">
            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {profileTypes.map((type) => (
                <div key={type.id}>
                  <RadioGroupItem
                    value={type.id}
                    id={type.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={type.id}
                    className={cn(
                      'flex items-start space-x-4 rounded-xl border-2 border-transparent p-4 hover:bg-secondary/50 cursor-pointer transition-all duration-200',
                      selected === type.id
                        ? 'border-primary bg-secondary/30 ring-2 ring-primary/20'
                        : 'border-border/50',
                    )}
                  >
                    <div className={cn('p-3 rounded-lg shrink-0', type.bg)}>
                      <type.icon className={cn('w-6 h-6', type.color)} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-base">{type.title}</p>
                      <p className="text-xs text-muted-foreground font-normal">
                        {type.description}
                      </p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                className="w-full md:w-auto md:min-w-[200px]"
                onClick={handleContinue}
              >
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
