import {
  Home,
  Zap,
  Search,
  ShoppingBag,
  MessageSquare,
  Trophy,
  Briefcase,
  MapPin,
  Calendar,
  User,
  Activity,
  Car,
  Camera,
  Dumbbell,
  Stethoscope,
  Apple,
  Users,
} from 'lucide-react'

// Types
export interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  time: string
  likes: number
  replies?: Comment[]
}

export interface StatsHistoryPoint {
  date: string
  rating: number
  matches: number
}

export interface TrainingSuggestion {
  id: string
  title: string
  description: string
  difficulty: string
  reason: string
  exercises: { name: string; sets: number; reps: number }[]
}

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'challenge' | 'invite' | 'system' | 'like'
  date?: string
}

export interface NarrationConfig {
  hasNarration: boolean
  style:
    | 'varzea'
    | 'professional'
    | 'comedy'
    | 'futuristic'
    | 'influencer'
    | 'tactical'
    | 'emotion'
    | 'gringo'
  text: string
  volume: number
}

export interface ProfileData {
  id: string | number
  name: string
  username: string
  avatar: string
  cover: string
  bio: string
  location: string
  rating?: number
  followers?: string
  following?: string
  type: 'athlete' | 'photographer' | 'driver' | 'club' | 'coach'
  categories?: string[]
  portfolio?: string[]
  packages?: { title: string; price: string; description: string }[]
  portfolioProjects?: {
    id: string
    title: string
    date: string
    cover: string
    description: string
    images: string[]
  }[]
  car?: {
    model: string
    color: string
    plate: string
    photo: string
  }
  rides?: number
  responseTime?: string
  age?: number
  sport?: string
  position?: string
  height?: string
  weight?: string
}

export interface FinancialTransaction {
  id: string
  date: string
  type:
    | 'gain'
    | 'spend'
    | 'bonus'
    | 'payment'
    | 'invite'
    | 'marketing'
    | 'marketplace'
  description: string
  value: number
  currency: 'BRL' | 'PTS'
  status: 'confirmed' | 'pending' | 'expired'
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  pointsPrice: number
  image: string
  seller: string
  rating: number
  description: string
  images: string[]
  modality: string
  isPremium: boolean
  availability: 'in_stock' | 'low_stock' | 'out_of_stock'
}

export interface Event {
  id: string
  title: string
  category: string
  modality?: string
  level?: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Profissional'
  date: string
  time: string
  location: string
  address: string
  city?: string
  state?: string
  country?: string
  image: string
  price: number
  description: string
  organizer: string
  coordinates?: { x: number; y: number }
  weather?: { temp: number; condition: 'sunny' | 'cloudy' | 'rainy' | 'windy' }
}

export const navigationItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Zap, label: 'Move', path: '/move' },
  { icon: Search, label: 'Explorar', path: '/explore' },
  { icon: ShoppingBag, label: 'Loja', path: '/marketplace' },
  { icon: User, label: 'Perfil', path: '/profile/me' },
]

export const exploreCategories = [
  {
    id: 'talents',
    label: 'Scouts & Agentes',
    icon: Users,
    bg: 'bg-indigo-100 dark:bg-indigo-900/20',
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'events',
    label: 'Eventos',
    icon: Calendar,
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 'venues',
    label: 'Quadras',
    icon: MapPin,
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'photographers',
    label: 'Fotógrafos',
    icon: Camera,
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'drivers',
    label: 'Uber',
    icon: Car,
    bg: 'bg-green-100 dark:bg-green-900/20',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    id: 'gyms',
    label: 'Academias',
    icon: Dumbbell,
    bg: 'bg-red-100 dark:bg-red-900/20',
    color: 'text-red-600 dark:text-red-400',
  },
  {
    id: 'nutrition',
    label: 'Nutrição',
    icon: Apple,
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    id: 'clinics',
    label: 'Clínicas',
    icon: Stethoscope,
    bg: 'bg-cyan-100 dark:bg-cyan-900/20',
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    id: 'jobs',
    label: 'Vagas',
    icon: Briefcase,
    bg: 'bg-gray-100 dark:bg-zinc-800',
    color: 'text-gray-600 dark:text-zinc-400',
  },
]

