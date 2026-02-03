import { useState, useRef, useEffect } from 'react'
import { tribes, mockCurrentUser } from '@/lib/data'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Zap, Map as MapIcon } from 'lucide-react'
import { VideoCard, VideoData } from '@/components/move/VideoCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// Enhanced Video Data with Specific Sports Highlights ("Lances de Esportes")
const MOVE_VIDEOS: VideoData[] = [
  // --- FUTEBOL (Priority for default user) ---
  {
    id: 'fut_highlight_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=soccer%20free%20kick%20goal&color=green&dpr=2',
    title: 'Cobrança de falta perfeita! 🎯',
    description:
      'Aquele chute no ângulo que o goleiro nem viu a cor da bola. Técnica pura!',
    likes: 3420,
    comments: 145,
    shares: 890,
    user: {
      id: 'u_pro_1',
      name: 'Camisa 10',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=101',
      isFollowing: false,
    },
    music: { title: 'Gol de Placa', artist: 'Torcida' },
    modality: 'futebol',
  },
  {
    id: 'fut_highlight_2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=soccer%20dribbling%20skill&color=green&dpr=2',
    title: 'Entortando a zaga 🔥',
    description:
      'Sequência de dribles rápidos em espaço curto. Controle de bola absurdo.',
    likes: 2150,
    comments: 88,
    shares: 340,
    user: {
      id: 'u_pro_2',
      name: 'Rei do Drible',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=102',
      isFollowing: true,
    },
    music: { title: 'Ousadia', artist: 'Samba Ball' },
    modality: 'futebol',
  },
  {
    id: 'fut_highlight_3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=goalkeeper%20save&color=green&dpr=2',
    title: 'Defesa impossível! 🧤',
    description:
      'Reflexo em dia! Uma das defesas mais bonitas da rodada no campeonato amador.',
    likes: 1800,
    comments: 56,
    shares: 120,
    user: {
      id: 'u_pro_3',
      name: 'Paredão FC',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=103',
      isFollowing: true,
    },
    music: null,
    modality: 'futebol',
  },
  {
    id: 'fut_highlight_4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=soccer%20team%20celebration&color=green&dpr=2',
    title: 'Aquele gol no último minuto! 🏆',
    description: 'A emoção de vencer o jogo nos acréscimos. Isso é futebol!',
    likes: 5600,
    comments: 320,
    shares: 1200,
    user: {
      id: 'u_pro_4',
      name: 'Várzea Raiz',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=104',
      isFollowing: false,
    },
    music: { title: 'Champions', artist: 'Epic' },
    modality: 'futebol',
  },

  // --- FUTSAL ---
  {
    id: 'futsal_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=futsal%20skill%20move&color=blue&dpr=2',
    title: 'Pisada e giro 🌪️',
    description: 'Fundamentos do futsal aplicados com perfeição na ala.',
    likes: 1200,
    comments: 45,
    shares: 80,
    user: {
      id: 'u_fut_1',
      name: 'Falcão Fan',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=105',
      isFollowing: false,
    },
    music: null,
    modality: 'futsal',
  },

  // --- BASKETBALL ---
  {
    id: 'bball_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=basketball%20dunk&color=orange&dpr=2',
    title: 'Dunk contest vibes 🏀',
    description:
      'Voando alto na quadra do parque. A altura do salto impressiona!',
    likes: 2800,
    comments: 110,
    shares: 450,
    user: {
      id: 'u_bball_1',
      name: 'Air Jordan Jr',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=106',
      isFollowing: true,
    },
    music: { title: 'Hip Hop Beat', artist: 'Street' },
    modality: 'basketball',
  },

  // --- CROSSFIT ---
  {
    id: 'cf_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=crossfit%20clean%20jerk&color=black&dpr=2',
    title: 'Novo PR no Clean & Jerk 🏋️',
    description: '100kg batidos! Técnica sólida e muita força explosiva.',
    likes: 950,
    comments: 34,
    shares: 20,
    user: {
      id: 'u_cf_1',
      name: 'Iron Cross',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=107',
      isFollowing: true,
    },
    music: { title: 'Heavy Metal', artist: 'Gym' },
    modality: 'crossfit',
  },

  // --- SURF ---
  {
    id: 'surf_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=surfing%20tube&color=cyan&dpr=2',
    title: 'Tubo perfeito em Itamambuca 🌊',
    description: 'Swell entrou com tudo no fim de semana. Drop insano!',
    likes: 3100,
    comments: 150,
    shares: 600,
    user: {
      id: 'u_surf_1',
      name: 'Soul Surfer',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=108',
      isFollowing: false,
    },
    music: { title: 'Reggae Vibes', artist: 'Beach' },
    modality: 'surf',
  },

  // --- SKATE ---
  {
    id: 'skate_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=skateboard%20kickflip&color=gray&dpr=2',
    title: 'Kickflip na escadaria 🛹',
    description: 'Depois de 15 tentativas, finalmente saiu limpo!',
    likes: 4200,
    comments: 200,
    shares: 800,
    user: {
      id: 'u_skate_1',
      name: 'Street King',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=109',
      isFollowing: true,
    },
    music: { title: 'Punk Rock', artist: 'Sk8' },
    modality: 'skate',
  },
]

