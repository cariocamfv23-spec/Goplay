import {
  ChartSpline,
  Store,
  Briefcase,
  Video,
  Home,
  Target,
  Trophy,
  Flag,
  UserCheck,
  MapPin,
  Car,
  Star,
  Camera,
  Calendar,
  Laugh,
  Mic,
  Bot,
  Smartphone,
  Brain,
  Zap,
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
  avatar: `https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? 'male' : 'female'}&seed=${i + 10}`,
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

export interface NarrationConfig {
  hasNarration: boolean
  style:
    | 'varzea'
    | 'professional'
    | 'comedy'
    | 'futuristic'
    | 'influencer'
    | 'tactical'
  text: string
  volume: number
}

export interface Post {
  id: number
  type: string
  user: {
    id: string
    name: string
    avatar: string
    type: string
  }
  content: string
  media?: string[]
  title?: string
  hashtags?: string[]
  videoDuration?: string
  articleTitle?: string
  articleDomain?: string
  likes: number
  comments: number
  shares: number
  applauds: number
  supports: number
  cools?: number
  time: string
  narration?: NarrationConfig
}

export const mockPosts: Post[] = [
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
    media: ['https://img.usecurling.com/p/600/400?q=soccer%20training&dpr=2'],
    likes: 124,
    comments: 18,
    shares: 5,
    applauds: 45,
    supports: 12,
    cools: 28,
    time: '2h',
  },
  {
    id: 2,
    type: 'video',
    user: {
      id: '2',
      name: 'Clube Atlético',
      avatar:
        'https://img.usecurling.com/i?q=soccer%20club%20logo&shape=fill&color=violet',
      type: 'Clube',
    },
    title: 'Golaço do Sub-17',
    hashtags: ['#futebol', '#base', '#golaço'],
    content: 'Olha o que rolou no treino de hoje! A base vem forte.',
    media: ['https://img.usecurling.com/p/600/400?q=soccer%20goal&dpr=2'],
    videoDuration: '0:20',
    likes: 450,
    comments: 89,
    shares: 120,
    applauds: 300,
    supports: 50,
    cools: 150,
    time: '4h',
    narration: {
      hasNarration: true,
      style: 'professional',
      text: 'GOOOOOOL do Clube Atlético! Que categoria meus amigos!',
      volume: 0.8,
    },
  },
]

export const mockVideos = [
  {
    id: 1,
    user: 'mariagomes_voley',
    userAvatar:
      'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=15',
    description: 'Aquele saque perfeito! 🏐 #volei #ace',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=volleyball%20player%20serve&dpr=2',
    likes: '1.2k',
    shares: '340',
    aiAction: 'Saque Ace detectado',
    aiStats: [
      { label: 'Velocidade', value: 85, max: 100, unit: 'km/h' },
      { label: 'Altura do Salto', value: 65, max: 100, unit: 'cm' },
      { label: 'Precisão', value: 92, max: 100, unit: '%' },
    ],
    trainingPlan: {
      title: 'Melhorar Potência de Saque',
      exercises: [
        'Saltos na caixa 3x10',
        'Agachamento explosivo 4x8',
        'Arremesso medicine ball 3x12',
      ],
    },
  },
  {
    id: 2,
    user: 'joaobasket_10',
    userAvatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=42',
    description: 'Buzzer beater de ontem! 🏀🏀🏀',
    thumbnail:
      'https://img.usecurling.com/p/720/1280?q=basketball%20dunk%20action&dpr=2',
    likes: '5.6k',
    shares: '1.1k',
    aiAction: 'Cesta de 3 pontos',
    aiStats: [
      { label: 'Distância', value: 7.2, max: 10, unit: 'm' },
      { label: 'Arco', value: 45, max: 60, unit: 'graus' },
      { label: 'Release Time', value: 0.4, max: 1, unit: 's' },
    ],
    trainingPlan: {
      title: 'Precisão de Longa Distância',
      exercises: [
        'Arremessos estáticos 5x10',
        'Drible + Arremesso 4x10',
        'Treino de core 3x15',
      ],
    },
  },
]

