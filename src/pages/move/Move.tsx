import { useState, useRef } from 'react'
import { tribes } from '@/lib/data'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Zap, Map as MapIcon } from 'lucide-react'
import { VideoCard, VideoData } from '@/components/move/VideoCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const MOVE_VIDEOS: VideoData[] = [
  // Futebol
  {
    id: 'futebol1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=soccer%20goal%20celebration&color=green',
    title: 'Golaço de falta no ângulo! ⚽️',
    description:
      'Treino de bolas paradas rendendo frutos. A dedicação compensa!',
    likes: 1240,
    comments: 45,
    shares: 89,
    user: {
      id: 'u1',
      name: 'Lucas Paquetá',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=10',
      isFollowing: false,
    },
    music: { title: 'Samba de Janeiro', artist: 'Bellini' },
    modality: 'futebol',
  },
  {
    id: 'futebol2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=soccer%20dribbling&color=green',
    title: 'Dribles rápidos e controle de bola ⚡️',
    description: 'Melhorando a agilidade e a condução em espaço curto.',
    likes: 850,
    comments: 22,
    shares: 34,
    user: {
      id: 'u2',
      name: 'Gabigol',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=11',
      isFollowing: true,
    },
    music: null,
    modality: 'futebol',
  },
  // Futsal
  {
    id: 'futsal1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=futsal%20skill&color=blue',
    title: 'Falcão style na quadra 👑',
    description: 'Tentando replicar os movimentos do rei.',
    likes: 2100,
    comments: 150,
    shares: 500,
    user: {
      id: 'u3',
      name: 'Falcão 12',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=12',
      isFollowing: true,
    },
    music: { title: 'Ousadia e Alegria', artist: 'Thiaguinho' },
    modality: 'futsal',
  },
  // Bike
  {
    id: 'bike1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=mountain%20bike%20trail&color=orange',
    title: 'Trilha insana no fim de semana 🚵',
    description: 'Muita lama, pedras e adrenalina. O MTB não para!',
    likes: 1500,
    comments: 60,
    shares: 120,
    user: {
      id: 'u5',
      name: 'Avancini',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=14',
      isFollowing: true,
    },
    music: { title: 'Born to be Wild', artist: 'Steppenwolf' },
    modality: 'bike',
  },
  // Running
  {
    id: 'running1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=marathon%20runner&color=red',
    title: 'Preparação para a Maratona 🏃💨',
    description: 'Longão de 32km hoje. Ritmo forte do início ao fim.',
    likes: 3200,
    comments: 200,
    shares: 150,
    user: {
      id: 'u7',
      name: 'Kipchoge Fan',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=16',
      isFollowing: false,
    },
    music: { title: 'Eye of the Tiger', artist: 'Survivor' },
    modality: 'running',
  },
  // Crossfit
  {
    id: 'crossfit1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=crossfit%20workout&color=black',
    title: 'WOD from hell 🔥',
    description: 'No pain no gain. 21-15-9 Thrusters e Pull-ups.',
    likes: 890,
    comments: 32,
    shares: 15,
    user: {
      id: 'u9',
      name: 'Sarah Fit',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=45',
      isFollowing: false,
    },
    music: { title: 'Till I Collapse', artist: 'Eminem' },
    modality: 'crossfit',
  },
  // Swimming
  {
    id: 'swimming1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=swimming%20pool%20underwater&color=cyan',
    title: "Debaixo d'água 🌊",
    description: 'Focando na técnica de virada olímpica.',
    likes: 1800,
    comments: 90,
    shares: 200,
    user: {
      id: 'u11',
      name: 'Phelps Shark',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=20',
      isFollowing: true,
    },
    music: { title: 'Believer', artist: 'Imagine Dragons' },
    modality: 'swimming',
  },
  // Boxing
  {
    id: 'boxing1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=boxing%20gloves%20ring&color=red',
    title: 'Sparring day 🥊',
    description: 'Afiando os reflexos e a esquiva.',
    likes: 2500,
    comments: 110,
    shares: 80,
    user: {
      id: 'u13',
      name: 'Rocky',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=22',
      isFollowing: true,
    },
    music: { title: 'Gonna Fly Now', artist: 'Bill Conti' },
    modality: 'boxing',
  },
  // Climbing
  {
    id: 'climbing1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=rock%20climbing%20mountain&color=gray',
    title: 'Escalada em rocha natural 🧗',
    description: 'Superando limites e o medo de altura.',
    likes: 3100,
    comments: 130,
    shares: 300,
    user: {
      id: 'u15',
      name: 'Alex Honnold',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=24',
      isFollowing: true,
    },
    music: { title: 'Higher', artist: 'Creed' },
    modality: 'climbing',
  },
  // Martial Arts
  {
    id: 'martial_arts1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://img.usecurling.com/p/600/1000?q=judo%20throw&color=white',
    title: 'Ippon perfeito! 🥋',
    description: 'A técnica supera a força bruta.',
    likes: 1900,
    comments: 70,
    shares: 90,
    user: {
      id: 'u17',
      name: 'Sensei Tanaka',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=26',
      isFollowing: true,
    },
    music: { title: 'Kung Fu Fighting', artist: 'Carl Douglas' },
    modality: 'martial_arts',
  },
]

export default function Move() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTribe, setActiveTribe] = useState('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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
              Não encontramos vídeos para esta modalidade. Tente selecionar
              outra tribo!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