export const photographerCategories = [
  'Esportes',
  'Retrato',
  'Eventos',
  'Produtos',
]

export const narrationStyles = [
  {
    id: 'varzea',
    name: 'Várzea Raiz',
    description: 'Gírias, humor e corneta',
    previewText: 'Olha esse chute, meu consagrado! Isolou na lua!',
  },
  {
    id: 'professional',
    name: 'TV Profissional',
    description: 'Sério, técnico e vibrante',
    previewText: 'Autoriza o árbitro, bola rolando no gramado!',
  },
  {
    id: 'comedy',
    name: 'Comediante',
    description: 'Piadas e deboche',
    previewText: 'Parece eu jogando depois do churrasco, que beleza!',
  },
  {
    id: 'futuristic',
    name: 'Cyberpunk',
    description: 'Robótico e analítico',
    previewText: 'Precisão calculada em 98%. Trajetória otimizada.',
  },
]

export const mockUser = {
  id: 'u1',
  name: 'Alex Silva',
  username: '@alexsilva',
  avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
  cover: 'https://img.usecurling.com/p/800/400?q=stadium&color=blue',
  role: 'Atleta Amador',
  points: 1250,
  level: 15,
  location: 'São Paulo, SP',
  bio: 'Apaixonado por esportes e superação.',
  followers: '1.2k',
  following: '450',
  type: 'athlete',
  age: 24,
  sport: 'Futebol',
  position: 'Meia-Atacante',
  height: '1.78m',
  weight: '74kg',
  stats: {
    matches: 42,
    wins: 28,
    mvp: 5,
  },
}

export const mockCurrentUser = mockUser

export const mockTalents: ProfileData[] = [
  {
    id: 't1',
    name: 'Lucas Ferreira',
    username: '@lucasf',
    type: 'athlete',
    age: 19,
    sport: 'Futebol',
    position: 'Atacante',
    height: '1.82m',
    weight: '78kg',
    rating: 4.8,
    location: 'Rio de Janeiro, RJ',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=30',
    cover: 'https://img.usecurling.com/p/800/400?q=soccer%20field&color=green',
    bio: 'Atacante rápido e finalizador. Busco oportunidade em clubes profissionais.',
    followers: '5.4k',
    stats: { matches: 50, wins: 35, mvp: 12 },
  },
  {
    id: 't2',
    name: 'Pedro Santos',
    username: '@pedrinho10',
    type: 'athlete',
    age: 16, // Underage
    sport: 'Futsal',
    position: 'Ala',
    height: '1.70m',
    weight: '62kg',
    rating: 4.9,
    location: 'São Paulo, SP',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=31',
    cover: 'https://img.usecurling.com/p/800/400?q=futsal%20court&color=blue',
    bio: 'Promessa do futsal paulista. Destaque sub-17.',
    followers: '2.1k',
    stats: { matches: 30, wins: 22, mvp: 8 },
  },
  {
    id: 't3',
    name: 'Matheus Oliveira',
    username: '@math_basket',
    type: 'athlete',
    age: 21,
    sport: 'Basquete',
    position: 'Armador',
    height: '1.92m',
    weight: '88kg',
    rating: 4.7,
    location: 'Franca, SP',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=32',
    cover:
      'https://img.usecurling.com/p/800/400?q=basketball%20court&color=orange',
    bio: 'Visão de jogo e arremesso de 3 pontos apurado.',
    followers: '3.2k',
    stats: { matches: 45, wins: 30, mvp: 6 },
  },
  {
    id: 't4',
    name: 'João Vitor',
    username: '@jv_volei',
    type: 'athlete',
    age: 17, // Underage
    sport: 'Vôlei',
    position: 'Ponteiro',
    height: '1.95m',
    weight: '85kg',
    rating: 4.6,
    location: 'Belo Horizonte, MG',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=33',
    cover:
      'https://img.usecurling.com/p/800/400?q=volleyball%20court&color=yellow',
    bio: 'Atleta de base do Minas Tênis Clube.',
    followers: '1.5k',
    stats: { matches: 25, wins: 18, mvp: 4 },
  },
]

