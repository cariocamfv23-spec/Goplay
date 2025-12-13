import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LightningChallenge } from '@/lib/data'
import { Zap, Timer, Trophy } from 'lucide-react'
import { toast } from 'sonner'
import useSoundStore from '@/stores/useSoundStore'

interface LightningChallengeOverlayProps {
  challenge: LightningChallenge | null
  onClose: () => void
  onComplete: () => void
}

export function LightningChallengeOverlay({
  challenge,
  onClose,
  onComplete,
}: LightningChallengeOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const { playSound } = useSoundStore()

  useEffect(() => {
    if (challenge) {
      setTimeLeft(challenge.duration)
      playSound('notification_invite') // Reusing a sound for alert
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [challenge, playSound])

  const handleComplete = () => {
    playSound('notification_points')
    toast.success('Desafio Concluído!', {
      description: `Você ganhou +${challenge?.reward} pontos!`,
      icon: <Trophy className="h-5 w-5 text-gold" />,
    })
    onComplete()
  }

  if (!challenge) return null

  const progress = (timeLeft / challenge.duration) * 100

  return (
    <Dialog open={!!challenge} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-900 to-black border-gold/30 text-white p-0 overflow-hidden">
        <div className="relative p-6 flex flex-col items-center text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
            <div
              className="h-full bg-gold transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="h-16 w-16 bg-gold/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Zap className="h-8 w-8 text-gold fill-gold" />
          </div>

          <h2 className="text-2xl font-black italic tracking-wide mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
            Desafio Relâmpago!
          </h2>

          <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
          <p className="text-white/80 mb-6">{challenge.description}</p>

          <div className="flex items-center gap-2 mb-8 bg-black/40 px-4 py-2 rounded-full border border-white/10">
            <Timer className="h-4 w-4 text-red-400" />
            <span className="font-mono font-bold text-red-400">
              00:{timeLeft.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 border-white/20 hover:bg-white/10 text-white"
              onClick={onClose}
            >
              Ignorar
            </Button>
            <Button
              className="flex-1 bg-gold hover:bg-yellow-500 text-black font-bold"
              onClick={handleComplete}
            >
              Aceitar & Completar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
