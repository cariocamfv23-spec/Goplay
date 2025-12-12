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
  // In a real app, check auth context
  const isOwnProfile = true // Hardcoded for demo to show the button

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
          <div className="flex gap-2 mb-2">
            <Button size="sm" className="rounded-full shadow-md">
              <UserPlus className="h-4 w-4 mr-1" /> Seguir
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full shadow-md"
              onClick={() => navigate(`/messages/user-${profile.id}`)}
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
              <Star className="h-3 w-3 fill-current" /> {profile.rating}
            </span>
          </div>

          {isOwnProfile && (
            <Button
              variant="outline"
              className="w-full mb-6 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
              onClick={() => navigate('/financials/transactions')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Ver Extrato Financeiro
            </Button>
          )}
        </div>

        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="portfolio">
              <ImageIcon className="h-4 w-4 mr-2" /> Portfolio
            </TabsTrigger>
            <TabsTrigger value="packages">
              <DollarSign className="h-4 w-4 mr-2" /> Pacotes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid grid-cols-2 gap-2">
              {profile.portfolio?.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square bg-muted rounded-lg overflow-hidden group"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    alt=""
                  />
                </div>
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i + 10}
                  className="aspect-square bg-muted rounded-lg overflow-hidden group"
                >
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=sports%20action&seed=${i}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            {profile.packages?.map((pkg, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{pkg.title}</h3>
                    <Badge
                      variant="secondary"
                      className="text-lg font-bold text-primary"
                    >
                      {pkg.price}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {pkg.description}
                  </p>
                  <Button className="w-full rounded-full gap-2">
                    <CalendarCheck className="h-4 w-4" /> Agendar Sessão
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
