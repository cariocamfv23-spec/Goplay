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
}

export const navigationItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Zap, label: 'Move', path: '/move' },
  { icon: Search, label: 'Explorar', path: '/explore' },
  { icon: Trophy, label: 'Ranking', path: '/ranking' },
  { icon: User, label: 'Perfil', path: '/profile/me' },
]

export const exploreCategories = [
  {
    id: 'events',
    label: 'Eventos',
    icon: Calendar,
    bg: 'bg-orange-100',
    color: 'text-orange-600',
  },
  {
    id: 'venues',
    label: 'Quadras',
    icon: MapPin,
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    id: 'photographers',
    label: 'Fotógrafos',
    icon: Camera,
    bg: 'bg-purple-100',
    color: 'text-purple-600',
  },
  {
    id: 'drivers',
    label: 'Uber',
    icon: Car,
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    id: 'gyms',
    label: 'Academias',
    icon: Dumbbell,
    bg: 'bg-red-100',
    color: 'text-red-600',
  },
  {
    id: 'nutrition',
    label: 'Nutrição',
    icon: Apple,
    bg: 'bg-yellow-100',
    color: 'text-yellow-600',
  },
  {
    id: 'clinics',
    label: 'Clínicas',
    icon: Stethoscope,
    bg: 'bg-cyan-100',
    color: 'text-cyan-600',
  },
  {
    id: 'jobs',
    label: 'Vagas',
    icon: Briefcase,
    bg: 'bg-gray-100',
    color: 'text-gray-600',
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
  stats: {
    matches: 42,
    wins: 28,
    mvp: 5,
  },
}

export const mockCurrentUser = mockUser

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
      avatar: 'https://img.usecurling.com/i?q=flamengo&shape=circle',
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
      avatar: 'https://img.usecurling.com/i?q=flamengo&shape=circle',
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
      avatar: 'https://img.usecurling.com/i?q=nba&shape=circle&color=blue',
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

export const mockEvents = [
  {
    id: 'e1',
    title: 'Campeonato Paulista de Futsal',
    category: 'Competição',
    date: '24 Out',
    time: '14:00',
    location: 'Ginásio do Ibirapuera',
    address: 'Rua Manoel da Nóbrega, 1361',
    image: 'https://img.usecurling.com/p/400/300?q=futsal%20match&color=blue',
    price: 50.0,
    description: 'Grande final do campeonato estadual.',
    organizer: 'Federação Paulista',
  },
  {
    id: 'e2',
    title: 'Maratona de São Paulo',
    category: 'Corrida',
    date: '15 Nov',
    time: '06:00',
    location: 'Obelisco',
    address: 'Av. Pedro Álvares Cabral',
    image:
      'https://img.usecurling.com/p/400/300?q=marathon%20runners&color=orange',
    price: 120.0,
    description: '42km pelas ruas de SP.',
    organizer: 'Yescom',
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
    image: 'https://img.usecurling.com/i?q=spfc&shape=circle&color=red',
    description: 'Procuramos treinador experiente para base.',
  },
]

export const mockProducts = [
  {
    id: 'prod1',
    name: 'Chuteira Nike Mercurial',
    category: 'Calçados',
    price: 499.9,
    image:
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats&color=orange',
    seller: 'Loja Oficial',
    rating: 4.8,
    description: 'Chuteira de alta performance para velocidade.',
    images: [
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats&color=orange',
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats%20side&color=orange',
    ],
  },
  {
    id: 'prod2',
    name: 'Bola Oficial Champions',
    category: 'Equipamentos',
    price: 199.9,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball&color=white',
    seller: 'Adidas Store',
    rating: 5.0,
    description: 'Bola oficial da competição.',
    images: [
      'https://img.usecurling.com/p/300/300?q=soccer%20ball&color=white',
    ],
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
