import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Settings,
  Wallet,
  BarChart2,
  Trophy,
  Grid,
  Heart,
  Edit,
  Share2,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { mockCurrentUser, mockPosts } from '@/lib/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Profile() {
  const { id } = useParams()
  const isMe = !id || id === 'me'
  const user = mockCurrentUser

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header Image */}
      <div className="h-32 bg-gradient-to-r from-primary to-purple-600 relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="px-4 relative">
        {/* Profile Info */}
        <div className="-mt-12 flex justify-between items-end mb-4">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          {isMe && (
            <div className="flex gap-2 mb-2">
              <Link to="/settings">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Settings className="h-4 w-4 mr-1" /> Editar
                </Button>
              </Link>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {user.name}
            <Badge
              variant="secondary"
              className="text-xs bg-gold/20 text-yellow-700 hover:bg-gold/30"
            >
              Lvl {user.level}
            </Badge>
          </h1>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3" /> {user.location}
          </p>
          <p className="text-sm mt-3 leading-relaxed">
            Atleta apaixonado por futebol e corrida. Sempre em busca de superar
            limites. ⚽🏃‍♂️
          </p>
        </div>

        {/* Action Buttons - Including Statistics and Wallet */}
        {isMe && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Link to="/profile/stats">
              <Button
                variant="outline"
                className="w-full flex-col h-auto py-3 gap-1 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
              >
                <BarChart2 className="h-5 w-5" />
                <span className="text-xs font-medium">Estatísticas</span>
              </Button>
            </Link>

            <Link to="/wallet">
              <Button
                variant="outline"
                className="w-full flex-col h-auto py-3 gap-1 hover:bg-green-500/5 hover:text-green-600 hover:border-green-500/30"
              >
                <Wallet className="h-5 w-5" />
                <span className="text-xs font-medium">Carteira</span>
              </Button>
            </Link>

            <Link to="/ranking">
              <Button
                variant="outline"
                className="w-full flex-col h-auto py-3 gap-1 hover:bg-yellow-500/5 hover:text-yellow-600 hover:border-yellow-500/30"
              >
                <Trophy className="h-5 w-5" />
                <span className="text-xs font-medium">Ranking</span>
              </Button>
            </Link>
          </div>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="posts">
              <Grid className="h-4 w-4 mr-2" /> Posts
            </TabsTrigger>
            <TabsTrigger value="likes">
              <Heart className="h-4 w-4 mr-2" /> Curtidos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-1">
            <div className="grid grid-cols-3 gap-1">
              {/* Mock Grid of posts */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-secondary rounded-sm overflow-hidden relative group cursor-pointer"
                >
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=sports&seed=${i}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="likes">
            <div className="text-center py-12 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Nenhuma publicação curtida ainda.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
