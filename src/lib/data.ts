// Mock data for the application
// This file contains mock data used throughout the application pages

export interface User {
  id: string
  name: string
  email: string
  role: 'athlete' | 'coach' | 'club' | 'scout' | 'recruiter'
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
  },
]

export const mockVenues = [
  {
    id: 'v1',
    name: 'Arena Play',
    location: 'São Paulo, SP',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/400/200?q=stadium',
  },
]

export const mockGyms = [
  {
    id: 'g1',
    name: 'Iron Gym',
    location: 'Centro, SP',
    rating: 4.5,
    image: 'https://img.usecurling.com/p/400/200?q=gym%20weights',
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
