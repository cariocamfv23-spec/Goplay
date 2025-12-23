import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
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

export function CreatePostFab() {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')

  const handlePost = () => {
    if (!content.trim()) return

    toast.success('Publicação enviada!', {
      description: 'Seu post aparecerá no feed em instantes.',
    })
    setIsOpen(false)
    setContent('')
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
      <DialogContent className="sm:max-w-md">
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
            <div className="flex gap-2">
              <Button variant="outline" className="w-full text-xs" disabled>
                Foto/Vídeo
              </Button>
              <Button variant="outline" className="w-full text-xs" disabled>
                Localização
              </Button>
            </div>
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
