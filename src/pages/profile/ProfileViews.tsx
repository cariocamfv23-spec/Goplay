import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Eye,
  User,
  Crown,
  Activity,
  Radio,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { PaymentDialog } from '@/components/PaymentDialog'
import { cn } from '@/lib/utils'
import { AppIcon } from '@/components/AppIcon'
import { Badge } from '@/components/ui/badge'

// Mock Data Pools for Live Simulation
const LIVE_POOL = [
  {
    id: 'lv1',
    name: 'Scout Internacional',
    type: 'Recrutador',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=11',
    pos: { top: '15%', left: '25%' },
  },
  {
    id: 'lv2',
    name: 'Agência NextLevel',
    type: 'Agência',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22',
    pos: { top: '65%', left: '75%' },
  },
  {
    id: 'lv3',
    name: 'Carlos "Olheiro"',
    type: 'Scout',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=33',
    pos: { top: '75%', left: '20%' },
  },
  {
    id: 'lv4',
    name: 'Red Wolves FC',
    type: 'Clube',
    avatar: 'https://img.usecurling.com/i?q=wolf&color=red',
    pos: { top: '25%', left: '80%' },
  },
  {
    id: 'lv5',
    name: 'Visitante Anônimo',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=44',
    pos: { top: '50%', left: '10%' },
  },
  {
    id: 'lv6',
    name: 'Marina Silva',
    type: 'Treinador',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=55',
    pos: { top: '40%', left: '85%' },
  },
]

const INITIAL_PAST = [
  {
    id: 'pv1',
    name: 'João Santos',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=101',
    date: 'Há 2 horas',
  },
  {
    id: 'pv2',
    name: 'Futsal Pro Club',
    type: 'Clube',
    avatar: 'https://img.usecurling.com/i?q=soccer&color=blue',
    date: 'Há 5 horas',
  },
  {
    id: 'pv3',
    name: 'Visitante Anônimo',
    type: 'Perfil Oculto',
    avatar: '',
    date: 'Ontem',
  },
  {
    id: 'pv4',
    name: 'Ana Souza',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=102',
    date: 'Ontem',
  },
]

