// Mock Data for the application
// This file contains all the mock data used across different pages

export const mockCurrentUser = {
  id: 'u1',
  name: 'Alex Silva',
  role: 'athlete',
  avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
  level: 12,
  points: 2450,
  walletBalance: 150.0,
  location: 'São Paulo, SP',
}

export const mockRideRequests = [
  {
    id: 'r1',
    passenger: {
      name: 'Fernanda Oliveira',
      rating: 4.8,
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
      trips: 45,
    },
    pickup: {
      address: 'Rua Augusta, 1500',
      distance: '0.5 km',
    },
    dropoff: {
      address: 'Av. Paulista, 900',
      distance: '2.5 km',
    },
    distance: '3.0 km',
    price: 18.5,
    time: '8 min',
    status: 'pending',
  },
  {
    id: 'r2',
    passenger: {
      name: 'João Santos',
      rating: 4.9,
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
      trips: 120,
    },
    pickup: {
      address: 'Shopping Eldorado',
      distance: '1.2 km',
    },
    dropoff: {
      address: 'Parque Ibirapuera',
      distance: '6.2 km',
    },
    distance: '7.4 km',
    price: 32.0,
    time: '18 min',
    status: 'pending',
  },
]

export const mockRideHistory = [
  {
    id: 'rh1',
    date: '2024-03-10T14:30:00',
    passenger: 'Maria Costa',
    pickup: 'Centro',
    dropoff: 'Zona Sul',
    price: 45.0,
    status: 'completed',
    rating: 5,
  },
  {
    id: 'rh2',
    date: '2024-03-09T09:15:00',
    passenger: 'Pedro Lima',
    pickup: 'Aeroporto',
    dropoff: 'Hotel Plaza',
    price: 85.5,
    status: 'completed',
    rating: 4,
  },
  {
    id: 'rh3',
    date: '2024-03-08T18:20:00',
    passenger: 'Lucas Mendes',
    pickup: 'Vila Olímpia',
    dropoff: 'Morumbi',
    price: 35.0,
    status: 'cancelled',
    rating: null,
  },
]

export const mockDriverStats = {
  rating: 4.92,
  acceptanceRate: 94,
  cancellationRate: 1.5,
  totalRides: 1243,
  totalEarnings: 15420.5,
  hoursOnline: 320,
  level: 'Platina',
  nextLevelProgress: 75,
  weeklyEarnings: [
    { day: 'Seg', amount: 120 },
    { day: 'Ter', amount: 150 },
    { day: 'Qua', amount: 180 },
    { day: 'Qui', amount: 140 },
    { day: 'Sex', amount: 250 },
    { day: 'Sáb', amount: 320 },
    { day: 'Dom', amount: 280 },
  ],
  recentFeedback: [
    { id: 1, comment: 'Excelente motorista!', rating: 5, date: 'Ontem' },
    {
      id: 2,
      comment: 'Muito educado e carro limpo.',
      rating: 5,
      date: '2 dias atrás',
    },
  ],
}

export const mockMatches = [
  {
    id: 'm1',
    sport: 'Futebol',
    title: 'Final Regional',
    teamA: {
      name: 'Red Dragons',
      logo: 'https://img.usecurling.com/i?q=dragon&shape=fill&color=red',
    },
    teamB: {
      name: 'Blue Warriors',
      logo: 'https://img.usecurling.com/i?q=warrior&shape=fill&color=blue',
    },
    scoreA: 2,
    scoreB: 1,
    status: 'live',
    time: "65'",
    location: 'Arena Central',
    date: '2024-03-15T20:00:00',
    image: 'https://img.usecurling.com/p/800/400?q=soccer%20match',
    viewers: 1240,
  },
  {
    id: 'm2',
    sport: 'Basquete',
    title: 'Amistoso',
    teamA: {
      name: 'Lakers Cover',
      logo: 'https://img.usecurling.com/i?q=basketball&shape=outline&color=yellow',
    },
    teamB: {
      name: 'Bulls Cover',
      logo: 'https://img.usecurling.com/i?q=bull&shape=outline&color=red',
    },
    scoreA: 89,
    scoreB: 92,
    status: 'finished',
    time: 'Final',
    location: 'Ginásio Municipal',
    date: '2024-03-14T18:00:00',
    image: 'https://img.usecurling.com/p/800/400?q=basketball%20court',
    viewers: 450,
  },
  {
    id: 'm3',
    sport: 'Vôlei',
    title: 'Torneio de Verão',
    teamA: {
      name: 'Praia Clube',
      logo: 'https://img.usecurling.com/i?q=beach&shape=fill&color=orange',
    },
    teamB: {
      name: 'Minas Tênis',
      logo: 'https://img.usecurling.com/i?q=tennis&shape=fill&color=blue',
    },
    scoreA: 0,
    scoreB: 0,
    status: 'scheduled',
    time: '19:00',
    location: 'Arena Praia',
    date: '2024-03-16T19:00:00',
    image: 'https://img.usecurling.com/p/800/400?q=volleyball%20match',
    viewers: 0,
  },
]

