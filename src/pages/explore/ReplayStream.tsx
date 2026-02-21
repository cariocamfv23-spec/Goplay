import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useReplayStore } from '@/stores/useReplayStore'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft,
  Users,
  Calendar,
  Clock,
  MoreVertical,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ReplayStream() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { replays } = useReplayStore()
  const replay = replays.find((r) => r.id === id) || replays[0]

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000)
    }
    return () => clearTimeout(timeout)
  }, [isPlaying, showControls])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100,
      )
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const time = (value[0] / 100) * videoRef.current.duration
      videoRef.current.currentTime = time
      setProgress(value[0])
    }
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00'
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')
    return `${m}:${s}`
  }

  if (!replay) return null

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-white/20 text-white font-bold px-2 backdrop-blur-md border-0"
          >
            REPLAY
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Player */}
      <div
        className="relative w-full h-full flex flex-col justify-center bg-black group cursor-pointer"
        onClick={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          src={replay.videoUrl}
          poster={replay.image}
          className="w-full h-auto max-h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          muted={isMuted}
          playsInline
        />

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex flex-col justify-end p-6 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Center Play/Pause */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-105 transition-all"
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          <div
            className="space-y-4 w-full max-w-3xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold leading-tight drop-shadow-md">
                {replay.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-200 drop-shadow-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {replay.date}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {replay.viewers} espectadores
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {replay.duration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl">
              <span className="text-xs font-mono w-12 text-center">
                {formatTime(videoRef.current?.currentTime || 0)}
              </span>
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="flex-1 cursor-pointer"
                onValueChange={handleSeek}
              />
              <span className="text-xs font-mono w-12 text-center">
                {formatTime(duration)}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 ml-2 rounded-full shrink-0"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
