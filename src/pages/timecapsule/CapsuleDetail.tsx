import { useParams, useNavigate } from 'react-router-dom'
import { useTimeCapsuleStore } from '@/stores/useTimeCapsuleStore'
import { mockCurrentUser } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Trophy,
  Share2,
  Star,
  Swords,
  Calendar,
  LockOpen,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FeedVideoPlayer } from '@/components/FeedVideoPlayer'
import { toast } from 'sonner'

export default function CapsuleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { capsules } = useTimeCapsuleStore()

  const capsule = capsules.find((c) => c.id === id)

  if (!capsule || capsule.status !== 'released') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <LockOpen className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-bold">Cápsula indisponível</h2>
        <p className="text-muted-foreground mb-6">
          Esta cápsula ainda não foi liberada ou não existe.
        </p>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    )
  }

  const handlePublish = () => {
    toast.success('Publicado no Feed com sucesso!')
    navigate('/feed')
  }

  const handleHighlight = () => {
    toast.success('Adicionado aos Destaques do Perfil.')
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in relative">
      {/* Background Glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-gold/10 via-primary/5 to-transparent pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg text-primary leading-none">
              Time Capsule Revelada
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-xl mx-auto space-y-8">
        <div className="text-center mt-4">
          <Badge className="bg-gold/20 text-gold hover:bg-gold/30 border-none mb-3">
            <LockOpen className="w-3 h-3 mr-1" /> Liberada Oficialmente
          </Badge>
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            {capsule.title}
          </h2>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Selada:{' '}
              {format(new Date(capsule.createdAt), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </span>
            <span>→</span>
            <span className="flex items-center gap-1 font-bold text-foreground">
              <Calendar className="w-4 h-4" /> Aberta:{' '}
              {format(new Date(capsule.openAt), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative">
          {capsule.type === 'video' ? (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
              <FeedVideoPlayer
                url={capsule.content}
                thumbnail="https://img.usecurling.com/p/800/450?q=athlete%20training&color=black"
              />
            </div>
          ) : (
            <div className="bg-secondary/30 p-8 rounded-2xl border border-border/50 relative overflow-hidden">
              <div className="absolute -top-4 -left-4 text-8xl text-primary/10 font-serif">
                "
              </div>
              <p className="text-lg italic text-foreground/90 relative z-10 leading-relaxed text-center">
                {capsule.content}
              </p>
              <div className="absolute -bottom-10 -right-4 text-8xl text-primary/10 font-serif">
                "
              </div>
            </div>
          )}
        </div>

        {/* Badge "Meta Cumprida" */}
        <div className="flex items-center justify-center p-6 bg-gradient-to-br from-gold/20 to-yellow-500/5 rounded-2xl border border-gold/30 shadow-[0_0_40px_rgba(255,215,0,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="text-center relative z-10">
            <div className="relative inline-block mb-3">
              <div className="absolute inset-0 bg-gold blur-xl opacity-50" />
              <Trophy className="w-16 h-16 text-gold relative z-10 mx-auto" />
            </div>
            <h3 className="text-2xl font-black text-gold uppercase tracking-widest drop-shadow-sm">
              Meta Cumprida
            </h3>
            <p className="text-sm text-gold/80 mt-1 font-medium">
              Você honrou sua promessa do passado!
            </p>
          </div>
        </div>

        {/* Comparison Section */}
        <div>
          <h3 className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
            Sua Evolução
          </h3>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-background border border-border p-2 rounded-full shadow-lg">
                <Swords className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Past */}
              <div className="bg-secondary/30 p-5 rounded-2xl border border-border text-center flex flex-col justify-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-3 tracking-wider">
                  Quando Selada
                </p>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-foreground">
                    {capsule.statsAtCreation.level}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Nível
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 space-y-1">
                  <p className="text-xl font-bold text-foreground">
                    {capsule.statsAtCreation.points}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Pontos Goplay
                  </p>
                </div>
              </div>

              {/* Present */}
              <div className="bg-primary/10 p-5 rounded-2xl border border-primary/30 text-center flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                <div className="relative z-10">
                  <p className="text-[10px] uppercase font-bold text-primary mb-3 tracking-wider flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-primary" /> Hoje
                  </p>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-primary">
                      {mockCurrentUser.level || 15}
                    </p>
                    <p className="text-xs text-primary/80 font-medium">Nível</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20 space-y-1">
                    <p className="text-xl font-bold text-primary">
                      {mockCurrentUser.points}
                    </p>
                    <p className="text-xs text-primary/80 font-medium">
                      Pontos Goplay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border/50 space-y-3">
          <Button
            className="w-full bg-primary text-white h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            onClick={handlePublish}
          >
            <Share2 className="mr-2 h-5 w-5" />
            Publicar no Feed
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 text-lg font-bold border-primary/50 text-primary hover:bg-primary/10"
            onClick={handleHighlight}
          >
            <Star className="mr-2 h-5 w-5" />
            Destaque no Perfil
          </Button>
        </div>
      </div>
    </div>
  )
}
