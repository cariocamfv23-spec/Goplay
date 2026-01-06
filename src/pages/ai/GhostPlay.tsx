import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Upload,
  Ghost,
  Play,
  Pause,
  Share2,
  Video,
  SplitSquareHorizontal,
  Box,
  CheckCircle2,
  Wand2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Ghost3DViewer, GhostViewMode } from '@/components/Ghost3DViewer'
import { cn } from '@/lib/utils'

export default function GhostPlay() {
  const navigate = useNavigate()

  // State Machine
  const [step, setStep] = useState<'upload' | 'processing' | 'review'>('upload')
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [processingStage, setProcessingStage] = useState('')

  // Viewer State
  const [viewMode, setViewMode] = useState<GhostViewMode>('split')
  const [isPlaying, setIsPlaying] = useState(false)

  // Mock Video Upload
  const handleFileUpload = () => {
    // Simulate picking a video
    const mockVideo =
      'https://img.usecurling.com/p/600/800?q=soccer%20player%20running&color=green'
    setVideoSrc(mockVideo)
    startProcessing()
  }

  const startProcessing = () => {
    setStep('processing')
    setProgress(0)

    const stages = [
      'Analisando movimento...',
      'Identificando articulações...',
      'Gerando malha 3D Low-Poly...',
      'Calculando trajetória...',
      'Renderizando ambiente...',
    ]

    let currentStage = 0
    let currentProgress = 0

    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)

      if (currentProgress % 20 === 0 && currentStage < stages.length) {
        setProcessingStage(stages[currentStage])
        currentStage++
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setStep('review')
          setIsPlaying(true)
          toast.success('Ghost Play gerado com sucesso!')
        }, 500)
      }
    }, 100)
  }

  const handlePublish = () => {
    toast.success('Publicado no Feed!', {
      description: 'Seu replay 3D está disponível para a comunidade.',
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    })
    navigate('/feed')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (step === 'upload' ? navigate(-1) : setStep('upload'))}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Ghost className="h-5 w-5 text-indigo-500" />
          <h1 className="text-lg font-bold">Ghost Play 3D</h1>
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 container max-w-lg mx-auto p-4 flex flex-col">
        {/* STEP 1: UPLOAD */}
        {step === 'upload' && (
          <div className="flex-1 flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Transforme sua Jogada</h2>
              <p className="text-muted-foreground">
                A IA reconstrói seu movimento em um estilo 3D retrô único.
              </p>
            </div>

            <Card
              className="border-2 border-dashed border-border hover:border-indigo-500/50 transition-colors cursor-pointer bg-secondary/20 group"
              onClick={handleFileUpload}
            >
              <CardContent className="flex flex-col items-center justify-center h-80 gap-6">
                <div className="h-24 w-24 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-10 w-10 text-indigo-500" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg mb-1">Selecione o Vídeo</p>
                  <p className="text-sm text-muted-foreground">
                    Suportamos Futebol, Skate, Corrida e mais
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/30 p-4 rounded-xl flex flex-col items-center text-center gap-2">
                <Wand2 className="w-6 h-6 text-indigo-400" />
                <span className="text-xs font-medium">
                  Reconstrução Automática
                </span>
              </div>
              <div className="bg-secondary/30 p-4 rounded-xl flex flex-col items-center text-center gap-2">
                <Box className="w-6 h-6 text-indigo-400" />
                <span className="text-xs font-medium">Visual Low-Poly</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING */}
        {step === 'processing' && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
            <div className="relative">
              <div className="h-40 w-40 rounded-full border-4 border-muted flex items-center justify-center bg-indigo-500/5">
                <Ghost className="h-16 w-16 text-indigo-500 animate-pulse" />
              </div>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-indigo-500 transition-all duration-300 ease-out"
                  strokeDasharray={490}
                  strokeDashoffset={490 - (490 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="text-center space-y-2 w-full max-w-xs">
              <h3 className="text-xl font-bold">{Math.round(progress)}%</h3>
              <p className="text-sm text-indigo-400 font-medium animate-pulse">
                {processingStage}
              </p>
              <Progress value={progress} className="h-2 mt-4" />
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 'review' && videoSrc && (
          <div className="flex-1 flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-500 pb-20">
            {/* Viewer Section */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Ghost3DViewer
                videoSrc={videoSrc}
                mode={viewMode}
                isPlaying={isPlaying}
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!isPlaying && (
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-full border border-white/20">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 left-4 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 pointer-events-auto"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Formato de Saída
                </h3>
                <Badge
                  variant="outline"
                  className="text-indigo-400 border-indigo-400/30"
                >
                  AI Generated
                </Badge>
              </div>

              <Tabs
                value={viewMode}
                onValueChange={(v) => setViewMode(v as GhostViewMode)}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-3 h-12 bg-secondary/50">
                  <TabsTrigger value="original" className="text-xs gap-2">
                    <Video className="w-3 h-3" /> Original
                  </TabsTrigger>
                  <TabsTrigger value="split" className="text-xs gap-2">
                    <SplitSquareHorizontal className="w-3 h-3" /> Dividido
                  </TabsTrigger>
                  <TabsTrigger value="ghost" className="text-xs gap-2">
                    <Box className="w-3 h-3" /> 3D Only
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <p className="text-xs text-muted-foreground text-center">
                O formato escolhido será como o vídeo aparecerá no feed.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-auto grid grid-cols-1 gap-3">
              <Button
                size="lg"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-500/20"
                onClick={handlePublish}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Publicar no Feed
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
