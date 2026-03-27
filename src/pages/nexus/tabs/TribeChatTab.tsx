import { useState, useRef, useEffect } from 'react'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatMessage } from '@/types/chat'
import { mockUser, mockFeedUsers } from '@/lib/data'
import { Tribe } from '@/stores/useNexusStore'
import { MessageSquare } from 'lucide-react'

interface TribeChatTabProps {
  tribe: Tribe
}

export function TribeChatTab({ tribe }: TribeChatTabProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Use a mix of mock users to simulate a lively chat
  const mockMembers = [mockFeedUsers[0], mockFeedUsers[1], mockFeedUsers[2]]

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'them',
      text: `E aí pessoal do ${tribe.name}! Bora marcar o próximo encontro?`,
      time: '09:00',
      type: 'text',
      isMe: false,
    },
    {
      id: 'm2',
      sender: 'them',
      text: 'Eu tô dentro! É só avisar o horário.',
      time: '09:15',
      type: 'text',
      isMe: false,
    },
    {
      id: 'm3',
      sender: 'them',
      text: 'Final de semana costuma ser melhor pra todo mundo.',
      time: '09:30',
      type: 'text',
      isMe: false,
    },
  ])

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (newMsg: Partial<ChatMessage>) => {
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      type: newMsg.type || 'text',
      isMe: true,
      ...newMsg,
    }
    setMessages((prev) => [...prev, message])
  }

  // Helper to assign mock users consistently to initial messages
  const getSenderData = (index: number, isMe?: boolean) => {
    if (isMe) return { name: mockUser.name, avatar: mockUser.avatar }
    const user = mockMembers[index % mockMembers.length]
    return { name: user.name, avatar: user.avatar }
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[65vh] bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm overflow-hidden animate-fade-in relative z-10">
      {/* Chat Header */}
      <div className="p-3 border-b border-border/50 bg-background/50 backdrop-blur-sm flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none">
              Chat da Tribo
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              {tribe.members.length} membros na comunidade
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-black/20 no-scrollbar"
      >
        <div className="text-center pb-4 pt-2">
          <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
            Início do Chat de {tribe.name}
          </span>
        </div>

        {messages.map((m, i) => {
          const sender = getSenderData(i, m.isMe)
          return (
            <ChatBubble
              key={m.id}
              message={m}
              senderName={sender.name}
              senderAvatar={sender.avatar}
            />
          )
        })}
      </div>

      {/* Input Area */}
      <div className="mt-auto z-10 shrink-0">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
