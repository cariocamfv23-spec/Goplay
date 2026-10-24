import { useState, useRef, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { tribes } from "@/lib/data"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Zap,
  Map as MapIcon,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { VideoCard, VideoData } from "@/components/move/VideoCard"
import { Button } from "@/components/ui/button"
import { feedService, PostItem } from "@/services/feed"
import { moderationService } from "@/services/moderation"
import { connectionService } from "@/services/connections"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase/client"

/**
 * Maps a real PostItem from Supabase to VideoData expected by VideoCard.
 * Generates an appropriate sports thumbnail if the post does not provide one.
 */
function postItemToVideoData(
  post: PostItem,
  followedUserIds: Set<string>,
): VideoData {
  // Infer sport/modality from author sport or content
  const authorSport = post.user.sport?.toLowerCase() || ""
  let modality = "futebol"

  if (authorSport.includes("basquete") || authorSport.includes("basket")) {
    modality = "basketball"
  } else if (authorSport.includes("surf")) {
    modality = "surf"
  } else if (authorSport.includes("skate")) {
    modality = "skate"
  } else if (
    authorSport.includes("crossfit") ||
    authorSport.includes("musculacao")
  ) {
    modality = "crossfit"
  } else if (
    authorSport.includes("volei") ||
    authorSport.includes("volleyball")
  ) {
    modality = "volleyball"
  } else if (authorSport.includes("futsal")) {
    modality = "futsal"
  } else if (authorSport.includes("bike") || authorSport.includes("ciclismo")) {
    modality = "bike"
  } else if (authorSport.includes("tenis") || authorSport.includes("tennis")) {
    modality = "tennis"
  } else if (
    authorSport.includes("corrida") ||
    authorSport.includes("running")
  ) {
    modality = "running"
  } else if (
    authorSport.includes("natacao") ||
    authorSport.includes("swimming")
  ) {
    modality = "swimming"
  } else if (
    authorSport.includes("boxe") ||
    authorSport.includes("luta") ||
    authorSport.includes("judo")
  ) {
    modality = "boxing"
  }

  // Determine thumbnail
  const imageMedia = post.media?.find((m) =>
    /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(m),
  )
  const thumbnail =
    imageMedia ||
    `https://img.usecurling.com/p/720/1280?q=sports%20${modality}&color=black&dpr=2`

  const videoUrl = post.videoUrl || (post.media && post.media[0]) || ""

  return {
    id: post.id,
    url: videoUrl,
    thumbnail,
    title: post.content
      ? post.content.slice(0, 80)
      : "Lance esportivo no GoPlay",
    description: post.content && post.content.length > 80 ? post.content : "",
    likes: post.likesCount,
    comments: post.commentsCount,
    shares: 0,
    user: {
      id: post.user.id,
      name: post.user.name,
      avatar: post.user.avatar,
      isFollowing: followedUserIds.has(post.user.id),
    },
    music: post.musicLink
      ? {
          title: post.musicLink.title || "Trilha",
          artist: post.musicLink.artist || "GoPlay",
        }
      : null,
    modality,
  }
}

export default function Move() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()

  // Logic to determine initial tribe based on User Profile
  const getInitialTribe = () => {
    if (!profile?.sport) return "all"
    const userSportId = profile.sport
      .toLowerCase()
      .replace("ê", "e")
      .replace("ç", "c")
      .replace("ã", "a")
      .trim()

    const tribeExists = tribes.some((t) => t.id === userSportId)
    return tribeExists ? userSportId : "all"
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTribe, setActiveTribe] = useState<string>(() =>
    getInitialTribe(),
  )
  const [feedType, setFeedType] = useState<"foryou" | "following">("foryou")

  const [videos, setVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const followedSetRef = useRef<Set<string>>(new Set())

  // Carrega lista de usuários seguidos pelo viewer atual
  const loadFollowedUsers = useCallback(async () => {
    if (!user?.id) {
      followedSetRef.current = new Set()
      return new Set<string>()
    }
    try {
      const followingList = await connectionService.getFollowing(user.id)
      const followedSet = new Set(followingList.map((f) => f.id))
      followedSetRef.current = followedSet
      return followedSet
    } catch {
      return new Set<string>()
    }
  }, [user?.id])

  // Ref para rastrear quantidade atual de vídeos para evitar re-criação desnecessária de fetchVideos
  const videosLengthRef = useRef(0)
  videosLengthRef.current = videos.length

  // Busca publicações com vídeo reais do Supabase
  const fetchVideos = useCallback(
    async (isLoadMore = false) => {
      try {
        if (!isLoadMore) {
          setLoading(true)
          setError(null)
        } else {
          setLoadingMore(true)
        }

        const [followedSet, blockedSet] = await Promise.all([
          loadFollowedUsers(),
          user?.id
            ? moderationService.getBlockedUserIds(user.id)
            : Promise.resolve(new Set<string>()),
        ])

        const currentOffset = isLoadMore ? videosLengthRef.current : 0
        const sportParam = activeTribe === "all" ? null : activeTribe

        const res = await feedService.getVideoPosts({
          currentUserId: user?.id || null,
          sport: sportParam,
          followingOnly: feedType === "following",
          limit: 10,
          offset: currentOffset,
          blockedUserIds: blockedSet,
        })

        if (res.error) {
          throw res.error
        }

        const mappedVideos = (res.data || []).map((p) =>
          postItemToVideoData(p, followedSet),
        )

        setHasMore(res.hasMore)
        if (isLoadMore) {
          setVideos((prev) => {
            const existingIds = new Set(prev.map((v) => v.id))
            const newOnes = mappedVideos.filter((v) => !existingIds.has(v.id))
            return [...prev, ...newOnes]
          })
        } else {
          setVideos(mappedVideos)
          setActiveIndex(0)
          if (containerRef.current) {
            containerRef.current.scrollTop = 0
          }
        }
      } catch (err: any) {
        console.error("[Move] Erro ao carregar vídeos:", err)
        setError(
          err?.message ||
            "Não foi possível carregar os vídeos do MOVE. Verifique sua conexão.",
        )
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [user?.id, activeTribe, feedType, loadFollowedUsers],
  )

  // Dispara busca inicial e ao alternar filtro de esporte ou modo Para Você/Seguindo
  useEffect(() => {
    fetchVideos(false)
  }, [fetchVideos])

  // Escuta novos posts de vídeo em tempo real (Supabase Realtime) para refletir no feed
  useEffect(() => {
    const channel = supabase
      .channel("public:posts:move_feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => {
          const newPost = payload.new as any
          if (
            !newPost ||
            (!newPost.video_url && newPost.post_type !== "video")
          ) {
            return
          }
          // Recarrega lista sutilmente para incluir o novo vídeo publicado
          fetchVideos(false)
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        (payload) => {
          const oldPost = payload.old as any
          if (oldPost?.id) {
            setVideos((prev) => prev.filter((v) => v.id !== oldPost.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchVideos])

  // Tratamento da rolagem vertical para identificar o vídeo ativo e carregar mais vídeos
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    if (index !== activeIndex) {
      setActiveIndex(index)
    }

    // Paginação: se o usuário estiver próximo ao fim e houver mais itens
    const isNearBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - container.clientHeight * 1.5

    if (isNearBottom && hasMore && !loading && !loadingMore) {
      fetchVideos(true)
    }
  }

  const handleTribeChange = (tribeId: string) => {
    setActiveTribe(tribeId)
    setFeedType("foryou")
    setActiveIndex(0)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  const handleFeedTypeChange = (type: "foryou" | "following") => {
    setFeedType(type)
    setActiveIndex(0)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  return (
    <div className="h-full w-full bg-black relative">
      {/* Header / Tribes Filter Bar */}
      <div className="absolute top-4 left-0 right-0 z-30 flex flex-col items-center">
        {/* Feed Type Toggles */}
        <div className="flex items-center justify-between w-full px-4 mb-3">
          <div className="w-24"></div> {/* Spacer for centering */}
          <div className="flex items-center gap-4 text-white text-sm font-bold shadow-black drop-shadow-md">
            <button
              onClick={() => handleFeedTypeChange("following")}
              className={cn(
                "transition-all duration-300",
                feedType === "following"
                  ? "opacity-100 border-b-2 border-white pb-0.5 scale-105"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              Seguindo
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => handleFeedTypeChange("foryou")}
              className={cn(
                "transition-all duration-300",
                feedType === "foryou"
                  ? "opacity-100 border-b-2 border-white pb-0.5 scale-105"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              Para Você
            </button>
          </div>
          {/* Kids Map Integration */}
          <Button
            size="sm"
            onClick={() => navigate("/move/kids-map")}
            className="w-auto h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 border border-white/20 hover:opacity-90 text-white shadow-lg text-[10px] font-bold px-3 gap-1.5"
            title="Mapeamento para recreação de crianças"
          >
            <MapIcon className="h-3 w-3" />
            Mapa Kids
          </Button>
        </div>

        {/* Tribes Scroll - Only visible in For You mode */}
        <div
          className={cn(
            "w-full transition-all duration-300 overflow-hidden",
            feedType === "following"
              ? "max-h-0 opacity-0"
              : "max-h-16 opacity-100",
          )}
        >
          <ScrollArea className="w-full whitespace-nowrap px-4 mask-gradient">
            <div className="flex w-max space-x-3 px-4 pb-2">
              {tribes.map((tribe) => (
                <button
                  key={tribe.id}
                  onClick={() => handleTribeChange(tribe.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 backdrop-blur-md border border-transparent",
                    activeTribe === tribe.id
                      ? "bg-primary text-white border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.4)]"
                      : "bg-black/30 text-white hover:bg-black/50 border-white/10",
                  )}
                >
                  {"image" in tribe && tribe.image ? (
                    <img
                      src={tribe.image as string}
                      alt={tribe.label}
                      className="h-3 w-3 object-contain"
                    />
                  ) : (
                    <tribe.icon
                      className={cn(
                        "h-3 w-3",
                        activeTribe === tribe.id ? "fill-current" : "",
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
      </div>

      {/* Video Feed Container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="h-full w-full flex flex-col items-center justify-center text-white bg-zinc-950 gap-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-xs text-zinc-400">
              Carregando vídeos do MOVE...
            </p>
          </div>
        ) : error ? (
          <div className="h-full w-full flex flex-col items-center justify-center text-white p-6 text-center bg-zinc-950">
            <div className="bg-red-500/10 p-4 rounded-full mb-4 border border-red-500/20">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Erro ao carregar</h3>
            <p className="text-zinc-400 text-sm max-w-xs mx-auto mb-6">
              {error}
            </p>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 gap-2"
              onClick={() => fetchVideos(false)}
            >
              <RefreshCw className="h-4 w-4" />
              Tentar novamente
            </Button>
          </div>
        ) : videos.length > 0 ? (
          <>
            {videos.map((video, index) => (
              <div key={video.id} className="h-full w-full snap-start">
                <VideoCard
                  video={video}
                  isActive={index === activeIndex}
                  shouldPreload={index === activeIndex + 1}
                />
              </div>
            ))}
            {loadingMore && (
              <div className="h-20 w-full flex items-center justify-center text-white bg-zinc-950">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-white p-6 text-center bg-zinc-950">
            <div className="bg-zinc-900 p-6 rounded-full mb-6">
              <Zap className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {feedType === "following"
                ? "Nenhum vídeo novo"
                : "Sem vídeos no momento"}
            </h3>
            <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed">
              {feedType === "following"
                ? "Siga atletas e perfis esportivos que publicam vídeos para ver os lances deles aqui."
                : activeTribe !== "all"
                  ? `Nenhum vídeo encontrado para a modalidade selecionada. Tente outro esporte ou veja todos os lances!`
                  : "Ainda não existem vídeos publicados no GoPlay. Seja o primeiro a publicar um lance no feed!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              {feedType === "following" ? (
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8"
                  onClick={() => handleFeedTypeChange("foryou")}
                >
                  Explorar Para Você
                </Button>
              ) : activeTribe !== "all" ? (
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8"
                  onClick={() => handleTribeChange("all")}
                >
                  Ver todos os esportes
                </Button>
              ) : null}
              <Button
                className="bg-primary text-white hover:bg-primary/90 px-6 font-semibold"
                onClick={() => navigate("/feed")}
              >
                Ir para o Feed
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
