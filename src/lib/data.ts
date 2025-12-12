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
      id: '1',
      name: 'Lucas Oliveira',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
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
      id: '2',
      name: 'Clube Atlético Central',
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
      id: '3',
      name: 'Roberto Mendes',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
      type: 'Treinador',
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
      id: '2',
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
    id: '1',
    title: 'Copa Regional de Futsal',
    date: '15 Ago',
    location: 'São Paulo, SP',
    image: 'https://img.usecurling.com/p/400/200?q=futsal%20court',
    organizer: 'Liga SP',
    price: 'R$ 50,00',
    description:
      'Participe da maior copa regional de futsal amador de São Paulo. Equipes de toda a região disputando o troféu.',
  },
  {
    id: '2',
    title: 'Maratona da Cidade',
    date: '22 Set',
    location: 'Rio de Janeiro, RJ',
    image: 'https://img.usecurling.com/p/400/200?q=marathon%20runners',
    organizer: 'Run Brasil',
    price: 'R$ 120,00',
    description:
      'Desafie seus limites na Maratona da Cidade. Percurso plano e visual incrível da orla carioca.',
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Treinador Sub-15',
    company: 'Clube Atlético',
    location: 'São Paulo, SP',
    type: 'Presencial',
    description:
      'Procuramos treinador com experiência em categorias de base para assumir a equipe Sub-15. Necessário licença C da CBF.',
    requirements: [
      'Licença C CBF',
      'Experiência prévia',
      'Disponibilidade à tarde',
    ],
    salary: 'A combinar',
  },
  {
    id: '2',
    title: 'Fisioterapeuta Esportivo',
    company: 'Clinica Move',
    location: 'Rio de Janeiro, RJ',
    type: 'Presencial',
    description:
      'Vaga para fisioterapeuta especializado em reabilitação de atletas de alto rendimento.',
    requirements: [
      'Pós-graduação em Fisioterapia Esportiva',
      'Registro no CREFITO',
    ],
    salary: 'R$ 4.500,00',
  },
  {
    id: '3',
    title: 'Analista de Desempenho',
    company: 'TechSports',
    location: 'Remoto',
    type: 'Remoto',
    description:
      'Trabalhe com análise de dados de partidas de futebol. Vaga 100% remota.',
    requirements: [
      'Conhecimento em Python',
      'Paixão por futebol',
      'Inglês intermediário',
    ],
    salary: 'R$ 5.000,00',
  },
]

export interface ProfileData {
  id: string
  type: 'athlete' | 'club' | 'coach'
  name: string
  username: string
  avatar: string
  cover: string
  bio: string
  location: string
  followers: string
  following: string
  rating: number

  // Athlete specific
  position?: string
  sport?: string
  stats?: { label: string; value: string }[]
  history?: { year: string; team: string; description: string }[]

  // Club specific
  about?: string
  address?: string
  jobs?: { id: number; title: string; type: string }[]
  events?: { id: number; title: string; date: string }[]

  // Coach specific
  specialties?: string[]
  certifications?: string[]
  pricing?: string
  availability?: string[]
}

export const mockProfiles: ProfileData[] = [
  {
    id: '1',
    type: 'athlete',
    name: 'Lucas Oliveira',
    username: '@lucas.gol',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    cover: 'https://img.usecurling.com/p/800/300?q=soccer%20field',
    bio: 'Atleta de Futebol | Meia-atacante focado em alta performance. Buscando novas oportunidades.',
    location: 'São Paulo, SP',
    followers: '1.2k',
    following: '450',
    rating: 4.8,
    sport: 'Futebol',
    position: 'Meia-Atacante',
    stats: [
      { label: 'Jogos', value: '89' },
      { label: 'Gols', value: '34' },
      { label: 'Assist', value: '21' },
      { label: 'Altura', value: '1.78m' },
    ],
    history: [
      {
        year: '2023',
        team: 'São Paulo FC Base',
        description: 'Campeão Sub-17',
      },
      {
        year: '2021',
        team: 'Osasco FC',
        description: 'Início na categoria de base',
      },
    ],
  },
  {
    id: '2',
    type: 'club',
    name: 'Clube Atlético Central',
    username: '@atleticocentral',
    avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
    cover: 'https://img.usecurling.com/p/800/300?q=stadium',
    bio: 'Formando campeões desde 1990. Estrutura completa para atletas de alto rendimento.',
    location: 'Rio de Janeiro, RJ',
    followers: '5.6k',
    following: '120',
    rating: 4.9,
    about:
      'O Clube Atlético Central é referência na formação de atletas de alto rendimento, contando com 5 campos oficiais, academia de ponta e departamento médico integrado.',
    address: 'Av. das Américas, 5000 - Barra da Tijuca, Rio de Janeiro - RJ',
    jobs: [
      { id: 1, title: 'Treinador Sub-15', type: 'Presencial' },
      { id: 2, title: 'Fisioterapeuta', type: 'Integral' },
    ],
    events: [
      { id: 1, title: 'Peneira Sub-17', date: '15 Ago' },
      { id: 2, title: 'Final do Regional', date: '22 Set' },
    ],
  },
  {
    id: '3',
    type: 'coach',
    name: 'Roberto Mendes',
    username: '@beto.coach',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
    cover: 'https://img.usecurling.com/p/800/300?q=tactics%20board',
    bio: 'Treinador Licença B CBF. Especialista em tática e desenvolvimento técnico individual.',
    location: 'Belo Horizonte, MG',
    followers: '3.1k',
    following: '890',
    rating: 4.7,
    specialties: [
      'Futebol de Campo',
      'Futsal',
      'Análise Tática',
      'Preparação Física',
    ],
    certifications: [
      'Licença B CBF',
      'Pós-graduação em Treinamento Desportivo',
      'Curso de Análise de Desempenho',
    ],
    pricing: 'R$ 150,00 / hora',
    availability: [
      'Segunda - 14h às 18h',
      'Quarta - 09h às 12h',
      'Sexta - 14h às 18h',
    ],
  },
]

