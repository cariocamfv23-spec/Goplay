import { ChatMessage } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Play, FileText, Download, Mic } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

  return (
    <div
      className={cn(
        'flex w-full mb-4 animate-slide-up',
        isMe ? 'justify-end' : 'justify-start',
      )}
    >
      {!isMe && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarImage src={senderAvatar} />
          <AvatarFallback>{senderName?.[0]}</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2 relative shadow-sm',
          isMe
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-white dark:bg-zinc-800 text-foreground rounded-bl-none border border-border',
        )}
      >
        {!isMe && senderName && (
          <p className="text-[10px] text-primary font-bold mb-1 opacity-80">
            {senderName}
          </p>
        )}

        {/* Text Message */}
        {message.type === 'text' && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
        )}

        {/* Image Message */}
        {message.type === 'image' && (
          <div className="rounded-lg overflow-hidden my-1">
            <img
              src={message.mediaUrl}
              alt="Sent image"
              className="w-full h-auto max-h-[300px] object-cover"
            />
          </div>
        )}

        {/* Video Message */}
        {message.type === 'video' && (
          <div className="rounded-lg overflow-hidden my-1 relative group cursor-pointer">
            <img
              src={message.mediaUrl}
              alt="Video thumbnail"
              className="w-full h-auto max-h-[300px] object-cover opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/60">
                <Play className="h-4 w-4 text-white fill-white ml-0.5" />
              </div>
            </div>
          </div>
        )}

        {/* Audio Message */}
        {message.type === 'audio' && (
          <div className="flex items-center gap-3 min-w-[150px] py-1">
            <button className="h-8 w-8 rounded-full bg-background/20 flex items-center justify-center shrink-0 hover:bg-background/30 transition-colors">
              <Play className="h-3 w-3 fill-current" />
            </button>
            <div className="flex-1 space-y-1">
              <div className="h-1 w-full bg-current/20 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-current rounded-full" />
              </div>
              <p className="text-[10px] opacity-70">0:15</p>
            </div>
            <Mic className="h-4 w-4 opacity-50" />
          </div>
        )}

        {/* Document Message */}
        {message.type === 'document' && (
          <div className="flex items-center gap-3 bg-background/10 rounded-lg p-2 border border-current/10">
            <div className="h-10 w-10 bg-background/20 rounded flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-[10px] opacity-70">PDF • 2.4 MB</p>
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-background/10">
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}

        <div
          className={cn(
            'text-[10px] mt-1 text-right w-full block',
            isMe ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}
