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
  LayoutList,
  Flame,
  Shield,
  Award,
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
    | 'ranking'
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

export type AchievementType = 'mvp' | 'streak' | 'veteran' | 'rising_star'

export interface SpecialAchievement {
  type: AchievementType
  label: string
}

export interface RankingEntry {
  id: string
  position: number
  points: number
  trend: 'up' | 'down' | 'same'
  user: {
    id: string
    name: string
    avatar: string
    team?: string
  }
  specialAchievement?: SpecialAchievement
}

export interface Challenge {
  id: string
  title: string
  description: string
  status: 'active' | 'upcoming' | 'ended'
  startDate: string
  endDate: string
  image: string
  banner: string
  rules: string
  rewards: string[]
  metric: string
  metricLabel: string
  participants: number
}

export const navigationItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: LayoutList, label: 'Feed', path: '/feed' },
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

export const mockFeedUsers = [
  {
    id: 'u3',
    name: 'Mariana Souza',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=12',
  },
  {
    id: 'u4',
    name: 'Carlos Eduardo',
    type: 'Treinador',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=45',
  },
  {
    id: 'u5',
    name: 'Beatriz Lima',
    type: 'Nutricionista',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=23',
  },
  {
    id: 'u6',
    name: 'Pedro Santos',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=67',
  },
  {
    id: 'u7',
    name: 'Fernanda Oliveira',
    type: 'Fisioterapeuta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=89',
  },
  {
    id: 'u8',
    name: 'Lucas Mendes',
    type: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=34',
  },
  {
    id: 'u9',
    name: 'Juliana Costa',
    type: 'Psicóloga',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=56',
  },
  {
    id: 'u10',
    name: 'Rafael Torres',
    type: 'Scout',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=78',
  },
]

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
  {
    id: 99,
    type: 'video',
    user: {
      id: 'u_stranger_1',
      name: 'Diego Freestyle',
      type: 'Influencer',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=55',
    },
    time: '3h',
    title: 'Desafio do Travessão',
    content: 'Quem consegue acertar 3 seguidas? #desafio #futebol',
    media: [
      'https://img.usecurling.com/p/600/400?q=soccer%20crossbar&color=black',
    ],
    videoDuration: '0:45',
    hashtags: ['#desafio', '#futebol'],
    likes: 5420,
    comments: 320,
    shares: 50,
    applauds: 800,
    supports: 200,
    liked: false,
    socialContext: {
      type: 'like',
      user: { id: 'u3', name: 'Mariana Souza' },
    },
  },
  {
    id: 2,
    type: 'image',
    user: mockFeedUsers[0],
    time: '4h',
    title: 'Treino de hoje',
    content: 'Dia de perna pesado! Foco total na preparação física.',
    media: [
      'https://img.usecurling.com/p/600/600?q=gym%20leg%20day%20workout&dpr=2',
    ],
    hashtags: ['#gym', '#fitness', '#nopainnogain'],
    likes: 245,
    comments: 18,
    shares: 5,
    applauds: 30,
    supports: 10,
    liked: false,
  },
  {
    id: 3,
    type: 'image',
    user: mockFeedUsers[5],
    time: '1d',
    title: 'Nova Chuteira',
    content: 'Pronto para estrear minha nova companheira de gols. ⚽🔥',
    media: [
      'https://img.usecurling.com/p/600/600?q=soccer%20cleats%20grass&dpr=2',
    ],
    hashtags: ['#futebol', '#nike', '#mercurial'],
    likes: 530,
    comments: 42,
    shares: 12,
    applauds: 80,
    supports: 20,
    liked: true,
  },
  {
    id: 4,
    type: 'video',
    user: mockFeedUsers[3],
    time: '2d',
    title: 'Highlights da Semana',
    content: 'Alguns lances do jogo de domingo. Vitória importante! 3x1',
    media: [
      'https://img.usecurling.com/p/600/400?q=soccer%20match%20action&dpr=2',
    ],
    videoDuration: '1:20',
    hashtags: ['#highlights', '#futebol', '#goplay'],
    likes: 890,
    comments: 67,
    shares: 34,
    applauds: 120,
    supports: 45,
    liked: true,
  },
  {
    id: 5,
    type: 'image',
    user: mockFeedUsers[0],
    time: '3d',
    title: 'Recovery',
    content: 'Pós-treino regenerativo. Cuidar do corpo é essencial.',
    media: ['https://img.usecurling.com/p/600/600?q=ice%20bath%20recovery'],
    hashtags: ['#recovery', '#athlete', '#health'],
    likes: 310,
    comments: 15,
    shares: 2,
    applauds: 40,
    supports: 15,
    liked: false,
  },
  {
    id: 6,
    type: 'image',
    user: mockFeedUsers[1],
    time: '5d',
    title: 'Time Completo',
    content: 'A união faz a força! Time focado no campeonato.',
    media: ['https://img.usecurling.com/p/600/400?q=soccer%20team%20huddle'],
    hashtags: ['#team', '#futebol', '#championship'],
    likes: 1200,
    comments: 98,
    shares: 56,
    applauds: 200,
    supports: 80,
    liked: true,
  },
  {
    id: 7,
    type: 'image',
    user: mockFeedUsers[2],
    time: '1w',
    title: 'Alimentação Saudável',
    content: 'Combustível para o corpo. 🥗🍗',
    media: ['https://img.usecurling.com/p/600/600?q=healthy%20food%20plate'],
    hashtags: ['#nutrition', '#diet', '#eatclean'],
    likes: 180,
    comments: 8,
    shares: 3,
    applauds: 25,
    supports: 5,
    liked: false,
  },
  {
    id: 8,
    type: 'video',
    user: mockCurrentUser,
    time: '1w',
    title: 'Treino de Habilidade',
    content: 'Melhorando o controle de bola. Prática leva à perfeição.',
    media: [
      'https://img.usecurling.com/p/600/400?q=soccer%20dribbling%20skills&dpr=2',
    ],
    videoDuration: '0:30',
    hashtags: ['#skills', '#training', '#soccerlife'],
    likes: 670,
    comments: 45,
    shares: 20,
    applauds: 90,
    supports: 30,
    liked: true,
  },
  {
    id: 9,
    type: 'image',
    user: mockFeedUsers[7],
    time: '2w',
    title: 'Visual do Jogo',
    content: 'Estádio lotado, energia incrível!',
    media: [
      'https://img.usecurling.com/p/600/400?q=crowded%20soccer%20stadium&dpr=2',
    ],
    hashtags: ['#stadium', '#fans', '#atmosphere'],
    likes: 1500,
    comments: 120,
    shares: 80,
    applauds: 300,
    supports: 100,
    liked: true,
  },
]
export const mockVideos = []

