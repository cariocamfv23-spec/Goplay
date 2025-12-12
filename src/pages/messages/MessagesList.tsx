import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MessagesList = () => {
  const navigate = useNavigate()
  const chats = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    lastMessage: i % 2 === 0 ? 'Beleza, combinado!' : 'Qual o horário do jogo?',
    time: '10:30',
    unread: i < 2,
  }))

  return (
    <div className="p-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar conversas"
          className="pl-9 bg-secondary border-none rounded-xl"
        />
      </div>

      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-xl cursor-pointer transition-colors"
            onClick={() => navigate(`/messages/${chat.id}`)}
          >
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage
                src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${chat.id}`}
              />
              <AvatarFallback>U{chat.id}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {chat.time}
                </span>
              </div>
              <p
                className={`text-sm truncate ${chat.unread ? 'font-bold text-foreground' : 'text-muted-foreground'}`}
              >
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread && (
              <div className="h-2.5 w-2.5 bg-primary rounded-full shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessagesList
