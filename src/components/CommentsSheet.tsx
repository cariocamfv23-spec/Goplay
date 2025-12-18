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
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  time: string
  likes: number
  isLiked?: boolean
}

interface CommentsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
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

export function CommentsSheet({ open, onOpenChange }: CommentsSheetProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS)
  const [newComment, setNewComment] = useState('')

  const handleSend = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: 'Você',
        avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99',
      },
      text: newComment,
      time: 'Agora',
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment('')
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
            <div className="space-y-4 py-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8 border border-zinc-700">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-zinc-200">
                        {comment.user.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {comment.text}
                    </p>
                    <button className="text-xs font-medium text-zinc-500 hover:text-white transition-colors">
                      Responder
                    </button>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
                    >
                      <Heart
                        className={cn(
                          'w-4 h-4',
                          comment.isLiked
                            ? 'fill-red-500 text-red-500'
                            : 'text-zinc-500',
                        )}
                      />
                    </button>
                    <span className="text-xs text-zinc-500">
                      {comment.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-zinc-800 bg-zinc-900 pb-8">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
                <AvatarFallback>EU</AvatarFallback>
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
