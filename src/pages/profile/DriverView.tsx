import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Star,
  MessageCircle,
  Navigation,
  ShieldCheck,
  Clock,
  Phone,
  Video,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export default function DriverView({ profile }: { profile: ProfileData }) {
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
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mb-2 items-center">
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground text-sm">
                {profile.username}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1 text-gold font-bold text-lg">
                <Star className="h-5 w-5 fill-current" /> {profile.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                {profile.rides} corridas
              </span>
            </div>
          </div>

          <p className="text-sm mt-4 font-medium">{profile.bio}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-3 mb-6">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <ShieldCheck className="h-3 w-3" /> Motorista Verificado
            </span>
            {profile.responseTime && (
              <Badge variant="outline" className="text-xs font-normal gap-1">
                <Clock className="h-3 w-3" /> Resp. {profile.responseTime}
              </Badge>
            )}
          </div>

          <Card className="bg-secondary/20 border-none shadow-sm mb-6">
            <CardContent className="p-4 flex items-center gap-4">
              {profile.car?.photo && (
                <div className="h-16 w-24 rounded-lg overflow-hidden bg-white shrink-0">
                  <img
                    src={profile.car.photo}
                    className="w-full h-full object-cover"
                    alt="Car"
                  />
                </div>
              )}
              <div>
                <h3 className="font-bold">{profile.car?.model}</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.car?.color} • {profile.car?.plate}
                </p>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full h-14 rounded-full text-lg shadow-lg font-bold bg-gradient-to-r from-primary to-purple-800"
            onClick={() => navigate(`/ride/request/${profile.id}`)}
          >
            <Navigation className="h-5 w-5 mr-2" /> Solicitar Corrida
          </Button>
        </div>
      </div>
    </div>
  )
}
