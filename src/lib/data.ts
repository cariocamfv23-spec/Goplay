import {
  ChartSpline,
  Store,
  Briefcase,
  Video,
  Home,
  Car,
  Camera,
} from 'lucide-react'

export const navigationItems = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'MOVE', icon: Video, path: '/move' },
  { label: 'Explorar', icon: ChartSpline, path: '/explore' },
  { label: 'Loja', icon: Store, path: '/marketplace' },
  { label: 'Vagas', icon: Briefcase, path: '/jobs' },
]

export const mockStories = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  avatar: `https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? 'male' : 'female'}&seed=${i}`,
  hasStory: i < 5,
}))

export interface Comment {
  id: number
  user: { name: string; avatar: string }
  text: string
  time: string
  likes: number
  replies?: Comment[]
}

export const mockComments: Comment[] = [
  {
    id: 1,
    user: {
      name: 'Pedro Santos',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=33',
    },
    text: 'Que jogada incrível! 👏👏',
    time: '10 min',
    likes: 5,
    replies: [
      {
        id: 11,
        user: {
          name: 'Carlos Silva',
          avatar:
            'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
        },
        text: 'Valeu Pedro! Estamos treinando forte.',
        time: '5 min',
        likes: 2,
      },
    ],
  },
]

export const mockPosts = [
  {
    id: 1,
    type: 'image',
    user: {
      id: '1',
      name: 'Lucas Oliveira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
      type: 'Atleta',
    },
    content: 'Treino intenso hoje! Preparando para o campeonato regional. ⚽🔥',
    media: ['https://img.usecurling.com/p/600/400?q=soccer%20training'],
    likes: 124,
    comments: 18,
    shares: 5,
    applauds: 45,
    supports: 12,
    time: '2h',
  },
  {
    id: 2,
    type: 'video',
    user: {
      id: '2',
      name: 'Clube Atlético',
      avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
      type: 'Clube',
    },
    title: 'Golaço do Sub-17',
    hashtags: ['#futebol', '#base', '#golaço'],
    content: 'Olha o que rolou no treino de hoje! A base vem forte.',
    media: ['https://img.usecurling.com/p/600/400?q=soccer%20goal'],
    videoDuration: '0:20',
    likes: 450,
    comments: 89,
    shares: 120,
    applauds: 300,
    supports: 50,
    time: '4h',
  },
]

export const mockVideos = [
  {
    id: 1,
    user: 'mariagomes_voley',
    description: 'Aquele saque perfeito! 🏐 #volei #ace',
    thumbnail: 'https://img.usecurling.com/p/300/600?q=volleyball%20serve',
    likes: '1.2k',
    shares: '340',
    aiAction: 'Saque Ace detectado',
  },
  {
    id: 2,
    user: 'joaobasket_10',
    description: 'Buzzer beater de ontem! 🏀🏀🏀',
    thumbnail: 'https://img.usecurling.com/p/300/600?q=basketball%20dunk',
    likes: '5.6k',
    shares: '1.1k',
    aiAction: 'Cesta de 3 pontos',
  },
]

export const mockEvents = [
  {
    id: '1',
    title: 'Copa Regional de Futsal',
    date: '15 Ago',
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/p/400/200?q=futsal%20court',
    organizer: 'Liga SP',
    price: 'R$ 50,00',
    description:
      'Participe da maior copa regional de futsal amador de São Paulo.',
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Treinador Sub-15',
    company: 'Clube Atlético',
    location: 'São Paulo, SP',
    type: 'Presencial',
    description: 'Procuramos treinador com experiência em categorias de base.',
    requirements: ['Licença C CBF', 'Experiência prévia'],
    salary: 'A combinar',
  },
]