export const mockStatsHistory: StatsHistoryPoint[] = [
  { date: 'Jan', rating: 3.5, matches: 10 },
  { date: 'Fev', rating: 3.8, matches: 12 },
  { date: 'Mar', rating: 4.0, matches: 8 },
  { date: 'Abr', rating: 4.2, matches: 15 },
  { date: 'Mai', rating: 4.1, matches: 11 },
  { date: 'Jun', rating: 4.5, matches: 18 },
]

export const mockComments: Comment[] = [
  {
    id: 'c1',
    user: {
      name: 'Lucas Paquetá',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
    },
    text: 'Jogou muito! 🔥',
    time: '2h',
    likes: 5,
  },
  {
    id: 'c2',
    user: {
      name: 'Richarlison',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=13',
    },
    text: 'Pombo neles! 🐦',
    time: '1h',
    likes: 8,
    replies: [
      {
        id: 'r1',
        user: {
          name: 'Alex Silva',
          avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
        },
        text: 'Tmj irmão!',
        time: '30m',
        likes: 2,
      },
    ],
  },
]

export const mockStories = [
  {
    id: 's1',
    user: {
      name: 'Neymar Jr',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=20',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=soccer%20training&color=blue',
    viewed: false,
    hasStory: true,
  },
  {
    id: 's2',
    user: {
      name: 'Anitta',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=21',
    },
    image: 'https://img.usecurling.com/p/400/800?q=gym%20workout&color=pink',
    viewed: true,
    hasStory: true,
  },
  {
    id: 's3',
    user: {
      name: 'Flamengo',
      avatar: 'https://img.usecurling.com/i?q=flamengo&color=red',
    },
    image: 'https://img.usecurling.com/p/400/800?q=stadium%20crowd&color=red',
    viewed: false,
    hasStory: true,
  },
  {
    id: 's4',
    user: {
      name: 'LeBron',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=22',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=basketball%20dunk&color=yellow',
    viewed: false,
    hasStory: true,
  },
]

export const mockPosts = [
  {
    id: 1,
    type: 'video',
    user: {
      id: 'u2',
      name: 'Flamengo Oficial',
      type: 'Clube',
      avatar: 'https://img.usecurling.com/i?q=flamengo&color=red',
    },
    time: '2h',
    title: 'Golaço do Mengão!',
    content:
      'Grande vitória hoje no Maracanã! Agradecemos o apoio da nação rubro-negra. #VamosFlamengo',
    media: [
      'https://img.usecurling.com/p/600/400?q=soccer%20stadium%20celebration&color=red',
    ],
    videoDuration: '0:45',
    hashtags: ['#futebol', '#flamengo', '#gol'],
    likes: 15420,
    comments: 342,
    shares: 120,
    applauds: 500,
    supports: 200,
    liked: true,
  },
  {
    id: 2,
    type: 'image',
    user: {
      id: 'u3',
      name: 'Gabriel Medina',
      type: 'Atleta Pro',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5',
    },
    time: '4h',
    content: 'Dia perfeito para o treino. Ondas gigantes em Nazaré! 🌊🏄‍♂️',
    media: [
      'https://img.usecurling.com/p/600/400?q=surfing%20big%20waves&color=blue',
    ],
    likes: 8540,
    comments: 120,
    shares: 45,
    applauds: 300,
    supports: 100,
    liked: false,
  },
  {
    id: 3,
    type: 'article',
    user: {
      id: 'u4',
      name: 'NBA Brasil',
      type: 'Liga',
      avatar: 'https://img.usecurling.com/i?q=nba&color=blue',
    },
    time: '6h',
    content: 'Lakers vence em jogo emocionante na prorrogação!',
    media: [
      'https://img.usecurling.com/p/600/400?q=basketball%20game&color=orange',
    ],
    articleTitle: 'LeBron James quebra mais um recorde histórico',
    articleDomain: 'nba.com',
    likes: 22100,
    comments: 890,
    shares: 2300,
    applauds: 1500,
    supports: 800,
    liked: false,
  },
]

export const mockVideos = [
  {
    id: 'v1',
    title: 'Como chutar com precisão',
    description: 'Técnicas avançadas de finalização',
    thumbnail:
      'https://img.usecurling.com/p/400/800?q=soccer%20kick&color=green',
    duration: '10:24',
    views: '120K',
    likes: '12K',
    comments: 340,
    shares: 500,
    user: {
      name: 'Escola de Futebol',
      avatar: 'https://img.usecurling.com/i?q=soccer&color=black',
    },
  },
  {
    id: 'v2',
    title: 'Treino Funcional Completo',
    description: 'Circuitos para alta performance',
    thumbnail:
      'https://img.usecurling.com/p/400/800?q=crossfit%20training&color=orange',
    duration: '45:00',
    views: '54K',
    likes: '5K',
    comments: 120,
    shares: 200,
    user: {
      name: 'Coach Pro',
      avatar: 'https://img.usecurling.com/i?q=dumbbell&color=red',
    },
  },
]

export const mockAiAnalysis = {
  score: 85,
  summary: 'Seu desempenho técnico melhorou 15% em relação à última sessão.',
  aiStats: [
    { label: 'Velocidade', value: 28, max: 35, unit: 'km/h' },
    { label: 'Potência', value: 850, max: 1000, unit: 'W' },
    { label: 'Precisão', value: 92, max: 100, unit: '%' },
  ],
  feedback:
    'Ótimo desempenho! Tente manter a postura mais ereta durante os sprints finais para otimizar a respiração e reduzir o cansaço.',
}

export const mockTrainingSuggestions: TrainingSuggestion[] = [
  {
    id: 't1',
    title: 'Melhoria de Explosão',
    description: 'Série focada em arranque e velocidade curta.',
    difficulty: 'Avançado',
    reason: 'Baixa aceleração detectada',
    exercises: [
      { name: 'Box Jumps', sets: 4, reps: 10 },
      { name: 'Sprints 20m', sets: 6, reps: 1 },
    ],
  },
  {
    id: 't2',
    title: 'Estabilidade de Core',
    description: 'Fortalecimento abdominal para melhor equilíbrio.',
    difficulty: 'Intermediário',
    reason: 'Desequilíbrio em mudanças de direção',
    exercises: [
      { name: 'Prancha Frontal', sets: 3, reps: 60 },
      { name: 'Russian Twist', sets: 3, reps: 20 },
    ],
  },
]

export const mockRideRequests = [
  {
    id: '1',
    passenger: {
      name: 'Julia Lima',
      rating: 4.9,
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
      trips: 142,
    },
    pickup: { address: 'Arena Goplay', distance: '0.5 km' },
    dropoff: { address: 'Rua das Palmeiras, 450', distance: '4.2 km' },
    fare: 24.5,
    time: '12 min',
    status: 'pending',
  },
]

export const mockRewards = [
  {
    id: '1',
    title: 'Vale Combustível',
    description: 'R$ 50,00 em créditos na rede Shell',
    points: 1500,
    image: 'https://img.usecurling.com/i?q=fuel&color=orange',
    claimed: false,
  },
]

export const mockRideHistory = [
  {
    id: 'h1',
    date: 'Hoje, 14:30',
    passenger: 'Fernanda Costa',
    pickup: 'Av. Paulista, 1000',
    dropoff: 'Aeroporto Congonhas',
    price: 45.0,
    status: 'completed',
    rating: 5,
  },
]

export const mockRankings = [
  {
    id: '1',
    position: 1,
    user: {
      name: 'Gabriel Medina',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5',
      team: 'Surf Pro',
    },
    points: 15400,
    trend: 'up',
  },
  {
    id: '2',
    position: 2,
    user: {
      name: 'Rayssa Leal',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=6',
      team: 'Skate Street',
    },
    points: 14200,
    trend: 'same',
  },
]

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Campeonato Paulista de Futsal',
    category: 'Competição',
    modality: 'Futsal',
    level: 'Avançado',
    date: '24 Out',
    time: '14:00',
    location: 'Ginásio do Ibirapuera',
    address: 'Rua Manoel da Nóbrega, 1361',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    image: 'https://img.usecurling.com/p/400/300?q=futsal%20match&color=blue',
    price: 50.0,
    description: 'Grande final do campeonato estadual.',
    organizer: 'Federação Paulista',
    coordinates: { x: 55, y: 40 },
    weather: { temp: 24, condition: 'cloudy' },
  },
  {
    id: 'e2',
    title: 'Maratona de São Paulo',
    category: 'Corrida',
    modality: 'Corrida',
    level: 'Intermediário',
    date: '15 Nov',
    time: '06:00',
    location: 'Obelisco',
    address: 'Av. Pedro Álvares Cabral',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    image:
      'https://img.usecurling.com/p/400/300?q=marathon%20runners&color=orange',
    price: 120.0,
    description: '42km pelas ruas de SP.',
    organizer: 'Yescom',
    coordinates: { x: 48, y: 65 },
    weather: { temp: 18, condition: 'sunny' },
  },
  {
    id: 'e3',
    title: 'Passeio Ciclístico Noturno',
    category: 'Lazer',
    modality: 'Bike',
    level: 'Iniciante',
    date: '20 Nov',
    time: '19:30',
    location: 'Praça do Ciclista',
    address: 'Av. Paulista, 2000',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    image:
      'https://img.usecurling.com/p/400/300?q=night%20cycling&color=purple',
    price: 0.0,
    description: 'Pedalada leve pela cidade.',
    organizer: 'Bike SP',
    coordinates: { x: 52, y: 48 },
    weather: { temp: 21, condition: 'windy' },
  },
  {
    id: 'e4',
    title: 'Workshop de Escalada',
    category: 'Treino',
    modality: 'Escalada',
    level: 'Iniciante',
    date: '22 Nov',
    time: '09:00',
    location: 'Casa de Pedra',
    address: 'Rua Venâncio Aires, 31',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    image:
      'https://img.usecurling.com/p/400/300?q=climbing%20wall&color=yellow',
    price: 80.0,
    description: 'Aprenda técnicas básicas de escalada indoor.',
    organizer: 'Climb BR',
    coordinates: { x: 30, y: 35 },
    weather: { temp: 26, condition: 'sunny' },
  },
  {
    id: 'e5',
    title: 'Trilha Pedra Grande',
    category: 'Aventura',
    modality: 'Trilha',
    level: 'Intermediário',
    date: '28 Nov',
    time: '07:00',
    location: 'Parque da Cantareira',
    address: 'Rua do Horto, 1799',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    image: 'https://img.usecurling.com/p/400/300?q=hiking%20trail&color=green',
    price: 25.0,
    description: 'Subida até a Pedra Grande com guia.',
    organizer: 'EcoTrilhas',
    coordinates: { x: 45, y: 20 },
    weather: { temp: 22, condition: 'rainy' },
  },
  {
    id: 'e6',
    title: 'Montanhismo Serra Fina',
    category: 'Expedição',
    modality: 'Montanhismo',
    level: 'Profissional',
    date: '05 Dez',
    time: '05:00',
    location: 'Serra da Mantiqueira',
    address: 'Passa Quatro',
    city: 'Minas Gerais',
    state: 'MG',
    country: 'Brasil',
    image: 'https://img.usecurling.com/p/400/300?q=mountains&color=gray',
    price: 450.0,
    description: 'Travessia completa da Serra Fina.',
    organizer: 'Montanha Club',
    coordinates: { x: 80, y: 15 },
    weather: { temp: 15, condition: 'windy' },
  },
]