export const mockAiAnalysis = {
  aiStats: [
    { label: 'Velocidade', value: 88, max: 100, unit: 'pts' },
    { label: 'Resistência', value: 92, max: 100, unit: 'pts' },
    { label: 'Força', value: 85, max: 100, unit: 'pts' },
    { label: 'Técnica', value: 90, max: 100, unit: 'pts' },
  ],
}

export const mockTrainingSuggestions: TrainingSuggestion[] = [
  {
    id: 'ts1',
    title: 'Melhorar Resistência',
    description:
      'Sua performance cai significativamente nos últimos 15 minutos de jogo.',
    difficulty: 'Intermediário',
    reason: 'Queda de rendimento',
    exercises: [
      { name: 'Sprints Intervalados', sets: 5, reps: 400 },
      { name: 'Trote Regenerativo', sets: 1, reps: 2000 },
    ],
  },
  {
    id: 'ts2',
    title: 'Potência de Chute',
    description:
      'Aumente a força do seu chute para finalizações de fora da área.',
    difficulty: 'Avançado',
    reason: 'Finalizações fracas',
    exercises: [
      { name: 'Agachamento Explosivo', sets: 4, reps: 8 },
      { name: 'Chute com Peso', sets: 3, reps: 15 },
    ],
  },
]

export const mockRideRequests = []
export const mockRewards = []
export const mockRideHistory = []

