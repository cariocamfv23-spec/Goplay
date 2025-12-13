import {
  CreditCard,
  History,
  Trophy,
  Users,
  Wallet,
  Star,
  Calendar,
  MapPin,
  Video,
  Camera,
  Dumbbell,
  HeartPulse,
  Stethoscope,
  Briefcase,
  MessageSquare,
  Car,
  Ticket,
} from 'lucide-react'

export interface User {
  id: string
  name: string
  username: string
  role: 'athlete' | 'coach' | 'scout' | 'photographer' | 'driver' | 'fan'
  avatar: string
  level: number
  location: string
  stats?: {
    matches: number
    wins: number
    mvp: number
    rating: number
  }
}

export const mockProfiles: User[] = [
  {
    id: '1',
    name: 'Alex Silva',
    username: '@alexsilva',
    role: 'athlete',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
    level: 12,
    location: 'São Paulo, SP',
    stats: { matches: 45, wins: 32, mvp: 5, rating: 8.5 },
  },
  {
    id: '2',
    name: 'Coach Mike',
    username: '@coachmike',
    role: 'coach',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=2',
    level: 25,
    location: 'Rio de Janeiro, RJ',
    stats: { matches: 150, wins: 90, mvp: 0, rating: 9.2 },
  },
  {
    id: '3',
    name: 'Sarah Photo',
    username: '@sarahlens',
    role: 'photographer',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=3',
    level: 8,
    location: 'Curitiba, PR',
    stats: { matches: 200, wins: 0, mvp: 0, rating: 4.9 },
  },
  {
    id: '4',
    name: 'Dr. João',
    username: '@drjoao',
    role: 'fan',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    level: 5,
    location: 'São Paulo, SP',
  },
  {
    id: '5',
    name: 'Carlos Driver',
    username: '@carlosdriver',
    role: 'driver',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=5',
    level: 15,
    location: 'São Paulo, SP',
  },
]

export const mockMatches = [
  {
    id: '1',
    date: '2024-03-20T19:00:00',
    location: 'Arena Neo Química',
    address: 'Av. Miguel Ignácio Curi, 111',
    status: 'scheduled',
    type: 'Friendly',
    price: 25.0,
    teamA: {
      name: 'Red Dragons',
      score: null,
      logo: 'https://img.usecurling.com/i?q=dragon&color=red&shape=outline',
    },
    teamB: {
      name: 'Blue Knights',
      score: null,
      logo: 'https://img.usecurling.com/i?q=shield&color=blue&shape=outline',
    },
    players: 22,
    maxPlayers: 24,
  },
  {
    id: '2',
    date: '2024-03-18T20:00:00',
    location: 'Centro Esportivo SP',
    address: 'Rua das Flores, 123',
    status: 'finished',
    type: 'League',
    price: 30.0,
    teamA: {
      name: 'Thunder FC',
      score: 3,
      logo: 'https://img.usecurling.com/i?q=thunder&color=yellow&shape=fill',
    },
    teamB: {
      name: 'Storm United',
      score: 1,
      logo: 'https://img.usecurling.com/i?q=cloud&color=gray&shape=fill',
    },
    players: 24,
    maxPlayers: 24,
    mvp: 'Alex Silva',
  },
]

export const mockLightningChallenges = [
  {
    id: '1',
    title: 'Desafio do Travessão',
    description: 'Acerte o travessão 3 vezes consecutivas.',
    reward: '500 XP',
    coins: 50,
    timeLeft: '2h 30m',
    participants: 124,
    difficulty: 'Medium',
    image: 'https://img.usecurling.com/p/300/200?q=soccer%20goal',
  },
  {
    id: '2',
    title: 'Sprint 100m',
    description: 'Complete 100m em menos de 12s.',
    reward: '1000 XP',
    coins: 100,
    timeLeft: '5h 00m',
    participants: 89,
    difficulty: 'Hard',
    image: 'https://img.usecurling.com/p/300/200?q=running%20track',
  },
  {
    id: '3',
    title: 'Embaixadinhas',
    description: 'Faça 50 embaixadinhas sem deixar cair.',
    reward: '300 XP',
    coins: 30,
    timeLeft: '12h',
    participants: 342,
    difficulty: 'Easy',
    image: 'https://img.usecurling.com/p/300/200?q=juggling%20ball',
  },
]

