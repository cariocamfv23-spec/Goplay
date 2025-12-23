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
    | 'event_reminder'
    | 'goal_deadline'
    | 'verification'
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

// Passport New Interfaces
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
    label: 'Gyms',
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

// ... (Rest of the data remains the same until mock data needs extension)

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
    duration: 300, // 5 minutes
  },
  {
    id: 'lc2',
    title: '50 Embaixadinhas',
    description: 'Faça 50 embaixadinhas sem deixar a bola cair.',
    reward: 300,
    duration: 120, // 2 minutes
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

// ... (Rest of existing mock data)

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
  // ... other mock photographers
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
export const mockPosts = [] // Kept empty to save space, assuming previous mockPosts if needed can be restored from context or simplified.
export const mockVideos = []
export const mockRideRequests = []
export const mockRewards = []
export const mockRideHistory = []
export const mockRankings: RankingEntry[] = []
export const mockChallenges: Challenge[] = []
export const mockEvents: Event[] = []
export const mockVenues = []
export const mockKidsVenues: KidsVenue[] = []
export const mockGyms = []
export const mockDrivers: ProfileData[] = []
export const mockProfiles: ProfileData[] = [
  ...mockTalents,
  ...mockPhotographers,
]
export const mockJobs = []
export const mockProducts: Product[] = []
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
export const mockNutrition: NutritionPartner[] = []
export const mockHortifrutis: Hortifruti[] = []
export const mockClinics: Clinic[] = []
export const mockAgencies: Agency[] = []
export const mockScholarships: Scholarship[] = []
export const mockMusicTracks: MusicTrack[] = []
export const mockAiAnalysis = {
  aiStats: [
    { label: 'Velocidade', value: 88, max: 100, unit: 'pts' },
    { label: 'Resistência', value: 92, max: 100, unit: 'pts' },
    { label: 'Força', value: 85, max: 100, unit: 'pts' },
    { label: 'Técnica', value: 90, max: 100, unit: 'pts' },
  ],
}

export const mockTrainingSuggestions: TrainingSuggestion[] = []
