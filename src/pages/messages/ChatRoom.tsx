import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Info,
  Shield,
  Briefcase,
  Trophy,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useRef, useState } from 'react'
import {
  getMockMessages,
  ChatMessage,
  mockChats,
  mockProfiles,
  Chat,
} from '@/lib/data'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { Badge } from '@/components/ui/badge'

const ChatRoom = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatInfo, setChatInfo] = useState<Partial<Chat>>({
    name: 'Carregando...',
    avatar: '',
    type: 'direct',
  })

  useEffect(() => {
    // Load chat info and messages
    if (id) {
      const existingChat = mockChats.find((c) => c.id === id)
      if (existingChat) {
        setChatInfo(existingChat)
      } else if (id.startsWith('user-')) {
        const userId = id.replace('user-', '')
        const user = mockProfiles.find((p) => p.id === userId)
        if (user) {
          setChatInfo({
            name: user.name,
            avatar: user.avatar,
            type: 'direct',
          })
        } else {
          setChatInfo({
            name: 'Usuário',
            avatar: '',
            type: 'direct',
          })
        }
      } else {
        // Fallback generic
        setChatInfo({
          name: 'Chat',
          avatar: '',
          type: 'direct',
        })
      }

      setMessages(getMockMessages(id))
    }
  }, [id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (msg: Partial<ChatMessage>) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      isMe: true,
      text: msg.text,
      type: msg.type || 'text',
      mediaUrl: msg.mediaUrl,
      fileName: msg.fileName,
      timestamp: msg.timestamp || 'Agora',
    }
    setMessages([...messages, newMessage])
  }

  const renderContextBadge = () => {
    if (chatInfo.type === 'event') {
      return (
        <Badge
          variant="outline"
          className="ml-2 bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
        >
          <Trophy className="h-3 w-3 mr-1" /> Evento
        </Badge>
      )
    }
    if (chatInfo.type === 'job') {
      return (
        <Badge
          variant="outline"
          className="ml-2 bg-blue-500/10 text-blue-600 border-blue-500/20"
        >
          <Briefcase className="h-3 w-3 mr-1" /> Vaga
        </Badge>
      )
    }
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="h-16 border-b flex items-center px-2 gap-2 bg-background/95 backdrop-blur z-20 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/messages')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <div className="relative">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={chatInfo.avatar} />
              <AvatarFallback>{chatInfo.name?.[0]}</AvatarFallback>
            </Avatar>
            {chatInfo.online && (
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center">
              <span className="font-semibold truncate text-sm">
                {chatInfo.name}
              </span>
              {renderContextBadge()}
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {chatInfo.online ? 'Online' : 'Visto por último hoje às 10:30'}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-secondary/10">
        <div className="flex flex-col">
          <div className="text-center my-4">
            <span className="text-xs bg-secondary px-3 py-1 rounded-full text-muted-foreground">
              Hoje
            </span>
          </div>
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              senderAvatar={chatInfo.avatar}
              senderName={chatInfo.type === 'group' ? 'Member' : undefined}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatRoom
