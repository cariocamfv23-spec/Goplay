import { ProfileData } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Star,
  Trophy,
  MapPin,
  Activity,
  ArrowRight,
  FileSignature,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface TalentPreviewCardProps {
  talent: ProfileData
  isTopTalent: boolean
}

export function TalentPreviewCard({
  talent,
  isTopTalent,
}: TalentPreviewCardProps) {
  const navigate = useNavigate()
  const isDiscovered = talent.isDiscovered
  const eligibleForContract = (talent.rating || 0) >= 4.5

  return (
    <Card className="overflow-hidden border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl animate-in zoom-in-95 duration-200 ring-1 ring-white/10">
      {/* Header Banner */}
      <div
        className={cn(
          'h-16 relative overflow-hidden',
          isDiscovered
            ? 'bg-gradient-to-r from-cyan-900 to-blue-900'
            : 'bg-gradient-to-r from-primary/20 to-secondary',
        )}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

        {isDiscovered ? (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-cyan-500/20">
            <Trophy className="w-3 h-3" />
            Talento Descoberto
          </div>
        ) : isTopTalent ? (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            <Trophy className="w-3 h-3" />
            Top Talent
          </div>
        ) : null}
      </div>

      <CardContent className="pt-0 pb-4 px-4 relative">
        {/* Avatar Overlap */}
        <div className="relative -mt-10 mb-3 flex justify-between items-end">
          <div className="relative">
            <div
              className={cn(
                'h-20 w-20 rounded-full border-4 border-background overflow-hidden shadow-lg',
                isDiscovered
                  ? 'ring-2 ring-cyan-400'
                  : isTopTalent
                    ? 'ring-2 ring-gold'
                    : '',
              )}
            >
              <img
                src={talent.avatar}
                alt={talent.name}
                className="h-full w-full object-cover"
              />
            </div>
            {isDiscovered ? (
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 rounded-full p-1 border-2 border-background shadow-sm">
                <Star className="w-3 h-3 fill-white text-white" />
              </div>
            ) : isTopTalent ? (
              <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-1 border-2 border-background shadow-sm">
                <Star className="w-3 h-3 fill-black text-black" />
              </div>
            ) : null}
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-primary font-bold text-lg">
              <span className="text-xs text-muted-foreground font-normal uppercase tracking-wider mr-1">
                Rating
              </span>
              <span
                className={cn(
                  'text-xl',
                  isDiscovered ? 'text-cyan-500' : 'text-primary',
                )}
              >
                {talent.rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1 mb-4">
          <h3 className="font-bold text-lg leading-tight flex items-center gap-1">
            {talent.name}
            {eligibleForContract && (
              <Badge
                variant="outline"
                className="text-[8px] h-4 px-1 border-green-500/50 text-green-600 bg-green-500/10 ml-1 whitespace-nowrap"
              >
                <FileSignature className="w-2 h-2 mr-0.5" />
                Contrato Vivo
              </Badge>
            )}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Activity className="w-3 h-3" /> {talent.position} • {talent.sport}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {talent.location}
          </p>
        </div>

        {/* Discovery Details (New Section) */}
        {isDiscovered && talent.discoveryReason && (
          <div className="mb-4 bg-cyan-950/30 border border-cyan-500/20 rounded-lg p-2.5 animate-in slide-in-from-left-2 fade-in duration-300">
            <h4 className="text-[10px] uppercase font-bold text-cyan-400 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Motivo da Descoberta
            </h4>
            <p className="text-xs text-cyan-100 leading-snug italic">
              "{talent.discoveryReason}"
            </p>
          </div>
        )}

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-secondary/50 rounded-lg p-2 text-center border border-border/50">
            <span className="block font-bold text-sm">
              {talent.stats?.matches || 0}
            </span>
            <span className="text-[9px] text-muted-foreground uppercase font-medium">
              Jogos
            </span>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2 text-center border border-border/50">
            {talent.engagement ? (
              <>
                <span className="block font-bold text-sm text-green-400 flex items-center justify-center gap-0.5">
                  <Zap className="w-3 h-3 fill-current" />
                  {talent.engagement}%
                </span>
                <span className="text-[9px] text-muted-foreground uppercase font-medium">
                  Engajamento
                </span>
              </>
            ) : (
              <>
                <span className="block font-bold text-sm">
                  {talent.age || '-'}
                </span>
                <span className="text-[9px] text-muted-foreground uppercase font-medium">
                  Idade
                </span>
              </>
            )}
          </div>
          <div className="bg-secondary/50 rounded-lg p-2 text-center border border-border/50">
            <span
              className={cn(
                'block font-bold text-sm',
                isDiscovered ? 'text-cyan-500' : 'text-gold',
              )}
            >
              {talent.stats?.mvp || 0}
            </span>
            <span className="text-[9px] text-muted-foreground uppercase font-medium">
              MVPs
            </span>
          </div>
        </div>

        <Button
          className={cn(
            'w-full h-9 font-semibold gap-2 text-xs uppercase tracking-wide',
            isDiscovered
              ? 'bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_15px_rgba(8,145,178,0.4)]'
              : 'bg-primary hover:bg-primary/90',
          )}
          onClick={() => navigate(`/profile/${talent.id}`)}
        >
          Ver Perfil Completo <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  )
}
