import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Upload,
  Gem,
  Download,
  Share2,
  Sparkles,
  Wand2,
  RefreshCw,
  Palette,
  Box,
  Zap,
  Ghost,
  Layers,
  Paintbrush,
  Star,
  Monitor,
  Sliders,
  Type,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { ShareDialog } from '@/components/ShareDialog'
import { cn } from '@/lib/utils'
import { NftCard, NftStyleConfig } from '@/components/NftCard'

type NftStyle =
  | 'classic'
  | 'cyberpunk'
  | 'gold'
  | 'holographic'
  | 'pixel'
  | '3d'
  | 'pop'
  | 'sketch'
  | 'oil'

type TextPosition = 'top' | 'center' | 'bottom'

interface StyleConfig {
  id: NftStyle
  name: string
  color: string
  icon: any
  defaults: {
    brightness: number
    contrast: number
    saturate: number
    sepia: number
    blur: number
    hue: number
    grayscale: number
  }
}

const styles: StyleConfig[] = [
  {
    id: 'classic',
    name: 'Clássico',
    color: 'from-slate-700 to-slate-900',
    icon: Gem,
    defaults: {
      brightness: 100,
      contrast: 100,
      saturate: 100,
      sepia: 0,
      blur: 0,
      hue: 0,
      grayscale: 0,
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    color: 'from-pink-500 to-cyan-500',
    icon: Zap,
    defaults: {
      brightness: 100,
      contrast: 125,
      saturate: 150,
      sepia: 0,
      blur: 0,
      hue: 15,
      grayscale: 0,
    },
  },
  {
    id: 'gold',
    name: 'Lendário',
    color: 'from-yellow-400 to-yellow-600',
    icon: Star,
    defaults: {
      brightness: 100,
      contrast: 110,
      saturate: 125,
      sepia: 30,
      blur: 0,
      hue: 0,
      grayscale: 0,
    },
  },
  {
    id: 'holographic',
    name: 'Holográfico',
    color: 'from-indigo-400 to-purple-400',
    icon: Ghost,
    defaults: {
      brightness: 110,
      contrast: 110,
      saturate: 100,
      sepia: 0,
      blur: 0,
      hue: 0,
      grayscale: 0,
    },
  },
  {
    id: 'pixel',
    name: 'Retro Pixel',
    color: 'from-green-500 to-emerald-700',
    icon: Monitor,
    defaults: {
      brightness: 90,
      contrast: 125,
      saturate: 0,
      sepia: 0,
      blur: 0,
      hue: 0,
      grayscale: 100,
    },
  },
  {
    id: '3d',
    name: 'Modern 3D',
    color: 'from-blue-400 to-blue-600',
    icon: Box,
    defaults: {
      brightness: 105,
      contrast: 105,
      saturate: 110,
      sepia: 0,
      blur: 0,
      hue: 0,
      grayscale: 0,
    },
  },
  {
    id: 'pop',
    name: 'Pop Art',
    color: 'from-rose-500 to-orange-500',
    icon: Palette,
    defaults: {
      brightness: 110,
      contrast: 125,
      saturate: 200,
      sepia: 0,
      blur: 0,
      hue: 0,
      grayscale: 0,
    },
  },
  {
    id: 'sketch',
    name: 'Sketch',
    color: 'from-stone-500 to-stone-700',
    icon: Paintbrush,
    defaults: {
      brightness: 125,
      contrast: 150,
      saturate: 0,
      sepia: 0,
      blur: 0,
      hue: 0,
      grayscale: 100,
    },
  },
  {
    id: 'oil',
    name: 'Óleo',
    color: 'from-amber-600 to-orange-700',
    icon: Layers,
    defaults: {
      brightness: 100,
      contrast: 125,
      saturate: 150,
      sepia: 20,
      blur: 0.5,
      hue: 0,
      grayscale: 0,
    },
  },
]

export default function NftCreator() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState<NftStyle>('cyberpunk')
  const [showShare, setShowShare] = useState(false)

  // Customization State
  const [customText, setCustomText] = useState('')
  const [textPosition, setTextPosition] = useState<TextPosition>('bottom')
  const [filters, setFilters] = useState(styles[1].defaults)
  const [intensity, setIntensity] = useState(100)

  // Load defaults when style changes
  useEffect(() => {
    const style = styles.find((s) => s.id === selectedStyle)
    if (style) {
      setFilters(style.defaults)
      setIntensity(100)
    }
  }, [selectedStyle])

  const updateFilter = (key: keyof typeof filters, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = () => {
    if (!selectedImage) return
    setStep('processing')
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setStep('result'), 500)
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const handleDownload = () => {
    toast.success('NFT salvo na galeria!', {
      description: 'Imagem salva em alta resolução com personalizações.',
    })
  }

  const getNftStyles = (style: NftStyle): NftStyleConfig => {
    switch (style) {
      case 'cyberpunk':
        return {
          container:
            'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-slate-950',
          overlay:
            'bg-gradient-to-t from-cyan-900/80 via-transparent to-pink-500/20',
          badge: 'bg-cyan-500 text-black',
          border: 'border-2 border-cyan-400',
          text: 'text-white',
        }
      case 'gold':
        return {
          container:
            'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)] bg-amber-950',
          overlay:
            'bg-gradient-to-t from-yellow-900/80 via-transparent to-yellow-500/10',
          badge: 'bg-yellow-500 text-black',
          border: 'border-4 border-yellow-500',
          text: 'text-yellow-100',
        }
      case 'holographic':
        return {
          container:
            'border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-slate-900',
          overlay:
            'bg-gradient-to-tr from-indigo-500/20 via-transparent to-purple-500/20 mix-blend-overlay',
          badge: 'bg-indigo-500 text-white',
          border: 'border-2 border-indigo-400',
          text: 'text-white',
        }
      case 'pixel':
        return {
          container:
            'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-black',
          overlay:
            'bg-[url("https://img.usecurling.com/p/10/10?q=grid&color=green")] bg-repeat opacity-20 mix-blend-overlay',
          badge: 'bg-green-500 text-black font-mono',
          border: 'border-4 border-green-500 border-dashed',
          text: 'text-green-400 font-mono tracking-widest',
        }
      case '3d':
        return {
          container:
            'border-blue-400/30 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-950',
          overlay: 'bg-gradient-to-t from-black/60 via-transparent to-white/10',
          badge: 'bg-blue-500 text-white shadow-lg',
          border: 'border border-blue-400/50 rounded-3xl',
          text: 'text-white drop-shadow-md',
        }
      case 'pop':
        return {
          container:
            'border-white shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] bg-yellow-400',
          overlay:
            'bg-gradient-to-br from-rose-500/30 to-blue-500/30 mix-blend-color-dodge',
          badge:
            'bg-white text-black font-black uppercase border-2 border-black',
          border: 'border-4 border-black',
          text: 'text-white drop-shadow-[2px_2px_0px_#000]',
        }
      case 'sketch':
        return {
          container: 'border-stone-400 shadow-xl bg-white',
          overlay: 'bg-white/10 mix-blend-multiply',
          badge: 'bg-black text-white font-serif',
          border: 'border-2 border-black',
          text: 'text-white mix-blend-difference font-serif',
        }
      case 'oil':
        return {
          container: 'border-amber-700/50 shadow-2xl bg-stone-900',
          overlay:
            'bg-gradient-to-t from-black/50 via-amber-500/10 to-transparent',
          badge: 'bg-amber-600 text-white',
          border: 'border-8 border-double border-amber-800',
          text: 'text-amber-100 font-serif italic',
        }
      default:
        return {
          container: 'border-white/20 shadow-xl bg-black',
          overlay:
            'bg-gradient-to-t from-black/80 via-transparent to-transparent',
          badge: 'bg-white text-black',
          border: 'border border-white/20',
          text: 'text-white',
        }
    }
  }

  const activeStyle = getNftStyles(selectedStyle)

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (step === 'upload') navigate(-1)
            else if (step === 'processing') return
            else setStep('upload')
          }}
          className="rounded-full"
        >
          {step === 'result' ? (
            <RefreshCw className="h-5 w-5" />
          ) : (
            <ArrowLeft className="h-5 w-5" />
          )}
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Gem className="h-5 w-5 text-purple-500" /> NFT Creator
        </h1>
      </div>

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col">
        {step === 'upload' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col">
            {!selectedImage ? (
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Transforme sua Jogada</h2>
                <p className="text-muted-foreground text-sm">
                  Crie colecionáveis digitais únicos com estilos artísticos
                  exclusivos.
                </p>
              </div>
            ) : null}

            {/* Main Preview Area */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {selectedImage ? (
                  <NftCard
                    image={selectedImage}
                    activeStyle={activeStyle}
                    styleId={selectedStyle}
                    filters={filters}
                    intensity={intensity}
                    customText={customText}
                    textPosition={textPosition}
                    onClick={() =>
                      !selectedImage && fileInputRef.current?.click()
                    }
                  />
                ) : (
                  <div
                    className="aspect-[4/5] rounded-2xl border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary/50 group bg-secondary/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="font-semibold">Selecionar Foto</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG ou PNG
                    </p>
                  </div>
                )}

                {selectedImage && (
                  <div className="absolute top-2 right-2 flex gap-2 z-30">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        fileInputRef.current?.click()
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Controls Tabs */}
              {selectedImage && (
                <div className="space-y-4">
                  <Tabs defaultValue="style" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="style" className="text-xs">
                        <Palette className="h-3.5 w-3.5 mr-2" /> Estilo
                      </TabsTrigger>
                      <TabsTrigger value="adjust" className="text-xs">
                        <Sliders className="h-3.5 w-3.5 mr-2" /> Ajustes
                      </TabsTrigger>
                      <TabsTrigger value="text" className="text-xs">
                        <Type className="h-3.5 w-3.5 mr-2" /> Texto
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="style" className="mt-0">
                      <ScrollArea className="w-full whitespace-nowrap pb-2">
                        <div className="flex w-max space-x-3 p-1">
                          {styles.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => setSelectedStyle(style.id)}
                              className={cn(
                                'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all min-w-[90px] relative overflow-hidden bg-card',
                                selectedStyle === style.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50',
                              )}
                            >
                              <div
                                className={cn(
                                  'h-10 w-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-sm',
                                  style.color,
                                )}
                              >
                                <style.icon className="h-5 w-5" />
                              </div>
                              <span className="text-[10px] font-medium">
                                {style.name}
                              </span>
                              {selectedStyle === style.id && (
                                <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
                              )}
                            </button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="adjust" className="mt-0 space-y-5">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label className="text-xs">Brilho</Label>
                          <span className="text-xs text-muted-foreground">
                            {filters.brightness}%
                          </span>
                        </div>
                        <Slider
                          value={[filters.brightness]}
                          min={0}
                          max={200}
                          step={5}
                          onValueChange={(val) =>
                            updateFilter('brightness', val[0])
                          }
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label className="text-xs">Contraste</Label>
                          <span className="text-xs text-muted-foreground">
                            {filters.contrast}%
                          </span>
                        </div>
                        <Slider
                          value={[filters.contrast]}
                          min={0}
                          max={200}
                          step={5}
                          onValueChange={(val) =>
                            updateFilter('contrast', val[0])
                          }
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label className="text-xs">Saturação</Label>
                          <span className="text-xs text-muted-foreground">
                            {filters.saturate}%
                          </span>
                        </div>
                        <Slider
                          value={[filters.saturate]}
                          min={0}
                          max={200}
                          step={5}
                          onValueChange={(val) =>
                            updateFilter('saturate', val[0])
                          }
                        />
                      </div>
                      <div className="space-y-3 pt-2 border-t border-border/50">
                        <div className="flex justify-between">
                          <Label className="text-xs font-semibold text-primary">
                            Intensidade do Filtro
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            {intensity}%
                          </span>
                        </div>
                        <Slider
                          value={[intensity]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(val) => setIntensity(val[0])}
                          className="[&_.range]:bg-primary"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="text" className="mt-0 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="custom-text">Texto Adicional</Label>
                        <Input
                          id="custom-text"
                          placeholder="Digite algo épico..."
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          maxLength={30}
                        />
                        <p className="text-[10px] text-muted-foreground text-right">
                          {customText.length}/30
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Posição</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant={
                              textPosition === 'top' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setTextPosition('top')}
                            className="h-9"
                          >
                            <AlignVerticalJustifyStart className="h-4 w-4 mr-2" />
                            Topo
                          </Button>
                          <Button
                            variant={
                              textPosition === 'center' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setTextPosition('center')}
                            className="h-9"
                          >
                            <AlignVerticalJustifyCenter className="h-4 w-4 mr-2" />
                            Meio
                          </Button>
                          <Button
                            variant={
                              textPosition === 'bottom' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setTextPosition('bottom')}
                            className="h-9"
                          >
                            <AlignVerticalJustifyEnd className="h-4 w-4 mr-2" />
                            Baixo
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>

            <Button
              className="w-full h-12 text-lg font-bold shadow-lg mt-auto"
              size="lg"
              disabled={!selectedImage}
              onClick={handleGenerate}
            >
              <Wand2 className="mr-2 h-5 w-5" /> Criar NFT
            </Button>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-4 border-muted flex items-center justify-center bg-secondary/30">
                <Gem className="h-12 w-12 text-muted-foreground/20" />
              </div>
              <div
                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                style={{ animationDuration: '2s' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-2 max-w-xs">
              <h3 className="text-xl font-bold">Aplicando Filtros IA...</h3>
              <p className="text-muted-foreground text-sm">
                Gerando texturas e ajustando iluminação para o estilo{' '}
                {styles.find((s) => s.id === selectedStyle)?.name}.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>Processando</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        )}

        {step === 'result' && selectedImage && (
          <div className="flex-1 flex flex-col space-y-6 animate-in slide-in-from-bottom-8 duration-500 pb-6">
            <div className="text-center">
              <Badge
                variant="outline"
                className="mb-2 border-primary/50 text-primary bg-primary/10"
              >
                Collectible Criado
              </Badge>
              <h2 className="text-2xl font-bold">Seu Goplay NFT</h2>
            </div>

            {/* NFT Card Result */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="w-full max-w-[320px]">
                <NftCard
                  image={selectedImage}
                  activeStyle={activeStyle}
                  styleId={selectedStyle}
                  filters={filters}
                  intensity={intensity}
                  customText={customText}
                  textPosition={textPosition}
                  className="shadow-2xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-14 rounded-xl gap-2"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
                Salvar
              </Button>
              <Button
                className="h-14 rounded-xl gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                onClick={() => setShowShare(true)}
              >
                <Share2 className="h-5 w-5" />
                Compartilhar
              </Button>
            </div>
          </div>
        )}
      </div>

      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        videoTitle="Meu Goplay NFT"
      />
    </div>
  )
}
