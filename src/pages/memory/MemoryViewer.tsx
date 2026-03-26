import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X, History, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockDailyMemories, mockUser } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export default function MemoryViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const memoryData = mockDailyMemories[id as string]
  const [currentIndex, setCurrentIndex] = useState(0)

  // Redirect if memory not found
  useEffect(() => {
    if (!memoryData) {
      navigate('/')
    }
  }, [memoryData, navigate])

  if (!memoryData) return null

  const items = memoryData.items
  const currentItem = items[currentIndex]

  const nextMemory = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      navigate(-1)
    }
  }

  const prevMemory = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black text-white overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500">
      {/* Background Blur Effect for Immersive Feel */}
      <div className="absolute inset-0 z-0">
        {currentItem.type === 'video' ? (
          <div className="w-full h-full bg-zinc-900" />
        ) : (
          <img
            src={currentItem.url}
            alt="Memory Background"
            className="w-full h-full object-cover blur-3xl opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-5 pt-12">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-white/20 shadow-lg">
            <AvatarImage src={mockUser.avatar} />
            <AvatarFallback>EU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight drop-shadow-md">
              Goplay Memory
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <History className="h-3 w-3" />
              <span>{currentItem.date}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md"
          onClick={() => navigate(-1)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Bars */}
      <div className="relative z-20 flex gap-1.5 px-4 mb-2">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="h-1 flex-1 rounded-full overflow-hidden bg-white/20"
          >
            <div
              className={cn(
                'h-full bg-white transition-all duration-300',
                idx < currentIndex
                  ? 'w-full'
                  : idx === currentIndex
                    ? 'w-full animate-[progress_5s_linear]' // Assuming 5s per slide
                    : 'w-0',
              )}
              style={
                idx === currentIndex
                  ? { animationPlayState: 'running' }
                  : undefined
              }
              onAnimationEnd={() => {
                if (idx === currentIndex) nextMemory()
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-2 py-4">
        {/* Memory Frame with Glassmorphism */}
        <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
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

          {/* Time Travel Label Overlay */}
          <div className="absolute top-4 left-4 z-30">
            <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Há {currentItem.yearsAgo} ano
                {currentItem.yearsAgo > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Caption Overlay */}
          {currentItem.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-30">
              <p className="text-white font-medium text-sm drop-shadow-md leading-relaxed">
                {currentItem.caption}
              </p>
            </div>
          )}
        </div>

        {/* Invisible Click Areas for Navigation */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 z-40"
          onClick={prevMemory}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/3 z-40"
          onClick={nextMemory}
        />
      </div>

      {/* Footer Navigation Hints */}
      <div className="relative z-20 pb-8 pt-4 flex justify-center items-center gap-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMemory}
          disabled={currentIndex === 0}
          className="rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="text-xs font-medium text-white/50 tracking-widest uppercase">
          Toque para navegar
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMemory}
          className="rounded-full bg-white/5 hover:bg-white/10"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
