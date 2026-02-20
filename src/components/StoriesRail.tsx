import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Radio } from 'lucide-react'
import { mockStories, mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { SportSeparator3D } from '@/components/SportSeparator3D'
import { LiveStoryModal } from '@/components/LiveStoryModal'
import { useNavigate } from 'react-router-dom'

export function StoriesRail() {
  const [liveStoryOpen, setLiveStoryOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="w-full py-4 relative z-10">
      <LiveStoryModal open={liveStoryOpen} onOpenChange={setLiveStoryOpen} />
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

          {/* GO LIVE BUTTON (Transmitir) */}
          <div
            className="flex flex-col items-center gap-1.5 cursor-pointer group hover:-translate-y-1 transition-transform duration-300 ml-1"
            onClick={() => navigate('/live/broadcast')}
          >
            <div className="relative rounded-full p-[2px] bg-gradient-to-tr from-rose-500 to-red-600 group-hover:scale-105 shadow-sm group-hover:shadow-lg transition-all duration-300 ring-2 ring-background flex items-center justify-center w-[68px] h-[68px]">
              <div className="bg-background rounded-full w-full h-full flex items-center justify-center border-2 border-background">
                <Radio className="w-6 h-6 text-red-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-background whitespace-nowrap shadow-sm">
                TRANSMITIR
              </div>
            </div>
            <span className="text-[10px] font-bold text-foreground transition-colors truncate mt-1">
              Go Live
            </span>
          </div>

          {/* LIVE STORY - OTHER USER */}
          <div
            className="flex flex-col items-center gap-1.5 cursor-pointer group hover:-translate-y-1 transition-transform duration-300 ml-1"
            onClick={() => setLiveStoryOpen(true)}
          >
            <div className="relative rounded-full p-[2px] bg-red-500 group-hover:scale-105 shadow-sm group-hover:shadow-lg transition-all duration-300 ring-2 ring-background">
              <Avatar className="w-16 h-16 border-2 border-background">
                <AvatarImage src="https://img.usecurling.com/ppl/medium?gender=male&seed=999" />
                <AvatarFallback>TV</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-background animate-pulse whitespace-nowrap shadow-sm">
                AO VIVO
              </div>
            </div>
            <span className="text-[10px] font-bold text-red-500 transition-colors truncate max-w-[64px] mt-1">
              Goplay TV
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
