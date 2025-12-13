import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Send, Bot, Sparkles, Mic } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  time: string
}

export default function AiCoach() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Olá, atleta! Sou seu Coach IA. Analisei seus últimos 3 jogos e notei que sua taxa de acerto de passes caiu no segundo tempo. Vamos trabalhar resistência ou foco?',
      time: 'Agora',
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      time: 'Agora',
    }
    setMessages((prev) => [...prev, newMsg])
    setInput('')

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Entendido. Recomendo focarmos em treinos intervalados de alta intensidade (HIIT) para melhorar sua recuperação cardiovascular. Vou adicionar um plano ao seu calendário.',
        time: 'Agora',
      }
      setMessages((prev) => [...prev, aiMsg])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="font-bold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" /> Coach IA
          </h1>
          <span className="text-xs text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
          </span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sparkles className="h-5 w-5 text-gold" />
        </Button>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4 bg-secondary/20">
        <div className="space-y-4 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex w-full',
                msg.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={cn(
                  'flex gap-2 max-w-[80%]',
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                )}
              >
                <Avatar className="h-8 w-8 mt-1 border border-border">
                  {msg.role === 'assistant' ? (
                    <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                      <Bot className="h-5 w-5" />
                    </div>
                  ) : (
                    <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
                  )}
                  <AvatarFallback>
                    {msg.role === 'user' ? 'EU' : 'AI'}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    'p-3 rounded-2xl text-sm shadow-sm',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-card text-card-foreground rounded-tl-none border',
                  )}
                >
                  <p>{msg.text}</p>
                  <span
                    className={cn(
                      'text-[10px] block mt-1 opacity-70',
                      msg.role === 'user' ? 'text-right' : 'text-left',
                    )}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <div className="relative flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre seu desempenho..."
            className="rounded-full bg-secondary border-none pr-10"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="absolute right-0 rounded-full h-10 w-10 bg-primary text-white hover:bg-primary/90"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
