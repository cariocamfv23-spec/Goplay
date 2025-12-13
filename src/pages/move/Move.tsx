import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Play, Heart, MessageCircle, Share2, Music2 } from 'lucide-react'
import { mockVideos } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function Move() {
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <div className="h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory no-scrollbar pb-16">
      {mockVideos.map((video, index) => (
        <div
          key={video.id}
          className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-900"
        >
          {/* Video Placeholder */}
          <div className="absolute inset-0">
            <img
              src={video.thumbnail}
              className="w-full h-full object-cover opacity-60"
              alt={video.title}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-16 w-16 text-white/50 fill-white/50 animate-pulse" />
          </div>

          {/* Right Actions */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12"
              >
                <Heart className="h-6 w-6" />
              </Button>
              <span className="text-xs font-medium">{video.likes}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              <span className="text-xs font-medium">1.2k</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12"
              >
                <Share2 className="h-6 w-6" />
              </Button>
              <span className="text-xs font-medium">Share</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute left-4 bottom-20 right-16">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={video.user.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="font-bold text-sm shadow-black drop-shadow-md">
                @{video.user.name.replace(' ', '').toLowerCase()}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 bg-transparent border-white text-white hover:bg-white/20"
              >
                Seguir
              </Button>
            </div>
            <h3 className="font-bold text-base mb-2 drop-shadow-md">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 text-xs opacity-90">
              <Music2 className="h-3 w-3 animate-spin" />
              <span>Original Audio - {video.user.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
