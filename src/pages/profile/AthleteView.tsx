import { mockCurrentUser, mockPosts, type MusicTrack } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Grid,
  Video,
  PlayCircle,
  Trophy,
  BarChart2,
  Users,
  FileText,
  ShoppingBag,
  Music,
  Edit2,
  Eye,
  History,
  Sparkles,
  IdCard,
  Gift,
  Package,
  Play,
  Share2,
  Palette,
  TrendingUp,
  ImageOff,
  UserPlus,
  MessageCircle,
  Bot,
  Info,
  Waves,
  ChevronRight,
  Zap,
  Store,
  Calendar,
  Clock,
  Lock,
  Crown,
  Wand2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MusicSelector } from '@/components/MusicSelector'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { ShareDialog } from '@/components/ShareDialog'
import { AppIcon } from '@/components/AppIcon'
import { useRetrospectiveStore } from '@/stores/useRetrospectiveStore'
import { RetrospectiveThemeSelector } from '@/components/RetrospectiveThemeSelector'
import { cn } from '@/lib/utils'
import { PostDetailDialog } from '@/components/PostDetailDialog'
import { AthleteAura } from '@/components/AthleteAura'
import { getAuraConfig } from '@/lib/aura-utils'
import { AuraLegend } from '@/components/AuraLegend'
import { EcoHumanoWaves } from '@/components/EcoHumanoWaves'
import { EcoLegend } from '@/components/EcoLegend'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { getSportCoverImage } from '@/lib/sport-utils'
import { DepthContainer } from '@/components/DepthContainer'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { useReplayStore } from '@/stores/useReplayStore'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { PaymentDialog } from '@/components/PaymentDialog'
import { GhostEmojiIcon } from '@/components/GhostEmojiIcon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useNotificationStore from '@/stores/useNotificationStore'

