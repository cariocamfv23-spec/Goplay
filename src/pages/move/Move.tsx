import { mockVideos } from '@/lib/data'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Music2,
  Play,
  Volume2,
  Sparkles,
  BarChart2,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { AiAnalysisDrawer } from '@/components/AiAnalysisDrawer'
import { Link } from 'react-router-dom'

const Move = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)

  const handleOpenAnalysis = (video: any) => {
    setSelectedVideo(video)
    setIsAnalysisOpen(true)
  }

  return (
    <>
      <div className="h-screen w-full bg-black text-white snap-y snap-mandatory overflow-y-scroll scroll-smooth no-scrollbar relative">
        {/* Profile Button / Avatar Top Right */}
        <div className="fixed top-4 right-4 z-50">
          <Link to="/profile/me">
            <Avatar className="h-10 w-10 border border-white/20 shadow-lg cursor-pointer hover:scale-105 transition-transform">
              <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {mockVideos.map((video) => (
          <div
            key={video.id}
            className="h-full w-full relative snap-start flex items-center justify-center bg-zinc-900 overflow-hidden"
          >
            {/* Simulated Video Player */}
            <div className="absolute inset-0 bg-zinc-800">
              <img
                src={video.thumbnail}
                alt="Video"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer bg-black/10">
                <Play className="h-16 w-16 fill-white/50 text-white/50" />
              </div>

              {/* AI Action Highlight Overlay */}
              {video.aiAction && (
                <div className="absolute top-20 left-4 flex flex-col gap-2 items-start">
                  <div className="bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 animate-pulse border border-white/20">
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                    <span className="text-xs font-bold text-white">
                      {video.aiAction}
                    </span>
                  </div>

                  {video.aiStats && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 text-xs bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenAnalysis(video)
                      }}
                    >
                      <BarChart2 className="h-3 w-3 mr-1.5" />
                      Ver Análise Completa
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

            {/* Right Side Actions */}
            <div className="absolute bottom-24 right-4 flex flex-col items-center gap-6 z-10">
              <div className="relative group cursor-pointer">
                <Avatar className="h-12 w-12 border-2 border-white shadow-lg transition-transform group-hover:scale-110">
                  <AvatarImage src={video.userAvatar} />
                  <AvatarFallback>{video.user[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <div className="bg-primary rounded-full p-0.5 shadow-sm">
                    <div className="h-3 w-3 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-primary font-bold">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <span className="text-xs font-bold drop-shadow-md">
                  {video.likes}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <MessageCircle className="h-7 w-7 text-white" />
                </div>
                <span className="text-xs font-bold drop-shadow-md">120</span>
              </div>

              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Share2 className="h-7 w-7 text-white" />
                </div>
                <span className="text-xs font-bold drop-shadow-md">
                  {video.shares}
                </span>
              </div>

              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                <MoreVertical className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-20 left-4 right-16 z-10">
              <div className="mb-2">
                <h3 className="font-bold text-base text-shadow-sm mb-1">
                  @{video.user}
                </h3>
                <p className="text-sm text-white/90 leading-snug line-clamp-2">
                  {video.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 w-max">
                <Music2 className="h-3 w-3 animate-spin-slow" />
                <div className="text-xs font-medium w-32 truncate">
                  Som original - {video.user}
                </div>
                <Volume2 className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AiAnalysisDrawer
        open={isAnalysisOpen}
        onOpenChange={setIsAnalysisOpen}
        data={selectedVideo}
      />
    </>
  )
}

export default Move
