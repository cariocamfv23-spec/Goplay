import { useState } from 'react'
import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Star,
  Award,
  Calendar,
  MessageCircle,
  Briefcase,
  UserPlus,
  Crown,
  Activity,
  ArrowLeft,
  Edit2,
  CheckCircle2,
  Camera,
  Trophy,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProfilePostsSection } from '@/components/profile/ProfilePostsSection'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { EditProfileDialog } from '@/components/profile/EditProfileDialog'
import { EditCoverDialog } from '@/components/profile/EditCoverDialog'
import { type ProfileRow } from '@/services/profiles'
import { connectionService } from '@/services/connections'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { UserCheck, Loader2 } from 'lucide-react'

export default function CoachView({
  profile,
  isMe = false,
}: {
  profile: ProfileData & { rawProfile?: ProfileRow }
  isMe?: boolean
}) {
  const navigate = useNavigate()
  const { user: authUser } = useAuth()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isEditCoverOpen, setIsEditCoverOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  const isSupabaseProfile =
    typeof profile.id === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      profile.id,
    )

  const handleToggleFollow = async () => {
    if (!authUser?.id) {
      toast.error('Faça login para seguir o treinador.')
      return
    }
    if (!isSupabaseProfile) {
      setIsFollowing(!isFollowing)
      return
    }

    setFollowLoading(true)
    if (isFollowing) {
      const { error } = await connectionService.unfollow(
        authUser.id,
        profile.id,
      )
      setFollowLoading(false)
      if (error) {
        toast.error('Erro ao deixar de seguir.')
        return
      }
      setIsFollowing(false)
      toast.success('Você deixou de seguir este treinador.')
    } else {
      const { error } = await connectionService.follow(authUser.id, profile.id)
      setFollowLoading(false)
      if (error) {
        toast.error(error.message || 'Erro ao seguir.')
        return
      }
      setIsFollowing(true)
      toast.success('Você agora está seguindo este treinador!')
    }
  }
  const raw = profile.rawProfile
  const customCoverUrl =
    raw?.cover_url || (profile as any).cover_url || profile.cover || null
  const customCoverType =
    raw?.cover_type || (profile as any).cover_type || 'image'
  const coverPosX = raw?.cover_position_x ?? 50
  const coverPosY = raw?.cover_position_y ?? 50
  const coverZoom = raw?.cover_zoom ?? 1

  const coachName = raw?.full_name || profile.name
  const coachBio = raw?.bio || profile.bio
  const coachExperience = raw?.experience
  const coachSpecialties =
    raw?.specialties || profile.playstyle || 'Treinamento Tático e Técnico'
  const coachCertifications =
    raw?.certifications || profile.license || 'Licença Oficial'

  return (
    <div className="pb-8 animate-fade-in relative bg-background min-h-screen">
      <div className="relative h-56 w-full bg-muted overflow-hidden group">
        {customCoverUrl && customCoverType === 'video' ? (
          <video
            src={customCoverUrl}
            className="w-full h-full object-cover opacity-90"
            style={{
              transform: `scale(${coverZoom})`,
              objectPosition: `${coverPosX}% ${coverPosY}%`,
            }}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={
              customCoverUrl ||
              'https://img.usecurling.com/p/800/300?q=coach%20stadium'
            }
            alt="Cover"
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${coverZoom})`,
              objectPosition: `${coverPosX}% ${coverPosY}%`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {isMe && (
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 text-xs font-semibold shadow-lg gap-1.5 h-8 z-10"
            onClick={() => setIsEditCoverOpen(true)}
          >
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span>Editar Capa</span>
          </Button>
        )}
      </div>

      <div className="px-5 relative -mt-16 mb-6">
        <div className="relative inline-block mb-3">
          <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{coachName[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-gold to-yellow-600 rounded-full p-1.5 shadow-[0_0_15px_hsl(var(--gold)/0.5)] border-2 border-background">
            <Crown className="w-4 h-4 text-black fill-black" />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex flex-wrap items-center gap-2">
              {coachName}
              <Badge className="bg-gold/20 text-gold hover:bg-gold/30 border-none font-bold uppercase tracking-wider text-[10px]">
                <Crown className="w-3 h-3 mr-1" /> Profissional Verificado
              </Badge>
            </h1>
            {isMe && (
              <Button
                size="sm"
                variant="outline"
                className="bg-background/80 backdrop-blur-sm shadow-sm"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            )}
          </div>
          <p className="text-primary font-bold text-sm flex items-center gap-1.5 mt-1">
            <Briefcase className="w-4 h-4" /> Coach / Treinador{' '}
            {raw?.sport ? `• ${raw.sport}` : ''}
          </p>

          <p className="text-sm mt-4 text-muted-foreground leading-relaxed">
            {coachBio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium mt-4 pt-4 border-t border-border/50">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary/70" /> {profile.location}
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Star className="h-4 w-4 fill-gold text-gold" />{' '}
              {profile.rating || '4.8'}
            </span>
          </div>

          {!isMe && (
            <div className="flex gap-3 mt-6">
              <Button
                className={cn(
                  'flex-1 h-12 rounded-xl font-bold transition-all shadow-lg',
                  isFollowing
                    ? 'border-2 border-primary/40 bg-primary/10 text-primary hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30'
                    : 'bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white shadow-primary/20',
                )}
                onClick={handleToggleFollow}
                disabled={followLoading}
              >
                {followLoading ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : isFollowing ? (
                  <UserCheck className="h-5 w-5 mr-2" />
                ) : (
                  <UserPlus className="h-5 w-5 mr-2" />
                )}
                {isFollowing ? 'Seguindo' : 'Seguir / Conectar'}
              </Button>
              <Button
                variant="outline"
                className="flex-1 shadow-sm h-12 rounded-xl font-bold border-2 border-primary/20 text-foreground hover:bg-primary/5"
                onClick={() => navigate(`/messages/user-${profile.id}`)}
              >
                <MessageCircle className="h-5 w-5 mr-2 text-primary" /> Mensagem
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Coach Details Card */}
        <Card className="border-primary/10 shadow-sm bg-gradient-to-br from-secondary/50 to-transparent">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Equipe Atual / Atuação
                </p>
                <p className="font-bold text-base">
                  {profile.team || raw?.position || 'Independente'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3" /> Certificações
                </span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary w-fit shadow-sm max-w-full truncate"
                >
                  {coachCertifications}
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Especialidade
                </span>
                <span className="text-sm font-bold text-foreground leading-tight">
                  {coachSpecialties}
                </span>
              </div>
            </div>

            {coachExperience && (
              <div className="pt-3 border-t border-border/50">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />{' '}
                  Experiência Profissional
                </p>
                <p className="text-xs text-foreground leading-relaxed">
                  {coachExperience}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Organizer Quick Management Card for logged in Coach */}
        {isMe && (
          <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white text-[10px] font-bold">
                    Área do Treinador
                  </Badge>
                  <h3 className="font-bold text-sm text-foreground">
                    Painel do Organizador & Torneios
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Acesse suas peneiras, crie novos eventos e aprove inscrições
                  de atletas.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => navigate('/organizer')}
                className="bg-primary text-white shadow-md text-xs font-semibold gap-1.5 shrink-0"
              >
                <Trophy className="w-3.5 h-3.5" />
                Abrir Painel do Organizador
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modalidades / Categories */}
        <div className="space-y-3 mt-2">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-1">
            Modalidades
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-secondary text-secondary-foreground border-none px-3 py-1 shadow-sm">
              Futebol
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground border-none px-3 py-1 shadow-sm">
              Futsal
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground border-none px-3 py-1 shadow-sm">
              Society
            </Badge>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full mt-6 h-14 rounded-xl text-lg font-bold shadow-sm"
        >
          <Calendar className="mr-2 h-5 w-5" /> Agendar Mentoria
        </Button>

        {/* Publicações do Treinador */}
        <div className="pt-4">
          <h3 className="font-bold mb-3 text-sm text-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" /> Publicações do Treinador
          </h3>
          <ProfilePostsSection
            userId={profile.id}
            isMe={isMe}
            userName={coachName}
            userAvatar={profile.avatar}
          />
        </div>
      </div>

      {isMe && (
        <>
          <EditProfileDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            profile={raw || null}
          />
          <EditCoverDialog
            open={isEditCoverOpen}
            onOpenChange={setIsEditCoverOpen}
            profile={raw || null}
            currentCover={customCoverUrl}
            currentType={customCoverType}
            currentPosX={coverPosX}
            currentPosY={coverPosY}
            currentZoom={coverZoom}
          />
        </>
      )}
    </div>
  )
}