export const mockRankings: RankingEntry[] = [
  {
    id: 'r1',
    position: 1,
    points: 2450,
    trend: 'up',
    user: {
      id: 'u_top1',
      name: 'Sarah Connor',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=99',
      team: 'T-800 FC',
    },
    specialAchievement: {
      type: 'mvp',
      label: 'MVP da Temporada',
    },
  },
  {
    id: 'r2',
    position: 2,
    points: 2320,
    trend: 'same',
    user: {
      id: 'u_top2',
      name: 'John Wick',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=88',
      team: 'Continental',
    },
    specialAchievement: {
      type: 'streak',
      label: 'Sequência de Vitórias',
    },
  },
  {
    id: 'r3',
    position: 3,
    points: 2100,
    trend: 'down',
    user: {
      id: 'u_top3',
      name: 'Neo Anderson',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=77',
      team: 'Matrix United',
    },
    specialAchievement: {
      type: 'veteran',
      label: 'Veterano de Elite',
    },
  },
  {
    id: 'r4',
    position: 4,
    points: 1950,
    trend: 'up',
    user: {
      id: 'u_top4',
      name: 'Trinity',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=66',
      team: 'Nebuchadnezzar',
    },
    specialAchievement: {
      type: 'rising_star',
      label: 'Estrela em Ascensão',
    },
  },
  {
    id: 'r5',
    position: 15,
    points: 1250,
    trend: 'up',
    user: {
      id: 'u1', // Matches mockCurrentUser.id
      name: 'Alex Silva',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
      team: 'Goplay Team',
    },
  },
]

