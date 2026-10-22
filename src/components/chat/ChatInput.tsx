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
  Loader2,
  Check,
} from 'lucide-react'
import { useState, useRef } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { ChatMessage } from '@/types/chat'
import { toast } from 'sonner'
import { uploadChatMedia } from '@/lib/chat-media-upload'

interface ChatInputProps {
  onSendMessage: (msg: Partial<ChatMessage>) => Promise<void> | void
  currentUserId?: string
  disabled?: boolean
}

export function ChatInput({
  onSendMessage,
  currentUserId,
  disabled = false,
}: ChatInputProps) {
  const [text, setText] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [stagedMedia, setStagedMedia] = useState<{
    file: File
    previewUrl: string
    type: 'image' | 'video' | 'document'
  } | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const docInputRef = useRef<HTMLInputElement>(null)

  // Envio de texto direto (ou texto acompanhado da mídia estagiada)
  const handleSend = async () => {
    if (uploading || disabled) return

    // Se houver mídia estagiada, faz upload real antes de disparar a mensagem
    if (stagedMedia) {
      if (!currentUserId) {
        toast.error('Você precisa estar logado para enviar anexos.')
        return
      }

      setUploading(true)
      try {
        const { url, error, mediaType, fileName } = await uploadChatMedia(
          stagedMedia.file,
          currentUserId,
          (step) => {
            if (step === 'compressing') setUploadStatus('Otimizando imagem...')
            else if (step === 'uploading') setUploadStatus('Enviando...')
            else setUploadStatus('')
          },
        )

        if (error || !url) {
          throw error || new Error('Não foi possível enviar a imagem.')
        }

        const msg: Partial<ChatMessage> = {
          type: mediaType,
          mediaUrl: url,
          fileName,
          text: text.trim() || undefined,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }

        await onSendMessage(msg)

        // Limpa estado após envio bem sucedido
        URL.revokeObjectURL(stagedMedia.previewUrl)
        setStagedMedia(null)
        setText('')
      } catch (err: any) {
        console.error('[ChatInput] Erro ao enviar mídia:', err)
        toast.error(err?.message || 'Erro ao carregar e enviar o arquivo.')
      } finally {
        setUploading(false)
        setUploadStatus('')
      }
      return
    }

    // Apenas mensagem de texto
    if (!text.trim()) return
    const msgText = text
    setText('')
    await onSendMessage({
      type: 'text',
      text: msgText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
  }

  // Manipulador de seleção de arquivo da galeria / câmera / documentos
  const handleFilePicked = (
    e: React.ChangeEvent<HTMLInputElement>,
    expectedType: 'image' | 'video' | 'document',
  ) => {
    const file = e.target.files?.[0]
    // Reseta o input para permitir selecionar o mesmo arquivo novamente se o usuário quiser
    e.target.value = ''

    if (!file) {
      return
    }

    // Validação de tamanho
    const maxMb = expectedType === 'image' ? 25 : 30
    if (file.size > maxMb * 1024 * 1024) {
      toast.error(`Arquivo muito grande. O limite máximo é de ${maxMb}MB.`)
      return
    }

    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    const resolvedType = isImage ? 'image' : isVideo ? 'video' : expectedType

    const preview = isImage || isVideo ? URL.createObjectURL(file) : ''

    setStagedMedia({
      file,
      previewUrl: preview,
      type: resolvedType,
    })

    // Fecha a drawer para focar na prévia pronta para envio
    setIsDrawerOpen(false)
  }

  const cancelStagedMedia = () => {
    if (stagedMedia?.previewUrl) {
      URL.revokeObjectURL(stagedMedia.previewUrl)
    }
    setStagedMedia(null)
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
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0 z-20 pb-safe">
      {/* Hidden File Inputs compatíveis com Samsung Galaxy / Chrome / Android / PWA */}
      {/* Galeria de Fotos: aceita qualquer imagem e não usa 'capture' para abrir a Galeria do Android */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        style={{ display: 'none' }}
        onChange={(e) => handleFilePicked(e, 'image')}
      />

      {/* Vídeos */}
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm,video/*"
        className="hidden"
        style={{ display: 'none' }}
        onChange={(e) => handleFilePicked(e, 'video')}
      />

      {/* Documentos */}
      <input
        ref={docInputRef}
        type="file"
        accept="application/pdf,.pdf,.doc,.docx,.txt"
        className="hidden"
        style={{ display: 'none' }}
        onChange={(e) => handleFilePicked(e, 'document')}
      />

      {/* Prévia da mídia selecionada antes do envio */}
      {stagedMedia && (
        <div className="p-3 bg-secondary/40 border-b flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3 min-w-0">
            {stagedMedia.type === 'image' && stagedMedia.previewUrl ? (
              <img
                src={stagedMedia.previewUrl}
                alt="Prévia da foto"
                className="h-12 w-12 rounded-lg object-cover border border-border shadow-xs"
              />
            ) : stagedMedia.type === 'video' ? (
              <div className="h-12 w-12 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center border border-pink-500/20">
                <Video className="h-6 w-6" />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                <FileText className="h-6 w-6" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-foreground">
                {stagedMedia.file.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {(stagedMedia.file.size / (1024 * 1024)).toFixed(1)} MB • Pronto
                para enviar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {uploading ? (
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">
                  {uploadStatus || 'Enviando...'}
                </span>
              </div>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                onClick={cancelStagedMedia}
                title="Remover anexo"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Barra de input principal */}
      <div className="p-3">
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
              disabled={uploading || disabled}
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors touch-manipulation"
              onClick={() => setIsDrawerOpen(true)}
              title="Anexar foto ou arquivo"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder={
                stagedMedia ? 'Adicione uma legenda...' : 'Mensagem...'
              }
              value={text}
              disabled={uploading || disabled}
              onChange={(e) => setText(e.target.value)}
              className="rounded-full bg-secondary border-none focus-visible:ring-1 focus-visible:ring-primary text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            {text || stagedMedia ? (
              <Button
                size="icon"
                disabled={uploading || disabled}
                className="rounded-full shrink-0 animate-in zoom-in duration-200 bg-primary hover:bg-primary/90 text-primary-foreground touch-manipulation"
                onClick={handleSend}
                title="Enviar"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors touch-manipulation"
                onClick={toggleRecording}
                title="Gravar áudio"
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Drawer de opções de anexo */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="pb-8 bg-background border-border">
          <DrawerHeader className="relative border-b pb-3">
            <DrawerTitle className="text-center text-base font-semibold">
              Anexar da Galeria ou Arquivo
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-3 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex justify-center items-center gap-8 sm:gap-12 py-8 px-4">
            {/* Opção 1: Galeria Samsung / Fotos */}
            <button
              type="button"
              className="flex flex-col items-center gap-3 cursor-pointer group focus:outline-hidden touch-manipulation"
              onClick={() => {
                galleryInputRef.current?.click()
              }}
            >
              <div className="h-16 w-16 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform shadow-xs border border-purple-500/20">
                <ImageIcon className="h-7 w-7" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                Galeria
              </span>
              <span className="text-[10px] text-muted-foreground -mt-2">
                Fotos do celular
              </span>
            </button>

            {/* Opção 2: Vídeo */}
            <button
              type="button"
              className="flex flex-col items-center gap-3 cursor-pointer group focus:outline-hidden touch-manipulation"
              onClick={() => {
                videoInputRef.current?.click()
              }}
            >
              <div className="h-16 w-16 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform shadow-xs border border-pink-500/20">
                <Video className="h-7 w-7" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                Vídeo
              </span>
              <span className="text-[10px] text-muted-foreground -mt-2">
                Gravações
              </span>
            </button>

            {/* Opção 3: Documento */}
            <button
              type="button"
              className="flex flex-col items-center gap-3 cursor-pointer group focus:outline-hidden touch-manipulation"
              onClick={() => {
                docInputRef.current?.click()
              }}
            >
              <div className="h-16 w-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform shadow-xs border border-blue-500/20">
                <FileText className="h-7 w-7" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                Documento
              </span>
              <span className="text-[10px] text-muted-foreground -mt-2">
                PDF / Docs
              </span>
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
