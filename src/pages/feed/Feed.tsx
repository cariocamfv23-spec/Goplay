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
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

function PostCardSkeleton() {
  return (
    <Card className="border-none shadow-sm rounded-2xl bg-card mb-4 animate-pulse">
      <CardHeader className="flex flex-row items-center p-4 pb-2 space-y-0 gap-3">
        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-2.5 w-20 rounded" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-3">
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-4/5 rounded" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-4">
            <Skeleton className="h-5 w-12 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>
          <Skeleton className="h-5 w-8 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function Feed() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const targetPostId = searchParams.get('post')

  const {
    posts: realPosts,
    loading,
    isSyncing,
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
    audioUrl: p.audioUrl,
    musicLink: p.musicLink,
    mentions: p.mentions,
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

              <div className="flex items-center gap-1.5 shrink-0">
                {isSyncing && realPosts.length > 0 && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"
                    title="Atualizando em segundo plano"
                  />
                )}
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
            </div>

            <div className="mt-4 pb-24">
              <TabsContent
                value="all"
                className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {loading && allPosts.length === 0 ? (
                  <div className="space-y-4">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
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
                {loading && socialPosts.length === 0 ? (
                  <div className="space-y-4">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                  </div>
                ) : (
                  socialPosts.map((post) => (
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
