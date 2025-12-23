import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Trophy } from 'lucide-react'

export default function CreateChampionship() {
  const navigate = useNavigate()
  const { addChampionship } = useChampionshipStore()
  const [formData, setFormData] = useState({
    name: '',
    modality: '',
    description: '',
    location: '',
  })

  const handleSubmit = () => {
    if (!formData.name || !formData.modality) return

    addChampionship(formData)
    navigate('/organizer')
  }

  return (
    <div className="min-h-screen bg-background p-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Criar Campeonato</h1>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
              <Trophy className="h-10 w-10" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do Evento</label>
            <Input
              placeholder="Ex: Copa de Verão 2025"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Modalidade Esportiva</label>
            <Input
              placeholder="Ex: Futebol, Vôlei, Basquete..."
              value={formData.modality}
              onChange={(e) =>
                setFormData({ ...formData, modality: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Local Principal</label>
            <Input
              placeholder="Ex: Centro Esportivo Municipal"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              placeholder="Descreva brevemente o campeonato..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <Button
            className="w-full mt-4 bg-primary font-bold text-lg h-12"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.modality}
          >
            Criar Campeonato
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
