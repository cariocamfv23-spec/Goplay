import { useState, useRef } from 'react'
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
  Check,
  Grid3X3,
  Box,
  Zap,
  Ghost,
  Layers,
  Paintbrush,
  Star,
  Monitor,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { ShareDialog } from '@/components/ShareDialog'
import { mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'

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

export default function NftCreator() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState<NftStyle>('cyberpunk')
  const [showShare, setShowShare] = useState(false)

  const styles: { id: NftStyle; name: string; color: string; icon: any }[] = [
    {
      id: 'classic',
      name: 'Clássico',
      color: 'from-slate-700 to-slate-900',
      icon: Gem,
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      color: 'from-pink-500 to-cyan-500',
      icon: Zap,
    },
    {
      id: 'gold',
      name: 'Lendário',
      color: 'from-yellow-400 to-yellow-600',
      icon: Star,
    },
    {
      id: 'holographic',
      name: 'Holográfico',
      color: 'from-indigo-400 to-purple-400',
      icon: Ghost,
    },
    {
      id: 'pixel',
      name: 'Retro Pixel',
      color: 'from-green-500 to-emerald-700',
      icon: Monitor,
    },
    {
      id: '3d',
      name: 'Modern 3D',
      color: 'from-blue-400 to-blue-600',
      icon: Box,
    },
    {
      id: 'pop',
      name: 'Pop Art',
      color: 'from-rose-500 to-orange-500',
      icon: Palette,
    },
    {
      id: 'sketch',
      name: 'Sketch',
      color: 'from-stone-500 to-stone-700',
      icon: Paintbrush,
    },
    {
      id: 'oil',
      name: 'Óleo',
      color: 'from-amber-600 to-orange-700',
      icon: Layers,
    },
  ]

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
      description: 'Imagem salva em alta resolução.',
    })
  }

  const getNftStyles = (style: NftStyle) => {
    switch (style) {
      case 'cyberpunk':
        return {
          container:
            'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-slate-950',
          image: 'contrast-125 saturate-150 hue-rotate-15',
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
          image: 'sepia-[.3] contrast-110 saturate-125',
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
          image: 'brightness-110 contrast-110',
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
          image: 'grayscale contrast-125 brightness-90',
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
          image: 'brightness-105 contrast-105 saturate-110',
          overlay: 'bg-gradient-to-t from-black/60 via-transparent to-white/10',
          badge: 'bg-blue-500 text-white shadow-lg',
          border: 'border border-blue-400/50 rounded-3xl',
          text: 'text-white drop-shadow-md',
        }
      case 'pop':
        return {
          container:
            'border-white shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] bg-yellow-400',
          image: 'saturate-[2.5] contrast-125 brightness-110',
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
          image: 'grayscale contrast-[1.5] brightness-125',
          overlay: 'bg-white/10 mix-blend-multiply',
          badge: 'bg-black text-white font-serif',
          border: 'border-2 border-black',
          text: 'text-white mix-blend-difference font-serif',
        }
      case 'oil':
        return {
          container: 'border-amber-700/50 shadow-2xl bg-stone-900',
          image: 'sepia-[.2] contrast-125 saturate-150 blur-[0.5px]',
          overlay:
            'bg-gradient-to-t from-black/50 via-amber-500/10 to-transparent',
          badge: 'bg-amber-600 text-white',
          border: 'border-8 border-double border-amber-800',
          text: 'text-amber-100 font-serif italic',
        }
      default: // classic
        return {
          container: 'border-white/20 shadow-xl bg-black',
          image: '',
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
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Transforme sua Jogada</h2>
              <p className="text-muted-foreground text-sm">
                Crie colecionáveis digitais únicos com estilos artísticos
                exclusivos.
              </p>
            </div>

            {/* Upload Area with Live Preview */}
            <div className="flex-1 flex flex-col gap-6">
              <div
                className={cn(
                  'relative aspect-[4/5] rounded-2xl border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary/50 group overflow-hidden bg-secondary/10',
                  selectedImage ? 'border-solid border-primary' : '',
                  // Apply container style for preview if image is selected
                  selectedImage && activeStyle.container,
                  selectedImage && activeStyle.border,
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {selectedImage ? (
                  <>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className={cn(
                        'w-full h-full object-cover transition-all duration-300',
                        activeStyle.image,
                      )}
                    />
                    <div
                      className={cn(
                        'absolute inset-0 transition-all duration-300 pointer-events-none',
                        activeStyle.overlay,
                      )}
                    />
                  </>
                ) : (
                  <>
                    <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="font-semibold">Selecionar Foto</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG ou PNG
                    </p>
                  </>
                )}

                {selectedImage && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                    <p className="text-white font-medium flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" /> Trocar Imagem
                    </p>
                  </div>
                )}
              </div>

              {/* Styles Scroll Area */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" /> Estilo do Card
                </Label>
                <ScrollArea className="w-full whitespace-nowrap pb-4">
                  <div className="flex w-max space-x-3 p-1">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={cn(
                          'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all min-w-[100px] relative overflow-hidden bg-card',
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
                        <span className="text-xs font-medium">
                          {style.name}
                        </span>
                        {selectedStyle === style.id && (
                          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
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
              <div
                className={cn(
                  'relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 group shadow-2xl',
                  activeStyle.container,
                  activeStyle.border,
                )}
              >
                {/* Background Image with Effects */}
                <img
                  src={selectedImage}
                  alt="NFT"
                  className={cn(
                    'w-full h-full object-cover transition-all',
                    activeStyle.image,
                  )}
                />

                {/* Overlay Gradient */}
                <div
                  className={cn(
                    'absolute inset-0 pointer-events-none',
                    activeStyle.overlay,
                  )}
                />

                {/* Card Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top: Rarity & Stats */}
                  <div className="flex justify-between items-start">
                    <Badge
                      className={cn(
                        'border-0 font-bold uppercase tracking-wider shadow-sm',
                        activeStyle.badge,
                      )}
                    >
                      {selectedStyle === 'gold'
                        ? 'Legendary'
                        : selectedStyle === 'cyberpunk'
                          ? 'Epic'
                          : 'Rare'}
                    </Badge>
                    <div className="flex flex-col items-end">
                      <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 text-white border border-white/10 text-xs font-mono shadow-sm">
                        <div>
                          PWR <span className="text-green-400">98</span>
                        </div>
                        <div>
                          SPD <span className="text-yellow-400">92</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Gem className="h-6 w-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </div>
                    <h3
                      className={cn(
                        'text-2xl font-black uppercase italic tracking-tighter drop-shadow-lg',
                        activeStyle.text,
                      )}
                    >
                      {mockCurrentUser.name}
                    </h3>
                    <div
                      className={cn(
                        'flex justify-between items-end text-xs font-medium opacity-90',
                        activeStyle.text,
                      )}
                    >
                      <span>{new Date().toLocaleDateString()}</span>
                      <span className="font-mono opacity-80">
                        #GP-{Math.floor(Math.random() * 9000) + 1000}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Special Effects */}
                {selectedStyle === 'holographic' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none mix-blend-overlay" />
                )}
                {selectedStyle === 'pixel' && (
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />
                )}
                {selectedStyle === '3d' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none rounded-2xl" />
                )}
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
