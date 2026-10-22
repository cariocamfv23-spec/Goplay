import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Video, Loader2, ShieldAlert } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState, useEffect, useRef, useCallback } from 'react'
import { CallOverlay } from '@/components/chat/CallOverlay'
import { toast } from 'sonner'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatMessage } from '@/types/chat'
import { useAuth } from '@/hooks/use-auth'
import { chatService, ConversationParticipant } from '@/services/chat'
import { moderationService } from '@/services/moderation'

export default function ChatRoom() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()

  // Estado da conversa e mensagens
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [otherUser, setOtherUser] = useState<ConversationParticipant | null>(
    null,
  )
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  // Chamadas de voz/vídeo
  const [isCallOpen, setIsCallOpen] = useState(false)
  const [callType, setCallType] = useState<'voice' | 'video'>('voice')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-start call from query params
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'voice') {
      handleStartCall('voice')
    } else if (action === 'video') {
      handleStartCall('video')
    }
  }, [searchParams])

  // Inicializa e resolve a conversa a partir do parâmetro `id`
  // Suporta tanto UUID da conversa quanto rota compatível `/messages/user-{targetUserId}`
  useEffect(() => {
    let isMounted = true

    async function initChat() {
      if (!id || !user?.id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        let resolvedConvId: string | null = null
        let targetUserId: string | null = null

        if (id.startsWith('user-')) {
          targetUserId = id.replace('user-', '')
          // Obter ou criar conversa canônica com o targetUserId
          const { conversationId: convId, error } =
            await chatService.getOrCreateConversation(targetUserId)

          if (error || !convId) {
            throw error || new Error('Não foi possível abrir a conversa.')
          }
          resolvedConvId = convId
        } else {
          resolvedConvId = id
        }

        if (!isMounted) return
        setConversationId(resolvedConvId)

        // Carrega detalhes da conversa e o participante
        const { conversation, otherUserId: partnerId } =
          await chatService.getConversationById(resolvedConvId, user.id)

        if (!isMounted) return

        if (conversation) {
          setOtherUser(conversation.otherUser)
          targetUserId = partnerId
        }

        // Verifica bloqueios
        if (targetUserId) {
          const blockCheck = await moderationService.checkMutualBlock(
            user.id,
            targetUserId,
          )
          if (blockCheck.isBlockedByMe || blockCheck.isBlockingMe) {
            setIsBlocked(true)
          }
        }

        // Carrega histórico de mensagens persistidas
        const msgs = await chatService.getMessages(resolvedConvId, user.id)
        if (isMounted) {
          setMessages(msgs)
          // Marca mensagens como lidas
          chatService.markMessagesAsRead(resolvedConvId, user.id)
        }
      } catch (err: any) {
        console.error('[ChatRoom] Erro ao carregar conversa:', err)
        toast.error(err?.message || 'Erro ao carregar conversa.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    initChat()

    return () => {
      isMounted = false
    }
  }, [id, user?.id])

  // Assina Supabase Realtime para novas mensagens e atualizações de leitura
  useEffect(() => {
    if (!conversationId || !user?.id) return

    const unsubscribe = chatService.subscribeToConversation(
      conversationId,
      user.id,
      (newMsg) => {
        setMessages((prev) => {
          // Evita duplicatas se o ID já existir
          if (prev.some((m) => m.id === newMsg.id)) return prev
          return [...prev, newMsg]
        })

        // Se a mensagem for do outro usuário, marca como lida
        if (!newMsg.isMe) {
          chatService.markMessagesAsRead(conversationId, user.id)
        }
      },
    )

    return () => {
      unsubscribe()
    }
  }, [conversationId, user?.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleStartCall = (type: 'voice' | 'video') => {
    setCallType(type)
    setIsCallOpen(true)
    toast.info(`Iniciando chamada de ${type === 'voice' ? 'voz' : 'vídeo'}...`)
  }

  const handleSendMessage = useCallback(
    async (newMsg: Partial<ChatMessage>) => {
      if (!conversationId || !user?.id) {
        toast.error('Você precisa estar logado para enviar mensagens.')
        return
      }

      if (isBlocked) {
        toast.error('Não é possível enviar mensagens para este usuário.')
        return
      }

      setSending(true)
      try {
        const { message, error } = await chatService.sendMessage(
          {
            conversationId,
            recipientId: otherUser?.id || '',
            content: newMsg.text || '',
            messageType: newMsg.type || 'text',
            mediaUrl: newMsg.mediaUrl,
            fileName: newMsg.fileName,
            metadata: newMsg.evaluationData
              ? { evaluationData: newMsg.evaluationData }
              : undefined,
          },
          user.id,
          {
            name:
              (user.user_metadata?.full_name as string) ||
              (user.user_metadata?.name as string) ||
              user.email?.split('@')[0] ||
              'Usuário Goplay',
            avatar: user.user_metadata?.avatar_url as string,
          },
        )

        if (error || !message) {
          throw error || new Error('Falha ao enviar mensagem.')
        }

        // Adiciona localmente caso o Realtime ainda não tenha ecoado
        setMessages((prev) => {
          if (prev.some((m) => m.id === message.id)) return prev
          return [...prev, message]
        })
      } catch (err: any) {
        console.error('Falha ao enviar mensagem:', err)
        toast.error(err?.message || 'Falha ao enviar mensagem.')
      } finally {
        setSending(false)
      }
    },
    [conversationId, user, otherUser?.id, isBlocked],
  )

  const partnerDisplayName = otherUser?.name || 'Conversa'
  const partnerAvatar =
    otherUser?.avatar ||
    `https://img.usecurling.com/ppl/medium?gender=male&seed=${id}`

  return (
    <div className="flex flex-col h-screen bg-background animate-fade-in relative">
      {/* Call Overlay */}
      <CallOverlay
        isOpen={isCallOpen}
        type={callType}
        user={{
          name: partnerDisplayName,
          avatar: partnerAvatar,
        }}
        onEndCall={() => setIsCallOpen(false)}
      />

      {/* Top Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-3 border-b border-border/50 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 hover:bg-secondary/50 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div
            className="cursor-pointer flex items-center gap-3"
            onClick={() => {
              if (otherUser?.id) {
                navigate(`/profile/${otherUser.id}`)
              }
            }}
          >
            <div className="relative">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={partnerAvatar} />
                <AvatarFallback>{partnerDisplayName[0] || 'U'}</AvatarFallback>
              </Avatar>
              {otherUser?.online && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 border-2 border-background rounded-full" />
              )}
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-sm leading-none mb-1 flex items-center gap-1.5">
                {partnerDisplayName}
                {otherUser?.accountType === 'club' && (
                  <span className="text-[10px] bg-primary/10 text-primary font-bold px-1 rounded">
                    Clube
                  </span>
                )}
              </h3>
              <span className="text-xs text-muted-foreground block">
                {isBlocked
                  ? 'Usuário bloqueado'
                  : otherUser?.sport
                    ? `${otherUser.sport} • Ativo`
                    : 'Online no Goplay'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleStartCall('voice')}
            className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full"
            title="Chamada de voz"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleStartCall('video')}
            className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full"
            title="Chamada de vídeo"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mensagens / Área de conversa */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/50 dark:bg-black/20"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <p className="text-xs">Carregando histórico seguro...</p>
          </div>
        ) : isBlocked ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <ShieldAlert className="w-12 h-12 text-destructive mb-3" />
            <h4 className="font-bold text-sm text-foreground mb-1">
              Comunicação bloqueada
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Existe um bloqueio ativo entre este perfil e a sua conta. Não é
              possível enviar nem receber novas mensagens.
            </p>
          </div>
        ) : messages.length > 0 ? (
          <>
            <div className="text-center my-3">
              <span className="text-[11px] bg-secondary/80 text-muted-foreground px-3 py-1 rounded-full font-medium">
                Início da conversa com {partnerDisplayName}
              </span>
            </div>
            {messages.map((m) => (
              <ChatBubble
                key={m.id}
                message={m}
                senderAvatar={m.isMe ? undefined : partnerAvatar}
                senderName={m.isMe ? undefined : partnerDisplayName}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 animate-fade-in">
            <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
              <Avatar className="h-20 w-20 opacity-80">
                <AvatarImage src={partnerAvatar} />
                <AvatarFallback>{partnerDisplayName[0] || 'U'}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Inicie a conversa com {partnerDisplayName}
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Suas mensagens são privadas, persistidas no banco e atualizadas em
              tempo real com suporte a notificações push.
            </p>
          </div>
        )}
      </div>

      {/* Input de envio */}
      {!isBlocked && <ChatInput onSendMessage={handleSendMessage} />}
    </div>
  )
}