export const mockLightningChallenges = [
  {
    id: 'lc1',
    title: 'Desafio do Travessão',
    description: 'Acerte o travessão 3 vezes seguidas.',
    reward: '500 pts',
    timeLeft: '2h 30m',
    participants: 120,
    image: 'https://img.usecurling.com/p/300/200?q=soccer%20goal',
    type: 'accuracy',
    difficulty: 'Hard',
  },
  {
    id: 'lc2',
    title: 'Embaixadinha Master',
    description: 'Faça 50 embaixadinhas sem deixar cair.',
    reward: '300 pts',
    timeLeft: '5h 15m',
    participants: 85,
    image: 'https://img.usecurling.com/p/300/200?q=soccer%20ball',
    type: 'skill',
    difficulty: 'Medium',
  },
  {
    id: 'lc3',
    title: 'Sprint 100m',
    description: 'Complete 100m em menos de 12 segundos.',
    reward: '1000 pts',
    timeLeft: '1 dia',
    participants: 340,
    image: 'https://img.usecurling.com/p/300/200?q=running%20track',
    type: 'speed',
    difficulty: 'Expert',
  },
]

export const mockEvents = [
  {
    id: 'e1',
    title: 'Maratona da Cidade',
    date: '2024-04-20T07:00:00',
    location: 'Parque Central',
    image: 'https://img.usecurling.com/p/800/400?q=marathon',
    organizer: 'Esporte Vida',
    price: 'R$ 80,00',
    participants: 1500,
    category: 'Running',
    description:
      'A maior maratona da cidade, com percursos de 5km, 10km e 42km.',
  },
  {
    id: 'e2',
    title: 'Torneio de Vôlei de Praia',
    date: '2024-04-25T09:00:00',
    location: 'Praia do Sol',
    image: 'https://img.usecurling.com/p/800/400?q=beach%20volleyball',
    organizer: 'Beach Sports',
    price: 'Gratuito',
    participants: 200,
    category: 'Volleyball',
    description: 'Torneio aberto para duplas mistas.',
  },
]

export const mockVenues = [
  {
    id: 'v1',
    name: 'Arena Society',
    type: 'Campo Society',
    location: 'Vila Madalena, SP',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/600/400?q=soccer%20field',
    pricePerHour: 120,
    features: ['Vestiário', 'Bar', 'Estacionamento'],
  },
  {
    id: 'v2',
    name: 'Quadra Poliesportiva Azul',
    type: 'Quadra',
    location: 'Moema, SP',
    rating: 4.5,
    image: 'https://img.usecurling.com/p/600/400?q=basketball%20court',
    pricePerHour: 80,
    features: ['Iluminação LED', 'Arquibancada'],
  },
]

export const mockGyms = [
  {
    id: 'g1',
    name: 'Iron Pump Gym',
    location: 'Centro, SP',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/600/400?q=gym',
    monthlyPrice: 99.9,
    features: ['24h', 'Ar Condicionado', 'Personal', 'Musculação', 'Aeróbico'],
    distance: '1.2 km',
  },
  {
    id: 'g2',
    name: 'CrossFit Box 7',
    location: 'Pinheiros, SP',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/600/400?q=crossfit',
    monthlyPrice: 150.0,
    features: ['Aulas em grupo', 'Coach', 'Equipamentos novos'],
    distance: '3.5 km',
  },
]

export const mockNutrition = [
  {
    id: 'n1',
    name: 'Dra. Ana Nutri',
    specialty: 'Nutrição Esportiva',
    location: 'Consultório Virtual',
    rating: 5.0,
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=4',
    price: 'R$ 200,00',
    verified: true,
  },
  {
    id: 'n2',
    name: 'NutriFit Team',
    specialty: 'Emagrecimento e Performance',
    location: 'Jardins, SP',
    rating: 4.8,
    image: 'https://img.usecurling.com/i?q=apple&shape=fill&color=green',
    price: 'R$ 180,00',
    verified: true,
  },
]

export const mockClinics = [
  {
    id: 'c1',
    name: 'FisioSport Center',
    specialty: 'Fisioterapia',
    location: 'Jardins, SP',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/600/400?q=physiotherapy',
    services: ['Massagem Desportiva', 'Reabilitação', 'Osteopatia'],
  },
  {
    id: 'c2',
    name: 'Clínica do Atleta',
    specialty: 'Ortopedia',
    location: 'Brooklin, SP',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/600/400?q=medical%20clinic',
    services: ['Consulta', 'Exames', 'Cirurgia'],
  },
]

