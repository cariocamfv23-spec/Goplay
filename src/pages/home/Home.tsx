import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Zap,
  Brain,
  Crosshair,
  Wand2,
  MapPin,
  ChevronRight,
  TrendingUp,
  Flame,
  Trophy,
  Play,
  Users,
  Timer,
  Crown,
  Wallet,
  ShoppingBag,
  LayoutList,
  Sparkles,
  Palette,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Home() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const mainFeatures = [
    {
      id: 'nft',
      label: 'NFT Creator',
      icon: Palette,
      path: '/ai/nft-creator',
      color: 'text-pink-500',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      description: 'Crie Stickers',
      badge: 'NOVO',
    },
    {
      id: 'arena',
      label: 'Arena',
      icon: Crosshair,
      path: '/ai/arena-mode',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      description: 'Jogar Agora',
    },
    {
      id: 'ranking',
      label: 'Ranking',
      icon: Trophy,
      path: '/ranking',
      color: 'text-gold',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      description: 'Competição',
    },
    {
      id: 'wallet',
      label: 'Carteira',
      icon: Wallet,
      path: '/wallet',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      description: 'Seus Ganhos',
    },
    {
      id: 'market',
      label: 'Loja',
      icon: ShoppingBag,
      path: '/marketplace',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      description: 'Produtos',
    },
    {
      id: 'feed',
      label: 'Feed',
      icon: LayoutList,
      path: '/feed',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      description: 'Social',
    },
    {
      id: 'move',
      label: 'Move',
      icon: Zap,
      path: '/move',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      description: 'Atividades',
    },
    {
      id: 'checkin',
      label: 'Check-in',
      icon: MapPin,
      path: '/check-in',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      description: 'Locais',
    },
    {
      id: 'oracle',
      label: 'Oráculo',
      icon: Brain,
      path: '/ai/oracle',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      description: 'IA Coach',
    },
    {
      id: 'editor',
      label: 'Editor',
      icon: Wand2,
      path: '/ai/editor',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      description: 'Highlights',
    },
  ]

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 pt-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  const nextLevelXP = 2000
  const progressPercentage = (mockCurrentUser.points / nextLevelXP) * 100

  return (
    <div className="min-h-screen bg-background pb-24 animate-in fade-in duration-500">
      {/* Header & Greeting */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Olá, {mockCurrentUser.name.split(' ')[0]}
              <span className="inline-block animate-wave ml-2 origin-bottom-right hover:animate-spin cursor-default">
                👋
              </span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Pronto para superar seus limites?
            </p>
          </div>

          {/* Level Badge */}
          <div
            className="flex flex-col items-center justify-center bg-card shadow-sm p-2.5 rounded-2xl border border-border/50 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate('/profile/stats')}
          >
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Level
            </span>
            <span className="text-xl font-black text-primary leading-none">
              {mockCurrentUser.level}
            </span>
          </div>
        </div>

        {/* Gamification Status Card */}
        <Card
          className="border-none bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-primary/30"
          onClick={() => navigate('/ranking')}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <Flame className="w-32 h-32 rotate-12 -translate-y-8 translate-x-8" />
          </div>

          <CardContent className="p-5 relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-2 backdrop-blur-md transition-colors">
                  <Trophy className="w-3 h-3 mr-1.5 text-gold" />
                  Ranking Semanal
                </Badge>
                <h3 className="font-bold text-lg text-white tracking-tight">
                  Rumo ao Pro
                </h3>
                <p className="text-white/80 text-xs font-medium">
                  Faltam {nextLevelXP - mockCurrentUser.points} XP para o
                  próximo nível
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-white tracking-tight">
                  {mockCurrentUser.points}
                </span>
                <span className="text-[10px] font-bold text-white/70 block uppercase tracking-wider">
                  XP Total
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-white/90 uppercase tracking-wider">
                <span>Progresso</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2.5 bg-black/20"
                indicatorClassName="bg-gradient-to-r from-gold to-yellow-300"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured NFT Creator Banner - NEW */}
      <div className="px-6 pb-4">
        <div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 p-4 shadow-lg cursor-pointer group border border-white/10"
          onClick={() => navigate('/ai/nft-creator')}
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Crown className="w-24 h-24 rotate-[-15deg] translate-x-4 -translate-y-4 text-white" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">
                    NFT Creator
                  </h3>
                  <Badge className="bg-gradient-to-r from-gold to-yellow-500 text-black border-none text-[10px] px-1.5 h-4 font-extrabold">
                    NOVO
                  </Badge>
                </div>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">
                  Crie stickers estilo BAYC
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid - Restored & Expanded */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg flex items-center gap-2 text-foreground">
            <Zap className="h-4 w-4 text-gold fill-gold" />
            Menu Principal
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mainFeatures.map((feature) => (
            <Card
              key={feature.id}
              className={cn(
                'border-none bg-card/80 hover:bg-card transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden',
                feature.id === 'nft' && 'hidden', // Hide NFT from grid as it has a banner
              )}
              onClick={() => navigate(feature.path)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div
                  className={cn(
                    'h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm',
                    feature.bg,
                  )}
                >
                  <feature.icon className={cn('h-5 w-5', feature.color)} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-sm truncate leading-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {feature.label}
                    {feature.badge && (
                      <span className="text-[8px] bg-primary text-primary-foreground px-1 rounded-sm font-bold">
                        {feature.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] text-muted-foreground truncate font-medium">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending / Live Section */}
      <div className="mt-4 pb-2">
        <div className="px-6 flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg flex items-center gap-2 text-foreground">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Em Alta
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 px-2 font-medium text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/explore')}
          >
            Ver tudo <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-6 pb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-72 aspect-video rounded-2xl bg-muted relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
                onClick={() => navigate('/move')}
              >
                <img
                  src={`https://img.usecurling.com/p/500/280?q=soccer%20match%20action&seed=${i}`}
                  alt="Trending"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-1.5">
                    <Badge className="bg-red-600 text-white border-none px-1.5 py-0 h-5 text-[10px] font-bold animate-pulse">
                      AO VIVO
                    </Badge>
                    <div className="flex items-center text-white/90 text-[10px] font-bold gap-1 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                      <Users className="w-3 h-3" />
                      1.2k
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-sm truncate leading-tight drop-shadow-sm">
                    Final Regional: Tatuapé vs Mooca
                  </h4>
                  <p className="text-white/70 text-xs mt-0.5 font-medium">
                    Arena SP • Futebol Society
                  </p>
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[1px]">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* Daily Challenge Banner */}
      <div className="px-6 pb-6">
        <Card
          className="border-none bg-zinc-900 dark:bg-zinc-950 text-white overflow-hidden relative cursor-pointer group shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate('/ai/arena-mode')}
        >
          {/* Abstract background effects */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors duration-500" />

          <CardContent className="p-4 relative z-10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
              <Crosshair className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-sm text-gold uppercase tracking-wider">
                  Desafio Diário
                </h3>
                <Badge
                  variant="outline"
                  className="border-gold/30 text-gold text-[9px] h-4 px-1 py-0 bg-gold/5"
                >
                  NOVO
                </Badge>
              </div>
              <p className="text-sm font-semibold leading-tight truncate text-white/90">
                Acerte 50 alvos na Arena
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-[10px] text-white/60">
                  <Trophy className="w-3 h-3" />
                  <span>+500 XP</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/60">
                  <Timer className="w-3 h-3" />
                  <span>30 min</span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
