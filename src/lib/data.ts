// Mock Data for Goplay App

export const mockOracle = {
  potentialIndex: 94,
  predictedPosition: 'Meia Atacante',
  comparisonData: [
    { subject: 'Vel', A: 85 },
    { subject: 'Fin', A: 78 },
    { subject: 'Pas', A: 92 },
    { subject: 'Dri', A: 88 },
    { subject: 'Def', A: 45 },
    { subject: 'Fis', A: 70 },
  ],
  futureSkills: [
    { name: 'Visão de Jogo', current: 82, projected: 95 },
    { name: 'Finalização', current: 75, projected: 88 },
    { name: 'Liderança', current: 60, projected: 85 },
  ],
}

export const mockEvolution = [
  {
    year: 2025,
    title: 'Temporada Atual',
    description: 'Grande evolução na parte tática e física.',
    stats: { speed: 85, power: 78, technique: 92 },
  },
  {
    year: 2024,
    title: 'Estreia Profissional',
    description: 'Primeiros jogos no time principal.',
    stats: { speed: 82, power: 75, technique: 88 },
  },
  {
    year: 2023,
    title: 'Base Sub-20',
    description: 'Destaque do campeonato estadual.',
    stats: { speed: 78, power: 70, technique: 85 },
  },
]

export const mockPassport = {
  idNumber: 'GP-882910-BR',
  expiry: '12/2028',
}

export const mockInternationalMatches = [
  {
    id: 1,
    opponentName: 'James Smith',
    country: 'USA',
    flag: 'https://img.usecurling.com/i?q=usa%20flag&shape=fill',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
    level: 'Pro',
  },
  {
    id: 2,
    opponentName: 'Pierre Dubois',
    country: 'France',
    flag: 'https://img.usecurling.com/i?q=france%20flag&shape=fill',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
    level: 'Semi-Pro',
  },
]

export const mockInvitations = [
  {
    id: 1,
    teamName: 'Red Bulls FC',
    teamLogo: 'https://img.usecurling.com/i?q=bull%20logo&color=red',
    modality: 'Futebol',
    level: 'Amador',
    time: 'Hoje, 19:00',
    location: 'Arena Central',
  },
  {
    id: 2,
    teamName: 'Lakers Basket',
    teamLogo: 'https://img.usecurling.com/i?q=basketball%20logo&color=purple',
    modality: 'Basquete',
    level: 'Iniciante',
    time: 'Amanhã, 18:30',
    location: 'Quadra 2',
  },
]

export const mockRewards = [
  {
    id: 1,
    name: 'Camisa Oficial Goplay',
    image: 'https://img.usecurling.com/p/200/200?q=soccer%20jersey',
    category: 'Vestuário',
    points: 1500,
  },
  {
    id: 2,
    name: 'Desconto em Chuteiras',
    image: 'https://img.usecurling.com/p/200/200?q=soccer%20cleats',
    category: 'Cupom',
    points: 800,
  },
]

export const mockVideos = [
  {
    id: 1,
    thumbnail: 'https://img.usecurling.com/p/600/1000?q=soccer%20goal',
    title: 'Golaço do meio de campo!',
    author: {
      name: 'lucas_10',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    },
  },
  {
    id: 2,
    thumbnail: 'https://img.usecurling.com/p/600/1000?q=basketball%20dunk',
    title: 'Enterrada insana no treino',
    author: {
      name: 'mike_j',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    },
  },
]

export const mockChats = [
  {
    id: '1',
    name: 'Time Futebol',
    lastMessage: 'Treino hoje às 19h?',
    time: '10:30',
    unread: 2,
    avatar: 'https://img.usecurling.com/i?q=soccer%20team&color=green',
  },
  {
    id: '2',
    name: 'Ana Personal',
    lastMessage: 'Parabéns pela evolução!',
    time: 'Ontem',
    unread: 0,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
  },
]

export const mockProfiles = [
  {
    id: '1',
    name: 'Lucas Oliveira',
    role: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99',
  },
  {
    id: '2',
    name: 'Ana Silva',
    role: 'Treinadora',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
  },
]

export const getMockMessages = (chatId: string) => [
  {
    id: '1',
    text: 'E aí, tudo certo para o jogo?',
    senderId: '2',
    time: '10:00',
    isMe: false,
  },
  {
    id: '2',
    text: 'Tudo pronto! Já estou saindo.',
    senderId: 'me',
    time: '10:05',
    isMe: true,
  },
  {
    id: '3',
    text: 'Beleza, nos vemos lá.',
    senderId: '2',
    time: '10:06',
    isMe: false,
  },
]

export const mockTransactions = [
  {
    id: '1',
    title: 'Mensalidade',
    date: '12/12/2025',
    amount: -150.0,
    type: 'debit',
  },
  {
    id: '2',
    title: 'Prêmio Torneio',
    date: '10/12/2025',
    amount: 500.0,
    type: 'credit',
  },
  {
    id: '3',
    title: 'Corrida Goplay',
    date: '08/12/2025',
    amount: -25.9,
    type: 'debit',
  },
]

export const mockScheduledRides = [
  {
    id: '1',
    passenger: 'Maria Santos',
    from: 'Centro',
    to: 'Estádio',
    date: '15/12/2025',
    time: '18:30',
    price: 35.0,
  },
  {
    id: '2',
    passenger: 'João Paulo',
    from: 'Shopping',
    to: 'CT Base',
    date: '16/12/2025',
    time: '14:00',
    price: 28.5,
  },
]

