import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Search,
  PenSquare,
  Users,
  MessageCircle,
  Briefcase,
  Trophy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockChats, Chat } from '@/lib/data'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MessagesList = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'groups' | 'contexts'>('all')

  const filteredChats = mockChats.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (filter === 'groups') return chat.type === 'group'
    if (filter === 'contexts')
      return chat.type === 'event' || chat.type === 'job'
    return true
  })

  const getChatIcon = (type: Chat['type']) => {
    switch (type) {
      case 'group':
        return <Users className="h-3 w-3" />
      case 'event':
        return <Trophy className="h-3 w-3" />
      case 'job':
        return <Briefcase className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="pb-24 min-h-screen bg-background">
      <div className="sticky top-14 z-20 bg-background/95 backdrop-blur pt-2 px-4 pb-2 border-b border-border/50">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
          <Button
            size="icon"
            className="rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate('/messages/new')}
          >
            <PenSquare className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar conversas..."
            className="pl-9 bg-secondary border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(v) => setFilter(v as any)}
        >
          <TabsList className="w-full grid grid-cols-3 rounded-xl bg-secondary/50 p-1">
            <TabsTrigger value="all" className="rounded-lg text-xs">
              Todas
            </TabsTrigger>
            <TabsTrigger value="groups" className="rounded-lg text-xs">
              Grupos
            </TabsTrigger>
            <TabsTrigger value="contexts" className="rounded-lg text-xs">
              Eventos/Vagas
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-2 mt-2 space-y-1">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 hover:bg-secondary/30 rounded-xl cursor-pointer transition-all active:scale-[0.99] group"
            onClick={() => navigate(`/messages/${chat.id}`)}
          >
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-border group-hover:border-primary/50 transition-colors">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              {chat.type !== 'direct' && (
                <div className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full border border-border">
                  <div className="h-5 w-5 bg-secondary rounded-full flex items-center justify-center text-foreground">
                    {getChatIcon(chat.type)}
                  </div>
                </div>
              )}
              {chat.online && chat.type === 'direct' && (
                <div className="absolute bottom-1 right-1 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-semibold truncate text-base">
                  {chat.name}
                </h3>
                <span
                  className={`text-xs whitespace-nowrap ml-2 ${chat.unreadCount > 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                >
                  {chat.lastMessageTime}
                </span>
              </div>
              <p
                className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
              >
                {chat.lastMessage}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <div className="min-w-[20px] h-5 px-1.5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-bold text-white">
                  {chat.unreadCount}
                </span>
              </div>
            )}
          </div>
        ))}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center opacity-50">
            <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-medium">Nenhuma conversa encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesList
