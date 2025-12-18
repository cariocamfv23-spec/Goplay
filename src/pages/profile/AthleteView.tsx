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

  const { getTheme } = useRetrospectiveStore()
  const currentTheme = getTheme()

  const handleMusicSelect = (track: MusicTrack) => {
    setUser({ ...user, favoriteSong: track })
    toast.success('Música do perfil atualizada!', {
      description: `${track.title} - ${track.artist}`,
      icon: <Music className="h-4 w-4 text-primary" />,
    })
  }

  return (
    <div className="pb-8 animate-fade-in">
      <div className="h-32 bg-muted relative">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="px-4 relative -mt-12 mb-4">
        <div className="flex justify-between items-end mb-4">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mb-2">
            {isMe ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/settings')}
              >
                Editar Perfil
              </Button>
            ) : (
              <>
                <Button size="sm" className="bg-primary text-white">
                  Seguir
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/messages/user-${user.id}`)}
                >
                  Mensagem
                </Button>
              </>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            {user.name}
            {user.level && (
              <span className="text-[10px] bg-gold text-black px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                LVL {user.level}
              </span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mb-2">{user.role}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <MapPin className="h-3 w-3" /> {user.location}
          </div>

          {/* Athlete Music Section */}
          <div className="mb-4">
            {user.favoriteSong ? (
              <div className="bg-secondary/30 rounded-lg p-2 flex items-center gap-3 border border-border/50">
                <div className="h-10 w-10 bg-black rounded-md overflow-hidden relative shrink-0">
                  <img
                    src={user.favoriteSong.cover}
                    alt="Album"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Music className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-0.5 flex items-center gap-1">
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
                  className="w-full border-dashed text-muted-foreground hover:text-primary mb-2"
                  onClick={() => setIsMusicSelectorOpen(true)}
                >
                  <Music className="h-4 w-4 mr-2" /> Adicionar Música do Atleta
                </Button>
              )
            )}
          </div>

          <p className="text-sm leading-relaxed mb-4">{user.bio}</p>

          <div className="flex gap-6 text-sm mb-6 border-b border-border/50 pb-4">
            <div className="flex flex-col">
              <span className="font-bold text-lg">{user.followers || 0}</span>
              <span className="text-muted-foreground text-xs">Seguidores</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">{user.following || 0}</span>
              <span className="text-muted-foreground text-xs">Seguindo</span>
            </div>
            {user.stats && (
              <>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">
                    {user.stats.matches || 0}
                  </span>
                  <span className="text-muted-foreground text-xs">Jogos</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">
                    {user.stats.mvp || 0}
                  </span>
                  <span className="text-muted-foreground text-xs text-gold">
                    MVPs
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Retrospective Banner - Premium Super Star UI */}
        {isMe && (
          <div
            onClick={() => navigate('/retrospective')}
            className="mb-6 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/10"
            style={currentTheme.customVars as React.CSSProperties}
          >
            {/* Premium Animated Background */}
            <div
              className={cn(
                'absolute inset-0 animate-gradient-xy transition-all duration-500',
                currentTheme.cardGradient,
              )}
            />

            {/* Starfield Texture */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://img.usecurling.com/p/600/300?q=stars%20space&color=black')",
              }}
            />

            {/* Glow Effects */}
            <div
              className={cn(
                'absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl animate-pulse transition-all duration-500',
                currentTheme.glow,
              )}
            />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/40 rounded-full blur-3xl" />

            {/* Content */}
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
                {/* Customize Button */}
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

                {/* Share Button */}
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

                {/* Play Button */}
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
            className="mb-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors shadow-sm"
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

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Button
            className="bg-secondary text-foreground hover:bg-secondary/80 justify-start"
            onClick={() => navigate('/profile/stats')}
          >
            <BarChart2 className="mr-2 h-4 w-4" /> Estatísticas
          </Button>
          <Button
            className="bg-secondary text-foreground hover:bg-secondary/80 justify-start"
            onClick={() => navigate('/ranking')}
          >
            <Trophy className="mr-2 h-4 w-4" /> Ranking
          </Button>
          {isMe && (
            <Button
              className="bg-secondary text-foreground hover:bg-secondary/80 justify-start"
              onClick={() => navigate('/profile/passport')}
            >
              <IdCard className="mr-2 h-4 w-4" /> Passaporte
            </Button>
          )}
          {isMe && (
            <Button
              className="bg-secondary text-foreground hover:bg-secondary/80 justify-start"
              onClick={() => navigate('/profile/timeline')}
            >
              <History className="mr-2 h-4 w-4" /> Linha do Tempo
            </Button>
          )}
          {isMe && (
            <Button
              className="bg-secondary text-foreground hover:bg-secondary/80 justify-start col-span-2"
              onClick={() => navigate('/profile/evolution')}
            >
              <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
              Modo Evolução
            </Button>
          )}
          {isMe && (
            <Button
              className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 hover:from-emerald-500/20 border border-emerald-500/20 justify-start shadow-sm col-span-2 font-bold"
              onClick={() => navigate('/profile/referral')}
            >
              <Gift className="mr-2 h-4 w-4" /> Indicar Amigos (+200 pts)
            </Button>
          )}
          {isMe && (
            <Button
              className="bg-gradient-to-r from-primary/20 to-cyan-500/20 text-foreground hover:from-primary/30 hover:to-cyan-500/30 border border-primary/10 justify-start shadow-sm col-span-2"
              onClick={() => navigate('/ai/avatar')}
            >
              <Sparkles className="mr-2 h-4 w-4 text-primary" /> AI Avatar
            </Button>
          )}
          {isMe && (
            <Button
              className="bg-secondary/30 text-primary hover:bg-secondary/50 border border-primary/20 justify-start w-full"
              variant="outline"
              onClick={() => navigate('/marketplace')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Loja Goplay
            </Button>
          )}
          {isMe && (
            <Button
              className="bg-secondary/30 text-foreground hover:bg-secondary/50 border border-border/50 justify-start w-full"
              variant="outline"
              onClick={() => navigate('/marketplace/orders')}
            >
              <Package className="mr-2 h-4 w-4" /> Meus Pedidos
            </Button>
          )}
        </div>

        {isMe && (
          <Button
            className="w-full mb-6 bg-secondary/30 text-primary hover:bg-secondary/50 border border-primary/20 justify-start"
            variant="outline"
            onClick={() => navigate('/profile/financial-statement')}
          >
            <FileText className="mr-2 h-4 w-4" /> Extrato Financeiro
          </Button>
        )}

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

          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {mockPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-muted relative overflow-hidden cursor-pointer hover:opacity-90"
                >
                  <img
                    src={post.image || post.media?.[0]}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  {post.type === 'video' && (
                    <div className="absolute top-1 right-1">
                      <Video className="h-4 w-4 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="media">
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Video className="h-10 w-10 mb-2 opacity-20" />
              <p>Nenhum vídeo ainda</p>
            </div>
          </TabsContent>
          <TabsContent value="tagged">
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
    </div>
  )
}
