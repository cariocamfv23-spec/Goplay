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
  LayoutGrid,
  Bike,
  Waves,
  Footprints,
  Mountain,
  Swords,
  CircleDashed,
  Hand,
  Globe,
  GraduationCap,
  Fuel,
  Baby,
  Medal,
  Crown,
  Gem,
  Star,
  Plane,
  Flag,
  TrendingUp,
  CheckCircle,
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
  type:
    | 'challenge'
    | 'invite'
    | 'system'
    | 'like'
    | 'weather'
    | 'level_up'
    | 'scholarship'
  date?: string
  priority?: 'low' | 'medium' | 'high' | 'critical'
  link?: string
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

export interface MusicTrack {
  id: string
  title: string
  artist: string
  cover: string
  duration: string
}

export interface TimelineEvent {
  id: string
  date: string
  fullDate: string
  type: 'match' | 'training' | 'achievement' | 'milestone' | 'ai_insight'
  title: string
  description: string
  stats?: { label: string; value: string | number }[]
  image?: string
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
  favoriteSong?: MusicTrack
  referralCode?: string
  referralStats?: {
    invited: number
    earned: number
  }
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

export type WeatherCondition =
  | 'sunny'
  | 'cloudy'
  | 'rainy'
  | 'windy'
  | 'storm'
  | 'snow'
  | 'fog'

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
  weather?: {
    temp: number
    condition: WeatherCondition
    humidity?: number
    windSpeed?: number
  }
}

export interface ProfileViewer {
  id: string
  name: string
  avatar: string
  type: string
  date: string
  time: string
}

export interface Goal {
  id: string
  title: string
  category: 'physical' | 'technical' | 'tactical' | 'mental'
  metric: string
  currentValue: number
  targetValue: number
  unit: string
  deadline: string
  status: 'active' | 'completed' | 'failed'
  createdAt: string
  progress: number
}

export interface InternationalMatchOpponent {
  id: string
  opponentName: string
  country: string
  flag: string
  level: string
  avatar: string
  rating: number
  status: 'online' | 'offline'
}

export interface InternationalRankingUser {
  id: string
  position: number
  name: string
  country: string
  flag: string
  points: number
  avatar: string
  trend: 'up' | 'down' | 'same'
}

export interface PassportData {
  idNumber: string
  expiry: string
  issueDate: string
  nationality: string
  status: 'active' | 'suspended' | 'expired'
}

export interface LiveEvent {
  id: string
  title: string
  championship: string
  modality:
    | 'futebol'
    | 'futsal'
    | 'tênis'
    | 'surf'
    | 'boxe'
    | 'lutas'
    | 'outros'
  city: string
  status: 'live' | 'upcoming' | 'ended'
  viewers: string
  image: string
  score?: string
  startTime?: string
}

export interface Scholarship {
  id: string
  university: string
  country: string
  city: string
  neighborhood?: string
  sport: string
  logo: string
  image: string
  value: number // Percentage coverage
  accommodation: string
  documentation: string
  process: string
  fee: number // Fee for institution to unlock profile
  deadline: string
}

export interface Agency {
  id: string
  name: string
  logo: string
  cover: string
  description: string
  shortDescription: string
  services: string[]
  location: string
  rating: number
  website: string
  email: string
  phone: string
  whatsapp?: string
  instagram?: string
  programs: { title: string; description: string }[]
}

export interface KidsVenue {
  id: string
  name: string
  image: string
  location: string
  rating: number
  isFree: boolean
  hasMonitors: boolean
  activities: string[]
  description: string
}

export interface ReferralLevel {
  id: string
  name: string
  minReferrals: number
  color: string
  icon: any
  benefits: string[]
}

export interface RetrospectiveYear {
  year: number
  stats: {
    videosWatched: number
    hoursWatched: number
    matches: number
    goals: number
    assists: number
    rating: number
  }
  topCategory: string
  milestones: number
  achievements: number
}

export const navigationItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Zap, label: 'Move', path: '/move' },
  { icon: Search, label: 'Explorar', path: '/explore' },
  { icon: ShoppingBag, label: 'Loja', path: '/marketplace' },
  { icon: User, label: 'Perfil', path: '/profile/me' },
]

