import { useState, useRef, useEffect } from 'react'
import {
  mockAiAnalysis,
  mockStatsHistory,
  mockTrainingSuggestions,
  tribes,
} from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Zap,
  Music,
  Plus,
} from 'lucide-react'
import { AiAnalysisDrawer } from '@/components/AiAnalysisDrawer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CommentsSheet } from '@/components/CommentsSheet'
import { ShareDialog } from '@/components/ShareDialog'
import { toast } from 'sonner'

// Local Mock Data since src/lib/data.ts is empty/read-only in context
const LOCAL_MOCK_VIDEOS = [
  {
    id: 'v1',
    url: '',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=soccer%20juggling&color=green',
    title: 'Domínio total no treino de hoje! ⚽️',
    description: 'Focando no controle de bola e reflexos. O que acharam?',
    likes: 1240,
    comments: 45,
    shares: 89,
    user: {
      id: 'u1',
      name: 'Lucas Paquetá',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=10',
      isFollowing: false,
    },
    music: {
      title: 'Samba de Janeiro',
      artist: 'Bellini',
    },
    modality: 'futebol',
  },
  {
    id: 'v2',
    url: '',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=basketball%20dunk&color=orange',
    title: 'Dunk contest warmup 🏀',
    description: 'Getting ready for the big game.',
    likes: 3500,
    comments: 120,
    shares: 400,
    user: {
      id: 'u2',
      name: 'Jordan Poole',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=23',
      isFollowing: true,
    },
    music: {
      title: 'Industry Baby',
      artist: 'Lil Nas X',
    },
    modality: 'futebol', // Using futebol to show in 'all' or filtered
  },
  {
    id: 'v3',
    url: '',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=crossfit%20workout&color=red',
    title: 'WOD from hell 🔥',
    description: 'No pain no gain. 21-15-9 Thrusters and Pull-ups.',
    likes: 890,
    comments: 32,
    shares: 15,
    user: {
      id: 'u3',
      name: 'Sarah Fit',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=45',
      isFollowing: false,
    },
    music: null,
    modality: 'crossfit',
  },
]