export const mockVenues = [
  {
    id: 'v1',
    name: 'Arena Play',
    type: 'Quadra Poliesportiva',
    rating: 4.8,
    reviews: 124,
    distance: '2.5 km',
    location: 'Vila Olímpia',
    address: 'Rua Beira Rio, 120',
    image: 'https://img.usecurling.com/p/400/300?q=indoor%20court&color=blue',
    img: 'indoor%20court',
    price: 'R$ 150/h',
    amenities: ['Vestiário', 'Bar', 'Estacionamento', 'Wi-Fi'],
    description: 'Quadra oficial com piso flutuante e iluminação LED.',
  },
  {
    id: 'v2',
    name: 'Campo do Sol',
    type: 'Campo Society',
    rating: 4.5,
    reviews: 89,
    distance: '5.0 km',
    location: 'Pinheiros',
    address: 'Av. das Nações, 500',
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20field&color=green',
    img: 'soccer%20field',
    price: 'R$ 200/h',
    amenities: ['Churrasqueira', 'Bar'],
    description: 'Campo society com grama sintética de última geração.',
  },
]

export const mockGyms = [
  {
    id: 'g1',
    name: 'Ironberg CT',
    type: 'Musculação',
    rating: 4.9,
    distance: '1.0 km',
    image: 'https://img.usecurling.com/p/400/300?q=gym%20weights&color=black',
    address: 'Rua dos Marombas, 100',
    price: 'R$ 150/mês',
  },
]