export const mockChallenges: Challenge[] = [
  {
    id: 'c1',
    title: 'Rei da Várzea',
    description:
      'Quem fizer mais gols em partidas oficiais da várzea neste fim de semana vence.',
    status: 'active',
    startDate: '2024-10-25T00:00:00',
    endDate: '2024-10-27T23:59:59',
    image:
      'https://img.usecurling.com/p/400/400?q=soccer%20mud%20field&color=orange',
    banner:
      'https://img.usecurling.com/p/800/300?q=soccer%20mud%20field%20wide&color=orange',
    rules: 'Apenas gols validados por súmula digital contam.',
    rewards: [
      'Troféu Virtual "Rei da Várzea"',
      '5000 Pontos',
      'Chuteira Nike Mercurial',
    ],
    metric: 'goals',
    metricLabel: 'Gols',
    participants: 1240,
  },
  {
    id: 'c2',
    title: 'Maratona de Sprints',
    description: 'Acumule a maior distância em alta velocidade nos treinos.',
    status: 'active',
    startDate: '2024-10-20T00:00:00',
    endDate: '2024-10-30T23:59:59',
    image:
      'https://img.usecurling.com/p/400/400?q=running%20track%20sprint&color=blue',
    banner:
      'https://img.usecurling.com/p/800/300?q=running%20track%20sprint%20wide&color=blue',
    rules: 'Dados sincronizados via GPS/Smartwatch. Sprints acima de 25km/h.',
    rewards: ['Badge "Speedster"', '2000 Pontos'],
    metric: 'km',
    metricLabel: 'Km (Sprint)',
    participants: 850,
  },
  {
    id: 'c3',
    title: 'Copa das Estrelas',
    description: 'Torneio de verão. Os melhores de cada região.',
    status: 'upcoming',
    startDate: '2024-12-01T00:00:00',
    endDate: '2024-12-20T23:59:59',
    image:
      'https://img.usecurling.com/p/400/400?q=golden%20trophy%20cup&color=yellow',
    banner:
      'https://img.usecurling.com/p/800/300?q=golden%20trophy%20cup%20wide&color=yellow',
    rules: 'Inscrição prévia necessária.',
    rewards: ['Vaga na Peneira Oficial', 'Kit Completo Adidas'],
    metric: 'points',
    metricLabel: 'Pts',
    participants: 5000,
  },
  {
    id: 'c4',
    title: 'Desafio do Travessão',
    description: 'Maior número de acertos no travessão registrados em vídeo.',
    status: 'ended',
    startDate: '2024-09-01T00:00:00',
    endDate: '2024-09-15T23:59:59',
    image:
      'https://img.usecurling.com/p/400/400?q=soccer%20crossbar&color=gray',
    banner:
      'https://img.usecurling.com/p/800/300?q=soccer%20crossbar%20wide&color=gray',
    rules: 'Vídeos devem ser postados com a hashtag #TravessaoGoplay.',
    rewards: ['1000 Pontos', 'Bola Oficial'],
    metric: 'hits',
    metricLabel: 'Acertos',
    participants: 3200,
  },
]

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
      'https://img.usecurling.com/p/400/400?q=black%20thermal%20compression%20shirt&dpr=2',
    seller: 'GoPlay Store',
    rating: 4.8,
    description: 'Camisa térmica para alta performance com tecido respirável.',
    images: [
      'https://img.usecurling.com/p/600/600?q=black%20thermal%20compression%20shirt&dpr=2',
    ],
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
    image:
      'https://img.usecurling.com/p/400/400?q=gold%20soccer%20cleats&dpr=2',
    seller: 'Nike',
    rating: 4.9,
    description: 'Chuteira de campo profissional para máxima precisão.',
    images: [
      'https://img.usecurling.com/p/600/600?q=gold%20soccer%20cleats&dpr=2',
    ],
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
    image: 'https://img.usecurling.com/p/400/400?q=whey%20protein%20jar&dpr=2',
    seller: 'Max Titanium',
    rating: 4.7,
    description:
      'Suplemento proteico isolado para recuperação muscular rápida.',
    images: [
      'https://img.usecurling.com/p/600/600?q=whey%20protein%20jar&dpr=2',
    ],
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
    image: 'https://img.usecurling.com/p/400/400?q=footvolley%20ball&dpr=2',
    seller: 'Mikasa',
    rating: 4.8,
    description: 'Bola oficial de futevôlei, resistente à água.',
    images: ['https://img.usecurling.com/p/600/600?q=footvolley%20ball&dpr=2'],
    modality: 'Futebol',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '5',
    name: 'Bola de Futebol Campo',
    category: 'Equipamentos',
    price: 149.9,
    pointsPrice: 1400,
    image:
      'https://img.usecurling.com/p/400/400?q=professional%20soccer%20ball&dpr=2',
    seller: 'Adidas',
    rating: 4.7,
    description: 'Bola de campo com tecnologia de voo preciso.',
    images: [
      'https://img.usecurling.com/p/600/600?q=professional%20soccer%20ball&dpr=2',
    ],
    modality: 'Futebol',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '6',
    name: 'Camisa Oficial Goplay',
    category: 'Vestuário',
    price: 199.9,
    pointsPrice: 1900,
    image:
      'https://img.usecurling.com/p/400/400?q=blue%20soccer%20jersey&dpr=2',
    seller: 'GoPlay Store',
    rating: 5.0,
    description: 'Camisa oficial do time Goplay, tecido dry-fit.',
    images: [
      'https://img.usecurling.com/p/600/600?q=blue%20soccer%20jersey&dpr=2',
    ],
    modality: 'Futebol',
    isPremium: true,
    availability: 'in_stock',
  },
  {
    id: '7',
    name: 'Luvas de Goleiro Pro',
    category: 'Acessórios',
    price: 179.9,
    pointsPrice: 1700,
    image:
      'https://img.usecurling.com/p/400/400?q=orange%20goalkeeper%20gloves&dpr=2',
    seller: 'Poker',
    rating: 4.6,
    description: 'Luvas com grip profissional e proteção de dedos.',
    images: [
      'https://img.usecurling.com/p/600/600?q=orange%20goalkeeper%20gloves&dpr=2',
    ],
    modality: 'Futebol',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '8',
    name: 'Tênis Air Court',
    category: 'Calçados',
    price: 499.9,
    pointsPrice: 4800,
    image: 'https://img.usecurling.com/p/400/400?q=red%20basketball%20shoes',
    seller: 'Nike',
    rating: 4.9,
    description: 'Amortecimento de ar e suporte para tornozelo.',
    images: [
      'https://img.usecurling.com/p/600/600?q=red%20basketball%20shoes&dpr=2',
    ],
    modality: 'Basquete',
    isPremium: true,
    availability: 'in_stock',
  },
  {
    id: '9',
    name: 'Bola Basquete Outdoor',
    category: 'Equipamentos',
    price: 129.9,
    pointsPrice: 1200,
    image: 'https://img.usecurling.com/p/400/400?q=orange%20basketball&dpr=2',
    seller: 'Spalding',
    rating: 4.8,
    description: 'Bola resistente para quadras externas.',
    images: [
      'https://img.usecurling.com/p/600/600?q=orange%20basketball&dpr=2',
    ],
    modality: 'Basquete',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '10',
    name: 'Regata Shooter',
    category: 'Vestuário',
    price: 89.9,
    pointsPrice: 850,
    image:
      'https://img.usecurling.com/p/400/400?q=black%20basketball%20jersey&dpr=2',
    seller: 'GoPlay Store',
    rating: 4.5,
    description: 'Regata leve e cavada para liberdade de movimento.',
    images: [
      'https://img.usecurling.com/p/600/600?q=black%20basketball%20jersey&dpr=2',
    ],
    modality: 'Basquete',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '11',
    name: 'Creatina Turbo',
    category: 'Suplementos',
    price: 79.9,
    pointsPrice: 750,
    image: 'https://img.usecurling.com/p/400/400?q=creatine%20supplement&dpr=2',
    seller: 'Black Skull',
    rating: 4.8,
    description: 'Creatina monohidratada para explosão muscular.',
    images: [
      'https://img.usecurling.com/p/600/600?q=creatine%20supplement&dpr=2',
    ],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '12',
    name: 'Kit Elásticos',
    category: 'Equipamentos',
    price: 59.9,
    pointsPrice: 550,
    image:
      'https://img.usecurling.com/p/400/400?q=fitness%20resistance%20bands&dpr=2',
    seller: 'GoPlay Store',
    rating: 4.4,
    description: '5 elásticos com diferentes resistências para treino em casa.',
    images: [
      'https://img.usecurling.com/p/600/600?q=fitness%20resistance%20bands&dpr=2',
    ],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '13',
    name: 'Luvas de Treino',
    category: 'Acessórios',
    price: 49.9,
    pointsPrice: 450,
    image:
      'https://img.usecurling.com/p/400/400?q=black%20workout%20gloves&dpr=2',
    seller: 'Nike',
    rating: 4.5,
    description: 'Proteção e conforto para levantamento de peso.',
    images: [
      'https://img.usecurling.com/p/600/600?q=black%20workout%20gloves&dpr=2',
    ],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '14',
    name: 'Tênis Speed Runner',
    category: 'Calçados',
    price: 349.9,
    pointsPrice: 3300,
    image:
      'https://img.usecurling.com/p/400/400?q=green%20running%20shoes&dpr=2',
    seller: 'Adidas',
    rating: 4.8,
    description: 'Leveza e resposta rápida para corredores.',
    images: [
      'https://img.usecurling.com/p/600/600?q=green%20running%20shoes&dpr=2',
    ],
    modality: 'Corrida',
    isPremium: true,
    availability: 'in_stock',
  },
  {
    id: '15',
    name: 'Smartwatch GPS',
    category: 'Acessórios',
    price: 899.9,
    pointsPrice: 8500,
    image: 'https://img.usecurling.com/p/400/400?q=black%20smartwatch&dpr=2',
    seller: 'Garmin',
    rating: 4.9,
    description: 'Monitoramento cardíaco e GPS integrado.',
    images: ['https://img.usecurling.com/p/600/600?q=black%20smartwatch&dpr=2'],
    modality: 'Corrida',
    isPremium: true,
    availability: 'in_stock',
  },
  {
    id: '16',
    name: 'Jaqueta Corta Vento',
    category: 'Vestuário',
    price: 159.9,
    pointsPrice: 1500,
    image: 'https://img.usecurling.com/p/400/400?q=gray%20windbreaker&dpr=2',
    seller: 'Nike',
    rating: 4.7,
    description: 'Proteção contra vento e chuva leve.',
    images: ['https://img.usecurling.com/p/600/600?q=gray%20windbreaker&dpr=2'],
    modality: 'Corrida',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '17',
    name: 'Bola Vôlei Praia',
    category: 'Equipamentos',
    price: 139.9,
    pointsPrice: 1300,
    image:
      'https://img.usecurling.com/p/400/400?q=beach%20volleyball%20ball&dpr=2',
    seller: 'Mikasa',
    rating: 4.9,
    description: 'Bola oficial de vôlei de praia.',
    images: [
      'https://img.usecurling.com/p/600/600?q=beach%20volleyball%20ball&dpr=2',
    ],
    modality: 'Vôlei',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: '18',
    name: 'Joelheira Pro Impact',
    category: 'Acessórios',
    price: 79.9,
    pointsPrice: 750,
    image: 'https://img.usecurling.com/p/400/400?q=black%20kneepads&dpr=2',
    seller: 'Asics',
    rating: 4.8,
    description: 'Proteção superior contra impactos.',
    images: ['https://img.usecurling.com/p/600/600?q=black%20kneepads&dpr=2'],
    modality: 'Vôlei',
    isPremium: false,
    availability: 'in_stock',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'DEFESA CIVIL: ALERTA DE TEMPESTADE',
    message:
      'Previsão de chuvas intensas e ventos fortes na sua região. Busque abrigo seguro e evite áreas abertas.',
    time: 'Agora',
    read: false,
    type: 'weather',
    priority: 'critical',
    date: 'Hoje',
  },
  {
    id: 'n2',
    title: 'Convite de Jogo',
    message:
      'Você foi convidado para a partida "Futebol de Quinta" na Arena XP.',
    time: '2h atrás',
    read: false,
    type: 'invite',
    priority: 'medium',
    link: '/events/e1',
    date: 'Hoje',
  },
  {
    id: 'n3',
    title: 'Parabéns! Nível 16',
    message:
      'Você subiu de nível! Continue evoluindo para desbloquear novas conquistas.',
    time: '5h atrás',
    read: true,
    type: 'level_up',
    priority: 'low',
    date: 'Hoje',
  },
  {
    id: 'n4',
    title: 'Bolsa de Estudos Compatível',
    message:
      'Nova oportunidade na University of Florida compatível com seu perfil.',
    time: '1d atrás',
    read: true,
    type: 'scholarship',
    priority: 'high',
    link: '/explore/scholarships/s1',
    date: 'Ontem',
  },
  {
    id: 'n5',
    title: 'Flamengo curtiu seu highlight',
    message: 'Seu vídeo "Golaço de falta" recebeu um like do clube.',
    time: '2d atrás',
    read: true,
    type: 'like',
    priority: 'low',
    date: '22 Out',
  },
]
export const mockNotificationsList = mockNotifications

