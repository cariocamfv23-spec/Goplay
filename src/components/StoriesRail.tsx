import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'
import { mockStories, mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'

export function StoriesRail() {
  return (
    <div className="w-full py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-1">
          {/* Add Story Button */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-dashed border-muted-foreground/30 p-0.5 group-hover:border-primary transition-colors">
                <AvatarImage
                  src={mockCurrentUser.avatar}
                  className="rounded-full opacity-80"
                />
                <AvatarFallback>EU</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 border-2 border-background">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">
              Seu Story
            </span>
          </div>

          {/* Stories List */}
          {mockStories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div
                className={cn(
                  'rounded-full p-[2px] transition-all duration-300 group-hover:scale-105',
                  story.viewed
                    ? 'bg-muted'
                    : 'bg-gradient-to-tr from-primary via-purple-500 to-gold',
                )}
              >
                <Avatar className="w-16 h-16 border-2 border-background">
                  <AvatarImage src={story.user.avatar} />
                  <AvatarFallback>{story.user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[64px]">
                {story.user.name}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
