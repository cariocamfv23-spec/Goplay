import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Play,
  Box,
  Camera,
  Video,
  Download,
  Wand2,
  Zap,
  Flame,
  Grid,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AppIcon } from '@/components/AppIcon'

export default function GhostPlay() {
  const navigate = useNavigate()
  const [view, setView] = useState<'normal' | 'drone' | 'tactical'>('normal')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [exportFormat, setExportFormat] = useState('glb')
  const [effect, setEffect] = useState<
    'none' | 'fire' | 'matrix' | 'lightning'
  >('none')
  const [showEffects, setShowEffects] = useState(false)

  const handleExport = () => {
    toast.success('Modelo 3D exportado com sucesso!', {
      description: `Arquivo salvo como lance_fantasma.${exportFormat}`,
    })
    setShowExport(false)
  }

  const getEffectOverlay = () => {
    switch (effect) {
      case 'fire':
        return (
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent pointer-events-none mix-blend-screen" />
        )
      case 'matrix':
        return (
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/100/100?q=matrix%20code&color=green')] opacity-20 pointer-events-none" />
        )
      case 'lightning':
        return (
          <div className="absolute inset-0 border-4 border-blue-400/50 animate-pulse pointer-events-none" />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <AppIcon className="h-6 w-6" /> Lance Fantasma 3D
          </h1>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`text-white hover:text-gold ${showEffects ? 'bg-white/10' : ''}`}
            onClick={() => setShowEffects(!showEffects)}
          >
            <Wand2 className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-primary"
            onClick={() => setShowExport(true)}
          >
            <Download className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {showEffects && (
        <div className="absolute top-20 right-4 z-30 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col gap-2 animate-in slide-in-from-right-10">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase text-center">
            Efeitos Visuais
          </p>
          <Button
            variant={effect === 'none' ? 'default' : 'ghost'}
            size="sm"
            className="justify-start gap-2"
            onClick={() => setEffect('none')}
          >
            <Box className="h-4 w-4" /> Padrão
          </Button>
          <Button
            variant={effect === 'fire' ? 'default' : 'ghost'}
            size="sm"
            className="justify-start gap-2 text-orange-400 hover:text-orange-300"
            onClick={() => setEffect('fire')}
          >
            <Flame className="h-4 w-4" /> Fogo
          </Button>
          <Button
            variant={effect === 'lightning' ? 'default' : 'ghost'}
            size="sm"
            className="justify-start gap-2 text-blue-400 hover:text-blue-300"
            onClick={() => setEffect('lightning')}
          >
            <Zap className="h-4 w-4" /> Energia
          </Button>
          <Button
            variant={effect === 'matrix' ? 'default' : 'ghost'}
            size="sm"
            className="justify-start gap-2 text-green-400 hover:text-green-300"
            onClick={() => setEffect('matrix')}
          >
            <Grid className="h-4 w-4" /> Matrix
          </Button>
        </div>
      )}

      <div className="flex-1 relative bg-zinc-900 overflow-hidden">
        <img
          src={
            view === 'drone'
              ? 'https://img.usecurling.com/p/800/600?q=soccer%20field%20top%20view&dpr=2'
              : view === 'tactical'
                ? 'https://img.usecurling.com/p/800/600?q=soccer%20tactics%20board&dpr=2'
                : 'https://img.usecurling.com/p/800/600?q=soccer%20action%203d%20render&dpr=2'
          }
          className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'scale-105' : ''}`}
          alt="3D Replay"
        />

        {getEffectOverlay()}

        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 rounded-full animate-pulse opacity-50 ${effect === 'fire' ? 'border-orange-500' : 'border-primary/30'}`}
          />
          <div className="absolute bottom-32 left-8 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
            <p className="text-xs text-primary font-bold">VELOCIDADE DA BOLA</p>
            <p className="text-xl font-bold">108 km/h</p>
          </div>
          <div className="absolute top-24 right-8 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
            <p className="text-xs text-gold font-bold">TRAJETÓRIA</p>
            <p className="text-xl font-bold">Curva 35°</p>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 pointer-events-auto">
          <Button
            size="icon"
            variant={view === 'normal' ? 'default' : 'ghost'}
            className="rounded-full h-10 w-10"
            onClick={() => setView('normal')}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant={view === 'drone' ? 'default' : 'ghost'}
            className="rounded-full h-10 w-10"
            onClick={() => setView('drone')}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant={view === 'tactical' ? 'default' : 'ghost'}
            className="rounded-full h-10 w-10"
            onClick={() => setView('tactical')}
          >
            <Box className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="h-32 bg-zinc-950 border-t border-zinc-800 p-4 pb-8 z-20">
        <div className="flex items-center gap-4 mb-4">
          <Button
            size="icon"
            className="rounded-full bg-white text-black hover:bg-zinc-200"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play className={`h-5 w-5 ml-1 ${isPlaying ? 'hidden' : ''}`} />
            <div
              className={`h-4 w-4 bg-black rounded-sm ${!isPlaying ? 'hidden' : ''}`}
            />
          </Button>
          <Slider defaultValue={[33]} max={100} step={1} className="flex-1" />
          <span className="text-xs font-mono text-zinc-400">00:04 / 00:12</span>
        </div>
      </div>

      <Dialog open={showExport} onOpenChange={setShowExport}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Box className="h-5 w-5 text-gold" /> Exportar Modelo 3D
            </DialogTitle>
            <DialogDescription>
              Baixe o arquivo 3D para usar em outros softwares de edição ou
              visualizadores.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block text-zinc-300">
              Formato do Arquivo
            </label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="glb">GLB (Recomendado)</SelectItem>
                <SelectItem value="fbx">FBX</SelectItem>
                <SelectItem value="obj">OBJ</SelectItem>
                <SelectItem value="usdz">USDZ (Apple)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={handleExport}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