export const tribes = [
  { id: 'all', label: 'Todos', icon: LayoutGrid },
  { id: 'futebol', label: 'Futebol', icon: CircleDashed },
  {
    id: 'futsal',
    label: 'Futsal',
    icon: Trophy,
  },
  {
    id: 'bike',
    label: 'Bike',
    icon: Bike,
  },
  { id: 'running', label: 'Corrida', icon: Footprints },
  { id: 'crossfit', label: 'Crossfit', icon: Dumbbell },
  { id: 'swimming', label: 'Natação', icon: Waves },
  { id: 'boxing', label: 'Boxe', icon: Hand },
  { id: 'climbing', label: 'Escalada', icon: Mountain },
  { id: 'martial_arts', label: 'Lutas', icon: Swords },
]

export const exploreCategories = [
  {
    id: 'scholarships',
    label: 'Bolsas',
    icon: GraduationCap,
    bg: 'bg-emerald-100 dark:bg-emerald-900/20',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'agencies',
    label: 'Agências',
    icon: Plane,
    bg: 'bg-sky-100 dark:bg-sky-900/20',
    color: 'text-sky-600 dark:text-sky-400',
  },
  {
    id: 'international',
    label: 'Mundial',
    icon: Globe,
    bg: 'bg-indigo-100 dark:bg-indigo-900/20',
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'fuel',
    label: 'Combustível',
    icon: Fuel,
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    id: 'talents',
    label: 'Scouts',
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
    label: 'Fotos',
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
    label: 'Gyms',
    icon: Dumbbell,
    bg: 'bg-red-100 dark:bg-red-900/20',
    color: 'text-red-600 dark:text-red-400',
  },
]

export const mockRetrospective = {
  year: 2024,
  stats: {
    videosWatched: 842,
    topCategory: 'Futebol',
    topCategoryIcon: Trophy,
    hoursWatched: 124,
    mostWatchedDate: '14 de Agosto',
  },
  milestones: [
    {
      id: 1,
      label: 'Primeira Partida',
      date: '12 Fev',
      icon: Flag,
      color: 'text-blue-500',
    },
    {
      id: 2,
      label: '3 Bolsas Aplicadas',
      date: '15 Mai',
      icon: GraduationCap,
      color: 'text-emerald-500',
    },
    {
      id: 3,
      label: 'Conexão com Agência',
      date: '20 Ago',
      icon: Briefcase,
      color: 'text-purple-500',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Perfil Campeão',
      description: '100% dos dados preenchidos',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      id: 2,
      title: 'Top Candidato',
      description: 'Entre os 5% mais ativos',
      icon: Star,
      color: 'text-gold',
    },
    {
      id: 3,
      title: 'Embaixador',
      description: 'Convidou 10+ amigos',
      icon: Users,
      color: 'text-primary',
    },
  ],
  summary: {
    message:
      'Foi um ano incrível de superação e conquistas. Estamos ansiosos para ver o que você fará em 2025!',
  },
}

export const mockRetrospectiveHistory: RetrospectiveYear[] = [
  {
    year: 2024,
    stats: {
      videosWatched: 842,
      hoursWatched: 124,
      matches: 42,
      goals: 15,
      assists: 8,
      rating: 4.8,
    },
    topCategory: 'Futebol',
    milestones: 5,
    achievements: 3,
  },
  {
    year: 2023,
    stats: {
      videosWatched: 650,
      hoursWatched: 98,
      matches: 30,
      goals: 10,
      assists: 5,
      rating: 4.2,
    },
    topCategory: 'Futebol',
    milestones: 3,
    achievements: 2,
  },
  {
    year: 2022,
    stats: {
      videosWatched: 400,
      hoursWatched: 60,
      matches: 15,
      goals: 5,
      assists: 2,
      rating: 3.8,
    },
    topCategory: 'Futsal',
    milestones: 1,
    achievements: 0,
  },
]

export const mockEvolution = [
  {
    year: 2024,
    title: 'Profissionalização',
    description: 'Foco total em bolsas internacionais e alta performance.',
    stats: { speed: 88, power: 85, technique: 90 },
  },
  {
    year: 2023,
    title: 'Consolidação',
    description: 'Primeiros campeonatos regionais e destaque na base.',
    stats: { speed: 75, power: 70, technique: 80 },
  },
  {
    year: 2022,
    title: 'Início da Jornada',
    description: 'Primeiros passos no esporte e descobertas.',
    stats: { speed: 60, power: 55, technique: 65 },
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
    name: 'Várzea',
    description: 'Gírias, humor e corneta',
    previewText: 'Olha esse chute, meu consagrado! Isolou na lua!',
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Sério, técnico e vibrante',
    previewText: 'Autoriza o árbitro, bola rolando no gramado!',
  },
  {
    id: 'comedy',
    name: 'Humor',
    description: 'Piadas e deboche',
    previewText: 'Parece eu jogando depois do churrasco, que beleza!',
  },
  {
    id: 'futuristic',
    name: 'Futurista',
    description: 'Robótico e analítico',
    previewText: 'Precisão calculada em 98%. Trajetória otimizada.',
  },
]

