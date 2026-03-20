import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Star,
  MessageCircle,
  UserPlus,
  Crown,
  Handshake,
  ArrowLeft,
  Building2,
  Target,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

export default function SponsorView({ profile }: { profile: ProfileData }) {
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
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl bg-white">
              <AvatarImage
                src={profile.avatar}
                className="object-contain p-2"
              />
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
          <p className="text-gold font-bold text-sm flex items-center gap-1.5 mt-1">
            <Handshake className="w-4 h-4" /> Sponsor / Patrocinador
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

      <div className="px-4 space-y-5">
        {/* Sponsor Details Card */}
        <Card className="border-gold/20 shadow-md bg-gradient-to-br from-gold/5 to-transparent">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-xl border border-gold/20 shadow-inner">
                <Building2 className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                  Empresa / Marca
                </p>
                <p className="font-black text-lg text-foreground">
                  {profile.company || profile.name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Focus Categories */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Foco de Patrocínio
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.focusCategories?.map((category, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-secondary/60 hover:bg-secondary text-foreground px-3 py-1.5 text-sm font-medium shadow-sm border border-border/50"
              >
                {category}
              </Badge>
            ))}
            {(!profile.focusCategories ||
              profile.focusCategories.length === 0) && (
              <Badge
                variant="secondary"
                className="bg-secondary/60 text-foreground px-3 py-1.5"
              >
                Geral
              </Badge>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full h-14 font-bold text-base bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-gold text-black shadow-lg shadow-gold/20 transition-all hover:scale-[1.02] active:scale-95">
            <Handshake className="w-5 h-5 mr-2" /> Enviar Proposta de Patrocínio
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3 font-medium">
            Seu perfil será enviado para análise da marca.
          </p>
        </div>
      </div>
    </div>
  )
}
