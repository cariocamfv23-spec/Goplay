import { mockPosts, mockStories } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'
import { PostCard } from '@/components/PostCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className="pb-20 relative">
      {/* Stories */}
      <div className="pt-4 pb-2 border-b border-border/40">
        <ScrollArea className="w-full whitespace-nowrap px-4">
          <div className="flex w-max space-x-4 p-1">
            <div className="flex flex-col items-center space-y-1">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-background">
                  <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
                  <AvatarFallback>EU</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-0.5 border-2 border-background">
                  <Plus className="h-3 w-3" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Seu Story</span>
            </div>

            {mockStories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center space-y-1 cursor-pointer group"
              >
                <div
                  className={`p-[2px] rounded-full ${story.hasStory ? 'bg-gradient-to-tr from-primary to-gold' : 'bg-transparent'}`}
                >
                  <Avatar className="h-16 w-16 border-2 border-background group-hover:scale-95 transition-transform">
                    <AvatarImage src={story.avatar} />
                    <AvatarFallback>{story.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-muted-foreground max-w-[60px] truncate">
                  {story.name}
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-4">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* FAB */}
      <Button className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}

export default Home
