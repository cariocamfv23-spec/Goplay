import { useState, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  MessageCircle,
  Share2,
  Play,
  Zap,
  Music,
  Plus,
  Volume2,
  VolumeX,
  Loader2,
} from 'lucide-react'
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
import { cn } from '@/lib/utils'
import { TranslateButton } from '@/components/TranslateButton'
import { useTranslation } from '@/hooks/useTranslation'

export interface VideoData {
  id: string
  url: string
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing)

  const { isLiked, likeCount, handleLike } = useLikeInteraction(
    { content: video.title, hashtags: [video.modality] },
    video.likes,
    false,
  )

  const {
    language,
    isTranslated,
    isLoading: isTranslating,
    toggleTranslation,
    translatedTexts,
  } = useTranslation([video.title || '', video.description || ''])

  const displayTitle = isTranslated ? translatedTexts[0] : video.title
  const displayDesc = isTranslated ? translatedTexts[1] : video.description

  // Handle Active State Changes
  useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error('Autoplay prevented:', error)
            setIsPlaying(false)
            if (videoRef.current && !videoRef.current.muted) {
              setIsMuted(true)
              videoRef.current.muted = true
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {})
            }
          })
      }
    } else {
      videoRef.current?.pause()
      setIsPlaying(false)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
      }
    }
  }, [isActive])

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFollowing(!isFollowing)
    toast.success(
      isFollowing ? 'Deixou de seguir' : `Você agora segue ${video.user.name}`,
    )
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress || 0)
    }
  }

  const handleLoadStart = () => setIsLoading(true)
  const handleCanPlay = () => setIsLoading(false)
  const handleWaiting = () => setIsLoading(true)
  const handlePlaying = () => {
    setIsLoading(false)
    setIsPlaying(true)
  }

  const enrichedAiData = {
    ...mockAiAnalysis,
    score: Math.floor(Math.random() * (98 - 75) + 75),
    aiStats: [
      { label: 'Velocidade', value: 28, max: 35, unit: 'km/h' },
      { label: 'Força', value: 850, max: 1000, unit: 'N' },
      { label: 'Técnica', value: 92, max: 100, unit: 'pts' },
    ],
    history: mockStatsHistory.length > 0 ? mockStatsHistory : [],
    suggestions:
      mockTrainingSuggestions.length > 0 ? mockTrainingSuggestions : [],
  }

  return (
    <div className="relative h-full w-full snap-start bg-black overflow-hidden flex items-center justify-center">
      <NostalgiaFilter className="z-10" />

      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.url}
        poster={video.thumbnail}
        className="absolute inset-0 w-full h-full object-cover bg-black"
        loop
        playsInline
        muted={isMuted} // Controlled by state
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 pointer-events-none">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {/* Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

      {/* Play/Pause Center Icon Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-black/40 rounded-full p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
            <Play className="h-12 w-12 text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Side Actions (Right) */}
      <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6 z-20 pb-4">
        {/* Profile Avatar */}
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
            AI
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
          <div className="mb-3">
            <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md leading-snug">
              {displayTitle}{' '}
              <span className="text-white/70 font-normal">{displayDesc}</span>
            </p>
            {language !== 'pt' && (
              <TranslateButton
                isTranslated={isTranslated}
                isLoading={isTranslating}
                onClick={toggleTranslation}
                className="text-gold hover:text-gold/80 hover:bg-transparent drop-shadow-md"
              />
            )}
          </div>

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

            {/* Mute Button */}
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/10"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(var(--primary),0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Rotating Disc (Bottom Right) */}
      <div className="absolute bottom-6 right-4 z-20 pointer-events-none">
        <div
          className={cn(
            'w-10 h-10 rounded-full bg-black border-4 border-zinc-800 flex items-center justify-center',
            isPlaying ? 'animate-[spin_5s_linear_infinite]' : '',
          )}
        >
          <Avatar className="w-6 h-6">
            <AvatarImage src={video.user.avatar} />
          </Avatar>
        </div>
      </div>

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
