import { useState, useRef, useEffect } from 'react'
import { mockVideos } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Play,
  Pause,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const VideoCard = ({
  video,
  isActive,
}: {
  video: (typeof mockVideos)[0]
  isActive: boolean
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true)
      // In a real app we would play the video here
      // videoRef.current?.play()
    } else {
      setIsPlaying(false)
      // videoRef.current?.pause()
    }
  }, [isActive])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative h-full w-full snap-start bg-black overflow-hidden">
      {/* Video Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
        onClick={togglePlay}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Play className="h-16 w-16 text-white/50 fill-white/50" />
        </div>
      )}

      {/* Side Actions */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center gap-6 z-20">
        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          >
            <Heart className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {video.likes}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {video.comments}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
          >
            <Share2 className="h-7 w-7" />
          </Button>
          <span className="text-white text-xs font-bold drop-shadow-md">
            {video.shares}
          </span>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-black/20 text-white hover:bg-black/40"
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-24 bg-gradient-to-t from-black/80 to-transparent z-10">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage src={video.user.avatar} />
            <AvatarFallback>{video.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-white font-bold text-sm shadow-black drop-shadow-md">
              {video.user.name}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-[10px] px-2 bg-transparent text-white border-white hover:bg-white/20"
            >
              Seguir
            </Button>
          </div>
        </div>
        <p className="text-white text-sm mb-2 line-clamp-2 drop-shadow-md">
          {video.title}{' '}
          <span className="text-white/80 font-normal">{video.description}</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white flex items-center gap-1">
            🎵 Som original - {video.user.name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Move() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  return (
    <div
      className="h-[calc(100vh-64px)] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-black"
      onScroll={handleScroll}
    >
      {mockVideos.map((video, index) => (
        <div key={video.id} className="h-full w-full snap-start">
          <VideoCard video={video} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  )
}