export const mockPointsHistory = [
  {
    id: '1',
    date: '2024-03-19',
    title: 'Vitória na Partida',
    description: 'Venceu contra Storm United',
    points: 150,
    type: 'earned',
    icon: Trophy,
  },
  {
    id: '2',
    date: '2024-03-18',
    title: 'Check-in Diário',
    description: 'Sequência de 5 dias',
    points: 50,
    type: 'earned',
    icon: Calendar,
  },
  {
    id: '3',
    date: '2024-03-17',
    title: 'Compra na Loja',
    description: 'Novo uniforme',
    points: -500,
    type: 'spent',
    icon: Wallet,
  },
  {
    id: '4',
    date: '2024-03-16',
    title: 'MVP da Partida',
    description: 'Eleito melhor jogador',
    points: 300,
    type: 'earned',
    icon: Star,
  },
]

export const mockComparisonStats = [
  {
    label: 'Velocidade',
    user: 85,
    average: 70,
    top: 95,
    unit: 'km/h',
  },
  {
    label: 'Resistência',
    user: 78,
    average: 65,
    top: 92,
    unit: 'VO2',
  },
  {
    label: 'Força',
    user: 72,
    average: 60,
    top: 90,
    unit: 'kg',
  },
  {
    label: 'Técnica',
    user: 88,
    average: 68,
    top: 96,
    unit: 'pts',
  },
  {
    label: 'Tática',
    user: 80,
    average: 62,
    top: 94,
    unit: 'IQ',
  },
]

export const mockPhotographerTransactions = [
  {
    id: 'TRX-001',
    date: '2024-03-15',
    client: 'Liga Amadora SP',
    description: 'Cobertura Final Regional',
    amount: 450.0,
    status: 'completed',
    paymentMethod: 'Pix',
  },
  {
    id: 'TRX-002',
    date: '2024-03-12',
    client: 'Escolinha do Zé',
    description: 'Fotos Individuais Alunos',
    amount: 800.0,
    status: 'completed',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'TRX-003',
    date: '2024-03-10',
    client: 'João Silva',
    description: 'Book Pessoal Atleta',
    amount: 250.0,
    status: 'processing',
    paymentMethod: 'Pix',
  },
  {
    id: 'TRX-004',
    date: '2024-03-08',
    client: 'Torneio Interclubes',
    description: 'Pacote 10 Fotos',
    amount: 150.0,
    status: 'failed',
    paymentMethod: 'Debit Card',
  },
]

export const mockPosts = [
  {
    id: '1',
    user: mockProfiles[0],
    content:
      'Grande jogo hoje! Conseguimos a vitória nos últimos minutos. #Futebol #Vitória',
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20celebration',
    likes: 124,
    comments: 18,
    time: '2h atrás',
    liked: true,
  },
  {
    id: '2',
    user: mockProfiles[1],
    content: 'Treino tático intenso visando o próximo campeonato. Foco total!',
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20training',
    likes: 89,
    comments: 12,
    time: '5h atrás',
    liked: false,
  },
]

export const mockStories = [
  {
    id: 1,
    user: mockProfiles[0],
    image: 'https://img.usecurling.com/p/400/600?q=stadium%20selfie',
    viewed: false,
  },
  {
    id: 2,
    user: mockProfiles[1],
    image: 'https://img.usecurling.com/p/400/600?q=tactics%20board',
    viewed: true,
  },
  {
    id: 3,
    user: mockProfiles[2],
    image: 'https://img.usecurling.com/p/400/600?q=camera%20lens',
    viewed: false,
  },
]

export const mockNotifications = [
  {
    id: '1',
    title: 'Novo Convite',
    message: 'Você foi convidado para jogar no time Red Dragons.',
    time: '10m atrás',
    read: false,
    type: 'invite',
  },
  {
    id: '2',
    title: 'Pagamento Recebido',
    message: 'Você recebeu R$ 150,00 de João Silva.',
    time: '1h atrás',
    read: true,
    type: 'payment',
  },
]

export const mockEvents = [
  {
    id: '1',
    title: 'Torneio de Verão',
    date: '2024-04-15',
    location: 'Clube Atlético',
    image: 'https://img.usecurling.com/p/400/300?q=summer%20tournament',
    price: 50.0,
    participants: 120,
  },
]

export const mockVenues = [
  {
    id: '1',
    name: 'Arena Society',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20field',
    location: 'Vila Olímpia',
    price: 180.0,
  },
  {
    id: '2',
    name: 'Quadra do Parque',
    rating: 4.2,
    image: 'https://img.usecurling.com/p/400/300?q=futsal%20court',
    location: 'Ibirapuera',
    price: 120.0,
  },
]

