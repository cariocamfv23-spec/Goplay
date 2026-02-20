import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  X,
  Radio,
  Eye,
  Users,
  Clock,
  Award,
  Camera,
  Mic,
  MicOff,
  CameraOff,
  SwitchCamera,
  Heart,
  Flame,
  Trophy,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CreateLiveBroadcast() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'preview' | 'live' | 'summary'>(
    'preview',
  )
  const videoRef = useRef<HTMLVideoElement>(null)

  const [duration, setDuration] = useState(0)
  const [viewers, setViewers] = useState(0)
  const [peakViewers, setPeakViewers] = useState(0)
  const [comments, setComments] = useState<
    { id: number; user: string; text: string; avatar: string }[]
  >([])

  const [hasVideo, setHasVideo] = useState(true)
  const [hasAudio, setHasAudio] = useState(true)
  const streamRef = useRef<MediaStream | null>(null)

  // Floating reactions
  const [reactions, setReactions] = useState<
    { id: number; type: string; left: number }[]
  >([])

  // Init camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true,
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Failed to get media devices', err)
        // Handled gracefully via black screen fallback if no camera is detected
      }
    }

    if (status === 'preview' || status === 'live') {
      initCamera()
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [status])

  // Live simulation intervals
  useEffect(() => {
    let timerInterval: NodeJS.Timeout
    let viewersInterval: NodeJS.Timeout
    let commentsInterval: NodeJS.Timeout
    let reactionsInterval: NodeJS.Timeout

    if (status === 'live') {
      timerInterval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)

      viewersInterval = setInterval(() => {
        setViewers((prev) => {
          const change = Math.floor(Math.random() * 11) - 3 // Emulate growth
          const newVal = Math.max(0, prev + change)
          setPeakViewers((p) => Math.max(p, newVal))
          return newVal
        })
      }, 3000)

      const mockUsers = [
        'alex_silva',
        'mari.sports',
        'carlos_edu',
        'bia_lima',
        'pedro_santos',
        'juca_gol',
      ]
      const mockTexts = [
        'Bora!!',
        'Pra cima 🔥',
        'Show de bola',
        'Manda um salve',
        'Acompanhando aqui',
        'Boa transmissão!',
        'Incrível!',
      ]

      commentsInterval = setInterval(() => {
        if (Math.random() > 0.3) {
          const newUser =
            mockUsers[Math.floor(Math.random() * mockUsers.length)]
          const newText =
            mockTexts[Math.floor(Math.random() * mockTexts.length)]
          setComments((prev) =>
            [
              ...prev,
              {
                id: Date.now(),
                user: newUser,
                text: newText,
                avatar: `https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${Math.floor(Math.random() * 100)}`,
              },
            ].slice(-20),
          ) // keep max 20 latest comments
        }
      }, 2000)

      const reactionTypes = ['heart', 'flame', 'trophy']
      reactionsInterval = setInterval(() => {
        if (Math.random() > 0.4) {
          setReactions((prev) =>
            [
              ...prev,
              {
                id: Date.now(),
                type: reactionTypes[
                  Math.floor(Math.random() * reactionTypes.length)
                ],
                left: 50 + Math.random() * 40, // random position mostly right side
              },
            ].filter((r) => Date.now() - r.id < 3000),
          ) // remove after 3s
        }
      }, 800)
    }

    return () => {
      clearInterval(timerInterval)
      clearInterval(viewersInterval)
      clearInterval(commentsInterval)
      clearInterval(reactionsInterval)
    }
  }, [status])

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setHasVideo(videoTrack.enabled)
      }
    } else {
      setHasVideo(!hasVideo)
    }
  }

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setHasAudio(audioTrack.enabled)
      }
    } else {
      setHasAudio(!hasAudio)
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  if (status === 'summary') {
    return (
      <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 text-white z-50">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <Radio className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Transmissão Encerrada</h1>
        <p className="text-zinc-400 mb-8">Aqui está o resumo da sua Live</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
          <div className="bg-zinc-900 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <span className="text-3xl font-bold">{peakViewers}</span>
            <span className="text-xs text-zinc-500 mt-1">
              Pico de Espectadores
            </span>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <Clock className="w-6 h-6 text-orange-400 mb-2" />
            <span className="text-3xl font-bold">{formatTime(duration)}</span>
            <span className="text-xs text-zinc-500 mt-1">Duração Total</span>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 col-span-2">
            <Award className="w-6 h-6 text-yellow-400 mb-2" />
            <span className="text-3xl font-bold">
              {(viewers * 1.5).toFixed(0)}
            </span>
            <span className="text-xs text-zinc-500 mt-1">
              Total de Contas Alcançadas
            </span>
          </div>
        </div>

        <Button
          onClick={() => navigate('/')}
          className="w-full max-w-sm h-14 rounded-full font-bold text-lg bg-primary hover:bg-primary/90"
        >
          Voltar para Home
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
          !hasVideo && 'opacity-0',
        )}
      />
      {!hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
            <CameraOff className="w-10 h-10 text-zinc-500" />
          </div>
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-safe flex items-start justify-between z-10">
        {status === 'preview' ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={() => navigate(-1)}
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md"
                onClick={toggleAudio}
              >
                {hasAudio ? (
                  <Mic className="w-5 h-5" />
                ) : (
                  <MicOff className="w-5 h-5 text-red-400" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md"
                onClick={toggleVideo}
              >
                {hasVideo ? (
                  <Camera className="w-5 h-5" />
                ) : (
                  <CameraOff className="w-5 h-5 text-red-400" />
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse shadow-sm">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                AO VIVO
              </div>
              <div className="bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(duration)}
              </div>
              <div className="bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Eye className="w-3.5 h-3.5" />
                {viewers}
              </div>
            </div>
            <Button
              size="sm"
              variant="destructive"
              className="rounded-full font-bold shadow-lg"
              onClick={() => setStatus('summary')}
            >
              Encerrar
            </Button>
          </>
        )}
      </div>

      {/* Preview Center Content */}
      {status === 'preview' && (
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 z-10 pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center animate-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-white text-2xl font-bold mb-2 drop-shadow-lg text-center px-4">
              Pronto para entrar ao vivo?
            </h2>
            <p className="text-white/80 text-sm mb-8 drop-shadow-md">
              Ajuste sua câmera e microfone
            </p>
            <Button
              onClick={() => setStatus('live')}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full h-16 px-10 text-lg font-bold shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-3 transition-transform active:scale-95"
            >
              <Radio className="w-6 h-6 animate-pulse" />
              Iniciar Transmissão
            </Button>
          </div>
        </div>
      )}

      {/* Live Content */}
      {status === 'live' && (
        <>
          {/* Comments Area */}
          <div className="absolute bottom-4 left-4 right-20 h-64 flex flex-col justify-end z-10 mask-gradient-to-t pointer-events-none">
            <div className="flex flex-col gap-3 pb-2 pointer-events-auto">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300"
                >
                  <Avatar className="w-8 h-8 border border-white/20 shrink-0 shadow-sm">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]">
                    <span className="text-[11px] font-bold text-white/70">
                      {comment.user}
                    </span>
                    <span className="text-sm text-white drop-shadow-sm leading-tight">
                      {comment.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Reactions */}
          <div className="absolute top-0 bottom-0 right-0 w-32 pointer-events-none z-0 overflow-hidden">
            {reactions.map((reaction) => (
              <div
                key={reaction.id}
                className="absolute bottom-20 animate-float-up-fade"
                style={{ left: `${reaction.left}%` }}
              >
                {reaction.type === 'heart' && (
                  <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                )}
                {reaction.type === 'flame' && (
                  <Flame className="w-7 h-7 text-orange-500 fill-orange-500" />
                )}
                {reaction.type === 'trophy' && (
                  <Trophy className="w-7 h-7 text-yellow-400 fill-yellow-400" />
                )}
              </div>
            ))}
          </div>

          {/* Action buttons bottom right */}
          <div className="absolute bottom-6 right-4 flex flex-col gap-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/40 backdrop-blur-md text-white rounded-full h-12 w-12 border border-white/10 hover:bg-black/60 shadow-lg"
              onClick={toggleAudio}
            >
              {hasAudio ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5 text-red-400" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/40 backdrop-blur-md text-white rounded-full h-12 w-12 border border-white/10 hover:bg-black/60 shadow-lg"
              onClick={toggleVideo}
            >
              <SwitchCamera className="w-5 h-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
