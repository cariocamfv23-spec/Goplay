import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Share2,
  Wallet,
  Download,
  QrCode,
  Loader2,
  LogIn,
  ExternalLink,
  MapPin,
  Award,
  Target,
  Trophy,
  ShieldAlert,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PassportCard } from "@/components/passport/PassportCard"
import { CompetitionHistory } from "@/components/passport/CompetitionHistory"
import { Certifications } from "@/components/passport/Certifications"
import { GoalsTracker } from "@/components/passport/GoalsTracker"
import { StrategicVisualPassport } from "@/components/passport/StrategicVisualPassport"
import { EventLinkDialog } from "@/components/passport/EventLinkDialog"
import { useState, useEffect } from "react"
import { ShareDialog } from "@/components/ShareDialog"
import { mockCurrentUser } from "@/lib/data"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { profileService, type ProfileRow } from "@/services/profiles"
import { feedService, type PostItem } from "@/services/feed"
import { analyticsService } from "@/services/analytics"
import { ReportDialog } from "@/components/moderation/ReportDialog"

export default function SportsPassport() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const { user: authUser, profile: myLiveProfile } = useAuth()
  const [isEventLinkOpen, setIsEventLinkOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [targetProfile, setTargetProfile] = useState<ProfileRow | null>(null)
  const [targetPosts, setTargetPosts] = useState<PostItem[]>([])

  const isMe = !id || id === "me" || (authUser?.id && id === authUser.id)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setLoading(true)

      const targetId = isMe ? authUser?.id : id

      if (isMe && myLiveProfile) {
        setTargetProfile(myLiveProfile)
        setLoading(false)
        return
      }

      if (
        targetId &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          targetId,
        )
      ) {
        const { data } = await profileService.getProfileById(targetId)
        if (isMounted) {
          setTargetProfile(data)
          // Also fetch public posts if any
          const { data: posts } = await feedService.getPosts(targetId, 20)
          if (isMounted && posts) {
            setTargetPosts(posts)
          }
          setLoading(false)
        }
      } else {
        if (isMounted) {
          setTargetProfile(myLiveProfile || null)
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [id, isMe, authUser?.id, myLiveProfile])

  const activeProfile = targetProfile || (isMe ? myLiveProfile : null)
  const athleteName = activeProfile?.full_name || mockCurrentUser.name
  const athleteSport = activeProfile?.sport || mockCurrentUser.sport
  const athletePosition = activeProfile?.position || mockCurrentUser.position
  const athleteCityState = [activeProfile?.city, activeProfile?.state]
    .filter(Boolean)
    .join(", ")
  const publicShareUrl = activeProfile?.id
    ? `${window.location.origin}/passport/${activeProfile.id}`
    : window.location.href

  const handleShareAction = (platform?: string) => {
    if (activeProfile?.id) {
      analyticsService.trackProfileShare(
        activeProfile.id,
        platform || "unknown",
        authUser?.id,
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">
          Carregando passaporte esportivo...
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-6">
      <div className="p-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg leading-none">
              Passaporte Esportivo
            </h1>
            <p className="text-xs text-muted-foreground">
              {athleteName} • {athleteSport}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!authUser && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold h-8 gap-1.5"
              onClick={() =>
                navigate(
                  `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
                )
              }
            >
              <LogIn className="w-3.5 h-3.5" />
              Entrar
            </Button>
          )}
          {!isMe && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => setIsReportOpen(true)}
              title="Denunciar este Passaporte"
              aria-label="Denunciar Passaporte"
            >
              <ShieldAlert className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary/90"
            onClick={() => setIsShareOpen(true)}
            aria-label="Compartilhar Passaporte"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs defaultValue="digital" className="w-full">
          {/* Updated grid-cols-5 to accommodate new tab */}
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger
              value="digital"
              className="px-1 text-[10px] sm:text-sm sm:px-3"
            >
              ID Digital
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="px-1 text-[10px] sm:text-sm sm:px-3"
            >
              Histórico
            </TabsTrigger>
            <TabsTrigger
              value="certs"
              className="px-1 text-[10px] sm:text-sm sm:px-3"
            >
              Certif.
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="px-1 text-[10px] sm:text-sm sm:px-3"
            >
              Metas
            </TabsTrigger>
            <TabsTrigger
              value="visual"
              className="px-1 text-[10px] sm:text-sm sm:px-3"
            >
              Visual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="digital" className="space-y-6 animate-fade-in">
            <PassportCard profile={activeProfile} />

            {/* Structured Athlete Information available */}
            {(activeProfile?.bio ||
              activeProfile?.experience ||
              activeProfile?.previous_clubs ||
              activeProfile?.sports_goals ||
              activeProfile?.specialties) && (
              <div className="max-w-sm mx-auto bg-card rounded-2xl border border-border/50 p-4 space-y-3 text-xs shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <span className="font-bold text-foreground text-sm">
                    Ficha do Atleta
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase">
                    {athleteSport}
                  </span>
                </div>

                {activeProfile.bio && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                      Apresentação
                    </span>
                    <p className="text-foreground leading-relaxed">
                      {activeProfile.bio}
                    </p>
                  </div>
                )}

                {activeProfile.experience && (
                  <div className="flex items-start gap-2 pt-2 border-t border-border/30">
                    <Trophy className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Experiência
                      </span>
                      <p className="text-foreground">
                        {activeProfile.experience}
                      </p>
                    </div>
                  </div>
                )}

                {activeProfile.previous_clubs && (
                  <div className="flex items-start gap-2 pt-2 border-t border-border/30">
                    <Award className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Clubes Anteriores / Histórico
                      </span>
                      <p className="text-foreground">
                        {activeProfile.previous_clubs}
                      </p>
                    </div>
                  </div>
                )}

                {activeProfile.sports_goals && (
                  <div className="flex items-start gap-2 pt-2 border-t border-border/30">
                    <Target className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Objetivos Esportivos
                      </span>
                      <p className="text-foreground">
                        {activeProfile.sports_goals}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-3 max-w-sm mx-auto">
              <Button
                className="w-full font-bold shadow-lg bg-primary hover:bg-primary/90 text-white"
                size="lg"
                onClick={() => setIsShareOpen(true)}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Compartilhar Passaporte
              </Button>
              {isMe && (
                <Button
                  variant="outline"
                  className="w-full font-semibold"
                  size="default"
                  onClick={() => setIsEventLinkOpen(true)}
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Validar em Evento / QR Code
                </Button>
              )}
            </div>

            <div className="text-center space-y-2 mt-6">
              <p className="text-xs text-muted-foreground">
                Documento esportivo digital verificado via Goplay App.
              </p>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-mono">
                ID:{" "}
                {(activeProfile?.id || mockCurrentUser.id)
                  .slice(0, 12)
                  .toUpperCase()}
                -GOPLAY-OFFICIAL
              </p>
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <CompetitionHistory />
          </TabsContent>

          <TabsContent value="certs" className="animate-fade-in">
            <Certifications />
          </TabsContent>

          <TabsContent value="goals" className="animate-fade-in">
            <GoalsTracker />
          </TabsContent>

          {/* New Visual Tab Content */}
          <TabsContent value="visual" className="animate-fade-in">
            <StrategicVisualPassport
              profile={activeProfile}
              posts={targetPosts}
            />
          </TabsContent>
        </Tabs>
      </div>

      <EventLinkDialog
        open={isEventLinkOpen}
        onOpenChange={setIsEventLinkOpen}
      />
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        title={`Passaporte Esportivo de ${athleteName}`}
        description={`Confira o Passaporte Esportivo oficial de ${athleteName} (${athleteSport || "Esporte"}) no Goplay App!`}
        url={publicShareUrl}
        onShareAction={handleShareAction}
      />

      {/* Report Passport Dialog */}
      {!isMe && activeProfile?.id && (
        <ReportDialog
          open={isReportOpen}
          onOpenChange={setIsReportOpen}
          contentType="passport"
          contentId={String(activeProfile.id)}
          reportedUserId={String(activeProfile.id)}
          reportedUserName={athleteName}
          contentTitle={`Passaporte de ${athleteName} (${athleteSport})`}
        />
      )}
    </div>
  )
}
