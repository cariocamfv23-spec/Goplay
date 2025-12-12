import {
  ChartSpline,
  Store,
  Briefcase,
  Video,
  Home,
  Target,
  Trophy,
  Flag,
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

export const mockPosts = [
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
    time: '4h',
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
  {
    id: 3,
    name: 'Whey Protein Isolado',
    price: 'R$ 180,00',
    rating: 4.9,
    img: 'whey%20protein%20container',
    description: 'Suplemento de alta qualidade para recuperação muscular.',
    category: 'Nutrição',
    reviews: [],
  },
  {
    id: 4,
    name: 'Smartwatch Sport X',
    price: 'R$ 890,00',
    rating: 4.7,
    img: 'fitness%20smartwatch',
    description: 'Monitore seus treinos com precisão GPS e cardíaca.',
    category: 'Wearables',
    reviews: [],
  },
  {
    id: 5,
    name: 'Kit Pré-Treino Energia',
    price: 'R$ 89,90',
    rating: 4.8,
    img: 'pre%20workout%20powder',
    description:
      'Combo especial com cafeína e beta-alanina para máxima performance.',
    category: 'Nutrição',
    reviews: [],
  },
]

// Updated to represent Venues more broadly
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
  {
    id: 'v2',
    name: 'Quadra Society 10',
    price: 'R$ 200/h',
    rating: 4.6,
    img: 'artificial%20grass%20soccer%20field',
    lat: -23.5605,
    lng: -46.6433,
    address: 'Av. Paulista, 1000, São Paulo',
    amenities: ['Churrasqueira', 'Wi-Fi'],
    rules: ['Uso obrigatório de colete'],
    images: [
      'https://img.usecurling.com/p/600/400?q=artificial%20grass%20soccer%20field&dpr=2',
    ],
  },
]

// Re-export mockVenues as mockCourts for compatibility
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
  {
    id: 'g2',
    name: 'CrossFit High Pulse',
    location: 'Pinheiros, SP',
    rating: 4.8,
    img: 'crossfit%20box',
    plans: ['Mensal - R$ 250', 'Trimestral - R$ 220/mês'],
    amenities: ['Box Oficial', 'Coach Level 2'],
    benefits: ['Drop-in gratuito na primeira aula'],
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
  {
    id: 'n2',
    name: 'Hortifruti Fresco',
    location: 'Vila Mariana, SP',
    rating: 4.9,
    img: 'fresh%20fruits%20vegetables',
    specialties: ['Orgânicos', 'Sucos Detox'],
    discount: 'Entrega grátis na primeira compra',
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
  {
    id: 'c2',
    name: 'Clínica Ortopédica Avançada',
    location: 'Perdizes, SP',
    rating: 4.8,
    img: 'orthopedic%20clinic',
    services: ['Consulta Ortopédica', 'Raio-X', 'Infiltração'],
    insurance: ['SulAmérica', 'Porto Seguro'],
    recoveryPlan: false,
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
  packages?: { title: string; price: string; description: string }[]

  // Driver specific
  car?: { model: string; plate: string; color: string; photo: string }
  rides?: number

  // Nutritionist/Physio specific
  clinic?: string
  crn?: string
  crefito?: string
}

export const mockBadges: BadgeData[] = [
  { id: '1', name: 'Artilheiro', icon: 'Target', color: 'text-red-500' },
  { id: '2', name: 'MVP', icon: 'Trophy', color: 'text-yellow-500' },
  { id: '3', name: 'Líder', icon: 'Flag', color: 'text-blue-500' },
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
    badges: [mockBadges[0], mockBadges[1]],
    stats: [
      { label: 'Jogos', value: '89' },
      { label: 'Gols', value: '34' },
    ],
    history: [
      {
        year: '2023',
        team: 'São Paulo FC Base',
        description: 'Campeão Sub-17',
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
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=sports%20photo%20action',
      'https://img.usecurling.com/p/300/300?q=sports%20portrait',
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
  {
    id: '7',
    type: 'physiotherapist',
    name: 'Dr. Marcos Physio',
    username: '@marcos.fisio',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=67',
    cover:
      'https://img.usecurling.com/p/800/300?q=physiotherapy%20clinic&dpr=2',
    bio: 'Especialista em recuperação de atletas de alto rendimento.',
    location: 'Rio de Janeiro, RJ',
    followers: '1.8k',
    following: '250',
    rating: 4.9,
    clinic: 'Rehab Center',
    crefito: '123456-F',
    specialties: ['Lesões de Joelho', 'Recovery', 'Osteopatia'],
    pricing: 'R$ 200,00 / sessão',
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
  {
    id: '6',
    name: 'Carla Dias',
    points: 880,
    rank: 4,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
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
  {
    id: 'group-1',
    name: 'Pelada de Quinta',
    avatar:
      'https://img.usecurling.com/i?q=soccer%20ball&shape=fill&color=green',
    type: 'group',
    lastMessage: 'João: Quem vai?',
    lastMessageTime: '09:15',
    unreadCount: 5,
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
  {
    id: 'req-2',
    passenger: {
      name: 'Pedro Santos',
      rating: 4.7,
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=33',
    },
    pickup: 'Av. Paulista, 1000',
    dropoff: 'Aeroporto Congonhas',
    distance: '8.0 km',
    price: 'R$ 35,50',
    time: '12 min',
  },
]

export const mockRideHistory = [
  {
    id: 'hist-1',
    date: 'Hoje, 10:30',
    passenger: 'Lucas Oliveira',
    price: 'R$ 22,90',
    rating: 5,
    pickup: 'Shopping Center',
    dropoff: 'Rua Augusta, 500',
  },
  {
    id: 'hist-2',
    date: 'Ontem, 18:45',
    passenger: 'Maria Souza',
    price: 'R$ 18,50',
    rating: 5,
    pickup: 'Estação Metrô',
    dropoff: 'Condomínio Parque',
  },
  {
    id: 'hist-3',
    date: 'Ontem, 14:20',
    passenger: 'João Pedro',
    price: 'R$ 45,00',
    rating: 4,
    pickup: 'Aeroporto',
    dropoff: 'Hotel Central',
  },
]
