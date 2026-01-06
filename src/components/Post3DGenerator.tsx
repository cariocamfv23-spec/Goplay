import { useState, useEffect } from 'react'
import { Ghost3DViewer, GhostViewMode } from '@/components/Ghost3DViewer'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Check,
  ChevronLeft,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Video,
  Box,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Post3DGeneratorProps {
  videoFile: File
  onConfirm: (mode: GhostViewMode) => void
  onCancel: () => void
}

type GenerationStep = 'uploading' | 'analyzing' | 'reconstructing' | 'done'

export function Post3DGenerator({
  videoFile,
  onConfirm,
  onCancel,
}: Post3DGeneratorProps) {
  const [step, setStep] = useState<GenerationStep>('uploading')
  const [progress, setProgress] = useState(0)
  const [viewMode, setViewMode] = useState<GhostViewMode>('split')
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  useEffect(() => {
    // Create preview URL
    const url = URL.createObjectURL(videoFile)
    setVideoSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  // Simulate Generation Process
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setStep('done')
          return 100
        }

        // Update steps based on progress
        if (prev < 30) setStep('uploading')
        else if (prev < 70) setStep('analyzing')
        else setStep('reconstructing')

        return prev + 2 // Increment speed
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const getStepLabel = () => {
    switch (step) {
      case 'uploading':
        return 'Processando vídeo...'
      case 'analyzing':
        return 'AI detectando movimentos...'
      case 'reconstructing':
        return 'Gerando modelo 3D Low-Poly...'
      case 'done':
        return 'Pronto!'
      default:
        return 'Iniciando...'
    }
  }

  if (step !== 'done') {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] w-full bg-black/5 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 space-y-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <Sparkles className="h-10 w-10 text-primary animate-spin-slow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>

        <div className="w-full max-w-xs space-y-2 text-center">
          <h3 className="font-bold text-lg">{getStepLabel()}</h3>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">{progress}% concluído</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Box className="w-5 h-5 text-primary" />
            Goplay Replay 3D
          </h3>
          <p className="text-xs text-muted-foreground">
            Visualize e escolha o formato do seu replay.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 w-8 p-0 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(true)}
            className="h-8 w-8 p-0 rounded-full"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Viewer Area */}
      <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden relative group">
        <Ghost3DViewer
          videoSrc={videoSrc}
          mode={viewMode}
          isPlaying={isPlaying}
          className="h-full border-2 border-primary/20 group-hover:border-primary/50 transition-colors"
        />
      </div>

      {/* Mode Controls */}
      <div className="space-y-4">
        <div className="bg-muted/50 p-1 rounded-lg">
          <Tabs
            defaultValue="split"
            value={viewMode}
            onValueChange={(v) => setViewMode(v as GhostViewMode)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="original" className="text-xs gap-2">
                <Video className="w-3 h-3" /> Original
              </TabsTrigger>
              <TabsTrigger value="split" className="text-xs gap-2">
                <Layers className="w-3 h-3" /> Dividido
              </TabsTrigger>
              <TabsTrigger value="ghost" className="text-xs gap-2">
                <Box className="w-3 h-3" /> Apenas 3D
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 border-dashed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={() => onConfirm(viewMode)}
            className="flex-1 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg"
          >
            <Check className="w-4 h-4 mr-2" />
            Usar este Replay
          </Button>
        </div>
      </div>
    </div>
  )
}
