import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MapPin,
  Star,
  UserPlus,
  MessageCircle,
  ThumbsUp,
  Award,
  CalendarCheck,
  DollarSign,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function CoachView({ profile }: { profile: ProfileData }) {
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
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
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
          <p className="text-sm mt-2 font-medium">{profile.bio}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
            <span className="flex items-center gap-1 text-gold">
              <Star className="h-3 w-3 fill-current" /> {profile.rating} (128
              avaliações)
            </span>
          </div>

          <div className="flex gap-2 mb-6">
            <Button className="flex-1 rounded-full" variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" /> Recomendar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="details">Detalhes & Agenda</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Specialties */}
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Especialidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.specialties?.map((spec, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-3 py-1 text-sm font-normal"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />{' '}
                Certificações
              </h3>
              <ul className="space-y-2">
                {profile.certifications?.map((cert, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" /> Investimento
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Sessão individual
                  </p>
                </div>
                <div className="text-xl font-bold text-primary">
                  {profile.pricing}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />{' '}
                Disponibilidade
              </h3>
              <div className="grid gap-2">
                {profile.availability?.map((slot, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-secondary/30 text-sm border-l-4 border-primary flex justify-between items-center"
                  >
                    <span>{slot}</span>
                    <Button size="sm" variant="ghost" className="h-6 text-xs">
                      Agendar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-10">
              <Star className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">
                As avaliações aparecerão aqui.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
