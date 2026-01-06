import { Button } from '@/components/ui/button'
import { Plus, Ghost, Video } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

export function CreatePostFab() {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const handlePost = () => {
    if (!content.trim()) return

    toast.success('Publicação enviada!', {
      description: 'Seu post aparecerá no feed em instantes.',
    })
    setIsOpen(false)
    setContent('')
  }

  const handleGhostPlay = () => {
    setIsOpen(false)
    navigate('/ai/ghost-play')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90 text-white animate-in zoom-in duration-300"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle>Criar Nova Publicação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="content">No que você está pensando?</Label>
            <Textarea
              id="content"
              placeholder="Compartilhe seu treino, conquista ou ideia..."
              className="min-h-[120px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Adicionar Mídia</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full text-xs gap-2"
                disabled
              >
                <Video className="w-4 h-4" />
                Foto/Vídeo
              </Button>
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
              onClick={handleGhostPlay}
            >
              <Ghost className="w-4 h-4" />
              Gerar Replay 3D Low-Poly
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handlePost} disabled={!content.trim()}>
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
