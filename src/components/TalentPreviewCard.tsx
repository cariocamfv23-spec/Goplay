import { ProfileData } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Trophy, MapPin, Activity, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface TalentPreviewCardProps {
  talent: ProfileData
  isTopTalent: boolean
}

export function TalentPreviewCard({
  talent,
  isTopTalent,
}: TalentPreviewCardProps) {
  const navigate = useNavigate()

  return (
    <Card className="overflow-hidden border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl animate-in zoom-in-95 duration-200">
      {/* Header Banner */}
      <div className="h-16 relative bg-gradient-to-r from-primary/20 to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        {isTopTalent && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            <Trophy className="w-3 h-3" />
            Top Talent
          </div>
        )}
      </div>

      <CardContent className="pt-0 pb-4 px-4 relative">
        {/* Avatar Overlap */}
        <div className="relative -mt-10 mb-3 flex justify-between items-end">
          <div className="relative">
            <div
              className={`h-20 w-20 rounded-full border-4 border-background overflow-hidden ${isTopTalent ? 'ring-2 ring-gold' : ''}`}
            >
              <img
                src={talent.avatar}
                alt={talent.name}
                className="h-full w-full object-cover"
              />
            </div>
            {isTopTalent && (
              <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-1 border-2 border-background">
                <Star className="w-3 h-3 fill-black text-black" />
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-primary font-bold text-lg">
              <span className="text-sm text-muted-foreground font-normal">
                Rating
              </span>
              {talent.rating?.toFixed(1) || 'N/A'}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1 mb-4">
          <h3 className="font-bold text-lg leading-tight">{talent.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Activity className="w-3 h-3" /> {talent.position} • {talent.sport}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {talent.location}
          </p>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-secondary/50 rounded-lg p-2 text-center">
            <span className="block font-bold text-sm">
              {talent.stats?.matches || 0}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase">
              Jogos
            </span>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2 text-center">
            <span className="block font-bold text-sm">{talent.age || '-'}</span>
            <span className="text-[10px] text-muted-foreground uppercase">
              Idade
            </span>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2 text-center">
            <span className="block font-bold text-sm text-gold">
              {talent.stats?.mvp || 0}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase">
              MVPs
            </span>
          </div>
        </div>

        <Button
          className="w-full h-10 font-semibold gap-2"
          onClick={() => navigate(`/profile/${talent.id}`)}
        >
          Ver Perfil Completo <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