export const mockNutrition = [
  {
    id: 'n1',
    name: 'Dr. Paulo Muzy',
    specialty: 'Nutrologia Esportiva',
    rating: 5.0,
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=9',
    address: 'Av. Brasil, 2000',
    price: 'R$ 800/consulta',
  },
]

export const mockHortifrutis = [
  {
    id: 'h1',
    name: 'Hortifruti Natural da Terra',
    rating: 4.8,
    image:
      'https://img.usecurling.com/p/400/300?q=fresh%20fruits%20vegetables&color=green',
    address: 'Av. das Frutas, 123',
    price: 'R$ 150,00',
    description:
      'A melhor seleção de frutas, verduras e legumes frescos para sua dieta.',
    specialty: 'Produtos Orgânicos',
  },
  {
    id: 'h2',
    name: 'Oba Hortifruti',
    rating: 4.7,
    image:
      'https://img.usecurling.com/p/400/300?q=vegetables%20market&color=orange',
    address: 'Rua do Pomar, 450',
    price: 'R$ 120,00',
    description: 'Qualidade e frescor garantidos todos os dias.',
    specialty: 'Frutas Exóticas',
  },
]

export const mockClinics = [
  {
    id: 'c1',
    name: 'FisioSport',
    specialty: 'Fisioterapia',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy&color=cyan',
    address: 'Rua da Saúde, 50',
    price: 'R$ 200/sessão',
  },
]

