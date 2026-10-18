import { PostCard } from '@/components/PostCard'
import { mockPosts } from '@/lib/data'
import { StoriesRail } from '@/components/StoriesRail'
import { CreatePostFab } from '@/components/CreatePostFab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DemoProfilesBanner } from '@/components/profile/DemoProfilesBanner'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { feedService, type PostItem } from '@/services/feed'
import { useAuth } from '@/hooks/use-auth'
import { Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Feed() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const targetPostId = searchParams.get('post')
  const [realPosts, setRealPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadFeed = useCallback(async () => {
    setLoading(true)
    const { data } = await feedService.getPosts(user?.id)
    setRealPosts(data || [])
    setLoading(false)
  }, [user?.id])

  useEffect(() => {
    loadFeed()
  }, [loadFeed])

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
        <div className="px-4 pt-2">
          <DemoProfilesBanner />
        </div>
        <div className="px-4 py-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-9">
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
                          setRealPosts((prev) =>
                            prev.filter((p) => p.id !== deletedId),
                          )
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
                        setRealPosts((prev) =>
                          prev.filter((p) => p.id !== deletedId),
                        )
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

      <CreatePostFab onPostCreated={loadFeed} />
    </div>
  )
}
