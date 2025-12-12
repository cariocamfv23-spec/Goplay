import { ChartSpline, Store, Briefcase, Video, Home } from 'lucide-react'

export const navigationItems = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'MOVE', icon: Video, path: '/move' },
  { label: 'Explorar', icon: ChartSpline, path: '/explore' },
  { label: 'Market', icon: Store, path: '/marketplace' },
  { label: 'Vagas', icon: Briefcase, path: '/jobs' },
]

export const mockStories = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  avatar: `https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? 'male' : 'female'}&seed=${i}`,
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
  {
    id: 2,
    user: {
      name: 'Mariana Costa',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=44',
    },
    text: 'Quero ver esse desempenho no próximo jogo!',
    time: '25 min',
    likes: 12,
  },
]

export const mockPosts = [
  {
    id: 1,
    type: 'image',
    user: {
      name: 'Carlos Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
      type: 'Atleta',
    },
    content: 'Treino intenso hoje! Preparando para o campeonato regional. ⚽🔥',
    media: ['https://img.usecurling.com/p/600/400?q=soccer%20training'],
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
      name: 'Clube Atlético',
      avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
      type: 'Clube',
    },
    title: 'Golaço do Sub-17',
    hashtags: ['#futebol', '#base', '#golaço'],
    content: 'Olha o que rolou no treino de hoje! A base vem forte.',
    media: ['https://img.usecurling.com/p/600/400?q=soccer%20goal'], // Thumbnail
    videoDuration: '0:20',
    likes: 450,
    comments: 89,
    shares: 120,
    applauds: 300,
    supports: 50,
    time: '4h',
  },
  {
    id: 3,
    type: 'carousel',
    user: {
      name: 'Ana Souza',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22',
      type: 'Treinadora',
    },
    content: 'Dicas de alongamento para evitar lesões. Arraste para o lado! 🧘‍♀️',
    media: [
      'https://img.usecurling.com/p/600/600?q=stretching',
      'https://img.usecurling.com/p/600/600?q=yoga',
      'https://img.usecurling.com/p/600/600?q=warmup',
    ],
    likes: 89,
    comments: 5,
    shares: 20,
    applauds: 15,
    supports: 8,
    time: '6h',
  },
  {
    id: 4,
    type: 'article',
    user: {
      name: 'NutriSports',
      avatar: 'https://img.usecurling.com/i?q=apple&shape=outline&color=green',
      type: 'Empresa',
    },
    content: 'A importância da hidratação antes, durante e depois dos treinos.',
    articleTitle: 'Guia Completo de Hidratação',
    articleDomain: 'nutrisports.com.br',
    media: ['https://img.usecurling.com/p/600/300?q=water%20bottle'],
    likes: 230,
    comments: 12,
    shares: 45,
    applauds: 20,
    supports: 5,
    time: '1d',
  },
]

export const mockVideos = [
  {
    id: 1,
    user: 'mariagomes_voley',
    description: 'Aquele saque perfeito! 🏐 #volei #ace',
    thumbnail: 'https://img.usecurling.com/p/300/600?q=volleyball%20serve',
    likes: '1.2k',
    shares: '340',
  },
  {
    id: 2,
    user: 'joaobasket_10',
    description: 'Buzzer beater de ontem! 🏀🏀🏀',
    thumbnail: 'https://img.usecurling.com/p/300/600?q=basketball%20dunk',
    likes: '5.6k',
    shares: '1.1k',
  },
  {
    id: 3,
    user: 'tenis_pro_br',
    description: 'Treino de backhand em câmera lenta.',
    thumbnail: 'https://img.usecurling.com/p/300/600?q=tennis%20player',
    likes: '890',
    shares: '120',
  },
]

export const mockEvents = [
  {
    id: 1,
    title: 'Copa Regional de Futsal',
    date: '15 Ago',
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/p/400/200?q=futsal%20court',
    organizer: 'Liga SP',
    price: 'R$ 50,00',
  },
  {
    id: 2,
    title: 'Maratona da Cidade',
    date: '22 Set',
    location: 'Rio de Janeiro, RJ',
    image: 'https://img.usecurling.com/p/400/200?q=marathon%20runners',
    organizer: 'Run Brasil',
    price: 'R$ 120,00',
  },
]
