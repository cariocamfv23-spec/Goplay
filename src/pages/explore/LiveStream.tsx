import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockLiveEvents } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Send,
  Heart,
  Share2,
  MoreVertical,
  Eye,
  BarChart2,
  CheckCircle2,
  X,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function LiveStream() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = mockLiveEvents.find((e) => e.id === id) || mockLiveEvents[0]
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, user: 'João Silva', text: 'Golaço!', time: 'Agora' },
    { id: 2, user: 'Maria Souza', text: 'Vai timeeee!', time: '1min' },
    { id: 3, user: 'Pedro Santos', text: 'Juiz tá roubando', time: '2min' },
  ])

  // Simulated advanced interactive states
  const [poll, setPoll] = useState<{
    id: string
    question: string
    options: { id: number; text: string; votes: number }[]
    totalVotes: number
    isActive: boolean
  } | null>(null)
  const [votedOptionId, setVotedOptionId] = useState<number | null>(null)
  const [coHost, setCoHost] = useState<{
    name: string
    avatar: string
  } | null>(null)

  useEffect(() => {
    // Simulate poll appearing after 4s
    const pollTimer = setTimeout(() => {
      setPoll({
        id: 'poll-1',
        question: 'Quem vai fazer o primeiro gol?',
        options: [
          { id: 1, text: 'Red Wolves', votes: 120 },
          { id: 2, text: 'Blue Sharks', votes: 85 },
        ],
        totalVotes: 205,
        isActive: true,
      })
    }, 4000)

    // Simulate Co-host joining after 10s
    const coHostTimer = setTimeout(() => {
      setCoHost({
        name: 'João Silva',
        avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
      })
    }, 10000)

    return () => {
      clearTimeout(pollTimer)
      clearTimeout(coHostTimer)
    }
  }, [])

  // Simulate incoming votes
  useEffect(() => {
    if (poll?.isActive) {
      const timer = setTimeout(() => {
        setPoll((prev) => {
          if (!prev || !prev.isActive) return prev
          const newOpts = [...prev.options]
          newOpts[0].votes += Math.floor(Math.random() * 3)
          newOpts[1].votes += Math.floor(Math.random() * 3)
          return {
            ...prev,
            options: newOpts,
            totalVotes: newOpts[0].votes + newOpts[1].votes,
          }
        })
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [poll])

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMessages([
      { id: Date.now(), user: 'Você', text: message, time: 'Agora' },
      ...messages,
    ])
    setMessage('')
  }

  const handleVote = (optId: number) => {
    if (votedOptionId !== null || !poll?.isActive) return
    setVotedOptionId(optId)
    setPoll((prev) => {
      if (!prev) return prev
      const newOpts = prev.options.map((o) =>
        o.id === optId ? { ...o, votes: o.votes + 1 } : o,
      )
      return {
        ...prev,
        options: newOpts,
        totalVotes: prev.totalVotes + 1,
      }
    })
  }

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
          <Badge variant="destructive" className="animate-pulse font-bold px-2">
            AO VIVO
          </Badge>
          <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
            <Eye className="h-3 w-3" />
            <span className="text-xs font-mono">{event.viewers}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Area */}
      <div
        className={cn(
          'relative w-full bg-zinc-900 mt-0 flex flex-col md:flex-row items-center justify-center group overflow-hidden transition-all duration-500',
          coHost ? 'aspect-[4/5] md:aspect-video' : 'aspect-video',
        )}
      >
        {/* Main Streamer Feed */}
        <div
          className={cn(
            'relative w-full h-full',
            coHost ? 'h-1/2 md:w-1/2 md:h-full' : '',
          )}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          {!coHost && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          )}
        </div>

        {/* Co-host Split Screen Feed */}
        {coHost && (
          <div className="relative w-full h-1/2 md:w-1/2 md:h-full bg-zinc-800 border-t md:border-t-0 md:border-l border-white/20 animate-in slide-in-from-bottom md:slide-in-from-right duration-500">
            <img
              src={coHost.avatar}
              className="w-full h-full object-cover opacity-90"
              alt={coHost.name}
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-2 shadow-sm">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {coHost.name}
            </div>
          </div>
        )}

        {/* Stream Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
          <h1 className="text-lg font-bold leading-tight text-white">
            {event.title}
          </h1>
          <p className="text-sm text-gray-300">
            {event.championship} • {event.score}
          </p>
        </div>

        {/* Live Poll Overlay */}
        {poll && (
          <div className="absolute top-16 right-4 left-4 md:left-auto md:w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 z-20 shadow-2xl animate-in slide-in-from-right fade-in duration-300">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-white font-bold text-sm bg-primary/20 text-primary px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" />
                {poll.isActive ? 'Enquete Ao Vivo' : 'Enquete Encerrada'}
              </h4>
              {!poll.isActive && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/50 hover:text-white"
                  onClick={() => setPoll(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="text-white font-medium mb-5 text-sm leading-snug">
              {poll.question}
            </p>
            <div className="space-y-2.5">
              {poll.options.map((opt) => {
                const percent =
                  poll.totalVotes > 0
                    ? Math.round((opt.votes / poll.totalVotes) * 100)
                    : 0
                const isSelected = votedOptionId === opt.id

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleVote(opt.id)}
                    disabled={votedOptionId !== null || !poll.isActive}
                    className={cn(
                      'relative w-full text-left rounded-xl overflow-hidden p-3 flex justify-between items-center transition-all duration-200',
                      votedOptionId !== null || !poll.isActive
                        ? isSelected
                          ? 'bg-primary/20 border border-primary/50'
                          : 'bg-white/5 border border-transparent'
                        : 'bg-white/10 hover:bg-white/20 border border-transparent cursor-pointer',
                    )}
                  >
                    {(votedOptionId !== null || !poll.isActive) && (
                      <div
                        className="absolute top-0 bottom-0 left-0 bg-primary/30 transition-all duration-1000 ease-out"
                        style={{ width: `${percent}%` }}
                      />
                    )}
                    <span className="relative z-10 text-white text-sm font-medium flex items-center gap-2">
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      )}
                      {opt.text}
                    </span>
                    {(votedOptionId !== null || !poll.isActive) && (
                      <span className="relative z-10 text-white/90 text-xs font-bold shrink-0 pl-2">
                        {percent}%
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <div className="mt-5 flex justify-between items-center text-xs font-medium text-white/50">
              <span>{poll.totalVotes} votos computados</span>
            </div>
          </div>
        )}
      </div>

      {/* Live Chat & Interaction Area */}
      <div className="flex-1 flex flex-col bg-background/95 backdrop-blur-xl relative rounded-t-3xl -mt-4 z-10 overflow-hidden border-t border-white/10">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h2 className="font-bold text-sm text-foreground">Chat ao Vivo</h2>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-red-500"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex gap-3 items-start animate-in slide-in-from-bottom-2 duration-300"
              >
                <Avatar className="h-8 w-8 border border-white/10">
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${msg.id}`}
                  />
                  <AvatarFallback className="text-xs bg-zinc-800 text-zinc-400">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-gray-200">
                      {msg.user}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-zinc-900 border-t border-white/5">
          <div className="relative flex items-center gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="bg-zinc-800 border-none text-white placeholder:text-gray-500 rounded-full pr-10 focus-visible:ring-1 focus-visible:ring-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              size="icon"
              className="absolute right-1 rounded-full w-8 h-8 bg-primary hover:bg-primary/90"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
