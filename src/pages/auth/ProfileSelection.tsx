import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { User, Shield, Briefcase, Trophy, Flag, Users } from 'lucide-react'

const ProfileSelection = () => {
  const navigate = useNavigate()

  const profiles = [
    {
      id: 'atleta',
      label: 'Atleta',
      icon: User,
      desc: 'Para jogadores e praticantes',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      id: 'clube',
      label: 'Clube',
      icon: Shield,
      desc: 'Para times e centros esportivos',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      id: 'treinador',
      label: 'Treinador',
      icon: Trophy,
      desc: 'Para profissionais do esporte',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      id: 'empresa',
      label: 'Empresa',
      icon: Briefcase,
      desc: 'Para marcas e serviços',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      id: 'organizador',
      label: 'Organizador',
      icon: Users,
      desc: 'Para gestão de eventos',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      id: 'torcedor',
      label: 'Torcedor',
      icon: Flag,
      desc: 'Para acompanhar o esporte',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
  ]

  const handleSelect = (id: string) => {
    // Logic to save profile type would go here
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in flex flex-col">
      <div className="mt-4 mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Quem é você?</h2>
        <p className="text-muted-foreground">
          Escolha o perfil que melhor te representa no ecossistema.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-8">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className="p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1 bg-card"
            onClick={() => handleSelect(profile.id)}
          >
            <div
              className={`w-14 h-14 rounded-full ${profile.bg} flex items-center justify-center ${profile.color} mb-1`}
            >
              <profile.icon className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-bold text-base">{profile.label}</h3>
              <p className="text-xs text-muted-foreground leading-tight mt-1">
                {profile.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-auto pb-4">
        Você poderá adicionar outros perfis depois.
      </p>
    </div>
  )
}

export default ProfileSelection