export const mockProducts = [
  {
    id: 1,
    name: 'Chuteira Pro Nike',
    price: 'R$ 450,00',
    rating: 4.8,
    img: 'soccer%20cleats',
    description: 'Chuteira profissional para campo.',
    category: 'Equipamentos',
  },
  {
    id: 2,
    name: 'Bola Oficial',
    price: 'R$ 120,00',
    rating: 4.5,
    img: 'soccer%20ball',
    description: 'Bola oficial de competição.',
    category: 'Equipamentos',
  },
]

export const mockCourts = [
  {
    id: 1,
    name: 'Arena Futsal Centro',
    price: 'R$ 150/h',
    rating: 4.9,
    img: 'futsal%20court',
    lat: -23.5505,
    lng: -46.6333,
  },
  {
    id: 2,
    name: 'Quadra Society 10',
    price: 'R$ 200/h',
    rating: 4.6,
    img: 'soccer%20field',
    lat: -23.5605,
    lng: -46.6433,
  },
]

export interface BadgeData {
  id: string
  name: string
  icon: string
  color: string
}

export interface ProfileData {
  id: string
  type: 'athlete' | 'club' | 'coach' | 'photographer' | 'driver'
  name: string
  username: string
  avatar: string
  cover: string
  bio: string
  location: string
  followers: string
  following: string
  rating: number

  // Athlete specific
  position?: string
  sport?: string
  stats?: { label: string; value: string }[]
  history?: { year: string; team: string; description: string }[]
  badges?: BadgeData[]
  points?: number
  rank?: number

  // Club specific
  about?: string
  address?: string
  jobs?: { id: number; title: string; type: string }[]
  events?: { id: number; title: string; date: string }[]

  // Coach specific
  specialties?: string[]
  certifications?: string[]
  pricing?: string
  availability?: string[]

  // Photographer specific
  portfolio?: string[]
  packages?: { title: string; price: string; description: string }[]

  // Driver specific
  car?: { model: string; plate: string; color: string; photo: string }
  rides?: number
}

export const mockBadges: BadgeData[] = [
  { id: '1', name: 'Artilheiro', icon: 'Target', color: 'text-red-500' },
  { id: '2', name: 'MVP', icon: 'Trophy', color: 'text-yellow-500' },
  { id: '3', name: 'Líder', icon: 'Flag', color: 'text-blue-500' },
]

