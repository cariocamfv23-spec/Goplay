import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import useBrandingStore from '@/stores/useBrandingStore'
import { Trophy, Users, Camera, Briefcase, Car, HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const ProfileSelection = () => {
  const navigate = useNavigate()
  const { logoUrl } = useBrandingStore()
  const [selected, setSelected] = useState<string | null>(null)

  const profiles = [
    {
      id: 'athlete',
      label: 'Atleta',
      icon: Trophy,
      desc: 'Quero mostrar meu talento',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
    },
    {
      id: 'club',
      label: 'Clube/Escola',
      icon: Users,
      desc: 'Busco novos talentos',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      id: 'professional',
      label: 'Profissional',
      icon: Briefcase,
      desc: 'Treinador, Olheiro, Staff',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
    },
    {
      id: 'photographer',
      label: 'Fotógrafo',
      icon: Camera,
      desc: 'Vendo minhas fotos',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      id: 'driver',
      label: 'Motorista',
      icon: Car,
      desc: 'Transporte de atletas',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
    },
    {
      id: 'health',
      label: 'Saúde',
      icon: HeartPulse,
      desc: 'Nutri, Fisio, Psicólogo',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
  ]

  const handleContinue = () => {
    if (selected) {
      localStorage.setItem('userType', selected)
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-center border-b border-border/40">
        <img src={logoUrl} alt="Goplay" className="h-6 w-auto object-contain" />
      </div>

      <div className="flex-1 p-6 flex flex-col max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Quem é você?</h1>
          <p className="text-muted-foreground">
            Escolha o perfil que melhor se adapta aos seus objetivos no Goplay.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelected(profile.id)}
              className={cn(
                'relative flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md',
                selected === profile.id
                  ? `border-primary bg-primary/5 ring-2 ring-primary/20`
                  : 'border-border bg-card hover:bg-secondary/50',
              )}
            >
              <div
                className={cn('p-2 rounded-lg mb-3', profile.bg, profile.color)}
              >
                <profile.icon className="h-6 w-6" />
              </div>
              <span className="font-bold text-sm block mb-1">
                {profile.label}
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                {profile.desc}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            className="w-full h-12 rounded-full text-base font-bold shadow-lg"
            disabled={!selected}
            onClick={handleContinue}
          >
            Continuar como{' '}
            {profiles.find((p) => p.id === selected)?.label || ''}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSelection
