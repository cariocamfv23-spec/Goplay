export interface EvaluationData {
  score: number
  verdict: string
  strengths: string[]
  weaknesses: string[]
  realityCheck: string
}

export interface ChatMessage {
  id: string
  sender: 'me' | 'them' | 'bot'
  text?: string
  time: string
  type?: 'text' | 'image' | 'video' | 'audio' | 'document' | 'evaluation'
  mediaUrl?: string
  fileName?: string
  isMe?: boolean
  timestamp?: string
  evaluationData?: EvaluationData
}
