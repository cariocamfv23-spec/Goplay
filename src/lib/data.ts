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
  CheckCircle,
  LayoutList,
  Flame,
  Shield,
  Award,
  Handshake,
  FileSignature,
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
    | 'event_reminder'
    | 'goal_deadline'
    | 'verification'
    | 'sponsorship_match'
    | 'kids_zone'
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
  type: 'athlete' | 'photographer' | 'driver' | 'club' | 'coach' | 'team'
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
  distance?: string
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
  totalViews?: number
  totalLikes?: number
  ranking?: number
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
  value: number
  accommodation: string
  documentation: string
  process: string
  fee: number
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
  linkedEvent?: string
  minAge: number
  maxAge: number
  hours: string
  periods: string[]
  capacity: string
  safetyProtocols: string[]
  monitorsList?: string[]
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

export interface NutritionPartner {
  id: string
  name: string
  specialty: string
  rating: number
  image: string
  price: string
  description: string
}

export interface Hortifruti {
  id: string
  name: string
  specialty: string
  rating: number
  image: string
  address: string
  description: string
  price: string
}

export interface Clinic {
  id: string
  name: string
  specialty: string
  address: string
  image: string
  rating: number
  price: string
  services: string[]
  description: string
}

export interface Competition {
  id: string
  name: string
  date: string
  role: string
  result?: string
  verified: boolean
  location: string
  organizer: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiry?: string
  verified: boolean
  credentialId?: string
}

export interface PassportGoal {
  id: string
  title: string
  targetDate: string
  status: 'pending' | 'in_progress' | 'achieved'
  category: string
}

export interface Championship {
  id: string
  name: string
  description: string
  modality: string
  status: 'draft' | 'open' | 'active' | 'completed'
  startDate?: string
  endDate?: string
  banner?: string
  rules?: string
  location?: string
}

export interface ChampionshipParticipant {
  id: string
  championshipId: string
  name: string
  teamName?: string
  status: 'pending' | 'approved' | 'rejected'
  avatar?: string
  contact?: string
}

export interface ChampionshipMatch {
  id: string
  championshipId: string
  round: string
  teamA: string
  teamB: string
  date: string
  time: string
  location: string
  scoreA?: number
  scoreB?: number
  status: 'scheduled' | 'live' | 'completed'
}

export interface LightningChallenge {
  id: string
  title: string
  description: string
  reward: number
  duration: number
}

export interface KidZone {
  id: string
  name: string
  location: string
  description: string
  ageGroup: string
  capacity: {
    current: number
    max: number
  }
  status: 'open' | 'closed' | 'full' | 'maintenance'
  activities: string[]
  monitors: string[]
  coordinates: { x: number; y: number }
  rules: string[]
  image: string
}

export interface Venue {
  id: string
  name: string
  type: string
  rating: number
  reviews: number
  distance: string
  location: string
  address: string
  image: string
  price: string
  amenities: string[]
  description: string
  openHours?: string
  coordinates?: { x: number; y: number }
}

export interface Gym {
  id: string
  name: string
  image: string
  rating: number
  address: string
  type: string
  price: string
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
  { id: 'futsal', label: 'Futsal', icon: Trophy },
  { id: 'bike', label: 'Bike', icon: Bike },
  { id: 'running', label: 'Corrida', icon: Footprints },
  { id: 'crossfit', label: 'Crossfit', icon: Dumbbell },
  { id: 'swimming', label: 'Natação', icon: Waves },
  { id: 'boxing', label: 'Boxe', icon: Hand },
  { id: 'climbing', label: 'Escalada', icon: Mountain },
  { id: 'martial_arts', label: 'Lutas', icon: Swords },
]

