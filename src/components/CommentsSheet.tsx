import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import useNotificationStore from '@/stores/useNotificationStore'
import { useAuth } from '@/hooks/use-auth'
import { feedService, type PostCommentItem } from '@/services/feed'
import { toast } from 'sonner'
import { Trash2, Loader2 } from 'lucide-react'

interface Comment {
  id: string
  userId?: string
  user: {
    id?: string
    name: string
    avatar?: string | null
  }
  text: string
  time: string
  likes: number
  isLiked?: boolean
  isMine?: boolean
}

interface CommentsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId?: string | number
  videoId?: string
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    user: {
      name: 'João Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    },
    text: 'Que jogada incrível! 🔥',
    time: '2min',
    likes: 24,
  },
  {
    id: '2',
    user: {
      name: 'Maria Souza',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
    },
    text: 'A técnica do chute foi perfeita.',
    time: '5min',
    likes: 12,
  },
  {
    id: '3',
    user: {
      name: 'Coach Pedro',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
    },
    text: 'Precisamos treinar essa movimentação amanhã.',
    time: '1h',
    likes: 56,
  },
  {
    id: '4',
    user: {
      name: 'Ana Clara',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4',
    },
    text: 'Onde foi esse jogo?',
    time: '3h',
    likes: 2,
  },
]

const DEFAULT_FALLBACK_COMMENTS: Comment[] = [
  {
    id: 'mock-1',
    user: {
      name: 'Lucas Silva',
      avatar: null,
    },
    text: 'Que jogada incrível! 🔥',
    time: '2min',
    likes: 24,
  },
  {
    id: 'mock-2',
    user: {
      name: 'Camila Oliveira',
      avatar: null,
    },
    text: 'A técnica do chute foi perfeita.',
    time: '5min',
    likes: 12,
  },
  {
    id: 'mock-3',
    user: {
      name: 'Prof. Marcelo Prado',
      avatar: null,
    },
    text: 'Precisamos treinar essa movimentação amanhã.',
    time: '1h',
    likes: 56,
  },
  {
    id: 'mock-4',
    user: {
      name: 'Beatriz Mendes',
      avatar: null,
    },
    text: 'Onde foi esse jogo?',
    time: '3h',
    likes: 2,
  },
]

export function CommentsSheet({
  open,
  onOpenChange,
  postId,
}: CommentsSheetProps) {
  const { user, profile } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/)
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      }
      return name.slice(0, 2).toUpperCase()
    }
    if (email) {
      return email.slice(0, 2).toUpperCase()
    }
    return 'GP'
  }

  const isSupabasePost =
    typeof postId === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      postId,
    )

  useEffect(() => {
    if (!open) return

    if (isSupabasePost && postId) {
      setLoading(true)
      feedService.getComments(postId).then(({ data, error }) => {
        setLoading(false)
        if (error) {
          toast.error('Erro ao carregar comentários.')
          return
        }
        const mapped: Comment[] = data.map((c) => ({
          id: c.id,
          userId: c.userId,
          user: {
            id: c.user.id,
            name:
              user?.id === c.userId && profile?.full_name
                ? profile.full_name
                : c.user.name,
            avatar:
              user?.id === c.userId && profile?.avatar_url
                ? profile.avatar_url
                : c.user.avatar,
          },
          text: c.content,
          time: c.timeAgo,
          likes: 0,
          isMine: user?.id === c.userId,
        }))
        setComments(mapped)
      })
    } else {
      setComments(DEFAULT_FALLBACK_COMMENTS)
    }
  }, [
    open,
    postId,
    isSupabasePost,
    user?.id,
    profile?.full_name,
    profile?.avatar_url,
  ])

  const handleSend = async () => {
    if (!newComment.trim() || submitting) return

    if (isSupabasePost && postId && user?.id) {
      setSubmitting(true)
      const { data, error } = await feedService.addComment({
        postId,
        userId: user.id,
        content: newComment.trim(),
      })
      setSubmitting(false)

      if (error || !data) {
        toast.error('Não foi possível enviar o comentário.')
        return
      }

      const added: Comment = {
        id: data.id,
        userId: data.userId,
        user: {
          id: user.id,
          name: profile?.full_name || data.user.name || 'Você',
          avatar: profile?.avatar_url || data.user.avatar || null,
        },
        text: data.content,
        time: 'Agora',
        likes: 0,
        isMine: true,
      }
      setComments((prev) => [...prev, added])
      setNewComment('')
      toast.success('Comentário publicado!')
    } else {
      // Mock fallback
      const comment: Comment = {
        id: Date.now().toString(),
        userId: user?.id,
        user: {
          id: user?.id,
          name: profile?.full_name || 'Você',
          avatar: profile?.avatar_url || null,
        },
        text: newComment,
        time: 'Agora',
        likes: 0,
        isMine: true,
      }
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!user?.id || !isSupabasePost) {
      setComments((prev) => prev.filter((c) => c.id !== commentId))
      return
    }

    const { error } = await feedService.deleteComment(commentId, user.id)
    if (error) {
      toast.error('Erro ao excluir comentário.')
      return
    }
    setComments((prev) => prev.filter((c) => c.id !== commentId))
    toast.success('Comentário excluído.')
  }

  const toggleLike = (id: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            isLiked: !c.isLiked,
          }
        }
        return c
      }),
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[75vh] p-0 rounded-t-3xl bg-zinc-950 border-zinc-800 text-white"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b border-zinc-800">
            <SheetTitle className="text-white text-center">
              Comentários ({comments.length})
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-xs text-zinc-500">
                  Carregando comentários...
                </span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-16 text-zinc-500 text-sm">
                Nenhum comentário ainda. Seja o primeiro a comentar!
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 group">
                    <Avatar className="w-8 h-8 border border-zinc-700 bg-secondary/30 shrink-0">
                      {comment.user.avatar ? (
                        <AvatarImage
                          src={comment.user.avatar}
                          alt={comment.user.name}
                          className="object-cover"
                        />
                      ) : null}
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                        {getInitials(comment.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold text-zinc-200 truncate">
                          {comment.user.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-500">
                            {comment.time}
                          </span>
                          {comment.isMine && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-zinc-500 hover:text-red-400 p-0.5 opacity-60 hover:opacity-100 transition-opacity"
                              title="Excluir meu comentário"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t border-zinc-800 bg-zinc-900 pb-8">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 border border-zinc-700 bg-secondary/30 shrink-0">
                {profile?.avatar_url ? (
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={profile.full_name || 'Seu perfil'}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                  {getInitials(profile?.full_name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicione um comentário..."
                  className="bg-zinc-800 border-none text-white pr-10 focus-visible:ring-primary/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 text-primary hover:text-primary/80 hover:bg-transparent"
                  onClick={handleSend}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
