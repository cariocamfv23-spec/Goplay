// Mock data for the application
// This file contains mock data used throughout the application pages

export interface User {
  id: string
  name: string
  email: string
  role:
    | 'athlete'
    | 'coach'
    | 'club'
    | 'scout'
    | 'recruiter'
    | 'photographer'
    | 'driver'
  avatar: string
  location?: string
  bio?: string
}

export const mockUser: User = {
  id: '1',
  name: 'Gabriel Medina',
  email: 'gabriel@goplay.com',
  role: 'athlete',
  avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
  location: 'São Paulo, SP',
  bio: 'Atleta profissional focado em alta performance e resultados.',
}

// Scheduled Rides Mock Data
export const mockScheduledRides = [
  {
    id: '1',
    date: '2024-05-20T14:30:00',
    pickup: 'Rua das Flores, 123 - Centro',
    dropoff: 'Arena Goplay - Zona Sul',
    price: 45.5,
    status: 'confirmed',
    driver: {
      id: 'd1',
      name: 'Carlos Silva',
      rating: 4.8,
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=2',
      vehicle: 'Chevrolet Onix • ABC-1234',
    },
  },
  {
    id: '2',
    date: '2024-05-22T09:00:00',
    pickup: 'Condomínio Parque Verde',
    dropoff: 'Estádio Municipal',
    price: 32.9,
    status: 'pending',
    driver: {
      id: 'd2',
      name: 'Ana Souza',
      rating: 4.9,
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=3',
      vehicle: 'Hyundai HB20 • XYZ-9876',
    },
  },
]

// Ride History Mock Data
export const mockRideHistory = [
  {
    id: 'r1',
    date: '2024-05-15T18:30:00',
    pickup: 'Arena Goplay',
    dropoff: 'Rua das Flores, 123',
    price: 42.0,
    driver: 'Marcos Oliveira',
    rating: 5,
    status: 'completed',
  },
  {
    id: 'r2',
    date: '2024-05-10T20:15:00',
    pickup: 'Shopping Center',
    dropoff: 'Casa',
    price: 25.4,
    driver: 'Julia Santos',
    rating: 4,
    status: 'completed',
  },
  {
    id: 'r3',
    date: '2024-05-08T08:45:00',
    pickup: 'Casa',
    dropoff: 'Aeroporto',
    price: 85.0,
    driver: 'Pedro Costa',
    rating: 5,
    status: 'completed',
  },
]

// Driver Stats Mock Data
export const mockDriverStats = {
  totalEarnings: 1450.75,
  ridesCompleted: 58,
  hoursOnline: 42.5,
  rating: 4.92,
  acceptanceRate: 96,
  cancellationRate: 1,
  todayEarnings: 180.5,
  weekEarnings: 850.25,
}

// Matches Mock Data
export const mockMatches = [
  {
    id: 'm1',
    sport: 'Futebol',
    date: '2024-06-12T19:00:00',
    location: 'Arena Central',
    status: 'scheduled',
    homeTeam: {
      id: 't1',
      name: 'Red Bulls',
      score: null,
      logo: 'https://img.usecurling.com/i?q=bull&color=red',
    },
    awayTeam: {
      id: 't2',
      name: 'Blue Warriors',
      score: null,
      logo: 'https://img.usecurling.com/i?q=warrior&color=blue',
    },
  },
  {
    id: 'm2',
    sport: 'Basquete',
    date: '2024-06-10T20:00:00',
    location: 'Ginásio Municipal',
    status: 'finished',
    homeTeam: {
      id: 't3',
      name: 'Lakers Cover',
      score: 98,
      logo: 'https://img.usecurling.com/i?q=basketball&color=yellow',
    },
    awayTeam: {
      id: 't4',
      name: 'Celtics Cover',
      score: 95,
      logo: 'https://img.usecurling.com/i?q=clover&color=green',
    },
  },
]

// Lightning Challenges Mock Data
export const mockLightningChallenges = [
  {
    id: 'lc1',
    title: 'Desafio do Travessão',
    description: 'Acerte o travessão 3 vezes seguidas em vídeo.',
    points: 500,
    participants: 1240,
    timeLeft: '2 dias',
    image: 'https://img.usecurling.com/p/300/200?q=crossbar',
  },
  {
    id: 'lc2',
    title: '3 Pontos Cego',
    description: 'Faça uma cesta de 3 pontos de costas.',
    points: 1000,
    participants: 850,
    timeLeft: '5 horas',
    image: 'https://img.usecurling.com/p/300/200?q=basketball%20hoop',
  },
  {
    id: 'lc3',
    title: 'Embaixadinhas',
    description: 'Faça 50 embaixadinhas sem deixar a bola cair.',
    points: 300,
    participants: 2100,
    timeLeft: '1 dia',
    image: 'https://img.usecurling.com/p/300/200?q=soccer%20skills',
  },
]

// Generic Mocks for compatibility
export const mockEvents = [
  {
    id: 'e1',
    title: 'Torneio de Verão',
    date: '2024-12-15',
    location: 'Clube Atlético',
    image: 'https://img.usecurling.com/p/400/200?q=summer%20sports',
    description: 'O maior torneio de verão da região.',
    organizer: 'Liga Municipal',
  },
]

export const mockVenues = [
  {
    id: 'v1',
    name: 'Arena Play',
    location: 'São Paulo, SP',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/400/200?q=stadium',
    sports: ['Futebol', 'Vôlei'],
  },
]

