import { mockPosts, mockStories } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Video, Zap } from 'lucide-react'
import { PostCard } from '@/components/PostCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CreatePostFab } from '@/components/CreatePostFab'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="pb-20 relative bg-background min-h-screen">
      {/* Stories Section */}
      <div className="pt-2 pb-2 bg-background border-b border-border/40 sticky top-14 z-30 shadow-sm backdrop-blur-md bg-background/90">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 p-2 px-4">
            {/* My Story */}
            <div className="flex flex-col items-center space-y-1 cursor-pointer">
              <div className="relative">
                <div className="p-[2px] rounded-full bg-transparent">
                  <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
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

      {/* MOVE Highlight Section */}
      <div className="p-4 pb-0">
        <div
          className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 p-4 text-white relative overflow-hidden shadow-lg cursor-pointer"
          onClick={() => navigate('/move')}
        >
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" /> MOVE
              </h2>
              <p className="text-xs text-zinc-400">
                Assista aos melhores lances em alta
              </p>
            </div>
            <Button
              size="sm"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              Assistir
            </Button>
          </div>
          <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-primary/20 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Feed Section */}
      <div className="max-w-xl mx-auto p-4 space-y-5">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <div className="text-center py-8">
          <div className="inline-block h-1 w-1 bg-muted-foreground rounded-full mx-1" />
          <div className="inline-block h-1 w-1 bg-muted-foreground rounded-full mx-1" />
          <div className="inline-block h-1 w-1 bg-muted-foreground rounded-full mx-1" />
        </div>
      </div>

      {/* Create Post FAB */}
      <CreatePostFab />
    </div>
  )
}

export default Home
