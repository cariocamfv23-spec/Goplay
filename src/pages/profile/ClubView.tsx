import { ProfileData, mockEvents } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MapPin,
  Star,
  Users,
  Briefcase,
  Calendar,
  Image as ImageIcon,
  UserPlus,
  MessageCircle,
  ThumbsUp,
  Building2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ClubView({ profile }: { profile: ProfileData }) {
  return (
    <div className="pb-8 animate-fade-in">
      {/* Header */}
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
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg rounded-xl">
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
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground text-sm">{profile.username}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
            <span className="flex items-center gap-1 text-gold">
              <Star className="h-3 w-3 fill-current" /> {profile.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {profile.followers}
            </span>
          </div>

          <div className="flex gap-2 mb-6">
            <Button className="flex-1 rounded-full" variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" /> Recomendar
            </Button>
            <Button className="flex-1 rounded-full" variant="outline" size="sm">
              <Building2 className="h-4 w-4 mr-2" /> Website
            </Button>
          </div>
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="jobs">Vagas</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="gallery">
              <ImageIcon className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4">
            <Card className="border-none shadow-sm bg-secondary/10">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">Sobre Nós</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.about}
                </p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h4 className="font-semibold text-sm mb-1">Endereço</h4>
                  <p className="text-xs text-muted-foreground">
                    {profile.address}
                  </p>
                  <div className="h-32 w-full bg-muted mt-2 rounded-lg relative overflow-hidden">
                    <img
                      src="https://img.usecurling.com/p/600/300?q=map"
                      className="w-full h-full object-cover opacity-50"
                      alt="Map"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        Ver no Mapa
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn Style Feed Preview */}
            <div className="mt-6">
              <h3 className="font-bold mb-3">Publicações Recentes</h3>
              <div className="space-y-4">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-3 mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          2d atrás
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Estamos orgulhosos de anunciar nossa nova parceria com a
                      marca de materiais esportivos...
                    </p>
                    <img
                      src="https://img.usecurling.com/p/500/300?q=handshake"
                      className="w-full h-40 object-cover rounded-lg mt-3"
                      alt=""
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-3">
            <h3 className="font-bold text-lg mb-2">Vagas Abertas</h3>
            {profile.jobs?.map((job) => (
              <Card key={job.id} className="border-none shadow-sm">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{job.title}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {profile.location}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Ver
                  </Button>
                </CardContent>
              </Card>
            ))}
            {(!profile.jobs || profile.jobs.length === 0) && (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma vaga no momento.
              </p>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-3">
            <h3 className="font-bold text-lg mb-2">Próximos Eventos</h3>
            {profile.events?.map((event) => (
              <Card key={event.id} className="border-none shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary shrink-0">
                    <span className="text-xs font-bold uppercase">AGO</span>
                    <span className="text-xl font-bold">
                      {event.date.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {profile.location}
                    </p>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Calendar className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video bg-muted rounded-lg">
                  <img
                    src={`https://img.usecurling.com/p/400/225?q=sports%20club&seed=${i}`}
                    className="w-full h-full object-cover rounded-lg"
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
