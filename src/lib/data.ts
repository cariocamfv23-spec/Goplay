import {
  Home,
  Zap,
  Search,
  ShoppingBag,
  MessageSquare,
  Trophy,
  Briefcase,
  MapPin,
  Calendar,
  User,
  Activity,
  Car,
} from 'lucide-react'

export const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Zap, label: 'Move', path: '/move' },
  { icon: Search, label: 'Explorar', path: '/explore' },
  { icon: Trophy, label: 'Ranking', path: '/ranking' },
  { icon: User, label: 'Perfil', path: '/profile/me' },
]

export const mockUser = {
  id: 'u1',
  name: 'Alex Silva',
  username: '@alexsilva',
  avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
  role: 'Atleta',
  points: 1250,
  level: 15,
  location: 'São Paulo, SP',
  bio: 'Apaixonado por esportes e superação.',
  stats: {
    matches: 42,
    wins: 28,
    mvp: 5,
  },
}

export const mockStories = [
  {
    id: 's1',
    user: {
      name: 'Neymar Jr',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=20',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=soccer%20training&color=blue',
    viewed: false,
  },
  {
    id: 's2',
    user: {
      name: 'Anitta',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=21',
    },
    image: 'https://img.usecurling.com/p/400/800?q=gym%20workout&color=pink',
    viewed: true,
  },
  {
    id: 's3',
    user: {
      name: 'Flamengo',
      avatar: 'https://img.usecurling.com/i?q=flamengo&shape=circle',
    },
    image: 'https://img.usecurling.com/p/400/800?q=stadium%20crowd&color=red',
    viewed: false,
  },
  {
    id: 's4',
    user: {
      name: 'LeBron',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=22',
    },
    image:
      'https://img.usecurling.com/p/400/800?q=basketball%20dunk&color=yellow',
    viewed: false,
  },
]

export const mockPosts = [
  {
    id: 'p1',
    user: {
      name: 'Flamengo Oficial',
      username: '@flamengo',
      avatar: 'https://img.usecurling.com/i?q=flamengo&shape=circle',
      verified: true,
    },
    time: '2h',
    content:
      'Grande vitória hoje no Maracanã! Agradecemos o apoio da nação rubro-negra. #VamosFlamengo',
    image:
      'https://img.usecurling.com/p/600/400?q=soccer%20stadium%20celebration&color=red',
    likes: 15420,
    comments: 342,
    shares: 120,
    liked: true,
  },
  {
    id: 'p2',
    user: {
      name: 'Gabriel Medina',
      username: '@gabrielmedina',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5',
      verified: true,
    },
    time: '4h',
    content: 'Dia perfeito para o treino. Ondas gigantes em Nazaré! 🌊🏄‍♂️',
    image:
      'https://img.usecurling.com/p/600/400?q=surfing%20big%20waves&color=blue',
    likes: 8540,
    comments: 120,
    shares: 45,
    liked: false,
  },
  {
    id: 'p3',
    user: {
      name: 'NBA Brasil',
      username: '@nbabrasil',
      avatar: 'https://img.usecurling.com/i?q=nba&shape=circle&color=blue',
      verified: true,
    },
    time: '6h',
    content:
      'Lakers vence em jogo emocionante na prorrogação! Confira os melhores momentos.',
    image:
      'https://img.usecurling.com/p/600/400?q=basketball%20game&color=orange',
    likes: 22100,
    comments: 890,
    shares: 2300,
    liked: false,
  },
]

export const mockVideos = [
  {
    id: 'v1',
    title: 'Como chutar com precisão',
    thumbnail:
      'https://img.usecurling.com/p/400/225?q=soccer%20kick&color=green',
    duration: '10:24',
    views: '120K',
    author: {
      name: 'Escola de Futebol',
      avatar: 'https://img.usecurling.com/i?q=soccer&color=black',
    },
  },
  {
    id: 'v2',
    title: 'Treino Funcional Completo',
    thumbnail:
      'https://img.usecurling.com/p/400/225?q=crossfit%20training&color=orange',
    duration: '45:00',
    views: '54K',
    author: {
      name: 'Coach Pro',
      avatar: 'https://img.usecurling.com/i?q=dumbbell&color=red',
    },
  },
  {
    id: 'v3',
    title: 'Dicas de Nutrição para Atletas',
    thumbnail:
      'https://img.usecurling.com/p/400/225?q=healthy%20food&color=green',
    duration: '15:30',
    views: '89K',
    author: {
      name: 'Nutri Sport',
      avatar: 'https://img.usecurling.com/i?q=apple&color=green',
    },
  },
]

export const mockAiAnalysis = {
  score: 85,
  summary: 'Seu desempenho técnico melhorou 15% em relação à última sessão.',
  metrics: [
    { label: 'Velocidade', value: 90, color: 'bg-blue-500' },
    { label: 'Técnica', value: 82, color: 'bg-green-500' },
    { label: 'Resistência', value: 88, color: 'bg-orange-500' },
    { label: 'Força', value: 75, color: 'bg-red-500' },
  ],
  feedback:
    'Ótimo desempenho! Tente manter a postura mais ereta durante os sprints finais para otimizar a respiração e reduzir o cansaço.',
}

export const mockTrainingSuggestions = [
  {
    id: 't1',
    title: 'Treino de Explosão',
    description:
      'Melhore sua arrancada e velocidade com exercícios de pliometria.',
    duration: '45 min',
    intensity: 'Alta',
    image:
      'https://img.usecurling.com/p/300/200?q=sprinter%20running&color=red',
  },
  {
    id: 't2',
    title: 'Recuperação Ativa',
    description: 'Sessão leve para soltar a musculatura e prevenir lesões.',
    duration: '30 min',
    intensity: 'Baixa',
    image: 'https://img.usecurling.com/p/300/200?q=stretching&color=blue',
  },
  {
    id: 't3',
    title: 'Fortalecimento de Core',
    description: 'Essencial para estabilidade e prevenção de dores nas costas.',
    duration: '20 min',
    intensity: 'Média',
    image: 'https://img.usecurling.com/p/300/200?q=abs%20workout&color=yellow',
  },
]

export const mockRideRequests = [
  {
    id: '1',
    passenger: {
      name: 'Julia Lima',
      rating: 4.9,
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
      trips: 142,
    },
    pickup: { address: 'Arena Goplay', distance: '0.5 km' },
    dropoff: { address: 'Rua das Palmeiras, 450', distance: '4.2 km' },
    fare: 24.5,
    time: '12 min',
    status: 'pending',
  },
  {
    id: '2',
    passenger: {
      name: 'Marcos Santos',
      rating: 4.7,
      image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
      trips: 35,
    },
    pickup: { address: 'CT Barra Funda', distance: '1.2 km' },
    dropoff: { address: 'Shopping Villa Lobos', distance: '8.5 km' },
    fare: 38.9,
    time: '25 min',
    status: 'pending',
  },
]

export const mockRewards = [
  {
    id: '1',
    title: 'Vale Combustível',
    description: 'R$ 50,00 em créditos na rede Shell',
    points: 1500,
    image: 'https://img.usecurling.com/i?q=fuel&color=orange',
    claimed: false,
  },
  {
    id: '2',
    title: 'Manutenção Preventiva',
    description: 'Troca de óleo e filtro grátis',
    points: 3000,
    image: 'https://img.usecurling.com/i?q=car%20service&color=blue',
    claimed: false,
  },
  {
    id: '3',
    title: 'Lavagem Premium',
    description: 'Lavagem completa interna e externa',
    points: 800,
    image: 'https://img.usecurling.com/i?q=car%20wash&color=cyan',
    claimed: true,
  },
]

export const mockRideHistory = [
  {
    id: 'h1',
    date: 'Hoje, 14:30',
    passenger: 'Fernanda Costa',
    pickup: 'Av. Paulista, 1000',
    dropoff: 'Aeroporto Congonhas',
    price: 45.0,
    status: 'completed',
    rating: 5,
  },
  {
    id: 'h2',
    date: 'Ontem, 18:45',
    passenger: 'Roberto Alves',
    pickup: 'Parque Ibirapuera',
    dropoff: 'Vila Madalena',
    price: 22.5,
    status: 'completed',
    rating: 5,
  },
  {
    id: 'h3',
    date: '10/10/2023',
    passenger: 'Carla Dias',
    pickup: 'Morumbi Shopping',
    dropoff: 'Estádio do Morumbi',
    price: 15.0,
    status: 'cancelled',
    rating: 0,
  },
]

export const mockRankings = [
  {
    id: '1',
    position: 1,
    user: {
      name: 'Gabriel Medina',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5',
      team: 'Surf Pro',
    },
    points: 15400,
    trend: 'up',
  },
  {
    id: '2',
    position: 2,
    user: {
      name: 'Rayssa Leal',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=6',
      team: 'Skate Street',
    },
    points: 14200,
    trend: 'same',
  },
  {
    id: '3',
    position: 3,
    user: {
      name: 'Bruno Fratus',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=7',
      team: 'Swimming',
    },
    points: 13800,
    trend: 'down',
  },
  {
    id: '4',
    position: 4,
    user: {
      name: 'Beatriz Ferreira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=8',
      team: 'Boxing',
    },
    points: 12100,
    trend: 'up',
  },
  {
    id: '5',
    position: 5,
    user: mockUser,
    points: 1250,
    trend: 'up',
  },
]

export const mockEvents = [
  {
    id: 'e1',
    title: 'Campeonato Paulista de Futsal',
    date: '24 Out',
    time: '14:00',
    location: 'Ginásio do Ibirapuera',
    image: 'https://img.usecurling.com/p/400/300?q=futsal%20match&color=blue',
    price: 'R$ 50',
  },
  {
    id: 'e2',
    title: 'Maratona de São Paulo',
    date: '15 Nov',
    time: '06:00',
    location: 'Obelisco',
    image:
      'https://img.usecurling.com/p/400/300?q=marathon%20runners&color=orange',
    price: 'R$ 120',
  },
]

export const mockVenues = [
  {
    id: 'v1',
    name: 'Arena Play',
    type: 'Quadra Poliesportiva',
    rating: 4.8,
    distance: '2.5 km',
    image: 'https://img.usecurling.com/p/400/300?q=indoor%20court&color=blue',
  },
  {
    id: 'v2',
    name: 'Campo do Sol',
    type: 'Campo Society',
    rating: 4.5,
    distance: '5.0 km',
    image: 'https://img.usecurling.com/p/400/300?q=soccer%20field&color=green',
  },
]

export const mockGyms = [
  {
    id: 'g1',
    name: 'Ironberg CT',
    type: 'Musculação',
    rating: 4.9,
    distance: '1.0 km',
    image: 'https://img.usecurling.com/p/400/300?q=gym%20weights&color=black',
  },
]

export const mockNutrition = [
  {
    id: 'n1',
    name: 'Dr. Paulo Muzy',
    specialty: 'Nutrologia Esportiva',
    rating: 5.0,
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=9',
  },
]

export const mockClinics = [
  {
    id: 'c1',
    name: 'FisioSport',
    specialty: 'Fisioterapia',
    rating: 4.8,
    image: 'https://img.usecurling.com/p/400/300?q=physiotherapy&color=cyan',
  },
]

export const mockDrivers = [
  {
    id: 'd1',
    name: 'João Motorista',
    rating: 4.9,
    car: 'Honda Civic',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10',
  },
]

export const mockPhotographers = [
  {
    id: 'p1',
    name: 'Ana Click',
    rating: 4.9,
    specialty: 'Esportes Aquáticos',
    image: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=11',
  },
]

export const mockJobs = [
  {
    id: 'j1',
    title: 'Treinador de Goleiros',
    company: 'São Paulo FC',
    location: 'São Paulo, SP',
    salary: 'R$ 5.000 - R$ 7.000',
    type: 'Full-time',
    posted: '2 dias atrás',
  },
]

export const mockProducts = [
  {
    id: 'prod1',
    name: 'Chuteira Nike Mercurial',
    price: 499.9,
    image:
      'https://img.usecurling.com/p/300/300?q=soccer%20cleats&color=orange',
    seller: 'Loja Oficial',
  },
]

export const mockNotifications = [
  {
    id: 'not1',
    title: 'Novo desafio disponível',
    message: 'Participe do desafio de 5km hoje!',
    time: '2h atrás',
    read: false,
    type: 'challenge',
  },
  {
    id: 'not2',
    title: 'Convite de jogo',
    message: 'O time Eagles te convidou para uma partida.',
    time: '5h atrás',
    read: true,
    type: 'invite',
  },
]

export const mockChats = [
  {
    id: 'chat1',
    user: {
      name: 'Lucas Paquetá',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12',
      online: true,
    },
    lastMessage: 'Vamos fechar o time para domingo?',
    time: '10:30',
    unread: 2,
  },
]
