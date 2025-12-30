import { Button } from '@/components/ui/button'
import { ArrowLeft, Bot, Trash2, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useBotDaVerdadeStore } from '@/stores/useBotDaVerdadeStore'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef } from 'react'

export default function BotDaVerdade() {
  const navigate = useNavigate()
  const { messages, isTyping, sendMessage, clearHistory, generateEvaluation } =
    useBotDaVerdadeStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-zinc-900/50 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-red-600/20 rounded-xl flex items-center justify-center border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <Bot className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">
                BOT DA VERDADE
              </h1>
              <p className="text-[10px] text-red-400 font-medium uppercase tracking-wider flex items-center gap-1">
                <Zap className="h-3 w-3" /> Análise Sem Filtro
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={clearHistory}
          className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
          title="Limpar Histórico"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-zinc-500 text-xs animate-pulse ml-2">
              <Bot className="h-3 w-3" />
              <span>Analisando dados...</span>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions (if empty state or explicit call to action needed) */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 z-10 max-w-3xl mx-auto w-full">
          <Button
            variant="outline"
            className="w-full bg-red-950/20 border-red-900/30 text-red-200 hover:bg-red-900/40 hover:text-white transition-all"
            onClick={generateEvaluation}
          >
            <Zap className="mr-2 h-4 w-4 text-red-500" />
            Gerar Avaliação Completa
          </Button>
        </div>
      )}

      {/* Input Area */}
      <div className="relative z-10">
        <ChatInput
          onSendMessage={(msg) => {
            if (msg.text) sendMessage(msg.text)
          }}
        />
      </div>
    </div>
  )
}
