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
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

export default function CoachView({ profile }: { profile: ProfileData }) {
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
            <Button size="sm" className="bg-primary text-white shadow-md">
              <UserPlus className="h-4 w-4 mr-2" />
              Seguir
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm"
              onClick={() => navigate(`/messages/user-${profile.id}`)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Mensagem
            </Button>
            <Button size="sm" className="bg-primary text-white shadow-md">
              <Briefcase className="h-4 w-4 mr-1" /> Contratar
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-primary font-medium">Treinador Licenciado</p>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {profile.location}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" />{' '}
              {profile.rating || 5.0}
            </div>
            <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-bold">
              Futebol
            </div>
            <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-bold">
              Futsal
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed">{profile.bio}</p>
        </div>

        <div className="mt-6 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" /> Certificações
              </h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>Licença A - CBF Academy</li>
                <li>Especialização em Tática - Barca Innovation Hub</li>
              </ul>
            </CardContent>
          </Card>

          <Button className="w-full h-12 rounded-xl text-lg font-bold">
            <Calendar className="mr-2 h-5 w-5" /> Agendar Aula
          </Button>
        </div>
      </div>
    </div>
  )
}
