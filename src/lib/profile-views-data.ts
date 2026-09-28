export type ProfileVisitorType =
  | 'scout'
  | 'university'
  | 'team'
  | 'sponsor'
  | 'athlete'

export interface ProfileVisitor {
  id: string
  name: string
  role: string
  organization: string
  type: ProfileVisitorType
  avatar: string
  orgBadge?: string
  date: string
  timestamp: string
  visitsCount: number
  location: string
  verified: boolean
  isLive?: boolean
  notes?: string
  contactEmail?: string
  contactPhone?: string
  scholarshipOffer?: {
    program: string
    coverage: string
    deadline: string
  }
}

export const mockProfileVisitors: ProfileVisitor[] = [
  {
    id: 'vis-scout-1',
    name: 'Carlos Meneghel',
    role: 'Olheiro Chefe / Scout Pro',
    organization: 'Red Bull Bragantino & Leipzig Talent Hub',
    type: 'scout',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=88',
    orgBadge: 'https://img.usecurling.com/i?q=bull&color=red',
    date: 'Há 15 minutos',
    timestamp: 'Hoje, 16:45',
    visitsCount: 4,
    location: 'Bragança Paulista, SP',
    verified: true,
    isLive: true,
    notes: 'Buscando atacante de velocidade sub-20 com boa visão tática.',
    contactEmail: 'carlos.scout@rbbragantino.com.br',
    contactPhone: '+55 11 98765-4321',
  },
  {
    id: 'vis-uni-1',
    name: 'Coach Marcus Vance',
    role: 'Recrutador & Head Coach (Bolsas Universitárias)',
    organization: 'University of Florida (Gators Athletics)',
    type: 'university',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=62',
    orgBadge: 'https://img.usecurling.com/i?q=university&color=orange',
    date: 'Há 2 horas',
    timestamp: 'Hoje, 14:30',
    visitsCount: 6,
    location: 'Gainesville, Flórida (EUA)',
    verified: true,
    notes: 'Interesse em bolsa atlética integral (Full Ride Scholarship 100%).',
    contactEmail: 'm.vance@floridagators.edu',
    contactPhone: '+1 (352) 555-0199',
    scholarshipOffer: {
      program: 'NCAA Division I Soccer Scholarship',
      coverage: '100% (Mensalidade + Moradia + Alimentação)',
      deadline: 'Próxima Temporada (Outono)',
    },
  },
  {
    id: 'vis-team-1',
    name: 'Comissão Técnica Sub-21',
    role: 'Departamento de Análise de Desempenho & Scout',
    organization: 'Palmeiras FC / Academia de Futebol',
    type: 'team',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=44',
    orgBadge: 'https://img.usecurling.com/i?q=trophy&color=green',
    date: 'Há 4 horas',
    timestamp: 'Hoje, 12:15',
    visitsCount: 3,
    location: 'São Paulo, SP',
    verified: true,
    notes: 'Time adversário e recrutador de torneios monitorando estatísticas.',
    contactEmail: 'analise.base@palmeiras.com.br',
    contactPhone: '+55 11 99123-9876',
  },
  {
    id: 'vis-uni-2',
    name: 'Dra. Brenda Holloway',
    role: 'Diretora de Recrutamento Internacional & Bolsas',
    organization: 'UCLA Bruins Soccer Program',
    type: 'university',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=39',
    orgBadge: 'https://img.usecurling.com/i?q=school&color=blue',
    date: 'Ontem',
    timestamp: 'Ontem, 20:10',
    visitsCount: 2,
    location: 'Los Angeles, Califórnia (EUA)',
    verified: true,
    notes: 'Avaliando dados biométricos e histórico de gols para bolsa de 85%.',
    contactEmail: 'b.holloway@ucla.edu',
    contactPhone: '+1 (310) 555-0142',
    scholarshipOffer: {
      program: 'International Student-Athlete Grant',
      coverage: '85% Bolsas + Suporte Médico',
      deadline: '30 de Novembro',
    },
  },
  {
    id: 'vis-scout-2',
    name: 'Giuliano Moretti',
    role: 'Scout América do Sul',
    organization: 'Atalanta BC & Inter Scouting Network',
    type: 'scout',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=73',
    orgBadge: 'https://img.usecurling.com/i?q=globe&color=black',
    date: 'Ontem',
    timestamp: 'Ontem, 18:22',
    visitsCount: 5,
    location: 'Milão / Bérgamo, Itália',
    verified: true,
    notes:
      'Relatório técnico preliminar salvo para observação no próximo jogo.',
    contactEmail: 'giuliano.moretti@atalanta.it',
    contactPhone: '+39 035 555-1234',
  },
  {
    id: 'vis-team-2',
    name: 'Scout de Elenco Principal',
    role: 'Análise de Adversários e Mercado',
    organization: 'Flamengo Esportes & Varzea Pro League',
    type: 'team',
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=92',
    orgBadge: 'https://img.usecurling.com/i?q=shield&color=red',
    date: 'Há 2 dias',
    timestamp: '2 dias atrás',
    visitsCount: 8,
    location: 'Rio de Janeiro, RJ',
    verified: true,
    notes: 'Analisando mapas de calor, velocidade máxima e gols recentes.',
    contactEmail: 'scout@flamengo.com.br',
    contactPhone: '+55 21 98111-2233',
  },
]

export const VISITOR_STATS = {
  totalViews: 142,
  viewsThisWeek: 37,
  weeklyGrowth: '+28%',
  scoutsCount: 14,
  universitiesCount: 8,
  teamsCount: 12,
  sponsorsCount: 3,
}
