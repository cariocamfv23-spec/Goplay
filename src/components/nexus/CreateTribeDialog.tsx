import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Plus, Globe, Lock } from 'lucide-react'
import { useNexusStore } from '@/stores/useNexusStore'
import { mockUser } from '@/lib/data'

export function CreateTribeDialog() {
  const [open, setOpen] = useState(false)
  const { createTribe } = useNexusStore()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    isPrivate: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createTribe({
      ...formData,
      creatorId: mockUser.id,
      icon: `https://img.usecurling.com/i?q=${encodeURIComponent(formData.category || 'sports')}&color=purple`,
      cover: `https://img.usecurling.com/p/800/400?q=${encodeURIComponent(formData.category || 'sports')}&color=purple`,
    })
    setOpen(false)
    setFormData({ name: '', category: '', description: '', isPrivate: false })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg gap-2 font-bold hover:-translate-y-1 transition-transform">
          <Plus className="w-4 h-4" /> Criar Tribo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Nova Tribo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Nome da Tribo</Label>
            <Input
              required
              placeholder="Ex: Guerreiros da Quadra"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              required
              value={formData.category}
              onValueChange={(v) => setFormData({ ...formData, category: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Futebol">Futebol</SelectItem>
                <SelectItem value="Corrida">Corrida</SelectItem>
                <SelectItem value="E-Sports">E-Sports</SelectItem>
                <SelectItem value="Basquete">Basquete</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              required
              placeholder="Qual o propósito da tribo?"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-xl bg-secondary/20">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                {formData.isPrivate ? (
                  <Lock className="w-4 h-4 text-primary" />
                ) : (
                  <Globe className="w-4 h-4 text-primary" />
                )}
                Tribo Privada
              </Label>
              <p className="text-xs text-muted-foreground">
                Membros precisam de aprovação.
              </p>
            </div>
            <Switch
              checked={formData.isPrivate}
              onCheckedChange={(c) =>
                setFormData({ ...formData, isPrivate: c })
              }
            />
          </div>
          <Button type="submit" className="w-full h-12 text-lg font-bold mt-4">
            Criar Espaço
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
