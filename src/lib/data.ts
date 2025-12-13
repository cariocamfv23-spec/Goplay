import { addDays, subDays } from 'date-fns'

export const mockProfiles = [
  {
    id: '1',
    name: 'João Silva',
    username: '@joaosilva',
    role: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
    location: 'São Paulo, SP',
    stats: { matches: 42, wins: 28, goals: 15, rating: 4.8 },
    isVerified: true,
    bio: 'Apaixonado por futebol e competição.',
    followers: 1250,
    following: 300,
  },
  {
    id: '2',
    name: 'Maria Santos',
    username: '@mariasantos',
    role: 'Treinadora',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=2',
    location: 'Rio de Janeiro, RJ',
    stats: { matches: 150, wins: 80, goals: 0, rating: 4.9 },
    isVerified: true,
    bio: 'Treinadora certificada CBF.',
    followers: 5000,
    following: 120,
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    username: '@carlosoliver',
    role: 'Recrutador',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=3',
    location: 'Belo Horizonte, MG',
    stats: { matches: 0, wins: 0, goals: 0, rating: 4.5 },
    isVerified: false,
    bio: 'Buscando novos talentos.',
    followers: 800,
    following: 2000,
  },
  {
    id: '4',
    name: 'Ana Costa',
    username: '@anacosta',
    role: 'Nutricionista',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=4',
    location: 'Curitiba, PR',
    stats: { matches: 0, wins: 0, goals: 0, rating: 5.0 },
    isVerified: true,
    bio: 'Especialista em nutrição esportiva.',
    followers: 3200,
    following: 400,
  },
  {
    id: '5',
    name: 'Pedro Alves',
    username: '@pedroalves',
    role: 'Motorista',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=5',
    location: 'São Paulo, SP',
    stats: { matches: 10, wins: 5, goals: 2, rating: 4.7 },
    isVerified: false,
    bio: 'Levo você ao seu jogo com segurança.',
    followers: 150,
    following: 50,
  },
]

export const mockChats = [
  {
    id: '1',
    userId: '1',
    user: mockProfiles[0],
    lastMessage: 'Vamos marcar aquele treino?',
    timestamp: '10:30',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    userId: '2',
    user: mockProfiles[1],
    lastMessage: 'Confirmado para sábado!',
    timestamp: 'Ontem',
    unreadCount: 0,
    online: false,
  },
  {
    id: '3',
    userId: '3',
    user: mockProfiles[2],
    lastMessage: 'Vi seu perfil e gostei muito.',
    timestamp: 'Segunda',
    unreadCount: 1,
    online: false,
  },
]

export const getMockMessages = (chatId: string) => [
  {
    id: '1',
    senderId: '1',
    text: 'Olá, tudo bem?',
    timestamp: '10:00',
    isMe: false,
  },
  {
    id: '2',
    senderId: 'me',
    text: 'Tudo ótimo, e com você?',
    timestamp: '10:05',
    isMe: true,
  },
  {
    id: '3',
    senderId: '1',
    text: 'Vamos marcar aquele treino?',
    timestamp: '10:30',
    isMe: false,
  },
]

export const mockProducts = [
  {
    id: '1',
    title: 'Chuteira Nike Mercurial',
    name: 'Chuteira Nike Mercurial',
    price: 299.9,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20cleats&dpr=2',
    category: 'Calçados',
    condition: 'Novo',
    seller: mockProfiles[0],
  },
  {
    id: '2',
    title: 'Camisa Brasil 2024',
    name: 'Camisa Brasil 2024',
    price: 159.9,
    image:
      'https://img.usecurling.com/p/300/300?q=brazil%20soccer%20jersey&dpr=2',
    category: 'Vestuário',
    condition: 'Usado - Bom',
    seller: mockProfiles[1],
  },
  {
    id: '3',
    title: 'Bola Oficial Champions',
    name: 'Bola Oficial Champions',
    price: 120.0,
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20ball&dpr=2',
    category: 'Equipamentos',
    condition: 'Novo',
    seller: mockProfiles[2],
  },
]

