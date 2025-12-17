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
  type: 'challenge' | 'invite' | 'system' | 'like' | 'weather' | 'level_up'
  date?: string
  priority?: 'low' | 'medium' | 'high' | 'critical'
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
  {
    id: 'nutrition',
    label: 'Nutri',
    icon: Apple,
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    color: 'text-yellow-600 dark:text-yellow-400',
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
    favoriteSong: mockMusicTracks[1],
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
  {
    id: 'te2',
    date: 'Ontem',
    fullDate: '23 Outubro, 2024',
    type: 'ai_insight',
    title: 'Evolução Técnica Detectada',
    description:
      'Sua precisão de passe aumentou 15% nas últimas 3 partidas. A IA recomenda manter o treino de passes longos.',
    stats: [{ label: 'Precisão', value: '92%' }],
  },
  {
    id: 'te3',
    date: '20 Out',
    fullDate: '20 Outubro, 2024',
    type: 'achievement',
    title: 'MVP da Rodada',
    description:
      'Eleito o melhor jogador da partida pela comunidade e organizadores.',
    image:
      'https://img.usecurling.com/p/400/200?q=trophy%20winner&color=yellow',
  },
  {
    id: 'te4',
    date: '18 Out',
    fullDate: '18 Outubro, 2024',
    type: 'training',
    title: 'Treino de Velocidade',
    description: 'Sessão focada em sprints curtos e agilidade.',
    stats: [
      { label: 'Duração', value: '45m' },
      { label: 'Calorias', value: 420 },
    ],
  },
  {
    id: 'te5',
    date: '15 Out',
    fullDate: '15 Outubro, 2024',
    type: 'milestone',
    title: '50 Partidas Jogadas',
    description:
      'Parabéns! Você alcançou a marca de 50 jogos registrados na plataforma.',
    image: 'https://img.usecurling.com/p/400/200?q=gold%20medal',
  },
  {
    id: 'te6',
    date: '10 Out',
    fullDate: '10 Outubro, 2024',
    type: 'match',
    title: 'Amistoso vs Time B',
    description: 'Jogo equilibrado, empate em 2x2.',
    stats: [{ label: 'Rating', value: 7.2 }],
  },
  {
    id: 'te7',
    date: '05 Out',
    fullDate: '05 Outubro, 2024',
    type: 'ai_insight',
    title: 'Novo Recorde Pessoal',
    description: 'Você atingiu sua velocidade máxima histórica: 32km/h.',
    stats: [{ label: 'Velocidade', value: '32km/h' }],
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
    modality: 'futebol',
    user: {
      name: 'Escola de Futebol',
      avatar: 'https://img.usecurling.com/i?q=soccer&color=black',
    },
    music: mockMusicTracks[3],
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
    modality: 'crossfit',
    user: {
      name: 'Coach Pro',
      avatar: 'https://img.usecurling.com/i?q=dumbbell&color=red',
    },
    music: mockMusicTracks[1],
  },
  {
    id: 'v3',
    title: 'Downhill Extremo',
    description: 'Descida radical na montanha',
    thumbnail:
      'https://img.usecurling.com/p/400/800?q=mountain%20bike&color=orange',
    duration: '03:15',
    views: '85K',
    likes: '8K',
    comments: 210,
    shares: 450,
    modality: 'bike',
    user: {
      name: 'Radical Sports',
      avatar: 'https://img.usecurling.com/i?q=bike&color=blue',
    },
    music: mockMusicTracks[4],
  },
  {
    id: 'v4',
    title: 'Sprints de Velocidade',
    description: 'Melhore sua arrancada com esses exercícios',
    thumbnail:
      'https://img.usecurling.com/p/400/800?q=sprinter%20running&color=cyan',
    duration: '05:40',
    views: '32K',
    likes: '2.5K',
    comments: 90,
    shares: 120,
    modality: 'running',
    user: {
      name: 'Runners Club',
      avatar: 'https://img.usecurling.com/i?q=shoe&color=orange',
    },
    music: mockMusicTracks[5],
  },
  {
    id: 'v5',
    title: 'Natação: Técnica de Crawl',
    description: 'Ajustes para nadar mais rápido',
    thumbnail:
      'https://img.usecurling.com/p/400/800?q=swimmer%20underwater&color=blue',
    duration: '08:20',
    views: '45K',
    likes: '3.8K',
    comments: 150,
    shares: 280,
    modality: 'swimming',
    user: {
      name: 'Swim Life',
      avatar: 'https://img.usecurling.com/i?q=water&color=blue',
    },
  },
  {
    id: 'v6',
    title: 'Escalada Indoor: Dicas',
    description: 'Como começar no boulder',
    thumbnail:
      'https://img.usecurling.com/p/400/800?q=indoor%20climbing&color=gray',
    duration: '12:00',
    views: '28K',
    likes: '1.9K',
    comments: 60,
    shares: 90,
    modality: 'climbing',
    user: {
      name: 'Climb ON',
      avatar: 'https://img.usecurling.com/i?q=mountain&color=green',
    },
  },
  {
    id: 'v7',
    title: 'Boxe: Jab Direto',
    description: 'A combinação básica perfeita',
    thumbnail:
      'https://img.usecurling.com/p/400/800?q=boxing%20training&color=red',
    duration: '06:30',
    views: '60K',
    likes: '6K',
    comments: 200,
    shares: 300,
    modality: 'boxing',
    user: {
      name: 'Fight Center',
      avatar: 'https://img.usecurling.com/i?q=glove&color=red',
    },
    music: mockMusicTracks[1],
  },
  {
    id: 'v8',
    title: 'Jiu-Jitsu: Armlock Voador',
    description: 'Técnica de finalização surpresa',
    thumbnail: 'https://img.usecurling.com/p/400/800?q=jiu%20jitsu&color=blue',
    duration: '01:45',
    views: '15K',
    likes: '1.2K',
    comments: 45,
    shares: 30,
    modality: 'martial_arts',
    user: {
      name: 'BJJ Masters',
      avatar: 'https://img.usecurling.com/i?q=kimono&color=white',
    },
  },
  {
    id: 'v9',
    title: 'BMX Freestyle Park',
    description: 'Manobras radicais na pista',
    thumbnail: 'https://img.usecurling.com/p/400/800?q=bmx%20bike&color=yellow',
    duration: '04:20',
    views: '22K',
    likes: '3K',
    comments: 110,
    shares: 150,
    modality: 'bike',
    user: {
      name: 'BMX Pro',
      avatar: 'https://img.usecurling.com/i?q=bike&color=yellow',
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
    image: 'https://img.usecurling.com/p/400/200?q=fuel%20station&color=orange',
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
    weather: { temp: 24, condition: 'cloudy', humidity: 65, windSpeed: 12 },
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
    weather: { temp: 18, condition: 'sunny', humidity: 45, windSpeed: 8 },
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
    weather: { temp: 21, condition: 'windy', humidity: 60, windSpeed: 25 },
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
    weather: { temp: 26, condition: 'sunny', humidity: 40, windSpeed: 5 },
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
    weather: { temp: 22, condition: 'rainy', humidity: 85, windSpeed: 10 },
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
    weather: { temp: 15, condition: 'storm', humidity: 90, windSpeed: 45 },
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

export const mockKidsVenues: KidsVenue[] = [
  {
    id: 'k1',
    name: 'Arena Kids Sports',
    image:
      'https://img.usecurling.com/p/600/400?q=kids%20sports%20playground&color=blue',
    location: 'Vila Olímpia, SP',
    rating: 4.8,
    isFree: true,
    hasMonitors: true,
    activities: ['Futebol de Sabão', 'Pula-Pula', 'Pintura Facial'],
    description:
      'Espaço completo para pais praticarem esportes enquanto os filhos se divertem com segurança.',
  },
  {
    id: 'k2',
    name: 'Complexo Esportivo Família',
    image:
      'https://img.usecurling.com/p/600/400?q=playground%20park&color=green',
    location: 'Pinheiros, SP',
    rating: 4.5,
    isFree: false,
    hasMonitors: true,
    activities: ['Gincana Esportiva', 'Oficina de Artes'],
    description: 'Monitores especializados e área kids climatizada.',
  },
  {
    id: 'k3',
    name: 'Clube do Sol',
    image: 'https://img.usecurling.com/p/600/400?q=kids%20playing&color=yellow',
    location: 'Morumbi, SP',
    rating: 4.7,
    isFree: true,
    hasMonitors: false,
    activities: ['Playground Aberto', 'Caixa de Areia'],
    description:
      'Área kids ao ar livre, perfeita para dias de sol. Pais responsáveis pela supervisão.',
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
  {
    id: 'not3',
    title: 'Alerta de Tempestade',
    message:
      'Tempestade severa prevista para o horário do seu jogo. Considere reagendar.',
    time: 'Agora',
    read: false,
    type: 'weather',
    date: 'Hoje',
    priority: 'critical',
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

export const mockTrainingEvents = [
  {
    id: 'te1',
    title: 'Treino de Pernas',
    date: new Date(),
    type: 'training',
    completed: true,
  },
  {
    id: 'te2',
    title: 'Jogo vs Time B',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    type: 'match',
    completed: false,
  },
]

export const mockProfileViewers: ProfileViewer[] = [
  {
    id: 'v1',
    name: 'Carlos Olheiro',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=40',
    type: 'Scout',
    date: 'Hoje',
    time: '14:30',
  },
  {
    id: 'v2',
    name: 'Roberto Técnico',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=41',
    type: 'Treinador',
    date: 'Hoje',
    time: '10:15',
  },
  {
    id: 'v3',
    name: 'Julia Agente',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=42',
    type: 'Agente',
    date: 'Ontem',
    time: '18:45',
  },
  {
    id: 'v4',
    name: 'Marcelo Clube',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=43',
    type: 'Recrutador',
    date: 'Ontem',
    time: '09:00',
  },
  {
    id: 'v5',
    name: 'Ana Esportes',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=44',
    type: 'Atleta',
    date: '2 dias atrás',
    time: '11:20',
  },
]

export const mockGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Melhorar Velocidade',
    category: 'physical',
    metric: 'Velocidade Máxima',
    currentValue: 28,
    targetValue: 32,
    unit: 'km/h',
    deadline: '2024-12-31',
    status: 'active',
    createdAt: '2024-10-01',
    progress: 70,
  },
  {
    id: 'g2',
    title: 'Aumentar Resistência',
    category: 'physical',
    metric: 'VO2 Max',
    currentValue: 45,
    targetValue: 55,
    unit: 'ml/kg/min',
    deadline: '2025-01-15',
    status: 'active',
    createdAt: '2024-10-10',
    progress: 40,
  },
  {
    id: 'g3',
    title: 'Precisão de Passes',
    category: 'technical',
    metric: 'Taxa de Acerto',
    currentValue: 85,
    targetValue: 95,
    unit: '%',
    deadline: '2024-11-30',
    status: 'completed',
    createdAt: '2024-09-01',
    progress: 100,
  },
]

export const mockInternationalMatches: InternationalMatchOpponent[] = [
  {
    id: 'im1',
    opponentName: 'John Smith',
    country: 'USA',
    flag: 'https://img.usecurling.com/i?q=usa%20flag',
    level: 'Pro',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=88',
    rating: 4.8,
    status: 'online',
  },
  {
    id: 'im2',
    opponentName: 'Pierre Dubois',
    country: 'France',
    flag: 'https://img.usecurling.com/i?q=france%20flag',
    level: 'Amateur',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=89',
    rating: 4.5,
    status: 'offline',
  },
  {
    id: 'im3',
    opponentName: 'Hans Müller',
    country: 'Germany',
    flag: 'https://img.usecurling.com/i?q=germany%20flag',
    level: 'Pro',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=90',
    rating: 4.9,
    status: 'online',
  },
  {
    id: 'im4',
    opponentName: 'Yuki Tanaka',
    country: 'Japan',
    flag: 'https://img.usecurling.com/i?q=japan%20flag',
    level: 'Semi-Pro',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=91',
    rating: 4.7,
    status: 'offline',
  },
]

export const mockInternationalRanking: InternationalRankingUser[] = [
  {
    id: 'ir1',
    position: 1,
    name: 'Carlos Silva',
    country: 'Brasil',
    flag: 'https://img.usecurling.com/i?q=brazil%20flag',
    points: 2500,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    trend: 'up',
  },
  {
    id: 'ir2',
    position: 2,
    name: 'John Smith',
    country: 'USA',
    flag: 'https://img.usecurling.com/i?q=usa%20flag',
    points: 2450,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=88',
    trend: 'same',
  },
  {
    id: 'ir3',
    position: 3,
    name: 'Hans Müller',
    country: 'Germany',
    flag: 'https://img.usecurling.com/i?q=germany%20flag',
    points: 2300,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=90',
    trend: 'up',
  },
  {
    id: 'ir4',
    position: 4,
    name: 'Pierre Dubois',
    country: 'France',
    flag: 'https://img.usecurling.com/i?q=france%20flag',
    points: 2100,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=89',
    trend: 'down',
  },
  {
    id: 'ir5',
    position: 5,
    name: 'Yuki Tanaka',
    country: 'Japan',
    flag: 'https://img.usecurling.com/i?q=japan%20flag',
    points: 1950,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=91',
    trend: 'same',
  },
]

export const mockOracle = {
  potentialIndex: 94,
  predictedPosition: 'Meia-Atacante Profissional',
  comparisonData: [
    { subject: 'Técnica', A: 85, fullMark: 100 },
    { subject: 'Físico', A: 92, fullMark: 100 },
    { subject: 'Tática', A: 78, fullMark: 100 },
    { subject: 'Mental', A: 88, fullMark: 100 },
  ],
  futureSkills: [
    { name: 'Visão de Jogo', current: 75, projected: 92 },
    { name: 'Finalização', current: 80, projected: 95 },
    { name: 'Resistência', current: 70, projected: 88 },
  ],
}

export const mockLiveEvents: LiveEvent[] = [
  {
    id: 'le1',
    title: 'Flamengo vs Palmeiras',
    championship: 'Brasileirão Série A',
    modality: 'futebol',
    city: 'Rio de Janeiro',
    status: 'live',
    viewers: '2.4M',
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20match&color=red',
    score: '2 - 1',
  },
  {
    id: 'le2',
    title: 'UFC 300: Main Event',
    championship: 'UFC',
    modality: 'lutas',
    city: 'Las Vegas',
    status: 'live',
    viewers: '5.1M',
    image: 'https://img.usecurling.com/p/600/400?q=ufc%20fight&color=red',
    score: 'Round 3',
  },
  {
    id: 'le3',
    title: 'Final da Superliga',
    championship: 'Superliga de Vôlei',
    modality: 'outros',
    city: 'Belo Horizonte',
    status: 'live',
    viewers: '800K',
    image: 'https://img.usecurling.com/p/600/400?q=volleyball&color=yellow',
    score: 'Set 4',
  },
  {
    id: 'le4',
    title: 'WSL Saquarema',
    championship: 'World Surf League',
    modality: 'surf',
    city: 'Saquarema',
    status: 'upcoming',
    viewers: '0',
    image: 'https://img.usecurling.com/p/600/400?q=surfing&color=blue',
    startTime: '14:00',
  },
  {
    id: 'le5',
    title: 'Nadal vs Alcaraz',
    championship: 'Roland Garros',
    modality: 'tênis',
    city: 'Paris',
    status: 'live',
    viewers: '3.2M',
    image: 'https://img.usecurling.com/p/600/400?q=tennis%20match&color=orange',
    score: 'Set 2 (4-3)',
  },
  {
    id: 'le6',
    title: 'Magnus Futsal vs Corinthians',
    championship: 'LNF',
    modality: 'futsal',
    city: 'Sorocaba',
    status: 'live',
    viewers: '150K',
    image: 'https://img.usecurling.com/p/600/400?q=futsal&color=blue',
    score: '3 - 3',
  },
  {
    id: 'le7',
    title: 'Popó vs Bambam',
    championship: 'Fight Music Show',
    modality: 'boxe',
    city: 'São Paulo',
    status: 'ended',
    viewers: '10M',
    image: 'https://img.usecurling.com/p/600/400?q=boxing&color=black',
    score: 'KO Round 1',
  },
]

export const mockFuelTransactions = [
  {
    id: 'ft1',
    title: 'Copa Goplay - Final',
    type: 'deposit',
    amount: 150.0,
    date: 'Hoje, 09:00',
    description: 'Auxílio Combustível',
  },
  {
    id: 'ft2',
    title: 'Posto Shell',
    type: 'spend',
    amount: 50.0,
    date: 'Ontem, 18:45',
    description: 'Abastecimento',
  },
  {
    id: 'ft3',
    title: 'Time Eagles',
    type: 'deposit',
    amount: 80.0,
    date: '20 Out',
    description: 'Reembolso Viagem',
  },
]
