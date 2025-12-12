import { ProfileData, mockHighlights, NarrationConfig } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Star,
  Trophy,
  History,
  Grid,
  Play,
  UserPlus,
  MessageCircle,
  ThumbsUp,
  Target,
  Award,
  Video,
  Sparkles,
  Mail,
  Zap,
  Activity,
  Ruler,
  Weight,
  CalendarDays,
  Footprints,
  Calendar,
  MessageSquare,
  Mic,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { mockPosts } from '@/lib/data'
import { PostCard } from '@/components/PostCard'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import * as LucideIcons from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { StatsHistoryChart } from '@/components/StatsHistoryChart'
import { TrainingSuggestions } from '@/components/TrainingSuggestions'
import TrainingSchedule from './TrainingSchedule'
import { FeedbackList } from '@/components/FeedbackList'
import { NarrationEditor } from '@/components/NarrationEditor'
import { useState } from 'react'
import { DigitalCard } from '@/components/DigitalCard'

export default function AthleteView({ profile }: { profile: ProfileData }) {
  const [showNarrationEditor, setShowNarrationEditor] = useState(false)
  const [selectedHighlight, setSelectedHighlight] = useState<any>(null)

  const renderIcon = (iconName: string, className?: string) => {
    const Icon = (LucideIcons as any)[iconName]
    return Icon ? <Icon className={className} /> : null
  }

  const handleGenerateReel = () => {
    toast.info('IA Gerando Highlight Reel', {
      description:
        'Isso pode levar alguns segundos. Te avisaremos quando estiver pronto!',
      icon: <Sparkles className="h-5 w-5 text-gold" />,
    })
  }

  const handleEditNarration = (highlight: any) => {
    setSelectedHighlight(highlight)
    setShowNarrationEditor(true)
  }

  return (
    <div className="pb-8 animate-fade-in">
      {/* Header with Cover */}
      <div className="relative h-48 w-full bg-muted">
        <img
          src={profile.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="px-4 relative -mt-12 mb-4">
        <div className="flex justify-between items-end">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mb-2">
            <Button size="sm" className="rounded-full shadow-md">
              <UserPlus className="h-4 w-4 mr-1" /> Seguir
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {profile.name}
                <Link to="/profile/passport">
                  <ShieldCheck className="h-5 w-5 text-blue-500 cursor-pointer" />
                </Link>
              </h1>
              <p className="text-muted-foreground text-sm">
                {profile.username}
              </p>
            </div>
            <Badge className="bg-primary/90 hover:bg-primary text-white">
              {profile.sport}
            </Badge>
          </div>

          {/* Quick Actions for Invites, Points, and AI Features */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Link to="/profile/passport" className="flex-1">
              <Button
                variant="outline"
                className="w-full text-[10px] px-0 h-9 border-blue-500/20 bg-blue-500/5 text-blue-600 hover:bg-blue-500/10"
              >
                <ShieldCheck className="h-3 w-3 mr-1" /> Passaporte
              </Button>
            </Link>
            <Link to="/profile/evolution" className="flex-1">
              <Button
                variant="outline"
                className="w-full text-[10px] px-0 h-9 border-purple-500/20 bg-purple-500/5 text-purple-600 hover:bg-purple-500/10"
              >
                <TrendingUp className="h-3 w-3 mr-1" /> Evolução
              </Button>
            </Link>
            <Link to="/ai/oracle" className="flex-1">
              <Button
                variant="outline"
                className="w-full text-[10px] px-0 h-9 border-gold/30 bg-gold/5 text-yellow-700 hover:bg-gold/10"
              >
                <Sparkles className="h-3 w-3 mr-1 text-gold" /> Oráculo
              </Button>
            </Link>
          </div>

          {profile.points && (
            <div className="flex items-center gap-4 mt-3 mb-2">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                <Trophy className="h-4 w-4" />
                <span>{profile.points} pts</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>Ranking #{profile.rank}</span>
              </div>
            </div>
          )}

          <p className="text-sm mt-2 text-foreground/80">{profile.bio}</p>

          {/* Physical Stats Display */}
          {profile.physicalStats && (
            <div className="grid grid-cols-4 gap-2 mt-4 bg-secondary/30 rounded-xl p-3 border border-border/50">
              <div className="flex flex-col items-center text-center">
                <Ruler className="h-4 w-4 text-muted-foreground mb-1" />
                <span className="text-xs font-bold">
                  {profile.physicalStats.height}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Weight className="h-4 w-4 text-muted-foreground mb-1" />
                <span className="text-xs font-bold">
                  {profile.physicalStats.weight}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <CalendarDays className="h-4 w-4 text-muted-foreground mb-1" />
                <span className="text-xs font-bold">
                  {profile.physicalStats.age} anos
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Footprints className="h-4 w-4 text-muted-foreground mb-1" />
                <span className="text-xs font-bold">
                  {profile.physicalStats.dominantFoot?.[0]}
                </span>
              </div>
            </div>
          )}

          {profile.badges && profile.badges.length > 0 && (
            <div className="flex gap-2 mt-4 mb-2 overflow-x-auto pb-2">
              {profile.badges.map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger>
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center border border-border shadow-sm">
                      {renderIcon(badge.icon, `h-5 w-5 ${badge.color}`)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-bold">{badge.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
            <span className="flex items-center gap-1 text-gold">
              <Star className="h-3 w-3 fill-current" /> {profile.rating}
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto py-4 no-scrollbar">
            {profile.stats?.map((stat, i) => (
              <Card
                key={i}
                className="min-w-[80px] border-none shadow-sm bg-secondary/30"
              >
                <CardContent className="p-3 text-center">
                  <div className="font-bold text-lg text-primary">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="w-full rounded-full bg-gradient-to-r from-primary to-purple-600 mb-6 shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Target className="h-5 w-5 mr-2" /> Convocar para Peneira/Treino
          </Button>

          <div className="flex justify-around border-y border-border py-3 mb-4">
            <div className="text-center">
              <span className="block font-bold text-lg">
                {profile.followers}
              </span>
              <span className="text-xs text-muted-foreground">Seguidores</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-lg">
                {profile.following}
              </span>
              <span className="text-xs text-muted-foreground">Seguindo</span>
            </div>
            <div className="flex flex-col justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-gold"
              >
                <ThumbsUp className="h-4 w-4 mr-1" /> Recomendar
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full flex justify-start overflow-x-auto mb-4 px-1 gap-2 no-scrollbar">
            <TabsTrigger value="posts" className="min-w-[40px]">
              <Grid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="stats" className="min-w-[40px]">
              <Activity className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="calendar" className="min-w-[40px]">
              <Calendar className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="feedback" className="min-w-[40px]">
              <MessageSquare className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="highlights" className="min-w-[40px]">
              <Video className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="history" className="min-w-[40px]">
              <History className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="gallery" className="min-w-[40px]">
              <Trophy className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="space-y-6">
              <div className="flex justify-end gap-2">
                <Link to="/ai/coach">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Zap className="h-4 w-4 text-gold" /> Coach IA
                  </Button>
                </Link>
                <Link to="/profile/stats">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Activity className="h-4 w-4" /> Ver Detalhes
                  </Button>
                </Link>
              </div>

              {profile.statsHistory ? (
                <StatsHistoryChart data={profile.statsHistory} />
              ) : (
                <div className="text-center p-8 bg-secondary/20 rounded-xl">
                  <p className="text-muted-foreground">
                    Histórico de estatísticas não disponível.
                  </p>
                </div>
              )}

              {profile.suggestedTraining && (
                <TrainingSuggestions suggestions={profile.suggestedTraining} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <TrainingSchedule />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackList />
          </TabsContent>

          <TabsContent value="highlights" className="space-y-4">
            <div className="bg-gradient-to-r from-purple-900 to-primary p-4 rounded-xl text-white mb-4 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold animate-pulse" /> AI
                  Highlight Reel
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Gere automaticamente um vídeo com seus melhores momentos.
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-primary font-bold"
                  onClick={handleGenerateReel}
                >
                  Gerar Reel Agora
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                <Video className="h-24 w-24" />
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2">Lances Salvos</h3>
            <div className="grid grid-cols-2 gap-3">
              {mockHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="relative rounded-xl overflow-hidden bg-black group cursor-pointer"
                  onClick={() => handleEditNarration(highlight)}
                >
                  <div className="aspect-video relative">
                    <img
                      src={highlight.thumbnail}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      alt={highlight.title}
                    />

                    {/* Narration Indicator */}
                    {(highlight as any).narration && (
                      <div className="absolute top-2 left-2 bg-gold/90 text-black px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                        <Mic className="h-3 w-3" /> AI
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white fill-white opacity-80" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                      {highlight.duration}
                    </div>
                  </div>
                  <div className="p-2 bg-card">
                    <h4 className="font-bold text-xs truncate">
                      {highlight.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {highlight.venue}
                    </p>
                    <p className="text-[10px] text-primary">{highlight.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <h3 className="font-bold text-lg mb-4">Histórico Esportivo</h3>
            <div className="space-y-6 pl-2">
              {profile.history?.map((item, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-border">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-primary">
                    {item.year}
                  </span>
                  <h4 className="font-bold text-base">{item.team}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-muted">
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=sports&seed=${i}`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedHighlight && (
        <NarrationEditor
          open={showNarrationEditor}
          onOpenChange={setShowNarrationEditor}
          videoThumbnail={selectedHighlight.thumbnail}
          initialConfig={selectedHighlight.narration}
          onSave={(config) => {
            toast.success('Highlight atualizado!')
            // In a real app, update state here
          }}
        />
      )}
    </div>
  )
}
