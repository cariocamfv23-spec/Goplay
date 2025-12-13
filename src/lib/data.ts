import {
  CreditCard,
  Wallet,
  Star,
  Trophy,
  Users,
  MapPin,
  Video,
  CheckCircle,
  Plus,
  Home,
  Compass,
  ShoppingBag,
  MessageCircle,
  Briefcase,
  Camera,
  Calendar,
  Dumbbell,
  Utensils,
  Stethoscope,
  Car,
} from 'lucide-react'

// Navigation Items
export const navigationItems = [
  { icon: Home, label: 'Início', path: '/home' },
  { icon: Video, label: 'Move', path: '/move' },
  { icon: Compass, label: 'Explorar', path: '/explore' },
  { icon: ShoppingBag, label: 'Loja', path: '/marketplace' },
  { icon: MessageCircle, label: 'Msgs', path: '/messages' },
]

// Types
export interface Comment {
  id: number
  user: {
    name: string
    avatar: string
  }
  text: string
  time: string
  likes: number
  replies?: Comment[]
}

export interface NarrationConfig {
  text: string
  style:
    | 'varzea'
    | 'professional'
    | 'comedy'
    | 'futuristic'
    | 'influencer'
    | 'tactical'
    | 'emotion'
    | 'gringo'
  volume: number
}

export const narrationStyles = [
  {
    id: 'varzea',
    label: 'Várzea',
    description: 'Narrador clássico de futebol de várzea',
    previewText: 'Olha o que ele fez! Que ousadia, que alegria!',
    name: 'Várzea Clássico',
  },
  {
    id: 'professional',
    label: 'Profissional',
    description: 'Estilo TV Globo / Premiere',
    previewText: 'Autoriza o árbitro, rola a bola!',
    name: 'Profissional',
  },
  {
    id: 'comedy',
    label: 'Comédia',
    description: 'Humor e piadas durante o lance',
    previewText: 'Rapaz, esse aí tropeçou na própria sombra!',
    name: 'Comédia',
  },
  {
    id: 'futuristic',
    label: 'Futurista',
    description: 'Voz robótica e efeitos sci-fi',
    previewText: 'Análise concluída. Probabilidade de gol: 99%.',
    name: 'Cyber Sport',
  },
  {
    id: 'influencer',
    label: 'Influencer',
    description: 'Gírias de internet e hype',
    previewText: 'Mano do céu! Isso foi muito brabo! Hype total!',
    name: 'Influencer',
  },
  {
    id: 'tactical',
    label: 'Tático',
    description: 'Análise técnica e séria',
    previewText: 'Observe o posicionamento corporal perfeito para o chute.',
    name: 'Analista Tático',
  },
  {
    id: 'emotion',
    label: 'Emoção',
    description: 'Foco no drama e superação',
    previewText: 'Ele não desistiu! Lutou até o fim e conseguiu!',
    name: 'Emocionante',
  },
  {
    id: 'gringo',
    label: 'Gringo',
    description: 'Sotaque estrangeiro tentando falar PT',
    previewText: 'Oh my god! This is futebol brasileiro! Amazing!',
    name: 'The Gringo',
  },
]

export interface StatsHistoryPoint {
  date: string
  rating: number
}

export interface TrainingSuggestion {
  id: string
  title: string
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  reason: string
  description: string
  exercises: { name: string; sets: number; reps: number }[]
}

export interface ProfileData {
  id: number | string
  name: string
  username?: string
  avatar: string
  cover?: string
  role?: string
  type?: 'athlete' | 'photographer' | 'driver' | 'recruiter' | 'venue'
  location?: string
  rating?: number
  reviews?: number
  bio?: string
  stats?: any
  portfolio?: string[]
  portfolioProjects?: {
    id: number
    title: string
    date: string
    cover: string
    description: string
    images: string[]
  }[]
  packages?: {
    title: string
    price: string
    description: string
  }[]
  categories?: string[]
  car?: {
    model: string
    color: string
    plate: string
    photo: string
  }
  rides?: number
  responseTime?: string
  followers?: number
  following?: number
  level?: number
}

