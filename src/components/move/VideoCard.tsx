import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageCircle, Share2, Play, Zap, Music, Plus } from 'lucide-react'
import { AiAnalysisDrawer } from '@/components/AiAnalysisDrawer'
import { CommentsSheet } from '@/components/CommentsSheet'
import { ShareDialog } from '@/components/ShareDialog'
import { toast } from 'sonner'
import {
  mockAiAnalysis,
  mockStatsHistory,
  mockTrainingSuggestions,
} from '@/lib/data'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { SportsReactionButton } from '@/components/move/SportsReactionButton'
import { useLikeInteraction } from '@/hooks/useLikeInteraction'

export interface VideoData {
  id: string
  url?: string
  thumbnail: string
  title: string
  description: string
  likes: number
  comments: number
  shares: number
  user: {
    id: string
    name: string
    avatar: string
    isFollowing: boolean
  }
  music: {
    title: string
    artist: string
  } | null
  modality: string
}

interface VideoCardProps {
  video: VideoData
  isActive: boolean
}

export function VideoCard({ video, isActive }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing)

  // Use the interaction hook for sound and state logic
  const { isLiked, likeCount, handleLike } = useLikeInteraction(
    { content: video.title, hashtags: [video.modality] },
    video.likes,
    false,
  )

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

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFollowing(!isFollowing)
    toast.success(
      isFollowing ? 'Deixou de seguir' : `Você agora segue ${video.user.name}`,
    )
  }

  const enrichedAiData = {
    ...mockAiAnalysis,
    score: Math.floor(Math.random() * (98 - 75) + 75), // Random score for demo
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
      {/* Nostalgia Filter Layer */}
      <NostalgiaFilter className="z-10" />

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

        {/* Sports Specific Emoji Reaction */}
        <SportsReactionButton
          modality={video.modality}
          isLiked={isLiked}
          likesCount={likeCount}
          onLike={handleLike}
        />

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
