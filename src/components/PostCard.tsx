import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Hand,
} from 'lucide-react'

interface PostProps {
  post: {
    id: number
    user: { name: string; avatar: string; type: string }
    content: string
    image?: string
    likes: number
    comments: number
    time: string
  }
}

export function PostCard({ post }: PostProps) {
  return (
    <Card className="border-none shadow-sm rounded-xl overflow-hidden mb-4">
      <CardHeader className="flex flex-row items-center p-4 pb-2 space-y-0 gap-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={post.user.avatar} />
          <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{post.user.name}</h3>
          <p className="text-xs text-muted-foreground">
            {post.user.type} • {post.time}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        {post.content && <p className="px-4 pb-3 text-sm">{post.content}</p>}
        {post.image && (
          <div className="w-full aspect-video bg-muted relative overflow-hidden">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-xs font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs font-medium">{post.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Hand className="h-5 w-5" />
            </button>
          </div>
          <button className="text-muted-foreground hover:text-primary">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