const VideoCard = ({
  video,
  isActive,
}: {
  video: (typeof LOCAL_MOCK_VIDEOS)[0]
  isActive: boolean
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(video.likes)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing)

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

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFollowing(!isFollowing)
    toast.success(
      isFollowing ? 'Deixou de seguir' : `Você agora segue ${video.user.name}`,
    )
  }

  const enrichedAiData = {
    ...mockAiAnalysis,
    score: 88,
    aiStats: [
      { label: 'Velocidade', value: 28, max: 35, unit: 'km/h' },
      { label: 'Força', value: 850, max: 1000, unit: 'N' },
      { label: 'Técnica', value: 92, max: 100, unit: 'pts' },
    ],
    history:
      mockStatsHistory.length > 0
        ? mockStatsHistory
        : [
            { date: 'Jan', rating: 3.5, matches: 10 },
            { date: 'Fev', rating: 3.8, matches: 12 },
          ],
    suggestions:
      mockTrainingSuggestions.length > 0
        ? mockTrainingSuggestions
        : [
            {
              id: '1',
              title: 'Melhorar Postura',
              description: 'Mantenha as costas retas durante o movimento.',
              difficulty: 'Iniciante',
              reason: 'Prevenção de lesão',
              exercises: [{ name: 'Prancha', sets: 3, reps: 30 }],
            },
          ],
  }

  return (
    <div className="relative h-full w-full snap-start bg-black overflow-hidden">
      {/* Video Placeholder/Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          backgroundImage: `url(${video.thumbnail})`,
          transform: isPlaying ? 'scale(1.0)' : 'scale(1.05)',
        }}
        onClick={togglePlay}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
      </div>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <Play className="h-16 w-16 text-white/70 fill-white/70 animate-pulse" />
        </div>
      )}

      {/* Side Actions (Right) */}
      <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6 z-20 pb-4">
        {/* Profile Avatar with Follow Badge */}
        <div className="relative mb-2">
          <Avatar className="h-12 w-12 border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback>{video.user.name[0]}</AvatarFallback>
          </Avatar>
          {!isFollowing && (
            <button
              onClick={handleFollow}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full p-0.5 shadow-md hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-transparent hover:bg-transparent text-white"
            onClick={handleLike}
          >
            <Heart
              className={cn(
                'h-8 w-8 transition-all duration-300 drop-shadow-md',
                isLiked ? 'fill-red-500 text-red-500 scale-110' : '',
              )}
            />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {likesCount}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-transparent hover:bg-transparent text-white"
            onClick={() => setShowComments(true)}
          >
            <MessageCircle className="h-8 w-8 drop-shadow-md" />
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
            className="h-12 w-12 rounded-full bg-transparent hover:bg-transparent text-white"
            onClick={() => setShowShare(true)}
          >
            <Share2 className="h-8 w-8 drop-shadow-md" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {video.shares}
          </span>
        </div>
      </div>

      {/* Bottom Info (Left) */}
      <div className="absolute bottom-0 left-0 right-16 p-4 pb-6 z-20 pointer-events-none text-left">
        <div className="pointer-events-auto">
          <h3 className="text-white font-bold text-base shadow-black drop-shadow-md mb-1">
            {video.user.name}
          </h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2 drop-shadow-md leading-snug">
            {video.title}{' '}
            <span className="text-white/70 font-normal">
              {video.description}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs text-white flex items-center gap-2 max-w-[90%] border border-white/10">
              {video.music ? (
                <>
                  <Music className="h-3 w-3 animate-[spin_3s_linear_infinite]" />
                  <span className="truncate font-medium">
                    {video.music.title} - {video.music.artist}
                  </span>
                </>
              ) : (
                <>
                  <Music className="h-3 w-3" />
                  <span>Som original - {video.user.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Disc (Bottom Right) */}
      <div className="absolute bottom-6 right-4 z-20 pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-black border-4 border-zinc-800 flex items-center justify-center animate-[spin_5s_linear_infinite]">
          <Avatar className="w-6 h-6">
            <AvatarImage src={video.user.avatar} />
          </Avatar>
        </div>
      </div>

      {/* Drawers & Dialogs */}
      <AiAnalysisDrawer
        open={showAnalysis}
        onOpenChange={setShowAnalysis}
        data={enrichedAiData}
      />

      <CommentsSheet
        open={showComments}
        onOpenChange={setShowComments}
        videoId={video.id}
      />

      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        videoTitle={video.title}
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
      ? LOCAL_MOCK_VIDEOS
      : LOCAL_MOCK_VIDEOS.filter(
          (video) =>
            video.modality === activeTribe || activeTribe === 'futebol',
        )

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
      {/* Header / Tribes Filter Bar */}
      <div className="absolute top-4 left-0 right-0 z-30 flex flex-col items-center">
        {/* Standard "Following | For You" Tabs */}
        <div className="flex items-center gap-4 text-white text-sm font-bold shadow-black drop-shadow-md mb-4">
          <span className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
            Seguindo
          </span>
          <span className="opacity-60">|</span>
          <span className="opacity-100 border-b-2 border-white pb-0.5">
            Para Você
          </span>
        </div>

        {/* Tribes Scroll */}
        <ScrollArea className="w-full whitespace-nowrap px-4 mask-gradient">
          <div className="flex w-max space-x-3 px-4 pb-2">
            {tribes.map((tribe) => (
              <button
                key={tribe.id}
                onClick={() => handleTribeChange(tribe.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 backdrop-blur-md border border-transparent',
                  activeTribe === tribe.id
                    ? 'bg-primary text-white border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.4)]'
                    : 'bg-black/30 text-white hover:bg-black/50 border-white/10',
                )}
              >
                {'image' in tribe && tribe.image ? (
                  <img
                    src={tribe.image}
                    alt={tribe.label}
                    className="h-3 w-3 object-contain"
                  />
                ) : (
                  <tribe.icon
                    className={cn(
                      'h-3 w-3',
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

      {/* Video Feed Container */}
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
