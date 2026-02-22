import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useArenaStore } from '@/stores/useArenaStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Shield } from 'lucide-react'
import { toast } from 'sonner'

export default function CreateArenaChallenge() {
  const navigate = useNavigate()
  const { addChallenge } = useArenaStore()

  const [formData, setFormData] = useState({
    modality: 'Futebol',
    type: 'Técnico',
    title: '',
    description: '',
    rules: '',
    criteria: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    audience: 'Público geral',
    videoRequired: true,
    moveDataAllowed: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.endDate) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }

    addChallenge({
      modality: formData.modality,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      rules: formData.rules,
      criteria: formData.criteria,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      audience: formData.audience,
      videoRequired: formData.videoRequired,
      moveDataAllowed: formData.moveDataAllowed,
    })

    toast.success('Desafio criado com sucesso!', {
      description: 'Ele já está disponível na Arena.',
    })
    navigate('/arena')
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 flex items-center gap-3 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 font-bold text-lg">
          <Shield className="w-5 h-5 text-gold" />
          Criar Desafio
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Modalidade</Label>
              <Select
                value={formData.modality}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, modality: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Futebol">Futebol</SelectItem>
                  <SelectItem value="Basquete">Basquete</SelectItem>
                  <SelectItem value="Corrida">Corrida</SelectItem>
                  <SelectItem value="Crossfit">Crossfit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Desafio</Label>
              <Select
                value={formData.type}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, type: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Técnico">Técnico</SelectItem>
                  <SelectItem value="Velocidade">Velocidade</SelectItem>
                  <SelectItem value="Precisão">Precisão</SelectItem>
                  <SelectItem value="Resistência">Resistência</SelectItem>
                  <SelectItem value="Criativo">Criativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Título do Desafio</Label>
            <Input
              placeholder="Ex: Rei da Embaixadinha"
              value={formData.title}
              onChange={(e) =>
                setFormData((p) => ({ ...p, title: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              placeholder="Explique o desafio..."
              className="resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Regras Detalhadas</Label>
            <Textarea
              placeholder="O que é permitido e proibido?"
              className="resize-none"
              value={formData.rules}
              onChange={(e) =>
                setFormData((p) => ({ ...p, rules: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Critério de Pontuação</Label>
            <Textarea
              placeholder="Ex: IA analisa 50% precisão, comunidade 50% estilo..."
              className="resize-none"
              value={formData.criteria}
              onChange={(e) =>
                setFormData((p) => ({ ...p, criteria: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data Início</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, startDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, endDate: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Público</Label>
            <Select
              value={formData.audience}
              onValueChange={(val) =>
                setFormData((p) => ({ ...p, audience: val }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Público geral">Público geral</SelectItem>
                <SelectItem value="Somente seguidores">
                  Somente seguidores
                </SelectItem>
                <SelectItem value="Privado">Privado por convite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-secondary/40 p-4 rounded-xl border border-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Vídeo Obrigatório</Label>
                <p className="text-[10px] text-muted-foreground">
                  Para análise visual da IA.
                </p>
              </div>
              <Switch
                checked={formData.videoRequired}
                onCheckedChange={(c) =>
                  setFormData((p) => ({ ...p, videoRequired: c }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Permitir Dados MOVE</Label>
                <p className="text-[10px] text-muted-foreground">
                  Integrar stats de smartwatches.
                </p>
              </div>
              <Switch
                checked={formData.moveDataAllowed}
                onCheckedChange={(c) =>
                  setFormData((p) => ({ ...p, moveDataAllowed: c }))
                }
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gold hover:bg-gold/90 text-black font-bold text-base"
        >
          Publicar Desafio
        </Button>
      </form>
    </div>
  )
}
