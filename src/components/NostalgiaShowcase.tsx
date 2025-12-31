import { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
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
  Eye,
  Settings,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
    description: 'Estética quente e nostálgica com tons sépia.',
    preset: 'retro',
    icon: Film,
    imageQuery: 'retro sunset sports',
  },
  {
    id: 'vhs',
    name: 'Efeito VHS',
    description: 'Distorção de fita magnética com scanlines.',
    preset: 'vhs',
    icon: Tv,
    imageQuery: 'basketball action urban',
  },
  {
    id: 'grain',
    name: 'Granulação',
    description: 'Filme preto e branco clássico de alto contraste.',
    preset: 'grain',
    icon: ImageIcon,
    imageQuery: 'athlete portrait black and white',
  },
  {
    id: '90s',
    name: 'Anos 90',
    description: 'Cores vibrantes e saturadas estilo revista.',
    preset: '90s',
    icon: Sparkles,
    imageQuery: 'skateboarding urban colorful',
  },
  {
    id: 'analog',
    name: 'Analógico',
    description: 'Vazamentos de luz e suavidade de lentes.',
    preset: 'analog',
    icon: Aperture,
    imageQuery: 'soccer field sunlight flare',
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'Moldura instantânea icônica com revelação única.',
    preset: 'polaroid',
    icon: Camera,
    imageQuery: 'team celebration happy',
  },
]

interface NostalgiaShowcaseProps {
  className?: string
}

export function NostalgiaShowcase({ className }: NostalgiaShowcaseProps) {
  const [showOriginal, setShowOriginal] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={cn('flex flex-col h-full w-full space-y-4', className)}>
      <div className="space-y-1 px-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold" />
          Galeria Nostalgia
        </h2>
        <p className="text-sm text-muted-foreground">
          Descubra filtros exclusivos para seus momentos.
        </p>
      </div>

      <div className="flex-1 w-full min-h-0 rounded-3xl overflow-hidden border border-border/50 bg-zinc-950 relative shadow-2xl">
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full -ml-0">
            {showcaseItems.map((item) => (
              <CarouselItem key={item.id} className="h-full pl-0 relative">
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={`https://img.usecurling.com/p/800/1000?q=${item.imageQuery}&dpr=2`}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    {/* Nostalgia Filter Layer */}
                    <div
                      className={cn(
                        'absolute inset-0 transition-opacity duration-300',
                        showOriginal ? 'opacity-0' : 'opacity-100',
                      )}
                    >
                      <NostalgiaFilter forceEnable manualPreset={item.preset} />
                    </div>
                  </div>

                  {/* Top Gradient */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col justify-end h-full pointer-events-none">
                    <div className="space-y-4 pointer-events-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                          <item.icon className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase border border-gold/20">
                              Premium
                            </span>
                            <span className="text-white/60 text-xs">
                              {showOriginal ? 'Original' : 'Com Filtro'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/80 text-sm leading-relaxed drop-shadow-sm line-clamp-2 max-w-xs">
                        {item.description}
                      </p>

                      <div className="flex gap-3 pt-2">
                        <Button
                          className={cn(
                            'flex-1 font-semibold backdrop-blur-md transition-all border shadow-lg h-12 rounded-xl',
                            showOriginal
                              ? 'bg-gold text-black border-gold hover:bg-gold/90'
                              : 'bg-white/20 text-white border-white/20 hover:bg-white/30',
                          )}
                          onMouseDown={() => setShowOriginal(true)}
                          onMouseUp={() => setShowOriginal(false)}
                          onTouchStart={() => setShowOriginal(true)}
                          onTouchEnd={() => setShowOriginal(false)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {showOriginal ? 'Solte para ver' : 'Segure para ver'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="absolute right-4 bottom-[20%] z-30 flex flex-col gap-2">
            <CarouselPrevious
              variant="outline"
              size="icon"
              className="static translate-y-0 h-10 w-10 rounded-full bg-black/40 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
            />
            <CarouselNext
              variant="outline"
              size="icon"
              className="static translate-y-0 h-10 w-10 rounded-full bg-gold text-black border-none hover:bg-gold/90 shadow-lg"
            />
          </div>
        </Carousel>
      </div>

      <div className="flex items-center justify-between px-2 py-1 text-xs text-muted-foreground bg-secondary/30 rounded-lg border border-border/50 p-3">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-primary" />
          <span>Ative nas configurações</span>
        </div>
        <Button
          variant="link"
          className="h-auto p-0 text-xs text-primary"
          onClick={() => navigate('/login')}
        >
          Entrar para ativar
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  )
}
