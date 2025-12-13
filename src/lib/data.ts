export const mockProfiles = [
  {
    id: 'user-1',
    name: 'Alex Silva',
    username: '@alexsilva',
    role: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
    level: 12,
    location: 'São Paulo, SP',
    followers: 1250,
    following: 450,
    about: 'Apaixonado por futebol e corrida. Buscando sempre evoluir.',
    stats: { matches: 45, wins: 32, mvp: 5 },
  },
  {
    id: 'user-2',
    name: 'Sarah Costa',
    username: '@sarahc',
    role: 'Treinadora',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=2',
    level: 15,
    location: 'Rio de Janeiro, RJ',
    followers: 2100,
    following: 300,
    about: 'Personal Trainer especialista em alta performance.',
    stats: { students: 50, sessions: 1200, rating: 4.9 },
  },
  {
    id: 'user-3',
    name: 'Carlos Santos',
    username: '@carlos99',
    role: 'Recrutador',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=3',
    level: 8,
    location: 'Belo Horizonte, MG',
    followers: 800,
    following: 1200,
    about: 'Olheiro de talentos para clubes de base.',
    stats: { recruited: 12, events: 8, rating: 4.7 },
  },
  {
    id: 'user-4',
    name: 'Pedro Rocha',
    username: '@pedror',
    role: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    level: 10,
    location: 'Curitiba, PR',
    followers: 950,
    following: 500,
    about: 'Foco total no jogo.',
    stats: { matches: 30, wins: 18, mvp: 2 },
  },
  {
    id: 'user-5',
    name: 'Julia Lima',
    username: '@julial',
    role: 'Atleta',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=5',
    level: 11,
    location: 'Porto Alegre, RS',
    followers: 1100,
    following: 400,
    about: 'Correr é vida.',
    stats: { matches: 35, wins: 20, mvp: 3 },
  },
]

export const currentUser = mockProfiles[0]

export const mockStories = [
  {
    id: 'story-1',
    user: mockProfiles[0],
    image: 'https://img.usecurling.com/p/400/800?q=soccer%20training',
    viewed: false,
  },
  {
    id: 'story-2',
    user: mockProfiles[1],
    image: 'https://img.usecurling.com/p/400/800?q=gym%20workout',
    viewed: true,
  },
  {
    id: 'story-3',
    user: mockProfiles[2],
    image: 'https://img.usecurling.com/p/400/800?q=running',
    viewed: false,
  },
  {
    id: 'story-4',
    user: mockProfiles[3],
    image: 'https://img.usecurling.com/p/400/800?q=tennis%20serve',
    viewed: false,
  },
]

export const mockPosts = [
  {
    id: 'post-1',
    user: mockProfiles[0],
    content: 'Ótimo treino hoje! Preparando para o campeonato. ⚽️🚀',
    image: 'https://img.usecurling.com/p/600/600?q=soccer%20field%20player',
    likes: 124,
    comments: 12,
    time: '2h atrás',
    liked: true,
  },
  {
    id: 'post-2',
    user: mockProfiles[1],
    content: 'Nova dieta disponível para meus alunos. Foco total! 🥗💪',
    image: 'https://img.usecurling.com/p/600/600?q=healthy%20food',
    likes: 89,
    comments: 5,
    time: '4h atrás',
    liked: false,
  },
  {
    id: 'post-3',
    user: mockProfiles[4],
    content: 'Corrida matinal de 10km. Recorde pessoal batido! 🏃‍♀️🔥',
    image: 'https://img.usecurling.com/p/600/600?q=runner%20morning',
    likes: 256,
    comments: 34,
    time: '6h atrás',
    liked: true,
  },
]

export const mockVideos = [
  {
    id: 'vid-1',
    title: 'Treino de Dribles Avançados',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer%20dribble',
    duration: '10:30',
    views: '1.2k',
    author: 'Canal do Futebol',
  },
  {
    id: 'vid-2',
    title: 'Yoga para Atletas - Recuperação',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=yoga%20pose',
    duration: '25:00',
    views: '850',
    author: 'Yoga Life',
  },
  {
    id: 'vid-3',
    title: 'Melhores Momentos da Final',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=soccer%20goal',
    duration: '05:45',
    views: '5.6k',
    author: 'Liga Esportiva',
  },
  {
    id: 'vid-4',
    title: 'Dicas de Nutrição Pré-Treino',
    thumbnail: 'https://img.usecurling.com/p/400/225?q=nutrition%20tips',
    duration: '15:20',
    views: '3.1k',
    author: 'NutriFit',
  },
]

