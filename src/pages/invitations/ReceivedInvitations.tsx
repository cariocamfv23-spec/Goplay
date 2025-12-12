import { Button } from '@/components/ui/button'
import { mockInvitations, Invitation } from '@/lib/data'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  Eye,
  Trophy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useState } from 'react'

export default function ReceivedInvitations() {
  const navigate = useNavigate()
  const [invitations, setInvitations] = useState<Invitation[]>(mockInvitations)

  const handleAccept = (id: string) => {
    toast.success('Convite Aceito!', {
      description: 'Você foi adicionado à partida e ganhou +20 pontos!',
      icon: <Trophy className="h-5 w-5 text-gold" />,
    })
    // Remove from list simulation
    setInvitations(invitations.filter((inv) => inv.id !== id))
    // Navigate to match details simulation
    navigate('/matches/match-1')
  }

  const handleDecline = (id: string) => {
    toast.info('Convite Recusado')
    setInvitations(invitations.filter((inv) => inv.id !== id))
  }

  return (
    <div className="min-h-screen bg-background pb-8 animate-fade-in">
      <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Convites Recebidos</h1>
      </div>

      <div className="p-4 space-y-4">
        {invitations.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Nenhum convite pendente no momento.</p>
          </div>
        ) : (
          invitations.map((inv) => (
            <Card
              key={inv.id}
              className="border border-border/50 shadow-md overflow-hidden"
            >
              <div className="bg-secondary/30 p-3 flex justify-between items-center border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={inv.teamLogo} />
                    <AvatarFallback>{inv.teamName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-sm">{inv.teamName}</span>
                </div>
                <Badge variant="outline" className="bg-background">
                  {inv.modality}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> Data e Hora
                    </div>
                    <p className="text-sm font-semibold">{inv.time}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> Local
                    </div>
                    <p className="text-sm font-semibold truncate">
                      {inv.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" /> Jogadores
                    </div>
                    <p className="text-sm font-semibold">
                      {inv.confirmedPlayersCount} Confirmados
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Trophy className="h-3 w-3" /> Nível
                    </div>
                    <p className="text-sm font-semibold">{inv.level}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full"
                    onClick={() => handleAccept(inv.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Aceitar
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full text-destructive border-destructive/20 hover:bg-destructive/10"
                    onClick={() => handleDecline(inv.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Recusar
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-2 h-8 text-xs text-muted-foreground hover:text-primary"
                >
                  <Eye className="h-3 w-3 mr-1" /> Ver Detalhes da Partida
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