export const referralLevels: ReferralLevel[] = [
  {
    id: 'rookie',
    name: 'Membro',
    minReferrals: 0,
    color: 'text-slate-500',
    icon: User,
    benefits: ['Ganhe 200 pts por indicação'],
  },
  {
    id: 'bronze',
    name: 'Bronze',
    minReferrals: 5,
    color: 'text-amber-600',
    icon: Medal,
    benefits: ['5% OFF na Loja', 'Badge Bronze no Perfil'],
  },
  {
    id: 'silver',
    name: 'Prata',
    minReferrals: 10,
    color: 'text-slate-400',
    icon: Star,
    benefits: ['10% OFF na Loja', 'Acesso Antecipado a Eventos'],
  },
  {
    id: 'gold',
    name: 'Ouro',
    minReferrals: 20,
    color: 'text-yellow-500',
    icon: Crown,
    benefits: ['15% OFF na Loja', 'Suporte VIP', 'Badge Gold'],
  },
  {
    id: 'diamond',
    name: 'Diamante',
    minReferrals: 50,
    color: 'text-cyan-400',
    icon: Gem,
    benefits: ['25% OFF na Loja', 'Status Verificado', 'Convites Exclusivos'],
  },
]

export const mockAgencies: Agency[] = [
  {
    id: 'a1',
    name: 'NextLevel Sports',
    logo: 'https://img.usecurling.com/i?q=next%20level%20logo&color=blue',
    cover:
      'https://img.usecurling.com/p/800/400?q=university%20students&color=blue',
    description:
      'Especialistas em bolsas esportivas nos EUA e Europa. Transformamos atletas em estudantes-atletas internacionais.',
    shortDescription: 'Bolsas esportivas nos EUA e Europa.',
    services: [
      'Consultoria Acadêmica',
      'Produção de Vídeo Highlights',
      'Assessoria de Vistos',
      'Showcases',
    ],
    location: 'São Paulo, SP',
    rating: 4.9,
    website: 'https://nextlevel.example.com',
    email: 'contact@nextlevel.example.com',
    phone: '+55 11 99999-9999',
    programs: [
      {
        title: 'Programa Elite USA',
        description: 'Bolsas de 100% em universidades da Divisão I da NCAA.',
      },
      {
        title: 'Intercâmbio High School',
        description: 'Estude e jogue o ensino médio nos Estados Unidos.',
      },
    ],
  },
  {
    id: 'a2',
    name: 'EuroFut Agency',
    logo: 'https://img.usecurling.com/i?q=eurofut%20logo&color=red',
    cover:
      'https://img.usecurling.com/p/800/400?q=european%20soccer%20field&color=green',
    description:
      'A ponte direta para o futebol europeu. Testes em clubes da Espanha, Portugal e Itália.',
    shortDescription: 'Testes em clubes da Europa.',
    services: [
      'Agenciamento de Carreira',
      'Intercâmbio Esportivo',
      'Clínicas de Futebol',
    ],
    location: 'Rio de Janeiro, RJ',
    rating: 4.7,
    website: 'https://eurofut.example.com',
    email: 'scout@eurofut.example.com',
    phone: '+55 21 98888-8888',
    programs: [
      {
        title: 'Summer Camp Barcelona',
        description: '2 semanas de treinamento intensivo na Espanha.',
      },
    ],
  },
  {
    id: 'a3',
    name: 'Global Scholar',
    logo: 'https://img.usecurling.com/i?q=global%20scholar%20logo&color=green',
    cover:
      'https://img.usecurling.com/p/800/400?q=library%20students&color=orange',
    description:
      'Focados na excelência acadêmica e esportiva. Bolsas para Tênis, Natação e Vôlei.',
    shortDescription: 'Excelência acadêmica e esportiva.',
    services: ['Preparação TOEFL/SAT', 'Tradução de Documentos', 'Mentoria'],
    location: 'Curitiba, PR',
    rating: 4.8,
    website: 'https://globalscholar.example.com',
    email: 'info@globalscholar.example.com',
    phone: '+55 41 97777-7777',
    programs: [
      {
        title: 'Tennis Pro Path',
        description: 'Caminho para o tênis universitário americano.',
      },
    ],
  },
]

