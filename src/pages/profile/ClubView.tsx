import { useState } from "react"
import { ProfileData } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Star,
  Users,
  Trophy,
  MessageCircle,
  UserPlus,
  Edit2,
  Mail,
  Layers,
  FileText,
  Camera,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfilePostsSection } from "@/components/profile/ProfilePostsSection"
import { useNavigate } from "react-router-dom"
import { EditProfileDialog } from "@/components/profile/EditProfileDialog"
import { EditCoverDialog } from "@/components/profile/EditCoverDialog"
import { type ProfileRow } from "@/services/profiles"
import { connectionService } from "@/services/connections"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { UserCheck, Loader2 } from "lucide-react"

export default function ClubView({
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
    typeof profile.id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      profile.id,
    )

  const handleToggleFollow = async () => {
    if (!authUser?.id) {
      toast.error("Faça login para seguir o clube.")
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
        toast.error("Erro ao deixar de seguir.")
        return
      }
      setIsFollowing(false)
      toast.success("Você deixou de seguir este clube.")
    } else {
      const { error } = await connectionService.follow(authUser.id, profile.id)
      setFollowLoading(false)
      if (error) {
        toast.error(error.message || "Erro ao seguir.")
        return
      }
      setIsFollowing(true)
      toast.success("Você agora está seguindo este clube!")
    }
  }
  const raw = profile.rawProfile
  const customCoverUrl =
    raw?.cover_url || (profile as any).cover_url || profile.cover || null
  const customCoverType =
    raw?.cover_type || (profile as any).cover_type || "image"
  const coverPosX = raw?.cover_position_x ?? 50
  const coverPosY = raw?.cover_position_y ?? 50
  const coverZoom = raw?.cover_zoom ?? 1

  const clubName = raw?.club_name || raw?.full_name || profile.name
  const institutionalDesc =
    raw?.institutional_description || raw?.bio || profile.bio
  const categoriesList = raw?.categories
    ? raw.categories.split(",").map((c) => c.trim())
    : ["Principal", "Sub-20", "Sub-17"]
  const contactInfo = raw?.contact_info

  return (
    <div className="pb-8 animate-fade-in">
      <div className="relative h-48 w-full bg-muted overflow-hidden group">
        {customCoverUrl && customCoverType === "video" ? (
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
              "https://img.usecurling.com/p/800/300?q=stadium%20field"
            }
            alt="Cover"
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${coverZoom})`,
              objectPosition: `${coverPosX}% ${coverPosY}%`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {isMe && (
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 text-xs font-semibold shadow-lg gap-1.5 h-8"
            onClick={() => setIsEditCoverOpen(true)}
          >
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span>Editar Capa</span>
          </Button>
        )}
      </div>

      <div className="px-4 relative -mt-12 mb-4">
        <div className="flex justify-between items-end">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg rounded-xl">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{clubName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mb-2 items-center">
            {isMe ? (
              <Button
                size="sm"
                variant="outline"
                className="bg-background/80 backdrop-blur-sm shadow-sm"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Editar Clube
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant={isFollowing ? "outline" : "default"}
                  className={
                    isFollowing
                      ? "border-primary/40 text-primary"
                      : "bg-primary text-white shadow-md"
                  }
                  onClick={handleToggleFollow}
                  disabled={followLoading}
                >
                  {followLoading ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : isFollowing ? (
                    <UserCheck className="h-4 w-4 mr-1" />
                  ) : (
                    <UserPlus className="h-4 w-4 mr-1" />
                  )}
                  {isFollowing ? "Seguindo" : "Seguir"}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm"
                  onClick={() => navigate(`/messages/user-${profile.id}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mensagem
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {clubName}
            <Badge variant="secondary" className="text-xs">
              Clube Oficial
            </Badge>
          </h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {profile.location}
          </p>

          {institutionalDesc && (
            <p className="text-sm text-foreground/90 mt-3 leading-relaxed">
              {institutionalDesc}
            </p>
          )}

          {contactInfo && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 bg-secondary/30 p-2 rounded-lg">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>
                Contato institucional: <strong>{contactInfo}</strong>
              </span>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <span className="block font-bold text-lg">15</span>
              <span className="text-xs text-muted-foreground">Títulos</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-lg">1.2k</span>
              <span className="text-xs text-muted-foreground">Sócios</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-lg flex items-center justify-center gap-1">
                4.8 <Star className="h-3 w-3 fill-gold text-gold" />
              </span>
              <span className="text-xs text-muted-foreground">Avaliação</span>
            </div>
          </div>
        </div>

        {/* Organizer Quick Management Card for logged in Club */}
        {isMe && (
          <Card className="mt-5 border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white text-[10px] font-bold">
                    Área do Clube
                  </Badge>
                  <h3 className="font-bold text-sm text-foreground">
                    Painel de Inscrições e Peneiras
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Acesse suas peneiras oficiais, aprove ou recuse atletas e
                  acompanhe métricas reais.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => navigate("/organizer")}
                className="bg-primary text-white shadow-md text-xs font-semibold gap-1.5 shrink-0"
              >
                <Trophy className="w-3.5 h-3.5" />
                Abrir Painel do Organizador
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 space-y-4">
          {/* Categorias Esportivas do Clube */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" /> Categorias
                Esportivas
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {categoriesList.map((cat, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-secondary/40"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gold" /> Próxima Partida
              </h3>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">vs. Corinthians</span>
                <span className="text-muted-foreground">24 Out, 16:00</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Elenco Principal
              </h3>
              <div className="flex -space-x-2 overflow-hidden py-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 30}`}
                    />
                    <AvatarFallback>P{i}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                  +18
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publicações do Clube */}
          <div className="pt-2">
            <h3 className="font-bold mb-3 text-sm text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Publicações do Clube
            </h3>
            <ProfilePostsSection
              userId={profile.id}
              isMe={isMe}
              userName={clubName}
              userAvatar={profile.avatar}
            />
          </div>
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