export const exploreCategories = [
  {
    id: 'sponsorship',
    label: 'Patrocínio',
    icon: Handshake,
    bg: 'bg-gold/20 dark:bg-gold/10',
    color: 'text-gold dark:text-gold',
  },
  {
    id: 'contracts',
    label: 'Contratos',
    icon: FileSignature,
    bg: 'bg-rose-100 dark:bg-rose-900/20',
    color: 'text-rose-600 dark:text-rose-400',
  },
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
    id: 'kids',
    label: 'Área Kids',
    icon: Baby,
    bg: 'bg-pink-100 dark:bg-pink-900/20',
    color: 'text-pink-600 dark:text-pink-400',
  },
  {
    id: 'photographers',
    label: 'Fotos',
    icon: Camera,
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    color: 'text-purple-600 dark:text-purple-400',
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
    id: 'drivers',
    label: 'Uber',
    icon: Car,
    bg: 'bg-green-100 dark:bg-green-900/20',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    id: 'gyms',
    label: 'Academia',
    icon: Dumbbell,
    bg: 'bg-red-100 dark:bg-red-900/20',
    color: 'text-red-600 dark:text-red-400',
  },
  {
    id: 'nutrition',
    label: 'Nutrição',
    icon: Apple,
    bg: 'bg-lime-100 dark:bg-lime-900/20',
    color: 'text-lime-600 dark:text-lime-400',
  },
  {
    id: 'clinics',
    label: 'Clínicas',
    icon: Stethoscope,
    bg: 'bg-teal-100 dark:bg-teal-900/20',
    color: 'text-teal-600 dark:text-teal-400',
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
  'Futebol',
  'Surfing',
  'Skate',
  'Eventos',
  'Motorsports',
  'Basquete',
  'Retrato',
  'Ação',
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

export const mockMatches = [
  {
    id: 'm1',
    teamName: 'Red Wolves FC',
    teamLogo: 'https://img.usecurling.com/i?q=wolf%20logo&color=red',
    modality: 'Futebol Society',
    location: 'Arena XP - Quadra 2',
    time: 'Hoje, 20:00',
    status: 'pending_checkin',
    players: [
      {
        id: 'p1',
        name: 'Alex Silva',
        avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
        status: 'confirmed',
        pointsEarned: 0,
        checkInTime: null,
      },
      {
        id: 'p2',
        name: 'Carlos Edu',
        avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=45',
        status: 'confirmed',
        pointsEarned: 50,
        checkInTime: '19:45',
      },
    ],
  },
]

export const mockLightningChallenges: LightningChallenge[] = [
  {
    id: 'lc1',
    title: 'Desafio do Travessão',
    description: 'Acerte o travessão em até 3 tentativas. Grave e poste!',
    reward: 500,
    duration: 300,
  },
  {
    id: 'lc2',
    title: '50 Embaixadinhas',
    description: 'Faça 50 embaixadinhas sem deixar a bola cair.',
    reward: 300,
    duration: 120,
  },
]

export const mockMusicTracks: MusicTrack[] = [
  {
    id: '1',
    title: 'Victory Anthem',
    artist: 'Epic Score',
    cover: 'https://img.usecurling.com/i?q=music%20notes&color=gold',
    duration: '3:45',
  },
  {
    id: '2',
    title: 'Urban Beat',
    artist: 'Street Flow',
    cover: 'https://img.usecurling.com/i?q=headphones&color=purple',
    duration: '2:30',
  },
  {
    id: '3',
    title: 'Focus & Grind',
    artist: 'Training Mode',
    cover: 'https://img.usecurling.com/i?q=gym&color=red',
    duration: '4:10',
  },
  {
    id: '4',
    title: 'Chill Vibes',
    artist: 'Sunset Lo-Fi',
    cover: 'https://img.usecurling.com/i?q=sunset&color=orange',
    duration: '3:15',
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

export const mockCompetitions: Competition[] = [
  {
    id: 'c1',
    name: 'Campeonato Paulista Amador',
    date: '15/05/2024',
    role: 'Atleta',
    result: 'Campeão',
    verified: true,
    location: 'São Paulo, SP',
    organizer: 'FPF',
  },
  {
    id: 'c2',
    name: 'Copa Regional de Futsal',
    date: '10/02/2024',
    role: 'Atleta',
    result: 'Vice-Campeão',
    verified: true,
    location: 'Campinas, SP',
    organizer: 'Liga Regional',
  },
  {
    id: 'c3',
    name: 'Torneio de Verão',
    date: '12/01/2024',
    role: 'Atleta',
    result: 'Semifinalista',
    verified: false,
    location: 'Santos, SP',
    organizer: 'Clube local',
  },
]

export const mockCertifications: Certification[] = [
  {
    id: 'cert1',
    name: 'Registro Federativo - FPF',
    issuer: 'Federação Paulista de Futebol',
    date: '01/01/2024',
    expiry: '01/01/2025',
    verified: true,
    credentialId: 'FPF-2024-8821',
  },
  {
    id: 'cert2',
    name: 'Curso de Primeiros Socorros',
    issuer: 'Cruz Vermelha',
    date: '15/06/2023',
    verified: false,
  },
]

export const mockPassportGoals: PassportGoal[] = [
  {
    id: 'pg1',
    title: 'Conquistar vaga em time profissional',
    targetDate: '31/12/2025',
    status: 'in_progress',
    category: 'Carreira',
  },
  {
    id: 'pg2',
    title: 'Atingir 100 partidas oficiais',
    targetDate: '30/06/2026',
    status: 'pending',
    category: 'Estatísticas',
  },
  {
    id: 'pg3',
    title: 'Ganhar MVP da temporada',
    targetDate: '15/12/2024',
    status: 'achieved',
    category: 'Conquistas',
  },
]

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
    totalViews: 15420,
    totalLikes: 3200,
    ranking: 1,
  },
  {
    id: 't2',
    name: 'Red Wolves FC',
    username: '@redwolves',
    type: 'team',
    location: 'São Paulo, SP',
    avatar: 'https://img.usecurling.com/i?q=wolf%20logo&color=red',
    cover: 'https://img.usecurling.com/p/800/400?q=stadium%20night&color=red',
    bio: 'Time de Futebol Society focado em alta performance e campeonatos regionais.',
    followers: '12.5k',
    rating: 4.9,
    sport: 'Futebol Society',
    stats: { matches: 120, wins: 85, mvp: 0 },
    totalViews: 45000,
    totalLikes: 8900,
    ranking: 3,
  },
  {
    id: 't3',
    name: 'Pedro Santos',
    username: '@pedros',
    type: 'athlete',
    age: 21,
    sport: 'Futsal',
    position: 'Fixo',
    height: '1.75m',
    weight: '72kg',
    rating: 4.6,
    location: 'Belo Horizonte, MG',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=67',
    cover: 'https://img.usecurling.com/p/800/400?q=futsal%20indoor&color=blue',
    bio: 'Fixo com ótima marcação e saída de bola.',
    followers: '3.1k',
    stats: { matches: 80, wins: 50, mvp: 8 },
    totalViews: 8200,
    totalLikes: 1500,
    ranking: 15,
  },
  {
    id: 't4',
    name: 'Blue Sharks',
    username: '@bluesharks',
    type: 'team',
    location: 'Rio de Janeiro, RJ',
    avatar: 'https://img.usecurling.com/i?q=shark%20logo&color=blue',
    cover: 'https://img.usecurling.com/p/800/400?q=ocean%20stadium&color=blue',
    bio: 'Equipe de Futevôlei competindo no circuito nacional.',
    followers: '8.2k',
    rating: 4.7,
    sport: 'Futevôlei',
    stats: { matches: 60, wins: 40, mvp: 0 },
    totalViews: 22000,
    totalLikes: 4100,
    ranking: 8,
  },
]

export const mockPhotographers: ProfileData[] = [
  {
    id: 'ph1',
    name: 'Ana Clara',
    username: '@anaclara.fotos',
    type: 'photographer',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=42',
    cover:
      'https://img.usecurling.com/p/800/400?q=surfing%20photographer&color=blue',
    bio: 'Especialista em fotografia de esportes aquáticos e eventos ao ar livre. Capturando a adrenalina do momento.',
    location: 'Florianópolis, SC',
    rating: 4.9,
    categories: ['Surfing', 'Eventos', 'Natureza', 'Ação'],
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=surfing%20action',
      'https://img.usecurling.com/p/300/300?q=beach%20volleyball',
      'https://img.usecurling.com/p/300/300?q=ocean%20waves',
    ],
    packages: [
      {
        title: 'Sessão Surf',
        price: 'R$ 250',
        description: '2 horas de cobertura na água com caixa estanque.',
      },
      {
        title: 'Evento Completo',
        price: 'R$ 800',
        description: 'Cobertura completa de campeonato (até 6 horas).',
      },
      {
        title: 'Ensaio Lifestyle',
        price: 'R$ 400',
        description: 'Fotos na praia para portfólio pessoal.',
      },
    ],
    portfolioProjects: [
      {
        id: 'pp1',
        title: 'WSL Saquarema 2024',
        date: 'Out 2024',
        cover:
          'https://img.usecurling.com/p/800/400?q=surfing%20competition&color=blue',
        description: 'Cobertura oficial da etapa brasileira do mundial.',
        images: [
          'https://img.usecurling.com/p/300/300?q=gabriel%20medina%20surf',
          'https://img.usecurling.com/p/300/300?q=surf%20crowd',
        ],
      },
    ],
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

export const mockStories = [
  {
    id: '1',
    user: {
      id: 'u3',
      name: 'Mariana',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=gym%20selfie&color=purple&dpr=2',
    viewed: false,
  },
  {
    id: '2',
    user: {
      id: 'u4',
      name: 'Carlos',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=soccer%20field%20sunset&color=orange&dpr=2',
    viewed: false,
  },
  {
    id: '3',
    user: {
      id: 'u5',
      name: 'Beatriz',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=23',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=healthy%20food%20bowl&color=green&dpr=2',
    viewed: true,
  },
  {
    id: '4',
    user: {
      id: 'u10',
      name: 'Rafael',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=78',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=tactical%20board%20soccer&color=blue&dpr=2',
    viewed: true,
  },
]

export const mockPosts = [
  {
    id: 1,
    type: 'video',
    user: {
      id: 'u3',
      name: 'Mariana Souza',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=12',
      type: 'Atleta',
    },
    content:
      'Treino intenso hoje! Focando na preparação física para o campeonato estadual. 🏋️‍♀️🔥 #NoPainNoGain #Fitness',
    media: [
      'https://img.usecurling.com/p/600/800?q=female%20athlete%20gym&color=purple',
    ],
    videoDuration: '0:45',
    title: 'Preparação Física 2024',
    hashtags: ['#Treino', '#Foco', '#Atleta'],
    likes: 245,
    comments: 18,
    shares: 5,
    applauds: 40,
    supports: 12,
    time: '2h',
    liked: true,
  },
  {
    id: 2,
    type: 'carousel',
    user: {
      id: 'u4',
      name: 'Carlos Eduardo',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=45',
      type: 'Treinador',
    },
    content:
      'Alguns registros da nossa vitória de ontem! Orgulho desse time que nunca desiste. ⚽️🏆',
    media: [
      'https://img.usecurling.com/p/600/600?q=soccer%20team%20celebration&color=blue',
      'https://img.usecurling.com/p/600/600?q=soccer%20coach%20shouting&color=blue',
      'https://img.usecurling.com/p/600/600?q=soccer%20trophy&color=gold',
    ],
    likes: 890,
    comments: 124,
    shares: 56,
    applauds: 120,
    supports: 80,
    time: '5h',
  },
  {
    id: 3,
    type: 'article',
    user: {
      id: 'goplay',
      name: 'Goplay News',
      avatar: 'https://img.usecurling.com/i?q=newspaper&color=blue',
      type: 'Oficial',
    },
    content:
      'Confira as novas regras para a temporada 2025 da Liga Nacional. Mudanças importantes na arbitragem de vídeo.',
    media: [
      'https://img.usecurling.com/p/800/400?q=referee%20var%20monitor&color=black',
    ],
    articleTitle: 'Novas Regras VAR 2025: O que muda?',
    articleDomain: 'goplay.sports',
    likes: 156,
    comments: 42,
    shares: 89,
    applauds: 20,
    supports: 10,
    time: '1d',
  },
  {
    id: 4,
    type: 'default',
    user: {
      id: 'u5',
      name: 'Beatriz Lima',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=23',
      type: 'Nutricionista',
    },
    content:
      'Dica rápida: A hidratação pré-treino é tão importante quanto durante o exercício. Bebam água! 💧🥦',
    media: [],
    likes: 320,
    comments: 15,
    shares: 22,
    applauds: 55,
    supports: 30,
    time: '1d',
  },
]

export const mockVideos = []
export const mockRideRequests = []
export const mockRewards = []
export const mockRideHistory = []
export const mockRankings: RankingEntry[] = []
export const mockChallenges: Challenge[] = []
export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Copa Regional de Futsal',
    category: 'Campeonato',
    date: '15 Mai',
    time: '09:00',
    location: 'Ginásio Municipal',
    address: 'Rua do Esporte, 100',
    image: 'https://img.usecurling.com/p/400/200?q=futsal%20court&color=blue',
    price: 50,
    description: 'Maior campeonato regional da temporada.',
    organizer: 'Liga Regional',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    id: 'e2',
    title: 'Maratona da Cidade',
    category: 'Corrida',
    date: '22 Jul',
    time: '07:00',
    location: 'Parque Ibirapuera',
    address: 'Av. Pedro Álvares Cabral',
    image:
      'https://img.usecurling.com/p/400/200?q=marathon%20runners&color=orange',
    price: 90,
    description: '42km de superação pelas ruas da cidade.',
    organizer: 'Corpore',
    city: 'São Paulo',
    state: 'SP',
  },
]
export const mockVenues: Venue[] = [
  {
    id: 'v1',
    name: 'Arena Beach',
    type: 'Futevôlei',
    rating: 4.8,
    reviews: 42,
    distance: '3.0 km',
    location: 'Barra Funda',
    address: 'Av. Marques, 100',
    image:
      'https://img.usecurling.com/p/600/400?q=beach%20volleyball&color=yellow',
    price: 'R$ 180/h',
    amenities: ['Ducha', 'Bar', 'Areia Fina', 'Iluminação'],
    description:
      'Quadra de areia oficial para futevôlei e beach tennis. Estrutura completa com bar e vestiários.',
    openHours: '06:00 - 23:00',
  },
  {
    id: 'v2',
    name: 'Futsal Pro',
    type: 'Futsal',
    rating: 4.9,
    reviews: 156,
    distance: '1.2 km',
    location: 'Centro',
    address: 'Rua Central, 50',
    image: 'https://img.usecurling.com/p/600/400?q=futsal%20indoor&color=blue',
    price: 'R$ 120/h',
    amenities: ['Vestiário', 'Wi-Fi', 'Arquibancada', 'Placar Eletrônico'],
    description:
      'Quadra de futsal profissional com dimensões oficiais (40x20m). Piso flutuante de alta performance.',
    openHours: '08:00 - 00:00',
  },
  {
    id: 'v3',
    name: 'Society Club',
    type: 'Society',
    rating: 4.6,
    reviews: 88,
    distance: '4.5 km',
    location: 'Zona Sul',
    address: 'Av. dos Bandeirantes, 2000',
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20field&color=green',
    price: 'R$ 220/h',
    amenities: ['Churrasqueira', 'Estacionamento', 'Bar', 'TV'],
    description:
      'Campo society com grama sintética monofilamento. Ideal para jogos com amigos e campeonatos amadores.',
    openHours: '07:00 - 23:00',
  },
  {
    id: 'v4',
    name: 'Ace Tennis',
    type: 'Tênis',
    rating: 4.9,
    reviews: 64,
    distance: '6.0 km',
    location: 'Jardins',
    address: 'Rua Oscar Freire, 1500',
    image: 'https://img.usecurling.com/p/600/400?q=tennis%20court&color=orange',
    price: 'R$ 250/h',
    amenities: ['Saibro', 'Aluguel de Raquetes', 'Professor', 'Loja'],
    description:
      'Quadras de saibro impecáveis. Ambiente exclusivo e aulas particulares disponíveis.',
    openHours: '06:00 - 22:00',
  },
  {
    id: 'v5',
    name: 'Padel Center',
    type: 'Padel',
    rating: 4.7,
    reviews: 32,
    distance: '2.5 km',
    location: 'Pinheiros',
    address: 'Rua dos Pinheiros, 800',
    image: 'https://img.usecurling.com/p/600/400?q=padel%20court&color=blue',
    price: 'R$ 200/h',
    amenities: ['Vidro Panorâmico', 'Bar', 'Lounge'],
    description:
      'O melhor clube de Padel da região. Quadras panorâmicas de última geração.',
    openHours: '07:00 - 23:00',
  },
  {
    id: 'v6',
    name: 'Street Court',
    type: 'Basquete',
    rating: 4.5,
    reviews: 120,
    distance: '8.0 km',
    location: 'Mooca',
    address: 'Rua da Mooca, 300',
    image:
      'https://img.usecurling.com/p/600/400?q=basketball%20court&color=orange',
    price: 'Gratuito',
    amenities: ['Iluminação', 'Área de Lazer', 'Bebedouro'],
    description:
      'Quadra pública de basquete 3x3 e inteira. Piso de concreto pintado e aros de fibra.',
    openHours: '24h',
  },
]
export const mockKidsVenues: KidsVenue[] = [
  {
    id: 'k1',
    name: 'Arena Kids Sports',
    image:
      'https://img.usecurling.com/p/400/300?q=kids%20soccer%20field&color=green',
    location: 'Centro Esportivo Norte',
    rating: 4.8,
    isFree: false,
    hasMonitors: true,
    activities: ['Futebol', 'Queimada', 'Gincanas'],
    description:
      'Espaço seguro com monitores especializados e diversas atividades esportivas para crianças de 4 a 12 anos. Ideal para deixar seus filhos enquanto você assiste aos jogos.',
    linkedEvent: 'Copa Regional de Futsal',
    minAge: 4,
    maxAge: 12,
    hours: '08:00 - 18:00',
    periods: ['morning', 'afternoon'],
    capacity: '30 crianças',
    safetyProtocols: [
      'Check-in Biométrico',
      'Monitoramento por Câmera',
      'Pulseira de Identificação',
      'Primeiros Socorros no Local',
    ],
    monitorsList: ['Ana Paula', 'Ricardo Santos'],
  },
  {
    id: 'k2',
    name: 'Complexo Esportivo da Juventude',
    image:
      'https://img.usecurling.com/p/400/300?q=playground%20park&color=blue',
    location: 'Parque da Cidade',
    rating: 4.5,
    isFree: true,
    hasMonitors: false,
    activities: ['Basquete', 'Skate', 'Parquinho'],
    description:
      'Área pública com quadras adaptadas e parquinho infantil. Ótimo para finais de semana em família.',
    linkedEvent: 'Torneio de Verão',
    minAge: 6,
    maxAge: 14,
    hours: '14:00 - 22:00',
    periods: ['afternoon', 'night'],
    capacity: 'Livre',
    safetyProtocols: ['Área Cercada', 'Iluminação Noturna'],
    monitorsList: [],
  },
  {
    id: 'k3',
    name: 'Clube do Sol - Área Kids',
    image: 'https://img.usecurling.com/p/400/300?q=kids%20pool&color=cyan',
    location: 'Zona Sul',
    rating: 4.9,
    isFree: false,
    hasMonitors: true,
    activities: ['Natação', 'Vôlei', 'Artes'],
    description:
      'Clube privado com área exclusiva para recreação infantil monitorada, incluindo piscina rasa e atividades artísticas.',
    minAge: 3,
    maxAge: 10,
    hours: '09:00 - 17:00',
    periods: ['morning', 'afternoon'],
    capacity: '20 crianças',
    safetyProtocols: [
      'Salva-vidas na Piscina',
      'Controle de Acesso',
      'Lanche Incluso',
    ],
    monitorsList: ['Carla Dias', 'Felipe Nunes'],
  },
]
export const mockGyms: Gym[] = [
  {
    id: 'g1',
    name: 'Ironberg CT',
    image:
      'https://img.usecurling.com/p/400/300?q=gym%20bodybuilding&color=black',
    rating: 5.0,
    address: 'Av. Paulista, 1000',
    type: 'Musculação',
    price: 'R$ 150/mês',
  },
  {
    id: 'g2',
    name: 'Smart Fit - Jardins',
    image: 'https://img.usecurling.com/p/400/300?q=gym%20cardio&color=yellow',
    rating: 4.5,
    address: 'Rua Augusta, 1500',
    type: 'Geral',
    price: 'R$ 119/mês',
  },
  {
    id: 'g3',
    name: 'Crossfit BlackSheep',
    image: 'https://img.usecurling.com/p/400/300?q=crossfit%20gym&color=red',
    rating: 4.8,
    address: 'Rua dos Pinheiros, 500',
    type: 'Crossfit',
    price: 'R$ 350/mês',
  },
]
export const mockDrivers: ProfileData[] = [
  {
    id: 'd1',
    name: 'Roberto Carlos',
    username: '@rcarlos',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=99',
    type: 'driver',
    rating: 4.9,
    distance: '1.2 km',
    cover: 'https://img.usecurling.com/p/800/400?q=city%20road&color=gray',
    bio: 'Motorista parceiro com foco em segurança e conforto.',
    location: 'São Paulo, SP',
    car: {
      model: 'Toyota Corolla',
      color: 'Prata',
      plate: 'ABC-1234',
      photo:
        'https://img.usecurling.com/p/400/300?q=toyota%20corolla&color=silver',
    },
    rides: 1540,
    responseTime: '3 min',
  },
  {
    id: 'd2',
    name: 'Maria Silva',
    username: '@msilva',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=88',
    type: 'driver',
    rating: 4.8,
    distance: '2.5 km',
    cover: 'https://img.usecurling.com/p/800/400?q=city%20night&color=blue',
    bio: 'Pontualidade e carro sempre limpo.',
    location: 'São Paulo, SP',
    car: {
      model: 'Honda Civic',
      color: 'Preto',
      plate: 'XYZ-9876',
      photo: 'https://img.usecurling.com/p/400/300?q=honda%20civic&color=black',
    },
    rides: 890,
    responseTime: '7 min',
  },
]
export const mockProfiles: ProfileData[] = [
  ...mockTalents,
  ...mockPhotographers,
  ...mockDrivers,
]
export const mockJobs = []
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Camisa Oficial Red Wolves',
    category: 'Vestuário',
    price: 129.9,
    pointsPrice: 2000,
    image:
      'https://img.usecurling.com/p/300/300?q=soccer%20jersey%20red&color=red',
    seller: 'Red Wolves Store',
    rating: 4.8,
    description:
      'Camisa oficial de jogo da temporada 2024. Tecido respirável de alta performance.',
    images: [
      'https://img.usecurling.com/p/300/300?q=soccer%20jersey%20red&color=red',
      'https://img.usecurling.com/p/300/300?q=soccer%20jersey%20back&color=red',
    ],
    modality: 'Futebol',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: 'p2',
    name: 'Chuteira Pro Speed X',
    category: 'Calçados',
    price: 499.9,
    pointsPrice: 8000,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20cleats&color=black',
    seller: 'Goplay Sports',
    rating: 4.9,
    description:
      'Chuteira profissional ultra leve para máxima velocidade em campo.',
    images: [
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats&color=black',
    ],
    modality: 'Futebol',
    isPremium: true,
    availability: 'low_stock',
  },
  {
    id: 'p3',
    name: 'Whey Protein Isolate',
    category: 'Suplementos',
    price: 189.9,
    pointsPrice: 3500,
    image: 'https://img.usecurling.com/p/300/300?q=whey%20protein&color=black',
    seller: 'NutriFit',
    rating: 4.7,
    description: 'Proteína isolada de rápida absorção. Sabor chocolate. 900g.',
    images: [
      'https://img.usecurling.com/p/300/300?q=whey%20protein&color=black',
      'https://img.usecurling.com/p/300/300?q=protein%20shake&color=brown',
    ],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: 'p4',
    name: 'Bola de Futebol Society',
    category: 'Equipamentos',
    price: 149.9,
    pointsPrice: 2500,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball&color=white',
    seller: 'Goplay Sports',
    rating: 4.5,
    description: 'Bola oficial com tecnologia de controle e durabilidade.',
    images: [
      'https://img.usecurling.com/p/300/300?q=soccer%20ball&color=white',
    ],
    modality: 'Futebol',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: 'p5',
    name: 'Tênis Running Boost',
    category: 'Calçados',
    price: 349.9,
    pointsPrice: 6000,
    image: 'https://img.usecurling.com/p/300/300?q=running%20shoes&color=blue',
    seller: 'Runners World',
    rating: 4.6,
    description: 'Amortecimento responsivo para corridas de longa distância.',
    images: [
      'https://img.usecurling.com/p/300/300?q=running%20shoes&color=blue',
    ],
    modality: 'Corrida',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: 'p6',
    name: 'Luva de Boxe Pro 14oz',
    category: 'Equipamentos',
    price: 229.9,
    pointsPrice: 4000,
    image: 'https://img.usecurling.com/p/300/300?q=boxing%20gloves&color=red',
    seller: 'Fight Club',
    rating: 4.8,
    description: 'Luvas de couro sintético reforçado para treino e sparring.',
    images: [
      'https://img.usecurling.com/p/300/300?q=boxing%20gloves&color=red',
    ],
    modality: 'Lutas',
    isPremium: false,
    availability: 'in_stock',
  },
  {
    id: 'p7',
    name: 'Smartwatch Sport GPS',
    category: 'Acessórios',
    price: 899.9,
    pointsPrice: 15000,
    image: 'https://img.usecurling.com/p/300/300?q=smartwatch&color=black',
    seller: 'Tech Sports',
    rating: 4.9,
    description: 'Monitoramento cardíaco, GPS integrado e resistência à água.',
    images: ['https://img.usecurling.com/p/300/300?q=smartwatch&color=black'],
    modality: 'Fitness',
    isPremium: true,
    availability: 'low_stock',
  },
  {
    id: 'p8',
    name: 'Mochila Térmica Training',
    category: 'Acessórios',
    price: 159.9,
    pointsPrice: 2800,
    image: 'https://img.usecurling.com/p/300/300?q=backpack&color=gray',
    seller: 'Goplay Sports',
    rating: 4.4,
    description: 'Compartimento para tênis e área térmica para alimentos.',
    images: ['https://img.usecurling.com/p/300/300?q=backpack&color=gray'],
    modality: 'Fitness',
    isPremium: false,
    availability: 'in_stock',
  },
]
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Match de Patrocínio!',
    message:
      'A Red Bull expressou interesse no seu perfil. Confira os detalhes.',
    time: '2 min',
    read: false,
    type: 'sponsorship_match',
    date: 'Hoje',
    priority: 'high',
    link: '/explore/sponsorship',
  },
  {
    id: 'n2',
    title: 'Nova Atividade Kids',
    message: 'O espaço "Arena Kids" abriu novas vagas para Futebol de Sabão.',
    time: '1 hora',
    read: false,
    type: 'kids_zone',
    date: 'Hoje',
    link: '/move/kids-map',
  },
  {
    id: 'n3',
    title: 'Evento Próximo',
    message: 'Faltam 2 dias para o Campeonato Regional. Prepare-se!',
    time: '3 horas',
    read: true,
    type: 'event_reminder',
    date: 'Hoje',
    priority: 'medium',
    link: '/events/e1',
  },
]
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
export const mockInternationalMatches: InternationalMatchOpponent[] = [
  {
    id: 'im1',
    opponentName: 'John Smith',
    country: 'USA',
    flag: 'https://img.usecurling.com/i?q=usa%20flag&color=red',
    level: 'Pro',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=101',
    rating: 4.8,
    status: 'online',
  },
  {
    id: 'im2',
    opponentName: 'Pierre Dubois',
    country: 'France',
    flag: 'https://img.usecurling.com/i?q=france%20flag&color=blue',
    level: 'Advanced',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=102',
    rating: 4.6,
    status: 'offline',
  },
]
export const mockInternationalRanking: InternationalRankingUser[] = [
  {
    id: 'ir1',
    position: 1,
    name: 'Carlos Santanna',
    country: 'Brazil',
    flag: 'https://img.usecurling.com/i?q=brazil%20flag&color=green',
    points: 2500,
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=103',
    trend: 'same',
  },
  {
    id: 'ir2',
    position: 2,
    name: 'Liam Miller',
    country: 'UK',
    flag: 'https://img.usecurling.com/i?q=uk%20flag&color=blue',
    points: 2450,
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=104',
    trend: 'up',
  },
]
export const mockOracle = {}
export const mockLiveEvents: LiveEvent[] = []
export const mockFuelTransactions = []
export const mockNutrition: NutritionPartner[] = [
  {
    id: 'n1',
    name: 'Dra. Julia Mendes',
    specialty: 'Nutrição Esportiva',
    rating: 4.9,
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=111',
    price: 'R$ 350',
    description:
      'Especialista em alta performance e suplementação para atletas.',
  },
  {
    id: 'n2',
    name: 'Dr. Marcos Nutri',
    specialty: 'Performance',
    rating: 4.7,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=112',
    price: 'R$ 300',
    description: 'Foco em ganho de massa muscular e definição.',
  },
]
export const mockHortifrutis: Hortifruti[] = [
  {
    id: 'h1',
    name: 'Hortifruti Natural',
    specialty: 'Orgânicos',
    rating: 4.8,
    image:
      'https://img.usecurling.com/p/400/300?q=fruits%20vegetables&color=green',
    address: 'Rua da Saúde, 123',
    description: 'Frutas e verduras frescas selecionadas diariamente.',
    price: 'R$ 50,00',
  },
  {
    id: 'h2',
    name: 'Green Life Market',
    specialty: 'Saudável',
    rating: 4.9,
    image:
      'https://img.usecurling.com/p/400/300?q=healthy%20market&color=green',
    address: 'Av. Brasil, 456',
    description: 'Produtos naturais, grãos e suplementos.',
    price: 'R$ 80,00',
  },
]
export const mockClinics: Clinic[] = [
  {
    id: 'cl1',
    name: 'Recovery Pro',
    specialty: 'Fisioterapia',
    address: 'Rua dos Pinheiros, 100',
    image:
      'https://img.usecurling.com/p/400/300?q=physiotherapy%20clinic&color=blue',
    rating: 4.8,
    price: 'R$ 200',
    services: ['Massagem', 'Crioterapia', 'Osteopatia'],
    description:
      'Clínica especializada em recuperação muscular e prevenção de lesões.',
  },
  {
    id: 'cl2',
    name: 'Sports Med',
    specialty: 'Medicina Esportiva',
    address: 'Av. Faria Lima, 2000',
    image: 'https://img.usecurling.com/p/400/300?q=sports%20clinic&color=white',
    rating: 5.0,
    price: 'R$ 450',
    services: ['Check-up', 'Ergoespirometria', 'Nutrologia'],
    description:
      'Centro de excelência em medicina do esporte para atletas de alto rendimento.',
  },
]
export const mockAgencies: Agency[] = [
  {
    id: 'a1',
    name: 'GoGlobal Sports',
    logo: 'https://img.usecurling.com/i?q=globe&color=blue',
    cover:
      'https://img.usecurling.com/p/800/400?q=university%20campus&color=blue',
    description:
      'Especialistas em bolsas esportivas para universidades nos EUA e Europa.',
    shortDescription: 'Bolsas esportivas internacionais.',
    services: ['Intercâmbio', 'Visto', 'Preparação'],
    location: 'São Paulo, SP',
    rating: 4.9,
    website: 'https://goglobal.com',
    email: 'contact@goglobal.com',
    phone: '+55 11 99999-9999',
    programs: [
      {
        title: 'Soccer Scholarship USA',
        description: 'Bolsas de até 100% para jogadores de futebol.',
      },
    ],
  },
  {
    id: 'a2',
    name: 'NextLevel Agency',
    logo: 'https://img.usecurling.com/i?q=rocket&color=red',
    cover: 'https://img.usecurling.com/p/800/400?q=meeting%20room&color=gray',
    description: 'Gestão de carreira para atletas profissionais e amadores.',
    shortDescription: 'Gestão de carreira e imagem.',
    services: ['Marketing', 'Contratos', 'Assessoria'],
    location: 'Rio de Janeiro, RJ',
    rating: 4.7,
    website: 'https://nextlevel.com',
    email: 'info@nextlevel.com',
    phone: '+55 21 98888-8888',
    programs: [
      {
        title: 'Pro Player Path',
        description: 'Mentoria para transição ao profissional.',
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
    neighborhood: 'Campus',
    sport: 'Futebol',
    logo: 'https://img.usecurling.com/i?q=university%20logo&color=orange',
    image:
      'https://img.usecurling.com/p/800/400?q=university%20stadium&color=orange',
    value: 100,
    accommodation: 'Dormitório no Campus',
    documentation: 'Passaporte, Histórico Escolar, TOEFL',
    process: 'Inscrição > Vídeo > Entrevista',
    fee: 150,
    deadline: '30/11',
  },
  {
    id: 's2',
    university: 'UCLA',
    country: 'USA',
    city: 'Los Angeles',
    neighborhood: 'Westwood',
    sport: 'Basquete',
    logo: 'https://img.usecurling.com/i?q=university%20crest&color=blue',
    image:
      'https://img.usecurling.com/p/800/400?q=basketball%20arena&color=blue',
    value: 80,
    accommodation: 'Apartamento Estudantil',
    documentation: 'Passaporte, SAT, Vídeo de Highlights',
    process: 'Showcase > Oferta > Assinatura',
    fee: 200,
    deadline: '15/01',
  },
  {
    id: 's3',
    university: 'University of Sydney',
    country: 'Australia',
    city: 'Sydney',
    sport: 'Rugby',
    logo: 'https://img.usecurling.com/i?q=shield&color=red',
    image: 'https://img.usecurling.com/p/800/400?q=rugby%20field&color=green',
    value: 50,
    accommodation: 'Auxílio Moradia',
    documentation: 'Visto de Estudante, IELTS',
    process: 'Aplicação Online > Teste Físico',
    fee: 100,
    deadline: '20/02',
  },
]

export const mockAiAnalysis = {
  aiStats: [
    { label: 'Velocidade', value: 88, max: 100, unit: 'pts' },
    { label: 'Resistência', value: 92, max: 100, unit: 'pts' },
    { label: 'Força', value: 85, max: 100, unit: 'pts' },
    { label: 'Técnica', value: 90, max: 100, unit: 'pts' },
  ],
}

export const mockTrainingSuggestions: TrainingSuggestion[] = []

export const mockKidZones: KidZone[] = [
  {
    id: 'kz1',
    name: 'Espaço Kids - Setor Norte',
    location: 'Próximo à entrada principal, ao lado da praça de alimentação.',
    description:
      'Área segura com gramado sintético, piscina de bolinhas e monitores especializados. Ideal para crianças pequenas.',
    ageGroup: '3 a 8 anos',
    capacity: {
      current: 12,
      max: 20,
    },
    status: 'open',
    activities: [
      'Piscina de Bolinhas',
      'Pintura Facial',
      'Contação de Histórias',
    ],
    monitors: ['Ana Paula', 'Ricardo Santos'],
    coordinates: { x: 30, y: 40 },
    rules: ['Obrigatório acompanhamento na entrada/saída', 'Sem sapatos'],
    image:
      'https://img.usecurling.com/p/400/300?q=kids%20play%20area&color=blue',
  },
  {
    id: 'kz2',
    name: 'Arena Teen - Setor Sul',
    location: 'Atrás das arquibancadas do setor sul.',
    description:
      'Espaço dedicado aos mais velhos com videogames, pebolim e mini-quadra de basquete.',
    ageGroup: '9 a 14 anos',
    capacity: {
      current: 28,
      max: 30,
    },
    status: 'full',
    activities: ['Videogames (FIFA)', 'Pebolim', 'Mini Basquete'],
    monitors: ['Carlos Eduardo'],
    coordinates: { x: 70, y: 60 },
    rules: ['Respeito aos colegas', 'Tempo limite nos jogos: 15 min'],
    image:
      'https://img.usecurling.com/p/400/300?q=arcade%20game%20room&color=purple',
  },
  {
    id: 'kz3',
    name: 'Berçário Vip',
    location: 'Camarotes - Nível 2',
    description:
      'Espaço tranquilo para descanso e amamentação, com trocadores e microondas.',
    ageGroup: '0 a 3 anos',
    capacity: {
      current: 2,
      max: 8,
    },
    status: 'open',
    activities: ['Área de Sono', 'Cantinho da Amamentação'],
    monitors: ['Enf. Júlia'],
    coordinates: { x: 50, y: 20 },
    rules: ['Apenas pais e bebês', 'Silêncio obrigatório'],
    image: 'https://img.usecurling.com/p/400/300?q=nursery%20room&color=pink',
  },
]