export const mockGyms = [
  {
    id: 'g1',
    name: 'Iron Gym',
    location: 'Centro, SP',
    rating: 4.5,
    image: 'https://img.usecurling.com/p/400/200?q=gym%20weights',
    amenities: ['Ar condicionado', 'Estacionamento'],
  },
]

export const mockNotifications = [
  {
    id: 'n1',
    title: 'Novo Match!',
    message: 'Você tem um novo jogo sugerido para hoje.',
    read: false,
    date: 'Hoje',
  },
]

// Social Feed Mocks
export const mockStories = [
  {
    id: 's1',
    user: {
      name: 'Neymar Jr',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    },
    image: 'https://img.usecurling.com/p/300/500?q=soccer%20training',
    viewed: false,
  },
  {
    id: 's2',
    user: {
      name: 'Anitta',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=5',
    },
    image: 'https://img.usecurling.com/p/300/500?q=gym%20workout',
    viewed: true,
  },
  {
    id: 's3',
    user: {
      name: 'Vini Jr',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=6',
    },
    image: 'https://img.usecurling.com/p/300/500?q=running',
    viewed: false,
  },
]

export const mockPosts = [
  {
    id: 'p1',
    author: {
      name: 'Flamengo Oficial',
      avatar: 'https://img.usecurling.com/i?q=badge&color=red',
      role: 'club',
    },
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20match',
    content:
      'Grande vitória hoje no Maracanã! A torcida fez a diferença. #Mengão #Vitória',
    likes: 12500,
    comments: 450,
    time: '2h atrás',
    liked: true,
  },
  {
    id: 'p2',
    author: {
      name: 'Personal Trainer',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=7',
      role: 'coach',
    },
    image: 'https://img.usecurling.com/p/600/400?q=fitness%20tips',
    content:
      '5 dicas para melhorar seu rendimento no treino de força. Confira no link da bio! 💪',
    likes: 890,
    comments: 32,
    time: '5h atrás',
    liked: false,
  },
]

// Move/Videos Mocks
export const mockVideos = [
  {
    id: 'v1',
    title: 'Melhores Momentos: Final do Campeonato',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer%20highlights',
    duration: '10:32',
    views: '1.2M',
    author: {
      name: 'Goplay Sports',
      avatar: 'https://img.usecurling.com/i?q=play&color=blue',
    },
  },
  {
    id: 'v2',
    title: 'Treino de Pernas Completo',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=leg%20workout',
    duration: '15:45',
    views: '450K',
    author: {
      name: 'FitLife',
      avatar: 'https://img.usecurling.com/i?q=dumbbell&color=green',
    },
  },
  {
    id: 'v3',
    title: 'Como chutar com efeito',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer%20kick',
    duration: '08:20',
    views: '890K',
    author: {
      name: 'Escola de Futebol',
      avatar: 'https://img.usecurling.com/i?q=soccer&color=black',
    },
  },
]

// Photographers/Profiles Mocks
export const photographerCategories = [
  'Todos',
  'Futebol',
  'Basquete',
  'Surf',
  'Skate',
  'Corrida',
  'Crossfit',
]

export const mockProfiles = [
  {
    id: 'ph1',
    name: 'João Silva',
    role: 'photographer',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=8',
    rating: 4.9,
    location: 'São Paulo, SP',
    category: 'Futebol',
    specialties: ['Futebol', 'Eventos'],
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=soccer%20photo%201',
      'https://img.usecurling.com/p/300/300?q=soccer%20photo%202',
      'https://img.usecurling.com/p/300/300?q=soccer%20photo%203',
    ],
    hourlyRate: 150,
  },
  {
    id: 'ph2',
    name: 'Maria Costa',
    role: 'photographer',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=9',
    rating: 4.8,
    location: 'Rio de Janeiro, RJ',
    category: 'Surf',
    specialties: ['Surf', 'Praia', 'Lifestyle'],
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=surf%20photo%201',
      'https://img.usecurling.com/p/300/300?q=surf%20photo%202',
      'https://img.usecurling.com/p/300/300?q=surf%20photo%203',
    ],
    hourlyRate: 200,
  },
]

// Missing Explore mocks
export const mockNutrition = [
  {
    id: 'n1',
    name: 'NutriSport Center',
    location: 'São Paulo, SP',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/200?q=healthy%20food',
    specialties: ['Esportiva', 'Emagrecimento'],
    description: 'Nutrição especializada para atletas de alto rendimento.',
  },
]

export const mockClinics = [
  {
    id: 'c1',
    name: 'PhysioPro',
    location: 'São Paulo, SP',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/200?q=physiotherapy',
    specialties: ['Fisioterapia', 'Ortopedia'],
    description: 'Clínica de fisioterapia esportiva e reabilitação.',
  },
]

export const mockJobs = [
  {
    id: 'j1',
    title: 'Técnico de Futebol Sub-15',
    organization: 'Clube Atlético',
    location: 'São Paulo, SP',
    type: 'Full-time',
    salary: 'R$ 3.500',
    postedAt: '2 dias atrás',
    logo: 'https://img.usecurling.com/i?q=shield&color=red',
  },
]

export const mockProducts = [
  {
    id: 'pr1',
    name: 'Chuteira Pro Elite',
    price: 299.9,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20cleats',
    category: 'Equipamentos',
    rating: 4.7,
  },
]

export const mockChats = [
  {
    id: 'ch1',
    user: {
      name: 'Coach Ricardo',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=10',
      online: true,
    },
    lastMessage: 'Não esqueça do treino amanhã!',
    time: '10:30',
    unread: 2,
  },
]