export const mockChats = [
  {
    id: 'chat-1',
    participantId: 'user-2',
    participant: mockProfiles[1],
    lastMessage: 'O treino de amanhã está confirmado?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unread: 2,
    online: true,
  },
  {
    id: 'chat-2',
    participantId: 'user-3',
    participant: mockProfiles[2],
    lastMessage: 'Vi seu perfil e gostei muito das estatísticas.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unread: 0,
    online: false,
  },
]

export const getMockMessages = (chatId: string) => {
  return [
    {
      id: 'msg-1',
      senderId: chatId === 'chat-1' ? 'user-2' : 'user-3',
      text:
        chatId === 'chat-1'
          ? 'Oi Alex! Como você está?'
          : 'Olá Alex, tudo bem?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      isMe: false,
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      text: 'Tudo ótimo! E com você?',
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      isMe: true,
    },
    {
      id: 'msg-3',
      senderId: chatId === 'chat-1' ? 'user-2' : 'user-3',
      text:
        chatId === 'chat-1'
          ? 'O treino de amanhã está confirmado?'
          : 'Vi seu perfil e gostei muito das estatísticas.',
      timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      isMe: false,
    },
  ]
}

export const mockEvents = [
  {
    id: 'evt-1',
    title: 'Campeonato Regional de Futsal',
    date: '2024-06-15',
    time: '09:00',
    location: 'Ginásio Municipal',
    image: 'https://img.usecurling.com/p/600/400?q=futsal%20match',
    organizer: 'Liga Esportiva',
    price: 50.0,
    participants: 12,
    maxParticipants: 16,
    category: 'Futsal',
    description: 'Campeonato anual de futsal regional.',
  },
  {
    id: 'evt-2',
    title: 'Maratona da Cidade',
    date: '2024-07-20',
    time: '07:00',
    location: 'Parque Central',
    image: 'https://img.usecurling.com/p/600/400?q=marathon%20runners',
    organizer: 'Running Club',
    price: 80.0,
    participants: 450,
    maxParticipants: 1000,
    category: 'Corrida',
    description: '42km pelas ruas da cidade.',
  },
  {
    id: 'evt-3',
    title: 'Torneio de Tênis Amador',
    date: '2024-06-22',
    time: '10:00',
    location: 'Clube de Campo',
    image: 'https://img.usecurling.com/p/600/400?q=tennis%20court',
    organizer: 'Tennis Pro',
    price: 120.0,
    participants: 8,
    maxParticipants: 32,
    category: 'Tênis',
    description: 'Torneio para iniciantes e intermediários.',
  },
]

export const mockVenues = [
  {
    id: 'ven-1',
    name: 'Arena Society Pro',
    address: 'Rua do Esporte, 123',
    rating: 4.8,
    reviews: 124,
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20field',
    amenities: ['Vestiário', 'Bar', 'Estacionamento', 'Churrasqueira'],
    pricePerHour: 150.0,
    type: 'Society',
    location: 'Centro',
  },
  {
    id: 'ven-2',
    name: 'Quadra Poliesportiva Central',
    address: 'Av. Principal, 500',
    rating: 4.5,
    reviews: 89,
    image: 'https://img.usecurling.com/p/400/300?q=basketball%20court',
    amenities: ['Vestiário', 'Iluminação LED'],
    pricePerHour: 100.0,
    type: 'Poliesportiva',
    location: 'Zona Norte',
  },
  {
    id: 'ven-3',
    name: 'Tennis Club Elite',
    address: 'Alameda das Flores, 45',
    rating: 4.9,
    reviews: 210,
    image: 'https://img.usecurling.com/p/400/300?q=tennis%20clay%20court',
    amenities: ['Vestiário', 'Bar', 'Loja', 'Professor'],
    pricePerHour: 200.0,
    type: 'Tênis',
    location: 'Jardins',
  },
]

export const mockCourts = mockVenues.map((v) => ({
  ...v,
  description: 'Quadra profissional de alta qualidade.',
}))

export const mockGyms = [
  {
    id: 'gym-1',
    name: 'Iron Pump Gym',
    location: 'Centro',
    address: 'Rua da Força, 100',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/400/300?q=gym%20weights',
    features: ['Musculação', 'Cardio', 'Aulas Coletivas'],
    price: 99.9,
    monthlyPrice: 99.9,
  },
  {
    id: 'gym-2',
    name: 'CrossFit Box 01',
    location: 'Zona Sul',
    address: 'Av. Atlântica, 200',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/300?q=crossfit%20box',
    features: ['CrossFit', 'LPO', 'Gymnastics'],
    price: 180.0,
    monthlyPrice: 180.0,
  },
]

