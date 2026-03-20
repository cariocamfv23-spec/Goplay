import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Star,
  Award,
  Calendar,
  MessageCircle,
  Briefcase,
  UserPlus,
  Crown,
  Activity,
  ArrowLeft,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

export default function CoachView({ profile }: { profile: ProfileData }) {
  const navigate = useNavigate()

  return (
    <div className="pb-8 animate-fade-in relative bg-background min-h-screen">
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
            <Briefcase className="w-4 h-4" /> Coach / Treinador
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
              {profile.rating || '4.8'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Coach Details Card */}
        <Card className="border-primary/10 shadow-sm bg-gradient-to-br from-secondary/50 to-transparent">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Equipe Atual
                </p>
                <p className="font-bold text-base">
                  {profile.team || 'Independente'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3" /> Licença
                </span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary w-fit shadow-sm"
                >
                  {profile.license || 'Nível Avançado'}
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Estilo de Jogo
                </span>
                <span className="text-sm font-bold text-foreground leading-tight">
                  {profile.playstyle || 'Posicional & Ofensivo'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modalidades / Categories */}
        <div className="space-y-3 mt-2">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-1">
            Modalidades
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-secondary text-secondary-foreground border-none px-3 py-1 shadow-sm">
              Futebol
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground border-none px-3 py-1 shadow-sm">
              Futsal
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground border-none px-3 py-1 shadow-sm">
              Society
            </Badge>
          </div>
        </div>

        <Button className="w-full mt-6 h-14 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-purple-700 shadow-lg shadow-primary/20">
          <Calendar className="mr-2 h-5 w-5" /> Agendar Mentoria
        </Button>
      </div>
    </div>
  )
}