export const mockCourts = [
  {
    id: '1',
    name: 'Arena Central',
    title: 'Arena Central',
    location: 'Centro, São Paulo',
    address: 'Rua Principal, 100',
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20field&dpr=2',
    price: 150,
    rating: 4.8,
    distance: '2.5 km',
    amenities: ['Vestiário', 'Bar', 'Estacionamento'],
  },
  {
    id: '2',
    name: 'Quadra do Parque',
    title: 'Quadra do Parque',
    location: 'Vila Madalena, SP',
    address: 'Av. do Parque, 500',
    image: 'https://img.usecurling.com/p/400/300?q=futsal%20court&dpr=2',
    price: 100,
    rating: 4.5,
    distance: '5.0 km',
    amenities: ['Vestiário', 'Wi-Fi'],
  },
]

export const mockVenues = mockCourts

export const mockRewards = [
  {
    id: '1',
    title: 'Desconto 10% Nike',
    points: 500,
    image: 'https://img.usecurling.com/i?q=nike&shape=fill',
    description: 'Válido para loja oficial Nike.',
    expiryDate: '2024-12-31',
  },
  {
    id: '2',
    title: '1 Mês Premium',
    points: 1000,
    image: 'https://img.usecurling.com/i?q=crown&color=gold',
    description: 'Acesso total a todas as funcionalidades do app.',
    expiryDate: '2025-01-01',
  },
  {
    id: '3',
    title: 'Isotônico Grátis',
    points: 200,
    image: 'https://img.usecurling.com/p/200/200?q=energy%20drink',
    description: 'Retire em qualquer parceiro.',
    expiryDate: '2024-06-30',
  },
]

export const mockRankings = [
  {
    id: '1',
    user: mockProfiles[0],
    points: 2500,
    rank: 1,
    tier: 'Diamond',
    change: 'up',
  },
  {
    id: '2',
    user: mockProfiles[1],
    points: 2350,
    rank: 2,
    tier: 'Platinum',
    change: 'same',
  },
  {
    id: '3',
    user: mockProfiles[2],
    points: 2100,
    rank: 3,
    tier: 'Gold',
    change: 'down',
  },
  {
    id: '4',
    user: mockProfiles[3],
    points: 1800,
    rank: 4,
    tier: 'Gold',
    change: 'up',
  },
  {
    id: '5',
    user: mockProfiles[4],
    points: 1500,
    rank: 5,
    tier: 'Silver',
    change: 'down',
  },
]

export const mockTransactions = [
  {
    id: '1',
    type: 'deposit',
    amount: 150.0,
    date: '2024-03-10',
    status: 'completed',
    description: 'Depósito via PIX',
    icon: 'arrow-down',
  },
  {
    id: '2',
    type: 'payment',
    amount: -50.0,
    date: '2024-03-12',
    status: 'completed',
    description: 'Pagamento Quadra',
    icon: 'credit-card',
  },
  {
    id: '3',
    type: 'reward',
    amount: 25.0,
    date: '2024-03-14',
    status: 'completed',
    description: 'Cashback',
    icon: 'gift',
  },
  {
    id: '4',
    type: 'withdraw',
    amount: -100.0,
    date: '2024-03-15',
    status: 'processing',
    description: 'Saque para conta',
    icon: 'arrow-up',
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Atacante Sub-20',
    club: 'Flamengo',
    location: 'Rio de Janeiro, RJ',
    salary: 'R$ 2.000 - R$ 5.000',
    type: 'Contrato',
    postedAt: 'Há 2 dias',
    logo: 'https://img.usecurling.com/i?q=flamengo&shape=fill',
    description: 'Procuramos atacante rápido e habilidoso para a base.',
    requirements: ['Idade 17-19', 'Experiência em clube'],
  },
  {
    id: '2',
    title: 'Goleiro Amador',
    club: 'Varzea FC',
    location: 'São Paulo, SP',
    salary: 'Por jogo',
    type: 'Freelance',
    postedAt: 'Hoje',
    logo: 'https://img.usecurling.com/i?q=soccer%20club&shape=fill',
    description: 'Goleiro para jogo de sábado a tarde.',
    requirements: ['Disponibilidade sábado', 'Luvas próprias'],
  },
]

