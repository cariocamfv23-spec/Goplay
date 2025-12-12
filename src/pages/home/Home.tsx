import { mockPosts, mockStories } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'
import { PostCard } from '@/components/PostCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CreatePostFab } from '@/components/CreatePostFab'

const Home = () => {
  return (
    <div className="pb-20 relative bg-secondary/10 min-h-screen">
      {/* Stories Section */}
      <div className="pt-4 pb-2 bg-background border-b border-border/40 sticky top-14 z-30">
        <ScrollArea className="w-full whitespace-nowrap px-4">
          <div className="flex w-max space-x-4 p-1 pr-4">
            {/* My Story */}
            <div className="flex flex-col items-center space-y-1 cursor-pointer">
              <div className="relative">
                <div className="p-[2px] rounded-full bg-transparent">
                  <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
                    <AvatarFallback>EU</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 border-2 border-background shadow-sm">
                  <Plus className="h-3 w-3" />
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                Seu Story
              </span>
            </div>

            {/* Other Stories */}
            {mockStories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center space-y-1 cursor-pointer group"
              >
                <div
                  className={`p-[2px] rounded-full ${story.hasStory ? 'bg-gradient-to-tr from-primary via-purple-500 to-gold' : 'bg-muted'}`}
                >
                  <Avatar className="h-16 w-16 border-2 border-background group-hover:scale-95 transition-transform duration-200">
                    <AvatarImage src={story.avatar} />
                    <AvatarFallback>{story.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-muted-foreground max-w-[64px] truncate">
                  {story.name}
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Feed Section */}
      <div className="max-w-xl mx-auto p-4 space-y-5">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            Isso é tudo por enquanto!
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Explore mais conteúdo ou crie seu post.
          </p>
        </div>
      </div>

      {/* Create Post FAB */}
      <CreatePostFab />
    </div>
  )
}

export default Home
