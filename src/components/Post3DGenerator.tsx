import { useState, useEffect } from 'react'
import { Ghost3DViewer, GhostViewMode } from '@/components/Ghost3DViewer'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Check,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Video,
  Box,
  Wand2,
} from 'lucide-react'
import { toast } from 'sonner'

interface Post3DGeneratorProps {
  videoFile: File
  onConfirm: (mode: GhostViewMode) => void
  onCancel: () => void
  confirmLabel?: string
}

type GenerationStep =
  | 'uploading'
  | 'analyzing'
  | 'mapping'
  | 'reconstructing'
  | 'done'

export function Post3DGenerator({
  videoFile,
  onConfirm,
  onCancel,
  confirmLabel = 'Usar este Replay',
}: Post3DGeneratorProps) {
  const [step, setStep] = useState<GenerationStep>('uploading')
  const [progress, setProgress] = useState(0)
  const [viewMode, setViewMode] = useState<GhostViewMode>('split')
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  // Simulated AI Detection State
  const [detectedSport, setDetectedSport] = useState<string>('futebol')

  useEffect(() => {
    const url = URL.createObjectURL(videoFile)
    setVideoSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  // Simulate AI Pipeline
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setStep('done')
          toast.success('Reconstrução 3D Concluída!', {
            icon: <Sparkles className="w-4 h-4 text-gold" />,
          })
          return 100
        }

        // Progression stages
        if (prev < 20) setStep('uploading')
        else if (prev < 50) setStep('analyzing')
        else if (prev < 80) setStep('mapping')
        else setStep('reconstructing')

        return prev + 1 // Slower progression for realism feel
      })
    }, 60)
    return () => clearInterval(timer)
  }, [])

  const getStepLabel = () => {
    switch (step) {
      case 'uploading':
        return 'Carregando vídeo para a nuvem...'
      case 'analyzing':
        return 'Detectando movimentos e profundidade...'
      case 'mapping':
        return 'Mapeando objetos esportivos...'
      case 'reconstructing':
        return 'Renderizando cena 3D High-Fidelity...'
      case 'done':
        return 'Pronto!'
      default:
        return 'Iniciando...'
    }
  }

  if (step !== 'done') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full bg-background p-8 space-y-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />

        <div className="relative z-10">
          <div className="h-24 w-24 rounded-3xl bg-background border border-border shadow-2xl flex items-center justify-center relative">
            <Sparkles className="h-10 w-10 text-primary animate-spin-slow" />
            <div className="absolute -inset-1 rounded-3xl border-2 border-primary/30 animate-ping opacity-20" />
          </div>
        </div>

        <div className="w-full max-w-sm space-y-4 text-center z-10">
          <div className="space-y-1">
            <h3 className="font-bold text-xl">{getStepLabel()}</h3>
            <p className="text-sm text-muted-foreground">
              Transformando 2D em Experiência Imersiva
            </p>
          </div>

          <div className="space-y-1.5">
            <Progress value={progress} className="h-2.5 bg-secondary" />
            <div className="flex justify-between text-xs font-mono text-muted-foreground/70">
              <span>{step.toUpperCase()}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Box className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">Replay 3D Studio</h3>
            <p className="text-[10px] text-muted-foreground mt-1">
              High-Fidelity Rendering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sport Selector Override */}
          <Select value={detectedSport} onValueChange={setDetectedSport}>
            <SelectTrigger className="h-8 w-[130px] text-xs border-primary/20 bg-primary/5">
              <SelectValue placeholder="Esporte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="futebol">⚽ Futebol</SelectItem>
              <SelectItem value="basquete">🏀 Basquete</SelectItem>
              <SelectItem value="tenis">🎾 Tênis</SelectItem>
              <SelectItem value="volei">🏐 Vôlei</SelectItem>
              <SelectItem value="futevolei">🦶🏖️ Futevôlei</SelectItem>
              <SelectItem value="americano">🏈 F. Americano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col gap-4">
        {/* Viewer Area */}
        <div className="flex-1 min-h-[350px] rounded-2xl overflow-hidden relative group shadow-2xl ring-1 ring-border/50">
          <Ghost3DViewer
            videoSrc={videoSrc}
            mode={viewMode}
            isPlaying={isPlaying}
            sport={detectedSport}
            className="h-full bg-black"
          />

          {/* Floating Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </Button>
            <div className="w-px h-4 bg-white/20" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(true)}
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-secondary/30 p-4 rounded-xl border border-border/50">
          <div className="w-full md:w-auto">
            <Tabs
              defaultValue="split"
              value={viewMode}
              onValueChange={(v) => setViewMode(v as GhostViewMode)}
              className="w-full md:w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-3 h-9 bg-background/80">
                <TabsTrigger value="original" className="text-xs">
                  Original
                </TabsTrigger>
                <TabsTrigger value="split" className="text-xs">
                  Split View
                </TabsTrigger>
                <TabsTrigger
                  value="ghost"
                  className="text-xs font-bold text-primary"
                >
                  3D Only
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="ghost"
              onClick={onCancel}
              className="flex-1 md:flex-none text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              onClick={() => onConfirm(viewMode)}
              className="flex-1 md:flex-none bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg font-bold min-w-[180px]"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
