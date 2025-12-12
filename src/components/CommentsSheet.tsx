import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Heart, Reply } from 'lucide-react'
import { mockComments, Comment } from '@/lib/data'
import { useState } from 'react'

interface CommentsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CommentItem = ({
  comment,
  isReply = false,
}: {
  comment: Comment
  isReply?: boolean
}) => (
  <div className={`flex gap-3 mb-4 ${isReply ? 'ml-10' : ''}`}>
    <Avatar className="h-8 w-8">
      <AvatarImage src={comment.user.avatar} />
      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <div className="bg-secondary/50 rounded-xl p-3">
        <div className="flex justify-between items-start">
          <span className="font-semibold text-sm">{comment.user.name}</span>
          <span className="text-xs text-muted-foreground">{comment.time}</span>
        </div>
        <p className="text-sm mt-1">{comment.text}</p>
      </div>
      <div className="flex items-center gap-4 px-2">
        <button className="text-xs font-medium text-muted-foreground hover:text-primary flex items-center gap-1">
          <Heart className="h-3 w-3" /> Curtir ({comment.likes})
        </button>
        <button className="text-xs font-medium text-muted-foreground hover:text-primary flex items-center gap-1">
          <Reply className="h-3 w-3" /> Responder
        </button>
      </div>
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
    </div>
  </div>
)

export function CommentsSheet({ open, onOpenChange }: CommentsSheetProps) {
  const [inputValue, setInputValue] = useState('')

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[80vh] flex flex-col p-0 rounded-t-3xl"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-center">Comentários</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4">
          {mockComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ScrollArea>

        <div className="p-4 border-t flex items-center gap-2 bg-background">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
            <AvatarFallback>EU</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Input
              placeholder="Adicione um comentário..."
              className="pr-10 rounded-full bg-secondary border-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full text-primary hover:text-primary/80"
              disabled={!inputValue}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