export const mockProducts = [
  {
    id: '1',
    name: 'Chuteira Pro Elite',
    price: 499.9,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20cleats',
    rating: 4.9,
    category: 'Equipamentos',
  },
  {
    id: '2',
    name: 'Bola Oficial 2024',
    price: 159.9,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball',
    rating: 4.7,
    category: 'Acessórios',
  },
]

export const mockVideos = [
  {
    id: '1',
    title: 'Melhores Momentos - Final Regional',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer%20highlight',
    duration: '10:32',
    author: 'Canal do Esporte',
    views: '1.2k',
    date: '2 dias atrás',
  },
  {
    id: '2',
    title: 'Dicas de Treino para Goleiros',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=goalkeeper%20training',
    duration: '15:45',
    author: 'Coach Mike',
    views: '856',
    date: '5 dias atrás',
  },
]

export const photographerCategories = [
  'Todos',
  'Eventos',
  'Ensaios',
  'Partidas',
  'Portfólio',
  'Drone',
]

export const mockGyms = [
  {
    id: '1',
    name: 'Iron Pump Gym',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=gym%20interior',
    location: 'Centro, SP',
    price: 89.9,
    features: ['Musculação', 'Crossfit', 'Aulas Coletivas'],
  },
  {
    id: '2',
    name: 'Smart Fit',
    rating: 4.5,
    image: 'https://img.usecurling.com/p/400/300?q=modern%20gym',
    location: 'Jardins, SP',
    price: 119.9,
    features: ['Musculação', 'Cardio', 'Smart Box'],
  },
]

export const mockNutritionPartners = [
  {
    id: '1',
    name: 'Dr. João Nutri',
    specialty: 'Nutrição Esportiva',
    rating: 4.9,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=10',
    location: 'Vila Mariana, SP',
    price: 250.0,
  },
  {
    id: '2',
    name: 'NutriFit Store',
    specialty: 'Suplementos',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/300/300?q=supplements%20store',
    location: 'Online',
    price: null,
  },
]

export const mockClinics = [
  {
    id: '1',
    name: 'PhysioSport',
    services: ['Fisioterapia', 'Recovery', 'Massagem'],
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy%20clinic',
    location: 'Moema, SP',
    price: 150.0,
  },
  {
    id: '2',
    name: 'Clínica do Atleta',
    services: ['Ortopedia', 'Exames'],
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=medical%20clinic',
    location: 'Pinheiros, SP',
    price: 200.0,
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Técnico de Futebol Sub-15',
    company: 'Escolinha Craques do Futuro',
    location: 'São Paulo, SP',
    salary: 'R$ 2.500 - R$ 3.500',
    type: 'Full-time',
    postedAt: '2 dias atrás',
    description: 'Procuramos técnico com experiência em categorias de base...',
    requirements: ['Licença B CBF', 'Experiência de 2 anos'],
    logo: 'https://img.usecurling.com/i?q=soccer&color=green',
  },
  {
    id: '2',
    title: 'Scout de Talentos',
    company: 'Agência Gol de Placa',
    location: 'Remoto',
    salary: 'Comissão',
    type: 'Freelance',
    postedAt: '5 dias atrás',
    description: 'Busca de novos talentos em torneios regionais...',
    requirements: ['Olhar clínico', 'Disponibilidade para viagens'],
    logo: 'https://img.usecurling.com/i?q=eye&color=blue',
  },
]

export const mockChats = [
  {
    id: '1',
    user: mockProfiles[0],
    lastMessage: 'E aí, vamos fechar o jogo?',
    time: '10:30',
    unread: 2,
  },
  {
    id: '2',
    user: mockProfiles[1],
    lastMessage: 'Treino confirmado amanhã.',
    time: 'Ontem',
    unread: 0,
  },
]

export const mockRides = [
  {
    id: '1',
    driver: {
      name: 'Carlos Driver',
      rating: 4.9,
      car: 'Toyota Corolla',
      plate: 'ABC-1234',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=5',
    },
    origin: 'Av. Paulista, 1000',
    destination: 'Arena Neo Química',
    date: '2024-03-20T18:00:00',
    price: 45.9,
    status: 'scheduled',
  },
]

export const mockInvitations = [
  {
    id: '1',
    from: mockProfiles[1],
    team: 'Red Dragons',
    role: 'Atleta',
    date: 'Hoje, 14:00',
    status: 'pending',
  },
]