export const mockClinics = [
  {
    id: 'clinic-1',
    name: 'FisioSport',
    specialty: 'Fisioterapia Esportiva',
    rating: 5.0,
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy',
    location: 'Centro Médico',
    address: 'Av. Saúde, 500',
    services: ['Fisioterapia', 'Massagem', 'Recovery'],
  },
  {
    id: 'clinic-2',
    name: 'CardioCheck',
    specialty: 'Cardiologia',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=doctor%20clinic',
    location: 'Hospital Central',
    address: 'Rua dos Médicos, 30',
    services: ['Check-up', 'Eletrocardiograma', 'Ergoespirometria'],
  },
]

export const mockNutritionPartners = [
  {
    id: 'nutri-1',
    name: 'NutriFit Consultoria',
    specialty: 'Nutrição Esportiva',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/300?q=nutritionist',
    location: 'Online / Presencial',
    address: 'Rua Verde, 12',
    description: 'Planos alimentares personalizados para alta performance.',
  },
  {
    id: 'nutri-2',
    name: 'Dr. Green Supplements',
    specialty: 'Suplementação',
    rating: 4.7,
    image: 'https://img.usecurling.com/p/400/300?q=supplements%20store',
    location: 'Shopping Mall',
    address: 'Av. Comercial, 1000',
    description: 'Loja completa de suplementos e vitaminas.',
  },
]

export const mockPhotographers = [
  {
    id: 'photo-1',
    name: 'Marcos Lens',
    specialty: 'Futebol',
    rating: 4.9,
    image: 'https://img.usecurling.com/p/400/300?q=sports%20photographer',
    portfolio: 150,
    price: 'R$ 150/jogo',
    location: 'São Paulo',
  },
  {
    id: 'photo-2',
    name: 'Ana Shutter',
    specialty: 'Corrida',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=photographer%20camera',
    portfolio: 200,
    price: 'R$ 10/foto',
    location: 'Rio de Janeiro',
  },
]

export const photographerCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'soccer', label: 'Futebol' },
  { id: 'basketball', label: 'Basquete' },
  { id: 'running', label: 'Corrida' },
  { id: 'tennis', label: 'Tênis' },
  { id: 'others', label: 'Outros' },
]

export const mockProducts = [
  {
    id: 'prod-1',
    name: 'Chuteira Nike Mercurial',
    price: 499.9,
    originalPrice: 699.9,
    image: 'https://img.usecurling.com/p/300/300?q=nike%20mercurial',
    category: 'Calçados',
    rating: 4.8,
    reviews: 45,
  },
  {
    id: 'prod-2',
    name: 'Bola Adidas Champions',
    price: 149.9,
    originalPrice: 199.9,
    image: 'https://img.usecurling.com/p/300/300?q=adidas%20soccer%20ball',
    category: 'Equipamentos',
    rating: 4.9,
    reviews: 120,
  },
  {
    id: 'prod-3',
    name: 'Camisa Brasil 2024',
    price: 299.9,
    originalPrice: null,
    image: 'https://img.usecurling.com/p/300/300?q=brazil%20jersey',
    category: 'Vestuário',
    rating: 4.7,
    reviews: 80,
  },
  {
    id: 'prod-4',
    name: 'Smartwatch Sport',
    price: 899.9,
    originalPrice: 1200.0,
    image: 'https://img.usecurling.com/p/300/300?q=smartwatch',
    category: 'Eletrônicos',
    rating: 4.6,
    reviews: 30,
  },
]

export const mockRewards = [
  {
    id: 'rew-1',
    title: '15% de Desconto na Centauro',
    cost: 500,
    image: 'https://img.usecurling.com/i?q=discount&color=red',
    category: 'Cupom',
    description: 'Válido para compras acima de R$ 200,00.',
  },
  {
    id: 'rew-2',
    title: 'Ingresso de Cinema',
    cost: 800,
    image: 'https://img.usecurling.com/i?q=ticket&color=blue',
    category: 'Lazer',
    description: 'Válido em qualquer rede Cinemark.',
  },
  {
    id: 'rew-3',
    title: 'Mês Grátis - Plano Premium',
    cost: 1500,
    image: 'https://img.usecurling.com/i?q=crown&color=gold',
    category: 'App',
    description: 'Acesso a todas as funcionalidades premium por 30 dias.',
  },
]

