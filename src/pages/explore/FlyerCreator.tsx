import { useState, useRef } from 'react'
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
  LayoutTemplate,
  Palette,
  Upload,
  Type,
  Check,
  RotateCcw,
  MonitorPlay,
  Trash2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { toast } from 'sonner'
import { ShareDialog } from '@/components/ShareDialog'
import { cn } from '@/lib/utils'

type TemplateType = 'matchup' | 'event' | 'fight'
type LayoutStyle = 'classic' | 'modern' | 'bold'
type ImageSource = 'ai' | 'upload'

interface FlyerData {
  title: string
  teamA: string
  teamB: string
  date: string
  time: string
  location: string
  category: string
}

interface DesignData {
  layout: LayoutStyle
  primaryColor: string
  secondaryColor: string
  imageSource: ImageSource
  customImage: string | null
  aiGeneratedImage: string | null
}

export default function FlyerCreator() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<
    'select' | 'details' | 'design' | 'generating' | 'result'
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

  const [designData, setDesignData] = useState<DesignData>({
    layout: 'classic',
    primaryColor: '#ffffff',
    secondaryColor: '#ef4444', // Default Red
    imageSource: 'ai',
    customImage: null,
    aiGeneratedImage: null,
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

  const colorPresets = [
    '#ffffff', // White
    '#000000', // Black
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#22c55e', // Green
    '#eab308', // Yellow
    '#a855f7', // Purple
    '#ec4899', // Pink
  ]

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id as TemplateType)
    // Set default colors based on template
    if (id === 'matchup')
      setDesignData((prev) => ({ ...prev, secondaryColor: '#eab308' }))
    if (id === 'event')
      setDesignData((prev) => ({ ...prev, secondaryColor: '#22c55e' }))
    if (id === 'fight')
      setDesignData((prev) => ({ ...prev, secondaryColor: '#ef4444' }))
    setStep('details')
  }

  const handleDetailsSubmit = () => {
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
    setStep('design')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDesignData((prev) => ({
          ...prev,
          customImage: reader.result as string,
          imageSource: 'upload',
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = () => {
    if (designData.imageSource === 'upload' && !designData.customImage) {
      toast.error('Por favor, faça o upload de uma imagem')
      return
    }

    if (designData.imageSource === 'ai') {
      setStep('generating')

      // Determine query based on data
      let query = 'sports stadium'
      if (selectedTemplate === 'fight')
        query = 'boxing ring mma dark atmosphere'
      if (selectedTemplate === 'event')
        query = `${flyerData.category || 'sports'} event outdoor`
      if (selectedTemplate === 'matchup')
        query = `${flyerData.category || 'soccer'} stadium night match`

      // Simulate AI generation
      setTimeout(() => {
        // Use placeholder with query
        const aiImage = `https://img.usecurling.com/p/600/800?q=${encodeURIComponent(query)}&color=${designData.secondaryColor.replace('#', '')}`
        setDesignData((prev) => ({ ...prev, aiGeneratedImage: aiImage }))
        setStep('result')
        toast.success('Flyer gerado com sucesso!')
      }, 3000)
    } else {
      // Direct to result for upload
      setStep('result')
      toast.success('Flyer criado com sucesso!')
    }
  }

  const handleDownload = () => {
    toast.success('Download iniciado...', {
      description: 'A imagem foi salva na sua galeria.',
    })
  }

  // Visual component for the flyer preview
  const FlyerPreview = ({ interactive = false }: { interactive?: boolean }) => {
    // Determine background image
    let bgImage = ''
    if (designData.imageSource === 'upload' && designData.customImage) {
      bgImage = designData.customImage
    } else if (
      designData.imageSource === 'ai' &&
      designData.aiGeneratedImage &&
      step === 'result'
    ) {
      bgImage = designData.aiGeneratedImage
    } else {
      // Preview/Placeholder for Design Step
      switch (selectedTemplate) {
        case 'fight':
          bgImage =
            'https://img.usecurling.com/p/600/800?q=boxing%20ring%20dark&color=red'
          break
        case 'event':
          bgImage =
            'https://img.usecurling.com/p/600/800?q=road%20race%20cycling&color=green'
          break
        default:
          bgImage =
            'https://img.usecurling.com/p/600/800?q=soccer%20stadium%20night&color=blue'
      }
    }

    // Styles based on Layout
    const isClassic = designData.layout === 'classic'
    const isModern = designData.layout === 'modern'
    const isBold = designData.layout === 'bold'

    return (
      <div
        className={cn(
          'relative w-full aspect-[3/4] overflow-hidden shadow-2xl bg-black group transition-all duration-500',
          interactive ? 'rounded-xl' : 'rounded-none',
        )}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          <img
            src={bgImage}
            alt="Background"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-transform duration-700',
              step === 'result' ? '' : 'opacity-80',
              isBold ? 'grayscale opacity-50 contrast-125' : 'opacity-70',
            )}
          />
        </div>

        {/* Overlays based on layout */}
        {isClassic && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        )}

        {isModern && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            <div
              className="absolute left-0 bottom-0 top-0 w-1/3 opacity-90 backdrop-blur-sm"
              style={{ backgroundColor: designData.secondaryColor }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </>
        )}

        {isBold && (
          <div
            className="absolute inset-4 border-4 z-10"
            style={{ borderColor: designData.primaryColor }}
          />
        )}

        {/* Content Overlay */}
        <div
          className={cn(
            'absolute inset-0 p-6 flex flex-col text-white transition-all duration-500',
            isClassic ? 'justify-between text-center' : '',
            isModern ? 'justify-end text-left pl-8 pb-10' : '',
            isBold ? 'justify-center items-center text-center' : '',
          )}
        >
          {/* Header */}
          <div
            className={cn(
              'space-y-2',
              isClassic ? 'mt-4' : '',
              isModern ? 'absolute top-6 left-6' : '',
              isBold ? 'absolute top-10' : '',
            )}
          >
            <Badge
              className="backdrop-blur-md border-0 uppercase tracking-widest text-[10px]"
              style={{
                backgroundColor: isModern ? 'white' : 'rgba(255,255,255,0.2)',
                color: isModern ? 'black' : 'white',
              }}
            >
              Goplay Presents
            </Badge>

            {!isModern && (
              <h2
                className="text-3xl font-black uppercase tracking-tighter leading-none drop-shadow-lg"
                style={{
                  color: isBold
                    ? designData.secondaryColor
                    : designData.primaryColor,
                }}
              >
                {selectedTemplate === 'event'
                  ? flyerData.title || 'NOME DO EVENTO'
                  : selectedTemplate === 'fight'
                    ? 'FIGHT NIGHT'
                    : 'MATCH DAY'}
              </h2>
            )}
          </div>

          {/* Main Content (Teams/Event) */}
          <div className="space-y-4 my-auto w-full">
            {selectedTemplate === 'matchup' || selectedTemplate === 'fight' ? (
              <div
                className={cn(
                  'flex gap-4 items-center',
                  isModern ? 'flex-col items-start' : 'flex-col',
                )}
              >
                <div className="w-full">
                  <h3
                    className={cn(
                      'font-bold uppercase truncate drop-shadow-md',
                      isBold ? 'text-5xl' : 'text-3xl',
                      isModern ? 'text-4xl text-left' : '',
                    )}
                    style={{
                      color: isBold ? 'white' : designData.primaryColor,
                    }}
                  >
                    {flyerData.teamA || 'TIME A'}
                  </h3>
                </div>

                <div
                  className={cn(
                    'flex items-center justify-center font-black italic',
                    isBold
                      ? 'text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500'
                      : 'h-10 w-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm',
                  )}
                  style={
                    isModern
                      ? {
                          color: designData.primaryColor,
                          background: 'none',
                          padding: 0,
                          justifyContent: 'flex-start',
                          border: 'none',
                        }
                      : {}
                  }
                >
                  VS
                </div>

                <div className="w-full">
                  <h3
                    className={cn(
                      'font-bold uppercase truncate drop-shadow-md',
                      isBold ? 'text-5xl' : 'text-3xl',
                      isModern ? 'text-4xl text-left' : '',
                    )}
                    style={{
                      color: isBold ? 'white' : designData.primaryColor,
                    }}
                  >
                    {flyerData.teamB || 'TIME B'}
                  </h3>
                </div>
              </div>
            ) : (
              <div className={cn('w-full', isModern ? 'pl-2' : 'px-4')}>
                {isModern && (
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none drop-shadow-lg mb-4 text-white">
                    {flyerData.title || 'NOME DO EVENTO'}
                  </h2>
                )}
                <p
                  className="text-2xl font-black uppercase opacity-90 leading-tight"
                  style={{ color: designData.secondaryColor }}
                >
                  {flyerData.category || 'Categoria Livre'}
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div
            className={cn(
              'space-y-3',
              isClassic ? 'mb-4' : '',
              isModern ? 'mb-0' : '',
              isBold ? 'absolute bottom-10 w-full px-10' : '',
            )}
          >
            <div
              className={cn(
                'flex flex-col gap-2 text-sm font-medium backdrop-blur-md p-4 rounded-xl border border-white/10',
                isModern
                  ? 'bg-transparent border-none p-0 items-start'
                  : 'bg-black/40',
              )}
            >
              <div className="flex items-center gap-2">
                <Calendar
                  className="h-4 w-4"
                  style={{ color: designData.secondaryColor }}
                />
                <span>{flyerData.date || 'Data do Evento'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock
                  className="h-4 w-4"
                  style={{ color: designData.secondaryColor }}
                />
                <span>{flyerData.time || 'Horário'}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <MapPin
                  className="h-4 w-4 shrink-0"
                  style={{ color: designData.secondaryColor }}
                />
                <span className="truncate">
                  {flyerData.location || 'Localização'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Watermark or Brand */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-50">
          <Sparkles className="h-3 w-3 text-white" />
          <span className="text-[8px] font-medium text-white">
            Goplay Design
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
            else if (step === 'result') setStep('design')
            else if (step === 'design') setStep('details')
            else setStep('select')
          }}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">Criador de Flyers</h1>
      </div>

      <div className="p-4 max-w-4xl mx-auto w-full">
        {/* STEP 1: SELECT TEMPLATE */}
        {step === 'select' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto">
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
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 max-w-md mx-auto">
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
              className="w-full h-12 text-lg font-bold shadow-lg mt-4 gap-2"
              onClick={handleDetailsSubmit}
            >
              Continuar
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Button>
          </div>
        )}

        {/* STEP 3: DESIGN (NEW) */}
        {step === 'design' && (
          <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
            {/* Preview Section */}
            <div className="flex-1 order-1 md:order-2">
              <div className="sticky top-20 mx-auto max-w-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-sm">Preview em Tempo Real</h3>
                  {designData.imageSource === 'ai' && (
                    <Badge variant="outline" className="text-[10px] gap-1">
                      <Wand2 className="h-3 w-3" /> Imagem IA
                    </Badge>
                  )}
                </div>
                <FlyerPreview interactive />
              </div>
            </div>

            {/* Controls Section */}
            <div className="w-full md:w-[400px] order-2 md:order-1 space-y-8 pb-10">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Personalizar</h2>
                <p className="text-sm text-muted-foreground">
                  Ajuste o visual do seu flyer.
                </p>
              </div>

              {/* Layout Selection */}
              <div className="space-y-3">
                <Label className="text-base">Layout</Label>
                <ToggleGroup
                  type="single"
                  value={designData.layout}
                  onValueChange={(val) =>
                    val &&
                    setDesignData({ ...designData, layout: val as LayoutStyle })
                  }
                  className="justify-start gap-4"
                >
                  <ToggleGroupItem
                    value="classic"
                    className="h-20 w-24 flex flex-col gap-2 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5"
                  >
                    <LayoutTemplate className="h-6 w-6" />
                    <span className="text-xs">Clássico</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="modern"
                    className="h-20 w-24 flex flex-col gap-2 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5"
                  >
                    <MonitorPlay className="h-6 w-6" />
                    <span className="text-xs">Moderno</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="bold"
                    className="h-20 w-24 flex flex-col gap-2 border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/5"
                  >
                    <Type className="h-6 w-6" />
                    <span className="text-xs">Bold</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <Label className="text-base">Cores do Tema</Label>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Cor Primária (Textos)
                    </Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 rounded-full border border-border"
                        style={{ backgroundColor: designData.primaryColor }}
                      ></div>
                      <span className="text-xs font-mono">
                        {designData.primaryColor}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {colorPresets.map((color) => (
                      <button
                        key={`primary-${color}`}
                        className={cn(
                          'h-8 w-8 rounded-full border border-border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                          designData.primaryColor === color
                            ? 'ring-2 ring-primary ring-offset-2 scale-110'
                            : '',
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          setDesignData({ ...designData, primaryColor: color })
                        }
                      />
                    ))}
                    <div className="relative">
                      <input
                        type="color"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        value={designData.primaryColor}
                        onChange={(e) =>
                          setDesignData({
                            ...designData,
                            primaryColor: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Palette className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Cor Secundária (Detalhes)
                    </Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 rounded-full border border-border"
                        style={{ backgroundColor: designData.secondaryColor }}
                      ></div>
                      <span className="text-xs font-mono">
                        {designData.secondaryColor}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {colorPresets.map((color) => (
                      <button
                        key={`secondary-${color}`}
                        className={cn(
                          'h-8 w-8 rounded-full border border-border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                          designData.secondaryColor === color
                            ? 'ring-2 ring-primary ring-offset-2 scale-110'
                            : '',
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          setDesignData({
                            ...designData,
                            secondaryColor: color,
                          })
                        }
                      />
                    ))}
                    <div className="relative">
                      <input
                        type="color"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        value={designData.secondaryColor}
                        onChange={(e) =>
                          setDesignData({
                            ...designData,
                            secondaryColor: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Palette className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Image Source */}
              <div className="space-y-3">
                <Label className="text-base">Imagem de Fundo</Label>
                <Tabs
                  value={designData.imageSource}
                  onValueChange={(val) =>
                    setDesignData({
                      ...designData,
                      imageSource: val as ImageSource,
                    })
                  }
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="ai" className="gap-2">
                      <Wand2 className="h-4 w-4" />
                      Gerar com IA
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Próprio
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ai" className="mt-4 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      A IA irá gerar uma imagem única baseada nos detalhes do
                      seu evento.
                    </p>
                    <div className="p-4 border rounded-lg bg-secondary/20 flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="text-sm">
                        Imagem gerada automaticamente na próxima etapa.
                      </span>
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="mt-4 space-y-4">
                    <div className="grid gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {designData.customImage ? (
                        <div className="relative rounded-lg overflow-hidden border aspect-video group">
                          <img
                            src={designData.customImage}
                            alt="Custom"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <RotateCcw className="h-4 w-4 mr-2" /> Trocar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                setDesignData({
                                  ...designData,
                                  customImage: null,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/50 transition-colors"
                        >
                          <div className="bg-secondary p-3 rounded-full mb-3">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-medium">
                            Clique para selecionar
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG ou PNG (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Button
                className="w-full h-12 text-lg font-bold shadow-lg mt-8 gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                onClick={handleGenerate}
              >
                {designData.imageSource === 'ai' ? (
                  <>
                    <Wand2 className="h-5 w-5" />
                    Gerar Flyer
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    Finalizar Flyer
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: GENERATING */}
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

        {/* STEP 5: RESULT */}
        {step === 'result' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500 pb-10 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Seu Flyer</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep('design')}
              >
                Editar Design
              </Button>
            </div>

            <div className="mx-auto w-full">
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

            {designData.imageSource === 'ai' && (
              <Button
                variant="ghost"
                className="w-full text-xs text-muted-foreground gap-2"
                onClick={() => setStep('generating')}
              >
                <RefreshCw className="h-3 w-3" />
                Gerar nova imagem com IA
              </Button>
            )}
          </div>
        )}
      </div>

      <ShareDialog open={showShare} onOpenChange={setShowShare} />
    </div>
  )
}