export const mockChats = [
  {
    id: '1',
    user: {
      id: 'u2',
      name: 'Flamengo Oficial',
      avatar: 'https://img.usecurling.com/i?q=flamengo&color=red',
      online: true,
      type: 'Clube',
    },
    unread: 2,
    lastMessage: 'Confirmação do teste para a equipe sub-20.',
    time: '10:30',
    messages: [
      {
        id: 'm1',
        sender: 'me',
        text: 'Olá! Enviei meu vídeo de highlights. Conseguiram avaliar?',
        time: '09:15',
      },
      {
        id: 'm2',
        sender: 'them',
        text: 'Olá Alex. Sim, gostamos muito do material.',
        time: '10:28',
      },
      {
        id: 'm3',
        sender: 'them',
        text: 'Confirmação do teste para a equipe sub-20.',
        time: '10:30',
      },
    ],
  },
  {
    id: '2',
    user: {
      id: 'u3',
      name: 'Coach Carter',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=45',
      online: false,
      type: 'Treinador',
    },
    unread: 0,
    lastMessage: 'Foco na recuperação muscular hoje.',
    time: 'Ontem',
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: 'Grande jogo ontem! A movimentação foi excelente.',
        time: 'Ontem',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Obrigado Coach! Senti um pouco a perna no final.',
        time: 'Ontem',
      },
      {
        id: 'm3',
        sender: 'them',
        text: 'Foco na recuperação muscular hoje.',
        time: 'Ontem',
      },
    ],
  },
  {
    id: '3',
    user: {
      id: 'u4',
      name: 'Julia Santos',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=12',
      online: true,
      type: 'Atleta',
    },
    unread: 5,
    lastMessage: 'Vamos fechar aquele time para o campeonato?',
    time: 'Seg',
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: 'Vamos fechar aquele time para o campeonato?',
        time: 'Seg',
      },
    ],
  },
]

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
