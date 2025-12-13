import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { NarrationConfig, narrationStyles } from '@/lib/data'
import { SoundWaveVisualizer } from './SoundWaveVisualizer'
import useSoundStore from '@/stores/useSoundStore'
import {
  Volume2,
  Wand2,
  Play,
  Pause,
  Save,
  Video as VideoIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { AppIcon } from './AppIcon'

interface NarrationEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialConfig?: NarrationConfig
  videoThumbnail?: string
  onSave: (config: NarrationConfig) => void
}

export function NarrationEditor({
  open,
  onOpenChange,
  initialConfig,
  videoThumbnail,
  onSave,
}: NarrationEditorProps) {
  const [config, setConfig] = useState<NarrationConfig>(
    initialConfig || {
      hasNarration: true,
      style: 'varzea',
      text: narrationStyles[0].previewText,
      volume: 0.8,
    },
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const { playNarration, isPlayingNarration } = useSoundStore()

  useEffect(() => {
    setIsPlaying(isPlayingNarration)
  }, [isPlayingNarration])

  const handleStyleChange = (styleId: string) => {
    const style = narrationStyles.find((s) => s.id === styleId)
    if (style) {
      setConfig({
        ...config,
        style: styleId as any,
        text: style.previewText,
      })
    }
  }

  const handlePreview = () => {
    playNarration(config)
  }

  const handleSave = () => {
    onSave(config)
    onOpenChange(false)
    toast.success('Narração aplicada com sucesso!', {
      description: 'Seu vídeo agora tem uma narração personalizada.',
    })
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[90vh] flex flex-col rounded-t-3xl bg-background">
        <DrawerHeader className="text-center pb-2">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <AppIcon className="h-8 w-8" />
            </div>
          </div>
          <DrawerTitle className="text-xl font-bold flex items-center justify-center gap-2">
            <Wand2 className="h-5 w-5 text-gold" /> Narração AI Personalizada
          </DrawerTitle>
          <DrawerDescription>
            Escolha o estilo e personalize a narração do seu highlight.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-border/50">
            {videoThumbnail ? (
              <img
                src={videoThumbnail}
                alt="Preview"
                className="w-full h-full object-cover opacity-60"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                <VideoIcon className="h-12 w-12 text-zinc-700" />
              </div>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {isPlaying && (
                <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30 animate-in fade-in zoom-in">
                  <span className="text-white font-bold text-lg italic text-center drop-shadow-md">
                    "{config.text}"
                  </span>
                </div>
              )}

              <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-primary/90 hover:bg-primary shadow-xl border-2 border-white/20"
                onClick={handlePreview}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white ml-1" />
                )}
              </Button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-8">
              <SoundWaveVisualizer isPlaying={isPlaying} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Estilo de Narração</Label>
              <Select value={config.style} onValueChange={handleStyleChange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione um estilo" />
                </SelectTrigger>
                <SelectContent>
                  {narrationStyles.map((style) => (
                    <SelectItem key={style.id} value={style.id}>
                      <span className="font-bold">{style.name}</span>
                      <span className="ml-2 text-muted-foreground text-xs">
                        - {style.description}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between">
                <Label>Volume da Narração</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round(config.volume * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[config.volume]}
                  max={1}
                  step={0.1}
                  onValueChange={(val) =>
                    setConfig({ ...config, volume: val[0] })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter className="pt-2 pb-8 px-6">
          <Button
            className="w-full h-12 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-purple-800 shadow-lg"
            onClick={handleSave}
          >
            <Save className="mr-2 h-5 w-5" /> Aplicar Narração
          </Button>
          <DrawerClose asChild>
            <Button variant="ghost" className="rounded-full">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
