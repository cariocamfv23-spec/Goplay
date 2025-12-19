import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Star,
  Users,
  Trophy,
  MessageCircle,
  UserPlus,
  Phone,
  Video,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

export default function ClubView({ profile }: { profile: ProfileData }) {
  const navigate = useNavigate()

  return (
    <div className="pb-8 animate-fade-in">
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
          <div className="flex gap-2 mb-2 items-center">
            <Button size="sm" className="bg-primary text-white shadow-md">
              <UserPlus className="h-4 w-4 mr-1" /> Seguir
            </Button>
            <div className="flex bg-secondary/80 rounded-full p-1 gap-1 shadow-md">
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full h-9 w-9 p-0 hover:bg-background/80"
                onClick={() => navigate(`/messages/user-${profile.id}`)}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full h-9 w-9 p-0 hover:bg-background/80"
                onClick={() =>
                  navigate(`/messages/user-${profile.id}?action=voice`)
                }
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full h-9 w-9 p-0 hover:bg-background/80"
                onClick={() =>
                  navigate(`/messages/user-${profile.id}?action=video`)
                }
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {profile.name}
            <Badge variant="secondary" className="text-xs">
              Clube Oficial
            </Badge>
          </h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {profile.location}
          </p>

          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <span className="block font-bold text-lg">15</span>
              <span className="text-xs text-muted-foreground">Títulos</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-lg">1.2k</span>
              <span className="text-xs text-muted-foreground">Sócios</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-lg flex items-center justify-center gap-1">
                4.8 <Star className="h-3 w-3 fill-gold text-gold" />
              </span>
              <span className="text-xs text-muted-foreground">Avaliação</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gold" /> Próxima Partida
              </h3>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">vs. Corinthians</span>
                <span className="text-muted-foreground">24 Out, 16:00</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Elenco Principal
              </h3>
              <div className="flex -space-x-2 overflow-hidden py-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${i + 30}`}
                    />
                    <AvatarFallback>P{i}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                  +18
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
