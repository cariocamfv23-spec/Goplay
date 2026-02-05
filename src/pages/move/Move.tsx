import { useState, useRef, useEffect } from 'react'
import { tribes, mockCurrentUser } from '@/lib/data'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Zap, Map as MapIcon } from 'lucide-react'
import { VideoCard, VideoData } from '@/components/move/VideoCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// High-Quality Sports Highlights Data
// Replacing generic media with authentic sports content as per user story
const MOVE_VIDEOS: VideoData[] = [
  // --- FUTEBOL (High Priority) ---
  {
    id: 'fut_highlight_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=soccer%20free%20kick%20goal%20stadium&color=green&dpr=2',
    title: 'Cobrança de falta magistral! ⚽🎯',
    description:
      'Aquele chute no ângulo que o goleiro nem viu a cor da bola. Técnica pura e precisão cirúrgica.',
    likes: 15420,
    comments: 432,
    shares: 2100,
    user: {
      id: 'u_pro_1',
      name: 'Camisa 10',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=10',
      isFollowing: false,
    },
    music: { title: 'Gol de Placa', artist: 'Torcida' },
    modality: 'futebol',
  },
  {
    id: 'fut_highlight_2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=soccer%20dribbling%20skill%20close%20up&color=green&dpr=2',
    title: 'Entortando a zaga 🔥',
    description:
      'Sequência de dribles rápidos em espaço curto. Controle de bola absurdo para escapar da marcação.',
    likes: 8950,
    comments: 215,
    shares: 840,
    user: {
      id: 'u_pro_2',
      name: 'Rei do Drible',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=22',
      isFollowing: true,
    },
    music: { title: 'Ousadia', artist: 'Samba Ball' },
    modality: 'futebol',
  },

  // --- BASKETBALL ---
  {
    id: 'bball_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=basketball%20slam%20dunk%20action&color=orange&dpr=2',
    title: 'Dunk Contest Winner 🏀👑',
    description:
      'Saltou da linha do lance livre! Gravidade zero confirmada na quadra central.',
    likes: 28500,
    comments: 1200,
    shares: 5600,
    user: {
      id: 'u_bball_1',
      name: 'Air Mike',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=23',
      isFollowing: true,
    },
    music: { title: 'Hype Beast', artist: 'Court Flow' },
    modality: 'basketball',
  },
  {
    id: 'bball_2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=basketball%203%20point%20shot&color=orange&dpr=2',
    title: 'Chuva de 3 pontos! 👌',
    description:
      'Mão quente no treino de hoje. Ninguém segura quando entra nesse ritmo.',
    likes: 12300,
    comments: 450,
    shares: 890,
    user: {
      id: 'u_bball_2',
      name: 'Sniper 3pts',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=24',
      isFollowing: false,
    },
    music: null,
    modality: 'basketball',
  },

  // --- SURF ---
  {
    id: 'surf_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=surfing%20huge%20barrel%20wave%20ocean&color=cyan&dpr=2',
    title: 'Tubo Gigante em Nazaré 🌊🏄‍♂️',
    description:
      'A força da natureza é impressionante. Drop insano na onda gigante do canhão.',
    likes: 42000,
    comments: 890,
    shares: 12000,
    user: {
      id: 'u_surf_1',
      name: 'Maya Ocean',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=45',
      isFollowing: false,
    },
    music: { title: 'Ocean Drive', artist: 'Chill Waves' },
    modality: 'surf',
  },

  // --- SKATE ---
  {
    id: 'skate_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=skateboarding%20kickflip%20stairs%20urban&color=gray&dpr=2',
    title: 'Kickflip 360 na Escadaria 🛹🚀',
    description:
      'Acertou de primeira! Estilo e técnica dominando o pico de rua em SP.',
    likes: 18900,
    comments: 340,
    shares: 900,
    user: {
      id: 'u_skate_1',
      name: 'Sk8 Or Die',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=66',
      isFollowing: true,
    },
    music: { title: 'Punk Rocker', artist: 'Street Bands' },
    modality: 'skate',
  },

  // --- CROSSFIT ---
  {
    id: 'cf_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=crossfit%20clean%20and%20jerk%20heavy%20gym&color=black&dpr=2',
    title: 'Novo PR de Clean & Jerk! 🏋️‍♂️💪',
    description:
      '120kg pra conta! Foco, força e superação diária no box. A técnica vence a força.',
    likes: 9800,
    comments: 210,
    shares: 150,
    user: {
      id: 'u_cf_1',
      name: 'Iron Lady',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=88',
      isFollowing: true,
    },
    music: { title: 'Beast Mode', artist: 'Gym Motivation' },
    modality: 'crossfit',
  },

  // --- VOLLEYBALL ---
  {
    id: 'volley_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=volleyball%20spike%20match%20action&color=yellow&dpr=2',
    title: 'Monster Block! 🏐⛔',
    description:
      'Paredão subiu e não passou nada. Defesa ganha jogo! O time vibra muito.',
    likes: 11200,
    comments: 180,
    shares: 400,
    user: {
      id: 'u_volley_1',
      name: 'Volei Pro',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=99',
      isFollowing: false,
    },
    music: null,
    modality: 'volleyball',
  },

  // --- FUTSAL ---
  {
    id: 'futsal_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=futsal%20dribbling%20skill%20indoor&color=blue&dpr=2',
    title: 'Rabiscando na Ala 🔥⚽',
    description:
      'Futsal arte na veia. Drible curto, velocidade e finalização no canto.',
    likes: 8700,
    comments: 120,
    shares: 300,
    user: {
      id: 'u_futsal_1',
      name: 'Falcão Jr',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=77',
      isFollowing: true,
    },
    music: { title: 'Samba Beat', artist: 'Brasil' },
    modality: 'futsal',
  },

  // --- BIKE / CYCLING ---
  {
    id: 'bike_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=road%20cycling%20mountain%20sprint&color=orange&dpr=2',
    title: 'Sprint Final na Serra 🚴‍♂️💨',
    description:
      'Subida de 12% de inclinação e ainda sobrou perna pro sprint. Paisagem incrível!',
    likes: 6500,
    comments: 150,
    shares: 200,
    user: {
      id: 'u_bike_1',
      name: 'Pedal Forte',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=55',
      isFollowing: false,
    },
    music: null,
    modality: 'bike',
  },

  // --- TENNIS ---
  {
    id: 'tennis_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=tennis%20serve%20action%20clay&color=green&dpr=2',
    title: 'Ace no Match Point! 🎾🏆',
    description:
      'Saque a 210km/h para fechar o jogo. Concentração total e execução perfeita.',
    likes: 14200,
    comments: 320,
    shares: 500,
    user: {
      id: 'u_tennis_1',
      name: 'Ace Queen',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=33',
      isFollowing: true,
    },
    music: { title: 'Match Point', artist: 'Tennis Courts' },
    modality: 'tennis',
  },
]

