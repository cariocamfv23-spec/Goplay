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
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import useSoundStore from '@/stores/useSoundStore'
import { useLikeInteraction } from '@/hooks/useLikeInteraction'
import { PostDetailDialog } from '@/components/PostDetailDialog'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { DepthContainer } from '@/components/DepthContainer'
import { FeedVideoPlayer } from '@/components/FeedVideoPlayer'
import { NarrationConfig } from '@/lib/data'

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
    id: number
    type: string
    user: { id?: string; name: string; avatar: string; type: string }
    content: string
    media?: string[]
    image?: string
    title?: string
    hashtags?: string[]
    videoDuration?: string
    videoUrl?: string
    articleTitle?: string
    articleDomain?: string
    likes: number
    comments: number
    shares: number
    applauds: number
    supports: number
    cools?: number
    time: string
    narration?: NarrationConfig
    liked?: boolean
    socialContext?: SocialContext
  }
}

export function PostCard({ post }: PostProps) {
  const [showComments, setShowComments] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [imgError, setImgError] = useState(false)

  const { isLiked, likeCount, handleLike } = useLikeInteraction(
    post,
    post.likes,
    post.liked,
  )

  const [isCool, setIsCool] = useState(false)
  const [coolCount, setCoolCount] = useState(post.cools || 0)

  const { playSound } = useSoundStore()

  const handleCool = () => {
    setIsCool(!isCool)
    setCoolCount(isCool ? coolCount - 1 : coolCount + 1)
    if (!isCool) {
      // @ts-expect-error - Sound category
      playSound('like_generic')
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
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:bg-secondary/80 rounded-full"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-4 pt-1">
          {post.content && (
            <p className="text-sm mb-3 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
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
                  isLiked
                    ? 'text-red-500'
                    : 'text-muted-foreground hover:text-red-400',
                )}
                onClick={handleLike}
              >
                <Heart
                  className={cn(
                    'h-5 w-5 transition-all',
                    isLiked ? 'fill-current scale-110' : '',
                  )}
                />
                <span className="text-[10px] font-medium">{likeCount}</span>
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

      <CommentsSheet open={showComments} onOpenChange={setShowComments} />
      <PostDetailDialog
        post={post}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  )
}
