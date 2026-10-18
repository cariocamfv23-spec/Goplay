import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { mockCurrentUser, mockProfiles } from '@/lib/data'
import AthleteView from './AthleteView'
import PhotographerView from './PhotographerView'
import DriverView from './DriverView'
import ClubView from './ClubView'
import CoachView from './CoachView'
import ScoutView from './ScoutView'
import SponsorView from './SponsorView'
import { BirthdayCelebration } from './BirthdayCelebration'
import { useAuth } from '@/hooks/use-auth'
import { profileService, type ProfileRow } from '@/services/profiles'
import { Loader2 } from 'lucide-react'

export default function Profile() {
  const { id } = useParams()
  const { user: authUser, profile: myLiveProfile } = useAuth()
  const isMe = !id || id === 'me' || (authUser?.id && id === authUser.id)

  const [loading, setLoading] = useState(false)
  const [remoteProfile, setRemoteProfile] = useState<ProfileRow | null>(null)

  // Fetch real profile from Supabase when viewing another user's profile ID
  useEffect(() => {
    let isMounted = true

    if (isMe) {
      setRemoteProfile(myLiveProfile)
      return
    }

    if (id && id !== 'me') {
      // Check if id looks like a UUID (Supabase profile)
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          id,
        )
      if (isUuid) {
        setLoading(true)
        profileService.getProfileById(id).then(({ data }) => {
          if (isMounted) {
            setRemoteProfile(data)
            setLoading(false)
          }
        })
      } else {
        setRemoteProfile(null)
      }
    }

    return () => {
      isMounted = false
    }
  }, [id, isMe, myLiveProfile])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Determine active profile data, prioritizing real Supabase profile
  const activeProfileRow: ProfileRow | null = isMe
    ? myLiveProfile
    : remoteProfile

  // Fallback to mock profile only if viewing a legacy mock ID and not found in Supabase
  const isUuid =
    id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  const fallbackMock = isMe
    ? mockCurrentUser
    : isUuid
      ? null
      : mockProfiles.find((p) => p.id.toString() === id) || null

  // If a specific Supabase ID was requested but not found in the database
  if (!isMe && isUuid && !activeProfileRow && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="p-4 rounded-full bg-secondary text-muted-foreground">
          <Loader2 className="h-8 w-8 text-muted-foreground opacity-40" />
        </div>
        <h2 className="text-xl font-bold">Perfil Não Encontrado</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          O perfil solicitado não existe no Goplay App ou não está disponível
          publicamente.
        </p>
      </div>
    )
  }

  // Adapt the real ProfileRow into the component's expected shape while preserving all real Supabase fields
  const user = activeProfileRow
    ? {
        ...(fallbackMock || mockCurrentUser),
        id: activeProfileRow.id,
        name:
          activeProfileRow.full_name || fallbackMock?.name || 'Usuário Goplay',
        avatar:
          activeProfileRow.avatar_url ||
          `https://img.usecurling.com/ppl/medium?seed=${activeProfileRow.id.slice(0, 4)}`,
        sport: activeProfileRow.sport || fallbackMock?.sport || 'Esporte',
        position:
          activeProfileRow.position || fallbackMock?.position || 'Goplay',
        location:
          [activeProfileRow.city, activeProfileRow.state]
            .filter(Boolean)
            .join(', ') ||
          fallbackMock?.location ||
          'Brasil',
        bio:
          activeProfileRow.bio ||
          activeProfileRow.institutional_description ||
          fallbackMock?.bio,
        type: activeProfileRow.account_type || fallbackMock?.type || 'athlete',
        cover_url: activeProfileRow.cover_url,
        cover_type: activeProfileRow.cover_type,
        // Real fields attached for views (Note: birth_date is strictly omitted for other users)
        rawProfile: isMe
          ? activeProfileRow
          : {
              ...activeProfileRow,
              birth_date: undefined, // ensure confidential birth date is never shown on other profiles
            },
      }
    : fallbackMock || mockCurrentUser

  const profileType =
    activeProfileRow?.account_type || (user as any).type || 'athlete'

  return (
    <div className="min-h-screen bg-background pb-20">
      <BirthdayCelebration user={user} isMe={Boolean(isMe)} />

      {profileType === 'photographer' ? (
        <PhotographerView profile={user as any} />
      ) : profileType === 'driver' ? (
        <DriverView profile={user as any} />
      ) : profileType === 'club' ? (
        <ClubView profile={user as any} isMe={Boolean(isMe)} />
      ) : profileType === 'coach' ? (
        <CoachView profile={user as any} isMe={Boolean(isMe)} />
      ) : profileType === 'scout' ? (
        <ScoutView profile={user as any} />
      ) : profileType === 'sponsor' ? (
        <SponsorView profile={user as any} />
      ) : (
        <AthleteView user={user} isMe={Boolean(isMe)} />
      )}
    </div>
  )
}
