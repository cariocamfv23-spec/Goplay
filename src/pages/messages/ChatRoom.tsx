import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { mockChats, mockProfiles, mockTalents } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Video, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { CallOverlay } from '@/components/chat/CallOverlay'
import { toast } from 'sonner'

export default function ChatRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [msg, setMsg] = useState('')
  const [isCallOpen, setIsCallOpen] = useState(false)
  const [callType, setCallType] = useState<'voice' | 'video'>('voice')

  // Auto-start call from query params
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'voice') {
      handleStartCall('voice')
    } else if (action === 'video') {
      handleStartCall('video')
    }
  }, [searchParams])

  // Enhanced chat finding/mocking logic
  let chat = mockChats.find((c) => c.id === id)

  // If no chat found (e.g. starting new chat from profile), create a mock one
  if (!chat) {
    const mockId = id?.replace('user-', '') || 'unknown'
    const profileUser =
      mockProfiles.find((p) => p.id === mockId) ||
      mockTalents.find((p) => p.id === mockId)

    chat = {
      id: id || 'temp',
      user: {
        id: mockId,
        name: profileUser ? profileUser.name : `Usuário ${mockId}`,
        avatar: profileUser
          ? profileUser.avatar
          : `https://img.usecurling.com/ppl/medium?gender=male&seed=${mockId}`,
        online: true,
        type: profileUser ? (profileUser.type as any) : 'User',
      },
      messages: [],
      unread: 0,
      lastMessage: '',
      time: 'Agora',
    }
  }

  const handleStartCall = (type: 'voice' | 'video') => {
    setCallType(type)
    setIsCallOpen(true)
    toast.info(`Iniciando chamada de ${type === 'voice' ? 'voz' : 'vídeo'}...`)
  }

  const handleSendMessage = () => {
    if (!msg.trim()) return
    // Here we would actually send the message
    setMsg('')
    toast.success('Mensagem enviada')
  }

  return (
    <div className="flex flex-col h-screen bg-background animate-fade-in relative">
      {/* Call Overlay */}
      <CallOverlay
        isOpen={isCallOpen}
        type={callType}
        user={chat.user}
        onEndCall={() => setIsCallOpen(false)}
      />

      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/profile/${chat?.user.id}`)}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={chat.user.avatar} />
              <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="font-bold text-sm">{chat.user.name}</h3>
            {chat.user.online && (
              <span className="text-xs text-green-500 block">Online</span>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleStartCall('voice')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleStartCall('video')}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages && chat.messages.length > 0 ? (
          chat.messages?.map((m) => (
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
            <div className="h-16 w-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
              <Send className="h-6 w-6 opacity-20" />
            </div>
            <p className="text-sm">Inicie a conversa com {chat.user.name}</p>
            <p className="text-xs opacity-50 mt-1">
              Mande um "Oi" para começar!
            </p>
          </div>
        )}
      </div>

      <div className="p-3 bg-background border-t border-border/50 flex gap-2 pb-safe">
        <Input
          placeholder="Digite uma mensagem..."
          className="flex-1 rounded-full bg-secondary border-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          size="icon"
          className="rounded-full shrink-0"
          onClick={handleSendMessage}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
