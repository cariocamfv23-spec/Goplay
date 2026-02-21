import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockFeedUsers } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'
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
  CheckCircle,
  MonitorUp,
  UserPlus,
  BarChart2,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReplayStore } from '@/stores/useReplayStore'

export default function CreateLiveBroadcast() {
  const navigate = useNavigate()
  const { addReplay } = useReplayStore()
  const { toast } = useToast()
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

  // Advanced Broadcast Features
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const screenStreamRef = useRef<MediaStream | null>(null)

  const [coHost, setCoHost] = useState<{
    id: string
    name: string
    avatar: string
  } | null>(null)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  const [pollModalOpen, setPollModalOpen] = useState(false)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [activePoll, setActivePoll] = useState<{
    question: string
    options: { text: string; votes: number }[]
    totalVotes: number
    isActive: boolean
  } | null>(null)

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
        if (videoRef.current && !isScreenSharing) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Failed to get media devices', err)
      }
    }

    if (status === 'preview' || status === 'live') {
      initCamera()
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [status, isScreenSharing])

  // Live simulation intervals
  useEffect(() => {
    let timerInterval: NodeJS.Timeout
    let viewersInterval: NodeJS.Timeout
    let commentsInterval: NodeJS.Timeout
    let reactionsInterval: NodeJS.Timeout
    let pollInterval: NodeJS.Timeout

    if (status === 'live') {
      timerInterval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)

      viewersInterval = setInterval(() => {
        setViewers((prev) => {
          const change = Math.floor(Math.random() * 11) - 3
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
          )
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
                left: 50 + Math.random() * 40,
              },
            ].filter((r) => Date.now() - r.id < 3000),
          )
        }
      }, 800)

      if (activePoll && activePoll.isActive) {
        pollInterval = setInterval(() => {
          setActivePoll((prev) => {
            if (!prev || !prev.isActive) return prev
            const newOptions = [...prev.options]
            const randomOptIndex = Math.floor(Math.random() * newOptions.length)
            newOptions[randomOptIndex].votes += Math.floor(Math.random() * 3)
            const newTotal = newOptions.reduce((acc, opt) => acc + opt.votes, 0)
            return {
              ...prev,
              options: newOptions,
              totalVotes: newTotal,
            }
          })
        }, 2500)
      }
    }

    return () => {
      clearInterval(timerInterval)
      clearInterval(viewersInterval)
      clearInterval(commentsInterval)
      clearInterval(reactionsInterval)
      clearInterval(pollInterval)
    }
  }, [status, activePoll?.isActive])

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

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop())
        screenStreamRef.current = null
      }
      setIsScreenSharing(false)
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        })
        screenStreamRef.current = stream
        setIsScreenSharing(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false)
          screenStreamRef.current = null
          if (videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current
          }
        }
      } catch (err) {
        console.error('Screen sharing failed', err)
        toast({
          title: 'Permissão negada',
          description:
            'Não foi possível compartilhar a tela. Usando simulação.',
          variant: 'destructive',
        })
        setIsScreenSharing(true)
      }
    }
  }

  const handleInvite = (user: any) => {
    setInviteModalOpen(false)
    toast({
      title: `Convite enviado para ${user.name}`,
      description: 'Aguardando resposta...',
    })

    setTimeout(() => {
      setCoHost(user)
      toast({
        title: `${user.name} entrou na transmissão!`,
        className: 'bg-green-600 text-white border-none',
      })
    }, 4000)
  }

  const handleCreatePoll = () => {
    const validOptions = pollOptions.filter((o) => o.trim() !== '')
    if (!pollQuestion.trim() || validOptions.length < 2) return

    setActivePoll({
      question: pollQuestion,
      options: validOptions.map((text) => ({ text, votes: 0 })),
      totalVotes: 0,
      isActive: true,
    })
    setPollModalOpen(false)
    setPollQuestion('')
    setPollOptions(['', ''])

    toast({
      title: 'Enquete iniciada!',
      description: 'Seus espectadores já podem votar.',
    })
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleEndBroadcast = () => {
    setStatus('summary')
    addReplay({
      id: `rep-${Date.now()}`,
      title: 'Minha Transmissão Ao Vivo',
      championship: 'Transmissão Pessoal',
      modality: 'outros',
      city: 'Local',
      status: 'ended',
      viewers: `${peakViewers}`,
      image: 'https://img.usecurling.com/p/800/400?q=live%20stream%20recording',
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: formatTime(duration),
      date: 'Hoje',
    })
  }

  if (status === 'summary') {
    return (
      <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-6 text-white z-50">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <Radio className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Transmissão Encerrada</h1>
        <p className="text-zinc-400 mb-8">Aqui está o resumo da sua Live</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
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
              {(peakViewers * 1.5).toFixed(0)}
            </span>
            <span className="text-xs text-zinc-500 mt-1">
              Total de Contas Alcançadas
            </span>
          </div>
        </div>

        <div className="bg-emerald-500/10 text-emerald-400 px-4 py-3 rounded-xl mb-8 flex items-center gap-3 border border-emerald-500/20 w-full max-w-sm">
          <CheckCircle className="w-6 h-6 shrink-0" />
          <span className="text-sm font-medium leading-snug">
            Transmissão salva nos seus replays. Seus seguidores já podem
            assistir!
          </span>
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
      {/* Main Video Background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          'absolute object-cover transition-all duration-500 z-0',
          !hasVideo && !isScreenSharing && 'opacity-0',
          coHost
            ? 'top-0 left-0 w-full h-1/2 md:w-1/2 md:h-full'
            : 'inset-0 w-full h-full',
        )}
      />
      {!hasVideo && !isScreenSharing && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
            <CameraOff className="w-10 h-10 text-zinc-500" />
          </div>
        </div>
      )}

      {/* Simulated Screen Share Background */}
      {isScreenSharing && !screenStreamRef.current && (
        <div
          className={cn(
            'absolute bg-zinc-900 flex flex-col items-center justify-center z-[1] border-2 border-primary/50',
            coHost
              ? 'top-0 left-0 w-full h-1/2 md:w-1/2 md:h-full'
              : 'inset-0 w-full h-full',
          )}
        >
          <MonitorUp className="w-20 h-20 text-white/30 mb-4 animate-pulse" />
          <span className="text-white/80 text-xl font-bold">
            Tela Compartilhada (Simulação)
          </span>
        </div>
      )}

      {/* Co-Host Video Panel */}
      {coHost && (
        <div className="absolute bottom-0 left-0 w-full h-1/2 md:top-0 md:left-1/2 md:w-1/2 md:h-full bg-zinc-900 border-t md:border-t-0 md:border-l border-white/20 flex flex-col z-[2] animate-in slide-in-from-bottom md:slide-in-from-right duration-500">
          <img
            src={coHost.avatar}
            className="w-full h-full object-cover opacity-90"
            alt={coHost.name}
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {coHost.name}
          </div>
          <div className="absolute bottom-32 right-4 md:bottom-4 pointer-events-auto">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setCoHost(null)}
              className="rounded-full shadow-lg font-bold"
            >
              Remover Co-host
            </Button>
          </div>
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-[3]" />

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
            <div className="flex flex-wrap items-center gap-2 md:gap-3 max-w-[70%]">
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
              className="rounded-full font-bold shadow-lg shrink-0"
              onClick={handleEndBroadcast}
            >
              Encerrar
            </Button>
          </>
        )}
      </div>

      {/* Top Bar Indicator for Screen Sharing */}
      {isScreenSharing && status === 'live' && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-primary/90 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-4">
          <MonitorUp className="w-4 h-4" />
          Compartilhando Tela
        </div>
      )}

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
          <div className="absolute bottom-4 left-4 right-20 h-64 flex flex-col justify-end z-[4] mask-gradient-to-t pointer-events-none">
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
          <div className="absolute top-0 bottom-0 right-0 w-32 pointer-events-none z-[4] overflow-hidden">
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
          <div className="absolute bottom-6 right-4 flex flex-col gap-4 z-[5]">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'rounded-full h-12 w-12 border shadow-lg transition-colors',
                isScreenSharing
                  ? 'bg-primary border-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-black/40 backdrop-blur-md text-white border-white/10 hover:bg-black/60',
              )}
              onClick={toggleScreenShare}
            >
              <MonitorUp className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'bg-black/40 backdrop-blur-md text-white rounded-full h-12 w-12 border shadow-lg transition-colors',
                coHost
                  ? 'border-primary text-primary hover:bg-black/60'
                  : 'border-white/10 hover:bg-black/60',
              )}
              onClick={() => setInviteModalOpen(true)}
              disabled={!!coHost}
            >
              <UserPlus className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'rounded-full h-12 w-12 border shadow-lg transition-colors',
                activePoll
                  ? 'bg-primary border-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-black/40 backdrop-blur-md text-white border-white/10 hover:bg-black/60',
              )}
              onClick={() => setPollModalOpen(true)}
              disabled={!!activePoll?.isActive}
            >
              <BarChart2 className="w-5 h-5" />
            </Button>

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

      {/* Poll Overlay Display */}
      {activePoll && (
        <div className="absolute top-24 left-4 right-4 md:left-auto md:right-24 md:w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 z-[5] pointer-events-auto shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-white font-bold text-sm bg-primary/20 text-primary px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" />
              {activePoll.isActive ? 'Enquete Ao Vivo' : 'Enquete Encerrada'}
            </h4>
            {!activePoll.isActive && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white/50 hover:text-white"
                onClick={() => setActivePoll(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-white font-medium mb-5 text-sm leading-snug">
            {activePoll.question}
          </p>
          <div className="space-y-2.5">
            {activePoll.options.map((opt, i) => {
              const percent =
                activePoll.totalVotes > 0
                  ? Math.round((opt.votes / activePoll.totalVotes) * 100)
                  : 0
              return (
                <div
                  key={i}
                  className="relative bg-white/5 rounded-xl overflow-hidden p-3 flex justify-between items-center"
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-primary/40 transition-all duration-500 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                  <span className="relative z-10 text-white text-sm font-medium">
                    {opt.text}
                  </span>
                  <span className="relative z-10 text-white/90 text-xs font-bold pl-2 shrink-0">
                    {percent}%
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-5 flex justify-between items-center text-xs font-medium text-white/50">
            <span>{activePoll.totalVotes} votos</span>
            {activePoll.isActive && (
              <Button
                variant="destructive"
                size="sm"
                className="h-8 px-4 text-xs rounded-full font-bold"
                onClick={() =>
                  setActivePoll((prev) =>
                    prev ? { ...prev, isActive: false } : null,
                  )
                }
              >
                Encerrar
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Invite Co-host Modal */}
      {inviteModalOpen && (
        <div className="absolute inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 w-full max-w-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Convidar Co-host</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setInviteModalOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {mockFeedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-white/10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-white text-sm font-medium">
                      {user.name}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full font-bold px-4"
                    onClick={() => handleInvite(user)}
                  >
                    Convidar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Poll Modal */}
      {pollModalOpen && (
        <div className="absolute inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 w-full max-w-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Criar Enquete</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPollModalOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80 mb-2 block">Pergunta</Label>
                <Input
                  className="bg-black/50 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="Ex: Quem vai ganhar hoje?"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-white/80 block">Opções</Label>
                {pollOptions.map((opt, i) => (
                  <Input
                    key={i}
                    className="bg-black/50 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...pollOptions]
                      newOpts[i] = e.target.value
                      setPollOptions(newOpts)
                    }}
                    placeholder={`Opção ${i + 1}`}
                  />
                ))}
                {pollOptions.length < 4 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary w-full mt-2 hover:bg-primary/20 hover:text-primary rounded-xl"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Adicionar Opção
                  </Button>
                )}
              </div>
              <Button
                className="w-full rounded-xl font-bold h-12 mt-6"
                disabled={
                  !pollQuestion.trim() ||
                  pollOptions.filter((o) => o.trim()).length < 2
                }
                onClick={handleCreatePoll}
              >
                Iniciar Enquete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