export const mockProfiles: ProfileData[] = [
  {
    id: '1',
    type: 'athlete',
    name: 'Lucas Oliveira',
    username: '@lucas.gol',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    cover: 'https://img.usecurling.com/p/800/300?q=soccer%20field',
    bio: 'Atleta de Futebol | Meia-atacante focado em alta performance.',
    location: 'São Paulo, SP',
    followers: '1.2k',
    following: '450',
    rating: 4.8,
    sport: 'Futebol',
    position: 'Meia-Atacante',
    points: 1250,
    rank: 12,
    badges: [mockBadges[0], mockBadges[1]],
    stats: [
      { label: 'Jogos', value: '89' },
      { label: 'Gols', value: '34' },
    ],
    history: [
      {
        year: '2023',
        team: 'São Paulo FC Base',
        description: 'Campeão Sub-17',
      },
    ],
  },
  {
    id: '2',
    type: 'club',
    name: 'Clube Atlético',
    username: '@atleticocentral',
    avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
    cover: 'https://img.usecurling.com/p/800/300?q=stadium',
    bio: 'Formando campeões desde 1990.',
    location: 'Rio de Janeiro, RJ',
    followers: '5.6k',
    following: '120',
    rating: 4.9,
    about: 'O Clube Atlético Central é referência na formação.',
    address: 'Av. das Américas, 5000',
    jobs: [{ id: 1, title: 'Treinador Sub-15', type: 'Presencial' }],
    events: [{ id: 1, title: 'Peneira Sub-17', date: '15 Ago' }],
  },
  {
    id: '3',
    type: 'coach',
    name: 'Roberto Mendes',
    username: '@beto.coach',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
    cover: 'https://img.usecurling.com/p/800/300?q=tactics%20board',
    bio: 'Treinador Licença B CBF.',
    location: 'Belo Horizonte, MG',
    followers: '3.1k',
    following: '890',
    rating: 4.7,
    specialties: ['Futebol', 'Tática'],
    certifications: ['Licença B CBF'],
    pricing: 'R$ 150,00 / hora',
    availability: ['Segunda - 14h'],
  },
  {
    id: '4',
    type: 'photographer',
    name: 'Ana Foto',
    username: '@ana.clicks',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22',
    cover: 'https://img.usecurling.com/p/800/300?q=camera%20lens',
    bio: 'Fotógrafa esportiva profissional. Eternizando momentos.',
    location: 'Curitiba, PR',
    followers: '2.5k',
    following: '300',
    rating: 4.9,
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=sports%20photo%201',
      'https://img.usecurling.com/p/300/300?q=sports%20photo%202',
    ],
    packages: [
      {
        title: 'Cobertura de Jogo',
        price: 'R$ 200,00',
        description: '50 fotos editadas do seu jogo.',
      },
      {
        title: 'Ensaio Individual',
        price: 'R$ 350,00',
        description: 'Sessão de 2h em estúdio ou campo.',
      },
    ],
  },
  {
    id: '5',
    type: 'driver',
    name: 'Carlos Driver',
    username: '@carlos.uber',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=55',
    cover: 'https://img.usecurling.com/p/800/300?q=car%20dashboard',
    bio: 'Motorista parceiro Goplay. Transporte seguro para seu equipamento.',
    location: 'São Paulo, SP',
    followers: '150',
    following: '20',
    rating: 4.8,
    rides: 1240,
    car: {
      model: 'Honda Civic',
      plate: 'ABC-1234',
      color: 'Prata',
      photo: 'https://img.usecurling.com/p/300/200?q=silver%20honda%20civic',
    },
  },
]

export const mockRankings = [
  {
    id: '1',
    name: 'Lucas Oliveira',
    points: 1250,
    rank: 1,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
  },
  {
    id: '4',
    name: 'Ana Silva',
    points: 1100,
    rank: 2,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
  },
  {
    id: '5',
    name: 'Pedro Santos',
    points: 950,
    rank: 3,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=33',
  },
  {
    id: '6',
    name: 'Carla Dias',
    points: 880,
    rank: 4,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
  },
]

export const mockTransactions = [
  {
    id: 1,
    type: 'received',
    title: 'Pagamento recebido',
    amount: 'R$ 150,00',
    date: 'Hoje, 10:30',
  },
]

export interface ChatMessage {
  id: string
  senderId: string
  text?: string
  type: 'text' | 'image' | 'video' | 'audio' | 'document'
  mediaUrl?: string
  fileName?: string
  timestamp: string
  isMe: boolean
}

export interface Chat {
  id: string
  name: string
  avatar: string
  type: 'direct' | 'group' | 'event' | 'job'
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online?: boolean
}

export const mockChats: Chat[] = [
  {
    id: 'user-2',
    name: 'Clube Atlético',
    avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
    type: 'direct',
    lastMessage: 'Quando podemos agendar?',
    lastMessageTime: '10:30',
    unreadCount: 2,
    online: true,
  },
  {
    id: 'group-1',
    name: 'Pelada de Quinta',
    avatar:
      'https://img.usecurling.com/i?q=soccer%20ball&shape=fill&color=green',
    type: 'group',
    lastMessage: 'João: Quem vai?',
    lastMessageTime: '09:15',
    unreadCount: 5,
  },
]

export const getMockMessages = (chatId: string): ChatMessage[] => {
  return [
    {
      id: '1',
      senderId: 'them',
      text: 'Olá! Tudo bem?',
      type: 'text',
      timestamp: '10:00',
      isMe: false,
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Tudo ótimo!',
      type: 'text',
      timestamp: '10:02',
      isMe: true,
    },
  ]
}
