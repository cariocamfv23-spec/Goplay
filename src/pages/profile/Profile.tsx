import { useParams } from 'react-router-dom'
import { mockProfiles } from '@/lib/data'
import DriverView from './DriverView'
import PhotographerView from './PhotographerView'
import AthleteView from './AthleteView'
import ClubView from './ClubView'
import CoachView from './CoachView'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Profile() {
  const { id } = useParams()
  // Support both ID and username lookup (though mock data mostly uses ID)
  const profile =
    mockProfiles.find((p) => p.id === id) ||
    mockProfiles.find((p) => p.username === id) ||
    (id === 'me' ? mockProfiles[0] : undefined) // Mock 'me' as first profile

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Perfil não encontrado</h2>
        <p className="text-muted-foreground mb-4">
          O perfil que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={() => window.history.back()}>Voltar</Button>
      </div>
    )
  }

  // Render the appropriate view based on profile type
  switch (profile.type) {
    case 'driver':
      return <DriverView profile={profile} />
    case 'photographer':
      return <PhotographerView profile={profile} />
    case 'athlete':
      return <AthleteView profile={profile} />
    case 'club':
      return <ClubView profile={profile} />
    case 'coach':
      return <CoachView profile={profile} />
    default:
      // Fallback for other types not explicitly handled with a custom view yet
      // This ensures functionality even if a specific view is missing
      return (
        <div className="pb-8 animate-fade-in">
          <div className="relative h-48 w-full bg-muted">
            <img
              src={profile.cover}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="px-4 relative -mt-12 mb-4">
            <div className="bg-background rounded-full p-1 inline-block">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-background"
              />
            </div>
            <div className="mt-3">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground text-sm">
                {profile.username}
              </p>
              <p className="text-sm mt-2 font-medium">{profile.bio}</p>
              <div className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center text-muted-foreground">
                      Visualização detalhada para {profile.type} em
                      desenvolvimento.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
