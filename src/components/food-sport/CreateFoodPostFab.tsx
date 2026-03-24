import { Button } from '@/components/ui/button'
import { Plus, Image as ImageIcon, Utensils } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CreateFoodPostFabProps {
  onPost?: (postData: any) => void
}

export function CreateFoodPostFab({ onPost }: CreateFoodPostFabProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [template, setTemplate] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePost = () => {
    if (!content.trim()) {
      toast.error('Escreva algo para publicar.')
      return
    }

    if (onPost) {
      onPost({
        content,
        template,
        image: 'https://img.usecurling.com/p/800/800?q=food&color=orange&dpr=2',
      })
    } else {
      toast.success('Publicação Food Sport enviada!', {
        description: 'Sua receita/dica já está no feed.',
        icon: <Utensils className="w-4 h-4 text-orange-500" />,
      })
    }

    setIsOpen(false)
    setContent('')
    setTemplate('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-xl z-40 bg-orange-600 hover:bg-orange-700 text-white animate-in zoom-in duration-300"
        >
          <div className="relative flex items-center justify-center">
            <Plus className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5">
              <Utensils className="w-3 h-3 text-orange-500" />
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <Utensils className="w-5 h-5" />
            Nova Publicação Food Sport
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Categoria / Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de post" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alimentação do dia">
                  Alimentação do dia
                </SelectItem>
                <SelectItem value="Pré treino">Pré treino</SelectItem>
                <SelectItem value="Pós treino">Pós treino</SelectItem>
                <SelectItem value="Rotina alimentar">
                  Rotina alimentar
                </SelectItem>
                <SelectItem value="Receita Fit">Receita Fit</SelectItem>
                <SelectItem value="Dica de Nutrição">
                  Dica de Nutrição
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Ingredientes ou Descrição</Label>
            <Textarea
              id="content"
              placeholder="Compartilhe sua receita, dieta ou dica nutricional..."
              className="min-h-[120px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Adicionar Foto/Vídeo da Refeição</Label>
            <Button
              variant="outline"
              className="w-full h-12 border-dashed gap-2 text-muted-foreground hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-5 h-5" />
              Fazer Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*,video/*"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handlePost}
            className="bg-orange-600 hover:bg-orange-700 font-bold px-8 shadow-md"
            disabled={!content.trim()}
          >
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