export const mockScholarships: Scholarship[] = [
  {
    id: 's1',
    university: 'University of Florida',
    country: 'USA',
    city: 'Gainesville',
    neighborhood: 'University Park',
    sport: 'Futebol',
    logo: 'https://img.usecurling.com/i?q=florida%20gators%20logo&color=orange',
    image:
      'https://img.usecurling.com/p/800/400?q=university%20campus%20florida&color=green',
    value: 100,
    accommodation:
      'Dormitórios no campus inclusos, com alimentação (Meal Plan) e acesso total às instalações esportivas.',
    documentation:
      'TOEFL > 80, SAT > 1200, Histórico Escolar traduzido e juramentado, Vídeo de Highlights (Max 5min).',
    process:
      'Envio de material > Análise Técnica > Entrevista com Coach > Oferta Oficial.',
    fee: 49.9,
    deadline: '15/05/2025',
  },
  {
    id: 's2',
    university: 'Universidade de Coimbra',
    country: 'Portugal',
    city: 'Coimbra',
    neighborhood: 'Alta',
    sport: 'Futsal',
    logo: 'https://img.usecurling.com/i?q=university%20coimbra%20logo&color=black',
    image:
      'https://img.usecurling.com/p/800/400?q=coimbra%20university&color=white',
    value: 50,
    accommodation:
      'Auxílio moradia de 300€/mês ou residência universitária (sujeito a vagas).',
    documentation:
      'Passaporte válido, ENEM (Notas do último ano), Carta de Recomendação do Clube atual.',
    process:
      'Inscrição Online > Teste Prático (Presencial ou Vídeo) > Validação Acadêmica.',
    fee: 29.9,
    deadline: '30/06/2025',
  },
  {
    id: 's3',
    university: 'UCLA',
    country: 'USA',
    city: 'Los Angeles',
    neighborhood: 'Westwood',
    sport: 'Basquete',
    logo: 'https://img.usecurling.com/i?q=ucla%20bruins%20logo&color=blue',
    image: 'https://img.usecurling.com/p/800/400?q=ucla%20campus&color=blue',
    value: 100,
    accommodation:
      'Apartamento estudantil compartilhado próximo ao campus + Seguro Saúde.',
    documentation:
      'TOEFL > 90, SAT > 1300, 2 Cartas de Recomendação, Stats oficiais da última temporada.',
    process:
      'Scouting em campeonatos > Contato Oficial > Visita ao Campus > Assinatura NLI.',
    fee: 59.9,
    deadline: '01/04/2025',
  },
  {
    id: 's4',
    university: 'Waseda University',
    country: 'Japão',
    city: 'Tóquio',
    neighborhood: 'Shinjuku',
    sport: 'Judô',
    logo: 'https://img.usecurling.com/i?q=waseda%20university&color=red',
    image:
      'https://img.usecurling.com/p/800/400?q=tokyo%20university&color=red',
    value: 80,
    accommodation:
      'Dormitório internacional WISH. Inclui aulas de japonês intensivo.',
    documentation:
      'JLPT N4 (Desejável) ou TOEFL, Vídeo de competições recentes, Exame médico.',
    process:
      'Análise Documental > Entrevista Online > Teste de Aptidão Física (no Japão ou Representante).',
    fee: 39.9,
    deadline: '10/08/2025',
  },
]