export const mockEvents = [
  {
    id: '1',
    title: 'Campeonato Regional',
    date: '15/04/2024',
    time: '09:00',
    location: 'Estádio Municipal',
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20tournament&dpr=2',
    participants: 120,
    price: 'Grátis',
    category: 'Torneio',
  },
  {
    id: '2',
    title: 'Aulão de Crossfit',
    date: '20/04/2024',
    time: '18:30',
    location: 'Parque Ibirapuera',
    image: 'https://img.usecurling.com/p/400/300?q=crossfit&dpr=2',
    participants: 50,
    price: 'R$ 20,00',
    category: 'Aula',
  },
]

export const mockGyms = [
  {
    id: '1',
    name: 'Smart Fit',
    location: 'Av. Paulista, 1230',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/400/300?q=gym&dpr=2',
    isOpen: true,
    distance: '1.2 km',
    features: ['Ar Condicionado', 'Equipamentos Novos'],
  },
  {
    id: '2',
    name: 'Ironberg',
    location: 'Moema',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/300?q=gym%20weights&dpr=2',
    isOpen: true,
    distance: '3.5 km',
    features: ['Personal Trainer', 'Suplementação'],
  },
]

export const mockNutrition = [
  {
    id: '1',
    name: 'Dr. Nutri',
    specialty: 'Esportiva',
    rating: 4.9,
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=4',
    location: 'Consultório Online',
    price: 'R$ 150',
  },
]

export const mockNutritionPartners = [
  ...mockNutrition,
  {
    id: '2',
    name: 'NutriFit Center',
    specialty: 'Emagrecimento e Performance',
    rating: 4.7,
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=8',
    location: 'Moema, SP',
    price: 'R$ 200',
  },
  {
    id: '3',
    name: 'João Health',
    specialty: 'Hipertrofia',
    rating: 4.9,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=9',
    location: 'Consultório Online',
    price: 'R$ 180',
  },
]

export const mockClinics = [
  {
    id: '1',
    name: 'FisioSport',
    specialty: 'Fisioterapia',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy&dpr=2',
    location: 'Pinheiros, SP',
    price: 'R$ 120',
  },
]

export const mockPhotographers = [
  {
    id: '1',
    name: 'Foto Esporte',
    rating: 4.8,
    price: 150,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=6',
    portfolio: [
      'https://img.usecurling.com/p/300/300?q=soccer%20action%201',
      'https://img.usecurling.com/p/300/300?q=soccer%20action%202',
    ],
    specialty: 'Futebol',
  },
]

export const photographerCategories = [
  'Todos',
  'Futebol',
  'Basquete',
  'Vôlei',
  'Crossfit',
  'Eventos',
  'Ensaios',
]

export const mockNotifications = [
  {
    id: '1',
    title: 'Novo Match!',
    message: 'Você tem um novo convite de jogo.',
    time: '5 min atrás',
    read: false,
    type: 'match',
  },
  {
    id: '2',
    title: 'Pagamento Confirmado',
    message: 'Seu pagamento de R$ 50,00 foi processado.',
    time: '1 hora atrás',
    read: true,
    type: 'payment',
  },
  {
    id: '3',
    title: 'Nova Mensagem',
    message: 'João Silva enviou uma mensagem.',
    time: '2 horas atrás',
    read: true,
    type: 'message',
  },
]

export const mockRideRequests = [
  {
    id: '1',
    passenger: mockProfiles[0],
    from: 'Rua A, 123',
    to: 'Arena Central',
    distance: '5.2 km',
    price: 15.5,
    status: 'pending',
  },
]

export const mockPointsHistory = [
  {
    id: '1',
    action: 'Venceu Partida',
    points: 100,
    date: 'Hoje',
    type: 'gain',
  },
  {
    id: '2',
    action: 'Check-in Arena',
    points: 50,
    date: 'Ontem',
    type: 'gain',
  },
  {
    id: '3',
    action: 'Resgate Reward',
    points: -500,
    date: 'Semana passada',
    type: 'spent',
  },
]

