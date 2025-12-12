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

export const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Carlos Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
      type: 'Atleta',
    },
    content: 'Treino intenso hoje! Preparando para o campeonato regional. ⚽🔥',
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20training',
    likes: 124,
    comments: 18,
    time: '2h',
  },
  {
    id: 2,
    user: {
      name: 'Clube Atlético',
      avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
      type: 'Clube',
    },
    content:
      'Abertas as inscrições para a peneira sub-17! Venha fazer parte do nosso time. #futebol #peneira',
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20team',
    likes: 450,
    comments: 89,
    time: '4h',
  },
  {
    id: 3,
    user: {
      name: 'Ana Souza',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=22',
      type: 'Treinadora',
    },
    content:
      'Dica do dia: A recuperação é tão importante quanto o treino. Não pule o alongamento! 🧘‍♀️',
    likes: 89,
    comments: 5,
    time: '6h',
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
