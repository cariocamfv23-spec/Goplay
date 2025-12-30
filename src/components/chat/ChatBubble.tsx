import { ChatMessage } from '@/types/chat'
import { cn } from '@/lib/utils'
import {
  Play,
  FileText,
  Download,
  Mic,
  Bot,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Target,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface ChatBubbleProps {
  message: ChatMessage
  senderAvatar?: string
  senderName?: string
}

export function ChatBubble({
  message,
  senderAvatar,
  senderName,
}: ChatBubbleProps) {
  const isMe = message.isMe
  const isBot = message.sender === 'bot'

  return (
    <div
      className={cn(
        'flex w-full mb-4 animate-fade-in-up',
        isMe ? 'justify-end' : 'justify-start',
      )}
    >
      {!isMe && (
        <Avatar
          className={cn(
            'h-8 w-8 mr-2 mt-1 shadow-sm',
            isBot ? 'bg-zinc-900 border border-zinc-700' : '',
          )}
        >
          {isBot ? (
            <div className="flex items-center justify-center w-full h-full bg-zinc-950">
              <Bot className="h-5 w-5 text-red-500" />
            </div>
          ) : (
            <>
              <AvatarImage src={senderAvatar} />
              <AvatarFallback>{senderName?.[0]}</AvatarFallback>
            </>
          )}
        </Avatar>
      )}

      <div
        className={cn(
          'max-w-[85%] md:max-w-[60%] rounded-2xl px-4 py-3 relative shadow-sm',
          isMe
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : isBot
              ? 'bg-zinc-900 text-zinc-100 rounded-bl-none border border-red-900/30'
              : 'bg-white dark:bg-zinc-800 text-foreground rounded-bl-none border border-border',
        )}
      >
        {!isMe && senderName && !isBot && (
          <p className="text-[10px] text-primary font-bold mb-1 opacity-80 uppercase tracking-wide">
            {senderName}
          </p>
        )}
        {!isMe && isBot && (
          <p className="text-[10px] text-red-500 font-bold mb-1 opacity-90 uppercase tracking-wide flex items-center gap-1">
            Bot da Verdade <AlertTriangle className="h-3 w-3" />
          </p>
        )}

        {/* Text Message */}
        {message.type === 'text' && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
        )}

        {/* Evaluation Message */}
        {message.type === 'evaluation' && message.evaluationData && (
          <div className="space-y-3 mt-1">
            <p className="text-sm leading-relaxed mb-2">{message.text}</p>
            <Card className="bg-black/40 border-red-500/30">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center justify-between">
                  Relatório Técnico
                  <Badge
                    variant="outline"
                    className="border-red-500/50 text-red-400 text-[10px]"
                  >
                    CONFIDENCIAL
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-300">
                    Score Geral
                  </span>
                  <span className="text-2xl font-black text-white">
                    {message.evaluationData.score}
                    <span className="text-xs text-zinc-500 font-normal">
                      /100
                    </span>
                  </span>
                </div>
                <Progress
                  value={message.evaluationData.score}
                  className="h-2 bg-zinc-800"
                  indicatorClassName={cn(
                    message.evaluationData.score > 75
                      ? 'bg-green-500'
                      : message.evaluationData.score > 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500',
                  )}
                />

                <div className="bg-red-950/30 p-2 rounded border border-red-900/30">
                  <p className="text-xs text-red-200 font-medium leading-relaxed">
                    <span className="font-bold text-red-500">
                      REALITY CHECK:
                    </span>{' '}
                    {message.evaluationData.realityCheck}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" /> PONTOS
                      FORTES
                    </p>
                    <ul className="text-[10px] text-zinc-300 list-disc list-inside">
                      {message.evaluationData.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-red-500" /> PONTOS
                      FRACOS
                    </p>
                    <ul className="text-[10px] text-zinc-300 list-disc list-inside">
                      {message.evaluationData.weaknesses.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Veredito:</span>
                    <span className="font-bold text-white tracking-wide">
                      {message.evaluationData.verdict}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Image Message */}
        {message.type === 'image' && (
          <div className="rounded-lg overflow-hidden my-1 shadow-sm">
            <img
              src={message.mediaUrl}
              alt="Sent image"
              className="w-full h-auto max-h-[300px] object-cover"
            />
          </div>
        )}

        {/* Video Message */}
        {message.type === 'video' && (
          <div className="rounded-lg overflow-hidden my-1 relative group cursor-pointer shadow-sm">
            <img
              src={message.mediaUrl}
              alt="Video thumbnail"
              className="w-full h-auto max-h-[300px] object-cover opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/60 shadow-lg">
                <Play className="h-5 w-5 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        )}

        {/* Document Message */}
        {message.type === 'document' && (
          <div className="flex items-center gap-3 bg-background/10 rounded-xl p-3 border border-current/10">
            <div className="h-10 w-10 bg-background/20 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {message.fileName}
              </p>
              <p className="text-[10px] opacity-70">PDF • 2.4 MB</p>
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-background/10 transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Audio Message */}
        {message.type === 'audio' && (
          <div className="flex items-center gap-3 min-w-[180px] py-1">
            <button className="h-10 w-10 rounded-full bg-background/20 flex items-center justify-center shrink-0 hover:bg-background/30 transition-colors">
              <Play className="h-4 w-4 fill-current" />
            </button>
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-full bg-current/20 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-current rounded-full" />
              </div>
              <p className="text-[10px] opacity-70 font-medium">0:15 / 1:30</p>
            </div>
            <Mic className="h-4 w-4 opacity-50" />
          </div>
        )}

        <div
          className={cn(
            'text-[10px] mt-1 text-right w-full block',
            isMe
              ? 'text-primary-foreground/70'
              : isBot
                ? 'text-zinc-500'
                : 'text-muted-foreground',
          )}
        >
          {message.time || message.timestamp}
        </div>
      </div>
    </div>
  )
}
