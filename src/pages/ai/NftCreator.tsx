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
  Layers,
  Palette,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ShareDialog } from '@/components/ShareDialog'
import { mockCurrentUser } from '@/lib/data'
import { cn } from '@/lib/utils'

type NftStyle = 'cyberpunk' | 'classic' | 'gold' | 'holographic'

export default function NftCreator() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState<NftStyle>('cyberpunk')
  const [showShare, setShowShare] = useState(false)

  const styles: { id: NftStyle; name: string; color: string }[] = [
    { id: 'cyberpunk', name: 'Cyberpunk', color: 'from-pink-500 to-cyan-500' },
    { id: 'classic', name: 'Clássico', color: 'from-slate-700 to-slate-900' },
    { id: 'gold', name: 'Lendário', color: 'from-yellow-400 to-yellow-600' },
    {
      id: 'holographic',
      name: 'Holográfico',
      color: 'from-indigo-400 to-purple-400',
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
          container: 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]',
          image: 'contrast-125 saturate-150 hue-rotate-15',
          overlay:
            'bg-gradient-to-t from-cyan-900/80 via-transparent to-pink-500/20',
          badge: 'bg-cyan-500 text-black',
          border: 'border-2 border-cyan-400',
        }
      case 'gold':
        return {
          container:
            'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)]',
          image: 'sepia-[.3] contrast-110 saturate-125',
          overlay:
            'bg-gradient-to-t from-yellow-900/80 via-transparent to-yellow-500/10',
          badge: 'bg-yellow-500 text-black',
          border: 'border-4 border-yellow-500',
        }
      case 'holographic':
        return {
          container:
            'border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]',
          image: 'brightness-110 contrast-110',
          overlay:
            'bg-gradient-to-tr from-indigo-500/20 via-transparent to-purple-500/20 mix-blend-overlay',
          badge: 'bg-indigo-500 text-white',
          border: 'border-2 border-indigo-400',
        }
      default: // classic
        return {
          container: 'border-white/20 shadow-xl',
          image: '',
          overlay:
            'bg-gradient-to-t from-black/80 via-transparent to-transparent',
          badge: 'bg-white text-black',
          border: 'border border-white/20',
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
                Crie colecionáveis digitais únicos a partir dos seus melhores
                momentos.
              </p>
            </div>

            {/* Upload Area */}
            <div className="flex-1 flex flex-col gap-6 justify-center">
              <div
                className={cn(
                  'relative aspect-[4/5] rounded-2xl border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary/50 group overflow-hidden bg-secondary/10',
                  selectedImage ? 'border-solid border-primary' : '',
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
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
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
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-medium flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" /> Trocar Imagem
                    </p>
                  </div>
                )}
              </div>

              {/* Styles */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" /> Estilo do Card
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((style) => (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={cn(
                        'cursor-pointer rounded-xl p-3 border-2 transition-all flex items-center gap-3 relative overflow-hidden',
                        selectedStyle === style.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50',
                      )}
                    >
                      <div
                        className={cn(
                          'h-8 w-8 rounded-full bg-gradient-to-br',
                          style.color,
                        )}
                      />
                      <span className="text-sm font-medium">{style.name}</span>
                      {selectedStyle === style.id && (
                        <Check className="h-4 w-4 ml-auto text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="w-full h-12 text-lg font-bold shadow-lg"
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
              <h3 className="text-xl font-bold">Mintando Arte Digital...</h3>
              <p className="text-muted-foreground text-sm">
                Aplicando filtros de raridade e gerando metadados únicos.
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

            {/* NFT Card Preview */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div
                className={cn(
                  'relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 bg-black group',
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
                <div className={cn('absolute inset-0', activeStyle.overlay)} />

                {/* Card Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  {/* Top: Rarity & Stats */}
                  <div className="flex justify-between items-start">
                    <Badge
                      className={cn(
                        'border-0 font-bold uppercase tracking-wider',
                        activeStyle.badge,
                      )}
                    >
                      {selectedStyle === 'gold' ? 'Legendary' : 'Rare'}
                    </Badge>
                    <div className="flex flex-col items-end">
                      <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 text-white border border-white/10 text-xs font-mono">
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
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg">
                      {mockCurrentUser.name}
                    </h3>
                    <div className="flex justify-between items-end text-white/80 text-xs font-medium">
                      <span>{new Date().toLocaleDateString()}</span>
                      <span className="font-mono opacity-60">
                        #GP-{Math.floor(Math.random() * 9000) + 1000}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Holographic Shine Effect */}
                {selectedStyle === 'holographic' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none mix-blend-overlay" />
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
