import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Link as LinkIcon, Calendar, Grid } from 'lucide-react'
import { mockPosts } from '@/lib/data'

const Profile = () => {
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="relative h-32 bg-gradient-primary"></div>
      <div className="px-4 relative">
        <Avatar className="h-24 w-24 border-4 border-background absolute -top-12">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
          <AvatarFallback>EU</AvatarFallback>
        </Avatar>
        <div className="pt-14 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Lucas Oliveira</h1>
            <p className="text-muted-foreground">
              Atleta de Futebol • Meia-atacante
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> São Paulo, SP
              </span>
              <span className="flex items-center gap-1">
                <LinkIcon className="h-3 w-3" /> highlight.com
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="rounded-full">
              Editar
            </Button>
            <Button size="sm" className="rounded-full">
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6 border-y border-border py-4">
          <div className="text-center">
            <div className="font-bold text-lg">1.2k</div>
            <div className="text-xs text-muted-foreground">Seguidores</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">450</div>
            <div className="text-xs text-muted-foreground">Seguindo</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">89</div>
            <div className="text-xs text-muted-foreground">Jogos</div>
          </div>
        </div>

        {/* Content */}
        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="posts">
              <Grid className="h-4 w-4 mr-2" /> Posts
            </TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="info">Sobre</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="space-y-4">
            {/* Reusing fake posts grid */}
            <div className="grid grid-cols-3 gap-1">
              {mockPosts.map((_, i) => (
                <div key={i} className="aspect-square bg-muted">
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=sports&seed=${i}`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i + 10} className="aspect-square bg-muted">
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=training&seed=${i}`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="videos">
            <div className="text-center text-muted-foreground py-10">
              Nenhum vídeo ainda
            </div>
          </TabsContent>
          <TabsContent value="info">
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-1">Bio</h3>
                <p className="text-muted-foreground">
                  Apaixonado por futebol desde os 5 anos. Buscando oportunidades
                  profissionalmente.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Características</h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-secondary rounded text-xs">
                    Velocidade
                  </span>
                  <span className="px-2 py-1 bg-secondary rounded text-xs">
                    Drible
                  </span>
                  <span className="px-2 py-1 bg-secondary rounded text-xs">
                    Finalização
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
