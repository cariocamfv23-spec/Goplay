import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Heart, Flame, X, Eye, Send, Trophy } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState, useEffect } from 'react'

const commentsData = [
  {
    id: 1,
    user: 'alex_silva',
    text: 'Que jogada incrível! 🔥',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
  },
  {
    id: 2,
    user: 'mari.sports',
    text: 'Vai timeeee!! Pra cima deles!',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
  },
  {
    id: 3,
    user: 'carlos_edu',
    text: 'O passe foi genial.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
  },
  {
    id: 4,
    user: 'lucas_mendes',
    text: 'Alguém sabe quanto tá o placar?',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=34',
  },
  {
    id: 5,
    user: 'bia_lima',
    text: 'Golaçoooo ⚽⚽⚽',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=23',
  },
  {
    id: 6,
    user: 'pedro_santos',
    text: 'Defesa espetacular!!!',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=67',
  },
  {
    id: 7,
    user: 'julia_costa',
    text: 'Tô acompanhando daqui de casa',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=120',
  },
]

export function LiveStoryModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [visibleComments, setVisibleComments] = useState<typeof commentsData>(
    [],
  )

  useEffect(() => {
    if (open) {
      let i = 0
      setVisibleComments([commentsData[0]])
      i++

      const interval = setInterval(() => {
        if (i < commentsData.length) {
          setVisibleComments((prev) => [...prev, commentsData[i]])
          i++
        } else {
          clearInterval(interval)
        }
      }, 2000)
      return () => {
        clearInterval(interval)
        setVisibleComments([])
      }
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-screen h-[100dvh] p-0 border-none rounded-none bg-black overflow-hidden sm:max-w-[400px] sm:h-[800px] sm:rounded-[40px] sm:m-auto [&>button]:hidden">
        <div className="relative w-full h-full flex flex-col justify-between">
          <img
            src="https://img.usecurling.com/p/800/1600?q=soccer%20match%20live&color=black&dpr=2"
            alt="Live Stream"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between p-4 pt-8">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10 border border-white/20">
                <AvatarImage src="https://img.usecurling.com/ppl/medium?gender=male&seed=999" />
                <AvatarFallback>TV</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm leading-tight drop-shadow-md">
                  Goplay TV
                </span>
                <span className="text-white/80 text-xs leading-tight drop-shadow-md">
                  Final Regional
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full pr-3 pl-1 py-1 shadow-sm">
                <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  AO VIVO
                </div>
                <div className="flex items-center gap-1 text-white text-xs font-bold">
                  <Eye className="w-3.5 h-3.5" />
                  2.4k
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md"
                onClick={() => onOpenChange(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Footer area */}
          <div className="relative z-10 flex flex-col justify-end p-4 pb-8 h-[60%]">
            {/* Reactions floating */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-1 pointer-events-none w-10 h-48 overflow-hidden">
              <div className="absolute bottom-0 text-red-500 animate-float-up-fade animation-delay-100">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute bottom-0 text-orange-500 animate-float-up-fade animation-delay-500">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute bottom-0 text-yellow-400 animate-float-up-fade animation-delay-1000">
                <Trophy className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute bottom-0 text-red-500 animate-float-up-fade animation-delay-1500">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="absolute bottom-0 text-orange-500 animate-float-up-fade animation-delay-2000">
                <Flame className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-hidden relative w-[85%] mask-gradient-to-t">
              <div className="absolute bottom-0 w-full flex flex-col gap-3 pb-2">
                {visibleComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300"
                  >
                    <Avatar className="w-7 h-7 border border-white/10 shrink-0">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-2xl rounded-tl-sm">
                      <span className="text-[10px] font-bold text-white/70">
                        {comment.user}
                      </span>
                      <span className="text-xs text-white drop-shadow-sm">
                        {comment.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="mt-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Comentar..."
                  className="bg-black/40 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 rounded-full h-10 focus-visible:ring-white/30"
                />
              </div>
              <Button
                size="icon"
                className="rounded-full h-10 w-10 shrink-0 bg-gradient-to-r from-primary to-purple-600 border-none shadow-lg"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-10 w-10 shrink-0 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 border border-white/10"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
