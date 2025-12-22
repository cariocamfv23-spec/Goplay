import { useState } from 'react'
import {
  ArrowLeft,
  Wand2,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Download,
  Image as ImageIcon,
  Swords,
  Bike,
  Trophy,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { ShareDialog } from '@/components/ShareDialog'
import { cn } from '@/lib/utils'

type TemplateType = 'matchup' | 'event' | 'fight'

interface FlyerData {
  title: string
  teamA: string
  teamB: string
  date: string
  time: string
  location: string
  category: string
}

export default function FlyerCreator() {
  const navigate = useNavigate()
  const [step, setStep] = useState<
    'select' | 'details' | 'generating' | 'result'
  >('select')
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>('matchup')
  const [showShare, setShowShare] = useState(false)
  const [flyerData, setFlyerData] = useState<FlyerData>({
    title: '',
    teamA: '',
    teamB: '',
    date: '',
    time: '',
    location: '',
    category: '',
  })

  const templates = [
    {
      id: 'matchup',
      name: 'Dia de Jogo',
      description: 'Clássico confronto 1x1 ou Time vs Time',
      icon: Trophy,
      color: 'bg-blue-500',
    },
    {
      id: 'event',
      name: 'Evento Esportivo',
      description: 'Corridas, ciclismo e encontros gerais',
      icon: Bike,
      color: 'bg-green-500',
    },
    {
      id: 'fight',
      name: 'Fight Night',
      description: 'Boxe, MMA e artes marciais',
      icon: Swords,
      color: 'bg-red-500',
    },
  ]

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id as TemplateType)
    setStep('details')
  }

  const handleGenerate = () => {
    if (
      (selectedTemplate === 'matchup' &&
        (!flyerData.teamA || !flyerData.teamB)) ||
      (selectedTemplate === 'event' && !flyerData.title) ||
      !flyerData.date ||
      !flyerData.location
    ) {
      toast.error('Preencha as informações principais')
      return
    }

    setStep('generating')

    // Simulate AI generation
    setTimeout(() => {
      setStep('result')
      toast.success('Flyer gerado com sucesso!')
    }, 2500)
  }

  const handleDownload = () => {
    toast.success('Download iniciado...', {
      description: 'A imagem foi salva na sua galeria.',
    })
  }

  // Visual component for the flyer preview
  const FlyerPreview = () => {
    const getBgImage = () => {
      switch (selectedTemplate) {
        case 'fight':
          return 'https://img.usecurling.com/p/600/800?q=boxing%20ring%20dark&color=red'
        case 'event':
          return 'https://img.usecurling.com/p/600/800?q=road%20race%20cycling&color=green'
        default:
          return 'https://img.usecurling.com/p/600/800?q=soccer%20stadium%20night&color=blue'
      }
    }

    return (
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-black group">
        <img
          src={getBgImage()}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white text-center">
          {/* Header */}
          <div className="space-y-2 mt-4">
            <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-0 uppercase tracking-widest text-[10px]">
              Goplay Presents
            </Badge>
            {selectedTemplate === 'event' && (
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none drop-shadow-lg">
                {flyerData.title || 'NOME DO EVENTO'}
              </h2>
            )}
            {selectedTemplate === 'fight' && (
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none text-red-500 drop-shadow-lg">
                FIGHT NIGHT
              </h2>
            )}
            {selectedTemplate === 'matchup' && (
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none text-yellow-400 drop-shadow-lg">
                MATCH DAY
              </h2>
            )}
          </div>

          {/* Main Content (Teams/Event) */}
          <div className="space-y-4">
            {selectedTemplate === 'matchup' || selectedTemplate === 'fight' ? (
              <div className="flex flex-col gap-2 items-center">
                <div className="w-full">
                  <h3 className="text-2xl font-bold uppercase truncate drop-shadow-md">
                    {flyerData.teamA || 'TIME A'}
                  </h3>
                </div>
                <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center font-black italic border border-white/20">
                  VS
                </div>
                <div className="w-full">
                  <h3 className="text-2xl font-bold uppercase truncate drop-shadow-md">
                    {flyerData.teamB || 'TIME B'}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="px-4">
                <p className="text-lg font-medium opacity-90 leading-tight">
                  {flyerData.category || 'Categoria Livre'}
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="space-y-3 mb-4">
            <div className="flex flex-col gap-2 text-sm font-medium bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{flyerData.date || 'Data do Evento'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{flyerData.time || 'Horário'}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">
                  {flyerData.location || 'Localização'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Watermark */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-50">
          <Sparkles className="h-3 w-3 text-gold" />
          <span className="text-[8px] font-medium text-white">
            Generated with AI
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-safe animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/40 p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (step === 'select') navigate(-1)
            else if (step === 'generating') return
            else setStep('select')
          }}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Criador de Flyers</h1>
      </div>

      <div className="p-4 max-w-md mx-auto w-full">
        {/* STEP 1: SELECT TEMPLATE */}
        {step === 'select' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Escolha um Modelo</h2>
              <p className="text-muted-foreground text-sm">
                Selecione o estilo ideal para promover o seu evento esportivo.
              </p>
            </div>

            <div className="grid gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:border-primary transition-all active:scale-[0.98] overflow-hidden group border-border/60"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-0 flex">
                    <div
                      className={cn(
                        'w-3 bg-gradient-to-b from-primary/50 to-primary',
                        template.color
                          .replace('bg-', 'from-')
                          .replace('500', ''),
                      )}
                    />
                    <div className="p-5 flex items-center gap-4 w-full">
                      <div
                        className={cn(
                          'h-12 w-12 rounded-full flex items-center justify-center shrink-0 shadow-md',
                          template.color,
                        )}
                      >
                        <template.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {template.description}
                        </p>
                      </div>
                      <div className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                        <ArrowLeft className="h-5 w-5 rotate-180" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DETAILS */}
        {step === 'details' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Detalhes do Evento</h2>
              <p className="text-sm text-muted-foreground">
                Preencha as informações que aparecerão no flyer.
              </p>
            </div>

            <div className="space-y-4">
              {selectedTemplate === 'event' && (
                <div className="space-y-2">
                  <Label>Nome do Evento</Label>
                  <Input
                    placeholder="Ex: Maratona de Verão"
                    value={flyerData.title}
                    onChange={(e) =>
                      setFlyerData({ ...flyerData, title: e.target.value })
                    }
                  />
                </div>
              )}

              {(selectedTemplate === 'matchup' ||
                selectedTemplate === 'fight') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      {selectedTemplate === 'fight'
                        ? 'Lutador A'
                        : 'Time da Casa'}
                    </Label>
                    <Input
                      placeholder="Nome"
                      value={flyerData.teamA}
                      onChange={(e) =>
                        setFlyerData({ ...flyerData, teamA: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {selectedTemplate === 'fight' ? 'Lutador B' : 'Visitante'}
                    </Label>
                    <Input
                      placeholder="Nome"
                      value={flyerData.teamB}
                      onChange={(e) =>
                        setFlyerData({ ...flyerData, teamB: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {selectedTemplate === 'event' && (
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Input
                    placeholder="Ex: Ciclismo 50km"
                    value={flyerData.category}
                    onChange={(e) =>
                      setFlyerData({ ...flyerData, category: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={flyerData.date}
                    onChange={(e) =>
                      setFlyerData({ ...flyerData, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Horário</Label>
                  <Input
                    type="time"
                    value={flyerData.time}
                    onChange={(e) =>
                      setFlyerData({ ...flyerData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Local</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Ex: Arena Central, Quadra 2"
                    value={flyerData.location}
                    onChange={(e) =>
                      setFlyerData({ ...flyerData, location: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full h-12 text-lg font-bold shadow-lg mt-4 gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
              onClick={handleGenerate}
            >
              <Wand2 className="h-5 w-5" />
              Gerar Flyer com IA
            </Button>
          </div>
        )}

        {/* STEP 3: GENERATING */}
        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in zoom-in duration-500">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-muted flex items-center justify-center bg-secondary/30">
                <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">Criando Arte...</h3>
              <p className="text-muted-foreground max-w-[200px] mx-auto">
                A IA está desenhando seu flyer promocional.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 'result' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500 pb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Seu Flyer</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep('details')}
              >
                Editar
              </Button>
            </div>

            <div className="mx-auto max-w-sm">
              <FlyerPreview />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-14 rounded-xl gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
                Baixar
              </Button>
              <Button
                className="h-14 rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                onClick={() => setShowShare(true)}
              >
                <Share2 className="h-5 w-5" />
                Compartilhar
              </Button>
            </div>
          </div>
        )}
      </div>

      <ShareDialog open={showShare} onOpenChange={setShowShare} />
    </div>
  )
}
