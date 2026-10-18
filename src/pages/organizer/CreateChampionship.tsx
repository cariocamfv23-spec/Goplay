import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChampionshipStore } from '@/stores/useChampionshipStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Trophy, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { eventsService } from '@/services/events'
import { toast } from 'sonner'

export default function CreateChampionship() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addChampionship } = useChampionshipStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [type, setType] = useState<'tryout' | 'event'>('tryout')
  const [formData, setFormData] = useState({
    title: '',
    sport: 'Futebol',
    category: 'Sub-17 / Sub-20',
    startDate: '',
    eventTime: '08:30',
    city: 'São Paulo',
    state: 'SP',
    location: '',
    requirements: '',
    instructions: '',
    entryFee: '0',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.startDate || !formData.location) {
      toast.error('Preencha os campos obrigatórios (*)')
      return
    }

    if (user?.id) {
      setIsSubmitting(true)
      const { data, error } = await eventsService.createEvent({
        creatorId: user.id,
        title: formData.title,
        description: formData.description,
        type: type === 'tryout' ? 'tryout' : 'championship',
        sport: formData.sport,
        category: formData.category,
        eventDate: formData.startDate,
        eventTime: formData.eventTime,
        city: formData.city,
        state: formData.state,
        locationName: formData.location,
        requirements: formData.requirements,
        instructions: formData.instructions,
        price: parseFloat(formData.entryFee) || 0,
      })
      setIsSubmitting(false)

      if (error || !data) {
        toast.error(
          'Erro ao criar evento: ' + (error?.message || 'Tente novamente.'),
        )
        return
      }

      toast.success(
        type === 'tryout'
          ? 'Peneira oficial criada com sucesso!'
          : 'Evento criado com sucesso!',
      )
      navigate(`/events/${data.id}`)
      return
    }

    // Local state fallback
    addChampionship({
      name: formData.title,
      modality: formData.sport,
      description: formData.description,
      location: formData.location,
      rules: formData.instructions || 'Regulamento padrão Goplay',
    })

    toast.success('Evento criado!')
    navigate('/organizer')
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 border-b border-border/40 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Criar Evento ou Peneira</h1>
            <p className="text-xs text-muted-foreground">
              Publicação oficial conectada ao Supabase
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type selector */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === 'tryout' ? 'default' : 'outline'}
              className="flex-1 text-xs h-10 border-amber-500/40"
              onClick={() => setType('tryout')}
            >
              ⭐ Peneira / Seletiva Oficial
            </Button>
            <Button
              type="button"
              variant={type === 'event' ? 'default' : 'outline'}
              className="flex-1 text-xs h-10"
              onClick={() => setType('event')}
            >
              Torneio / Campeonato
            </Button>
          </div>

          <Card className="border-none shadow-md">
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Nome do Evento / Peneira *
                </label>
                <Input
                  placeholder="Ex: Peneira Sub-17 Clube Atlético 2025"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Modalidade *
                  </label>
                  <select
                    className="w-full bg-secondary/50 rounded-md px-3 py-2 text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.sport}
                    onChange={(e) =>
                      setFormData({ ...formData, sport: e.target.value })
                    }
                  >
                    <option value="Futebol">Futebol</option>
                    <option value="Basquete">Basquete</option>
                    <option value="Vôlei">Vôlei</option>
                    <option value="Judô">Judô / Lutas</option>
                    <option value="Natação">Natação</option>
                    <option value="Futsal">Futsal</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Categoria
                  </label>
                  <Input
                    placeholder="Ex: Sub-17, Livre"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Data do Evento *
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Horário de Apresentação
                  </label>
                  <Input
                    placeholder="08:30"
                    value={formData.eventTime}
                    onChange={(e) =>
                      setFormData({ ...formData, eventTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">
                    Cidade *
                  </label>
                  <Input
                    placeholder="São Paulo"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">UF *</label>
                  <Input
                    placeholder="SP"
                    maxLength={2}
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Local / Instalação Esportiva *
                </label>
                <Input
                  placeholder="Ex: CT Ninho das Águias - Campo 1"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Requisitos Obrigatórios (Documentos, Atestado)
                </label>
                <Textarea
                  placeholder="Ex: Atestado médico com validade inferior a 6 meses, RG original e chuteira..."
                  rows={2}
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Instruções aos Atletas
                </label>
                <Textarea
                  placeholder="Ex: Comparecer 30min antes, trajando calção e meião preto..."
                  rows={2}
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Valor da Inscrição (R$)
                </label>
                <Input
                  type="number"
                  placeholder="0 para Gratuito"
                  value={formData.entryFee}
                  onChange={(e) =>
                    setFormData({ ...formData, entryFee: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Descrição Completa
                </label>
                <Textarea
                  placeholder="Informações sobre a comissão técnica, metodologia de avaliação..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-primary font-bold h-11"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Criando no Supabase...
              </>
            ) : (
              'Publicar Evento Oficial'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
