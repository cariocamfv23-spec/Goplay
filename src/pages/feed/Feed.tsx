import { PostCard } from '@/components/PostCard'
import { mockPosts } from '@/lib/data'
import { StoriesRail } from '@/components/StoriesRail'
import { CreatePostFab } from '@/components/CreatePostFab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DemoProfilesBanner } from '@/components/profile/DemoProfilesBanner'

import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useRealtimeFeed } from '@/hooks/useRealtimeFeed'
import { Loader2, Radio } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Feed() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const targetPostId = searchParams.get('post')

  const {
    posts: realPosts,
    loading,
    isLiveConnected,
    refreshFeed,
    removeLocalPost,
  } = useRealtimeFeed(user?.id)

  // Scroll to target post if passed in URL query (?post=<id>)
  useEffect(() => {
    if (!loading && targetPostId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`post-${targetPostId}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.classList.add('ring-2', 'ring-primary', 'transition-all')
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-primary')
          }, 3000)
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [loading, targetPostId])

  // Convert real posts to PostCard format
  const formattedRealPosts = realPosts.map((p) => ({
    id: p.id,
    type: p.type,
    user: {
      id: p.user.id,
      name: p.user.name,
      avatar: p.user.avatar,
      type: p.user.type,
      sport: p.user.sport,
    },
    content: p.content,
    media: p.media,
    image: p.media?.[0],
    videoUrl: p.videoUrl,
    likes: p.likesCount,
    comments: p.commentsCount,
    shares: 0,
    applauds: 0,
    supports: 0,
    time: p.timeAgo,
    liked: p.isLiked,
  }))

  // Merged feed: real Supabase posts displayed first, followed by legacy items
  const allPosts = [...formattedRealPosts, ...mockPosts]
  const socialPosts = [
    ...formattedRealPosts.filter((p) => p.type !== 'article'),
    ...mockPosts.filter((p) => p.type !== 'article' && p.type !== 'event'),
  ]
  const eventPosts = [
    ...formattedRealPosts.filter((p) => p.type === 'article'),
    ...mockPosts.filter((p) => p.type === 'article' || p.type === 'event'),
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <StoriesRail />
        <div className="px-4 pt-2 flex items-center justify-between">
          <div className="flex-1">
            <DemoProfilesBanner />
          </div>
        </div>
        <div className="px-4 py-2">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between gap-2 mb-2">
              <TabsList className="flex-1 grid grid-cols-3 h-9">
                <TabsTrigger value="all" className="text-xs">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="social" className="text-xs">
                  Social
                </TabsTrigger>
                <TabsTrigger value="events" className="text-xs">
                  Eventos
                </TabsTrigger>
              </TabsList>

              {isLiveConnected && (
                <Badge
                  variant="outline"
                  className="h-7 px-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-bold flex items-center gap-1.5 shrink-0 animate-in fade-in"
                  title="Conectado ao Supabase Realtime (atualizações ao vivo)"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AO VIVO</span>
                </Badge>
              )}
            </div>

            <div className="mt-4 pb-24">
              <TabsContent
                value="all"
                className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">
                      Sincronizando feed...
                    </span>
                  </div>
                ) : (
                  allPosts.map((post) => (
                    <div
                      id={`post-${post.id}`}
                      key={post.id}
                      className="rounded-2xl"
                    >
                      <PostCard
                        post={post}
                        onDeleted={(deletedId) => {
                          removeLocalPost(String(deletedId))
                        }}
                      />
                    </div>
                  ))
                )}
              </TabsContent>
              <TabsContent
                value="social"
                className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {socialPosts.map((post) => (
                  <div
                    id={`post-${post.id}`}
                    key={post.id}
                    className="rounded-2xl"
                  >
                    <PostCard
                      post={post}
                      onDeleted={(deletedId) => {
                        removeLocalPost(String(deletedId))
                      }}
                    />
                  </div>
                ))}
              </TabsContent>
              <TabsContent
                value="events"
                className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {eventPosts.length > 0 ? (
                  eventPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground text-sm">
                    Nenhum evento no momento.
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <CreatePostFab onPostCreated={refreshFeed} />
    </div>
  )
}
