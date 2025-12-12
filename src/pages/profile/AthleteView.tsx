import { ProfileData } from '@/lib/data'
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
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { mockVideos, mockPosts } from '@/lib/data'
import { PostCard } from '@/components/PostCard'

export default function AthleteView({ profile }: { profile: ProfileData }) {
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
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground text-sm">
                {profile.username}
              </p>
            </div>
            <Badge className="bg-primary/90 hover:bg-primary text-white">
              {profile.sport}
            </Badge>
          </div>

          <p className="text-sm mt-2 text-foreground/80">{profile.bio}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
            <span className="flex items-center gap-1 text-gold">
              <Star className="h-3 w-3 fill-current" /> {profile.rating}
            </span>
          </div>

          {/* Stats Row */}
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

          {/* Specific Athlete Action */}
          <Button
            className="w-full rounded-full bg-gradient-to-r from-primary to-purple-600 mb-6 shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Target className="h-5 w-5 mr-2" /> Convocar para Peneira/Treino
          </Button>

          {/* Interaction Row */}
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

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="videos">
              <Play className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="posts">
              <Grid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Trophy className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4">
            <h3 className="font-bold text-lg mb-2">Portfolio de Vídeos</h3>
            <div className="grid grid-cols-2 gap-3">
              {mockVideos.map((video) => (
                <div
                  key={video.id}
                  className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black"
                >
                  <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover opacity-80"
                    alt=""
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white fill-white opacity-80" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="posts">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
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
    </div>
  )
}
