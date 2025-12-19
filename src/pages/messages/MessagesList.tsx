import { mockChats } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CallHistory } from '@/pages/messages/CallHistory'

export default function MessagesList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <Tabs defaultValue="chats" className="w-full">
        <div className="sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border/50">
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Mensagens</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/messages/new')}
              >
                <Edit className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-9 bg-secondary border-none rounded-xl"
              />
            </div>
            <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 border-b border-transparent">
              <TabsTrigger
                value="chats"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3"
              >
                Conversas
              </TabsTrigger>
              <TabsTrigger
                value="calls"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3"
              >
                Chamadas
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="chats" className="mt-0">
          <div className="p-4 pt-2 space-y-2">
            {mockChats.map((chat) => (
              <Card
                key={chat.id}
                className="border-none shadow-none bg-transparent hover:bg-secondary/30 transition-colors cursor-pointer rounded-xl"
                onClick={() => navigate(`/messages/${chat.id}`)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border border-border/50">
                      <AvatarImage src={chat.user.avatar} />
                      <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.user.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {chat.user.name}
                      </h3>
                      <span className="text-[10px] text-muted-foreground">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground truncate pr-2">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] shadow-sm">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calls" className="mt-0">
          <CallHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
