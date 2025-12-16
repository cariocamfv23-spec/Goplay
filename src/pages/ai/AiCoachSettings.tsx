import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Volume2, Eye, Zap, Activity } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  FeedbackDetail,
  FeedbackFrequency,
  FeedbackType,
  useAiCoachStore,
} from '@/stores/useAiCoachStore'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AiCoachSettings() {
  const navigate = useNavigate()
  const { preferences, setPreference } = useAiCoachStore()

  const handleSave = () => {
    toast.success('Configurações salvas', {
      description: 'Suas preferências do AI Coach foram atualizadas.',
    })
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Configurações AI Coach</h1>
        </div>
        <Button size="sm" onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar
        </Button>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
            <Activity className="h-4 w-4" />
            Feedback e Análise
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">
                Estilo de Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Tipo de Feedback</Label>
                <Select
                  value={preferences.feedbackType}
                  onValueChange={(v) =>
                    setPreference('feedbackType', v as FeedbackType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verbal">
                      Apenas Verbal (Áudio)
                    </SelectItem>
                    <SelectItem value="visual">Apenas Visual (Tela)</SelectItem>
                    <SelectItem value="all">
                      Completo (Áudio + Visual)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Como você prefere receber as instruções durante o treino.
                </p>
              </div>

              <div className="space-y-3">
                <Label>Detalhamento</Label>
                <Select
                  value={preferences.feedbackDetail}
                  onValueChange={(v) =>
                    setPreference('feedbackDetail', v as FeedbackDetail)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o detalhamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">
                      Resumido (Foco no essencial)
                    </SelectItem>
                    <SelectItem value="detailed">
                      Detalhado (Análise técnica completa)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Frequência</Label>
                <Select
                  value={preferences.feedbackFrequency}
                  onValueChange={(v) =>
                    setPreference('feedbackFrequency', v as FeedbackFrequency)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">
                      Tempo Real (Durante a execução)
                    </SelectItem>
                    <SelectItem value="end_of_set">
                      Ao final da série
                    </SelectItem>
                    <SelectItem value="end_of_session">
                      Ao final do treino
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
            <Zap className="h-4 w-4" />
            Integrações
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gold" />
                    <Label className="text-base">Coach na Arena Mode</Label>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-[250px]">
                    Receba dicas táticas e motivacionais do AI Coach durante as
                    sessões de AR.
                  </p>
                </div>
                <Switch
                  checked={preferences.enabledInArena}
                  onCheckedChange={(c) => setPreference('enabledInArena', c)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-blue-400" />
                    <Label className="text-base">Comandos de Voz</Label>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-[250px]">
                    Permitir que o AI Coach utilize síntese de voz para
                    instruções.
                  </p>
                </div>
                <Switch
                  checked={preferences.voiceEnabled}
                  onCheckedChange={(c) => setPreference('voiceEnabled', c)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
