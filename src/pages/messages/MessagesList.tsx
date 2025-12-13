import { mockChats } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function MessagesList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md p-4 border-b border-border/50 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mensagens</h1>
          <Button
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={() => navigate('/messages/new')}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            className="pl-9 rounded-xl bg-secondary/50 border-transparent focus:bg-background"
          />
        </div>
      </div>

      <div className="p-2">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigate(`/messages/${chat.id}`)}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-colors"
          >
            <div className="relative">
              <Avatar className="h-12 w-12 border border-border">
                <AvatarImage src={chat.user.avatar} />
                <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
              </Avatar>
              {chat.user.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <h3 className="font-semibold text-sm truncate">
                  {chat.user.name}
                </h3>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {chat.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate pr-2">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="h-5 min-w-[20px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
