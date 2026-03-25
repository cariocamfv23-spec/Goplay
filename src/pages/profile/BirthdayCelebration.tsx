import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Sparkles, PartyPopper } from 'lucide-react'

export function BirthdayCelebration({
  user,
  isMe,
}: {
  user: any
  isMe: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [emojis, setEmojis] = useState<
    {
      id: number
      left: number
      delay: number
      duration: number
      char: string
    }[]
  >([])

  useEffect(() => {
    if (!user || !isMe || !user.birthDate) return

    const today = new Date()
    const [year, month, day] = user.birthDate.split('-').map(Number)

    const isBirthday = month === today.getMonth() + 1 && day === today.getDate()

    if (isBirthday) {
      const hasSeen = sessionStorage.getItem(
        `bday_seen_${user.id}_${today.getFullYear()}`,
      )
      if (!hasSeen) {
        const generated = Array.from({ length: 40 }).map((_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 2.5 + Math.random() * 2,
          char: ['🎉', '✨', '🏆', '💛', '🎊', '🎁'][
            Math.floor(Math.random() * 6)
          ],
        }))
        setEmojis(generated)

        const timer = setTimeout(() => setIsOpen(true), 800)
        return () => clearTimeout(timer)
      }
    }
  }, [user, isMe])

  const handleClose = () => {
    setIsOpen(false)
    if (user?.birthDate) {
      sessionStorage.setItem(
        `bday_seen_${user.id}_${new Date().getFullYear()}`,
        'true',
      )
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-background/60 backdrop-blur-3xl border-white/10 shadow-[0_0_50px_rgba(255,215,0,0.15)] rounded-2xl w-[95vw] border-2">
        <DialogTitle className="sr-only">Feliz Aniversário</DialogTitle>
        <DialogDescription className="sr-only">
          Mensagem de feliz aniversário do GoPlay
        </DialogDescription>

        <style>{`
          @keyframes float-up-bday {
            0% { transform: translateY(50px) scale(0.5) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(-250px) scale(1.5) rotate(360deg); opacity: 0; }
          }
          .animate-bday-float {
            animation: float-up-bday linear forwards;
          }
        `}</style>

        <div className="relative w-full aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/40 to-gold/30 mix-blend-overlay z-10" />
          <img
            src="https://img.usecurling.com/p/600/400?q=celebration%20lights&color=gold"
            alt="Celebration"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {emojis.map((emoji) => (
              <div
                key={emoji.id}
                className="absolute bottom-0 text-2xl animate-bday-float"
                style={{
                  left: `${emoji.left}%`,
                  animationDelay: `${emoji.delay}s`,
                  animationDuration: `${emoji.duration}s`,
                }}
              >
                {emoji.char}
              </div>
            ))}
          </div>

          <div className="relative z-30 bg-black/40 p-5 rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,215,0,0.4)]">
            <PartyPopper className="w-16 h-16 text-gold animate-bounce" />
          </div>
        </div>

        <div className="p-6 md:p-8 text-center space-y-4 relative z-30 bg-gradient-to-b from-transparent to-background/50">
          <h2 className="text-2xl md:text-3xl font-black italic tracking-tight bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent animate-pulse leading-tight drop-shadow-sm">
            FELIZ ANIVERSÁRIO!
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Hoje é o seu dia,{' '}
            <strong className="text-foreground">{user.name}</strong>! 🎈
            <br />A equipe GoPlay deseja que este novo ciclo seja de muita
            performance, conquistas e saúde. Continue quebrando recordes!
          </p>
          <Button
            className="w-full h-12 md:h-14 text-base font-bold bg-gradient-to-r from-gold to-yellow-600 text-black border-none hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-gold/20 mt-4 rounded-xl"
            onClick={handleClose}
          >
            Bora Comemorar! <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
