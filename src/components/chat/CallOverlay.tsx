import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CallOverlayProps {
  isOpen: boolean
  type: 'voice' | 'video'
  user: {
    name: string
    avatar: string
  }
  onEndCall: () => void
}

export function CallOverlay({
  isOpen,
  type,
  user,
  onEndCall,
}: CallOverlayProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(type === 'video')
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected'>(
    'connecting',
  )
  const [duration, setDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCallStatus('connecting')
      setDuration(0)
      setIsMinimized(false)
      setIsVideoEnabled(type === 'video')

      const connectTimer = setTimeout(() => {
        setCallStatus('connected')
      }, 2000) // Simulate connection delay

      return () => clearTimeout(connectTimer)
    }
  }, [isOpen, type])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOpen && callStatus === 'connected') {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isOpen, callStatus])

  if (!isOpen) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // If minimized, show a small floating bar
  if (isMinimized) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-background/90 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-3 flex items-center gap-3 animate-in slide-in-from-right">
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{user.name}</span>
          <span className="text-[10px] text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
        <div className="flex gap-1 ml-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => setIsMinimized(false)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8 rounded-full"
            onClick={onEndCall}
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom duration-300">
      {/* Background Effect for Voice Call */}
      {!isVideoEnabled && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        </div>
      )}

      {/* Video Background */}
      {isVideoEnabled && (
        <div className="absolute inset-0 z-0 bg-zinc-900">
          {/* Simulated Camera Feed */}
          <img
            src="https://img.usecurling.com/p/400/800?q=portrait%20person%20video%20call"
            className="w-full h-full object-cover opacity-80"
            alt="Video Feed"
          />
          <div className="absolute top-4 right-4 w-28 h-40 bg-black rounded-xl border border-white/20 shadow-xl overflow-hidden">
            <img
              src="https://img.usecurling.com/ppl/medium?gender=male&seed=1"
              className="w-full h-full object-cover"
              alt="My Feed"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 p-6 flex flex-col items-center mt-8">
        {!isVideoEnabled && (
          <Avatar className="h-32 w-32 border-4 border-background shadow-2xl mb-6">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        )}

        <h2
          className={cn(
            'text-2xl font-bold mb-1',
            isVideoEnabled ? 'text-white drop-shadow-md' : 'text-foreground',
          )}
        >
          {user.name}
        </h2>
        <p
          className={cn(
            'text-sm font-medium',
            isVideoEnabled ? 'text-white/80' : 'text-muted-foreground',
          )}
        >
          {callStatus === 'connecting' ? 'Chamando...' : formatTime(duration)}
        </p>
      </div>

      <div className="flex-1" />

      {/* Controls */}
      <div className="relative z-10 p-8 pb-12 flex items-center justify-center gap-6 bg-gradient-to-t from-background via-background/80 to-transparent">
        <Button
          size="lg"
          variant="secondary"
          className={cn(
            'h-14 w-14 rounded-full shadow-lg border-2',
            isMuted
              ? 'bg-white text-black'
              : 'bg-secondary/80 backdrop-blur-md',
          )}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>

        <Button
          size="lg"
          variant="destructive"
          className="h-20 w-20 rounded-full shadow-xl animate-in zoom-in duration-300 hover:scale-105 transition-transform bg-red-600 hover:bg-red-700"
          onClick={onEndCall}
        >
          <PhoneOff className="h-8 w-8" />
        </Button>

        <Button
          size="lg"
          variant="secondary"
          className={cn(
            'h-14 w-14 rounded-full shadow-lg border-2',
            !isVideoEnabled
              ? 'bg-white text-black'
              : 'bg-secondary/80 backdrop-blur-md',
          )}
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
        >
          {!isVideoEnabled ? (
            <VideoOff className="h-6 w-6" />
          ) : (
            <Video className="h-6 w-6" />
          )}
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="absolute right-6 bottom-14 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMinimized(true)}
        >
          <Minimize2 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