export default function AthleteView({
  user: initialUser = mockCurrentUser,
  isMe = true,
}: {
  user?: any
  isMe?: boolean
}) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('posts')
  const [user, setUser] = useState(initialUser)
  const [isMusicSelectorOpen, setIsMusicSelectorOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false)
  const [isAuraLegendOpen, setIsAuraLegendOpen] = useState(false)
  const [isEcoLegendOpen, setIsEcoLegendOpen] = useState(false)

  // Post Detail State
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const { getTheme } = useRetrospectiveStore()
  const { replays } = useReplayStore()
  const { isInvisibleMode, isPremium, toggleInvisibleMode, upgradeToPremium } =
    usePrivacyStore()
  const { addNotification } = useNotificationStore()

  const currentTheme = getTheme()
  const auraConfig = getAuraConfig(user)

  // Simulated Tracking Suppression Logic
  useEffect(() => {
    if (!isMe) {
      if (isInvisibleMode) {
        console.log(
          `[Invisible Mode] Visit tracking suppressed for profile: ${user.id}`,
        )
      } else {
        console.log(
          `[Tracker] Broadcasting VIP presence to profile: ${user.id}`,
        )
      }
    }
  }, [isMe, user.id, isInvisibleMode])

  const userPosts = mockPosts
  const coverImage = getSportCoverImage(user.sport)

  const handleMusicSelect = (track: MusicTrack) => {
    setUser({ ...user, favoriteSong: track })
    toast.success('Música do perfil atualizada!', {
      description: `${track.title} - ${track.artist}`,
      icon: <Music className="h-4 w-4 text-primary" />,
    })
  }

  const handlePostClick = (post: any) => {
    setSelectedPost(post)
    setIsDetailOpen(true)
  }

  const handleSimulateMemory = () => {
    addNotification({
      title: 'Viagem no Tempo ⏳',
      message: 'Relembre este momento de 1 ano atrás!',
      type: 'time_travel',
      priority: 'high',
      link: 'modal:today',
    })
    toast.success('Notificação simulada enviada!', {
      description: 'Verifique a central de notificações.',
      icon: <History className="w-4 h-4 text-purple-500" />,
    })
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in relative">
      {/* Cinematic Profile Background Contextual Aura */}
      {auraConfig.type !== 'none' && (
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          style={{ height: '600px' }}
        >
          <div
            className="absolute top-0 inset-x-0 h-full opacity-10 mix-blend-screen transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${auraConfig.colorEnd}, transparent 70%)`,
            }}
          />
          <div
            className="absolute top-0 inset-x-0 h-full opacity-5 mix-blend-plus-lighter animate-pulse transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${auraConfig.colorStart}, transparent 60%)`,
            }}
          />
        </div>
      )}

      {/* High-Quality Sport Cover Image */}
      <div className="h-64 bg-muted relative overflow-hidden group z-10">
        <img
          src={coverImage}
          alt={`Cover for ${user.sport || 'Athlete'}`}
          className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://img.usecurling.com/p/800/400?q=abstract%20gradient&color=blue'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {user.sport && (
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10 shadow-lg">
            {user.sport}
          </div>
        )}
      </div>

      <div className="px-4 relative -mt-16 mb-4 z-10">
        <div className="flex justify-between items-end mb-4">
          <div className="relative">
            <EcoHumanoWaves
              profile={user}
              className="scale-150 opacity-80 -z-10"
            />
            <AthleteAura profile={user} size="xl" showLabel className="-ml-1">
              <Avatar className="h-28 w-28 border-4 border-background shadow-xl relative z-20">
                <AvatarImage src={user.avatar} className="object-cover" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </AthleteAura>
          </div>

          <div className="flex gap-2 mb-3 items-center">
            {isMe ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
                onClick={() => navigate('/settings')}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-primary text-white shadow-md">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Seguir
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm"
                  onClick={() => navigate(`/messages/user-${user.id}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mensagem
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Identity Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
              {user.name}
              {user.level && (
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-gold text-black px-1.5 py-0 border-none font-bold uppercase tracking-wider shadow-sm"
                >
                  LVL {user.level}
                </Badge>
              )}
            </h1>
            <button
              onClick={() => setIsAuraLegendOpen(true)}
              className="text-muted-foreground hover:text-primary transition-colors p-1"
              aria-label="Legenda da Aura"
            >
              <Info className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEcoLegendOpen(true)}
              className="text-muted-foreground hover:text-emerald-500 transition-colors p-1"
              aria-label="Eco Humano"
            >
              <Waves className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground font-medium mb-1">
            {user.role} • {user.position}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <MapPin className="h-3 w-3" /> {user.location}
          </div>

          <div className="flex items-center justify-between bg-secondary/20 p-3 rounded-xl border border-border/50 mb-5 backdrop-blur-sm">
            <div className="flex flex-col items-center flex-1 border-r border-border/50">
              <span className="font-bold text-lg leading-none">
                {user.followers || 0}
              </span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">
                Seguidores
              </span>
            </div>
            <div className="flex flex-col items-center flex-1 border-r border-border/50">
              <span className="font-bold text-lg leading-none">
                {user.following || 0}
              </span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">
                Seguindo
              </span>
            </div>
            {user.stats && (
              <>
                <div className="flex flex-col items-center flex-1 border-r border-border/50">
                  <span className="font-bold text-lg leading-none">
                    {user.stats.matches || 0}
                  </span>
                  <span className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">
                    Jogos
                  </span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <span className="font-bold text-lg leading-none text-gold">
                    {user.stats.mvp || 0}
                  </span>
                  <span className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1 text-gold/80">
                    MVPs
                  </span>
                </div>
              </>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-4 text-foreground/90">
            {user.bio}
          </p>

          <div className="mb-6">
            {user.favoriteSong ? (
              <div className="bg-secondary/30 rounded-lg p-2 flex items-center gap-3 border border-border/50 hover:bg-secondary/40 transition-colors">
                <div className="h-10 w-10 bg-black rounded-md overflow-hidden relative shrink-0">
                  <img
                    src={user.favoriteSong.cover}
                    alt="Album"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://img.usecurling.com/p/200/200?q=music%20note'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Music className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5 flex items-center gap-1">
                    Música do Atleta
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold truncate">
                      {user.favoriteSong.title}
                    </p>
                    <span className="text-xs text-muted-foreground truncate">
                      • {user.favoriteSong.artist}
                    </span>
                  </div>
                </div>
                {isMe && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => setIsMusicSelectorOpen(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : (
              isMe && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-dashed text-muted-foreground hover:text-primary"
                  onClick={() => setIsMusicSelectorOpen(true)}
                >
                  <Music className="h-4 w-4 mr-2" /> Adicionar Música do Atleta
                </Button>
              )
            )}
          </div>
        </div>

        {/* Retrospective Banner */}
        {isMe && (
          <div
            onClick={() => navigate('/retrospective')}
            className="mb-6 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/10"
            style={currentTheme.customVars as React.CSSProperties}
          >
            <div
              className={cn(
                'absolute inset-0 animate-gradient-xy transition-all duration-500',
                currentTheme.cardGradient,
              )}
            />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://img.usecurling.com/p/600/300?q=stars%20space&color=black')",
              }}
            />
            <div
              className={cn(
                'absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl animate-pulse transition-all duration-500',
                currentTheme.glow,
              )}
            />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/40 rounded-full blur-3xl" />
            <div className="relative p-5 z-10 flex items-center justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={cn(
                      'backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 transition-all duration-500',
                      'bg-white/10 border-white/20',
                      currentTheme.accentText,
                    )}
                  >
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    Wrapped 2024
                  </div>
                </div>
                <h3 className="text-white font-black text-xl italic tracking-tight drop-shadow-lg leading-none mb-1">
                  SUA{' '}
                  <span
                    className={cn(
                      'transition-colors duration-500',
                      currentTheme.accentText,
                    )}
                  >
                    RETROSPECTIVA
                  </span>
                </h3>
                <p className="text-white/80 text-xs font-medium opacity-90">
                  Assista agora aos seus melhores momentos!
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors z-20 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsThemeSelectorOpen(true)
                  }}
                >
                  <Palette className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors z-20 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsShareDialogOpen(true)
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <div
                  className={cn(
                    'h-11 w-11 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 border-2 border-white/20',
                    currentTheme.cardGradient,
                  )}
                >
                  <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Radar Profile Views Card */}
        {isMe && (
          <Card
            className="mb-8 bg-gradient-to-r from-primary/10 via-background to-background border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors shadow-sm relative overflow-hidden"
            onClick={() => navigate('/profile/views')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 animate-pulse pointer-events-none" />
            <CardContent className="p-4 flex items-center justify-between relative z-10">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-primary/30 rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
                    <div className="bg-primary/20 p-2.5 rounded-full ring-2 ring-primary/30 relative z-10">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold rounded-full border-2 border-background z-20 shadow-[0_0_8px_hsl(var(--gold)/0.8)]" />
                  </div>

                  {/* Invisible Mode Toggle */}
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="inline-block relative z-20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isPremium ? (
                            <button
                              onClick={() =>
                                toggleInvisibleMode(!isInvisibleMode)
                              }
                              className={cn(
                                'p-2 rounded-full transition-all duration-300 active:scale-95 ring-2 relative group flex items-center justify-center',
                                isInvisibleMode
                                  ? 'bg-gold/15 text-gold shadow-[0_0_15px_hsl(var(--gold)/0.5)] ring-gold/40 hover:bg-gold/25 hover:scale-110'
                                  : 'bg-primary/5 text-primary shadow-sm ring-transparent hover:bg-primary/10 hover:scale-110 border border-primary/20',
                              )}
                              aria-label="Toggle Invisible Mode"
                            >
                              <GhostEmojiIcon
                                active={isInvisibleMode}
                                className={cn(
                                  'w-5 h-5 transition-transform duration-300',
                                  isInvisibleMode
                                    ? 'animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_5px_hsl(var(--gold))] scale-105'
                                    : 'group-hover:-translate-y-0.5 group-hover:rotate-6',
                                )}
                              />
                            </button>
                          ) : (
                            <PaymentDialog
                              title="Desbloquear Modo Invisível"
                              price={19.9}
                              pointsPrice={1000}
                              onSuccess={() => {
                                upgradeToPremium()
                                toggleInvisibleMode(true)
                              }}
                            >
                              <button
                                className="p-2 rounded-full bg-primary/5 text-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-sm active:scale-95 relative group flex items-center justify-center border border-primary/10 outline-none"
                                aria-label="Unlock Invisible Mode"
                              >
                                <GhostEmojiIcon className="w-5 h-5 opacity-70 group-hover:-translate-y-0.5 group-hover:rotate-6 transition-all duration-300" />
                                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow-sm border border-border group-hover:border-gold/50 transition-colors z-10">
                                  <Crown className="w-2.5 h-2.5 text-gold fill-gold" />
                                </div>
                              </button>
                            </PaymentDialog>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        sideOffset={15}
                        className="text-xs font-bold border-border/50 bg-background/95 backdrop-blur-md text-foreground shadow-xl rounded-lg py-2 px-3 flex items-center gap-2 z-[100]"
                      >
                        {isInvisibleMode ? (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold shadow-[0_0_5px_hsl(var(--gold))]"></span>
                          </span>
                        ) : (
                          <span className="relative flex h-2 w-2 rounded-full bg-muted-foreground/50"></span>
                        )}
                        <span>
                          {isInvisibleMode
                            ? 'Modo Invisível: Ativado'
                            : 'Modo Invisível: Desativado'}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="mt-1">
                  <p className="font-bold text-sm flex items-center gap-2">
                    Quem viu seu perfil
                    <div className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 border border-primary/30 shadow-[0_0_8px_hsl(var(--primary)/0.3)]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-80" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold shadow-[0_0_4px_hsl(var(--gold))]" />
                      </span>
                      <span className="text-[9px] font-black text-gold tracking-widest uppercase drop-shadow-md">
                        Ao Vivo
                      </span>
                    </div>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    142 visualizações
                  </p>
                  {isInvisibleMode && (
                    <Badge
                      variant="outline"
                      className="mt-2 text-[10px] bg-gold/10 text-gold border-gold/30 px-1.5 py-0 shadow-sm"
                    >
                      <GhostEmojiIcon active className="w-3 h-3 mr-1" />{' '}
                      Navegação Oculta
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex -space-x-2 pl-2">
                {[1, 2].map((i) => (
                  <div key={i} className="relative">
                    <Avatar className="h-8 w-8 border-2 border-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)] relative z-10">
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${i === 1 ? 'male' : 'female'}&seed=${i + 40}`}
                      />
                    </Avatar>
                    <div
                      className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30 z-0"
                      style={{ animationDuration: '2s' }}
                    />
                  </div>
                ))}
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-[9px] border-2 border-background font-bold text-primary shadow-sm relative z-10">
                  +9
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Improved Menu Hierarchy */}
        {isMe ? (
          <div className="space-y-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Trophy className="h-4 w-4 text-gold" />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Performance & Carreira
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-secondary text-foreground hover:bg-secondary/80 justify-start h-auto py-3 px-4 shadow-sm"
                  onClick={() => navigate('/profile/stats')}
                >
                  <BarChart2 className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Estatísticas</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Ver números
                    </span>
                  </div>
                </Button>
                <Button
                  className="bg-secondary text-foreground hover:bg-secondary/80 justify-start h-auto py-3 px-4 shadow-sm"
                  onClick={() => navigate('/ranking')}
                >
                  <Trophy className="mr-3 h-5 w-5 text-gold" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Ranking</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Sua posição
                    </span>
                  </div>
                </Button>
                <Button
                  className="bg-secondary text-foreground hover:bg-secondary/80 justify-start h-auto py-3 px-4 shadow-sm"
                  onClick={() => navigate('/profile/passport')}
                >
                  <IdCard className="mr-3 h-5 w-5 text-blue-500" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Passaporte</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Dados oficiais
                    </span>
                  </div>
                </Button>
                <Button
                  className="bg-secondary text-foreground hover:bg-secondary/80 justify-start h-auto py-3 px-4 shadow-sm"
                  onClick={() => navigate('/profile/evolution')}
                >
                  <TrendingUp className="mr-3 h-5 w-5 text-green-500" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Modo Evolução</span>
                    <span className="text-[10px] text-muted-foreground font-normal">
                      Seu progresso
                    </span>
                  </div>
                </Button>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary/10 to-gold/10 text-foreground hover:from-primary/20 border border-primary/20 justify-between shadow-sm font-bold mb-3 h-14"
                onClick={() => navigate('/timecapsule')}
              >
                <span className="flex items-center text-base text-foreground">
                  <Lock className="mr-3 h-5 w-5 text-gold" />
                  Goplay Time Capsule™
                </span>
                <Badge
                  variant="secondary"
                  className="bg-gold/20 text-gold border-none"
                >
                  NOVO
                </Badge>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-secondary/30 text-muted-foreground"
                onClick={() => navigate('/profile/timeline')}
              >
                <span className="flex items-center">
                  <History className="mr-3 h-4 w-4" />
                  Linha do Tempo
                </span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Zap className="h-4 w-4 text-purple-500" />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Inteligência Artificial
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-gradient-to-br from-red-600/10 to-red-900/10 text-red-600 dark:text-red-400 hover:from-red-600/20 border border-red-500/20 justify-start h-auto py-3 px-4 shadow-sm"
                  onClick={() => navigate('/ai/bot-da-verdade')}
                >
                  <Bot className="mr-3 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-sm">Bot da Verdade</span>
                    <span className="text-[10px] opacity-80 font-normal">
                      Análise direta
                    </span>
                  </div>
                </Button>
                <Button
                  className="bg-gradient-to-br from-primary/20 to-cyan-500/20 text-foreground hover:from-primary/30 hover:to-cyan-500/30 border border-primary/10 justify-start h-auto py-3 px-4 shadow-sm"
                  onClick={() => navigate('/ai/avatar')}
                >
                  <Sparkles className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-sm">AI Avatar</span>
                    <span className="text-[10px] opacity-80 font-normal">
                      Criar versão 3D
                    </span>
                  </div>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Store className="h-4 w-4 text-emerald-500" />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Loja & Benefícios
                </h3>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 hover:from-emerald-500/20 border border-emerald-500/20 justify-between shadow-sm font-medium"
                onClick={() => navigate('/profile/referral')}
              >
                <span className="flex items-center">
                  <Gift className="mr-3 h-5 w-5" />
                  Indicar Amigos
                </span>
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-600 border-none"
                >
                  +200 pts
                </Badge>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="justify-start bg-secondary/20 hover:bg-secondary/40 border-border/50"
                  onClick={() => navigate('/marketplace')}
                >
                  <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                  Loja Goplay
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-secondary/20 hover:bg-secondary/40 border-border/50"
                  onClick={() => navigate('/marketplace/orders')}
                >
                  <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                  Meus Pedidos
                </Button>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-secondary/30 text-muted-foreground"
                onClick={() => navigate('/profile/financial-statement')}
              >
                <span className="flex items-center">
                  <FileText className="mr-3 h-4 w-4" />
                  Extrato Financeiro
                </span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              className="bg-secondary text-foreground hover:bg-secondary/80 justify-start shadow-sm"
              onClick={() => navigate('/profile/stats')}
            >
              <BarChart2 className="mr-2 h-4 w-4" /> Estatísticas
            </Button>
            <Button
              className="bg-secondary text-foreground hover:bg-secondary/80 justify-start shadow-sm"
              onClick={() => navigate('/ranking')}
            >
              <Trophy className="mr-2 h-4 w-4" /> Ranking
            </Button>
          </div>
        )}

        <Tabs
          defaultValue="posts"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full flex overflow-x-auto bg-transparent border-b rounded-none h-12 p-0 scrollbar-hide justify-start">
            <TabsTrigger
              value="posts"
              className="flex-1 min-w-max px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Grid className="h-4 w-4 mr-2" /> Posts
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="flex-1 min-w-max px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Video className="h-4 w-4 mr-2" /> Media
            </TabsTrigger>
            <TabsTrigger
              value="replays"
              className="flex-1 min-w-max px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <PlayCircle className="h-4 w-4 mr-2" /> Replays
            </TabsTrigger>
            <TabsTrigger
              value="tagged"
              className="flex-1 min-w-max px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Users className="h-4 w-4 mr-2" /> Marcados
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="posts"
            className="mt-4 animate-in slide-in-from-bottom-2 duration-500"
          >
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <DepthContainer
                  key={post.id}
                  className="aspect-square bg-muted relative overflow-hidden cursor-pointer group"
                  maxRotation={5}
                >
                  <div
                    onClick={() => handlePostClick(post)}
                    className="w-full h-full relative"
                  >
                    <NostalgiaFilter intensity={0.5} />

                    {post.media && post.media.length > 0 ? (
                      <img
                        src={post.media[0]}
                        alt={post.title || 'Post'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove(
                            'hidden',
                          )
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <ImageOff className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    )}

                    <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center">
                      <ImageOff className="h-6 w-6 text-muted-foreground/50" />
                    </div>

                    {post.type === 'video' && (
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                        <Video className="h-3 w-3 text-white" />
                      </div>
                    )}

                    {post.media && post.media.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                        <Package className="h-3 w-3 text-white" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </DepthContainer>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="media"
            className="mt-4 animate-in slide-in-from-bottom-2 duration-500"
          >
            <div className="grid grid-cols-3 gap-1">
              {userPosts
                .filter((p) => p.type === 'video')
                .map((post) => (
                  <DepthContainer
                    key={post.id}
                    className="aspect-[4/5] bg-muted relative overflow-hidden cursor-pointer group rounded-sm"
                    maxRotation={5}
                  >
                    <div
                      onClick={() => handlePostClick(post)}
                      className="w-full h-full relative"
                    >
                      <img
                        src={post.media?.[0]}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://img.usecurling.com/p/300/300?q=abstract&color=black'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {post.videoDuration}
                      </div>

                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-medium drop-shadow-md">
                        <Play className="h-3 w-3 fill-white" />
                        {post.totalViews || '1.2k'}
                      </div>
                    </div>
                  </DepthContainer>
                ))}
              {userPosts.filter((p) => p.type === 'video').length === 0 && (
                <div className="col-span-3 flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Video className="h-10 w-10 mb-2 opacity-20" />
                  <p>Nenhum vídeo ainda</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="replays"
            className="mt-4 animate-in slide-in-from-bottom-2 duration-500"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {replays.map((replay) => (
                <DepthContainer
                  key={replay.id}
                  className="aspect-[16/9] bg-muted relative overflow-hidden cursor-pointer group rounded-xl"
                  maxRotation={5}
                >
                  <div
                    onClick={() => navigate(`/explore/replay/${replay.id}`)}
                    className="w-full h-full relative block"
                  >
                    <img
                      src={replay.image}
                      alt={replay.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <Badge
                        variant="secondary"
                        className="bg-black/60 text-white border-0 text-[10px] px-2 py-0.5 backdrop-blur-sm"
                      >
                        REPLAY
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex flex-col">
                      <span className="text-white text-sm font-bold truncate">
                        {replay.title}
                      </span>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-white/70 text-xs flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {replay.date}
                        </span>
                        <span className="text-white/70 text-xs font-mono bg-black/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {replay.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </DepthContainer>
              ))}
              {replays.length === 0 && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed rounded-xl border-border/50 bg-secondary/10">
                  <PlayCircle className="h-12 w-12 mb-3 opacity-20" />
                  <p className="font-medium">Nenhum replay disponível ainda</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    As transmissões ao vivo salvas aparecerão aqui.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="tagged"
            className="mt-4 animate-in slide-in-from-bottom-2 duration-500"
          >
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Users className="h-10 w-10 mb-2 opacity-20" />
              <p>Nenhuma marcação</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Admin Demo Tools */}
      {isMe && (
        <div className="px-4 mt-8 mb-4">
          <Card className="border-dashed border-primary/30 bg-primary/5 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <Wand2 className="h-4 w-4" /> Admin Demo Tools
                </h3>
              </div>
              <Button
                variant="outline"
                className="w-full bg-background border-purple-500/30 text-purple-600 hover:bg-purple-500/10 hover:text-purple-600 font-medium"
                onClick={handleSimulateMemory}
              >
                <History className="h-4 w-4 mr-2" /> Simular Memória (Viagem no
                Tempo)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <MusicSelector
        open={isMusicSelectorOpen}
        onOpenChange={setIsMusicSelectorOpen}
        onSelect={handleMusicSelect}
        selectedTrack={user.favoriteSong}
      />

      <RetrospectiveThemeSelector
        open={isThemeSelectorOpen}
        onOpenChange={setIsThemeSelectorOpen}
      />

      <AuraLegend open={isAuraLegendOpen} onOpenChange={setIsAuraLegendOpen} />
      <EcoLegend open={isEcoLegendOpen} onOpenChange={setIsEcoLegendOpen} />

      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        title={`Retrospectiva 2024 de ${user.name}`}
        description="Confira meus melhores momentos, estatísticas e conquistas da temporada no Goplay!"
        url={`${window.location.origin}/#/retrospective`}
        preview={
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 group">
            <div
              className={cn(
                'absolute inset-0 animate-gradient-xy',
                currentTheme.cardGradient,
              )}
              style={currentTheme.customVars as React.CSSProperties}
            />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://img.usecurling.com/p/600/300?q=stars%20space&color=black')",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div
                className={cn(
                  'backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 mb-3 shadow-sm bg-white/10 border-white/20',
                  currentTheme.accentText,
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Wrapped 2024
              </div>
              <h3 className="text-white font-black text-2xl italic tracking-tight drop-shadow-xl leading-none mb-2">
                RETROSPECTIVA
              </h3>
              <div className="flex items-center gap-2 justify-center">
                <span
                  className={cn('font-bold text-lg', currentTheme.accentText)}
                >
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-white/60 text-sm">•</span>
                <span className="text-white/80 text-sm font-medium">
                  Goplay Super Star
                </span>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 opacity-50">
              <AppIcon className="w-8 h-8 opacity-80" />
            </div>
          </div>
        }
      />

      <PostDetailDialog
        post={selectedPost}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  )
}
