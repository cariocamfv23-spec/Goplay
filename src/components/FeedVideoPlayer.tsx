import { useRef, useState, useEffect } from 'react'
import { Play, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'

interface FeedVideoPlayerProps {
  url: string
  thumbnail?: string
  aspectRatio?: string
  onClick?: () => void
  autoPlayThreshold?: number
  className?: string
}

export function FeedVideoPlayer({
  url,
  thumbnail,
  aspectRatio = 'aspect-video',
  onClick,
  autoPlayThreshold = 0.6,
  className,
}: FeedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Autoplay Logic with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current
              ?.play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Autoplay might be blocked if unmuted
                if (videoRef.current && !videoRef.current.muted) {
                  videoRef.current.muted = true
                  setIsMuted(true)
                  videoRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch(() => {})
                }
              })
          } else {
            videoRef.current?.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: autoPlayThreshold },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [autoPlayThreshold])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
    onClick?.()
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(currentProgress || 0)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden bg-black group rounded-xl',
        aspectRatio,
        className,
      )}
      onClick={togglePlay}
    >
      <NostalgiaFilter className="z-10 pointer-events-none" />

      {/* Video Element */}
      <video
        ref={videoRef}
        src={url}
        poster={thumbnail}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false)
          setIsPlaying(true)
        }}
        onPause={() => setIsPlaying(false)}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20 pointer-events-none">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      {/* Play/Pause Center Icon Overlay - Only show when paused and ready */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-black/40 rounded-full p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
            <Play className="h-8 w-8 text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-30 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex-1" />{' '}
        {/* Spacer to push mute button to right if needed */}
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(var(--primary),0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
