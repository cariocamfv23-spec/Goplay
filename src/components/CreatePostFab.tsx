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
import { useFeedStore } from '@/stores/useFeedStore'
import { mockCurrentUser } from '@/lib/data'

export function CreatePostFab() {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [show3DGenerator, setShow3DGenerator] = useState(false)
  const [generatedMode, setGeneratedMode] = useState<GhostViewMode | null>(null)

  const addPost = useFeedStore((state) => state.addPost)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handlePost = () => {
    if (!content.trim() && !videoFile) return

    addPost({
      type: videoFile ? 'video' : 'text',
      user: mockCurrentUser,
      content,
      videoUrl: videoPreview,
      videoDuration: videoFile ? '0:15' : undefined,
    })

    toast.success('Publicação enviada!', {
      description: generatedMode
        ? `Seu Replay 3D (${generatedMode}) foi publicado com sucesso!`
        : 'Seu post aparecerá no feed em instantes.',
      icon: generatedMode ? (
        <Box className="w-4 h-4 text-primary" />
      ) : undefined,
    })

    setIsOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setContent('')
    setVideoFile(null)
    setVideoPreview(null)
    setShow3DGenerator(false)
    setGeneratedMode(null)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('video/')) {
        toast.error('Por favor, selecione um arquivo de vídeo.')
        return
      }
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
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
    setVideoFile(null)
    setVideoPreview(null)
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
        {show3DGenerator && videoFile ? (
          <Post3DGenerator
            videoFile={videoFile}
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

              {videoPreview && (
                <div className="relative rounded-xl overflow-hidden bg-black/5 border border-border group">
                  <video
                    src={videoPreview}
                    className="w-full h-48 object-cover opacity-80"
                    controls={false}
                    muted
                  />

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
                    className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleRemoveVideo}
                  >
                    <X className="w-3 h-3" />
                  </Button>

                  {!generatedMode && (
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
                  >
                    <Video className="w-4 h-4" />
                    {videoFile ? 'Trocar Vídeo' : 'Foto/Vídeo'}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
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
                disabled={!content.trim() && !videoFile}
              >
                Publicar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
