import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Hand,
  Play,
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

interface PostProps {
  post: {
    id: number
    type: string
    user: { id?: string; name: string; avatar: string; type: string }
    content: string
    media?: string[]
    title?: string
    hashtags?: string[]
    videoDuration?: string
    articleTitle?: string
    articleDomain?: string
    likes: number
    comments: number
    shares: number
    applauds: number
    supports: number
    time: string
  }
}

export function PostCard({ post }: PostProps) {
  const [showComments, setShowComments] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const renderContent = () => {
    switch (post.type) {
      case 'video':
        return (
          <div className="relative rounded-xl overflow-hidden mb-3 group transform transition-all duration-300 hover:shadow-md">
            <img
              src={post.media?.[0]}
              alt="Thumbnail"
              loading="lazy"
              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                <Play className="h-5 w-5 text-white fill-white ml-1" />
              </div>
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white font-medium">
              {post.videoDuration}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h4 className="text-white font-bold text-lg leading-tight mb-1">
                {post.title}
              </h4>
              <div className="flex gap-2">
                {post.hashtags?.map((tag) => (
                  <span key={tag} className="text-white/80 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Button className="absolute bottom-4 right-4 h-8 rounded-full px-4 text-xs bg-primary text-white border border-white/20 hover:bg-primary/90 shadow-lg">
              MOVE
            </Button>
          </div>
        )
      case 'carousel':
        return (
          <div className="mb-3">
            <Carousel className="w-full">
              <CarouselContent>
                {post.media?.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative rounded-xl overflow-hidden bg-muted">
                      <img
                        src={url}
                        alt={`Slide ${index}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
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
          <div className="mb-3 border border-border rounded-xl overflow-hidden bg-secondary/20 hover:bg-secondary/30 transition-colors">
            <div className="aspect-[2/1] relative overflow-hidden">
              <img
                src={post.media?.[0]}
                alt="Article"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                {post.articleDomain} <ExternalLink className="h-3 w-3" />
              </div>
              <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                {post.articleTitle}
              </h4>
            </div>
          </div>
        )
      default:
        return post.media && post.media.length > 0 ? (
          <div className="rounded-xl overflow-hidden mb-3">
            <img
              src={post.media[0]}
              alt="Post"
              loading="lazy"
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        ) : null
    }
  }

  return (
    <>
      <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-card mb-4 animate-fade-in hover:shadow-md transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center p-4 pb-2 space-y-0 gap-3">
          <Link to={`/profile/${post.user.id || 'me'}`}>
            <Avatar className="h-10 w-10 border border-border cursor-pointer hover:border-primary transition-colors">
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
    </>
  )
}