export const mockEvents = [
  {
    id: '1',
    title: 'Copa Regional de Futsal',
    date: '15 Ago',
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/p/600/300?q=futsal%20tournament&dpr=2',
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
    companyLogo:
      'https://img.usecurling.com/i?q=soccer%20club%20badge&color=red',
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
    img: 'soccer%20cleats%20pro',
    description: 'Chuteira profissional para campo.',
    category: 'Equipamentos',
    reviews: [
      {
        id: 1,
        user: 'João Silva',
        avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
        rating: 5,
        date: '2 dias atrás',
        comment: 'Excelente qualidade, muito confortável!',
      },
    ],
  },
  {
    id: 2,
    name: 'Bola Oficial',
    price: 'R$ 120,00',
    rating: 4.5,
    img: 'soccer%20match%20ball',
    description: 'Bola oficial de competição.',
    category: 'Equipamentos',
    reviews: [],
  },
]

export const mockVenues = [
  {
    id: 'v1',
    name: 'Arena Futsal Centro',
    price: 'R$ 150/h',
    rating: 4.9,
    img: 'indoor%20futsal%20court',
    lat: -23.5505,
    lng: -46.6333,
    address: 'Rua Central, 123, São Paulo',
    amenities: ['Vestiário', 'Bar', 'Estacionamento'],
    rules: ['Proibido chuteira de trava', 'Chegar 10min antes'],
    images: [
      'https://img.usecurling.com/p/600/400?q=indoor%20futsal%20court&dpr=2',
      'https://img.usecurling.com/p/600/400?q=locker%20room&dpr=2',
    ],
  },
]

export const mockCourts = mockVenues.map((v) => ({
  ...v,
  id: Number(v.id.replace('v', '')),
}))

export const mockGyms = [
  {
    id: 'g1',
    name: 'Ironberg Academy',
    location: 'Moema, SP',
    rating: 4.9,
    img: 'modern%20gym%20equipment',
    plans: ['Mensal - R$ 120', 'Anual - R$ 99/mês'],
    amenities: ['Ar condicionado', 'Personal Trainer', 'Aulas Coletivas'],
    benefits: ['10% de desconto no plano anual', 'Avaliação física gratuita'],
  },
]

export const mockNutritionPartners = [
  {
    id: 'n1',
    name: 'Mundo Verde & Fit',
    location: 'Jardins, SP',
    rating: 4.7,
    img: 'healthy%20food%20store',
    specialties: ['Suplementos', 'Marmitas Fit'],
    discount: '15% OFF para usuários Goplay',
  },
]

export const mockClinics = [
  {
    id: 'c1',
    name: 'PhysioSport Center',
    location: 'Itaim Bibi, SP',
    rating: 5.0,
    img: 'physiotherapy%20clinic%20modern',
    services: ['Fisioterapia', 'Osteopatia', 'Recovery'],
    insurance: ['Amil', 'Bradesco', 'Unimed'],
    recoveryPlan: true,
  },
]

export const mockHighlights = [
  {
    id: 'h1',
    title: 'Golaço de falta',
    date: '10 Ago 2024',
    venue: 'Arena Futsal Centro',
    sport: 'Futsal',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=futsal%20goal&dpr=2',
    duration: '0:15',
    narration: {
      hasNarration: true,
      style: 'varzea',
      text: 'Respeita o brabo! O goleirão nem viu a cor da bola!',
      volume: 0.9,
    },
  },
  {
    id: 'h2',
    title: 'Defesa difícil',
    date: '05 Ago 2024',
    venue: 'Quadra Society 10',
    sport: 'Futebol Society',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=goalkeeper%20save&dpr=2',
    duration: '0:22',
  },
]

export interface BadgeData {
  id: string
  name: string
  icon: string
  color: string
}

export interface StatsHistoryPoint {
  date: string
  points: number
  rating: number
  matches: number
}

export interface TrainingSuggestion {
  id: string
  title: string
  description: string
  reason: string
  exercises: { name: string; sets: string; reps: string }[]
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  category: 'Tática' | 'Técnica' | 'Físico' | 'Mental'
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  date: string
  cover: string
  images: string[]
}

export interface ProfileData {
  id: string
  type:
    | 'athlete'
    | 'club'
    | 'coach'
    | 'photographer'
    | 'driver'
    | 'nutritionist'
    | 'physiotherapist'
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
  physicalStats?: {
    height: string
    weight: string
    age: number
    dominantFoot?: string
  }
  statsHistory?: StatsHistoryPoint[]
  suggestedTraining?: TrainingSuggestion[]

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
  portfolioProjects?: PortfolioProject[]
  packages?: { title: string; price: string; description: string }[]
  categories?: string[]

