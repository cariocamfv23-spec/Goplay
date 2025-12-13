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

// Categories for photographers
export const photographerCategories = [
  'Esportes',
  'Eventos',
  'Ensaios',
  'Produtos',
  'Aéreos',
  'Retratos',
]

// Events
export const mockEvents = [
  {
    id: 1,
    title: 'Campeonato de Futsal Amador',
    date: '15 Dez, 14:00',
    location: 'Arena Central',
    image: 'https://img.usecurling.com/p/400/200?q=futsal%20match',
    price: 50.0,
    organizer: 'Liga SP',
    category: 'Futebol',
  },
  {
    id: 2,
    title: 'Maratona da Cidade',
    date: '20 Dez, 07:00',
    location: 'Parque Ibirapuera',
    image: 'https://img.usecurling.com/p/400/200?q=marathon%20running',
    price: 80.0,
    organizer: 'Runners Club',
    category: 'Corrida',
  },
  {
    id: 3,
    title: 'Torneio de Tênis Open',
    date: '18 Dez, 09:00',
    location: 'Clube Pinheiros',
    image: 'https://img.usecurling.com/p/400/200?q=tennis%20match',
    price: 120.0,
    organizer: 'Tennis Pro',
    category: 'Tênis',
  },
]

// Venues
export const mockVenues = [
  {
    id: 1,
    name: 'Arena Central',
    location: 'Centro, São Paulo',
    rating: 4.8,
    reviews: 124,
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20field',
    sports: ['Futebol', 'Vôlei'],
    price: 120.0,
    features: ['Estacionamento', 'Vestiário', 'Bar'],
  },
  {
    id: 2,
    name: 'Quadras do Parque',
    location: 'Vila Mariana, SP',
    rating: 4.5,
    reviews: 89,
    image: 'https://img.usecurling.com/p/400/300?q=tennis%20court',
    sports: ['Tênis', 'Beach Tennis'],
    price: 80.0,
    features: ['Iluminação', 'Aluguel de Material'],
  },
  {
    id: 3,
    name: 'Ginásio Poliesportivo',
    location: 'Tatuapé, SP',
    rating: 4.6,
    reviews: 56,
    image: 'https://img.usecurling.com/p/400/300?q=basketball%20court',
    sports: ['Basquete', 'Futsal', 'Vôlei'],
    price: 150.0,
    features: ['Arquibancada', 'Placar Eletrônico'],
  },
]

// Gyms
export const mockGyms = [
  {
    id: 1,
    name: 'Academia Power',
    location: 'Vila Madalena, SP',
    rating: 4.9,
    reviews: 210,
    image: 'https://img.usecurling.com/p/400/300?q=gym%20interior',
    features: ['Musculação', 'Crossfit', 'Lutas', 'Aulas Coletivas'],
    monthlyPrice: 99.9,
  },
  {
    id: 2,
    name: 'Smart Fit',
    location: 'Paulista, SP',
    rating: 4.5,
    reviews: 500,
    image: 'https://img.usecurling.com/p/400/300?q=fitness%20center',
    features: ['Musculação', 'Cardio', 'Smart Box'],
    monthlyPrice: 119.9,
  },
  {
    id: 3,
    name: 'CrossLife Box',
    location: 'Moema, SP',
    rating: 4.8,
    reviews: 85,
    image: 'https://img.usecurling.com/p/400/300?q=crossfit%20box',
    features: ['Crossfit', 'LPO', 'Ginástica'],
    monthlyPrice: 250.0,
  },
]

// Nutrition Partners
export const mockNutritionPartners = [
  {
    id: 1,
    name: 'NutriSports',
    type: 'Loja de Suplementos',
    location: 'Pinheiros, SP',
    rating: 4.7,
    reviews: 45,
    image: 'https://img.usecurling.com/p/400/300?q=supplements%20store',
    delivery: true,
    discount: '10% OFF',
  },
  {
    id: 2,
    name: 'Green Healthy Food',
    type: 'Restaurante Saudável',
    location: 'Itaim Bibi, SP',
    rating: 4.9,
    reviews: 120,
    image: 'https://img.usecurling.com/p/400/300?q=healthy%20food',
    delivery: true,
    discount: 'Entrega Grátis',
  },
  {
    id: 3,
    name: 'Dr. Nutri',
    type: 'Consultório',
    location: 'Jardins, SP',
    rating: 5.0,
    reviews: 30,
    image: 'https://img.usecurling.com/p/400/300?q=nutritionist%20office',
    delivery: false,
    discount: 'Primeira Consulta 50%',
  },
]

// Clinics
export const mockClinics = [
  {
    id: 1,
    name: 'Clínica do Atleta',
    specialty: 'Fisioterapia Esportiva',
    location: 'Jardins, SP',
    rating: 5.0,
    reviews: 80,
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy%20clinic',
    services: ['Fisioterapia', 'Osteopatia', 'Massagem Esportiva'],
  },
  {
    id: 2,
    name: 'OrtoSports',
    specialty: 'Ortopedia',
    location: 'Moema, SP',
    rating: 4.8,
    reviews: 55,
    image: 'https://img.usecurling.com/p/400/300?q=orthopedic%20clinic',
    services: ['Consultas', 'Exames de Imagem', 'Infiltrações'],
  },
  {
    id: 3,
    name: 'CardioFit',
    specialty: 'Cardiologia Esportiva',
    location: 'Brooklin, SP',
    rating: 4.9,
    reviews: 40,
    image: 'https://img.usecurling.com/p/400/300?q=medical%20office',
    services: ['Teste Ergométrico', 'Ecocardiograma', 'Check-up'],
  },
]

// Jobs
export const mockJobs = [
  {
    id: 1,
    title: 'Atacante para Time Amador',
    team: 'Real Madruga',
    location: 'São Paulo, SP',
    salary: 'Ajuda de custo',
    type: 'Part-time',
    image: 'https://img.usecurling.com/i?q=soccer%20jersey&shape=fill',
    postedAt: '2 dias atrás',
  },
  {
    id: 2,
    title: 'Professor de Tênis',
    team: 'Clube Pinheiros',
    location: 'São Paulo, SP',
    salary: 'R$ 3.000 - R$ 5.000',
    type: 'Full-time',
    image: 'https://img.usecurling.com/i?q=tennis%20racket&shape=fill',
    postedAt: '5 dias atrás',
  },
  {
    id: 3,
    title: 'Goleiro para Campeonato',
    team: 'Várzea FC',
    location: 'Osasco, SP',
    salary: 'R$ 100 por jogo',
    type: 'Freelance',
    image: 'https://img.usecurling.com/i?q=goalkeeper%20gloves&shape=fill',
    postedAt: '1 semana atrás',
  },
]

// Drivers
export const mockDrivers = [
  {
    id: 1,
    name: 'Roberto Dias',
    rating: 4.9,
    car: 'Sedan Preto',
    plate: 'ABC-1234',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=30',
    distance: '2 min',
    rides: 1540,
  },
  {
    id: 2,
    name: 'Fernanda Lima',
    rating: 5.0,
    car: 'SUV Branco',
    plate: 'XYZ-9876',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=31',
    distance: '5 min',
    rides: 890,
  },
]

// Ride History
export const mockRides = [
  {
    id: 1,
    date: '10 Dez, 18:30',
    from: 'Casa',
    to: 'Arena Central',
    price: 15.9,
    driver: 'Roberto Dias',
    status: 'Completed',
  },
  {
    id: 2,
    date: '08 Dez, 20:15',
    from: 'Academia Power',
    to: 'Casa',
    price: 12.5,
    driver: 'Fernanda Lima',
    status: 'Completed',
  },
]
