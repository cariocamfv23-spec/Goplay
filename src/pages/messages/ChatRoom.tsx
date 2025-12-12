import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Mic, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useRef } from 'react'

const ChatRoom = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const bottomRef = useRef<HTMLDivElement>(null)

  // Mock messages
  const messages = [
    {
      id: 1,
      text: 'E aí, tudo certo para o treino?',
      sender: 'them',
      time: '10:00',
    },
    {
      id: 2,
      text: 'Tudo certo! Que horas mesmo?',
      sender: 'me',
      time: '10:02',
    },
    { id: 3, text: 'Às 19h no clube.', sender: 'them', time: '10:05' },
    { id: 4, text: 'Fechado. Até lá!', sender: 'me', time: '10:06' },
  ]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      {/* Custom Header since Layout header might be hidden or generic */}
      <div className="h-14 border-b flex items-center px-4 gap-3 bg-background/80 backdrop-blur shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="-ml-2"
          onClick={() => navigate('/messages')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${id}`}
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="font-semibold">User {id}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                msg.sender === 'me'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-secondary text-foreground rounded-bl-none'
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-background shrink-0 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          placeholder="Mensagem..."
          className="rounded-full bg-secondary border-none"
        />
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground"
        >
          <Mic className="h-5 w-5" />
        </Button>
        <Button size="icon" className="rounded-full shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ChatRoom
