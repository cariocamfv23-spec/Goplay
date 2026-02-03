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
  // --- FUTEBOL (High Priority) ---
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
  {
    id: 'futsal_2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=futsal%20goal%20indoor&color=blue&dpr=2',
    title: 'Golaço de cavadinha! ⚽',
    description: 'Muita frieza na frente do goleiro. Categoria máxima!',
    likes: 980,
    comments: 32,
    shares: 150,
    user: {
      id: 'u_fut_2',
      name: 'Magic Feet',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=106',
      isFollowing: true,
    },
    music: { title: 'Skills', artist: 'Beat' },
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
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=107',
      isFollowing: true,
    },
    music: { title: 'Hip Hop Beat', artist: 'Street' },
    modality: 'basketball',
  },
  {
    id: 'bball_2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=basketball%203%20point%20shot&color=orange&dpr=2',
    title: 'Chuva de 3 pontos! 👌',
    description: 'Mão quente no treino de hoje. Ninguém segura!',
    likes: 1500,
    comments: 67,
    shares: 200,
    user: {
      id: 'u_bball_2',
      name: 'Sniper 3pts',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=108',
      isFollowing: false,
    },
    music: null,
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
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=109',
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
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=110',
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
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=111',
      isFollowing: true,
    },
    music: { title: 'Punk Rock', artist: 'Sk8' },
    modality: 'skate',
  },

  // --- VOLLEYBALL ---
  {
    id: 'volley_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=volleyball%20spike&color=yellow&dpr=2',
    title: 'Cortada na diagonal! 🏐',
    description: 'Ataque indefensável. O levantador deixou na pinta!',
    likes: 1800,
    comments: 90,
    shares: 300,
    user: {
      id: 'u_volley_1',
      name: 'Vôlei Show',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=112',
      isFollowing: true,
    },
    music: null,
    modality: 'volleyball',
  },

  // --- TENNIS ---
  {
    id: 'tennis_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=tennis%20serve&color=green&dpr=2',
    title: 'Ace no match point! 🎾',
    description: 'Saque a 200km/h para fechar o jogo. Que momento!',
    likes: 1300,
    comments: 45,
    shares: 100,
    user: {
      id: 'u_tennis_1',
      name: 'Grand Slammer',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=113',
      isFollowing: false,
    },
    music: null,
    modality: 'tennis',
  },

  // --- FIGHTING ---
  {
    id: 'fight_1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=boxing%20training%20punch&color=red&dpr=2',
    title: 'Treino de velocidade 🥊',
    description: 'Manopla pegando fogo hoje. Foco na esquiva e contra-ataque.',
    likes: 2400,
    comments: 120,
    shares: 500,
    user: {
      id: 'u_fight_1',
      name: 'Knockout King',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=114',
      isFollowing: true,
    },
    music: { title: 'Eye of the Tiger', artist: 'Classic' },
    modality: 'boxing',
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
    // Note: 'Following' feed also respects tribe filter for better UX, or we can disable tribe filter for 'Following'.
    // Let's make 'Following' show ALL following content regardless of tribe for broad discovery of friends.
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
