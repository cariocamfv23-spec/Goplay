import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Hand,
  HeartHandshake,
  ExternalLink,
  AtSign,
  Music,
  Disc3,
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { CommentsSheet } from './CommentsSheet'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import useSoundStore from '@/stores/useSoundStore'
import { useLikeInteraction } from '@/hooks/useLikeInteraction'
import { PostDetailDialog } from '@/components/PostDetailDialog'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { DepthContainer } from '@/components/DepthContainer'
import { FeedVideoPlayer } from '@/components/FeedVideoPlayer'
import { NarrationConfig } from '@/lib/data'
import { useAuth } from '@/hooks/use-auth'
import { feedService } from '@/services/feed'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export interface SocialContext {
  type: 'like' | 'comment' | 'repost'
  user: {
    id: string
    name: string
    avatar?: string
  }
}

interface PostProps {
  post: {
    id: number | string
    type: string
    user: {
      id?: string
      name: string
      avatar: string
      type: string
      sport?: string | null
    }
    content: string
    media?: string[]
    image?: string
    title?: string
    hashtags?: string[]
    videoDuration?: string
    videoUrl?: string
    audioUrl?: string | null
    musicLink?: {
      platform: 'spotify' | 'youtube' | 'apple' | 'other'
      url: string
      title?: string
      artist?: string
    } | null
    mentions?: Array<{
      id: string
      name: string
      avatar?: string | null
      accountType?: string | null
      sport?: string | null
    }>
    articleTitle?: string
    articleDomain?: string
    likes: number
    comments: number
    shares?: number
    applauds?: number
    supports?: number
    cools?: number
    time: string
    narration?: NarrationConfig
    liked?: boolean
    socialContext?: SocialContext
  }
  onDeleted?: (postId: string | number) => void
}

