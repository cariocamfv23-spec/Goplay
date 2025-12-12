import { useParams, useNavigate } from 'react-router-dom'
import { mockProfiles } from '@/lib/data'
import AthleteView from './AthleteView'
import ClubView from './ClubView'
import CoachView from './CoachView'
import PhotographerView from './PhotographerView'
import DriverView from './DriverView'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const profileId = id === 'me' ? '1' : id
  const profile =
    mockProfiles.find((p) => p.id === profileId) || mockProfiles[0]

  if (!profile && id !== 'me') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Perfil não encontrado</h2>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Button>
      </div>
    )
  }

  const renderProfile = () => {
    switch (profile.type) {
      case 'athlete':
        return <AthleteView profile={profile} />
      case 'club':
        return <ClubView profile={profile} />
      case 'coach':
        return <CoachView profile={profile} />
      case 'photographer':
        return <PhotographerView profile={profile} />
      case 'driver':
        return <DriverView profile={profile} />
      default:
        return <AthleteView profile={profile} />
    }
  }

  return <div className="bg-background min-h-screen">{renderProfile()}</div>
}

export default Profile
