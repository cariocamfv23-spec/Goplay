import { Button } from '@/components/ui/button'
import { Plus, Ghost, Video, X, Sparkles, Box } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Post3DGenerator } from '@/components/Post3DGenerator'
import { GhostViewMode } from '@/components/Ghost3DViewer'
import { cn } from '@/lib/utils'

import { useAuth } from '@/hooks/use-auth'
import { feedService } from '@/services/feed'
import { Loader2 } from 'lucide-react'

export function CreatePostFab({
  onPostCreated,
}: {
  onPostCreated?: () => void
}) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [show3DGenerator, setShow3DGenerator] = useState(false)
  const [generatedMode, setGeneratedMode] = useState<GhostViewMode | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handlePost = async () => {
    if (!content.trim() && !selectedMedia) return

    if (user?.id) {
      setIsSubmitting(true)
      const { data, error } = await feedService.createPost({
        userId: user.id,
        content: content.trim(),
        mediaFiles: selectedMedia ? [selectedMedia] : [],
        postType: selectedMedia?.type.startsWith('video/')
          ? 'video'
          : selectedMedia
            ? 'image'
            : 'text',
      })
      setIsSubmitting(false)

      if (error || !data) {
        toast.error(
          'Erro ao publicar: ' + (error?.message || 'Falha de conexão.'),
        )
        return
      }

      toast.success('Publicação compartilhada com sucesso!', {
        description: 'Seu post já está visível para a comunidade Goplay.',
      })
      if (onPostCreated) onPostCreated()
    } else {
      toast.success('Publicação enviada!', {
        description: 'Seu post aparecerá no feed em instantes.',
      })
    }

    setIsOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setContent('')
    setSelectedMedia(null)
    setMediaPreview(null)
    setShow3DGenerator(false)
    setGeneratedMode(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error('Arquivo muito grande. O limite é 20MB.')
        return
      }
      setSelectedMedia(file)
      setMediaPreview(URL.createObjectURL(file))
    }
  }

  const handle3DConfirm = (mode: GhostViewMode) => {
    setGeneratedMode(mode)
    setShow3DGenerator(false)
    toast.success('Replay 3D anexado!', {
      description: 'Agora você pode finalizar sua publicação.',
    })
  }

  const handleRemoveVideo = () => {
    setSelectedMedia(null)
    setMediaPreview(null)
    setGeneratedMode(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleGhostPlayNavigation = () => {
    setIsOpen(false)
    navigate('/ai/ghost-play')
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90 text-white animate-in zoom-in duration-300"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
        {/* If 3D Generator is active, show only that component */}
        {show3DGenerator && selectedMedia ? (
          <Post3DGenerator
            videoFile={selectedMedia}
            onConfirm={handle3DConfirm}
            onCancel={() => setShow3DGenerator(false)}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Criar Nova Publicação</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="content">No que você está pensando?</Label>
                <Textarea
                  id="content"
                  placeholder="Compartilhe seu treino, conquista ou ideia..."
                  className="min-h-[100px] resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Media Preview Area */}
              {mediaPreview && (
                <div className="relative rounded-xl overflow-hidden bg-black/5 border border-border group">
                  {selectedMedia?.type.startsWith('video/') ? (
                    <video
                      src={mediaPreview}
                      className="w-full h-48 object-cover opacity-80"
                      controls={false}
                      muted
                    />
                  ) : (
                    <img
                      src={mediaPreview}
                      className="w-full h-48 object-cover"
                      alt="Prévia do post"
                    />
                  )}

                  {generatedMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <div className="bg-primary/90 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-in zoom-in">
                        <Box className="w-3 h-3" />
                        Replay 3D:{' '}
                        {generatedMode === 'split'
                          ? 'Dividido'
                          : generatedMode === 'ghost'
                            ? 'Apenas 3D'
                            : 'Original'}
                      </div>
                    </div>
                  )}

                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                    onClick={handleRemoveVideo}
                  >
                    <X className="w-3 h-3" />
                  </Button>

                  {/* 3D Generation Trigger for videos */}
                  {!generatedMode &&
                    selectedMedia?.type.startsWith('video/') && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg border border-indigo-400/30"
                          onClick={() => setShow3DGenerator(true)}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Gerar Replay 3D
                        </Button>
                      </div>
                    )}
                </div>
              )}

              <div className="grid gap-2">
                <Label>Adicionar Mídia</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full text-xs gap-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                  >
                    <Video className="w-4 h-4" />
                    {selectedMedia ? 'Trocar Arquivo' : 'Foto / Vídeo'}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/mp4,video/webm"
                    onChange={handleFileSelect}
                  />

                  <Button variant="outline" className="w-full text-xs" disabled>
                    Localização
                  </Button>
                </div>
              </div>

              <Separator className="my-1" />

              <div className="grid gap-2">
                <Label className="text-primary flex items-center gap-2">
                  <Ghost className="w-4 h-4" />
                  Goplay AI Studio
                </Label>
                <Button
                  variant="secondary"
                  className="w-full gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border border-indigo-500/20"
                  onClick={handleGhostPlayNavigation}
                >
                  <Ghost className="w-4 h-4" />
                  Abrir Estúdio Completo
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handlePost}
                disabled={(!content.trim() && !selectedMedia) || isSubmitting}
                className="font-bold gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                    Publicando...
                  </>
                ) : (
                  'Publicar'
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
