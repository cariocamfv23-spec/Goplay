import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { AiAnalysisDrawer } from "@/components/AiAnalysisDrawer"
import { CommentsSheet } from "@/components/CommentsSheet"
import { ShareDialog } from "@/components/ShareDialog"
import { toast } from "sonner"
import {
  mockAiAnalysis,
  mockStatsHistory,
  mockTrainingSuggestions,
} from "@/lib/data"
import { NostalgiaFilter } from "@/components/NostalgiaFilter"
import { SportsReactionButton } from "@/components/move/SportsReactionButton"
import { useLikeInteraction } from "@/hooks/useLikeInteraction"
import { cn } from "@/lib/utils"

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
  shouldPreload?: boolean
}

export function VideoCard({
  video,
  isActive,
  shouldPreload = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
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

  // Reset error when URL changes
  useEffect(() => {
    setHasError(false)
    setErrorMessage(null)
    setIsLoading(true)
  }, [video.url])

  // Handle Active State Changes
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isActive) {
      // Reset error flag when becoming active if it wasn't a permanent failure
      const attemptPlay = () => {
        // Enforce muted on initial programmatic autoplay (required by modern mobile & desktop browsers)
        videoEl.muted = isMuted
        const playPromise = videoEl.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              setIsLoading(false)
            })
            .catch((error: any) => {
              // NotAllowedError is typical if unmuted autoplay is blocked by user agent
              if (error?.name === "NotAllowedError") {
                if (!videoEl.muted) {
                  setIsMuted(true)
                  videoEl.muted = true
                  videoEl
                    .play()
                    .then(() => {
                      setIsPlaying(true)
                      setIsLoading(false)
                    })
                    .catch((err2) => {
                      console.warn(
                        "[VideoCard] Autoplay silenciado também recusado:",
                        err2,
                      )
                      setIsPlaying(false)
                    })
                }
              } else if (error?.name !== "AbortError") {
                console.warn("[VideoCard] Erro ao reproduzir:", error)
                setIsPlaying(false)
              }
            })
        }
      }

      attemptPlay()
    } else {
      videoEl.pause()
      setIsPlaying(false)
      // Paused and inactive: rewind slightly for clean next view
      if (!Number.isNaN(videoEl.currentTime)) {
        videoEl.currentTime = 0
      }
    }
  }, [isActive, isMuted, video.url])

  // Sync mute state directly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = () => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isPlaying) {
      videoEl.pause()
      setIsPlaying(false)
    } else {
      setHasError(false)
      const playPromise = videoEl.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
          })
          .catch((err) => {
            console.warn("[VideoCard] Falha ao dar play manual:", err)
            setIsPlaying(false)
          })
      }
    }
  }

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoEl = videoRef.current
    if (!videoEl) return
    setHasError(false)
    setErrorMessage(null)
    setIsLoading(true)
    videoEl.load()
    const playPromise = videoEl.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          setIsLoading(false)
        })
        .catch(() => {
          // If still blocked, user can tap play overlay
          setIsPlaying(false)
        })
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
      isFollowing ? "Deixou de seguir" : `Você agora segue ${video.user.name}`,
    )
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress || 0)
    }
  }

  const handleLoadStart = () => {
    setIsLoading(true)
    setHasError(false)
  }

  const handleLoadedMetadata = () => {
    // Metadata loaded (duration, dimensions)
    setHasError(false)
  }

  const handleCanPlay = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleWaiting = () => {
    setIsLoading(true)
  }

  const handlePlaying = () => {
    setIsLoading(false)
    setIsPlaying(true)
    setHasError(false)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleError = () => {
    const videoEl = videoRef.current
    const mediaError = videoEl?.error
    let detail = "Não foi possível carregar o vídeo."
    if (mediaError) {
      switch (mediaError.code) {
        case mediaError.MEDIA_ERR_ABORTED:
          detail = "Carregamento interrompido pelo usuário."
          break
        case mediaError.MEDIA_ERR_NETWORK:
          detail = "Erro de rede ao baixar o vídeo."
          break
        case mediaError.MEDIA_ERR_DECODE:
          detail = "Erro ao decodificar formato do vídeo."
          break
        case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          detail =
            "Formato ou fonte de vídeo não suportada (verifique URL/CORS)."
          break
        default:
          detail = mediaError.message || detail
      }
    }
    console.error("[VideoCard] Erro de mídia:", {
      code: mediaError?.code,
      message: mediaError?.message,
      url: video.url,
    })
    setIsLoading(false)
    setIsPlaying(false)
    setHasError(true)
    setErrorMessage(detail)
  }

  const enrichedAiData = {
    ...mockAiAnalysis,
    score: Math.floor(Math.random() * (98 - 75) + 75),
    aiStats: [
      { label: "Velocidade", value: 28, max: 35, unit: "km/h" },
      { label: "Força", value: 850, max: 1000, unit: "N" },
      { label: "Técnica", value: 92, max: 100, unit: "pts" },
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
        src={video.url || undefined}
        poster={!isPlaying ? video.thumbnail || undefined : undefined}
        className="absolute inset-0 w-full h-full object-cover bg-black cursor-pointer"
        loop
        playsInline
        webkit-playsinline="true"
        preload={isActive ? "auto" : shouldPreload ? "metadata" : "none"}
        muted={isMuted}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadStart={handleLoadStart}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onError={handleError}
      />

      {/* Loading Overlay */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10 pointer-events-none gap-2">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <span className="text-white/80 text-xs font-medium drop-shadow-md">
            Carregando lance...
          </span>
        </div>
      )}

      {/* Error Overlay with Retry */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 p-6 text-center">
          <div className="p-3 bg-red-500/20 rounded-full border border-red-500/40 mb-3">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h4 className="text-white font-bold text-sm mb-1">
            Falha na reprodução
          </h4>
          <p className="text-white/70 text-xs mb-4 max-w-xs leading-relaxed">
            {errorMessage || "Não foi possível carregar o vídeo."}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetry}
            className="border-white/30 text-white hover:bg-white/10 gap-2 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

      {/* Play/Pause Center Icon Overlay */}
      {!isPlaying && !isLoading && !hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-300 border border-white/20 shadow-2xl">
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
          <p className="text-white/90 text-sm mb-3 line-clamp-2 drop-shadow-md leading-snug">
            {video.title}{" "}
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
            "w-10 h-10 rounded-full bg-black border-4 border-zinc-800 flex items-center justify-center",
            isPlaying ? "animate-[spin_5s_linear_infinite]" : "",
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
