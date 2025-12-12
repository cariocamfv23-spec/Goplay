import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import useBrandingStore from '@/stores/useBrandingStore'
import {
  User,
  Shield,
  Camera,
  Trophy,
  Car,
  Stethoscope,
  Apple,
} from 'lucide-react'

const profileTypes = [
  {
    id: 'athlete',
    label: 'Atleta',
    icon: Trophy,
    description: 'Para jogadores e esportistas',
  },
  {
    id: 'club',
    label: 'Clube',
    icon: Shield,
    description: 'Para times e organizações',
  },
  {
    id: 'coach',
    label: 'Treinador',
    icon: User,
    description: 'Para técnicos e instrutores',
  },
  {
    id: 'photographer',
    label: 'Fotógrafo',
    icon: Camera,
    description: 'Para registrar momentos',
  },
  {
    id: 'driver',
    label: 'Motorista',
    icon: Car,
    description: 'Para transporte de equipamentos',
  },
  {
    id: 'health',
    label: 'Saúde',
    icon: Stethoscope,
    description: 'Fisio, médicos e saúde',
  },
  {
    id: 'nutrition',
    label: 'Nutrição',
    icon: Apple,
    description: 'Nutricionistas esportivos',
  },
]

const ProfileSelection = () => {
  const navigate = useNavigate()
  const { logoUrl } = useBrandingStore()

  const handleSelect = (type: string) => {
    localStorage.setItem('userType', type)
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col py-10 px-6 animate-fade-in relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="flex justify-center mb-8 relative z-10">
        <img
          src={logoUrl}
          alt="Goplay App"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="max-w-md mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Quem é você no jogo?</h1>
          <p className="text-muted-foreground">
            Escolha o perfil que melhor descreve sua atividade.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {profileTypes.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile.id)}
              className="flex items-center p-4 bg-secondary/30 hover:bg-secondary border border-border/50 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] group text-left"
            >
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:bg-primary/10 transition-colors mr-4">
                <profile.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {profile.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {profile.description}
                </p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-muted group-hover:border-primary group-hover:bg-primary/20 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileSelection
