import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useFlashbackStore } from '@/stores/useFlashbackStore'
import useNotificationStore from '@/stores/useNotificationStore'
import { mockDailyMemories, mockUser } from '@/lib/data'
import { History, X, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function FlashbackModal() {
  const { isOpen, memoryId, notificationId, closeFlashback } =
    useFlashbackStore()
  const markAsRead = useNotificationStore((state) => state.markAsRead)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (isOpen && notificationId) {
      markAsRead(notificationId)
    }
  }, [isOpen, notificationId, markAsRead])

  const memoryData = memoryId ? mockDailyMemories[memoryId] : null

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
    }
  }, [isOpen])

  if (!memoryData) return null

  const items = memoryData.items
  const currentItem = items[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeFlashback()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-background/40 backdrop-blur-3xl border-white/20 shadow-[0_0_50px_rgba(168,85,247,0.2)] rounded-3xl w-[95vw] border-2 z-[200]">
        <DialogTitle className="sr-only">Memória Flashback</DialogTitle>

        <div className="relative w-full aspect-[9/16] max-h-[80vh] flex flex-col bg-black/60">
          {/* Background Blur */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {currentItem.type === 'video' ? (
              <div className="w-full h-full bg-zinc-950" />
            ) : (
              <img
                src={currentItem.url}
                alt="Memory Background"
                className="w-full h-full object-cover blur-2xl opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
          </div>

          {/* Header */}
          <div className="relative z-20 flex items-center justify-between p-4 pt-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback>EU</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-0.5">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-tight text-white drop-shadow-md flex items-center gap-1.5">
                  Viagem no Tempo{' '}
                  <History className="w-3 h-3 text-purple-400" />
                </span>
                <span className="text-xs text-white/80 font-medium">
                  {currentItem.date}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
              onClick={closeFlashback}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full p-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm group">
              {currentItem.type === 'video' ? (
                <video
                  src={currentItem.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={currentItem.url}
                  alt="Memory Content"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Time Travel Badge */}
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 flex items-center gap-2 shadow-lg">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-100">
                    Há {currentItem.yearsAgo} ano
                    {currentItem.yearsAgo > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-30 pointer-events-none">
                <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-2 opacity-90 flex items-center gap-1.5 drop-shadow-md">
                  <Sparkles className="w-3 h-3" /> Veja o que você estava
                  fazendo neste dia!
                </p>
                {currentItem.caption && (
                  <p className="text-white font-medium text-sm drop-shadow-md leading-relaxed">
                    {currentItem.caption}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Progress & Navigation */}
          <div className="relative z-20 pb-6 px-6">
            <div className="flex gap-1.5 mb-4">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] scale-y-110'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir para o slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
