import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Send,
  Paperclip,
  Mic,
  Image as ImageIcon,
  Video,
  FileText,
  X,
  StopCircle,
} from 'lucide-react'
import { useState, useRef } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { ChatMessage } from '@/lib/data'

interface ChatInputProps {
  onSendMessage: (msg: Partial<ChatMessage>) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [text, setText] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleSendText = () => {
    if (!text.trim()) return
    onSendMessage({
      type: 'text',
      text: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
    setText('')
  }

  const handleSendMedia = (type: 'image' | 'video' | 'document') => {
    let msg: Partial<ChatMessage> = {
      type,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    if (type === 'image') {
      msg.mediaUrl = 'https://img.usecurling.com/p/400/300?q=chat%20image'
    } else if (type === 'video') {
      msg.mediaUrl = 'https://img.usecurling.com/p/400/300?q=chat%20video'
    } else {
      msg.fileName = 'Documento_Anexo.pdf'
    }

    onSendMessage(msg)
    setIsDrawerOpen(false)
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording and send
      if (timerRef.current) clearInterval(timerRef.current)
      setIsRecording(false)
      setRecordingTime(0)
      onSendMessage({
        type: 'audio',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      })
    } else {
      // Start recording
      setIsRecording(true)
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-3 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
      {isRecording ? (
        <div className="flex items-center gap-4 animate-in fade-in bg-secondary rounded-full px-4 py-2">
          <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          <span className="flex-1 text-sm font-medium">
            Gravando {formatTime(recordingTime)}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current)
              setIsRecording(false)
              setRecordingTime(0)
            }}
          >
            Cancelar
          </Button>
          <Button
            size="icon"
            className="rounded-full h-8 w-8 bg-primary"
            onClick={toggleRecording}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-primary"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="rounded-full bg-secondary border-none focus-visible:ring-1 focus-visible:ring-primary"
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
          />
          {text ? (
            <Button
              size="icon"
              className="rounded-full shrink-0 animate-in zoom-in duration-200"
              onClick={handleSendText}
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-primary"
              onClick={toggleRecording}
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="pb-8">
          <DrawerHeader className="relative">
            <DrawerTitle className="text-center">Anexar</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex justify-center gap-8 py-6">
            <div
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => handleSendMedia('image')}
            >
              <div className="h-14 w-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <ImageIcon className="h-6 w-6" />
              </div>
              <span className="text-xs">Galeria</span>
            </div>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => handleSendMedia('video')}
            >
              <div className="h-14 w-14 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                <Video className="h-6 w-6" />
              </div>
              <span className="text-xs">Vídeo</span>
            </div>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => handleSendMedia('document')}
            >
              <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <span className="text-xs">Documento</span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