export const mockDrivers: ProfileData[] = [
  {
    id: 'd1',
    name: 'João Motorista',
    username: '@joaodriver',
    type: 'driver',
    rating: 4.9,
    car: {
      model: 'Honda Civic',
      color: 'Prata',
      plate: 'ABC-1234',
      photo: 'https://img.usecurling.com/p/300/200?q=honda%20civic&color=gray',
    },
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
    cover: 'https://img.usecurling.com/p/800/400?q=road&color=gray',
    location: 'São Paulo, SP',
    bio: 'Motorista 5 estrelas. Conforto e segurança.',
    rides: 1250,
    responseTime: '2 min',
  },
]

export const mockPhotographers: ProfileData[] = [
  {
    id: 'p1',
    name: 'Ana Click',
    username: '@anaclick',
    type: 'photographer',
    rating: 4.9,
    categories: ['Esportes', 'Eventos'],
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=11',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=11',
    cover: 'https://img.usecurling.com/p/800/400?q=camera%20lens&color=black',
    location: 'Rio de Janeiro, RJ',
    bio: 'Especialista em capturar a emoção do esporte.',
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=soccer%20action&seed=1',
      'https://img.usecurling.com/p/300/300?q=basketball%20jump&seed=2',
      'https://img.usecurling.com/p/300/300?q=swimming&seed=3',
    ],
    packages: [
      {
        title: 'Cobertura de Jogo',
        price: 'R$ 300',
        description: 'Fotos digitais em alta resolução.',
      },
    ],
    portfolioProjects: [
      {
        id: 'proj1',
        title: 'Final do Estadual',
        date: '2023',
        cover:
          'https://img.usecurling.com/p/600/400?q=soccer%20final&color=green',
        description: 'Cobertura completa da final.',
        images: [
          'https://img.usecurling.com/p/300/300?q=soccer&seed=4',
          'https://img.usecurling.com/p/300/300?q=trophy&seed=5',
        ],
      },
    ],
  },
]

