import { Championship } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Save } from 'lucide-react'

interface OverviewTabProps {
  championship: Championship
}

export function OverviewTab({ championship }: OverviewTabProps) {
  const { updateChampionship } = useChampionshipStore()
  const [formData, setFormData] = useState({
    name: championship.name,
    description: championship.description,
    location: championship.location || '',
    status: championship.status,
    modality: championship.modality,
  })

  const handleSave = () => {
    updateChampionship(championship.id, formData)
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do Campeonato</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Modalidade</label>
            <Input
              value={formData.modality}
              onChange={(e) =>
                setFormData({ ...formData, modality: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Local Principal</label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Ex: Arena XP"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value: any) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="open">Inscrições Abertas</SelectItem>
                <SelectItem value="active">Em Andamento</SelectItem>
                <SelectItem value="completed">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} className="w-full gap-2 mt-4">
            <Save className="h-4 w-4" /> Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
