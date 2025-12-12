import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { User, Shield, Briefcase, Trophy, Flag, Users } from 'lucide-react'

const ProfileSelection = () => {
  const navigate = useNavigate()

  const profiles = [
    { id: 'atleta', label: 'Atleta', icon: User, desc: 'Mostre seu talento' },
    { id: 'clube', label: 'Clube', icon: Shield, desc: 'Gerencie seu time' },
    {
      id: 'empresa',
      label: 'Empresa',
      icon: Briefcase,
      desc: 'Divulgue sua marca',
    },
    {
      id: 'treinador',
      label: 'Treinador',
      icon: Trophy,
      desc: 'Ofereça treinos',
    },
    { id: 'torcedor', label: 'Torcedor', icon: Flag, desc: 'Acompanhe tudo' },
    {
      id: 'organizador',
      label: 'Organizador',
      icon: Users,
      desc: 'Crie eventos',
    },
  ]

  const handleSelect = (id: string) => {
    // Logic to save profile type
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h2 className="text-2xl font-bold text-center mb-2 mt-4">Quem é você?</h2>
      <p className="text-center text-muted-foreground mb-8">
        Escolha o perfil que mais combina com você
      </p>

      <div className="grid grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className="p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-primary transition-all hover:bg-accent/50"
            onClick={() => handleSelect(profile.id)}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
              <profile.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">{profile.label}</h3>
            <p className="text-xs text-muted-foreground">{profile.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProfileSelection
