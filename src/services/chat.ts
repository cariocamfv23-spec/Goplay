import { supabase } from "@/lib/supabase/client"
import { pushNotificationService } from "@/services/push-notifications"
import { ChatMessage, EvaluationData } from "@/types/chat"

const db = supabase as any

export interface ConversationParticipant {
  id: string
  name: string
  avatar: string
  accountType?: "athlete" | "club" | "coach"
  sport?: string
  online?: boolean
}

export interface ConversationSummary {
  id: string
  otherUser: ConversationParticipant
  lastMessage: string
  lastMessageAt: string
  timeAgo: string
  unreadCount: number
}

export interface SendMessagePayload {
  conversationId: string
  recipientId: string
  content?: string
  messageType?: "text" | "image" | "video" | "audio" | "document" | "evaluation"
  mediaUrl?: string
  fileName?: string
  metadata?: {
    evaluationData?: EvaluationData
    [key: string]: any
  }
}

function formatRelativeTime(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    const diff = Math.floor((Date.now() - d.getTime()) / 1000)
    if (diff < 60) return "Agora"
    if (diff < 3600) return `${Math.floor(diff / 60)}min`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`
    return d.toLocaleDateString("pt-BR")
  } catch {
    return "Recente"
  }
}

function formatMessageTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return ""
  }
}

export const chatService = {
  /**
   * Obtém ou cria a conversa canônica entre o usuário atual e o destinatário.
   */
  async getOrCreateConversation(otherUserId: string): Promise<{
    conversationId: string | null
    error: Error | null
  }> {
    try {
      if (!otherUserId)
        throw new Error("ID do usuário destinatário obrigatório")

      const { data, error } = await db.rpc("get_or_create_conversation", {
        other_user_id: otherUserId,
      })

      if (error) throw error
      return { conversationId: data as string, error: null }
    } catch (err: any) {
      console.error("[chatService] getOrCreateConversation error:", err)
      return {
        conversationId: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Obtém detalhes de uma conversa por ID, identificando o parceiro de chat
   */
  async getConversationById(
    conversationId: string,
    currentUserId: string,
  ): Promise<{
    conversation: ConversationSummary | null
    otherUserId: string | null
    error: Error | null
  }> {
    try {
      const { data, error } = await db
        .from("conversations")
        .select("*")
        .eq("id", conversationId)
        .maybeSingle()

      if (error) throw error
      if (!data) return { conversation: null, otherUserId: null, error: null }

      const otherId =
        data.participant1_id === currentUserId
          ? data.participant2_id
          : data.participant1_id

      const { data: profile } = await db
        .from("profiles")
        .select("id, full_name, avatar_url, account_type, club_name, sport")
        .eq("id", otherId)
        .maybeSingle()

      const displayName =
        profile?.club_name || profile?.full_name || "Usuário Goplay"
      const fallbackAvatar = `https://img.usecurling.com/ppl/medium?gender=male&seed=${otherId}`

      const summary: ConversationSummary = {
        id: data.id,
        otherUser: {
          id: otherId,
          name: displayName,
          avatar: profile?.avatar_url || fallbackAvatar,
          accountType: profile?.account_type,
          sport: profile?.sport,
          online: true,
        },
        lastMessage: data.last_message_text || "",
        lastMessageAt: data.last_message_at,
        timeAgo: formatRelativeTime(data.last_message_at),
        unreadCount: 0,
      }

      return { conversation: summary, otherUserId: otherId, error: null }
    } catch (err: any) {
      console.error("[chatService] getConversationById error:", err)
      return {
        conversation: null,
        otherUserId: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Lista todas as conversas do usuário atual ordenadas pela data da última mensagem
   */
  async getMyConversations(
    currentUserId: string,
  ): Promise<ConversationSummary[]> {
    try {
      if (!currentUserId) return []

      const { data: convs, error } = await db
        .from("conversations")
        .select("*")
        .or(
          `participant1_id.eq.${currentUserId},participant2_id.eq.${currentUserId}`,
        )
        .order("last_message_at", { ascending: false })

      if (error || !convs) return []

      // Coletar IDs dos parceiros
      const otherUserIds = convs.map((c: any) =>
        c.participant1_id === currentUserId
          ? c.participant2_id
          : c.participant1_id,
      )

      const profileMap = new Map<string, any>()
      if (otherUserIds.length > 0) {
        const { data: profiles } = await db
          .from("profiles")
          .select("id, full_name, avatar_url, account_type, club_name, sport")
          .in("id", otherUserIds)

        profiles?.forEach((p: any) => profileMap.set(p.id, p))
      }

      // Buscar contagem de não lidas por conversa
      const convIds = convs.map((c: any) => c.id)
      const unreadMap = new Map<string, number>()
      if (convIds.length > 0) {
        const { data: unreadMsgs } = await db
          .from("direct_messages")
          .select("conversation_id")
          .in("conversation_id", convIds)
          .neq("sender_id", currentUserId)
          .is("read_at", null)

        unreadMsgs?.forEach((m: any) => {
          unreadMap.set(
            m.conversation_id,
            (unreadMap.get(m.conversation_id) || 0) + 1,
          )
        })
      }

      return convs.map((c: any) => {
        const otherId =
          c.participant1_id === currentUserId
            ? c.participant2_id
            : c.participant1_id

        const profile = profileMap.get(otherId)
        const name =
          profile?.club_name || profile?.full_name || "Usuário Goplay"
        const avatar =
          profile?.avatar_url ||
          `https://img.usecurling.com/ppl/medium?gender=male&seed=${otherId}`

        return {
          id: c.id,
          otherUser: {
            id: otherId,
            name,
            avatar,
            accountType: profile?.account_type,
            sport: profile?.sport,
            online: true,
          },
          lastMessage: c.last_message_text || "",
          lastMessageAt: c.last_message_at,
          timeAgo: formatRelativeTime(c.last_message_at),
          unreadCount: unreadMap.get(c.id) || 0,
        }
      })
    } catch (err) {
      console.error("[chatService] getMyConversations error:", err)
      return []
    }
  },

  /**
   * Busca as mensagens de uma conversa específica
   */
  async getMessages(
    conversationId: string,
    currentUserId: string,
  ): Promise<ChatMessage[]> {
    try {
      if (!conversationId) return []

      const { data, error } = await db
        .from("direct_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })

      if (error || !data) return []

      return data.map((m: any) => {
        const isMe = m.sender_id === currentUserId
        const meta = m.metadata || {}
        return {
          id: m.id,
          sender: (isMe ? "me" : "them") as "me" | "them",
          isMe,
          text: m.content,
          type: m.message_type as any || "text",
          mediaUrl: m.media_url || undefined,
          fileName: m.file_name || undefined,
          time: formatMessageTime(m.created_at),
          timestamp: m.created_at,
          evaluationData: meta.evaluationData,
        }
      })
    } catch (err) {
      console.error("[chatService] getMessages error:", err)
      return []
    }
  },

  /**
   * Envia uma nova mensagem direta, salva no banco e dispara notificação push + interna para o destinatário
   */
  async sendMessage(
    payload: SendMessagePayload,
    currentUserId: string,
    senderProfile?: {
      name?: string
      avatar?: string
    },
  ): Promise<{
    message: ChatMessage | null
    error: Error | null
  }> {
    try {
      const {
        conversationId,
        recipientId,
        content = "",
        messageType = "text",
        mediaUrl,
        fileName,
        metadata = {},
      } = payload

      if (!conversationId) throw new Error("ID da conversa é obrigatório")
      if (!currentUserId) throw new Error("Usuário remetente não autenticado")

      // 1. Inserir mensagem na tabela direct_messages
      const insertData = {
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: content.trim(),
        message_type: messageType,
        media_url: mediaUrl || null,
        file_name: fileName || null,
        metadata,
      }

      const { data, error } = await db
        .from("direct_messages")
        .insert(insertData)
        .select()
        .single()

      if (error) throw error

      const createdMsg: ChatMessage = {
        id: data.id,
        sender: "me",
        isMe: true,
        text: data.content,
        type: data.message_type,
        mediaUrl: data.media_url || undefined,
        fileName: data.file_name || undefined,
        time: formatMessageTime(data.created_at),
        timestamp: data.created_at,
        evaluationData: data.metadata?.evaluationData,
      }

      // 2. Disparar notificação interna (tabela notifications) para o destinatário (sem auto-notificação)
      if (recipientId && recipientId !== currentUserId) {
        const senderName = senderProfile?.name || "Alguém"
        const snippet =
          messageType === "image"
            ? content
              ? `📷 Foto: ${content.slice(0, 80)}`
              : "📷 Foto"
            : messageType === "video"
              ? content
                ? `🎥 Vídeo: ${content.slice(0, 80)}`
                : "🎥 Vídeo"
              : messageType === "audio"
                ? "🎙️ Mensagem de áudio"
                : messageType === "document"
                  ? fileName
                    ? `📄 Documento: ${fileName}`
                    : "📄 Arquivo anexo"
                  : content.slice(0, 100) || "Nova mensagem"

        // Cria registro na tabela notifications
        db.from("notifications")
          .insert({
            user_id: recipientId,
            actor_id: currentUserId,
            type: "message",
            title: `Nova mensagem de ${senderName}`,
            message: snippet,
            link: `/messages/${conversationId}`,
            read: false,
          })
          .then(() => {})
          .catch((nErr: any) =>
            console.warn("[chatService] notification insert error:", nErr),
          )

        // 3. Disparar Web Push notification via Edge Function send-push (sem auto-notificação)
        pushNotificationService
          .triggerServerPush({
            userId: recipientId,
            title: `Mensagem de ${senderName}`,
            body: snippet,
            url: `/messages/${conversationId}`,
            tag: `chat-${conversationId}`,
          })
          .then((pushRes) => {
            if (!pushRes.success) {
              console.log(
                "[chatService] Push dispatch completed or skipped:",
                pushRes.error || pushRes.data,
              )
            }
          })
          .catch((pErr) => {
            console.warn("[chatService] pushNotificationService error:", pErr)
          })
      }

      return { message: createdMsg, error: null }
    } catch (err: any) {
      console.error("[chatService] sendMessage error:", err)
      return {
        message: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  },

  /**
   * Marca mensagens como lidas na conversa atual
   */
  async markMessagesAsRead(
    conversationId: string,
    currentUserId: string,
  ): Promise<void> {
    try {
      if (!conversationId || !currentUserId) return

      await db
        .from("direct_messages")
        .update({ read_at: new Date().toISOString() })
        .eq("conversation_id", conversationId)
        .neq("sender_id", currentUserId)
        .is("read_at", null)
    } catch (err) {
      console.warn("[chatService] markMessagesAsRead warning:", err)
    }
  },

  /**
   * Assina atualizações em tempo real para as mensagens de uma conversa
   */
  subscribeToConversation(
    conversationId: string,
    currentUserId: string,
    onNewMessage: (msg: ChatMessage) => void,
    onMessagesRead?: () => void,
  ) {
    const channelName = `chat-room-${conversationId}-${Date.now()}`
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "direct_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as any
          const isMe = row.sender_id === currentUserId
          const meta = row.metadata || {}
          const newMsg: ChatMessage = {
            id: row.id,
            sender: (isMe ? "me" : "them") as "me" | "them",
            isMe,
            text: row.content,
            type: row.message_type as any || "text",
            mediaUrl: row.media_url || undefined,
            fileName: row.file_name || undefined,
            time: formatMessageTime(row.created_at),
            timestamp: row.created_at,
            evaluationData: meta.evaluationData,
          }
          onNewMessage(newMsg)
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "direct_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          onMessagesRead?.()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },

  /**
   * Assina atualizações em tempo real da lista de conversas
   */
  subscribeToConversationsList(currentUserId: string, onChanged: () => void) {
    const channelName = `conversations-list-${currentUserId}-${Date.now()}`
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          onChanged()
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "direct_messages",
        },
        () => {
          onChanged()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },
}
