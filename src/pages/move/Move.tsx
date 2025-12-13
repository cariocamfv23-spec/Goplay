import { mockVideos } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2, Music2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function Move() {
  const [activeVideo, setActiveVideo] = useState(0)

  // Usually this would be implemented with a swiper/carousel for vertical scrolling
  // For simplicity, we show one immersive video mock
  const video = mockVideos[0]

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden animate-fade-in">
      {/* Video Background Mock */}
      <div className="absolute inset-0 z-0">
        <img
          src={video.thumbnail}
          className="h-full w-full object-cover opacity-80"
          alt="Video Content"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      </div>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={video.author.avatar} />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary rounded-full p-0.5">
            <Plus className="h-3 w-3 text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
          >
            <Heart className="h-6 w-6" />
          </Button>
          <span className="text-xs font-bold text-white">12k</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <span className="text-xs font-bold text-white">450</span>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-16 z-20 text-white pb-20">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-shadow">@{video.author.name}</h3>
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-[10px] border-white/50 bg-transparent text-white hover:bg-white/20 hover:text-white"
          >
            Seguir
          </Button>
        </div>
        <p className="text-sm mb-3 line-clamp-2 text-shadow">
          {video.title} - Olha esse lance incrível! #futebol #golaço #skills
        </p>
        <div className="flex items-center gap-2 text-xs opacity-90 animate-pulse">
          <Music2 className="h-3 w-3" />
          <span>Som original - {video.author.name}</span>
        </div>
      </div>
    </div>
  )
}
