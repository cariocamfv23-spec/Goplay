import { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Music2, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockVideos } from '@/lib/data'

export default function Move() {
  const [activeVideo, setActiveVideo] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for snap scrolling detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveVideo(index)
          }
        })
      },
      { threshold: 0.6 },
    )

    const elements = document.querySelectorAll('.move-video-container')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      ref={containerRef}
    >
      {/* Top Overlay */}
      <div className="fixed top-0 left-0 w-full z-20 flex justify-center pt-8 bg-gradient-to-b from-black/60 to-transparent pb-10 pointer-events-none">
        <div className="flex gap-4 text-white font-bold text-base pointer-events-auto">
          <span className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            Seguindo
          </span>
          <span className="opacity-100 cursor-pointer border-b-2 border-white pb-1">
            Para Você
          </span>
        </div>
      </div>

      {mockVideos.map((video, index) => (
        <div
          key={video.id}
          data-index={index}
          className="move-video-container h-screen w-full relative snap-start flex items-center justify-center bg-zinc-900"
        >
          {/* Video Placeholder (Image for now) */}
          <img
            src={video.thumbnail}
            className="h-full w-full object-cover opacity-90"
            alt="Video content"
          />

          {/* Right Action Bar */}
          <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6 z-20">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white cursor-pointer">
                <AvatarImage src={video.userAvatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 inset-x-0 mx-auto bg-primary text-white h-5 w-5 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Plus className="h-3 w-3" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm group-active:scale-90 transition-transform">
                <Heart className="h-7 w-7 text-white fill-white/20 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
              </div>
              <span className="text-white text-xs font-medium shadow-black drop-shadow-md">
                {video.likes}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm group-active:scale-90 transition-transform">
                <MessageCircle className="h-7 w-7 text-white fill-white/20" />
              </div>
              <span className="text-white text-xs font-medium shadow-black drop-shadow-md">
                120
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm group-active:scale-90 transition-transform">
                <Share2 className="h-7 w-7 text-white" />
              </div>
              <span className="text-white text-xs font-medium shadow-black drop-shadow-md">
                {video.shares}
              </span>
            </div>

            {/* Music Disc Animation */}
            <div className="mt-4 animate-spin-slow">
              <Avatar className="h-12 w-12 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center overflow-hidden">
                <AvatarImage
                  src={video.userAvatar}
                  className="h-full w-full object-cover opacity-70"
                />
                <AvatarFallback className="bg-zinc-800 flex items-center justify-center w-full h-full">
                  <Music2 className="h-4 w-4 text-white/50" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 w-full p-4 pb-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
            <div className="max-w-[80%]">
              <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md">
                @{video.user}
              </h3>
              <p className="text-white/90 text-sm mb-3 drop-shadow-sm leading-relaxed">
                {video.description}
              </p>

              <div className="flex items-center gap-2 text-white/80 text-xs font-medium bg-white/10 px-3 py-1.5 rounded-full w-fit backdrop-blur-md">
                <Music2 className="h-3 w-3 animate-pulse" />
                <span className="truncate max-w-[150px]">
                  Som Original - {video.user}
                </span>
              </div>

              {video.aiAction && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="bg-primary/20 border border-primary/50 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 backdrop-blur-md">
                    ✨ AI: {video.aiAction}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