export const mockProfiles: ProfileData[] = [
  ...mockPhotographers,
  ...mockDrivers,
  ...mockTalents,
  {
    id: 'u1',
    name: 'Alex Silva',
    username: '@alexsilva',
    type: 'athlete',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
    cover: 'https://img.usecurling.com/p/800/400?q=stadium&color=blue',
    bio: 'Atleta amador.',
    location: 'São Paulo, SP',
    rating: 4.5,
  },
]

export const mockJobs = [
  {
    id: 'j1',
    title: 'Treinador de Goleiros',
    company: 'São Paulo FC',
    location: 'São Paulo, SP',
    salary: 'R$ 5.000 - R$ 7.000',
    type: 'Full-time',
    posted: '2 dias atrás',
    image: 'https://img.usecurling.com/i?q=spfc&color=red',
    description: 'Procuramos treinador experiente para base.',
  },
]

export const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Chuteira Nike Mercurial',
    category: 'Calçados',
    price: 499.9,
    pointsPrice: 5000,
    image:
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats&color=orange',
    seller: 'Loja Oficial',
    rating: 4.8,
    description:
      'Chuteira de alta performance para velocidade, com travas estratégicas e material leve para melhor desempenho em campo.',
    images: [
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats&color=orange',
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats%20side&color=orange',
    ],
    modality: 'Futebol',
    isPremium: true,
    availability: 'in_stock',
  },
  {
    id: 'prod2',
    name: 'Bola Oficial Champions',
    category: 'Equipamentos',
    price: 199.9,
    pointsPrice: 2000,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball&color=white',
    seller: 'Adidas Store',
    rating: 5.0,
    description:
      'Bola oficial da competição, com tecnologia de voo preciso e durabilidade superior.',
    images: [
      'https://img.usecurling.com/p/300/300?q=soccer%20ball&color=white',
    ],
    modality: 'Futebol',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: 'prod3',
    name: 'Camisa Lakers LeBron',
    category: 'Vestuário',
    price: 349.9,
    pointsPrice: 3500,
    image:
      'https://img.usecurling.com/p/300/300?q=basketball%20jersey&color=yellow',
    seller: 'NBA Store',
    rating: 4.9,
    description:
      'Jersey oficial do Lakers, edição limitada. Tecido respirável e acabamento premium.',
    images: [
      'https://img.usecurling.com/p/300/300?q=basketball%20jersey&color=yellow',
    ],
    modality: 'Basquete',
    isPremium: true,
    availability: 'low_stock',
  },
  {
    id: 'prod4',
    name: 'Whey Protein Gold',
    category: 'Suplementos',
    price: 249.9,
    pointsPrice: 2500,
    image: 'https://img.usecurling.com/p/300/300?q=whey%20protein&color=black',
    seller: 'Growth Supplements',
    rating: 4.7,
    description:
      'Proteína isolada para recuperação muscular rápida. Sabor chocolate.',
    images: [
      'https://img.usecurling.com/p/300/300?q=whey%20protein&color=black',
    ],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: 'not1',
    title: 'Novo desafio disponível',
    message: 'Participe do desafio de 5km hoje!',
    time: '2h atrás',
    read: false,
    type: 'challenge',
    date: 'Hoje',
  },
  {
    id: 'not2',
    title: 'Convite de jogo',
    message: 'O time Eagles te convidou para uma partida.',
    time: '5h atrás',
    read: true,
    type: 'invite',
    date: 'Hoje',
  },
]