export const mockRankings = [
  {
    id: '1',
    userId: 'user-1',
    user: mockProfiles[0],
    points: 2500,
    rank: 1,
    trend: 'up',
  },
  {
    id: '2',
    userId: 'user-2',
    user: mockProfiles[1],
    points: 2350,
    rank: 2,
    trend: 'same',
  },
  {
    id: '3',
    userId: 'user-3',
    user: mockProfiles[2],
    points: 2100,
    rank: 3,
    trend: 'down',
  },
  {
    id: '4',
    userId: 'user-4',
    user: mockProfiles[3],
    points: 1950,
    rank: 4,
    trend: 'up',
  },
  {
    id: '5',
    userId: 'user-5',
    user: mockProfiles[4],
    points: 1800,
    rank: 5,
    trend: 'down',
  },
]

export const mockJobs = [
  {
    id: 'job-1',
    title: 'Atacante Sub-20',
    club: 'Flamengo Base',
    location: 'Rio de Janeiro, RJ',
    salary: 'Ajuda de Custo',
    type: 'Contrato',
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20club%20logo',
  },
  {
    id: 'job-2',
    title: 'Treinador de Goleiros',
    club: 'Escolinha Gol de Placa',
    location: 'São Paulo, SP',
    salary: 'R$ 2.500,00',
    type: 'CLT',
    image: 'https://img.usecurling.com/p/300/300?q=soccer%20goal',
  },
]

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Novo Seguidor',
    message: 'Lucas Pereira começou a seguir você.',
    time: '2 min atrás',
    read: false,
    type: 'follow',
  },
  {
    id: 'notif-2',
    title: 'Convite de Jogo',
    message: "Você foi convidado para 'Fut Quinta'.",
    time: '1 hora atrás',
    read: false,
    type: 'invite',
  },
  {
    id: 'notif-3',
    title: 'Conquista Desbloqueada',
    message: 'Você atingiu a marca de 50 partidas!',
    time: '1 dia atrás',
    read: true,
    type: 'achievement',
  },
]

export const mockTransactions = [
  {
    id: 'trans-1',
    title: 'Aluguel Quadra Society',
    date: '2024-05-20',
    amount: -75.0,
    type: 'expense',
    status: 'completed',
  },
  {
    id: 'trans-2',
    title: 'Prêmio Torneio',
    date: '2024-05-18',
    amount: 150.0,
    type: 'income',
    status: 'completed',
  },
  {
    id: 'trans-3',
    title: 'Compra Loja Virtual',
    date: '2024-05-15',
    amount: -129.9,
    type: 'expense',
    status: 'completed',
  },
]

export const mockDriverRequests = [
  {
    id: 'ride-1',
    passenger: {
      name: 'Pedro',
      rating: 4.8,
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
    },
    from: 'Rua A, 123',
    to: 'Arena Society',
    distance: '5.2 km',
    price: 'R$ 25,00',
    status: 'pending',
  },
]

export const mockDriverHistory = [
  {
    id: 'hist-1',
    date: '12/06/2024',
    price: 'R$ 32,50',
    from: 'Centro',
    to: 'Zona Sul',
    rating: 5,
  },
]

export const mockDriverMetrics = {
  earnings: 'R$ 1.250,00',
  rides: 45,
  hours: 32,
  rating: 4.9,
}

export const mockScheduledRides = [
  {
    id: 'ride-sched-1',
    date: '2024-06-20',
    time: '19:00',
    from: 'Casa',
    to: 'Arena Society Pro',
    driver: {
      name: 'João Motorista',
      rating: 4.9,
      car: 'Sedan Prata',
      plate: 'ABC-1234',
    },
    price: 25.5,
    status: 'confirmed',
  },
  {
    id: 'ride-sched-2',
    date: '2024-06-22',
    time: '08:30',
    from: 'Casa',
    to: 'Parque Central',
    driver: null,
    price: 32.0,
    status: 'pending',
  },
]

export const mockPaymentMethods = [
  {
    id: 'card-1',
    type: 'credit',
    last4: '4242',
    brand: 'mastercard',
    expiry: '12/28',
    isDefault: true,
  },
  {
    id: 'card-2',
    type: 'debit',
    last4: '8888',
    brand: 'visa',
    expiry: '05/26',
    isDefault: false,
  },
]

export const mockInvitations = [
  {
    id: 'inv-1',
    type: 'match',
    title: 'Futebol de Quinta',
    from: mockProfiles[1],
    date: '2024-06-25',
    time: '20:00',
    location: 'Arena Society',
    status: 'pending',
  },
  {
    id: 'inv-2',
    type: 'team',
    title: 'Junte-se ao time',
    from: mockProfiles[2],
    teamName: 'Os Imbatíveis',
    status: 'pending',
  },
]
