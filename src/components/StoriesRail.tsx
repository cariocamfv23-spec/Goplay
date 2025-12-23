import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockStories, mockCurrentUser } from '@/lib/data'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StoriesRail() {
  return (
    <div className="w-full py-4 border-b border-border/40">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4">
          {/* Create Story */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-muted group-hover:border-primary transition-colors">
                <AvatarImage src={mockCurrentUser.avatar} />
                <AvatarFallback>{mockCurrentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-0.5 border-2 border-background">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors">
              Seu Story
            </span>
          </div>

          {/* Friends Stories */}
          {mockStories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div
                className={cn(
                  'rounded-full p-[2px]',
                  story.viewed
                    ? 'bg-muted'
                    : 'bg-gradient-to-tr from-primary via-purple-500 to-gold',
                )}
              >
                <Avatar className="w-[60px] h-[60px] border-2 border-background group-hover:scale-105 transition-transform">
                  <AvatarImage src={story.user.avatar} />
                  <AvatarFallback>{story.user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-muted-foreground font-medium truncate max-w-[64px] text-center group-hover:text-foreground transition-colors">
                {story.user.name}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  )
}
