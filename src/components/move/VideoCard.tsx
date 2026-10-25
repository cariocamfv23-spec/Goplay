import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
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
import { useAuth } from "@/hooks/use-auth"
import { feedService } from "@/services/feed"
import { connectionService } from "@/services/connections"
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
  isLiked?: boolean
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
  onLikeChange?: (videoId: string, isLiked: boolean, likesCount: number) => void
  onCommentsCountChange?: (videoId: string, commentsCount: number) => void
}

export function VideoCard({
  video,
  isActive,
  shouldPreload = false,
  onLikeChange,
  onCommentsCountChange,
}: VideoCardProps) {
  const navigate = useNavigate()
  const { user: authUser } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAudioTrack, setHasAudioTrack] = useState<boolean | null>(null)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing)

  const isSupabaseVideo =
    typeof video.id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      video.id,
    )

  // Estados locais para curtida e contagem de comentários reais
  const [realLiked, setRealLiked] = useState<boolean>(Boolean(video.isLiked))
  const [realLikesCount, setRealLikesCount] = useState<number>(video.likes || 0)
  const [commentsCount, setCommentsCount] = useState<number>(
    video.comments || 0,
  )

  // Sincroniza com as propriedades recebidas quando o post mudar
  useEffect(() => {
    setRealLiked(Boolean(video.isLiked))
    setRealLikesCount(video.likes || 0)
    setCommentsCount(video.comments || 0)
    setIsFollowing(video.user.isFollowing)
  }, [
    video.id,
    video.isLiked,
    video.likes,
    video.comments,
    video.user.isFollowing,
  ])

  const {
    isLiked: mockIsLiked,
    likeCount: mockLikeCount,
    handleLike: handleMockLike,
  } = useLikeInteraction(
    { content: video.title, hashtags: [video.modality] },
    video.likes,
    Boolean(video.isLiked),
  )

  const effectiveLiked = isSupabaseVideo ? realLiked : mockIsLiked
  const effectiveLikeCount = isSupabaseVideo ? realLikesCount : mockLikeCount

  const handleLikeClick = async () => {
    if (isSupabaseVideo && authUser?.id) {
      // Efeito sonoro temático do esporte no like
      handleMockLike()

      const previousLiked = realLiked
      const previousCount = realLikesCount
      const nextLiked = !previousLiked
      const nextCount = nextLiked
        ? previousCount + 1
        : Math.max(0, previousCount - 1)

      // Atualização otimista imediata
      setRealLiked(nextLiked)
      setRealLikesCount(nextCount)
      if (onLikeChange) {
        onLikeChange(video.id, nextLiked, nextCount)
      }

      const { isLiked: confirmedLiked, error } = await feedService.toggleLike(
        video.id,
        authUser.id,
        previousLiked,
      )

      if (error) {
        // Reversão em caso de erro
        setRealLiked(previousLiked)
        setRealLikesCount(previousCount)
        if (onLikeChange) {
          onLikeChange(video.id, previousLiked, previousCount)
        }
        toast.error("Não foi possível registrar a curtida.")
      } else {
        // Sincroniza com retorno se necessário
        if (confirmedLiked !== nextLiked) {
          setRealLiked(confirmedLiked)
          const adjustedCount = confirmedLiked
            ? previousCount + 1
            : Math.max(0, previousCount - 1)
          setRealLikesCount(adjustedCount)
          if (onLikeChange) {
            onLikeChange(video.id, confirmedLiked, adjustedCount)
          }
        }
      }
    } else if (isSupabaseVideo && !authUser?.id) {
      toast.info("Faça login para curtir os lances no GoPlay.")
    } else {
      handleMockLike()
    }
  }

  const handleOpenAuthorProfile = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    const authorId = video.user.id
    if (!authorId) return

    // Se for o próprio usuário autenticado, abre /profile/me
    if (authUser?.id && authorId === authUser.id) {
      navigate("/profile/me")
      return
    }

    navigate(`/profile/${authorId}`)
  }

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
      // Regra TikTok: ao focar em um novo card, volta para mudo por padrão para garantir autoplay suave
      setIsMuted(true)
      videoEl.muted = true

      const attemptPlay = () => {
        videoEl.muted = true
        const playPromise = videoEl.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              setIsLoading(false)
            })
            .catch((error: any) => {
              if (error?.name !== "AbortError") {
                console.warn(
                  "[VideoCard] Erro ao reproduzir no autoplay:",
                  error,
                )
                setIsPlaying(false)
              }
            })
        }
      }

      attemptPlay()
    } else {
      videoEl.pause()
      setIsPlaying(false)
      // Ao sair de foco, garante que o elemento volte ao estado mudo e reposicione para início suave
      videoEl.muted = true
      setIsMuted(true)
      if (!Number.isNaN(videoEl.currentTime)) {
        videoEl.currentTime = 0
      }
    }
  }, [isActive, video.url])

  // Sync mute state directly com o elemento de vídeo
  useEffect(() => {
    const videoEl = videoRef.current
    if (videoEl && videoEl.muted !== isMuted) {
      videoEl.muted = isMuted
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

  const toggleMute = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isMuted) {
      // Usuário quer ativar o som
      try {
        videoEl.muted = false
        // Se estiver pausado ou precisando retomar com som
        const playPromise = videoEl.play()
        if (playPromise !== undefined) {
          await playPromise
        }
        // Confirma estado real do elemento
        const realMuted = videoEl.muted
        setIsMuted(realMuted)
        setIsPlaying(!videoEl.paused)
        if (!realMuted) {
          toast.info("Áudio ativado", { duration: 1500 })
        }
      } catch (err: any) {
        console.warn("[VideoCard] Navegador bloqueou reprodução com som:", err)
        // Reverte para mudo de forma segura sem travar o vídeo
        videoEl.muted = true
        setIsMuted(true)
        videoEl.play().catch(() => {})
        toast.error("Toque no vídeo para permitir áudio no navegador", {
          duration: 2500,
        })
      }
    } else {
      // Usuário quer silenciar
      videoEl.muted = true
      setIsMuted(true)
      toast.info("Áudio silenciado", { duration: 1200 })
    }
  }

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!authUser?.id) {
      toast.info("Faça login para seguir atletas.")
      return
    }
    if (video.user.id === authUser.id) {
      return
    }

    const previousState = isFollowing
    const nextState = !previousState
    setIsFollowing(nextState)

    try {
      if (nextState) {
        await connectionService.follow(authUser.id, video.user.id)
        toast.success(`Você agora segue ${video.user.name}`)
      } else {
        await connectionService.unfollow(authUser.id, video.user.id)
        toast.success(`Deixou de seguir ${video.user.name}`)
      }
    } catch {
      setIsFollowing(previousState)
      toast.error("Erro ao atualizar seguidor.")
    }
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
    const videoEl = videoRef.current
    if (videoEl) {
      // Sincroniza estado inicial real do vídeo
      setIsMuted(videoEl.muted)

      // Inspeciona se o elemento expõe trilhas de áudio (se suportado pelo navegador)
      const audioTracks = (videoEl as any).audioTracks
      const mozHasAudio = (videoEl as any).mozHasAudio
      const webkitAudioDecodedByteCount = (videoEl as any)
        .webkitAudioDecodedByteCount

      if (audioTracks && typeof audioTracks.length === "number") {
        setHasAudioTrack(audioTracks.length > 0)
      } else if (typeof mozHasAudio === "boolean") {
        setHasAudioTrack(mozHasAudio)
      } else if (typeof webkitAudioDecodedByteCount === "number") {
        setHasAudioTrack(webkitAudioDecodedByteCount > 0)
      }
    }
  }

  const handleVolumeChange = () => {
    if (videoRef.current) {
      setIsMuted(videoRef.current.muted)
    }
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
        onVolumeChange={handleVolumeChange}
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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-300 border border-white/20 shadow-2xl">
            <Play className="h-12 w-12 text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Floating Audio Button (TikTok Style) - Top Right */}
      {!hasError && (
        <div className="absolute top-20 right-4 z-30 animate-in fade-in duration-200">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className={cn(
              "h-10 w-10 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 border",
              isMuted
                ? "bg-black/50 hover:bg-black/70 text-white/90 border-white/20"
                : "bg-primary text-white hover:bg-primary/90 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.6)] scale-105",
            )}
            title={isMuted ? "Ativar áudio" : "Silenciar áudio"}
            aria-label={
              isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"
            }
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 drop-shadow-md" />
            ) : (
              <Volume2 className="h-5 w-5 drop-shadow-md animate-pulse" />
            )}
          </Button>
        </div>
      )}

      {/* Side Actions (Right) */}
      <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6 z-20 pb-4">
        {/* Profile Avatar */}
        <div className="relative mb-2">
          <Avatar
            onClick={handleOpenAuthorProfile}
            className="h-12 w-12 border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-110"
            title={`Ver perfil de ${video.user.name}`}
          >
            <AvatarImage src={video.user.avatar} alt={video.user.name} />
            <AvatarFallback>{video.user.name[0]}</AvatarFallback>
          </Avatar>
          {!isFollowing && (!authUser?.id || video.user.id !== authUser.id) && (
            <button
              onClick={handleFollow}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white rounded-full p-0.5 shadow-md hover:bg-primary/90 transition-colors"
              title={`Seguir ${video.user.name}`}
            >
              <Plus className="h-3 w-3" />
            </button>
          )}
        </div>

        <SportsReactionButton
          modality={video.modality}
          isLiked={effectiveLiked}
          likesCount={effectiveLikeCount}
          onLike={handleLikeClick}
        />

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-transparent hover:bg-transparent text-white"
            onClick={() => setShowComments(true)}
            title="Ver comentários"
          >
            <MessageCircle className="h-8 w-8 drop-shadow-md" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {commentsCount}
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
          <button
            type="button"
            onClick={handleOpenAuthorProfile}
            className="text-left group flex items-center gap-1.5"
          >
            <h3 className="text-white font-bold text-base shadow-black drop-shadow-md mb-1 group-hover:text-primary transition-colors cursor-pointer">
              {video.user.name}
            </h3>
          </button>
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

            {/* Mute Button (Bottom Pill) */}
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8 rounded-full backdrop-blur-md border transition-colors",
                isMuted
                  ? "bg-white/20 hover:bg-white/30 text-white border-white/10"
                  : "bg-primary text-white hover:bg-primary/90 border-primary/40",
              )}
              onClick={toggleMute}
              title={isMuted ? "Ativar áudio" : "Silenciar áudio"}
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
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
        onCommentCountChange={(count) => {
          setCommentsCount(count)
          if (onCommentsCountChange) {
            onCommentsCountChange(video.id, count)
          }
        }}
      />

      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        videoTitle={video.title}
      />
    </div>
  )
}
