import { mockCurrentUser, mockProfiles } from '@/lib/data'
import { useParams } from 'react-router-dom'
import AthleteView from './AthleteView'
import PhotographerView from './PhotographerView'
import DriverView from './DriverView'

export default function Profile() {
  const { id } = useParams()
  const isMe = !id || id === 'me'

  let user = isMe
    ? mockCurrentUser
    : mockProfiles.find((p) => p.id.toString() === id)

  if (!user && !isMe) {
    // Fallback if not found in mockProfiles, try to find in drivers or just use default
    user = mockCurrentUser // Simplification for demo
  }

  // Type guard or casting
  const profileType = (user as any).type || 'athlete'

  return (
    <div className="min-h-screen bg-background pb-20">
      {profileType === 'photographer' ? (
        <PhotographerView profile={user as any} />
      ) : profileType === 'driver' ? (
        <DriverView profile={user as any} />
      ) : (
        <AthleteView user={user} isMe={isMe} />
      )}
    </div>
  )
}