export const mockProducts = [
  {
    id: 'p1',
    name: 'Tênis Runner Pro',
    price: 299.9,
    image: 'https://img.usecurling.com/p/400/400?q=running%20shoes',
    category: 'Calçados',
    seller: 'Loja Oficial',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 'p2',
    name: 'Bola de Futebol Oficial',
    price: 120.0,
    image: 'https://img.usecurling.com/p/400/400?q=soccer%20ball',
    category: 'Equipamentos',
    seller: 'Sports World',
    rating: 4.8,
    reviews: 85,
  },
  {
    id: 'p3',
    name: 'Camisa DryFit',
    price: 59.9,
    image: 'https://img.usecurling.com/p/400/400?q=tshirt',
    category: 'Roupas',
    seller: 'Moda Sport',
    rating: 4.2,
    reviews: 45,
  },
]

export const mockJobs = [
  {
    id: 'j1',
    title: 'Treinador de Futebol Sub-15',
    company: 'Escolinha Craques do Futuro',
    location: 'São Paulo, SP',
    salary: 'R$ 2.500 - R$ 3.500',
    type: 'Meio período',
    postedAt: '2 dias atrás',
    logo: 'https://img.usecurling.com/i?q=soccer&shape=fill&color=green',
    requirements: ['CREF Ativo', 'Experiência com crianças'],
  },
  {
    id: 'j2',
    title: 'Personal Trainer',
    company: 'Iron Pump Gym',
    location: 'Centro, SP',
    salary: 'R$ 50/hora',
    type: 'Autônomo',
    postedAt: 'Hoje',
    logo: 'https://img.usecurling.com/i?q=dumbbell&shape=fill&color=black',
    requirements: ['CREF Ativo', 'Disponibilidade noite'],
  },
]

export const mockChats = [
  {
    id: 'ch1',
    user: {
      name: 'Treinador Carlos',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5',
      online: true,
    },
    lastMessage: 'Não esqueça o treino de amanhã!',
    time: '10:30',
    unread: 2,
    isGroup: false,
  },
  {
    id: 'ch2',
    user: {
      name: 'Grupo do Time',
      avatar: 'https://img.usecurling.com/i?q=team&shape=fill&color=green',
      online: false,
    },
    lastMessage: 'Marcos: Quem vai no jogo?',
    time: 'Ontem',
    unread: 0,
    isGroup: true,
  },
  {
    id: 'ch3',
    user: {
      name: 'Suporte Goplay',
      avatar: 'https://img.usecurling.com/i?q=support&shape=fill&color=blue',
      online: true,
    },
    lastMessage: 'Seu reembolso foi processado.',
    time: 'Terça',
    unread: 0,
    isGroup: false,
  },
]

export const mockNotifications = [
  {
    id: 'not1',
    title: 'Novo desafio disponível',
    message: "O desafio 'Rei da Quadra' começou!",
    time: 'Há 1 hora',
    read: false,
    type: 'challenge',
  },
  {
    id: 'not2',
    title: 'Pagamento recebido',
    message: 'Você recebeu R$ 50,00 de João.',
    time: 'Há 3 horas',
    read: true,
    type: 'financial',
  },
  {
    id: 'not3',
    title: 'Convite para jogo',
    message: 'O time Red Dragons te convidou para uma partida.',
    time: 'Ontem',
    read: true,
    type: 'invite',
  },
]

export const mockReceivedInvitations = [
  {
    id: 'inv1',
    from: {
      name: 'Time Águias',
      avatar: 'https://img.usecurling.com/i?q=eagle&shape=fill&color=black',
    },
    type: 'Team Invite',
    message: 'Queremos você no nosso time para o próximo campeonato.',
    date: 'Hoje',
    status: 'pending',
  },
  {
    id: 'inv2',
    from: {
      name: 'Campeonato Regional',
      avatar: 'https://img.usecurling.com/i?q=trophy&shape=fill&color=gold',
    },
    type: 'Event Invite',
    message: 'Inscrições abertas para o campeonato de verão.',
    date: 'Ontem',
    status: 'pending',
  },
]

export const mockTransactionHistory = [
  {
    id: 't1',
    type: 'credit',
    amount: 150.0,
    description: 'Pagamento Corrida #r1',
    date: '2024-03-12',
    status: 'completed',
  },
  {
    id: 't2',
    type: 'debit',
    amount: 50.0,
    description: 'Saque PIX',
    date: '2024-03-11',
    status: 'completed',
  },
  {
    id: 't3',
    type: 'credit',
    amount: 25.0,
    description: 'Bônus de Indicação',
    date: '2024-03-10',
    status: 'completed',
  },
]