export default function Move() {
  const navigate = useNavigate()

  // Logic to determine initial tribe based on User Profile
  const getInitialTribe = () => {
    if (!mockCurrentUser?.sport) return 'all'

    // Normalize sport name to match tribe IDs
    const userSportId = mockCurrentUser.sport
      .toLowerCase()
      .replace('ê', 'e')
      .replace('ç', 'c')
      .replace('ã', 'a')

    // Check if the user's sport exists in our tribes list
    const tribeExists = tribes.some((t) => t.id === userSportId)

    return tribeExists ? userSportId : 'all'
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTribe, setActiveTribe] = useState(getInitialTribe())
  const [feedType, setFeedType] = useState<'foryou' | 'following'>('foryou')
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  // Improved Filtering Logic
  const filteredVideos = MOVE_VIDEOS.filter((video) => {
    // 1. Filter by Feed Type (Following vs For You)
    if (feedType === 'following' && !video.user.isFollowing) {
      return false
    }

    // 2. Filter by Tribe (if activeTribe is not 'all')
    if (feedType === 'following') {
      return true
    }

    // For 'For You', we respect the tribe filter strictly
    if (activeTribe === 'all') return true
    return video.modality === activeTribe
  })

  const handleTribeChange = (tribeId: string) => {
    setActiveTribe(tribeId)
    setFeedType('foryou') // Switch to For You when selecting a tribe to show results
    setActiveIndex(0)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  const handleFeedTypeChange = (type: 'foryou' | 'following') => {
    setFeedType(type)
    setActiveIndex(0)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  // Effect to ensure we start at the top when filter changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [activeTribe, feedType])

  return (
    <div className="h-full w-full bg-black relative">
      {/* Header / Tribes Filter Bar */}
      <div className="absolute top-4 left-0 right-0 z-30 flex flex-col items-center">
        {/* Feed Type Toggles */}
        <div className="flex items-center justify-between w-full px-4 mb-3">
          <div className="w-24"></div> {/* Spacer for centering */}
          <div className="flex items-center gap-4 text-white text-sm font-bold shadow-black drop-shadow-md">
            <button
              onClick={() => handleFeedTypeChange('following')}
              className={cn(
                'transition-all duration-300',
                feedType === 'following'
                  ? 'opacity-100 border-b-2 border-white pb-0.5 scale-105'
                  : 'opacity-60 hover:opacity-100',
              )}
            >
              Seguindo
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => handleFeedTypeChange('foryou')}
              className={cn(
                'transition-all duration-300',
                feedType === 'foryou'
                  ? 'opacity-100 border-b-2 border-white pb-0.5 scale-105'
                  : 'opacity-60 hover:opacity-100',
              )}
            >
              Para Você
            </button>
          </div>
          {/* Kids Map Integration */}
          <Button
            size="sm"
            onClick={() => navigate('/move/kids-map')}
            className="w-auto h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 border border-white/20 hover:opacity-90 text-white shadow-lg text-[10px] font-bold px-3 gap-1.5"
            title="Mapeamento para recreação de crianças"
          >
            <MapIcon className="h-3 w-3" />
            Mapa Kids
          </Button>
        </div>

        {/* Tribes Scroll - Only visible in For You mode or optionally in Following */}
        <div
          className={cn(
            'w-full transition-all duration-300 overflow-hidden',
            feedType === 'following'
              ? 'max-h-0 opacity-0'
              : 'max-h-16 opacity-100',
          )}
        >
          <ScrollArea className="w-full whitespace-nowrap px-4 mask-gradient">
            <div className="flex w-max space-x-3 px-4 pb-2">
              {tribes.map((tribe) => (
                <button
                  key={tribe.id}
                  onClick={() => handleTribeChange(tribe.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 backdrop-blur-md border border-transparent',
                    activeTribe === tribe.id
                      ? 'bg-primary text-white border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.4)]'
                      : 'bg-black/30 text-white hover:bg-black/50 border-white/10',
                  )}
                >
                  {'image' in tribe && tribe.image ? (
                    <img
                      src={tribe.image as string}
                      alt={tribe.label}
                      className="h-3 w-3 object-contain"
                    />
                  ) : (
                    <tribe.icon
                      className={cn(
                        'h-3 w-3',
                        activeTribe === tribe.id ? 'fill-current' : '',
                      )}
                    />
                  )}
                  {tribe.label}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>
      </div>

      {/* Video Feed Container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        onScroll={handleScroll}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={video.id} className="h-full w-full snap-start">
              <VideoCard video={video} isActive={index === activeIndex} />
            </div>
          ))
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-white p-6 text-center bg-zinc-950">
            <div className="bg-zinc-900 p-6 rounded-full mb-6 animate-pulse">
              <Zap className="h-10 w-10 text-zinc-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {feedType === 'following'
                ? 'Nenhum vídeo novo'
                : 'Sem vídeos no momento'}
            </h3>
            <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed">
              {feedType === 'following'
                ? 'Siga mais atletas e times para ver os lances deles aqui.'
                : `Não encontramos lances para ${activeTribe}. Tente selecionar outra tribo ou volte mais tarde!`}
            </p>
            <Button
              variant="outline"
              className="mt-8 border-white/20 text-white hover:bg-white/10 px-8"
              onClick={() =>
                feedType === 'following'
                  ? handleFeedTypeChange('foryou')
                  : handleTribeChange('all')
              }
            >
              {feedType === 'following'
                ? 'Explorar Para Você'
                : 'Ver todos os esportes'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
