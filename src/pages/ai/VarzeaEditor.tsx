import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Wand2,
  Upload,
  Film,
  Play,
  Pause,
  Share2,
  Download,
  Sparkles,
  Zap,
  Music,
  RotateCcw,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { narrationStyles } from '@/lib/data'
import { ShareDialog } from '@/components/ShareDialog'
import { cn } from '@/lib/utils'

export default function VarzeaEditor() {
  const navigate = useNavigate()
  const [step, setStep] = useState<
    'select' | 'config' | 'processing' | 'result'
  >('select')
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [processingMessage, setProcessingMessage] = useState(
    'Iniciando motores...',
  )
  const [showShare, setShowShare] = useState(false)

  // Configuration State
  const [narrationStyle, setNarrationStyle] = useState('varzea')
  const [effectIntensity, setEffectIntensity] = useState([50])
  const [addMusic, setAddMusic] = useState('yes')

  const funnyMessages = [
    'Calibrando a corneta...',
    'Adicionando efeitos sonoros questionáveis...',
    'Detectando jogadas duvidosas...',
    'Aplicando filtro de habilidade...',
    'Consultando o VAR...',
    'Gerando memes automáticos...',
  ]

  const handleFileSelect = () => {
    // Simulate file selection
    toast.success('Vídeo carregado com sucesso!')
    setSelectedVideo(
      'https://img.usecurling.com/p/400/800?q=soccer%20fail&color=orange',
    )
    setStep('config')
  }

  const handleProcess = () => {
    setStep('processing')
    setProgress(0)

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15
      if (currentProgress > 100) {
        currentProgress = 100
        clearInterval(interval)
        setTimeout(() => setStep('result'), 500)
      }
      setProgress(currentProgress)
      setProcessingMessage(
        funnyMessages[Math.floor(Math.random() * funnyMessages.length)],
      )
    }, 800)
  }

  const handleReset = () => {
    setStep('select')
    setSelectedVideo(null)
    setProgress(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (step === 'select' ? navigate(-1) : handleReset())}
          className="rounded-full"
        >
          {step === 'select' ? (
            <ArrowLeft className="h-5 w-5" />
          ) : (
            <RotateCcw className="h-5 w-5" />
          )}
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-gold" /> Edição Várzea
        </h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 p-4 max-w-md mx-auto w-full flex flex-col justify-center">
        {/* STEP 1: SELECT */}
        {step === 'select' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Escolha seu Highlight</h2>
              <p className="text-muted-foreground">
                Selecione um vídeo da sua galeria para nossa IA transformar em
                entretenimento puro.
              </p>
            </div>

            <Card
              className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer bg-secondary/20"
              onClick={handleFileSelect}
            >
              <CardContent className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">Toque para enviar</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    MP4, MOV até 1 min
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl bg-muted relative overflow-hidden group cursor-pointer"
                  onClick={handleFileSelect}
                >
                  <img
                    src={`https://img.usecurling.com/p/300/200?q=soccer&seed=${i}`}
                    alt="Recent"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white opacity-80" />
                  </div>
                  <Badge className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/60">
                    Recente
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CONFIG */}
        {step === 'config' && selectedVideo && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="aspect-[9/16] max-h-[40vh] bg-black rounded-2xl overflow-hidden relative shadow-xl mx-auto border border-border/50">
              <img
                src={selectedVideo}
                alt="Selected"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge
                  variant="secondary"
                  className="text-lg py-1 px-3 backdrop-blur-md"
                >
                  Pré-visualização
                </Badge>
              </div>
            </div>

            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Personalizar Edição</CardTitle>
                <CardDescription>Configure a IA do Várzea</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Estilo de Narração</Label>
                  <Select
                    value={narrationStyle}
                    onValueChange={setNarrationStyle}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {narrationStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Intensidade da Zoeira</Label>
                    <span className="text-xs text-muted-foreground font-mono">
                      {effectIntensity}%
                    </span>
                  </div>
                  <Slider
                    value={effectIntensity}
                    onValueChange={setEffectIntensity}
                    max={100}
                    step={10}
                    className="py-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Define a frequência de efeitos sonoros e visuais.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Trilha Sonora</Label>
                  <Select value={addMusic} onValueChange={setAddMusic}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Música Épica</SelectItem>
                      <SelectItem value="funny">Música Engraçada</SelectItem>
                      <SelectItem value="none">Som Original</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full h-12 text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 shadow-lg"
                  onClick={handleProcess}
                >
                  <Wand2 className="mr-2 h-5 w-5" /> Gerar Magic Edit
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500 py-10">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-4 border-muted flex items-center justify-center bg-secondary/30">
                <Wand2 className="h-12 w-12 text-muted-foreground/20" />
              </div>
              <div
                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                style={{
                  animationDuration: '1.5s',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-xl">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <div className="space-y-2 text-center max-w-xs mx-auto">
              <h3 className="text-xl font-bold animate-pulse">
                Processando vídeo...
              </h3>
              <p className="text-muted-foreground transition-all duration-300 h-6">
                {processingMessage}
              </p>
            </div>

            <div className="w-full max-w-xs space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Upload</span>
                <span>AI Magic</span>
                <span>Render</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 'result' && selectedVideo && (
          <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500 pb-8">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                Está Pronto!
              </h2>
              <p className="text-muted-foreground text-sm">
                Seu vídeo foi editado com sucesso.
              </p>
            </div>

            <div className="relative aspect-[9/16] max-h-[50vh] bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/20 group">
              <img
                src={selectedVideo}
                alt="Result"
                className="w-full h-full object-cover"
              />

              {/* Fake UI Overlay for Edited Video */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-gold text-black hover:bg-gold font-bold animate-pulse">
                  Várzea Edition
                </Badge>
              </div>

              {/* Overlay Stickers Simulation */}
              <div className="absolute bottom-1/4 right-8 rotate-12 opacity-80">
                <span className="text-4xl">🔥</span>
              </div>
              <div className="absolute top-1/4 right-4 -rotate-12 opacity-80">
                <span className="text-4xl">⚽️</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40 transition-transform hover:scale-110"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white fill-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-14 rounded-xl gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                onClick={() => toast.success('Vídeo salvo na galeria!')}
              >
                <Download className="h-5 w-5" />
                Salvar
              </Button>
              <Button
                className="h-14 rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                onClick={() => setShowShare(true)}
              >
                <Share2 className="h-5 w-5" />
                Compartilhar
              </Button>
            </div>

            <Card className="bg-secondary/30 border-none">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <Sparkles className="h-5 w-5 text-gold" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Dica Pro</p>
                  <p className="text-muted-foreground">
                    Vídeos com a tag #GoplayVarzea têm 2x mais alcance no feed!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        title="Minha Jogada Várzea Edit"
        description="Confira esse edit absurdo que a IA do Goplay fez do meu lance! 🔥⚽️"
      />
    </div>
  )
}