// User Data
export const mockCurrentUser = {
  id: 'me',
  name: 'João Silva',
  username: '@joaosilva',
  avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
  cover: 'https://img.usecurling.com/p/800/300?q=stadium%20lights&color=black',
  level: 12,
  location: 'São Paulo, SP',
  walletBalance: 1250.5,
  role: 'Atleta Amador',
  bio: 'Apaixonado por futebol e focado em evoluir a cada jogo. ⚽️🚀',
  followers: 1240,
  following: 350,
  stats: {
    matches: 42,
    goals: 15,
    assists: 8,
    mvp: 3,
  },
}

// Stories
export const mockStories = [
  {
    id: 1,
    name: 'Ana B.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    hasStory: true,
  },
  {
    id: 2,
    name: 'Pedro S.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    hasStory: true,
  },
  {
    id: 3,
    name: 'Arena X',
    avatar: 'https://img.usecurling.com/i?q=stadium&shape=fill',
    hasStory: true,
  },
  {
    id: 4,
    name: 'Coach T.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
    hasStory: false,
  },
  {
    id: 5,
    name: 'Julia M.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4',
    hasStory: false,
  },
]

// Posts
export const mockPosts = [
  {
    id: 1,
    type: 'image',
    user: {
      id: 'user1',
      name: 'Carlos Oliveira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
      type: 'Atleta',
      location: 'Arena Central',
    },
    image: 'https://img.usecurling.com/p/600/600?q=soccer%20match',
    media: ['https://img.usecurling.com/p/600/600?q=soccer%20match'],
    content: 'Grande jogo hoje! Vitória de 5x3 com a galera. ⚽🔥',
    likes: 124,
    comments: 18,
    shares: 5,
    applauds: 10,
    supports: 2,
    cools: 15,
    time: '2h',
    liked: true,
    hashtags: ['#futebol', '#amador', '#vitoria'],
  },
  {
    id: 2,
    type: 'image',
    user: {
      id: 'user2',
      name: 'Marina Santos',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=5',
      type: 'Atleta',
      location: 'Academia Power',
    },
    image: 'https://img.usecurling.com/p/600/600?q=gym%20workout',
    media: ['https://img.usecurling.com/p/600/600?q=gym%20workout'],
    content: 'Foco no treino de pernas hoje. #nopainnogain 💪',
    likes: 89,
    comments: 5,
    shares: 1,
    applauds: 20,
    supports: 5,
    cools: 8,
    time: '4h',
    liked: false,
    hashtags: ['#gym', '#fitness', '#legday'],
  },
  {
    id: 3,
    type: 'video',
    user: {
      id: 'user3',
      name: 'Lucas Pereira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=8',
      type: 'Criador',
    },
    media: ['https://img.usecurling.com/p/600/600?q=soccer%20skill'],
    title: 'Aquele drible que você respeita!',
    videoDuration: '0:15',
    likes: 342,
    comments: 45,
    shares: 12,
    applauds: 50,
    supports: 8,
    cools: 120,
    time: '6h',
    hashtags: ['#skill', '#drible', '#futebolarte'],
    narration: {
      text: 'Olha o que ele fez! Que ousadia, que alegria! Isso é futebol arte, meu amigo!',
      style: 'varzea',
      volume: 1,
    } as NarrationConfig,
  },
]

