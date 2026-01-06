import { mockCurrentUser, mockPosts, MusicTrack } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Grid,
  Video,
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
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
  const currentTheme = getTheme()
  const auraConfig = getAuraConfig(user)

  // Filter posts based on user if needed. Currently showing all mockPosts for demo
  const userPosts = mockPosts

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

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in relative">
      {/* Cinematic Profile Background Contextual Aura */}
      {auraConfig.type !== 'none' && (
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          style={{ height: '500px' }}
        >
          {/* Main Gradient */}
          <div
            className="absolute top-0 inset-x-0 h-full opacity-10 mix-blend-screen transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${auraConfig.colorEnd}, transparent 70%)`,
            }}
          />
          {/* Secondary Pulse */}
          <div
            className="absolute top-0 inset-x-0 h-full opacity-5 mix-blend-plus-lighter animate-pulse transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${auraConfig.colorStart}, transparent 60%)`,
            }}
          />
        </div>
      )}

      {/* Cover Image */}
      <div className="h-32 bg-muted relative overflow-hidden group z-10">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://img.usecurling.com/p/800/400?q=abstract%20gradient&color=blue'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="px-4 relative -mt-12 mb-4 z-10">
        <div className="flex justify-between items-end mb-4">
          <div className="relative">
            {/* Eco Humano Waves - Background Layer */}
            <EcoHumanoWaves
              profile={user}
              className="scale-150 opacity-80 -z-10"
            />

            {/* Athlete Aura - Foreground Layer */}
            <AthleteAura profile={user} size="xl" showLabel className="-ml-1">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg relative z-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </AthleteAura>
          </div>

          <div className="flex gap-2 mb-2 items-center">
            {isMe ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-background/80 backdrop-blur-sm shadow-sm"
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
                  className="text-[10px] bg-gold text-black px-1.5 py-0 border-none font-bold uppercase tracking-wider"
                >
                  LVL {user.level}
                </Badge>
              )}
            </h1>
            {/* Aura Legend Trigger */}
            <button
              onClick={() => setIsAuraLegendOpen(true)}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Legenda da Aura"
            >
              <Info className="w-4 h-4" />
            </button>
            {/* Eco Legend Trigger */}
            <button
              onClick={() => setIsEcoLegendOpen(true)}
              className="text-muted-foreground hover:text-emerald-500 transition-colors"
              aria-label="Eco Humano"
            >
              <Waves className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground font-medium mb-1">
            {user.role}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <MapPin className="h-3 w-3" /> {user.location}
          </div>

          {/* Social Stats Row */}
          <div className="flex items-center justify-between bg-secondary/20 p-3 rounded-xl border border-border/50 mb-5">
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

          {/* Bio & Music */}
          <p className="text-sm leading-relaxed mb-4 text-foreground/90">
            {user.bio}
          </p>

          <div className="mb-6">
            {user.favoriteSong ? (
              <div className="bg-secondary/30 rounded-lg p-2 flex items-center gap-3 border border-border/50">
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

        {isMe && (
          <Card
            className="mb-8 bg-gradient-to-r from-primary/10 to-transparent border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors shadow-sm"
            onClick={() => navigate('/profile/views')}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2.5 rounded-full ring-2 ring-primary/10">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Quem viu seu perfil</p>
                  <p className="text-xs text-muted-foreground">
                    142 visualizações
                  </p>
                </div>
              </div>
              <div className="flex -space-x-2 pl-2">
                {[1, 2, 3].map((i) => (
                  <Avatar
                    key={i}
                    className="h-7 w-7 border-2 border-background shadow-sm"
                  >
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 40}`}
                    />
                  </Avatar>
                ))}
                <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-[9px] border-2 border-background font-bold text-primary shadow-sm">
                  +9
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Improved Menu Hierarchy */}
        {isMe ? (
          <div className="space-y-6 mb-8">
            {/* Performance Section */}
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

            {/* AI & Tools Section */}
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

            {/* Commerce & Rewards Section */}
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
          /* Public Actions for Visitor */
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

        {/* Content Tabs */}
        <Tabs
          defaultValue="posts"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full grid grid-cols-3 bg-transparent border-b rounded-none h-12 p-0">
            <TabsTrigger
              value="posts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Grid className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Video className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger
              value="tagged"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Users className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="posts"
            className="mt-4 animate-in slide-in-from-bottom-2 duration-500"
          >
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-muted relative overflow-hidden cursor-pointer hover:opacity-90 group"
                  onClick={() => handlePostClick(post)}
                >
                  {post.media && post.media.length > 0 ? (
                    <img
                      src={post.media[0]}
                      alt={post.title || 'Post'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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

                  {/* Fallback container hidden by default */}
                  <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center">
                    <ImageOff className="h-6 w-6 text-muted-foreground/50" />
                  </div>

                  {post.type === 'video' && (
                    <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                      <Video className="h-3 w-3 text-white" />
                    </div>
                  )}
                  {post.media && post.media.length > 1 && (
                    <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                      <Package className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
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
                  <div
                    key={post.id}
                    className="aspect-square bg-muted relative overflow-hidden cursor-pointer hover:opacity-90 group"
                    onClick={() => handlePostClick(post)}
                  >
                    <img
                      src={post.media?.[0]}
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://img.usecurling.com/p/300/300?q=abstract&color=black'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <Play className="h-8 w-8 text-white fill-white opacity-80" />
                    </div>
                    <div className="absolute bottom-1 right-1 text-[10px] text-white bg-black/60 px-1 rounded">
                      {post.videoDuration}
                    </div>
                  </div>
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
