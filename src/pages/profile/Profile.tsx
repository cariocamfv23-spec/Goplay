import { useParams, useNavigate } from 'react-router-dom'
import { mockProfiles } from '@/lib/data'
import AthleteView from './AthleteView'
import ClubView from './ClubView'
import CoachView from './CoachView'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // For "me" or generic access, we can default to ID 1 or find a user
  // In a real app, "me" would fetch from current user context
  const profileId = id === 'me' ? '1' : id

  // Logic to allow accessing profiles by ID 'me' or numeric
  const profile =
    mockProfiles.find((p) => p.id === profileId) || mockProfiles[0]

  if (!profile && id !== 'me') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Perfil não encontrado</h2>
        <p className="text-muted-foreground mb-6">
          Não conseguimos encontrar o usuário solicitado.
        </p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>
    )
  }

  // Render appropriate view based on profile type
  switch (profile.type) {
    case 'athlete':
      return <AthleteView profile={profile} />
    case 'club':
      return <ClubView profile={profile} />
    case 'coach':
      return <CoachView profile={profile} />
    default:
      return <AthleteView profile={profile} />
  }
}

export default Profile
