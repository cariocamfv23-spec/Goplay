import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Zap,
  Brain,
  Crosshair,
  Ghost,
  Wand2,
  MapPin,
  ChevronRight,
  TrendingUp,
  Flame,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockCurrentUser } from '@/lib/data'
import { useThemeStore } from '@/stores/useThemeStore'
import { cn } from '@/lib/utils'

export default function Home() {
  const navigate = useNavigate()
  const { color } = useThemeStore()

  const mainFeatures = [
    {
      id: 'move',
      label: 'Move',
      icon: Zap,
      path: '/move',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      description: 'Feed de vídeos esportivos',
    },
    {
      id: 'oracle',
      label: 'Oráculo',
      icon: Brain,
      path: '/ai/oracle',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      description: 'Previsões de carreira com IA',
    },
    {
      id: 'arena',
      label: 'Arena',
      icon: Crosshair,
      path: '/ai/arena-mode',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      description: 'Treino em Realidade Aumentada',
    },
    {
      id: 'ghost',
      label: 'Grosso Play',
      icon: Ghost,
      path: '/ai/ghost-play',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      description: 'Reconstrução 3D de jogadas',
    },
    {
      id: 'editor',
      label: 'Edição da Várzea',
      icon: Wand2,
      path: '/ai/editor',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      description: 'Editor automático de highlights',
    },
    {
      id: 'checkin',
      label: 'Check-in',
      icon: MapPin,
      path: '/check-in',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      description: 'Ganhe pontos nos locais parceiros',
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Welcome Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Olá, {mockCurrentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground text-sm">
              Vamos superar seus limites hoje?
            </p>
          </div>
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={mockCurrentUser.avatar} />
            <AvatarFallback>{mockCurrentUser.name[0]}</AvatarFallback>
          </Avatar>
        </div>

        {/* Status Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
          <div className="absolute right-0 top-0 p-3 opacity-10">
            <Flame className="w-24 h-24 text-primary" />
          </div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-background shadow-sm border border-border/50">
              <span className="text-xl font-black text-primary">
                {mockCurrentUser.level}
              </span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">
                Level
              </span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold">Próximo Nível</span>
                <span className="text-xs text-muted-foreground">
                  {mockCurrentUser.points} / 2000 XP
                </span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(mockCurrentUser.points / 2000) * 100}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Navigation Grid */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Zap className="h-4 w-4 text-gold" /> Acesso Rápido
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mainFeatures.map((feature) => (
            <Card
              key={feature.id}
              className={cn(
                'group cursor-pointer hover:shadow-md transition-all duration-300 border-l-4',
                feature.border,
              )}
              onClick={() => navigate(feature.path)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
                      feature.bg,
                    )}
                  >
                    <feature.icon className={cn('h-5 w-5', feature.color)} />
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-sm leading-tight mb-1">
                  {feature.label}
                </h3>
                <p className="text-[10px] text-muted-foreground line-clamp-2">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending / Highlights */}
      <div className="mt-4">
        <div className="px-6 flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" /> Em Alta
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7"
            onClick={() => navigate('/explore')}
          >
            Ver tudo
          </Button>
        </div>

        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-4 px-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-64 aspect-video rounded-xl bg-muted relative overflow-hidden cursor-pointer group"
                onClick={() => navigate('/move')}
              >
                <img
                  src={`https://img.usecurling.com/p/400/225?q=soccer%20match&seed=${i}`}
                  alt="Trending"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                  <Badge className="self-start mb-1 bg-primary text-primary-foreground border-none">
                    Ao Vivo
                  </Badge>
                  <p className="text-white font-bold text-sm truncate">
                    Final do Campeonato Regional
                  </p>
                  <p className="text-white/70 text-xs">
                    Arena Tatuapé • 1.2k assistindo
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* Daily Challenge Banner */}
      <div className="px-6 mt-2">
        <Card
          className="bg-gradient-to-br from-zinc-900 to-black text-white border-none overflow-hidden relative cursor-pointer"
          onClick={() => navigate('/ai/arena-mode')}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-4 relative z-10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm animate-pulse">
              <Crosshair className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gold uppercase tracking-wider mb-1">
                Desafio Diário
              </h3>
              <p className="text-sm font-medium leading-snug">
                Acerte 50 alvos na Arena Mode
              </p>
              <p className="text-xs text-white/60 mt-1">Recompensa: +500 XP</p>
            </div>
            <ChevronRight className="h-5 w-5 text-white/50" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
