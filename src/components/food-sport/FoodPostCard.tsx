import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  Play,
  UtensilsCrossed,
  MoreHorizontal,
  Trash2,
  ChevronUp,
} from 'lucide-react'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface FoodPostProps {
  post: any
  onDelete?: (id: number) => void
}

// Expanded Food Emoji Library for Food Sport specifically
const FOOD_EMOJIS = [
  '🍅',
  '🍎',
  '🥕',
  '🥦',
  '🍇',
  '🥑',
  '🍳',
  '🍗',
  '🥩',
  '🍠',
  '🥗',
  '🍌',
  '🍍',
  '🍤',
]

export function FoodPostCard({ post, onDelete }: FoodPostProps) {
  // Distribute initial mock reactions across the new variety to make the feed vibrant
  const initialReactions = useMemo(() => {
    const counts: Record<string, number> = {}
    if (post.likes > 0) {
      counts['🍎'] = Math.floor(post.likes * 0.3)
      counts['🥦'] = Math.floor(post.likes * 0.2)
      counts['🥩'] = Math.floor(post.likes * 0.2)
      counts['🥑'] = Math.floor(post.likes * 0.15)
      counts['🍅'] =
        post.likes - (counts['🍎'] + counts['🥦'] + counts['🥩'] + counts['🥑'])
    }
    return counts
  }, [post.likes])

  const [reactions, setReactions] =
    useState<Record<string, number>>(initialReactions)
  const [userReaction, setUserReaction] = useState<string | null>(
    post.liked ? '🍎' : null,
  )
  const [isReactionOpen, setIsReactionOpen] = useState(false)

  const [isSaved, setIsSaved] = useState(post.saved)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleReact = (emoji: string) => {
    setReactions((prev) => {
      const newReactions = { ...prev }

      if (userReaction === emoji) {
        // Toggling off the same reaction
        newReactions[emoji] = Math.max(0, (newReactions[emoji] || 1) - 1)
        setUserReaction(null)
      } else {
        // Remove old reaction if it exists
        if (userReaction) {
          newReactions[userReaction] = Math.max(
            0,
            (newReactions[userReaction] || 1) - 1,
          )
        }
        // Add new reaction
        newReactions[emoji] = (newReactions[emoji] || 0) + 1
        setUserReaction(emoji)
      }

      return newReactions
    })
    setIsReactionOpen(false)
  }

  const handleComment = () => {
    toast.success('Comentários abertos', {
      description: 'Esta função abrirá a aba de comentários em breve.',
    })
  }

  const handleShare = () => {
    toast.success('Opções de compartilhamento', {
      description: 'Link copiado para a área de transferência!',
    })
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    if (!isFollowing) {
      toast.success(`Você agora segue ${post.user.name}`)
    }
  }

  const totalReactions = Object.values(reactions).reduce(
    (sum, count) => sum + count,
    0,
  )
  const topEmojis = Object.entries(reactions)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([emoji]) => emoji)

  return (
    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-card mb-4 animate-fade-in hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-3 space-y-0">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.user.id}`}>
            <Avatar className="h-10 w-10 border border-border cursor-pointer hover:border-primary transition-colors">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link to={`/profile/${post.user.id}`}>
              <h3 className="text-sm font-semibold hover:text-primary transition-colors leading-none">
                {post.user.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                variant="secondary"
                className="h-4 px-1 text-[9px] rounded-sm font-normal bg-secondary/50 text-muted-foreground uppercase"
              >
                {post.user.type}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                • {post.time}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {post.user.id !== 'me' ? (
            <>
              <Button
                variant={isFollowing ? 'secondary' : 'outline'}
                size="sm"
                className={cn(
                  'h-7 text-xs rounded-full px-4 transition-all duration-300',
                  !isFollowing &&
                    'text-primary border-primary/50 hover:bg-primary hover:text-white',
                )}
                onClick={handleFollow}
              >
                {isFollowing ? 'Seguindo' : 'Seguir'}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 rounded-xl">
                  <DropdownMenuItem
                    onClick={() => toast.success('Link copiado!')}
                  >
                    Copiar Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-full"
              onClick={() => setShowDeleteDialog(true)}
              title="Excluir publicação"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {post.template && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-none rounded-md px-2 py-0.5 text-xs font-bold flex w-fit items-center gap-1.5 shadow-sm">
              <UtensilsCrossed className="w-3 h-3" />
              {post.template}
            </Badge>
          </div>
        )}

        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.hashtags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-primary text-xs font-medium cursor-pointer hover:underline"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.image && (
          <div className="relative aspect-square w-full bg-zinc-900 group cursor-pointer overflow-hidden">
            <img
              src={post.image}
              alt="Food post content"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {post.type === 'video' && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 text-white ml-1 fill-white" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 bg-secondary/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              {/* Futuristic Thematic Reaction Pill */}
              <div className="group relative flex items-center bg-secondary/20 rounded-full p-0.5 border border-border/30 shadow-sm transition-all hover:bg-secondary/40">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReact(userReaction || '🍎')}
                  className={cn(
                    'h-8 w-8 rounded-full transition-all duration-300 z-10',
                    userReaction
                      ? 'bg-orange-500/20 scale-105 shadow-sm ring-1 ring-orange-500/40'
                      : 'hover:bg-orange-500/10 hover:scale-105',
                  )}
                >
                  <span
                    className={cn(
                      'text-[18px] leading-none transform transition-all duration-300',
                      !userReaction &&
                        'opacity-50 grayscale scale-90 group-hover:scale-100 group-hover:grayscale-0',
                      userReaction &&
                        'scale-110 animate-in zoom-in duration-300',
                    )}
                  >
                    {userReaction || '🍎'}
                  </span>
                </Button>

                <Popover open={isReactionOpen} onOpenChange={setIsReactionOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-6 rounded-r-full -ml-1 text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="top"
                    align="start"
                    className="w-[280px] sm:w-[340px] p-3 rounded-3xl shadow-xl border border-orange-500/20 bg-background/95 backdrop-blur-md"
                    sideOffset={10}
                  >
                    <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 place-items-center">
                      {FOOD_EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          className={cn(
                            'h-10 w-10 text-2xl flex items-center justify-center rounded-full hover:bg-orange-500/10 transition-all duration-300 hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                            userReaction === emoji &&
                              'bg-orange-500/20 scale-110 shadow-inner ring-1 ring-orange-500/50',
                          )}
                          onClick={() => handleReact(emoji)}
                          title={`Reagir com ${emoji}`}
                        >
                          <span className="transform transition-transform duration-300">
                            {emoji}
                          </span>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-blue-400 ml-1"
                onClick={handleComment}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-green-400"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full transition-colors',
                  isFavorite
                    ? 'text-yellow-500'
                    : 'text-muted-foreground hover:text-yellow-400',
                )}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Star className={cn('h-5 w-5', isFavorite && 'fill-current')} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full transition-colors',
                  isSaved
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary',
                )}
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark
                  className={cn('h-5 w-5', isSaved && 'fill-current')}
                />
              </Button>
            </div>
          </div>

          <div className="px-1 flex flex-col gap-1.5">
            {totalReactions > 0 ? (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {topEmojis.map((emoji, i) => (
                    <div
                      key={i}
                      className="text-[10px] bg-card rounded-full border border-background shadow-sm h-[22px] w-[22px] flex items-center justify-center relative ring-1 ring-border/50 animate-in zoom-in"
                      style={{ zIndex: 3 - i }}
                    >
                      <span className="leading-none transform scale-[0.85]">
                        {emoji}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">
                  {totalReactions.toLocaleString()}{' '}
                  {totalReactions === 1 ? 'reação' : 'reações'}
                </span>
              </div>
            ) : (
              <span className="text-xs font-medium text-muted-foreground">
                Seja o primeiro a reagir
              </span>
            )}

            {post.comments > 0 && (
              <div
                className="text-xs text-muted-foreground cursor-pointer hover:underline w-fit mt-1"
                onClick={handleComment}
              >
                Ver todos os {post.comments} comentários
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir publicação?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta publicação? Essa ação não pode
              ser desfeita e a publicação será removida permanentemente do feed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
              onClick={() => {
                if (onDelete) {
                  onDelete(post.id)
                  toast.success('Publicação excluída', {
                    description: 'A publicação foi removida do Food Sport.',
                  })
                }
                setShowDeleteDialog(false)
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
