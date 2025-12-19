import { mockCalls } from '@/lib/mock-calls'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Video,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function CallHistory() {
  const navigate = useNavigate()

  const handleCall = (
    userId: string,
    isVideo: boolean,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation()
    navigate(`/messages/${userId}?action=${isVideo ? 'video' : 'voice'}`)
  }

  if (mockCalls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="h-16 w-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
          <Phone className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Sem histórico de chamadas
        </h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">
          Suas chamadas recentes aparecerão aqui. Inicie uma nova conversa para
          ligar.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1 p-4 pt-2 animate-fade-in-up">
      {mockCalls.map((call) => (
        <div
          key={call.id}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 active:bg-secondary/50 transition-colors cursor-pointer group border border-transparent hover:border-border/50"
          onClick={() => navigate(`/messages/${call.user.id}`)}
        >
          <div className="relative">
            <Avatar className="h-12 w-12 border border-border/50">
              <AvatarImage src={call.user.avatar} />
              <AvatarFallback>{call.user.name[0]}</AvatarFallback>
            </Avatar>
            {call.type === 'missed' && (
              <span className="absolute -bottom-1 -right-1 h-5 w-5 bg-background rounded-full flex items-center justify-center">
                <PhoneMissed className="h-3 w-3 text-red-500 fill-red-500/20" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3
                className={cn(
                  'font-semibold text-sm truncate',
                  call.type === 'missed' ? 'text-red-500' : 'text-foreground',
                )}
              >
                {call.user.name}
              </h3>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                {call.date}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {call.type === 'outgoing' && (
                <PhoneOutgoing className="h-3 w-3" />
              )}
              {call.type === 'incoming' && (
                <PhoneIncoming className="h-3 w-3" />
              )}
              {call.type === 'missed' && (
                <span className="text-red-500/80 font-medium">Perdida</span>
              )}

              {call.type !== 'missed' && <span>• {call.duration}</span>}

              {call.isVideo && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <div className="flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    <span>Vídeo</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 opacity-70 group-hover:opacity-100 transition-all"
            onClick={(e) => handleCall(call.user.id, call.isVideo, e)}
          >
            {call.isVideo ? (
              <Video className="h-5 w-5" />
            ) : (
              <Phone className="h-5 w-5" />
            )}
          </Button>
        </div>
      ))}
    </div>
  )
}