export default function Move() {
  const navigate = useNavigate()

  // Logic to determine initial tribe based on User Profile
  // This satisfies the requirement to match "athlete profile" modality
  const getInitialTribe = () => {
    if (!mockCurrentUser?.sport) return 'all'

    // Normalize sport name to match tribe IDs (e.g., 'Futebol' -> 'futebol')
    const userSportId = mockCurrentUser.sport
      .toLowerCase()
      .replace('ê', 'e')
      .replace('ç', 'c')
      .replace('ã', 'a')

    // Check if the user's sport exists in our tribes list
    const tribeExists = tribes.some((t) => t.id === userSportId)

    // If it exists, default to it. Otherwise, show all.
    return tribeExists ? userSportId : 'all'
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTribe, setActiveTribe] = useState(getInitialTribe())
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  const filteredVideos =
    activeTribe === 'all'
      ? MOVE_VIDEOS
      : MOVE_VIDEOS.filter((video) => video.modality === activeTribe)

  const handleTribeChange = (tribeId: string) => {
    setActiveTribe(tribeId)
    setActiveIndex(0)
    // Reset scroll position
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  // Effect to ensure we start at the top when tribe changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [activeTribe])

  return (
    <div className="h-full w-full bg-black relative">
      {/* Header / Tribes Filter Bar */}
      <div className="absolute top-4 left-0 right-0 z-30 flex flex-col items-center">
        {/* Standard "Following | For You" Tabs */}
        <div className="flex items-center justify-between w-full px-4 mb-2">
          <div className="w-24"></div> {/* Spacer for centering */}
          <div className="flex items-center gap-4 text-white text-sm font-bold shadow-black drop-shadow-md">
            <span className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
              Seguindo
            </span>
            <span className="opacity-60">|</span>
            <span className="opacity-100 border-b-2 border-white pb-0.5">
              Para Você
            </span>
          </div>
          {/* Kids Map Integration - Enhanced Button */}
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

        {/* Tribes Scroll */}
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
          <div className="h-full w-full flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="bg-zinc-800 p-4 rounded-full mb-4">
              <Zap className="h-8 w-8 text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sem vídeos no momento</h3>
            <p className="text-zinc-400">
              Não encontramos lances para {activeTribe}. Tente selecionar outra
              tribo ou volte mais tarde!
            </p>
            <Button
              variant="outline"
              className="mt-6 border-white/20 text-white hover:bg-white/10"
              onClick={() => handleTribeChange('all')}
            >
              Ver todos os esportes
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
