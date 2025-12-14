import { useState, useRef, useEffect } from 'react'
import {
  mockVideos,
  mockAiAnalysis,
  mockTrainingSuggestions,
  mockStatsHistory,
  tribes,
} from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Play,
  Zap,
} from 'lucide-react'
import { AiAnalysisDrawer } from '@/components/AiAnalysisDrawer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const VideoCard = ({
  video,
  isActive,
}: {
  video: (typeof mockVideos)[0]
  isActive: boolean
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [isActive])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Enrich AI data with suggestions and history for the drawer
  const enrichedAiData = {
    ...mockAiAnalysis,
    history: mockStatsHistory,
    suggestions: mockTrainingSuggestions,
  }

  return (
    <div className="relative h-full w-full snap-start bg-black overflow-hidden">
      {/* Video Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
        onClick={togglePlay}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Play className="h-16 w-16 text-white/50 fill-white/50" />
        </div>
      )}

      {/* Side Actions */}
      <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6 z-20">
        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          >
            <Heart className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {video.likes}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {video.comments}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/40 text-primary hover:bg-black/60 border border-primary/50 animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            onClick={() => setShowAnalysis(true)}
          >
            <Zap className="h-6 w-6 fill-current" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            AI Skip
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          >
            <Share2 className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {video.shares}
          </span>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-black/20 text-white hover:bg-black/40"
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-24 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none">
        <div className="flex items-center gap-3 mb-3 pointer-events-auto">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback>{video.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-white font-bold text-sm shadow-black drop-shadow-md">
              {video.user.name}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-[10px] px-2 bg-transparent text-white border-white hover:bg-white/20"
            >
              Seguir
            </Button>
          </div>
        </div>
        <p className="text-white text-sm mb-2 line-clamp-2 drop-shadow-md">
          {video.title}{' '}
          <span className="text-white/80 font-normal">{video.description}</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white flex items-center gap-1">
            🎵 Som original - {video.user.name}
          </div>
        </div>
      </div>

      <AiAnalysisDrawer
        open={showAnalysis}
        onOpenChange={setShowAnalysis}
        data={enrichedAiData}
      />
    </div>
  )
}

export default function Move() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTribe, setActiveTribe] = useState('all')
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  const filteredVideos =
    activeTribe === 'all'
      ? mockVideos
      : mockVideos.filter((video) => video.modality === activeTribe)

  const handleTribeChange = (tribeId: string) => {
    setActiveTribe(tribeId)
    setActiveIndex(0)
    // Reset scroll position
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-black relative">
      {/* Tribes Filter Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-4 pb-4 bg-gradient-to-b from-black/80 to-transparent">
        <ScrollArea className="w-full whitespace-nowrap px-4">
          <div className="flex w-max space-x-2 px-4">
            {tribes.map((tribe) => (
              <button
                key={tribe.id}
                onClick={() => handleTribeChange(tribe.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md',
                  activeTribe === tribe.id
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20',
                )}
              >
                {'image' in tribe && tribe.image ? (
                  <img
                    src={tribe.image}
                    alt={tribe.label}
                    className="h-4 w-4 object-contain"
                  />
                ) : (
                  <tribe.icon
                    className={cn(
                      'h-4 w-4',
                      activeTribe === tribe.id ? 'fill-current' : '',
                    )}
                  />
                )}
                {tribe.label}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* Video Feed */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        onScroll={handleScroll}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={video.id} className="h-full w-full snap-start">
              <VideoCard video={video} isActive={index === activeIndex} />
            </div>
          ))
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="bg-zinc-800 p-4 rounded-full mb-4">
              <Zap className="h-8 w-8 text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sem vídeos no momento</h3>
            <p className="text-zinc-400">
              Não encontramos vídeos para esta modalidade. Tente selecionar
              outra tribo!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