export default function ProfileViews() {
  const navigate = useNavigate()
  const [isUnlocked, setIsUnlocked] = useState(false)

  // Real-time Simulation State
  const [liveViewers, setLiveViewers] = useState([LIVE_POOL[0], LIVE_POOL[1]])
  const [pastViewers, setPastViewers] = useState(INITIAL_PAST)
  const [totalViews, setTotalViews] = useState(142)

  const viewsThisWeek = 28

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((current) => {
        // Randomly decide to add or remove to simulate real traffic
        const shouldRemove = current.length > 0 && Math.random() > 0.6
        const shouldAdd = current.length < 4 && Math.random() > 0.4

        const next = [...current]

        if (shouldRemove) {
          const idx = Math.floor(Math.random() * next.length)
          const removed = next[idx]
          next.splice(idx, 1)

          // Move to past viewers automatically
          setPastViewers((prev) => [
            {
              id: `moved-${Date.now()}`,
              name: removed.name,
              type: removed.type,
              avatar: removed.avatar,
              date: 'Agora mesmo',
            },
            ...prev,
          ])
        }

        if (shouldAdd) {
          const available = LIVE_POOL.filter(
            (p) => !next.find((n) => n.id === p.id),
          )
          if (available.length) {
            const picked =
              available[Math.floor(Math.random() * available.length)]
            next.push(picked)
            // Increment total views slightly when someone new joins
            setTotalViews((prev) => prev + 1)
          }
        }

        return next
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Combine lists to easily manage the Paywall index limit (only show 1st item clearly)
  const allViewers = [
    ...liveViewers.map((v) => ({ ...v, isLive: true })),
    ...pastViewers.map((v) => ({ ...v, isLive: false })),
  ]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center gap-3 px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <AppIcon className="w-6 h-6" />
          <h1 className="font-bold text-lg">Goplay Views</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Real-Time Live Radar (99 Taxi Style) */}
        <Card className="border-none bg-gradient-to-b from-primary/10 via-background to-background overflow-hidden relative shadow-inner">
          <CardContent className="p-0 h-56 flex flex-col items-center justify-center relative">
            {/* Live Badges */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs font-bold font-mono text-green-500 tracking-wider">
                {liveViewers.length} LIVE
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <Badge
                variant="secondary"
                className="bg-black/80 text-primary border-primary/30 flex items-center gap-1 backdrop-blur-md"
              >
                <Radio className="w-3 h-3 animate-pulse" /> Radar Ativo
              </Badge>
            </div>

            {/* Radar Sonar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div
                className="w-24 h-24 bg-primary/20 rounded-full absolute animate-ping"
                style={{ animationDuration: '3s' }}
              />
              <div className="w-40 h-40 border border-primary/20 rounded-full absolute" />
              <div className="w-64 h-64 border border-primary/10 rounded-full absolute" />
              <div className="w-96 h-96 border border-primary/5 rounded-full absolute" />
            </div>

            {/* Center Target (The User) */}
            <div className="z-10 bg-background/90 backdrop-blur-sm p-3 rounded-full ring-2 ring-primary/30 shadow-xl border border-primary/20">
              <AppIcon className="w-8 h-8 opacity-90" />
            </div>

            {/* Active Live Nodes */}
            {liveViewers.map((v, i) => {
              // Blur radar nodes if not unlocked (except maybe the first one to tease)
              const isBlurredRadar = !isUnlocked && i > 0

              return (
                <div
                  key={v.id}
                  className="absolute z-20 animate-in zoom-in duration-500 fade-in"
                  style={v.pos}
                >
                  <div className="relative group flex flex-col items-center">
                    <Avatar
                      className={cn(
                        'w-10 h-10 border-2 border-green-500 shadow-xl transition-all duration-300',
                        isBlurredRadar && 'blur-[3px] grayscale opacity-70',
                      )}
                    >
                      <AvatarImage
                        src={isBlurredRadar ? undefined : v.avatar}
                      />
                      <AvatarFallback>
                        <User className="w-5 h-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Global Counter */}
        <div className="flex items-center justify-between bg-secondary/30 rounded-2xl p-4 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Total de Visitas
              </p>
              <h2 className="text-2xl font-black text-foreground">
                {totalViews}
              </h2>
            </div>
          </div>
          <div className="bg-background px-3 py-1.5 rounded-full text-xs font-bold border border-border/50 shadow-sm flex items-center gap-1.5">
            <span className="text-green-500">+{viewsThisWeek}</span> semana
          </div>
        </div>

        {/* Dynamic Lists Area */}
        <div className="relative pb-10">
          <div className="space-y-4">
            {allViewers.map((viewer, index) => {
              const isBlurred = !isUnlocked && index > 0
              const isFirstLive = viewer.isLive && index === 0
              const isFirstPast = !viewer.isLive && index === liveViewers.length

              return (
                <div
                  key={viewer.id}
                  className="animate-in slide-in-from-bottom-2 fade-in duration-500"
                >
                  {/* Section Headers */}
                  {isFirstLive && (
                    <h3 className="font-bold text-sm text-green-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-pulse" />
                      Assistindo Agora
                    </h3>
                  )}
                  {isFirstPast && (
                    <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mt-6 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Últimos Visitantes
                    </h3>
                  )}

                  {/* Viewer Card */}
                  <Card
                    className={cn(
                      'border-none shadow-sm transition-all',
                      isBlurred &&
                        'blur-sm opacity-60 select-none pointer-events-none',
                      viewer.isLive &&
                        !isBlurred &&
                        'ring-1 ring-green-500/30 bg-green-500/5',
                    )}
                  >
                    <CardContent className="p-4 flex items-center gap-4 relative overflow-hidden">
                      {viewer.isLive && !isBlurred && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl -mr-8 -mt-8" />
                      )}

                      <div className="relative">
                        <Avatar
                          className={cn(
                            'h-12 w-12 border-2',
                            viewer.isLive && !isBlurred
                              ? 'border-green-500'
                              : 'border-border',
                          )}
                        >
                          <AvatarImage
                            src={isBlurred ? undefined : viewer.avatar}
                          />
                          <AvatarFallback>
                            <User className="h-6 w-6 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        {viewer.isLive && !isBlurred && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-bold truncate">
                            {isBlurred ? 'Visitante Premium' : viewer.name}
                          </p>
                          <span
                            className={cn(
                              'text-xs font-bold whitespace-nowrap',
                              viewer.isLive
                                ? 'text-green-500'
                                : 'text-muted-foreground',
                            )}
                          >
                            {viewer.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-muted-foreground">
                            {isBlurred ? 'Perfil Oculto' : viewer.type}
                          </p>
                          {!isBlurred && !viewer.isLive && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/40" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Premium Paywall Overlay */}
          {!isUnlocked && (
            <div className="absolute inset-x-0 bottom-0 top-32 bg-gradient-to-b from-transparent via-background/95 to-background flex flex-col items-center justify-end pb-8 pt-20 px-4 text-center z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse ring-4 ring-gold/20">
                <Crown className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <AppIcon className="w-5 h-5" />
                <span className="font-bold text-primary tracking-tight">
                  Goplay Premium
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Descubra quem está de olho
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-[280px] leading-relaxed">
                Desbloqueie o Live Tracking e a lista completa para ver os
                scouts, recrutadores e atletas que visitam seu perfil.
              </p>

              <PaymentDialog
                title="Desbloquear Radar & Views"
                price={9.9}
                pointsPrice={500}
                onSuccess={() => setIsUnlocked(true)}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:to-primary text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Desbloquear Tudo
                </Button>
              </PaymentDialog>

              <p className="text-xs text-muted-foreground mt-4 font-medium">
                Ou use seus <span className="text-gold">Goplay Points</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