export const mockPhotographers = [
  {
    id: 'ph1',
    name: 'FotoSport Pro',
    rating: 4.9,
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=6',
    price: 'R$ 150/hr',
    specialty: 'Futebol e Eventos',
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=soccer%20action',
      'https://img.usecurling.com/p/300/300?q=trophy%20celebration',
      'https://img.usecurling.com/p/300/300?q=stadium',
    ],
  },
  {
    id: 'ph2',
    name: 'Ana Silva Fotografia',
    rating: 4.8,
    location: 'Rio de Janeiro, RJ',
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=7',
    price: 'R$ 200/hr',
    specialty: 'Surf e Esportes Aquáticos',
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=surfing',
      'https://img.usecurling.com/p/300/300?q=beach',
    ],
  },
]

export const mockTeams = [
  {
    id: 't1',
    name: 'Red Dragons',
    logo: 'https://img.usecurling.com/i?q=dragon&shape=fill&color=red',
    wins: 15,
    losses: 2,
    draws: 1,
    members: 12,
  },
  {
    id: 't2',
    name: 'Blue Warriors',
    logo: 'https://img.usecurling.com/i?q=warrior&shape=fill&color=blue',
    wins: 10,
    losses: 5,
    draws: 3,
    members: 15,
  },
]

// Added missing exports

export const mockStories = [
  {
    id: 's1',
    user: {
      name: 'User 1',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
    },
    image: 'https://img.usecurling.com/p/300/500?q=story1',
    viewed: false,
  },
  {
    id: 's2',
    user: {
      name: 'User 2',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=11',
    },
    image: 'https://img.usecurling.com/p/300/500?q=story2',
    viewed: false,
  },
  {
    id: 's3',
    user: {
      name: 'User 3',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
    },
    image: 'https://img.usecurling.com/p/300/500?q=story3',
    viewed: true,
  },
]

export const mockPosts = [
  {
    id: 'p1',
    user: {
      name: 'Alex Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
      role: 'Athlete',
    },
    time: '2h ago',
    content: 'Great training session today! 💪',
    image: 'https://img.usecurling.com/p/600/400?q=training',
    likes: 45,
    comments: 12,
    shares: 2,
    isLiked: false,
  },
  {
    id: 'p2',
    user: {
      name: 'Fernanda Oliveira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
      role: 'Coach',
    },
    time: '5h ago',
    content: 'New tactics for the upcoming match.',
    image: 'https://img.usecurling.com/p/600/400?q=tactics',
    likes: 120,
    comments: 34,
    shares: 10,
    isLiked: true,
  },
]

export const mockVideos = [
  {
    id: 'v1',
    title: 'Top 10 Goals',
    user: {
      name: 'Soccer Channel',
      avatar: 'https://img.usecurling.com/i?q=soccer&shape=fill&color=green',
    },
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer',
    views: '1.2M',
    likes: 45000,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'v2',
    title: 'Yoga for Runners',
    user: {
      name: 'Yoga Life',
      avatar: 'https://img.usecurling.com/i?q=yoga&shape=fill&color=purple',
    },
    thumbnail: 'https://img.usecurling.com/p/400/225?q=yoga',
    views: '500k',
    likes: 12000,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
]

export const mockProfiles = [
  {
    id: 'ph1',
    name: 'FotoSport Pro',
    rating: 4.9,
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=6',
    price: 'R$ 150/hr',
    specialty: 'Futebol e Eventos',
    verified: true,
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=soccer%20action',
      'https://img.usecurling.com/p/300/300?q=trophy%20celebration',
      'https://img.usecurling.com/p/300/300?q=stadium',
    ],
  },
  {
    id: 'ph2',
    name: 'Ana Silva Fotografia',
    rating: 4.8,
    location: 'Rio de Janeiro, RJ',
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=7',
    price: 'R$ 200/hr',
    specialty: 'Surf e Esportes Aquáticos',
    verified: true,
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=surfing',
      'https://img.usecurling.com/p/300/300?q=beach',
    ],
  },
  {
    id: 'ph3',
    name: 'Marcos Lentes',
    rating: 4.6,
    location: 'Curitiba, PR',
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=8',
    price: 'R$ 120/hr',
    specialty: 'Skate e Street',
    verified: false,
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=skate',
      'https://img.usecurling.com/p/300/300?q=street',
    ],
  },
]

export const photographerCategories = [
  'Todos',
  'Futebol',
  'Basquete',
  'Vôlei',
  'Surf',
  'Skate',
  'Eventos',
  'Ensaios',
]
