import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'
import { mockStories, mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'
import React from 'react'
import { SportSeparator3D } from '@/components/SportSeparator3D'

export function StoriesRail() {
  return (
    <div className="w-full py-4 relative z-10">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max items-center gap-2 px-1">
          {/* Add Story Button */}
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group pl-2 transition-transform hover:scale-105 active:scale-95 duration-200">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-dashed border-muted-foreground/30 p-0.5 group-hover:border-primary transition-colors shadow-sm">
                <AvatarImage
                  src={mockCurrentUser.avatar}
                  className="rounded-full opacity-80"
                />
                <AvatarFallback>EU</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 border-2 border-background shadow-md">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">
              Seu Story
            </span>
          </div>

          {/* Initial Separator based on the first story's sport */}
          {mockStories.length > 0 && (
            <SportSeparator3D
              sport={mockStories[0].user.sport}
              index={0}
              className="mx-1"
            />
          )}

          {/* Stories List */}
          {mockStories.map((story, index) => (
            <React.Fragment key={story.id}>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group hover:-translate-y-1 transition-transform duration-300">
                <div
                  className={cn(
                    'rounded-full p-[2px] transition-all duration-300 group-hover:scale-105 shadow-sm group-hover:shadow-lg',
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

              {/* Separator for the next story in the sequence */}
              {index < mockStories.length - 1 && (
                <SportSeparator3D
                  sport={mockStories[index + 1].user.sport}
                  index={index + 1}
                  className="mx-1"
                />
              )}
            </React.Fragment>
          ))}
          {/* Right padding for scroll */}
          <div className="w-2" />
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
