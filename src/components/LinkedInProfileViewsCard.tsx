import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Eye,
  Crown,
  Lock,
  Sparkles,
  GraduationCap,
  Users,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  mockProfileVisitors,
  VISITOR_STATS,
  ProfileVisitor,
} from '@/lib/profile-views-data'
import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { ProfileViewerPaywallModal } from '@/components/ProfileViewerPaywallModal'

interface LinkedInProfileViewsCardProps {
  className?: string
}

export function LinkedInProfileViewsCard({
  className,
}: LinkedInProfileViewsCardProps) {
  const navigate = useNavigate()
  const { isPremium } = usePrivacyStore()
  const [selectedVisitor, setSelectedVisitor] = useState<ProfileVisitor | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVisitorClick = (visitor: ProfileVisitor, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedVisitor(visitor)
    setIsModalOpen(true)
  }

  const handleOpenAll = () => {
    navigate('/profile/views')
  }

  // Pick top 4 visitors to display in avatar strip
  const previewVisitors = mockProfileVisitors.slice(0, 4)

  return (
    <>
      <Card
        onClick={handleOpenAll}
        className={cn(
          'relative overflow-hidden cursor-pointer border transition-all duration-300 group',
          'bg-gradient-to-br from-primary/10 via-background to-amber-950/10 border-primary/20 hover:border-gold/40 shadow-sm hover:shadow-md',
          className,
        )}
      >
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        <CardContent className="p-4 sm:p-5 relative z-10 space-y-4">
          {/* Header row: Title + Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/30 via-purple-600/20 to-gold/20 flex items-center justify-center border border-primary/30 shadow-inner">
                  <Eye className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gold border border-background" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm sm:text-base text-foreground tracking-tight flex items-center gap-1.5">
                    Quem Viu Seu Perfil
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0 border-gold/40 text-gold bg-gold/10"
                  >
                    Estilo LinkedIn
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <span className="font-bold text-foreground">
                    {VISITOR_STATS.viewsThisWeek} visualizações
                  </span>{' '}
                  esta semana
                  <span className="text-emerald-500 font-bold inline-flex items-center text-[11px] ml-1">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    {VISITOR_STATS.weeklyGrowth}
                  </span>
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenAll}
              className="text-xs text-primary hover:text-gold font-bold p-0 h-auto flex items-center gap-1 group/btn"
            >
              Ver todos
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          {/* Key metric highlights: Scouts, Universities, Teams */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                <Eye className="w-3 h-3" /> Olheiros
              </div>
              <p className="text-base sm:text-lg font-black text-foreground mt-0.5">
                {VISITOR_STATS.scoutsCount}
              </p>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                <GraduationCap className="w-3 h-3" /> Bolsas
              </div>
              <p className="text-base sm:text-lg font-black text-foreground mt-0.5">
                {VISITOR_STATS.universitiesCount}
              </p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <Users className="w-3 h-3" /> Times
              </div>
              <p className="text-base sm:text-lg font-black text-foreground mt-0.5">
                {VISITOR_STATS.teamsCount}
              </p>
            </div>
          </div>

          {/* Visitors preview row (Masked / Blurred if not premium) */}
          <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px]">
                Visitantes Recentes ({VISITOR_STATS.totalViews} no total)
              </span>
              {!isPremium && (
                <span className="text-[10px] text-gold font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-gold" /> Identidades Mascaradas
                </span>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <div className="flex items-center -space-x-3 hover:space-x-1 transition-all duration-300">
                {previewVisitors.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={(e) => handleVisitorClick(v, e)}
                    className="relative rounded-full transition-transform hover:scale-110 hover:z-20 focus:outline-none"
                    title={isPremium ? v.name : 'Clique para desbloquear'}
                  >
                    <Avatar className="w-10 h-10 border-2 border-background ring-2 ring-primary/40 shadow-sm">
                      <AvatarImage
                        src={v.avatar}
                        className={cn(!isPremium && 'blur-[3px] grayscale')}
                      />
                      <AvatarFallback>{v.name[0]}</AvatarFallback>
                    </Avatar>

                    {v.type === 'scout' && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold border border-background">
                        S
                      </span>
                    )}
                    {v.type === 'university' && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[8px] font-bold border border-background">
                        U
                      </span>
                    )}
                    {v.type === 'team' && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold border border-background">
                        T
                      </span>
                    )}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleOpenAll}
                  className="w-10 h-10 rounded-full bg-background/90 border-2 border-dashed border-primary/40 flex items-center justify-center text-xs font-black text-primary hover:border-gold hover:text-gold transition-colors z-10"
                >
                  +{VISITOR_STATS.totalViews - previewVisitors.length}
                </button>
              </div>

              {/* Call to action button */}
              {!isPremium ? (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedVisitor(previewVisitors[0])
                    setIsModalOpen(true)
                  }}
                  className="h-8 px-3 rounded-full text-xs font-black bg-gradient-to-r from-gold to-amber-600 hover:from-amber-500 hover:to-gold text-black shadow-sm shrink-0 gap-1 border border-yellow-300/40"
                >
                  <Crown className="w-3.5 h-3.5 fill-black text-black" />
                  Desbloquear
                </Button>
              ) : (
                <Badge className="bg-green-500/15 text-green-600 border-green-500/30 text-xs">
                  Acesso Total VIP
                </Badge>
              )}
            </div>

            {/* Teaser text */}
            <p className="text-[11px] text-muted-foreground leading-tight pt-1">
              {!isPremium ? (
                <>
                  <strong className="text-foreground">
                    1 olheiro do RB Bragantino
                  </strong>{' '}
                  e recrutadores de faculdades americanas viram você.
                  Desbloqueie o Premium para ver os nomes e contatos diretos.
                </>
              ) : (
                <>
                  Você tem acesso completo aos dados de contato direto,
                  instituições e interesse dos olheiros.
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <ProfileViewerPaywallModal
        visitor={selectedVisitor}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
