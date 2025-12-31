import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { NostalgiaFilter } from '@/components/NostalgiaFilter'
import { NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import {
  Sparkles,
  Film,
  Camera,
  Tv,
  Image as ImageIcon,
  Aperture,
  Settings,
  X,
  Eye,
} from 'lucide-react'

interface ShowcaseItem {
  id: string
  name: string
  description: string
  preset: NostalgiaPreset
  icon: React.ElementType
  imageQuery: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'retro',
    name: 'Tons Retrô',
    description:
      'Uma estética quente e nostálgica com tons sépia e vinheta suave.',
    preset: 'retro',
    icon: Film,
    imageQuery: 'retro sunset sports',
  },
  {
    id: 'vhs',
    name: 'Efeito VHS',
    description:
      'A clássica distorção de fita magnética com linhas de scan e glitch.',
    preset: 'vhs',
    icon: Tv,
    imageQuery: 'basketball action action',
  },
  {
    id: 'grain',
    name: 'Granulação',
    description: 'Textura de filme clássico preto e branco com alto contraste.',
    preset: 'grain',
    icon: ImageIcon,
    imageQuery: 'athlete portrait black and white',
  },
  {
    id: '90s',
    name: 'Anos 90',
    description: 'Cores vibrantes e saturadas típicas das revistas da época.',
    preset: '90s',
    icon: Sparkles,
    imageQuery: 'skateboarding urban',
  },
  {
    id: 'analog',
    name: 'Analógico',
    description: 'Vazamentos de luz e suavidade de lentes antigas.',
    preset: 'analog',
    icon: Aperture,
    imageQuery: 'soccer field sunlight',
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'A moldura instantânea icônica com revelação única.',
    preset: 'polaroid',
    icon: Camera,
    imageQuery: 'team celebration happy',
  },
]

interface NostalgiaShowcaseProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NostalgiaShowcase({
  open,
  onOpenChange,
}: NostalgiaShowcaseProps) {
  const [showOriginal, setShowOriginal] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] md:h-[80vh] flex flex-col p-0 overflow-hidden bg-zinc-950 border-gold/20 !rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-background to-gold/5 pointer-events-none" />

        <DialogHeader className="p-6 pb-2 relative z-10 flex flex-row items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-gold/20 to-purple-500/20 rounded-xl border border-white/10">
              <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            </div>
            <div className="text-left">
              <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Modo Nostalgia
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Transforme seu mundo com estética premium
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/10 text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="flex-1 relative w-full h-full min-h-0 bg-black/50">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full -ml-0">
              {showcaseItems.map((item) => (
                <CarouselItem key={item.id} className="h-full pl-0 relative">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={`https://img.usecurling.com/p/800/800?q=${item.imageQuery}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Nostalgia Filter Layer */}
                      <div
                        className={cn(
                          'absolute inset-0 transition-opacity duration-300',
                          showOriginal ? 'opacity-0' : 'opacity-100',
                        )}
                      >
                        <NostalgiaFilter
                          forceEnable
                          manualPreset={item.preset}
                        />
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                      <div className="space-y-3 max-w-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <item.icon className="w-5 h-5 text-gold" />
                          </div>
                          <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed drop-shadow-md">
                          {item.description}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col gap-3 w-full md:w-auto">
                        <Button
                          size="lg"
                          className={cn(
                            'w-full md:w-auto font-semibold backdrop-blur-sm transition-all border',
                            showOriginal
                              ? 'bg-gold text-black border-gold hover:bg-gold/90'
                              : 'bg-black/40 text-white border-white/30 hover:bg-black/60',
                          )}
                          onMouseDown={() => setShowOriginal(true)}
                          onMouseUp={() => setShowOriginal(false)}
                          onTouchStart={() => setShowOriginal(true)}
                          onTouchEnd={() => setShowOriginal(false)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {showOriginal
                            ? 'Visualizando Original'
                            : 'Segure para Comparar'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex">
              <CarouselPrevious className="bg-black/20 border-white/10 text-white hover:bg-black/40 hover:text-gold" />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex">
              <CarouselNext className="bg-black/20 border-white/10 text-white hover:bg-black/40 hover:text-gold" />
            </div>
          </Carousel>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-zinc-900/90 border-t border-white/5 flex items-center justify-between text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gold" />
            <span>
              Ative em{' '}
              <span className="text-white font-medium">Configurações</span> ou
              no ícone de filtro nos vídeos.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Disponível para todos os usuários</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