export const mockNotificationsList = mockNotifications

export const mockChats = [
  {
    id: 'chat1',
    user: {
      name: 'Lucas Paquetá',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
      online: true,
    },
    lastMessage: 'Vamos fechar o time para domingo?',
    time: '10:30',
    unread: 2,
    messages: [
      { id: 'm1', text: 'E aí, tudo certo?', sender: 'them', time: '10:00' },
      { id: 'm2', text: 'Tudo sim, e contigo?', sender: 'me', time: '10:05' },
      {
        id: 'm3',
        text: 'Vamos fechar o time para domingo?',
        sender: 'them',
        time: '10:30',
      },
    ],
  },
]

export const mockPointsHistory = [
  {
    id: 'ph1',
    title: 'Vitória na Partida',
    date: 'Hoje, 10:00',
    points: 100,
    type: 'earned',
  },
  {
    id: 'ph2',
    title: 'Desconto em Equipamento',
    date: 'Ontem',
    points: -500,
    type: 'spent',
  },
]

export const mockFinancialSummary = {
  balance: 1250.0,
  totalSpent: 450.5,
  pointsBalance: 12500,
  pointsEarned: 35000,
  conversionRate: '1000 pts = R$ 10,00',
  marketplaceStatus: 'Liberado',
}

export const mockFinancialHistory: FinancialTransaction[] = [
  {
    id: 't1',
    date: 'Hoje, 14:30',
    type: 'payment',
    description: 'Pagamento de Mensalidade',
    value: -150.0,
    currency: 'BRL',
    status: 'confirmed',
  },
  {
    id: 't2',
    date: 'Ontem, 10:00',
    type: 'bonus',
    description: 'Bônus de Vitória MVP',
    value: 500,
    currency: 'PTS',
    status: 'confirmed',
  },
  {
    id: 't3',
    date: '20 Out, 18:00',
    type: 'marketplace',
    description: 'Compra Chuteira Nike',
    value: -450.0,
    currency: 'BRL',
    status: 'confirmed',
  },
  {
    id: 't4',
    date: '19 Out, 09:00',
    type: 'invite',
    description: 'Indicação de Amigo',
    value: 200,
    currency: 'PTS',
    status: 'pending',
  },
  {
    id: 't5',
    date: '15 Out, 11:20',
    type: 'marketing',
    description: 'Campanha Adidas',
    value: 1500,
    currency: 'PTS',
    status: 'expired',
  },
  {
    id: 't6',
    date: '10 Out, 10:00',
    type: 'gain',
    description: 'Depósito via PIX',
    value: 1000.0,
    currency: 'BRL',
    status: 'confirmed',
  },
  {
    id: 't7',
    date: '05 Out, 14:00',
    type: 'spend',
    description: 'Aluguel de Quadra',
    value: -120.0,
    currency: 'BRL',
    status: 'confirmed',
  },
]