  // Driver specific
  car?: { model: string; plate: string; color: string; photo: string }
  rides?: number
  responseTime?: string // New field for driver performance

  // Nutritionist/Physio specific
  clinic?: string
  crn?: string
  crefito?: string
}

export const mockBadges: BadgeData[] = [
  { id: '1', name: 'Artilheiro', icon: 'Target', color: 'text-red-500' },
  { id: '2', name: 'MVP', icon: 'Trophy', color: 'text-yellow-500' },
  { id: '3', name: 'Líder', icon: 'Flag', color: 'text-blue-500' },
  {
    id: '4',
    name: 'Check-in Confirmado',
    icon: 'MapPin',
    color: 'text-green-500',
  },
  {
    id: '5',
    name: 'Jogador Presente',
    icon: 'UserCheck',
    color: 'text-purple-500',
  },
]

export const mockProfiles: ProfileData[] = [
  {
    id: '1',
    type: 'athlete',
    name: 'Lucas Oliveira',
    username: '@lucas.gol',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    cover:
      'https://img.usecurling.com/p/800/300?q=soccer%20field%20panorama&dpr=2',
    bio: 'Atleta de Futebol | Meia-atacante focado em alta performance.',
    location: 'São Paulo, SP',
    followers: '1.2k',
    following: '450',
    rating: 4.8,
    sport: 'Futebol',
    position: 'Meia-Atacante',
    points: 1250,
    rank: 12,
    badges: [mockBadges[0], mockBadges[1], mockBadges[3]],
    physicalStats: {
      height: '1.78m',
      weight: '72kg',
      age: 22,
      dominantFoot: 'Direito',
    },
    stats: [
      { label: 'Jogos', value: '89' },
      { label: 'Gols', value: '34' },
      { label: 'Assist.', value: '18' },
    ],
    history: [
      {
        year: '2023',
        team: 'São Paulo FC Base',
        description: 'Campeão Sub-17',
      },
      {
        year: '2022',
        team: 'Escola de Futebol Zico',
        description: 'Artilheiro da Copa',
      },
    ],
    statsHistory: [
      { date: 'Jan', points: 850, rating: 4.2, matches: 4 },
      { date: 'Fev', points: 920, rating: 4.3, matches: 5 },
      { date: 'Mar', points: 980, rating: 4.5, matches: 6 },
      { date: 'Abr', points: 1050, rating: 4.4, matches: 6 },
      { date: 'Mai', points: 1150, rating: 4.7, matches: 8 },
      { date: 'Jun', points: 1250, rating: 4.8, matches: 9 },
    ],
    suggestedTraining: [
      {
        id: 't1',
        title: 'Melhorar Resistência',
        description: 'Foco em manter o ritmo nos minutos finais.',
        reason: 'Queda de rendimento observada após 40min de jogo.',
        category: 'Físico',
        difficulty: 'Intermediário',
        exercises: [
          { name: 'HIIT (Tiros de 50m)', sets: '4', reps: '10' },
          { name: 'Corrida contínua', sets: '1', reps: '30 min' },
        ],
      },
      {
        id: 't2',
        title: 'Precisão de Passe Longo',
        description: 'Aprimore a virada de jogo e lançamentos.',
        reason: 'Taxa de acerto em passes longos abaixo de 60%.',
        category: 'Técnica',
        difficulty: 'Avançado',
        exercises: [
          { name: 'Lançamento em alvo fixo', sets: '5', reps: '10' },
          { name: 'Cruzamento em movimento', sets: '3', reps: '15' },
        ],
      },
    ],
  },
  {
    id: '2',
    type: 'club',
    name: 'Clube Atlético',
    username: '@atleticocentral',
    avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
    cover: 'https://img.usecurling.com/p/800/300?q=stadium%20crowd&dpr=2',
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
    cover: 'https://img.usecurling.com/p/800/300?q=coach%20tactics&dpr=2',
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
    cover:
      'https://img.usecurling.com/p/800/300?q=camera%20lens%20professional&dpr=2',
    bio: 'Fotógrafa esportiva profissional. Eternizando momentos.',
    location: 'Curitiba, PR',
    followers: '2.5k',
    following: '300',
    rating: 4.9,
    categories: ['Eventos', 'Retratos', 'Esportes'],
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=sports%20photo%20action',
      'https://img.usecurling.com/p/300/300?q=sports%20portrait',
    ],
    portfolioProjects: [
      {
        id: 'p1',
        title: 'Final do Regional Sub-17',
        description:
          'Cobertura completa da grande final entre Atlético e São Paulo. Emoção do início ao fim.',
        date: '10 Ago 2024',
        cover:
          'https://img.usecurling.com/p/400/300?q=soccer%20match%20final&dpr=2',
        images: [
          'https://img.usecurling.com/p/400/300?q=soccer%20goal&dpr=2',
          'https://img.usecurling.com/p/400/300?q=soccer%20celebration&dpr=2',
          'https://img.usecurling.com/p/400/300?q=soccer%20trophy&dpr=2',
        ],
      },
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
    cover: 'https://img.usecurling.com/p/800/300?q=car%20interior&dpr=2',
    bio: 'Motorista parceiro Goplay. Transporte seguro para seu equipamento.',
    location: 'São Paulo, SP',
    followers: '150',
    following: '20',
    rating: 4.8,
    rides: 1240,
    responseTime: '2 min',
    car: {
      model: 'Honda Civic',
      plate: 'ABC-1234',
      color: 'Prata',
      photo: 'https://img.usecurling.com/p/300/200?q=silver%20honda%20civic',
    },
  },
  {
    id: '6',
    type: 'nutritionist',
    name: 'Dra. Julia Fit',
    username: '@julia.nutri',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
    cover:
      'https://img.usecurling.com/p/800/300?q=healthy%20food%20table&dpr=2',
    bio: 'Nutricionista Esportiva. Performance através da alimentação.',
    location: 'São Paulo, SP',
    followers: '3.2k',
    following: '400',
    rating: 5.0,
    clinic: 'Clínica Health Sports',
    crn: 'CRN-3 12345',
    specialties: ['Hipertrofia', 'Emagrecimento', 'Performance'],
    pricing: 'R$ 250,00 / consulta',
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

export const mockRideRequests = [
  {
    id: 'req-1',
    passenger: {
      name: 'Ana Silva',
      rating: 4.9,
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
    },
    pickup: 'Rua das Flores, 123',
    dropoff: 'Arena Central',
    distance: '2.5 km',
    price: 'R$ 15,90',
    time: '5 min',
  },
]

export const mockInvitations = [
  {
    id: 'inv-1',
    teamName: 'Furia FC',
    teamLogo: 'https://img.usecurling.com/i?q=panther%20logo&color=black',
    modality: 'Futsal',
    location: 'Arena Central',
    time: 'Hoje, 20:00',
    level: 'Intermediário',
    confirmedPlayersCount: 8,
  },
]

export interface MatchPlayer {
  id: string
  name: string
  avatar: string
  status: 'confirmed' | 'absent' | 'pending'
  pointsEarned?: number
  checkInTime?: string
}

export interface Match {
  id: string
  teamName: string
  teamLogo: string
  modality: string
  location: string
  time: string
  status: 'pending_checkin' | 'approved' | 'finished'
  players: MatchPlayer[]
}

export const mockMatches: Match[] = [
  {
    id: 'match-1',
    teamName: 'Furia FC',
    teamLogo: 'https://img.usecurling.com/i?q=panther%20logo&color=black',
    modality: 'Futsal',
    location: 'Arena Central',
    time: 'Hoje, 20:00',
    status: 'pending_checkin',
    players: [
      {
        id: '1',
        name: 'Lucas Oliveira',
        avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
        status: 'pending',
      },
    ],
  },
]

export const mockPointsHistory = [
  {
    id: 1,
    title: 'Check-in Confirmado',
    date: 'Hoje, 20:10',
    points: 50,
    type: 'earned',
  },
]

export const mockComparisonStats = [
  { subject: 'Velocidade', user: 120, avg: 110, max: 150 },
  { subject: 'Força', user: 98, avg: 100, max: 150 },
  { subject: 'Resistência', user: 86, avg: 85, max: 150 },
  { subject: 'Tática', user: 99, avg: 90, max: 150 },
  { subject: 'Técnica', user: 85, avg: 80, max: 150 },
  { subject: 'Mental', user: 65, avg: 75, max: 150 },
]

export const mockTrainingEvents = [
  {
    id: 'evt-1',
    title: 'Treino de Resistência',
    date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    type: 'training',
    completed: false,
  },
]

export interface Feedback {
  id: string
  author: { name: string; avatar: string; role: string }
  content: string
  date: string
  rating: number
  context?: string
}

export const mockFeedbacks: Feedback[] = [
  {
    id: 'fb-1',
    author: {
      name: 'Roberto Mendes',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
      role: 'Coach',
    },
    content:
      'Excelente movimentação sem a bola hoje, Lucas. Precisamos trabalhar um pouco mais a finalização com a perna esquerda.',
    date: '2 dias atrás',
    rating: 4.5,
    context: 'Treino Tático',
  },
]

export const mockNotificationsList = [
  {
    id: '1',
    title: 'Perfil Atualizado',
    message: 'O motorista Carlos Driver atualizou suas informações de veículo.',
    date: 'Hoje, 10:00',
    read: false,
    type: 'profile_update',
    relatedId: '5',
  },
]

export const narrationStyles = [
  {
    id: 'varzea',
    name: 'Voz Várzea',
    description: 'Gírias originais e irreverência.',
    previewText: 'Que isso hein?! Pega essa maçã!',
    icon: 'Trophy',
  },
  {
    id: 'professional',
    name: 'Narrador Profissional',
    description: 'Estilo clássico e épico de TV.',
    previewText: 'GOOOOOOL do Goplay! Que categoria!',
    icon: 'Mic',
  },
  {
    id: 'comedy',
    name: 'Voz Comédia',
    description: 'Humor esportivo para rachar o bico.',
    previewText: 'Se errar, perde o emprego, hein!',
    icon: 'Laugh',
  },
  {
    id: 'futuristic',
    name: 'Voz Futurista',
    description: 'Efeitos tecnológicos e robóticos.',
    previewText: 'Análise concluída. Precisão cirúrgica detectada.',
    icon: 'Bot',
  },
  {
    id: 'influencer',
    name: 'Voz Influencer Esportivo',
    description: 'Hype e energia das redes sociais.',
    previewText: 'Fala galera! Se liga nesse lance absurdo!',
    icon: 'Smartphone',
  },
  {
    id: 'tactical',
    name: 'Mestre Tático',
    description: 'Análise técnica e estratégica.',
    previewText: 'Observamos uma falha na cobertura defensiva.',
    icon: 'Brain',
  },
] as const

// --- NEW DATA FOR AI FEATURES ---

export const mockPassport = {
  idNumber: 'GP-9821.2024.BR',
  nationality: 'Brasileiro',
  since: '2022',
  category: 'Atleta Amador Elite',
  verified: true,
  expiry: '12/2026',
}

export const mockEvolution = [
  {
    year: 2024,
    title: 'Auge Físico',
    description: 'Atingiu recorde pessoal de velocidade e resistência.',
    stats: { speed: 88, power: 75, technique: 82 },
  },
  {
    year: 2023,
    title: 'Consolidação Tática',
    description: 'Melhoria significativa na leitura de jogo.',
    stats: { speed: 82, power: 70, technique: 78 },
  },
  {
    year: 2022,
    title: 'Início no Goplay',
    description: 'Primeiros registros e formação de base.',
    stats: { speed: 75, power: 65, technique: 70 },
  },
]

export const mockOracle = {
  potentialIndex: 88,
  predictedPosition: 'Meia Ofensivo',
  futureSkills: [
    { name: 'Visão de Jogo', current: 78, projected: 92 },
    { name: 'Finalização', current: 75, projected: 88 },
    { name: 'Drible', current: 82, projected: 90 },
  ],
  comparisonData: [
    { subject: '2024', A: 75, fullMark: 150 },
    { subject: '2025 (Prev)', A: 85, fullMark: 150 },
    { subject: '2026 (Prev)', A: 95, fullMark: 150 },
  ],
}

export const mockInternationalMatches = [
  {
    id: 1,
    country: 'Argentina',
    flag: 'https://img.usecurling.com/i?q=argentina%20flag&shape=fill',
    opponentName: 'Diego Fernandes',
    sport: 'Futebol',
    status: 'pending',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=88',
  },
  {
    id: 2,
    country: 'Portugal',
    flag: 'https://img.usecurling.com/i?q=portugal%20flag&shape=fill',
    opponentName: 'João Félix Jr',
    sport: 'Futsal',
    status: 'ready',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=77',
  },
]

// --- MISSING EXPORTS FIXED ---

export const photographerCategories = [
  'Eventos Esportivos',
  'Ensaios Individuais',
  'Times e Clubes',
  'Produtos Esportivos',
  'Aéreo / Drone',
]

export const mockRewards = [
  {
    id: 1,
    title: 'Voucher de R$ 50',
    description: 'Válido para loja de equipamentos',
    points: 500,
    cost: 500,
    image: 'https://img.usecurling.com/i?q=voucher&color=blue',
  },
  {
    id: 2,
    title: 'Isenção de Taxa',
    description: '3 corridas sem taxa de serviço',
    points: 300,
    cost: 300,
    image: 'https://img.usecurling.com/i?q=discount&color=green',
  },
]

export const mockScheduledRides = [
  {
    id: '1',
    passenger: {
      name: 'Maria Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=10',
      rating: 4.8,
    },
    pickup: 'Rua das Flores, 123',
    dropoff: 'Arena Central',
    date: 'Amanhã, 14:00',
    distance: '5.2 km',
    price: 'R$ 25,00',
    status: 'confirmed',
  },
]

export const mockRideHistory = [
  {
    id: '1',
    date: 'Ontem, 18:30',
    passenger: 'João Santos',
    from: 'Centro',
    to: 'Estádio',
    earnings: 'R$ 32,50',
    rating: 5,
  },
  {
    id: '2',
    date: '10/08/2024',
    passenger: 'Ana Oliveira',
    from: 'Shopping',
    to: 'Casa',
    earnings: 'R$ 18,00',
    rating: 4,
  },
]

export const mockDriverStats = {
  rating: 4.9,
  totalRides: 1245,
  acceptanceRate: 98,
  cancellationRate: 1,
  earnings: {
    today: 'R$ 150,00',
    week: 'R$ 890,00',
    month: 'R$ 3.450,00',
  },
  hoursOnline: 145,
}

export const mockDriverGoals = [
  {
    id: 1,
    title: 'Corridas da Semana',
    current: 28,
    target: 40,
    reward: 'R$ 100 Bônus',
    deadline: 'Dom, 23:59',
    isRating: false,
  },
  {
    id: 2,
    title: 'Avaliação Estelar',
    current: 4.95,
    target: 4.9,
    reward: 'Selo Premium',
    deadline: '30 dias',
    isRating: true,
  },
]

export const mockDriverRewards = [
  {
    id: 1,
    title: 'Voucher Combustível',
    description: 'R$ 50,00 de desconto no abastecimento',
    points: 500,
    cost: 500,
    image: 'https://img.usecurling.com/i?q=gas%20pump&color=red',
  },
  {
    id: 2,
    title: 'Lava-Rápido Premium',
    description: 'Lavagem completa com cera',
    points: 300,
    cost: 300,
    image: 'https://img.usecurling.com/i?q=car%20wash&color=blue',
  },
  {
    id: 3,
    title: 'Troca de Óleo',
    description: 'Mão de obra grátis',
    points: 800,
    cost: 800,
    image: 'https://img.usecurling.com/i?q=oil%20can&color=black',
  },
]

export const mockPhotographerTransactions = [
  {
    id: 't1',
    date: 'Hoje, 10:45',
    description: 'Venda de Foto - Final Sub-17',
    amount: 15.9,
    type: 'credit',
    status: 'completed',
  },
  {
    id: 't2',
    date: 'Ontem, 16:20',
    description: 'Pacote Cobertura de Jogo',
    amount: 150.0,
    type: 'credit',
    status: 'completed',
  },
  {
    id: 't3',
    date: '10 Ago, 09:00',
    description: 'Saque para Conta',
    amount: -200.0,
    type: 'debit',
    status: 'completed',
  },
]
