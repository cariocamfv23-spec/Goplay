import { ProfileData } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Heart, Trophy, Handshake, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSponsorshipStore } from '@/stores/useSponsorshipStore'
import { toast } from 'sonner'

interface ProfileMatchCardProps {
  profile: ProfileData
}

export function ProfileMatchCard({ profile }: ProfileMatchCardProps) {
  const { requestMatch, isMatched, selectedCriteria } = useSponsorshipStore()
  const matched = isMatched(profile.id)

  const handleMatch = () => {
    if (selectedCriteria.length === 0) {
      toast.error('Selecione ao menos um critério de contrapartida.')
      return
    }
    requestMatch(profile.id)
    toast.success(`Solicitação enviada para ${profile.name}!`)
  }

  const formatNumber = (num?: number) => {
    if (!num) return '0'
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString()
  }

  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/20 transition-all bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="flex">
          {/* Avatar Section */}
          <div className="w-24 p-3 flex flex-col items-center justify-center border-r border-border/30 bg-secondary/10">
            <div className="relative mb-2">
              <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-sm">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              {profile.ranking && profile.ranking <= 3 && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 border border-white">
                  <Trophy className="w-2.5 h-2.5" /> #{profile.ranking}
                </div>
              )}
            </div>
            <Badge
              variant="outline"
              className="text-[9px] h-4 px-1.5 border-primary/30 text-primary uppercase"
            >
              {profile.type === 'team' ? 'Time' : 'Atleta'}
            </Badge>
          </div>

          {/* Info Section */}
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm leading-tight line-clamp-1">
                  {profile.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                {profile.sport} • {profile.location}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 bg-background/50 rounded-lg p-2 border border-border/30">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-gold" /> Rank
                  </span>
                  <span className="font-bold text-xs">
                    {profile.ranking ? `#${profile.ranking}` : '-'}
                  </span>
                </div>
                <div className="flex flex-col items-center border-l border-border/30">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Eye className="w-3 h-3 text-blue-500" /> Views
                  </span>
                  <span className="font-bold text-xs">
                    {formatNumber(profile.totalViews)}
                  </span>
                </div>
                <div className="flex flex-col items-center border-l border-border/30">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-500" /> Likes
                  </span>
                  <span className="font-bold text-xs">
                    {formatNumber(profile.totalLikes)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              {matched ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-8 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20"
                  disabled
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  Solicitação Enviada
                </Button>
              ) : (
                <Button
                  size="sm"
                  className={cn(
                    'w-full h-8 text-xs font-semibold shadow-sm transition-all active:scale-95',
                    'bg-gradient-to-r from-primary to-primary/80 hover:to-primary',
                  )}
                  onClick={handleMatch}
                >
                  <Handshake className="w-3.5 h-3.5 mr-1.5" />
                  Conectar Agora
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
