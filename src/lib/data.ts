import {
  CreditCard,
  History,
  Trophy,
  Users,
  Wallet,
  Star,
  Calendar,
  MapPin,
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
