import { useState, useRef } from 'react'
import {
  Upload,
  Camera,
  Film,
  Tv,
  Image as ImageIcon,
  Sparkles,
  Aperture,
  Check,
  Download,
  Share2,
  RefreshCw,
  Trophy,
  Swords,
  Loader2,
  CassetteTape,
  Terminal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { NostalgiaPreset, useNostalgiaStore } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PresetOption {
  id: NostalgiaPreset
  name: string
  description: string
  icon: React.ElementType
  color: string
  category: 'classic' | 'iconic'
}

const presets: PresetOption[] = [
  {
    id: 'cassette',
    name: 'Fita K7',
    description: 'Estilo Cassete',
    icon: CassetteTape,
    color: 'text-orange-600',
    category: 'classic',
  },
  {
    id: 'digital',
    name: 'Retro Digital',
    description: 'Interface PC Antiga',
    icon: Terminal,
    color: 'text-green-500',
    category: 'classic',
  },
  {
    id: 'pele',
    name: 'Futebol 80s',
    description: 'Estilo TV broadcast',
    icon: Trophy,
    color: 'text-yellow-500',
    category: 'iconic',
  },
  {
    id: 'ali',
    name: 'Boxe Vintage',
    description: 'Cinemático P&B',
    icon: Swords,
    color: 'text-zinc-200',
    category: 'iconic',
  },
  {
    id: 'retro',
    name: 'Retrô',
    description: 'Estilo clássico',
    icon: Film,
    color: 'text-amber-500',
    category: 'classic',
  },
  {
    id: 'vhs',
    name: 'VHS',
    description: 'Fita magnética',
    icon: Tv,
    color: 'text-red-500',
    category: 'classic',
  },
  {
    id: 'grain',
    name: 'Granulado',
    description: 'Preto e branco',
    icon: ImageIcon,
    color: 'text-gray-400',
    category: 'classic',
  },
  {
    id: '90s',
    name: 'Anos 90',
    description: 'Vibrante e pop',
    icon: Sparkles,
    color: 'text-blue-500',
    category: 'classic',
  },
  {
    id: 'analog',
    name: 'Analógico',
    description: 'Filme 35mm',
    icon: Aperture,
    color: 'text-orange-500',
    category: 'classic',
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'Instantânea',
    icon: Camera,
    color: 'text-yellow-500',
    category: 'classic',
  },
]

export function NostalgiaStudio() {
  const {
    setPreset: setGlobalPreset,
    toggle,
    preset: globalPreset,
    isEnabled,
  } = useNostalgiaStore()
  const [activePreset, setActivePreset] = useState<NostalgiaPreset>(
    globalPreset || 'retro',
  )
  const [mediaUrl, setMediaUrl] = useState<string>(
    'https://img.usecurling.com/p/800/800?q=sports%20portrait&dpr=2',
  )
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsProcessing(true)
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        setMediaUrl(url)
        setMediaType(file.type.startsWith('video') ? 'video' : 'image')
        setIsProcessing(false)
        toast.success('Mídia carregada com sucesso!')
      }, 1500)
    }
  }

  const handleApplyGlobal = () => {
    setGlobalPreset(activePreset)
    toggle(true)
    toast.success('Tema aplicado globalmente!', {
      description: `O estilo ${activePreset.toUpperCase()} está ativo em todo o app.`,
      icon: <Sparkles className="w-4 h-4 text-gold" />,
    })
  }

  const handleDisableGlobal = () => {
    toggle(false)
    toast.info('Modo Nostalgia desativado')
  }

  const handleSave = () => {
    toast.success('Salvo na galeria', {
      description: 'Sua mídia com estilo AI foi salva.',
      icon: <Download className="w-4 h-4" />,
    })
  }

  const handlePresetSelect = (presetId: NostalgiaPreset) => {
    setIsProcessing(true)
    setActivePreset(presetId)
    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false)
    }, 800)
  }

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="space-y-1 px-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            Estúdio Nostalgia
          </h2>
          {isEnabled && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisableGlobal}
              className="h-7 text-xs border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Desativar
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Transforme fotos com estilos icônicos.
        </p>
      </div>

      <Tabs defaultValue="editor" className="w-full flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="editor">Editor AI</TabsTrigger>
          <TabsTrigger value="presets">Galeria de Estilos</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="flex-1 flex flex-col gap-4 mt-0">
          {/* Main Preview Area */}
          <Card className="flex-1 w-full min-h-[350px] overflow-hidden border-border/50 bg-black relative shadow-2xl rounded-3xl group ring-4 ring-black/5 dark:ring-white/5">
            <div className="absolute inset-0 flex items-center justify-center">
              {isProcessing && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-2" />
                  <span className="text-white font-medium text-sm animate-pulse">
                    Aplicando estilo AI...
                  </span>
                </div>
              )}

              {mediaType === 'video' ? (
                <video
                  src={mediaUrl}
                  className={cn(
                    'w-full h-full object-cover transition-all duration-500',
                    activePreset === '90s' && 'aspect-[4/3] object-contain',
                  )}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="Preview"
                  className={cn(
                    'w-full h-full object-cover transition-all duration-500',
                    activePreset === 'polaroid' && 'p-8 pb-24 bg-white',
                    activePreset === '90s' && 'aspect-[4/3] object-contain',
                    (activePreset === 'ali' || activePreset === 'grain') &&
                      'grayscale',
                    activePreset === 'pele' &&
                      'contrast-[1.1] saturate-[1.3] brightness-105',
                  )}
                />
              )}

              {/* Filter Overlay */}
              <div
                className={cn(
                  'absolute inset-0 pointer-events-none',
                  activePreset === 'polaroid' ? 'inset-[20px] bottom-24' : '',
                )}
              >
                <NostalgiaFilter forceEnable manualPreset={activePreset} />
              </div>
            </div>

            {/* Media Controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-30">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/10"
                onClick={() => {
                  setIsProcessing(true)
                  setTimeout(() => {
                    setMediaUrl(
                      `https://img.usecurling.com/p/800/800?q=sports%20${['action', 'portrait', 'stadium'][Math.floor(Math.random() * 3)]}&dpr=2&seed=${Date.now()}`,
                    )
                    setIsProcessing(false)
                  }, 1000)
                }}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 font-bold hover:bg-secondary/50"
              onClick={handleSave}
              disabled={isProcessing}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              className={cn(
                'h-12 rounded-xl font-bold shadow-lg transition-all',
                isEnabled && globalPreset === activePreset
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-900/20'
                  : 'bg-gold text-black hover:bg-gold/90 shadow-gold/20',
              )}
              onClick={handleApplyGlobal}
              disabled={isProcessing}
            >
              {isEnabled && globalPreset === activePreset ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Aplicado
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Aplicar no App
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="presets" className="mt-0">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4 pb-4">
              {/* Iconic Category */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                  Ícones do Esporte
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {presets
                    .filter((p) => p.category === 'iconic')
                    .map((preset) => {
                      const isActive = activePreset === preset.id
                      return (
                        <button
                          key={preset.id}
                          onClick={() => handlePresetSelect(preset.id)}
                          className={cn(
                            'flex flex-col items-start p-4 rounded-2xl transition-all duration-300 border text-left group relative overflow-hidden',
                            isActive
                              ? 'bg-gradient-to-br from-primary/10 to-gold/10 border-primary ring-1 ring-primary'
                              : 'bg-secondary/50 hover:bg-secondary border-transparent hover:border-border',
                          )}
                        >
                          <div
                            className={cn(
                              'p-2 rounded-xl mb-3 transition-colors',
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background shadow-sm',
                              preset.color,
                            )}
                          >
                            <preset.icon className="w-6 h-6" />
                          </div>
                          <span className="font-bold text-sm">
                            {preset.name}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {preset.description}
                          </span>
                          {isActive && (
                            <div className="absolute top-3 right-3">
                              <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                              </span>
                            </div>
                          )}
                        </button>
                      )
                    })}
                </div>
              </div>

              {/* Classic Category */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                  Filtros Clássicos
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {presets
                    .filter((p) => p.category === 'classic')
                    .map((preset) => {
                      const isActive = activePreset === preset.id
                      return (
                        <button
                          key={preset.id}
                          onClick={() => handlePresetSelect(preset.id)}
                          className={cn(
                            'flex flex-col items-start p-4 rounded-2xl transition-all duration-300 border text-left group relative overflow-hidden',
                            isActive
                              ? 'bg-primary/5 border-primary ring-1 ring-primary'
                              : 'bg-secondary/50 hover:bg-secondary border-transparent hover:border-border',
                          )}
                        >
                          <div
                            className={cn(
                              'p-2 rounded-xl mb-3 transition-colors',
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background shadow-sm',
                              preset.color,
                            )}
                          >
                            <preset.icon className="w-6 h-6" />
                          </div>
                          <span className="font-bold text-sm">
                            {preset.name}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {preset.description}
                          </span>
                          {isActive && (
                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </button>
                      )
                    })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
