import { useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGoalStore } from '@/stores/useGoalStore'
import { toast } from 'sonner'
import { Goal } from '@/lib/data'

interface CreateGoalDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGoalDrawer({
  open,
  onOpenChange,
}: CreateGoalDrawerProps) {
  const { addGoal } = useGoalStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    category: 'physical' as Goal['category'],
    metric: '',
    currentValue: '',
    targetValue: '',
    unit: '',
    deadline: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      addGoal({
        title: formData.title,
        category: formData.category,
        metric: formData.metric,
        currentValue: Number(formData.currentValue),
        targetValue: Number(formData.targetValue),
        unit: formData.unit,
        deadline: formData.deadline,
      })
      toast.success('Meta criada com sucesso!')
      setLoading(false)
      onOpenChange(false)
      // Reset form
      setFormData({
        title: '',
        category: 'physical',
        metric: '',
        currentValue: '',
        targetValue: '',
        unit: '',
        deadline: '',
      })
    }, 1000)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Nova Meta de Treino</DrawerTitle>
            <DrawerDescription>
              Defina seus objetivos e deixe o AI Coach te guiar.
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Nome da Meta</Label>
              <Input
                placeholder="Ex: Melhorar Sprints"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData({ ...formData, category: v as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Físico</SelectItem>
                    <SelectItem value="technical">Técnico</SelectItem>
                    <SelectItem value="tactical">Tático</SelectItem>
                    <SelectItem value="mental">Mental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prazo</Label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Métrica (O que vamos medir?)</Label>
              <Input
                placeholder="Ex: Velocidade Máxima"
                value={formData.metric}
                onChange={(e) =>
                  setFormData({ ...formData, metric: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Atual</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.currentValue}
                  onChange={(e) =>
                    setFormData({ ...formData, currentValue: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Alvo</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.targetValue}
                  onChange={(e) =>
                    setFormData({ ...formData, targetValue: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Unidade</Label>
                <Input
                  placeholder="km/h"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <DrawerFooter className="px-0 pb-0 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Criando...' : 'Criar Meta'}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