export const mockRideHistory = [
  {
    id: '101',
    date: '12/12/2025',
    from: 'Aeroporto',
    to: 'Hotel',
    price: 45.0,
    rating: 5,
  },
  {
    id: '102',
    date: '11/12/2025',
    from: 'Casa',
    to: 'Arena',
    price: 22.0,
    rating: 4,
  },
]

export const mockDriverStats = {
  rating: 4.92,
  totalRides: 1342,
  acceptanceRate: 94,
  cancellationRate: 2,
  earnings: { total: 12450.5, today: 345.2, week: 1890.0 },
  weeklyChart: [
    { day: 'Seg', value: 240 },
    { day: 'Ter', value: 300 },
    { day: 'Qua', value: 180 },
    { day: 'Qui', value: 420 },
    { day: 'Sex', value: 380 },
    { day: 'Sáb', value: 550 },
    { day: 'Dom', value: 480 },
  ],
}

export const mockRideRequests = [
  {
    id: '1',
    passenger: 'Carlos',
    distance: '2.5km',
    earnings: '15.00',
    pickup: 'Rua A',
    dropoff: 'Rua B',
  },
  {
    id: '2',
    passenger: 'Julia',
    distance: '5.0km',
    earnings: '28.50',
    pickup: 'Av Central',
    dropoff: 'Shopping',
  },
]

export const mockActiveRide = {
  id: '123',
  passenger: { name: 'Roberto', rating: 4.8 },
  status: 'In Progress',
  destination: 'Aeroporto Internacional',
  eta: '14:30',
}

export const mockEvents = [
  {
    id: 1,
    title: 'Campeonato Regional',
    date: '20 Dez',
    location: 'Estádio Municipal',
    image: 'https://img.usecurling.com/p/300/200?q=stadium',
  },
  {
    id: 2,
    title: 'Workshop Nutrição',
    date: '22 Dez',
    location: 'Centro de Convenções',
    image: 'https://img.usecurling.com/p/300/200?q=nutrition',
  },
]

export const mockClinics = [
  {
    id: 1,
    name: 'Clínica do Esporte',
    rating: 4.8,
    address: 'Rua das Palmeiras, 100',
    image: 'https://img.usecurling.com/p/300/200?q=medical%20clinic',
  },
  {
    id: 2,
    name: 'Physio Center',
    rating: 4.9,
    address: 'Av. Brasil, 500',
    image: 'https://img.usecurling.com/p/300/200?q=physiotherapy',
  },
]

export const mockGyms = [
  {
    id: 1,
    name: 'Iron Gym',
    rating: 4.7,
    distance: '1.2km',
    image: 'https://img.usecurling.com/p/300/200?q=gym',
  },
  {
    id: 2,
    name: 'CrossFit Box',
    rating: 4.9,
    distance: '2.5km',
    image: 'https://img.usecurling.com/p/300/200?q=crossfit',
  },
]

export const mockNutritionPartners = [
  {
    id: 1,
    name: 'NutriFit',
    type: 'Suplementos',
    discount: '15%',
    image: 'https://img.usecurling.com/p/300/200?q=supplements',
  },
  {
    id: 2,
    name: 'Green Foods',
    type: 'Alimentação Saudável',
    discount: '10%',
    image: 'https://img.usecurling.com/p/300/200?q=healthy%20food',
  },
]

export const mockPhotographers = [
  {
    id: 1,
    name: 'João Foto',
    specialization: 'Esportes',
    rating: 4.9,
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=20',
  },
  {
    id: 2,
    name: 'Maria Lens',
    specialization: 'Eventos',
    rating: 5.0,
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=21',
  },
]

export const mockVenues = [
  {
    id: 1,
    name: 'Arena Soccer',
    type: 'Society',
    rating: 4.5,
    image: 'https://img.usecurling.com/p/300/200?q=soccer%20field',
  },
  {
    id: 2,
    name: 'Quadra Poliesportiva',
    type: 'Multi',
    rating: 4.2,
    image: 'https://img.usecurling.com/p/300/200?q=court',
  },
]

export const mockJobs = [
  {
    id: 1,
    title: 'Treinador Sub-15',
    company: 'Escolinha Futuro',
    salary: 'R$ 2.500',
    type: 'Meio período',
  },
  {
    id: 2,
    title: 'Preparador Físico',
    company: 'Academia Pro',
    salary: 'R$ 3.000',
    type: 'Integral',
  },
]

export const mockProducts = [
  {
    id: 1,
    name: 'Chuteira Pro',
    price: 299.9,
    image: 'https://img.usecurling.com/p/200/200?q=soccer%20shoes',
  },
  {
    id: 2,
    name: 'Bola Oficial',
    price: 129.9,
    image: 'https://img.usecurling.com/p/200/200?q=soccer%20ball',
  },
]

export const mockRanking = [
  {
    id: 1,
    name: 'Lucas Oliveira',
    points: 1540,
    rank: 1,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99',
  },
  {
    id: 2,
    name: 'Marcos Silva',
    points: 1420,
    rank: 2,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
  },
]

export const mockNotifications = [
  {
    id: 1,
    title: 'Novo Desafio',
    message: 'Você foi desafiado por João!',
    time: '10 min atrás',
    read: false,
  },
  {
    id: 2,
    title: 'Pagamento Confirmado',
    message: 'Sua mensalidade foi processada.',
    time: '1h atrás',
    read: true,
  },
]