export function PostCard({ post, onDeleted }: PostProps) {
  const { user: authUser } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isSupabasePost =
    typeof post.id === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      post.id,
    )

  const isOwner = authUser?.id && post.user?.id && authUser.id === post.user.id

  // Real or mock like state
  const [realLiked, setRealLiked] = useState<boolean>(post.liked ?? false)
  const [realLikeCount, setRealLikeCount] = useState<number>(post.likes || 0)

  // Keep state synced when props update (e.g. from Realtime feed channel)
  useEffect(() => {
    if (isSupabasePost) {
      if (post.liked !== undefined) {
        setRealLiked(post.liked)
      }
      setRealLikeCount(post.likes || 0)
    }
  }, [post.liked, post.likes, isSupabasePost])

  const {
    isLiked: mockIsLiked,
    likeCount: mockLikeCount,
    handleLike: handleMockLike,
  } = useLikeInteraction(post, post.likes, post.liked)

  const effectiveLiked = isSupabasePost ? realLiked : mockIsLiked
  const effectiveLikeCount = isSupabasePost ? realLikeCount : mockLikeCount

  const onLikeClick = async () => {
    if (isSupabasePost && authUser?.id) {
      const nextLiked = !realLiked
      setRealLiked(nextLiked)
      setRealLikeCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)))

      const { isLiked, error } = await feedService.toggleLike(
        post.id as string,
        authUser.id,
        realLiked,
      )
      if (error) {
        // Revert on error
        setRealLiked(!nextLiked)
        setRealLikeCount((prev) =>
          !nextLiked ? prev + 1 : Math.max(0, prev - 1),
        )
        toast.error('Erro ao curtir publicação.')
      }
    } else {
      handleMockLike()
    }
  }

  const handleDeletePost = async () => {
    if (!isSupabasePost || !authUser?.id) return
    if (!confirm('Deseja realmente excluir esta publicação?')) return

    setIsDeleting(true)
    const { error } = await feedService.deletePost(
      post.id as string,
      authUser.id,
    )
    setIsDeleting(false)

    if (error) {
      toast.error('Não foi possível excluir a publicação.')
      return
    }

    toast.success('Publicação excluída com sucesso.')
    if (onDeleted) onDeleted(post.id)
  }

  const [isCool, setIsCool] = useState(false)
  const [coolCount, setCoolCount] = useState(post.cools || 0)

  const { playSound } = useSoundStore()

  const handleCool = () => {
    setIsCool(!isCool)
    setCoolCount(isCool ? coolCount - 1 : coolCount + 1)
    if (!isCool) {
      playSound('like_generic' as any)
    }
  }

  const openDetail = () => {
    setShowDetail(true)
  }

  const handleImageError = () => {
    setImgError(true)
  }

  // Determine the primary image to display.
  // Prioritize `post.image` (if existing), then fall back to `post.media[0]`.
  // If an error occurred or neither exist, show a fallback placeholder.
  const primaryImage = imgError
    ? 'https://img.usecurling.com/p/800/400?q=sports%20generic&color=gray'
    : post.image || post.media?.[0]

  const renderSocialContext = () => {
    if (!post.socialContext) return null

    const { type, user } = post.socialContext

    // Icon mapping
    let icon = (
      <Heart className="w-3 h-3 text-muted-foreground fill-muted-foreground/30" />
    )
    let text = 'curtiu isso'

    if (type === 'comment') {
      icon = (
        <MessageCircle className="h-3 w-3 text-muted-foreground fill-muted-foreground/10" />
      )
      text = 'comentou nisso'
    } else if (type === 'repost') {
      icon = <Share2 className="h-3 w-3 text-muted-foreground" />
      text = 'compartilhou isso'
    }

    return (
      <div className="flex items-center gap-2 px-4 pt-3 pb-0 -mb-2">
        {icon}
        <span className="text-xs text-muted-foreground">
          <Link
            to={`/profile/${user.id}`}
            className="font-semibold hover:text-foreground hover:underline transition-colors"
          >
            {user.name}
          </Link>{' '}
          {text}
        </span>
      </div>
    )
  }

  const renderContent = () => {
    switch (post.type) {
      case 'video':
        if (post.videoUrl) {
          return (
            <div className="relative mb-3 rounded-xl overflow-hidden shadow-sm">
              <FeedVideoPlayer
                url={post.videoUrl}
                thumbnail={primaryImage}
                onClick={openDetail}
              />
              {/* Optional: Add badge if narration exists */}
              {post.narration && (
                <div className="absolute top-2 left-2 z-30 pointer-events-none">
                  <Badge className="bg-gold/90 text-black border-none shadow-md">
                    Narração AI
                  </Badge>
                </div>
              )}
            </div>
          )
        }
        // Fallback for video type without URL (legacy behavior)
        return (
          <DepthContainer
            className="relative rounded-xl overflow-hidden mb-3 group cursor-pointer"
            maxRotation={5}
          >
            <div onClick={openDetail} className="w-full h-full">
              <NostalgiaFilter />
              <img
                src={primaryImage}
                alt="Thumbnail"
                loading="lazy"
                onError={handleImageError}
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform shadow-xl translate-z-30">
                  <div
                    className="h-5 w-5 bg-white ml-1"
                    style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                  />
                </div>
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white font-medium translate-z-20">
                {post.videoDuration}
              </div>
            </div>
          </DepthContainer>
        )

      case 'carousel':
        return (
          <div className="mb-3">
            <Carousel className="w-full">
              <CarouselContent>
                {post.media?.map((url, index) => (
                  <CarouselItem key={index}>
                    <DepthContainer
                      className="aspect-square relative rounded-xl overflow-hidden bg-muted cursor-pointer"
                      maxRotation={3}
                    >
                      <div onClick={openDetail} className="w-full h-full">
                        <NostalgiaFilter />
                        <img
                          src={url}
                          alt={`Slide ${index}`}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </DepthContainer>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </div>
            </Carousel>
          </div>
        )
      case 'article':
        return (
          <DepthContainer
            className="mb-3 border border-border rounded-xl overflow-hidden bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer"
            maxRotation={2}
          >
            <div onClick={openDetail} className="w-full h-full">
              <div className="aspect-[2/1] relative overflow-hidden">
                <NostalgiaFilter />
                <img
                  src={primaryImage}
                  alt="Article"
                  loading="lazy"
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 translate-z-10">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                  {post.articleDomain} <ExternalLink className="h-3 w-3" />
                </div>
                <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                  {post.articleTitle}
                </h4>
              </div>
            </div>
          </DepthContainer>
        )
      default:
        // Handle generic post (image or text only)
        // If we have a valid image (either from 'image' prop or 'media' array)
        if (primaryImage) {
          return (
            <DepthContainer
              className="relative rounded-xl overflow-hidden mb-3 cursor-pointer"
              maxRotation={3}
            >
              <div onClick={openDetail} className="w-full h-full">
                <NostalgiaFilter />
                <img
                  src={primaryImage}
                  alt="Post"
                  loading="lazy"
                  onError={handleImageError}
                  className="w-full h-auto object-cover max-h-[500px] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </DepthContainer>
          )
        }
        return null
    }
  }

  return (
    <>
      <Card className="border-none shadow-sm rounded-2xl overflow-visible bg-card mb-4 animate-fade-in hover:shadow-md transition-shadow duration-300">
        {renderSocialContext()}
        <CardHeader className="flex flex-row items-center p-4 pb-2 space-y-0 gap-3">
          <Link to={`/profile/${post.user.id || 'me'}`}>
            <Avatar className="h-10 w-10 border border-border cursor-pointer hover:border-primary transition-colors depth-element-hover">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 cursor-pointer">
            <Link to={`/profile/${post.user.id || 'me'}`}>
              <h3 className="text-sm font-semibold hover:text-primary transition-colors">
                {post.user.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1">
              <Badge
                variant="secondary"
                className="h-4 px-1 text-[10px] rounded-sm font-normal text-muted-foreground bg-secondary/50"
              >
                {post.user.type}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                • {post.time}
              </span>
            </div>
          </div>
          {isOwner && isSupabasePost && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
              title="Excluir minha publicação"
              onClick={handleDeletePost}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {(!isOwner || !isSupabasePost) && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:bg-secondary/80 rounded-full"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-4 pt-1">
          {post.content && (
            <p className="text-sm mb-3 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          )}

          {/* Mentions / Tags Bar (Instagram-like pills) */}
          {post.mentions && post.mentions.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                <AtSign className="w-3 h-3 text-primary" />
                com
              </span>
              {post.mentions.map((mention) => (
                <Link
                  key={mention.id}
                  to={`/profile/${mention.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Avatar className="w-3.5 h-3.5 border border-primary/30">
                    <AvatarImage
                      src={
                        mention.avatar ||
                        `https://img.usecurling.com/ppl/thumbnail?seed=${mention.id.slice(0, 4)}`
                      }
                    />
                    <AvatarFallback className="text-[8px]">
                      {mention.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <span>@{mention.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Audio Player (attached native sound/music track) */}
          {post.audioUrl && (
            <div className="mb-3 p-3 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/40 to-background shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Disc3 className="w-4 h-4 text-primary animate-[spin_8s_linear_infinite]" />
                  Áudio / Trilha Sonora
                </span>
                <Badge
                  variant="outline"
                  className="text-[9px] uppercase px-1.5 py-0 border-primary/30 text-primary"
                >
                  Mídia Anexada
                </Badge>
              </div>
              <audio
                src={post.audioUrl}
                controls
                preload="metadata"
                className="w-full h-9 rounded-lg"
              />
            </div>
          )}

          {/* External Music Link Player Card (Spotify, YouTube, Apple Music) */}
          {post.musicLink && (
            <div className="mb-3 p-3 rounded-xl border border-border/80 bg-secondary/30 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Music className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {post.musicLink.title || 'Música Compartilhada'}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-[9px] px-1 py-0 uppercase font-medium bg-secondary text-muted-foreground shrink-0"
                      >
                        {post.musicLink.platform}
                      </Badge>
                    </div>
                    {post.musicLink.artist ? (
                      <p className="text-[11px] text-muted-foreground truncate">
                        {post.musicLink.artist}
                      </p>
                    ) : (
                      <p className="text-[10px] text-muted-foreground truncate">
                        {post.musicLink.url}
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href={post.musicLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-primary hover:bg-primary/90 text-white shrink-0 shadow-xs"
                >
                  <span>Ouvir</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {renderContent()}

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              {/* Like (Curtir) */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'flex flex-col items-center gap-0 h-auto py-1 px-2 transition-colors active:scale-90',
                  effectiveLiked
                    ? 'text-red-500'
                    : 'text-muted-foreground hover:text-red-400',
                )}
                onClick={onLikeClick}
              >
                <Heart
                  className={cn(
                    'h-5 w-5 transition-all',
                    effectiveLiked ? 'fill-current scale-110' : '',
                  )}
                />
                <span className="text-[10px] font-medium">
                  {effectiveLikeCount}
                </span>
              </Button>

              {/* Applaud (Aplaudir) */}
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-0 h-auto py-1 px-2 text-muted-foreground hover:text-gold active:scale-90"
              >
                <Hand className="h-5 w-5" />
                <span className="text-[10px] font-medium">{post.applauds}</span>
              </Button>

              {/* Cool (🤙) - New Reaction */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'flex flex-col items-center gap-0 h-auto py-1 px-2 transition-colors active:scale-90',
                  isCool
                    ? 'text-orange-500'
                    : 'text-muted-foreground hover:text-orange-400',
                )}
                onClick={handleCool}
              >
                <span className="text-lg leading-none mb-0.5">🤙</span>
                <span className="text-[10px] font-medium">{coolCount}</span>
              </Button>

              {/* Support (Apoiar) */}
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-0 h-auto py-1 px-2 text-muted-foreground hover:text-primary active:scale-90"
              >
                <HeartHandshake className="h-5 w-5" />
                <span className="text-[10px] font-medium">{post.supports}</span>
              </Button>

              {/* Comment (Comentar) */}
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-0 h-auto py-1 px-2 text-muted-foreground hover:text-blue-500 active:scale-90"
                onClick={() => setShowComments(true)}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-[10px] font-medium">{post.comments}</span>
              </Button>
            </div>

            {/* Share */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary active:scale-90 rounded-full"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <CommentsSheet
        open={showComments}
        onOpenChange={setShowComments}
        postId={post.id}
      />
      <PostDetailDialog
        post={post}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  )
}
