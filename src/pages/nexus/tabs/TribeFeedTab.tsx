import { mockPosts } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

export function TribeFeedTab() {
  return (
    <div className="space-y-4 py-4">
      {mockPosts.slice(0, 3).map((post) => (
        <div
          key={post.id}
          className="p-5 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm space-y-4 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-primary/20">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold leading-none">{post.user.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{post.time}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">{post.content}</p>
          {post.media && post.media[0] && (
            <div className="overflow-hidden rounded-xl border border-border/50">
              <img
                src={post.media[0]}
                alt="Post Media"
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="flex items-center gap-6 pt-2">
            <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" /> {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" /> {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" /> Compartilhar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
