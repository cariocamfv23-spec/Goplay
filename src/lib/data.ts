import {
  CreditCard,
  Wallet,
  Star,
  Trophy,
  Users,
  MapPin,
  Video,
  CheckCircle,
  Plus,
} from 'lucide-react'

// User Data
export const mockCurrentUser = {
  id: 'me',
  name: 'João Silva',
  avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
  level: 12,
  location: 'São Paulo, SP',
  walletBalance: 1250.5,
  role: 'Atleta Amador',
  stats: {
    matches: 42,
    goals: 15,
    assists: 8,
    mvp: 3,
  },
}

// Stories
export const mockStories = [
  {
    id: 1,
    name: 'Ana B.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    hasStory: true,
  },
  {
    id: 2,
    name: 'Pedro S.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    hasStory: true,
  },
  {
    id: 3,
    name: 'Arena X',
    avatar: 'https://img.usecurling.com/i?q=stadium&shape=fill',
    hasStory: true,
  },
  {
    id: 4,
    name: 'Coach T.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
    hasStory: false,
  },
  {
    id: 5,
    name: 'Julia M.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=4',
    hasStory: false,
  },
]

// Posts
export const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Carlos Oliveira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
      location: 'Arena Central',
    },
    image: 'https://img.usecurling.com/p/600/600?q=soccer%20match',
    content: 'Grande jogo hoje! Vitória de 5x3 com a galera. ⚽🔥',
    likes: 124,
    comments: 18,
    time: '2h',
    liked: true,
  },
  {
    id: 2,
    user: {
      name: 'Marina Santos',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=5',
      location: 'Academia Power',
    },
    image: 'https://img.usecurling.com/p/600/600?q=gym%20workout',
    content: 'Foco no treino de pernas hoje. #nopainnogain 💪',
    likes: 89,
    comments: 5,
    time: '4h',
    liked: false,
  },
]

// Videos (Reels/Move)
export const mockVideos = [
  {
    id: 1,
    thumbnail: 'https://img.usecurling.com/p/400/800?q=soccer%20skills',
    title: 'Drible desconcertante! 😱',
    user: {
      name: 'Futebol Art',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=6',
    },
    likes: '12k',
  },
  {
    id: 2,
    thumbnail: 'https://img.usecurling.com/p/400/800?q=crossfit',
    title: 'Recorde pessoal no snatch',
    user: {
      name: 'CrossLife',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=7',
    },
    likes: '5.4k',
  },
  {
    id: 3,
    thumbnail: 'https://img.usecurling.com/p/400/800?q=basketball%20dunk',
    title: 'Enterrada insana!',
    user: {
      name: 'Basket Zone',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=8',
    },
    likes: '8.1k',
  },
]

// Chats
export const mockChats = [
  {
    id: 1,
    user: {
      name: 'Treinador Miguel',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=9',
      online: true,
    },
    lastMessage: 'O treino de amanhã está confirmado?',
    time: '10:30',
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: 'Julia Costa',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=10',
      online: false,
    },
    lastMessage: 'Beleza, te encontro lá!',
    time: 'Ontem',
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: 'Grupo Futebol Sábado',
      avatar: 'https://img.usecurling.com/i?q=soccer%20ball&shape=fill',
      online: false,
    },
    lastMessage: 'Lucas: Quem vai levar a bola?',
    time: 'Ontem',
    unread: 5,
  },
]

// Products
export const mockProducts = [
  {
    id: 1,
    name: 'Chuteira Pro Elite',
    category: 'Calçados',
    price: 299.9,
    rating: 4.8,
    reviews: 120,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20cleats',
  },
  {
    id: 2,
    name: 'Camisa Dry-Fit',
    category: 'Roupas',
    price: 89.9,
    rating: 4.5,
    reviews: 85,
    image: 'https://img.usecurling.com/p/300/300?q=sport%20tshirt',
  },
  {
    id: 3,
    name: 'Whey Protein Isolado',
    category: 'Suplementos',
    price: 149.9,
    rating: 4.9,
    reviews: 230,
    image: 'https://img.usecurling.com/p/300/300?q=whey%20protein',
  },
  {
    id: 4,
    name: 'Bola Oficial',
    category: 'Equipamentos',
    price: 120.0,
    rating: 4.7,
    reviews: 50,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball',
  },
]

