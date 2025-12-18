import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Play,
  Volume2,
  VolumeX,
  X,
  Mic,
} from 'lucide-react'
import { useLikeInteraction } from '@/hooks/useLikeInteraction'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { mockComments } from '@/lib/data'
import { SoundWaveVisualizer } from '@/components/SoundWaveVisualizer'
import useSoundStore from '@/stores/useSoundStore'

interface PostDetailDialogProps {
  post: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostDetailDialog({
  post,
  open,
  onOpenChange,
}: PostDetailDialogProps) {
  // Hooks must be called unconditionally.
  // We use fallback values when post is null/undefined to satisfy hooks requirements.
  const safePost = post || {}

  const { isLiked, likeCount, handleLike, setIsLiked, setLikeCount } =
    useLikeInteraction(safePost, safePost.likes || 0, safePost.liked || false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const { playNarration } = useSoundStore()
  const [isPlayingNarration, setIsPlayingNarration] = useState(false)

  // Sync state when post data changes (e.g. going from null to populated)
  useEffect(() => {
    if (post) {
      setIsLiked(post.liked || false)
      setLikeCount(post.likes || 0)
    }
  }, [post, setIsLiked, setLikeCount])

  // Auto-play sound/narration on open if applicable
  useEffect(() => {
    if (open && post) {
      if (post.type === 'video') {
        setIsPlaying(true)
      }
      // Optional: Play a subtle open sound effect here
    } else {
      setIsPlaying(false)
      setIsPlayingNarration(false)
    }
  }, [open, post])

  // Early return if no post (now safe as hooks are called above)
  if (!post) return null

  const toggleNarration = () => {
    if (post.narration) {
      if (!isPlayingNarration) {
        playNarration(post.narration)
        setIsPlayingNarration(true)
        setTimeout(() => setIsPlayingNarration(false), 3000)
      } else {
        setIsPlayingNarration(false)
      }
    }
  }

  const togglePlayback = () => setIsPlaying(!isPlaying)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden bg-background border-zinc-800 h-[90vh] md:h-[600px] flex flex-col md:flex-row">
        <DialogTitle className="sr-only">Detalhes do Post</DialogTitle>
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:hidden">
          <X className="h-4 w-4" />
        </DialogClose>

        {/* Media Section */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden min-h-[40vh]">
          {post.type === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center group">
              <img
                src={post.media?.[0]}
                alt="Video content"
                className={cn(
                  'w-full h-full object-contain transition-opacity duration-300',
                  isPlaying ? 'opacity-100' : 'opacity-60',
                )}
              />
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity',
                  isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100',
                )}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:scale-110 transition-transform"
                  onClick={togglePlayback}
                >
                  <Play
                    className={cn(
                      'h-8 w-8 text-white fill-white ml-1',
                      isPlaying && 'opacity-0',
                    )}
                  />
                </Button>
              </div>

              {/* Fake Progress Bar */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-primary animate-[progress_15s_linear_infinite]" />
                </div>
              )}

              {/* Sound Control */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 right-4 text-white hover:bg-white/10 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          ) : (
            <img
              src={post.media?.[0]}
              alt="Post content"
              className="w-full h-full object-contain"
            />
          )}

          {post.narration && (
            <div className="absolute top-4 left-4 z-20">
              <Badge
                className="bg-gold/90 text-black border-none hover:bg-gold gap-1 pl-2 pr-3 py-1.5 cursor-pointer shadow-lg"
                onClick={toggleNarration}
              >
                <Mic className="h-3 w-3" />
                {isPlayingNarration ? (
                  <SoundWaveVisualizer
                    isPlaying={true}
                    className="h-3 w-8"
                    barCount={4}
                  />
                ) : (
                  <span>Narração</span>
                )}
              </Badge>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-[400px] flex flex-col bg-background border-l border-zinc-800/10">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-border/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>
                  {post.user.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none">
                  {post.user.name}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {post.user.type} • {post.time}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Content & Comments */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* Caption */}
              <div>
                <h2 className="font-bold text-lg mb-1">{post.title}</h2>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.hashtags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Mock Comments Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Comentários
                </h3>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2.5">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${
                          i % 2 === 0 ? 'female' : 'male'
                        }&seed=${i + 10}`}
                      />
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-secondary/30 p-2.5 rounded-lg rounded-tl-none">
                        <span className="text-xs font-bold block mb-0.5">
                          Usuário {i}
                        </span>
                        <p className="text-xs leading-relaxed">
                          Incrível! Muito bom ver esse tipo de conteúdo por
                          aqui. 👏
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 ml-1">
                        <span className="text-[10px] text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                          Curtir
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium cursor-pointer hover:text-foreground">
                          Responder
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* Actions Footer */}
          <div className="p-4 bg-secondary/10 border-t border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'hover:bg-red-500/10 hover:text-red-500 transition-colors',
                    isLiked ? 'text-red-500' : 'text-muted-foreground',
                  )}
                  onClick={handleLike}
                >
                  <Heart
                    className={cn(
                      'h-6 w-6 transition-transform',
                      isLiked && 'fill-current scale-110',
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-green-500/10 hover:text-green-500 transition-colors"
                >
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">
                {likeCount.toLocaleString()} curtidas
              </span>
              <span className="text-[10px] text-muted-foreground uppercase">
                Postado {post.time}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