// Comments
export const mockComments: Comment[] = [
  {
    id: 1,
    user: {
      name: 'Pedro Costa',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=20',
    },
    text: 'Jogou muito hoje, craque! 👏',
    time: '1h',
    likes: 5,
    replies: [
      {
        id: 11,
        user: {
          name: 'Carlos Oliveira',
          avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
        },
        text: 'Valeu mano! Tamo junto 👊',
        time: '50min',
        likes: 2,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: 'Julia Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=21',
    },
    text: 'Aulas! 🔥',
    time: '30min',
    likes: 3,
  },
]

// Videos (Reels/Move)
export const mockVideos = [
  {
    id: 1,
    thumbnail: 'https://img.usecurling.com/p/400/800?q=soccer%20skills',
    title: 'Drible desconcertante! 😱',
    description: 'Aprenda esse movimento para passar por qualquer defesa.',
    user: {
      name: 'Futebol Art',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=6',
    },
    likes: '12k',
    comments: 342,
    shares: '1.2k',
  },
  {
    id: 2,
    thumbnail: 'https://img.usecurling.com/p/400/800?q=crossfit',
    title: 'Recorde pessoal no snatch',
    description: 'Finalmente bati os 100kg! Processo longo mas valeu a pena.',
    user: {
      name: 'CrossLife',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=7',
    },
    likes: '5.4k',
    comments: 120,
    shares: 450,
  },
]

// Evolution Data
export const mockEvolution = [
  {
    year: 2024,
    title: 'Ascensão Profissional',
    description:
      'Atingiu o nível avançado em competições regionais e melhorou significativamente os atributos físicos.',
    stats: { speed: 85, power: 80, technique: 88 },
  },
  {
    year: 2023,
    title: 'Primeiros Campeonatos',
    description:
      'Início da participação em ligas amadoras organizadas. Foco no desenvolvimento tático.',
    stats: { speed: 75, power: 70, technique: 80 },
  },
  {
    year: 2022,
    title: 'Início da Jornada',
    description: 'Primeiros passos no esporte, focando em fundamentos básicos.',
    stats: { speed: 60, power: 55, technique: 65 },
  },
]

// Categories for Explore Grid
export const exploreCategories = [
  {
    id: 'photographers',
    label: 'Fotógrafos',
    icon: Camera,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    id: 'drivers',
    label: 'Motoristas',
    icon: Car,
    color: 'text-zinc-500',
    bg: 'bg-zinc-500/10',
  },
  {
    id: 'events',
    label: 'Eventos',
    icon: Calendar,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    id: 'venues',
    label: 'Arenas',
    icon: MapPin,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    id: 'gyms',
    label: 'Academias',
    icon: Dumbbell,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'nutrition',
    label: 'Nutrição',
    icon: Utensils,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    id: 'clinics',
    label: 'Saúde',
    icon: Stethoscope,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
]

export const photographerCategories = [
  'Todos',
  'Futebol',
  'Basquete',
  'Tênis',
  'Corrida',
  'Surfe',
  'Skate',
  'Eventos',
  'Ensaios',
]

export const mockDriverStats = [
  {
    id: 1,
    name: 'Roberto Dias',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=30',
    rating: 4.9,
    rides: 145,
    responseTime: '2m',
  },
]

export const mockDrivers = [
  {
    id: 1,
    name: 'Roberto Dias',
    rating: 4.9,
    car: 'Sedan Preto',
    plate: 'ABC-1234',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=30',
    distance: '2 min',
    rides: 1540,
  },
  {
    id: 2,
    name: 'Fernanda Lima',
    rating: 5.0,
    car: 'SUV Branco',
    plate: 'XYZ-9876',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=31',
    distance: '5 min',
    rides: 890,
  },
  {
    id: 3,
    name: 'Carlos Santos',
    rating: 4.7,
    car: 'Hatch Prata',
    plate: 'GOP-2024',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=32',
    distance: '8 min',
    rides: 320,
  },
]

export const mockAiAnalysis = {
  aiStats: [
    { label: 'Velocidade de Reação', value: 240, unit: 'ms', max: 500 },
    { label: 'Potência do Chute', value: 88, unit: 'km/h', max: 120 },
    { label: 'Precisão', value: 92, unit: '%', max: 100 },
    { label: 'Distância Percorrida', value: 1.2, unit: 'km', max: 5 },
  ],
  trainingPlan: {
    title: 'Treino de Explosão',
    exercises: [
      'Agachamento com Salto (3x12)',
      'Sprints de 30m (5x)',
      'Box Jumps (3x10)',
    ],
  },
}

export const mockTrainingSuggestions: TrainingSuggestion[] = [
  {
    id: '1',
    title: 'Melhorar Finalização',
    difficulty: 'Intermediário',
    reason: 'Baixa conversão no último jogo',
    description: 'Foco em chutes de média distância e posicionamento corporal.',
    exercises: [
      { name: 'Chutes a gol (frontal)', sets: 4, reps: 15 },
      { name: 'Slalom com finalização', sets: 3, reps: 10 },
    ],
  },
  {
    id: '2',
    title: 'Resistência Anaeróbica',
    difficulty: 'Avançado',
    reason: 'Queda de ritmo no 2º tempo',
    description: 'Séries de alta intensidade para manter o fôlego.',
    exercises: [
      { name: 'Tiro de 50m', sets: 10, reps: 1 },
      { name: 'Burpees', sets: 3, reps: 20 },
    ],
  },
]

export const mockProfiles: ProfileData[] = [
  {
    id: 1,
    name: 'Média da Liga',
    avatar: 'https://img.usecurling.com/i?q=chart&shape=fill',
    role: 'Referência',
    type: 'athlete',
    stats: {
      speed: 70,
      power: 70,
      technique: 70,
      stamina: 70,
      mental: 70,
      tactics: 70,
    },
  },
  {
    id: 2,
    name: 'Neymar Jr',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=20',
    role: 'Atacante',
    type: 'athlete',
    stats: {
      speed: 95,
      power: 80,
      technique: 99,
      stamina: 85,
      mental: 88,
      tactics: 90,
    },
  },
  {
    id: 3,
    name: 'Cristiano R.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=22',
    role: 'Atacante',
    type: 'athlete',
    stats: {
      speed: 92,
      power: 95,
      technique: 90,
      stamina: 94,
      mental: 99,
      tactics: 88,
    },
  },
  {
    id: 'driver1',
    name: 'Roberto Dias',
    username: '@robertod',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=30',
    cover: 'https://img.usecurling.com/p/800/300?q=car%20interior',
    role: 'Motorista Parceiro',
    type: 'driver',
    location: 'São Paulo, SP',
    rating: 4.9,
    rides: 1540,
    responseTime: '2 min',
    bio: 'Motorista profissional há 5 anos. Conforto e segurança em primeiro lugar.',
    car: {
      model: 'Toyota Corolla',
      color: 'Preto',
      plate: 'ABC-1234',
      photo: 'https://img.usecurling.com/p/300/200?q=toyota%20corolla%20black',
    },
  },
  {
    id: 'photo1',
    name: 'Mariana Lentes',
    username: '@marifotos',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=45',
    cover: 'https://img.usecurling.com/p/800/300?q=camera%20lens',
    role: 'Fotógrafa Esportiva',
    type: 'photographer',
    location: 'Rio de Janeiro, RJ',
    rating: 5.0,
    bio: 'Especialista em capturar a emoção do esporte. Cobertura de eventos e ensaios pessoais.',
    categories: ['Esportes', 'Retratos', 'Eventos'],
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=soccer%20action',
      'https://img.usecurling.com/p/300/300?q=basketball%20dunk',
      'https://img.usecurling.com/p/300/300?q=tennis%20serve',
      'https://img.usecurling.com/p/300/300?q=swimming',
    ],
    portfolioProjects: [
      {
        id: 1,
        title: 'Final do Campeonato Carioca',
        date: 'Nov 2024',
        cover: 'https://img.usecurling.com/p/600/400?q=stadium%20celebration',
        description: 'Cobertura completa da grande final no Maracanã.',
        images: [
          'https://img.usecurling.com/p/300/300?q=goal%20celebration',
          'https://img.usecurling.com/p/300/300?q=trophy%20lift',
        ],
      },
    ],
    packages: [
      {
        title: 'Cobertura de Jogo',
        price: 'R$ 250',
        description:
          'Fotografias de uma partida completa (60min), entrega de 50 fotos editadas.',
      },
      {
        title: 'Ensaio Atleta',
        price: 'R$ 400',
        description:
          'Sessão de 2 horas em locação externa ou estúdio. 20 fotos em alta resolução.',
      },
    ],
  },
]

// Events
export const mockEvents = [
  {
    id: 1,
    title: 'Campeonato de Futsal Amador',
    date: '15 Dez, 14:00',
    location: 'Arena Central',
    image: 'https://img.usecurling.com/p/400/200?q=futsal%20match',
    price: 50.0,
    organizer: 'Liga SP',
    category: 'Futebol',
  },
  {
    id: 2,
    title: 'Maratona da Cidade',
    date: '20 Dez, 07:00',
    location: 'Parque Ibirapuera',
    image: 'https://img.usecurling.com/p/400/200?q=marathon%20running',
    price: 80.0,
    organizer: 'Runners Club',
    category: 'Corrida',
  },
  {
    id: 3,
    title: 'Torneio de Tênis Open',
    date: '18 Dez, 09:00',
    location: 'Clube Pinheiros',
    image: 'https://img.usecurling.com/p/400/200?q=tennis%20match',
    price: 120.0,
    organizer: 'Tennis Pro',
    category: 'Tênis',
  },
]

// Venues
export const mockVenues = [
  {
    id: '1',
    name: 'Arena Central',
    location: 'Centro, São Paulo',
    address: 'Rua do Esporte, 100 - Centro',
    rating: 4.8,
    reviews: 124,
    img: 'soccer%20field',
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20field',
    sports: ['Futebol', 'Vôlei'],
    price: 'R$ 120/h',
    features: ['Estacionamento', 'Vestiário', 'Bar'],
    amenities: ['Wi-Fi', 'Chuveiros', 'Lanchonete', 'Estacionamento'],
  },
  {
    id: '2',
    name: 'Quadras do Parque',
    location: 'Vila Mariana, SP',
    address: 'Av. do Parque, 500 - Vila Mariana',
    rating: 4.5,
    reviews: 89,
    img: 'tennis%20court',
    image: 'https://img.usecurling.com/p/400/300?q=tennis%20court',
    sports: ['Tênis', 'Beach Tennis'],
    price: 'R$ 80/h',
    features: ['Iluminação', 'Aluguel de Material'],
    amenities: ['Iluminação LED', 'Aluguel de Raquetes'],
  },
  {
    id: '3',
    name: 'Ginásio Poliesportivo',
    location: 'Tatuapé, SP',
    address: 'Rua Tuiuti, 1200 - Tatuapé',
    rating: 4.6,
    reviews: 56,
    img: 'basketball%20court',
    image: 'https://img.usecurling.com/p/400/300?q=basketball%20court',
    sports: ['Basquete', 'Futsal', 'Vôlei'],
    price: 'R$ 150/h',
    features: ['Arquibancada', 'Placar Eletrônico'],
    amenities: ['Arquibancada', 'Placar Eletrônico', 'Vestiário Premium'],
  },
]

export const mockGyms = [
  {
    id: '1',
    name: 'Academia Ironberg',
    location: 'Centro, São Paulo',
    address: 'Rua da Força, 500',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/300?q=gym%20interior',
    features: ['Musculação', 'Crossfit', 'Lutas'],
    amenities: ['Ar Condicionado', 'Estacionamento', 'Vestiário'],
    price: 'R$ 120/mês',
    distance: '2.5 km',
    reviews: 240,
    openUntil: '23:00',
  },
  {
    id: '2',
    name: 'Smart Fit',
    location: 'Pinheiros, São Paulo',
    address: 'Av. Faria Lima, 1000',
    rating: 4.5,
    image: 'https://img.usecurling.com/p/400/300?q=fitness%20center',
    features: ['Musculação', 'Cardio', 'Aulas Coletivas'],
    amenities: ['Ar Condicionado', 'Chuveiros', 'Wi-Fi'],
    price: 'R$ 99/mês',
    distance: '1.2 km',
    reviews: 1500,
    openUntil: '24h',
  },
  {
    id: '3',
    name: 'CrossFit Box',
    location: 'Vila Madalena, São Paulo',
    address: 'Rua Harmonia, 200',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=crossfit%20gym',
    features: ['Crossfit', 'LPO', 'Gymnastics'],
    amenities: ['Vestiário', 'Loja', 'Nutricionista'],
    price: 'R$ 250/mês',
    distance: '3.0 km',
    reviews: 85,
    openUntil: '22:00',
  },
]

export const mockNutritionPartners = [
  {
    id: '1',
    name: 'Dra. Ana Paula',
    role: 'Nutricionista Esportiva',
    specialty: 'Nutrição Esportiva',
    rating: 5.0,
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=50',
    location: 'Online / Presencial',
    price: 'R$ 250',
    reviews: 45,
    bio: 'Especialista em performance atlética e emagrecimento.',
  },
  {
    id: '2',
    name: 'Dr. Carlos Nutri',
    role: 'Nutrólogo',
    specialty: 'Hipertrofia e Emagrecimento',
    rating: 4.8,
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=51',
    location: 'Moema, SP',
    price: 'R$ 300',
    reviews: 32,
    bio: 'Foco em ganho de massa muscular e longevidade.',
  },
]

export const mockClinics = [
  {
    id: '1',
    name: 'Clínica do Esporte',
    specialty: 'Fisioterapia Esportiva',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy%20clinic',
    location: 'Jardins, SP',
    services: ['Fisioterapia', 'Osteopatia', 'Recovery', 'Massagem'],
    distance: '4.0 km',
    reviews: 120,
    address: 'Rua Augusta, 2500',
  },
  {
    id: '2',
    name: 'OrtoCenter',
    specialty: 'Ortopedia e Traumatologia',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/400/300?q=medical%20clinic',
    location: 'Tatuapé, SP',
    services: ['Consultas', 'Exames de Imagem', 'Cirurgia', 'Infiltração'],
    distance: '6.5 km',
    reviews: 89,
    address: 'Rua Tuiuti, 1500',
  },
]

// Products
export const mockProducts = [
  {
    id: 1,
    name: 'Chuteira Pro Elite',
    category: 'Calçados',
    price: 299.9,
    rating: 4.8,
    reviews: 120,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20cleats',
  },
  {
    id: 2,
    name: 'Camisa Dry-Fit',
    category: 'Roupas',
    price: 89.9,
    rating: 4.5,
    reviews: 85,
    image: 'https://img.usecurling.com/p/300/300?q=sport%20tshirt',
  },
  {
    id: 3,
    name: 'Whey Protein Isolado',
    category: 'Suplementos',
    price: 149.9,
    rating: 4.9,
    reviews: 230,
    image: 'https://img.usecurling.com/p/300/300?q=whey%20protein',
  },
  {
    id: 4,
    name: 'Bola Oficial',
    category: 'Equipamentos',
    price: 120.0,
    rating: 4.7,
    reviews: 50,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball',
  },
]

// Chats
export const mockChats = [
  {
    id: 1,
    user: {
      id: 'u1',
      name: 'Treinador Miguel',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=9',
      online: true,
    },
    lastMessage: 'O treino de amanhã está confirmado?',
    time: '10:30',
    unread: 2,
  },
  {
    id: 2,
    user: {
      id: 'u2',
      name: 'Julia Costa',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=10',
      online: false,
    },
    lastMessage: 'Beleza, te encontro lá!',
    time: 'Ontem',
    unread: 0,
  },
]

// Notifications
export const mockNotificationsList = [
  {
    id: '1',
    title: 'Novo seguidor',
    message: 'Lucas Mendes começou a seguir você.',
    time: '2 min atrás',
    date: 'Hoje',
    read: false,
    type: 'follow',
  },
  {
    id: '2',
    title: 'Jogo confirmado',
    message: 'Seu jogo na Arena Central foi confirmado para 19:00.',
    time: '1h atrás',
    date: 'Hoje',
    read: true,
    type: 'game',
  },
]

export const mockNotifications = mockNotificationsList

export interface Notification {
  id: string
  title: string
  message: string
  time?: string
  date: string
  read: boolean
  type?: string
}

export const mockComparisonStats = [
  { label: 'Velocidade', user: 75, avg: 60, pro: 90 },
  { label: 'Força', user: 80, avg: 65, pro: 85 },
  { label: 'Técnica', user: 70, avg: 55, pro: 95 },
  { label: 'Resistência', user: 85, avg: 60, pro: 92 },
  { label: 'Mental', user: 65, avg: 50, pro: 88 },
  { label: 'Tática', user: 60, avg: 55, pro: 90 },
]

export const mockTransactionHistory = [
  {
    id: '1',
    type: 'deposit',
    description: 'Depósito via PIX',
    amount: 150.0,
    date: 'Hoje, 10:30',
    status: 'completed',
  },
  {
    id: '2',
    type: 'payment',
    description: 'Reserva Arena Central',
    amount: -80.0,
    date: 'Ontem, 18:45',
    status: 'completed',
  },
  {
    id: '3',
    type: 'earning',
    description: 'Prêmio MVP da Partida',
    amount: 50.0,
    date: '12 Dez, 21:00',
    status: 'completed',
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Atacante Semi-Profissional',
    company: 'Dragões da Várzea',
    team: 'Dragões da Várzea',
    location: 'São Paulo, SP',
    salary: 'R$ 800 - R$ 1.200 / jogo',
    type: 'Temporada',
    description:
      'Procuramos atacante rápido e com boa finalização para disputa da Copa Regional.',
    requirements: [
      'Experiência em campeonatos amadores',
      'Disponibilidade aos finais de semana',
    ],
    postedAt: '2 dias atrás',
    logo: 'https://img.usecurling.com/i?q=dragon&shape=fill&color=red',
  },
  {
    id: '2',
    title: 'Goleiro para Torneio',
    company: 'Real Madruga',
    team: 'Real Madruga',
    location: 'Osasco, SP',
    salary: 'R$ 150 / jogo',
    type: 'Freelance',
    description:
      'Precisamos de goleiro para fechar o time no torneio de domingo.',
    requirements: ['Luvas próprias', 'Chegar 30min antes'],
    postedAt: 'Hoje',
    logo: 'https://img.usecurling.com/i?q=shield&shape=fill&color=blue',
  },
  {
    id: '3',
    title: 'Treinador Sub-15',
    company: 'Escolinha do Futuro',
    team: 'Escolinha do Futuro',
    location: 'Campinas, SP',
    salary: 'R$ 2.500 / mês',
    type: 'CLT',
    description:
      'Vaga para treinador de categorias de base. Foco em formação de atletas.',
    requirements: ['Licença C da CBF', 'Experiência com crianças'],
    postedAt: '1 semana atrás',
    logo: 'https://img.usecurling.com/i?q=whistle&shape=fill&color=green',
  },
]

export const getMockMessages = (chatId: string) => {
  return [
    {
      id: '1',
      text: 'E aí, tudo certo para o jogo de hoje?',
      senderId: 'other',
      timestamp: '10:30',
      isMe: false,
    },
    {
      id: '2',
      text: 'Fala! Tudo pronto. Já separei o uniforme.',
      senderId: 'me',
      timestamp: '10:32',
      isMe: true,
    },
    {
      id: '3',
      text: 'Show! Nos vemos lá às 19h então.',
      senderId: 'other',
      timestamp: '10:33',
      isMe: false,
    },
  ]
}
