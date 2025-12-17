import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockLiveEvents } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Send, Heart, Share2, MoreVertical, Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

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

  const handleSendMessage = () => {
    if (!message.trim()) return
    setMessages([
      { id: Date.now(), user: 'Você', text: message, time: 'Agora' },
      ...messages,
    ])
    setMessage('')
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

      {/* Video Area (Simulated) */}
      <div className="relative w-full aspect-video bg-zinc-900 mt-0 flex items-center justify-center group overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Play Button Overlay */}
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 animate-pulse">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </div>
        </div>

        {/* Stream Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
          <h1 className="text-lg font-bold leading-tight">{event.title}</h1>
          <p className="text-sm text-gray-300">
            {event.championship} • {event.score}
          </p>
        </div>
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