// Notifications
export const mockNotifications = [
  {
    id: 1,
    title: 'Novo seguidor',
    message: 'Lucas Mendes começou a seguir você.',
    time: '2 min atrás',
    read: false,
  },
  {
    id: 2,
    title: 'Jogo confirmado',
    message: 'Seu jogo na Arena Central foi confirmado para 19:00.',
    time: '1h atrás',
    read: true,
  },
  {
    id: 3,
    title: 'Promoção',
    message: '20% de desconto em suplementos hoje!',
    time: '3h atrás',
    read: true,
  },
]

// Ranking
export const mockRankings = [
  {
    id: 1,
    position: 1,
    user: {
      name: 'Ricardo S.',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=11',
    },
    league: 'Diamante',
    points: 12500,
  },
  {
    id: 2,
    position: 2,
    user: {
      name: 'Ana P.',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
    },
    league: 'Diamante',
    points: 11200,
  },
  {
    id: 3,
    position: 3,
    user: {
      name: 'João Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=13',
    },
    league: 'Ouro',
    points: 9800,
  },
  {
    id: 4,
    position: 4,
    user: {
      name: 'Pedro H.',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=14',
    },
    league: 'Ouro',
    points: 9500,
  },
  {
    id: 5,
    position: 5,
    user: {
      name: 'Mariana L.',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=15',
    },
    league: 'Prata',
    points: 8200,
  },
]

// Wallet Transactions
export const mockTransactionHistory = [
  {
    id: 1,
    type: 'credit',
    description: 'Depósito via PIX',
    date: '12/12/2024',
    amount: 150.0,
  },
  {
    id: 2,
    type: 'debit',
    description: 'Aluguel Quadra',
    date: '10/12/2024',
    amount: 80.0,
  },
  {
    id: 3,
    type: 'credit',
    description: 'Cashback Loja',
    date: '08/12/2024',
    amount: 15.5,
  },
  {
    id: 4,
    type: 'debit',
    description: 'Compra Loja',
    date: '05/12/2024',
    amount: 200.0,
  },
]

// Stats & Comparisons
export const mockComparisonStats = [
  { subject: 'Velocidade', me: 120, opponent: 110, fullMark: 150 },
  { subject: 'Força', me: 98, opponent: 130, fullMark: 150 },
  { subject: 'Técnica', me: 86, opponent: 130, fullMark: 150 },
  { subject: 'Resistência', me: 99, opponent: 100, fullMark: 150 },
  { subject: 'Mental', me: 85, opponent: 90, fullMark: 150 },
  { subject: 'Tática', me: 65, opponent: 85, fullMark: 150 },
]

export const mockProfiles = [
  {
    id: 1,
    name: 'Média da Liga',
    avatar: 'https://img.usecurling.com/i?q=chart&shape=fill',
    role: 'Referência',
    stats: {
      speed: 70,
      power: 70,
      technique: 70,
      stamina: 70,
      mental: 70,
      tactics: 70,
    },
  },
  {
    id: 2,
    name: 'Neymar Jr',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=20',
    role: 'Atacante',
    stats: {
      speed: 95,
      power: 80,
      technique: 99,
      stamina: 85,
      mental: 88,
      tactics: 90,
    },
  },
  {
    id: 3,
    name: 'Cristiano R.',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=22',
    role: 'Atacante',
    stats: {
      speed: 92,
      power: 95,
      technique: 90,
      stamina: 94,
      mental: 99,
      tactics: 88,
    },
  },
]
