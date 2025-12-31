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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { NostalgiaPreset, useNostalgiaStore } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'

interface PresetOption {
  id: NostalgiaPreset
  name: string
  icon: React.ElementType
  color: string
}

const presets: PresetOption[] = [
  { id: 'retro', name: 'Retrô', icon: Film, color: 'text-amber-500' },
  { id: 'vhs', name: 'VHS', icon: Tv, color: 'text-red-500' },
  { id: 'grain', name: 'Granulado', icon: ImageIcon, color: 'text-gray-400' },
  { id: '90s', name: 'Anos 90', icon: Sparkles, color: 'text-blue-500' },
  { id: 'analog', name: 'Analógico', icon: Aperture, color: 'text-orange-500' },
  {
    id: 'polaroid',
    name: 'Polaroid',
    icon: Camera,
    color: 'text-yellow-500',
  },
]

export function NostalgiaStudio() {
  const { setPreset: setGlobalPreset, toggle } = useNostalgiaStore()
  const [activePreset, setActivePreset] = useState<NostalgiaPreset>('retro')
  const [mediaUrl, setMediaUrl] = useState<string>(
    'https://img.usecurling.com/p/800/800?q=sports%20portrait&dpr=2',
  )
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setMediaUrl(url)
      setMediaType(file.type.startsWith('video') ? 'video' : 'image')
      toast.success('Mídia carregada com sucesso!')
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

  const handleSave = () => {
    // In a real app, this would use a canvas to draw the image with filters or send to backend
    toast.success('Salvo na galeria', {
      description: 'Sua foto com efeito nostálgico foi salva.',
      icon: <Download className="w-4 h-4" />,
    })
  }

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="space-y-1 px-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold" />
          Estúdio Nostalgia
        </h2>
        <p className="text-sm text-muted-foreground">
          Transforme suas memórias com filtros retrô premium.
        </p>
      </div>

      {/* Main Preview Area */}
      <Card className="flex-1 w-full min-h-[400px] overflow-hidden border-border/50 bg-black relative shadow-2xl rounded-3xl group">
        <div className="absolute inset-0 flex items-center justify-center">
          {mediaType === 'video' ? (
            <video
              src={mediaUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}

          {/* Filter Overlay */}
          <NostalgiaFilter forceEnable manualPreset={activePreset} />
        </div>

        {/* Media Controls Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 z-30">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/10"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Bottom Gradient for Controls Visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-20" />
      </Card>

      {/* Filter Selection Rail */}
      <div className="relative z-30 -mt-6">
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex w-max space-x-3 px-1">
            {presets.map((preset) => {
              const isActive = activePreset === preset.id
              return (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 border backdrop-blur-sm min-w-[80px]',
                    isActive
                      ? 'bg-primary/90 text-white border-primary shadow-lg scale-105'
                      : 'bg-secondary/80 hover:bg-secondary border-transparent text-muted-foreground',
                  )}
                >
                  <preset.icon
                    className={cn(
                      'w-6 h-6',
                      isActive ? 'text-white' : preset.color,
                    )}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {preset.name}
                  </span>
                </button>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button
          variant="outline"
          className="h-12 rounded-xl border-2 font-bold hover:bg-secondary/50"
          onClick={handleSave}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Salvar
        </Button>
        <Button
          className="h-12 rounded-xl bg-gold text-black hover:bg-gold/90 font-bold shadow-lg shadow-gold/20"
          onClick={handleApplyGlobal}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Aplicar no App
        </Button>
      </div>
    </div>
  )
}