// Chat Data
export interface ChatMessage {
  id: string
  senderId: string
  text?: string
  type: 'text' | 'image' | 'video' | 'audio' | 'document'
  mediaUrl?: string
  fileName?: string
  timestamp: string
  isMe: boolean
}

export interface Chat {
  id: string
  name: string
  avatar: string
  type: 'direct' | 'group' | 'event' | 'job'
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online?: boolean
}

export const mockChats: Chat[] = [
  {
    id: 'user-2',
    name: 'Clube Atlético Central',
    avatar: 'https://img.usecurling.com/i?q=shield&shape=fill&color=violet',
    type: 'direct',
    lastMessage: 'Quando podemos agendar a visita?',
    lastMessageTime: '10:30',
    unreadCount: 2,
    online: true,
  },
  {
    id: 'user-3',
    name: 'Roberto Mendes',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
    type: 'direct',
    lastMessage: 'Obrigado pelas dicas!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    online: false,
  },
  {
    id: 'group-1',
    name: 'Pelada de Quinta',
    avatar:
      'https://img.usecurling.com/i?q=soccer%20ball&shape=fill&color=green',
    type: 'group',
    lastMessage: 'João: Quem vai levar o colete?',
    lastMessageTime: '09:15',
    unreadCount: 5,
  },
  {
    id: 'event-1',
    name: 'Chat: Copa Regional',
    avatar: 'https://img.usecurling.com/i?q=trophy&shape=fill&color=gold',
    type: 'event',
    lastMessage: 'Admin: Tabelas liberadas!',
    lastMessageTime: '11:00',
    unreadCount: 1,
  },
  {
    id: 'job-1',
    name: 'Vaga: Treinador Sub-15',
    avatar: 'https://img.usecurling.com/i?q=briefcase&shape=fill&color=blue',
    type: 'job',
    lastMessage: 'Recrutador: Recebemos seu currículo.',
    lastMessageTime: 'Seg',
    unreadCount: 0,
  },
]

export const getMockMessages = (chatId: string): ChatMessage[] => {
  return [
    {
      id: '1',
      senderId: 'them',
      text: 'Olá! Tudo bem por aí?',
      type: 'text',
      timestamp: '10:00',
      isMe: false,
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Tudo ótimo! E com você?',
      type: 'text',
      timestamp: '10:02',
      isMe: true,
    },
    {
      id: '3',
      senderId: 'them',
      text: 'Aqui está o vídeo do treino de ontem.',
      type: 'text',
      timestamp: '10:05',
      isMe: false,
    },
    {
      id: '4',
      senderId: 'them',
      type: 'video',
      mediaUrl: 'https://img.usecurling.com/p/300/200?q=soccer%20video',
      timestamp: '10:05',
      isMe: false,
    },
    {
      id: '5',
      senderId: 'me',
      type: 'audio',
      timestamp: '10:06',
      isMe: true,
    },
    {
      id: '6',
      senderId: 'them',
      text: 'Pode me enviar o regulamento?',
      type: 'text',
      timestamp: '10:10',
      isMe: false,
    },
    {
      id: '7',
      senderId: 'me',
      type: 'document',
      fileName: 'Regulamento_2024.pdf',
      timestamp: '10:12',
      isMe: true,
    },
  ]
}
