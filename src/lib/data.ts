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
  Heart,
  Globe,
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
    | 'emotion'
    | 'gringo'
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
  {
    id: '2',
    title: 'Peneira Nacional',
    date: '20 Set',
    location: 'Rio de Janeiro, RJ',
    image: 'https://img.usecurling.com/p/600/300?q=soccer%20tryouts&dpr=2',
    organizer: 'Olheiros BR',
    price: 'Grátis',
    description: 'Oportunidade única para jovens talentos serem observados.',
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
  about?: string
  address?: string
  jobs?: { id: number; title: string; type: string }[]
  events?: { id: number; title: string; date: string }[]
  specialties?: string[]
  certifications?: string[]
  pricing?: string
  availability?: string[]
  portfolio?: string[]
  portfolioProjects?: PortfolioProject[]
  packages?: { title: string; price: string; description: string }[]
  categories?: string[]
  car?: { model: string; plate: string; color: string; photo: string }
  rides?: number
  responseTime?: string
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

export interface Invitation {
  id: string
  teamName: string
  teamLogo: string
  modality: string
  location: string
  time: string
  level: string
  confirmedPlayersCount: number
}

export const mockInvitations: Invitation[] = [
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

export interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: string
  relatedId?: string
}

export const mockNotificationsList: Notification[] = [
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
  {
    id: 'emotion',
    name: 'Emocionante',
    description: 'Drama e emoção no máximo.',
    previewText: 'Haja coração amigos! Que momento histórico!',
    icon: 'Heart',
  },
  {
    id: 'gringo',
    name: 'Comentarista Internacional',
    description: 'Estilo europeu e sofisticado.',
    previewText: 'What a beautiful game! Simply magnificent!',
    icon: 'Globe',
  },
] as const

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

export const mockHighlights = [
  {
    id: 1,
    title: 'Gol de Falta - Final Regional',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer%20free%20kick',
    duration: '0:15',
    date: '12 Ago 2024',
    venue: 'Arena Central',
    narration: {
      hasNarration: true,
      style: 'professional',
      text: 'Olha a batida... GOOOOOL! Inacreditável!',
      volume: 0.8,
    },
  },
  {
    id: 2,
    title: 'Drible Desconcertante',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer%20dribble',
    duration: '0:08',
    date: '10 Ago 2024',
    venue: 'Clube Atlético',
  },
]

export const mockFeedbacks = [
  {
    id: 1,
    author: {
      name: 'Roberto Mendes',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
      role: 'Treinador',
    },
    rating: 5.0,
    content:
      'Excelente visão de jogo hoje. Precisa apenas melhorar a recomposição defensiva nos minutos finais.',
    date: 'Hoje, 18:30',
    context: 'Pós-Jogo',
  },
]

export const mockTrainingEvents = [
  {
    id: '1',
    title: 'Treino Tático',
    date: new Date(),
    type: 'training',
    completed: false,
  },
  {
    id: '2',
    title: 'Final Regional',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    type: 'match',
    completed: false,
  },
]

export const mockProducts = [
  {
    id: 1,
    name: 'Chuteira Elite Pro',
    price: 'R$ 599,90',
    rating: 4.8,
    img: 'soccer%20cleats',
    category: 'Equipamentos',
  },
  {
    id: 2,
    name: 'Whey Protein Gold',
    price: 'R$ 149,90',
    rating: 4.9,
    img: 'protein%20supplement',
    category: 'Nutrição',
  },
  {
    id: 3,
    name: 'Smartwatch Sport',
    price: 'R$ 899,90',
    rating: 4.7,
    img: 'smartwatch',
    category: 'Wearables',
  },
]

export const mockRewards = [
  {
    id: 1,
    name: 'Camisa Oficial Goplay',
    points: 2500,
    image: 'https://img.usecurling.com/p/300/300?q=tshirt%20sport&color=purple',
    category: 'Exclusivo',
  },
  {
    id: 2,
    name: 'Desconto 50% Uber',
    points: 500,
    image: 'https://img.usecurling.com/i?q=car&color=black',
    category: 'Voucher',
  },
]

export const mockCourts = [
  {
    id: 1,
    name: 'Arena Central',
    rating: 4.9,
    price: 'R$ 120/h',
    img: 'indoor%20soccer%20field',
  },
  {
    id: 2,
    name: 'Quadra do Bosque',
    rating: 4.6,
    price: 'R$ 90/h',
    img: 'outdoor%20soccer%20field',
  },
]

export const mockRankings = [
  {
    id: '1',
    name: 'Lucas Oliveira',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    points: 1250,
  },
  {
    id: '10',
    name: 'Marcos Silva',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
    points: 1180,
  },
  {
    id: '11',
    name: 'João Pedro',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=11',
    points: 1100,
  },
  {
    id: '12',
    name: 'André Santos',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
    points: 950,
  },
]

export const mockInternationalMatches = [
  {
    id: 1,
    country: 'United States',
    flag: 'https://img.usecurling.com/i?q=usa%20flag&shape=fill',
    opponentName: 'John Smith',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=88',
    level: 'Elite',
  },
  {
    id: 2,
    country: 'Spain',
    flag: 'https://img.usecurling.com/i?q=spain%20flag&shape=fill',
    opponentName: 'Carlos Garcia',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=77',
    level: 'Pro',
  },
]

export const mockPointsHistory = [
  {
    id: 1,
    title: 'Check-in: Arena Central',
    points: 50,
    date: 'Hoje',
    type: 'earned',
  },
  {
    id: 2,
    title: 'Vitória: Desafio Sombra',
    points: 100,
    date: 'Ontem',
    type: 'earned',
  },
  {
    id: 3,
    title: 'Resgate: Voucher Uber',
    points: -500,
    date: '10 Ago',
    type: 'spent',
  },
]

export const mockRideRequests = [
  {
    id: 'ride-1',
    passenger: {
      name: 'Lucas Oliveira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
      rating: 4.9,
    },
    pickup: 'Rua das Flores, 123',
    dropoff: 'Arena Central',
    price: 'R$ 24,90',
    status: 'pending',
  },
]

export interface LightningChallenge {
  id: string
  title: string
  description: string
  reward: number
  duration: number // seconds
  type: 'speed' | 'precision' | 'teamwork'
}

export const mockLightningChallenges: LightningChallenge[] = [
  {
    id: '1',
    title: 'Contra-Ataque Relâmpago',
    description: 'Faça um gol em menos de 15 segundos!',
    reward: 100,
    duration: 15,
    type: 'speed',
  },
  {
    id: '2',
    title: 'Rei da Assistência',
    description: 'Dê 2 passes para gol nos próximos 5 minutos.',
    reward: 150,
    duration: 300,
    type: 'teamwork',
  },
]

export const mockVideos = [
  {
    id: '1',
    title: 'Top 10 Gols da Rodada',
    thumbnail: 'https://img.usecurling.com/p/600/340?q=soccer%20goals',
    duration: '10:05',
    views: '12k',
    author: {
      name: 'Goplay Sports',
      avatar: 'https://img.usecurling.com/i?q=trophy&color=gold',
    },
  },
  {
    id: '2',
    title: 'Dicas de Drible',
    thumbnail: 'https://img.usecurling.com/p/600/340?q=soccer%20skills',
    duration: '5:30',
    views: '8.5k',
    author: {
      name: 'Coach Beto',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
    },
  },
]

export const photographerCategories = [
  'Eventos',
  'Retratos',
  'Equipes',
  'Editorial',
  'Produtos',
]

export const mockVenues = [
  {
    id: '1',
    name: 'Arena Central',
    location: 'São Paulo, SP',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20stadium',
    sports: ['Futebol', 'Futsal'],
    price: '$$$',
  },
  {
    id: '2',
    name: 'Complexo Esportivo Sul',
    location: 'Curitiba, PR',
    rating: 4.5,
    image: 'https://img.usecurling.com/p/600/400?q=sports%20complex',
    sports: ['Tênis', 'Vôlei'],
    price: '$$',
  },
]

export const mockGyms = [
  {
    id: '1',
    name: 'Ironberg CT',
    location: 'São Paulo, SP',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/600/400?q=gym%20interior',
    features: ['Musculação', 'Lutas', 'Crossfit'],
  },
  {
    id: '2',
    name: 'Smart Fit',
    location: 'Rio de Janeiro, RJ',
    rating: 4.6,
    image: 'https://img.usecurling.com/p/600/400?q=fitness%20center',
    features: ['Cardio', 'Musculação'],
  },
]

export const mockNutritionPartners = [
  {
    id: '1',
    name: 'Green Healthy Food',
    type: 'Restaurante',
    rating: 4.8,
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/p/400/300?q=healthy%20food',
    discount: '10% OFF',
  },
  {
    id: '2',
    name: 'Suplementos Pro',
    type: 'Loja',
    rating: 4.9,
    location: 'Online',
    image: 'https://img.usecurling.com/p/400/300?q=supplements',
    discount: '15% OFF',
  },
]

export const mockClinics = [
  {
    id: '1',
    name: 'Clínica do Esporte',
    specialty: 'Fisioterapia',
    rating: 4.9,
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy',
    verified: true,
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Treinador Sub-15',
    organization: 'Clube Atlético',
    location: 'Rio de Janeiro, RJ',
    type: 'Presencial',
    salary: 'R$ 2.500',
    postedAt: 'Há 2 dias',
    logo: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
  },
]
