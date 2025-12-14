import { mockCurrentUser, mockPosts } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Settings,
  MapPin,
  Grid,
  Video,
  Trophy,
  BarChart2,
  Users,
  FileText,
  ShoppingBag,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AthleteView({
  user = mockCurrentUser,
  isMe = true,
}: {
  user?: any
  isMe?: boolean
}) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('posts')

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
              className="bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary hover:bg-secondary/80 justify-start border border-primary/20 col-span-2"
              onClick={() => navigate('/marketplace')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Acessar Loja Goplay
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
    </div>
  )
}
