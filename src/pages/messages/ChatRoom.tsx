import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { mockChats, mockProfiles, mockTalents } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState, useEffect, useRef, useMemo } from 'react'
import { CallOverlay } from '@/components/chat/CallOverlay'
import { toast } from 'sonner'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatMessage } from '@/types/chat'

export default function ChatRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isCallOpen, setIsCallOpen] = useState(false)
  const [callType, setCallType] = useState<'voice' | 'video'>('voice')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-start call from query params
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'voice') {
      handleStartCall('voice')
    } else if (action === 'video') {
      handleStartCall('video')
    }
  }, [searchParams])

  // Memoize chat to avoid infinite loop in useEffect when adding chat.messages to dependencies
  const chat = useMemo(() => {
    const chatData = mockChats.find((c) => c.id === id)

    if (chatData) return chatData

    const mockId = id?.replace('user-', '') || 'unknown'
    const profileUser =
      mockProfiles.find((p) => p.id === mockId) ||
      mockTalents.find((p) => p.id === mockId)

    return {
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
  }, [id])

  // Initialize messages state
  useEffect(() => {
    if (chat?.messages) {
      const initialMessages: ChatMessage[] = chat.messages.map((m) => ({
        ...m,
        type: (m.type as any) || 'text',
        isMe: m.sender === 'me',
        mediaUrl: m.mediaUrl || undefined,
        fileName: m.fileName || undefined,
      }))
      setMessages(initialMessages)
    }
  }, [chat?.messages])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleStartCall = (type: 'voice' | 'video') => {
    setCallType(type)
    setIsCallOpen(true)
    toast.info(`Iniciando chamada de ${type === 'voice' ? 'voz' : 'vídeo'}...`)
  }

  const handleSendMessage = (newMsg: Partial<ChatMessage>) => {
    const message: ChatMessage = {
      id: `new-${Date.now()}`,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      type: 'text',
      isMe: true,
      ...newMsg,
    }

    setMessages((prev) => [...prev, message])

    // Play sound or vibration could go here
    if (message.type === 'text') {
      // toast.success('Mensagem enviada')
    } else {
      toast.success('Mídia enviada')
    }
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

      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-3 border-b border-border/50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 hover:bg-secondary/50"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div
            className="cursor-pointer flex items-center gap-3"
            onClick={() => navigate(`/profile/${chat?.user.id}`)}
          >
            <div className="relative">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={chat.user.avatar} />
                <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
              </Avatar>
              {chat.user.online && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-background rounded-full"></span>
              )}
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-sm leading-none mb-1">
                {chat.user.name}
              </h3>
              <span className="text-xs text-muted-foreground block">
                {chat.user.online ? 'Online' : 'Visto por último recentemente'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleStartCall('voice')}
            className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleStartCall('video')}
            className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50 dark:bg-black/20"
      >
        {messages.length > 0 ? (
          messages.map((m) => (
            <ChatBubble
              key={m.id}
              message={m}
              senderAvatar={chat?.user.avatar}
              senderName={chat?.user.name}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 animate-fade-in">
            <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
              <Avatar className="h-20 w-20 opacity-50">
                <AvatarImage src={chat?.user.avatar} />
                <AvatarFallback>{chat?.user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm font-medium">
              Inicie a conversa com {chat?.user.name}
            </p>
            <p className="text-xs opacity-50 mt-1">
              Suas mensagens e chamadas são protegidas.
            </p>
          </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
