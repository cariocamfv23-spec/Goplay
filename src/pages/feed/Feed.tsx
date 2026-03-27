import { PostCard } from '@/components/PostCard'
import { mockPosts } from '@/lib/data'
import { StoriesRail } from '@/components/StoriesRail'
import { CreatePostFab } from '@/components/CreatePostFab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Feed() {
  const eventPosts = mockPosts.filter(
    (p) => p.type === 'article' || p.type === 'event',
  )
  const socialPosts = mockPosts.filter(
    (p) => p.type !== 'article' && p.type !== 'event',
  )

  return (
    <div className="min-h-screen bg-background relative">
      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <StoriesRail />
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
                {mockPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>
              <TabsContent
                value="social"
                className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {socialPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
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

      <CreatePostFab />
    </div>
  )
}
