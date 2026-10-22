import { useState, useEffect, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Edit, MessageSquare, Loader2, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CallHistory } from "@/pages/messages/CallHistory"
import { useAuth } from "@/hooks/use-auth"
import { chatService, ConversationSummary } from "@/services/chat"

export default function MessagesList() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadConversations = useCallback(
    async (isBackground = false) => {
      if (!user?.id) {
        setLoading(false)
        return
      }
      if (!isBackground) setLoading(true)
      else setRefreshing(true)

      try {
        const list = await chatService.getMyConversations(user.id)
        setConversations(list)
      } catch (err) {
        console.error("Falha ao carregar conversas:", err)
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [user?.id],
  )

  useEffect(() => {
    loadConversations()
  }, [loadConversations])

  // Assinatura em tempo real para novas mensagens ou conversas atualizadas
  useEffect(() => {
    if (!user?.id) return
    const unsubscribe = chatService.subscribeToConversationsList(
      user.id,
      () => {
        loadConversations(true)
      },
    )
    return () => {
      unsubscribe()
    }
  }, [user?.id, loadConversations])

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations
    const query = searchQuery.toLowerCase().trim()
    return conversations.filter(
      (c) =>
        c.otherUser.name.toLowerCase().includes(query) ||
        (c.otherUser.sport &&
          c.otherUser.sport.toLowerCase().includes(query)) ||
        c.lastMessage.toLowerCase().includes(query),
    )
  }, [conversations, searchQuery])

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <Tabs defaultValue="chats" className="w-full">
        <div className="sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border/50">
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
                {refreshing && (
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => loadConversations(true)}
                  title="Atualizar conversas"
                >
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => navigate("/messages/new")}
                  title="Nova conversa"
                >
                  <Edit className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, esporte ou mensagem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-none rounded-xl"
              />
            </div>

            <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 border-b border-transparent">
              <TabsTrigger
                value="chats"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 font-semibold"
              >
                Conversas ({conversations.length})
              </TabsTrigger>
              <TabsTrigger
                value="calls"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 font-semibold"
              >
                Chamadas
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="chats" className="mt-0">
          <div className="p-4 pt-2 space-y-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                <p className="text-sm">Carregando suas conversas...</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-base mb-1">
                  {searchQuery
                    ? "Nenhuma conversa encontrada"
                    : "Nenhuma conversa iniciada"}
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs mb-5 leading-relaxed">
                  {searchQuery
                    ? "Tente buscar por outro termo ou nome de atleta/clube."
                    : "Conecte-se com atletas e clubes no Goplay para iniciar uma conversa privada."}
                </p>
                <Button
                  onClick={() => navigate("/messages/new")}
                  className="rounded-full shadow-md text-xs font-semibold px-5"
                >
                  <Edit className="w-3.5 h-3.5 mr-1.5" />
                  Iniciar Nova Conversa
                </Button>
              </div>
            ) : (
              filteredConversations.map((chat) => (
                <Card
                  key={chat.id}
                  className="border-none shadow-none bg-transparent hover:bg-secondary/40 transition-colors cursor-pointer rounded-xl"
                  onClick={() => navigate(`/messages/${chat.id}`)}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border border-border/50">
                        <AvatarImage src={chat.otherUser.avatar} />
                        <AvatarFallback>
                          {chat.otherUser.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {chat.otherUser.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <h3 className="font-semibold text-sm truncate">
                            {chat.otherUser.name}
                          </h3>
                          {chat.otherUser.accountType === "club" && (
                            <Badge
                              variant="secondary"
                              className="text-[9px] px-1 py-0 bg-primary/10 text-primary border-none"
                            >
                              Clube
                            </Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                          {chat.timeAgo}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p
                          className={`text-xs truncate pr-2 ${
                            chat.unreadCount > 0
                              ? "text-foreground font-semibold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {chat.lastMessage || "Conversa iniciada"}
                        </p>
                        {chat.unreadCount > 0 && (
                          <Badge className="h-5 min-w-5 rounded-full px-1.5 flex items-center justify-center text-[10px] font-bold shadow-sm bg-primary text-white">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="calls" className="mt-0">
          <CallHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