export const mockMusicTracks: MusicTrack[] = [
  {
    id: 'm1',
    title: 'We Are The Champions',
    artist: 'Queen',
    cover: 'https://img.usecurling.com/p/200/200?q=queen%20band',
    duration: '2:59',
  },
  {
    id: 'm2',
    title: 'Eye of the Tiger',
    artist: 'Survivor',
    cover: 'https://img.usecurling.com/p/200/200?q=tiger',
    duration: '4:04',
  },
  {
    id: 'm3',
    title: 'Lose Yourself',
    artist: 'Eminem',
    cover: 'https://img.usecurling.com/p/200/200?q=microphone',
    duration: '5:26',
  },
  {
    id: 'm4',
    title: 'Waka Waka',
    artist: 'Shakira',
    cover: 'https://img.usecurling.com/p/200/200?q=soccer%20world%20cup',
    duration: '3:22',
  },
  {
    id: 'm5',
    title: 'Believer',
    artist: 'Imagine Dragons',
    cover: 'https://img.usecurling.com/p/200/200?q=dragon',
    duration: '3:24',
  },
  {
    id: 'm6',
    title: 'Hall of Fame',
    artist: 'The Script',
    cover: 'https://img.usecurling.com/p/200/200?q=fame',
    duration: '3:22',
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
  favoriteSong: mockMusicTracks[2],
  referralCode: 'ALEX10',
  referralStats: {
    invited: 12,
    earned: 2400,
  },
}

export const mockCurrentUser = mockUser

export const mockPassport: PassportData = {
  idNumber: 'GP-8821-XJ9',
  expiry: '12/28',
  issueDate: '01/24',
  nationality: 'BRA',
  status: 'active',
}

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
    favoriteSong: mockMusicTracks[0],
  },
]

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'te1',
    date: 'Hoje',
    fullDate: '24 Outubro, 2024',
    type: 'match',
    title: 'Vitória na Copa Goplay',
    description: 'Atuação decisiva com 2 assistências e vitória por 3x1.',
    stats: [
      { label: 'Rating', value: 8.5 },
      { label: 'Gols', value: 0 },
      { label: 'Assists', value: 2 },
    ],
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

export const mockComments: Comment[] = []
export const mockStories = []
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
]
export const mockVideos = []
export const mockAiAnalysis = {}
export const mockTrainingSuggestions: TrainingSuggestion[] = []
export const mockRideRequests = []
export const mockRewards = []
export const mockRideHistory = []
export const mockRankings = []
export const mockEvents: Event[] = []
export const mockVenues = []
export const mockKidsVenues: KidsVenue[] = []
export const mockGyms = []
export const mockNutrition = []
export const mockHortifrutis = []
export const mockClinics = []
export const mockDrivers: ProfileData[] = []
export const mockPhotographers: ProfileData[] = []
export const mockProfiles: ProfileData[] = [...mockTalents]
export const mockJobs = []

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Camisa Térmica Pro',
    category: 'Vestuário',
    price: 89.9,
    pointsPrice: 800,
    image:
      'https://img.usecurling.com/p/300/300?q=t-shirt%20sports&color=black',
    seller: 'GoPlay Store',
    rating: 4.8,
    description: 'Camisa térmica para alta performance.',
    images: [],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '2',
    name: 'Chuteira Elite Gold',
    category: 'Calçados',
    price: 299.9,
    pointsPrice: 3000,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20shoes&color=gold',
    seller: 'Nike',
    rating: 4.9,
    description: 'Chuteira de campo profissional.',
    images: [],
    modality: 'Futebol',
    isPremium: true,
    availability: 'in_stock',
  },
  {
    id: '3',
    name: 'Whey Protein Isolado',
    category: 'Suplementos',
    price: 149.9,
    pointsPrice: 1500,
    image: 'https://img.usecurling.com/p/300/300?q=whey%20protein&color=white',
    seller: 'Max Titanium',
    rating: 4.7,
    description: 'Suplemento proteico para recuperação.',
    images: [],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '4',
    name: 'Bola de Futevôlei',
    category: 'Equipamentos',
    price: 120.0,
    pointsPrice: 1200,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball&color=white',
    seller: 'Mikasa',
    rating: 4.8,
    description: 'Bola oficial de futevôlei.',
    images: [],
    modality: 'Futebol',
    isPremium: false,
    availability: 'in_stock',
  },
]

export const mockNotifications: Notification[] = []
export const mockNotificationsList = mockNotifications
export const mockChats = []
export const mockPointsHistory = []

export const mockFinancialSummary = {
  balance: 1250.5,
  pointsBalance: 3500,
  monthlySpending: 450.0,
  monthlyIncome: 3200.0,
}

export const mockFinancialHistory: FinancialTransaction[] = []
export const mockTrainingEvents = []
export const mockProfileViewers: ProfileViewer[] = []
export const mockGoals: Goal[] = []
export const mockInternationalMatches: InternationalMatchOpponent[] = []
export const mockInternationalRanking: InternationalRankingUser[] = []
export const mockOracle = {}
export const mockLiveEvents: LiveEvent[] = []
export const mockFuelTransactions = []
