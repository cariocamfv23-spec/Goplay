import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Star,
  MessageCircle,
  UserPlus,
  Crown,
  Search,
  Briefcase,
  Globe,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

export default function ScoutView({ profile }: { profile: ProfileData }) {
  const navigate = useNavigate()

  return (
    <div className="pb-8 animate-fade-in relative bg-background min-h-screen">
      {/* Immersive Premium Header */}
      <div className="relative h-56 w-full bg-muted overflow-hidden">
        <img
          src={profile.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-5 relative -mt-16 mb-6">
        <div className="flex justify-between items-end mb-4">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-gold to-yellow-600 rounded-full p-1.5 shadow-[0_0_15px_hsl(var(--gold)/0.5)] border-2 border-background">
              <Crown className="w-4 h-4 text-black fill-black" />
            </div>
          </div>
          <div className="flex gap-2 pb-1">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 rounded-full px-5">
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

        <div className="mt-2">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {profile.name}
            <Badge className="bg-gold/20 text-gold hover:bg-gold/30 border-none font-bold uppercase tracking-wider text-[10px]">
              <Crown className="w-3 h-3 mr-1" /> VIP Verificado
            </Badge>
          </h1>
          <p className="text-primary font-bold text-sm flex items-center gap-1.5 mt-1">
            <Search className="w-4 h-4" /> Scout Oficial
          </p>

          <p className="text-sm mt-4 text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium mt-4 pt-4 border-t border-border/50">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary/70" /> {profile.location}
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Star className="h-4 w-4 fill-gold text-gold" />{' '}
              {profile.rating || '5.0'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Professional Details Card */}
        <Card className="border-primary/10 shadow-sm bg-gradient-to-br from-secondary/50 to-transparent">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Agência / Clube
                </p>
                <p className="font-bold">{profile.agency || 'Independente'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Experiência
                </p>
                <p className="font-bold">
                  {profile.experience || '+5 anos no mercado'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regions Covered */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-1">
            Regiões de Atuação
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.regionsCovered?.map((region, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-background border-primary/20 text-primary px-3 py-1 text-sm font-medium shadow-sm"
              >
                {region}
              </Badge>
            ))}
            {!profile.regionsCovered && (
              <Badge
                variant="outline"
                className="bg-background border-primary/20 text-primary px-3 py-1"
              >
                Global
              </Badge>
            )}
          </div>
        </div>

        {/* Recent Discoveries */}
        <div className="space-y-3 mt-6">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-1 flex items-center justify-between">
            Descobertas Recentes
            <Button
              variant="link"
              className="text-primary text-xs h-auto p-0 font-normal"
            >
              Ver todas <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {profile.recentDiscoveries?.map((athlete, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <Avatar className="w-12 h-12 border border-primary/20">
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${idx + 80}`}
                  />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-sm">{athlete}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-gold" /> Destaque da
                    Temporada
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full"
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full mt-6 h-12 font-bold text-base bg-gradient-to-r from-primary to-purple-700 shadow-lg shadow-primary/20">
          Enviar Material
        </Button>
      </div>
    </div>
  )
}
