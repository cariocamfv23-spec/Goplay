import { Button } from '@/components/ui/button'
import { mockMatches, mockLightningChallenges } from '@/lib/data'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  QrCode,
  ShieldCheck,
  Clock,
  Circle,
  Trophy,
  Car,
  Zap,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { CheckInModal } from '@/components/CheckInModal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { LightningChallengeOverlay } from '@/components/LightningChallengeOverlay'

export default function MatchDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const match = mockMatches.find((m) => m.id === id) || mockMatches[0]

  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [matchStatus, setMatchStatus] = useState(match.status)
  const [uberStatus, setUberStatus] = useState<string | null>(null)
  const [activeChallenge, setActiveChallenge] = useState<any>(null)

  useEffect(() => {
    // Check if there is an Uber requested for this match (simulated)
    const storedStatus = localStorage.getItem(`ride_status_${id}`)
    if (storedStatus) {
      setUberStatus(storedStatus)
    }
  }, [id])

  const handleCheckInSuccess = () => {
    setMatchStatus('approved')
  }

  const triggerRandomChallenge = () => {
    const challenge =
      mockLightningChallenges[
        Math.floor(Math.random() * mockLightningChallenges.length)
      ]
    setActiveChallenge(challenge)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'absent':
        return 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado'
      case 'pending':
        return 'Pendente'
      case 'absent':
        return 'Ausente'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in relative">
      {/* Lightning Challenge Overlay */}
      <LightningChallengeOverlay
        challenge={activeChallenge}
        onClose={() => setActiveChallenge(null)}
        onComplete={() => setActiveChallenge(null)}
      />

      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-primary/20 to-purple-900/20">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/400?q=soccer%20stadium&color=purple')] bg-cover bg-center opacity-20" />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/50 backdrop-blur-md"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-white font-bold text-lg drop-shadow-md">
            Detalhes da Partida
          </span>
          {/* Demo button to trigger challenge */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full bg-background/50 backdrop-blur-md text-gold hover:text-yellow-400"
            onClick={triggerRandomChallenge}
          >
            <Zap className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute -bottom-10 left-0 right-0 px-6 flex justify-between items-end">
          <div className="flex items-end gap-3">
            <div className="h-20 w-20 rounded-2xl bg-background p-1 shadow-lg">
              <Avatar className="h-full w-full rounded-xl">
                <AvatarImage src={match.teamLogo} />
                <AvatarFallback>TM</AvatarFallback>
              </Avatar>
            </div>
            <div className="mb-2">
              <h1 className="text-xl font-bold">{match.teamName}</h1>
              <Badge>{match.modality}</Badge>
            </div>
          </div>
          {matchStatus === 'approved' && (
            <Badge className="mb-3 bg-gold text-white border-none shadow-lg animate-pulse">
              <ShieldCheck className="h-3 w-3 mr-1" /> Check-in OK
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-14 px-4 space-y-6">
        {/* Team Paid Uber Status */}
        {uberStatus && (
          <div className="bg-gradient-to-r from-black to-zinc-800 rounded-xl p-4 text-white shadow-lg border-l-4 border-gold animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Car className="h-4 w-4 text-white" /> Transporte da Equipe
              </h3>
              <Badge
                variant="secondary"
                className="bg-gold text-black hover:bg-gold/90 text-[10px] font-bold"
              >
                UBER PAGO PELO TIME
              </Badge>
            </div>
            <p className="text-xs text-zinc-300 mb-2">
              Seu motorista está a caminho. Acompanhe no mapa.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-400">
                Chegando em 4 min
              </span>
            </div>
          </div>
        )}

        {/* Main Info */}
        <Card className="border-none shadow-sm bg-secondary/10">
          <CardContent className="p-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Data</p>
                <p className="text-sm font-bold">{match.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Local</p>
                <p className="text-sm font-bold truncate">{match.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check-in Action */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          {matchStatus === 'pending_checkin' || matchStatus === 'pending' ? (
            <>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <QrCode className="h-5 w-5 text-gold" /> Check-in Obrigatório
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                Para confirmar sua presença e garantir seus pontos, faça o
                check-in com foto ao chegar no local.
              </p>
              <Button
                className="w-full rounded-full bg-gold text-white hover:bg-yellow-500 font-bold shadow-lg shadow-gold/20"
                onClick={() => setIsCheckInOpen(true)}
              >
                <MapPin className="h-4 w-4 mr-2" /> Fazer Check-in Agora
              </Button>
            </>
          ) : (
            <>
              <div className="absolute inset-0 border-4 border-gold/50 rounded-2xl animate-pulse" />
              <div className="flex flex-col items-center justify-center py-2">
                <div className="h-16 w-16 rounded-full bg-gold/20 flex items-center justify-center mb-2">
                  <ShieldCheck className="h-8 w-8 text-gold" />
                </div>
                <h3 className="font-bold text-xl text-gold">
                  Presença Confirmada!
                </h3>
                <p className="text-sm text-zinc-400">
                  Você ganhou +50 pontos nesta partida.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Player List */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" /> Lista de Jogadores
          </h3>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <ScrollArea className="h-64 rounded-lg">
                <div className="divide-y divide-border/50">
                  {match.players.map((player) => (
                    <div
                      key={player.id}
                      className="p-3 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>{player.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{player.name}</p>
                          <div
                            className={cn(
                              'text-xs flex items-center gap-1',
                              getStatusColor(player.status),
                            )}
                          >
                            <Circle className="h-2 w-2 fill-current" />
                            {getStatusText(player.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {player.pointsEarned ? (
                          <span className="text-xs font-bold text-primary flex items-center gap-1">
                            +{player.pointsEarned} pts{' '}
                            <Trophy className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            -- pts
                          </span>
                        )}
                        {player.checkInTime && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {player.checkInTime}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <CheckInModal
        open={isCheckInOpen}
        onOpenChange={setIsCheckInOpen}
        onSuccess={handleCheckInSuccess}
      />
    </div>
  )
}
