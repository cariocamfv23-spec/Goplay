import { mockVideos } from '@/lib/data'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Music2,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Move = () => {
  return (
    <div className="h-screen w-full bg-black text-white snap-y snap-mandatory overflow-y-scroll">
      {mockVideos.map((video) => (
        <div
          key={video.id}
          className="h-full w-full relative snap-start flex items-center justify-center bg-zinc-900"
        >
          {/* Simulated Video Player */}
          <img
            src={video.thumbnail}
            alt="Video"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          {/* Overlay Info */}
          <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pt-20">
            <div className="flex items-end justify-between">
              <div className="flex-1 pr-10">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8 border border-white/50">
                    <AvatarImage
                      src={`https://img.usecurling.com/i?q=${video.user}`}
                    />
                    <AvatarFallback>{video.user[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">@{video.user}</span>
                  <button className="text-xs bg-transparent border border-white/50 rounded-full px-2 py-0.5 ml-2">
                    Seguir
                  </button>
                </div>
                <p className="text-sm mb-2">{video.description}</p>
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <Music2 className="h-3 w-3" />
                  <span>Som original - {video.user}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                    <Heart className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium">{video.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium">120</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                    <Share2 className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium">{video.shares}</span>
                </div>
                <MoreVertical className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Move