export const mockInvitations = [
  {
    id: '1',
    from: mockProfiles[0],
    event: 'Futebol de Domingo',
    date: 'Domingo, 10:00',
    location: 'Arena Central',
    status: 'pending',
  },
  {
    id: '2',
    from: mockProfiles[1],
    event: 'Treino Funcional',
    date: 'Sábado, 09:00',
    location: 'Parque',
    status: 'accepted',
  },
]

export const mockDrivers = [
  {
    id: '1',
    name: 'Pedro Alves',
    rating: 4.9,
    car: 'Chevrolet Onix',
    plate: 'ABC-1234',
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=5',
    rides: 150,
    joined: '2023',
  },
  {
    id: '2',
    name: 'Mariana Lima',
    rating: 4.8,
    car: 'Hyundai HB20',
    plate: 'XYZ-9876',
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=6',
    rides: 80,
    joined: '2024',
  },
]

export const mockStories = [
  {
    id: '1',
    user: mockProfiles[0],
    image: 'https://img.usecurling.com/p/300/500?q=soccer%20training&dpr=2',
    viewed: false,
  },
  {
    id: '2',
    user: mockProfiles[1],
    image: 'https://img.usecurling.com/p/300/500?q=gym%20workout&dpr=2',
    viewed: false,
  },
  {
    id: '3',
    user: mockProfiles[4],
    image: 'https://img.usecurling.com/p/300/500?q=running&dpr=2',
    viewed: true,
  },
]

export const mockPosts = [
  {
    id: '1',
    user: mockProfiles[0],
    content:
      'Grande vitória hoje! O time jogou muito bem e conseguimos os 3 pontos.',
    image:
      'https://img.usecurling.com/p/600/400?q=soccer%20team%20celebration&dpr=2',
    likes: 124,
    comments: 18,
    shares: 5,
    time: '2 horas atrás',
    isLiked: false,
  },
  {
    id: '2',
    user: mockProfiles[1],
    content: 'Dica de treino: mantenha a consistência e os resultados virão.',
    image: 'https://img.usecurling.com/p/600/400?q=fitness%20training&dpr=2',
    likes: 89,
    comments: 12,
    shares: 2,
    time: '4 horas atrás',
    isLiked: true,
  },
  {
    id: '3',
    user: mockProfiles[3],
    content:
      'Alimentação saudável é a base para um bom desempenho esportivo. Consulte um nutricionista!',
    image: null,
    likes: 45,
    comments: 3,
    shares: 1,
    time: '6 horas atrás',
    isLiked: false,
  },
]

export const mockVideos = [
  {
    id: '1',
    user: mockProfiles[0],
    thumbnail: 'https://img.usecurling.com/p/300/500?q=soccer%20trick&dpr=2',
    videoUrl: 'https://img.usecurling.com/p/300/500?q=soccer%20trick&dpr=2',
    description: 'Aquele drible que você respeita! ⚽🔥 #futebol #skills',
    likes: 1540,
    comments: 120,
    shares: 450,
  },
  {
    id: '2',
    user: mockProfiles[1],
    thumbnail:
      'https://img.usecurling.com/p/300/500?q=crossfit%20workout&dpr=2',
    videoUrl: 'https://img.usecurling.com/p/300/500?q=crossfit%20workout&dpr=2',
    description:
      'Treino intenso de hoje! Superando limites. 💪🏋️‍♀️ #crossfit #treino',
    likes: 890,
    comments: 56,
    shares: 120,
  },
  {
    id: '3',
    user: mockProfiles[4],
    thumbnail:
      'https://img.usecurling.com/p/300/500?q=running%20marathon&dpr=2',
    videoUrl: 'https://img.usecurling.com/p/300/500?q=running%20marathon&dpr=2',
    description:
      'Preparação para a maratona a todo vapor! 🏃‍♂️💨 #running #maratona',
    likes: 2100,
    comments: 340,
    shares: 600,
  },
]
