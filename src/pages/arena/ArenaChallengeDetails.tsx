import { useParams, useNavigate } from 'react-router-dom'
import { useArenaStore } from '@/stores/useArenaStore'
import { mockCurrentUser } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Clock, Medal, Shield, ShieldCheck, Zap } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function ArenaChallengeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { challenges, participations } = useArenaStore()

  const challenge = challenges.find((c) => c.id === id)
  const challengeParticipations = participations.filter(
    (p) => p.challengeId === id,
  )
  const myParticipation = challengeParticipations.find(
    (p) => p.athleteId === mockCurrentUser.id,
  )

  if (!challenge) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Desafio não encontrado.
      </div>
    )
  }

  const isEnded = challenge.status === 'ended'
  const rankings = [...challengeParticipations].sort(
    (a, b) => (b.finalScore || 0) - (a.finalScore || 0),
  )

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Banner */}
      <div className="relative h-64 w-full">
        <img
          src={challenge.banner}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-black/40 text-white hover:bg-black/60 border border-white/10 backdrop-blur-md"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-gold text-black border-none font-bold mb-2">
            {challenge.modality} • {challenge.type}
          </Badge>
          <h1 className="text-2xl font-black text-white leading-tight drop-shadow-md">
            {challenge.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-white/80 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            {isEnded
              ? 'Desafio Encerrado'
              : `Termina em ${formatDistanceToNow(new Date(challenge.endDate), { locale: ptBR })}`}
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 mb-6">
            <TabsTrigger value="details" className="text-xs font-bold">
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="ranking" className="text-xs font-bold">
              Ranking Oficial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">Sobre o Desafio</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {challenge.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg">Regras</h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg border border-border/50">
                {challenge.rules}
              </p>
            </div>

            {/* Hybrid Engine Setup */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Motor de Avaliação Híbrido
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                  <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="font-black text-lg text-primary leading-none">
                    50%
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                    IA Goplay
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                  <ShieldCheck className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="font-black text-lg text-blue-500 leading-none">
                    30%
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                    Profissionais
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                  <div className="w-5 h-5 mx-auto mb-1 flex items-center justify-center font-bold text-green-500">
                    V
                  </div>
                  <p className="font-black text-lg text-green-500 leading-none">
                    20%
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                    Comunidade
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>Critérios Específicos:</strong> {challenge.criteria}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="ranking" className="space-y-3">
            {rankings.length > 0 ? (
              rankings.map((participation, index) => {
                const isMe = participation.athleteId === mockCurrentUser.id
                return (
                  <div
                    key={participation.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${isMe ? 'bg-primary/5 border-primary/30' : 'bg-card'}`}
                  >
                    <div className="w-8 flex justify-center shrink-0">
                      {index === 0 ? (
                        <Medal className="w-7 h-7 text-yellow-500 fill-yellow-500" />
                      ) : index === 1 ? (
                        <Medal className="w-6 h-6 text-slate-400 fill-slate-300" />
                      ) : index === 2 ? (
                        <Medal className="w-6 h-6 text-orange-700 fill-orange-400" />
                      ) : (
                        <span className="font-bold text-muted-foreground">
                          #{index + 1}
                        </span>
                      )}
                    </div>
                    <Avatar className="w-10 h-10 border border-border">
                      <AvatarImage src={participation.athlete?.avatar} />
                      <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">
                        {isMe ? 'Você' : participation.athlete?.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Status:{' '}
                        <span className="capitalize text-primary font-medium">
                          {participation.status}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg text-foreground">
                        {participation.finalScore?.toFixed(1) || '--'}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase">
                        Score Híbrido
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Nenhuma participação registrada ainda.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {!isEnded && !myParticipation && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/50">
          <Button
            className="w-full h-12 text-base font-bold bg-gold text-black hover:bg-gold/90 shadow-lg"
            onClick={() => navigate(`/arena/${challenge.id}/participate`)}
          >
            Participar do Desafio
          </Button>
        </div>
      )}

      {myParticipation && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/50">
          <Button disabled className="w-full h-12 text-base font-bold">
            Participação Registrada
          </Button>
        </div>
      )}
    </div>
  )
}
