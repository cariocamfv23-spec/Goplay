import { useParams, useNavigate } from 'react-router-dom'
import { mockChats } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Video, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function ChatRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const chat = mockChats.find((c) => c.id === id) || mockChats[0]
  const [msg, setMsg] = useState('')

  return (
    <div className="flex flex-col h-screen bg-background animate-fade-in">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2"
            onClick={() => navigate('/messages')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src={chat.user.avatar} />
            <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-sm">{chat.user.name}</h3>
            <span className="text-xs text-green-500 block">Online</span>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages?.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex',
              m.sender === 'me' ? 'justify-end' : 'justify-start',
            )}
          >
            <div
              className={cn(
                'max-w-[75%] px-4 py-2 rounded-2xl text-sm',
                m.sender === 'me'
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-secondary text-secondary-foreground rounded-tl-none',
              )}
            >
              <p>{m.text}</p>
              <span className="text-[10px] opacity-70 block text-right mt-1">
                {m.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-background border-t border-border/50 flex gap-2">
        <Input
          placeholder="Digite uma mensagem..."
          className="flex-1 rounded-full bg-secondary border-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button size="icon" className="rounded-full shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
