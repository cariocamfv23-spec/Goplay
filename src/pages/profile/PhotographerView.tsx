import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MapPin,
  Star,
  UserPlus,
  MessageCircle,
  Image as ImageIcon,
  DollarSign,
  CalendarCheck,
  FileText,
  Camera,
  Layers,
  ChevronLeft,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

export default function PhotographerView({
  profile,
}: {
  profile: ProfileData
}) {
  const navigate = useNavigate()

  // Simulate if this is the logged-in user's profile for demo purposes
  const isOwnProfile = false

  return (
    <div className="pb-8 animate-fade-in">
      {/* Immersive Header */}
      <div className="relative h-64 w-full bg-muted">
        <img
          src={profile.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-5 relative -mt-20 mb-6">
        <div className="flex justify-between items-end">
          <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mb-4 items-center">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white shadow-md rounded-full px-6"
            >
              <UserPlus className="h-4 w-4 mr-2" /> Seguir
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-sm bg-secondary hover:bg-secondary/80"
              onClick={() => navigate(`/messages/user-${profile.id}`)}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-primary font-medium text-sm">{profile.username}</p>
          <p className="text-sm mt-3 text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {profile.categories?.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="text-xs px-3 py-1 bg-secondary/50 hover:bg-secondary"
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm font-medium mt-4 pt-4 border-t border-border/50">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {profile.location}
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Star className="h-4 w-4 fill-gold text-gold" /> {profile.rating}{' '}
              <span className="text-muted-foreground font-normal">
                (42 avaliações)
              </span>
            </span>
          </div>

          {isOwnProfile && (
            <Button
              variant="outline"
              className="w-full mt-6 border-dashed border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
              onClick={() => navigate('/financials/transactions')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Ver Extrato Financeiro
            </Button>
          )}
        </div>
      </div>

      <div className="px-2">
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 p-1 bg-secondary/50 rounded-xl">
            <TabsTrigger
              value="packages"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <DollarSign className="h-4 w-4 mr-2" /> Pacotes & Preços
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <ImageIcon className="h-4 w-4 mr-2" /> Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="packages"
            className="space-y-4 px-2 animate-in slide-in-from-bottom-2 duration-500"
          >
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="text-lg font-bold">Serviços Disponíveis</h3>
              <span className="text-xs text-muted-foreground">
                {profile.packages?.length || 0} opções
              </span>
            </div>

            {profile.packages?.map((pkg, i) => (
              <Card
                key={i}
                className="border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{pkg.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-snug">
                        {pkg.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-lg font-bold text-primary border-primary/20 bg-primary/5 whitespace-nowrap ml-2"
                    >
                      {pkg.price}
                    </Badge>
                  </div>
                  <Button className="w-full rounded-xl gap-2 font-bold mt-2">
                    <CalendarCheck className="h-4 w-4" /> Contratar Serviço
                  </Button>
                </CardContent>
              </Card>
            ))}

            {(!profile.packages || profile.packages.length === 0) && (
              <div className="text-center py-8 bg-muted/30 rounded-xl border border-dashed">
                <p className="text-muted-foreground text-sm">
                  Nenhum pacote disponível no momento.
                </p>
                <Button variant="link" className="text-primary mt-2">
                  Entrar em contato
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="portfolio"
            className="space-y-6 px-2 animate-in slide-in-from-bottom-2 duration-500"
          >
            {/* Featured Projects Section (New Detailed Portfolio) */}
            {profile.portfolioProjects &&
              profile.portfolioProjects.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 px-1">
                    <Layers className="h-4 w-4" /> Projetos em Destaque
                  </h3>
                  {profile.portfolioProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden border-none shadow-md group cursor-pointer"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={project.cover}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                          <h4 className="text-white font-bold text-xl mb-1">
                            {project.title}
                          </h4>
                          <span className="text-white/80 text-xs font-medium bg-white/10 px-2 py-0.5 rounded w-fit backdrop-blur-md">
                            {project.date}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.description}
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                          {project.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              className="h-20 w-20 object-cover rounded-lg flex-shrink-0 shadow-sm border border-border/50"
                              alt=""
                            />
                          ))}
                          <div className="h-20 w-20 bg-muted/50 rounded-lg flex flex-col items-center justify-center text-xs text-muted-foreground flex-shrink-0 border border-dashed border-border">
                            <ImageIcon className="h-5 w-5 mb-1 opacity-50" />
                            Ver Mais
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

            {/* Legacy Grid Portfolio */}
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-3 px-1 mt-6">
                <Camera className="h-4 w-4" /> Galeria Rápida
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {profile.portfolio?.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted rounded-xl overflow-hidden group relative shadow-sm"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
                {(!profile.portfolio || profile.portfolio.length === 0) &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i + 10}
                      className="aspect-square bg-muted rounded-xl overflow-hidden group"
                    >
                      <img
                        src={`https://img.usecurling.com/p/300/300?q=sports%20action&seed=${i}`}
                        className="w-full h-full object-cover opacity-50 grayscale transition-all group-hover:grayscale-0 group-hover:opacity-100"
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
