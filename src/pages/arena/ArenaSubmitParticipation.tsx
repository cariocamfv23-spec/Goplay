import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useArenaStore } from '@/stores/useArenaStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Video, Zap, Activity } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useFeedStore } from '@/stores/useFeedStore'
import { mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function ArenaSubmitParticipation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { challenges, addParticipation } = useArenaStore()
  const addPost = useFeedStore((state) => state.addPost)
  const challenge = challenges.find((c) => c.id === id)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [autoPublish, setAutoPublish] = useState(false)

  if (!challenge) return null

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate upload delay and evaluation
    setTimeout(() => {
      addParticipation({
        challengeId: challenge.id,
        videoUrl: 'https://video.mp4',
        autoPublish,
        status: 'evaluated', // Mocking instant evaluation for demo
        finalScore: 92.5,
      })

      if (autoPublish) {
        addPost({
          type: 'arena_result',
          user: mockCurrentUser,
          content: `Acabei de receber meu resultado no ${challenge.title}! Muito orgulho dessa conquista na Arena Goplay. 🔥`,
          arenaResult: {
            challengeId: challenge.id,
            challengeTitle: challenge.title,
            rank: 1,
            score: 92.5,
            medal: 'gold',
            banner: challenge.banner,
          },
        })
      }

      setIsSubmitting(false)
      setSuccess(true)
      toast.success(
        autoPublish
          ? 'Participação enviada e publicada no feed!'
          : 'Participação enviada com sucesso!',
      )
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <Zap className="w-10 h-10 text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-black mb-2">Enviado com Sucesso!</h2>
        <p className="text-muted-foreground mb-8">
          Sua participação foi processada.{' '}
          {autoPublish && 'O resultado já está disponível no seu Feed.'}
        </p>
        <Button
          className="w-full max-w-xs h-12 font-bold"
          onClick={() => navigate(`/arena/${challenge.id}`)}
        >
          Voltar para o Desafio
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-secondary/30 p-4 flex items-center gap-3 border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
            Enviar Participação
          </p>
          <h2 className="font-bold truncate max-w-[200px]">
            {challenge.title}
          </h2>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {challenge.videoRequired && (
          <div className="space-y-3">
            <Label className="font-bold text-base">Vídeo Oficial</Label>
            <div className="border-2 border-dashed border-border/50 rounded-xl h-48 flex flex-col items-center justify-center bg-muted/20 text-muted-foreground">
              <Video className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm font-medium">Toque para gravar ou enviar</p>
              <p className="text-[10px]">Max 2 minutos. Sem cortes.</p>
            </div>
          </div>
        )}

        {challenge.moveDataAllowed && (
          <div className="space-y-3">
            <Label className="font-bold text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" /> Vínculo MOVE Data
            </Label>
            <Input
              placeholder="Ex: Tempo, KM, ou ID do Smartwatch"
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">
              Opcional. Os dados serão conferidos automaticamente.
            </p>
          </div>
        )}

        <div
          className={cn(
            'space-y-3 p-4 rounded-xl border mt-6 transition-colors',
            autoPublish
              ? 'bg-primary/5 border-primary/30'
              : 'bg-secondary/30 border-border/50',
          )}
        >
          <div className="flex flex-row items-center justify-between gap-4">
            <Label
              className="font-bold text-sm leading-snug cursor-pointer flex-1"
              onClick={() => setAutoPublish(!autoPublish)}
            >
              Publicar resultados automaticamente no Feed Inteligente
            </Label>
            <Switch
              checked={autoPublish}
              onCheckedChange={setAutoPublish}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Compartilhe sua nota e ranking final com seus seguidores assim que a
            avaliação do desafio for concluída.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/50">
        <Button
          className="w-full h-12 font-bold text-base"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Enviando...' : 'Confirmar Envio'}
        </Button>
      </div>
    </div>
  )
}
