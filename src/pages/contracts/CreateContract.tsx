import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContractStore, ContractMetric } from '@/stores/useContractStore'
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
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Plus,
  Trash2,
  TrendingUp,
  Target,
  DollarSign,
  User,
} from 'lucide-react'
import { toast } from 'sonner'
import { mockTalents } from '@/lib/data'

export default function CreateContract() {
  const navigate = useNavigate()
  const { addContract } = useContractStore()

  // Form State
  const [title, setTitle] = useState('')
  const [athleteName, setAthleteName] = useState('')
  const [baseValue, setBaseValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [metrics, setMetrics] = useState<
    Omit<ContractMetric, 'id' | 'currentValue'>[]
  >([])

  // Metric Builder State
  const [newMetric, setNewMetric] = useState({
    label: '',
    targetValue: '',
    unit: '',
    impactValue: '',
    type: 'linear' as 'linear' | 'milestone',
  })

  const handleAddMetric = () => {
    if (
      !newMetric.label ||
      !newMetric.targetValue ||
      !newMetric.unit ||
      !newMetric.impactValue
    ) {
      toast.error('Preencha todos os campos da métrica')
      return
    }

    setMetrics([
      ...metrics,
      {
        label: newMetric.label,
        targetValue: Number(newMetric.targetValue),
        unit: newMetric.unit,
        impactValue: Number(newMetric.impactValue),
        type: newMetric.type,
      },
    ])

    // Reset metric form
    setNewMetric({
      label: '',
      targetValue: '',
      unit: '',
      impactValue: '',
      type: 'linear',
    })
  }

  const handleRemoveMetric = (index: number) => {
    const updated = [...metrics]
    updated.splice(index, 1)
    setMetrics(updated)
  }

  const handleSubmit = () => {
    if (!title || !athleteName || !baseValue || !startDate || !endDate) {
      toast.error('Preencha as informações básicas do contrato')
      return
    }

    if (metrics.length === 0) {
      toast.error('Adicione pelo menos uma métrica de performance')
      return
    }

    addContract({
      title,
      proposerName: 'Minha Organização', // Mock
      proposerLogo: 'https://img.usecurling.com/i?q=organization&color=blue', // Mock
      athleteName,
      baseValue: Number(baseValue),
      currency: 'R$',
      status: 'pending',
      startDate,
      endDate,
      metrics: metrics.map((m) => ({
        ...m,
        id: `m-${Date.now()}-${Math.random()}`,
        currentValue: 0,
      })),
    })

    toast.success('Proposta enviada com sucesso!')
    navigate('/contracts')
  }

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in flex flex-col">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 shadow-sm flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="-ml-2 hover:bg-secondary/50 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg leading-none">Nova Proposta</h1>
      </div>

      <div className="flex-1 p-4 space-y-6 max-w-2xl mx-auto w-full">
        {/* Basic Info Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-semibold text-sm">Informações Básicas</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="title">Título do Contrato</Label>
              <Input
                id="title"
                placeholder="Ex: Patrocínio Master 2025"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="athlete">Atleta / Time</Label>
              <Select onValueChange={setAthleteName} value={athleteName}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o destinatário" />
                </SelectTrigger>
                <SelectContent>
                  {mockTalents.map((talent) => (
                    <SelectItem key={talent.id} value={talent.name}>
                      {talent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="start">Início</Label>
                <Input
                  id="start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="end">Fim</Label>
                <Input
                  id="end"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="baseValue">Valor Base (Garantido)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
                  R$
                </span>
                <Input
                  id="baseValue"
                  type="number"
                  placeholder="0,00"
                  className="pl-9"
                  value={baseValue}
                  onChange={(e) => setBaseValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="space-y-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <h2 className="font-semibold text-sm">Gatilhos de Performance</h2>
          </div>

          <Card className="bg-secondary/20 border-border/50">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 col-span-2">
                  <Label className="text-xs">Métrica</Label>
                  <Input
                    placeholder="Ex: Gols, Seguidores, Jogos"
                    value={newMetric.label}
                    onChange={(e) =>
                      setNewMetric({ ...newMetric, label: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Meta</Label>
                  <Input
                    type="number"
                    placeholder="Alvo"
                    value={newMetric.targetValue}
                    onChange={(e) =>
                      setNewMetric({
                        ...newMetric,
                        targetValue: e.target.value,
                      })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Unidade</Label>
                  <Input
                    placeholder="unid"
                    value={newMetric.unit}
                    onChange={(e) =>
                      setNewMetric({ ...newMetric, unit: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Bônus (Impacto)</Label>
                  <Input
                    type="number"
                    placeholder="R$ +"
                    value={newMetric.impactValue}
                    onChange={(e) =>
                      setNewMetric({
                        ...newMetric,
                        impactValue: e.target.value,
                      })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tipo</Label>
                  <Select
                    value={newMetric.type}
                    onValueChange={(v: any) =>
                      setNewMetric({ ...newMetric, type: v })
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">
                        Linear (Proporcional)
                      </SelectItem>
                      <SelectItem value="milestone">
                        Milestone (Tudo ou Nada)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-dashed border-primary/30 text-primary hover:bg-primary/5 h-9"
                onClick={handleAddMetric}
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar Gatilho
              </Button>
            </CardContent>
          </Card>

          {/* Metrics List */}
          <div className="space-y-2">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl border bg-card shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Meta: {metric.targetValue} {metric.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-xs font-bold text-green-600">
                      + R$ {metric.impactValue}
                    </span>
                    <span className="block text-[9px] text-muted-foreground uppercase">
                      {metric.type === 'linear' ? 'Proporcional' : 'Fixo'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveMetric(index)}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Total Potential */}
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Valor Base:</span>
            <span className="font-bold">
              R$ {Number(baseValue || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-green-600">Potencial Extra:</span>
            <span className="font-bold text-green-600">
              + R${' '}
              {metrics
                .reduce((acc, m) => acc + Number(m.impactValue), 0)
                .toLocaleString()}
            </span>
          </div>
          <div className="border-t border-primary/10 mt-3 pt-3 flex justify-between items-center">
            <span className="font-bold">Valor Total Possível:</span>
            <span className="font-bold text-lg text-primary">
              R${' '}
              {(
                Number(baseValue || 0) +
                metrics.reduce((acc, m) => acc + Number(m.impactValue), 0)
              ).toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full font-bold shadow-lg h-12 text-base"
          onClick={handleSubmit}
        >
          <DollarSign className="mr-2 h-5 w-5" />
          Enviar Proposta
        </Button>
      </div>
    </div>
  )
}
