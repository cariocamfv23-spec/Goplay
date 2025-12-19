export interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  text?: string
  time: string
  type?: 'text' | 'image' | 'video' | 'audio' | 'document'
  mediaUrl?: string
  fileName?: string
  isMe?: boolean
  timestamp?: string
}
