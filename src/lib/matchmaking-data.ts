export type Modality = 'futsal' | 'campo' | 'society'
export type Category =
  | 'competitivo'
  | 'veterano'
  | 'master'
  | 'feminino'
  | 'masculino'
export type FieldType = 'sintetico' | 'terrao'
export type MatchmakingMode = 'balanced' | 'random' | 'varied'

export interface MatchTeam {
  id: string
  name: string
  modality: Modality
  category: Category
  skillRating: number
  wins: number
  losses: number
  draws: number
  ageRange: string
  region: string
  distanceKm: number
  logo: string
  recentForm: ('W' | 'L' | 'D')[]
}

export interface MatchField {
  id: string
  name: string
  fieldType: FieldType
  address: string
  region: string
  distanceKm: number
  image: string
  startTime: string
  pricePerHour: string
  amenities: string[]
}

export interface MatchHistoryEntry {
  id: string
  date: string
  opponent: string
  opponentLogo: string
  modality: Modality
  fieldType: FieldType
  scoreTeam: number
  scoreOpponent: number
  result: 'win' | 'loss' | 'draw'
  field: string
}

export interface ScheduledMatch {
  id: string
  teamA: MatchTeam
  teamB: MatchTeam
  field: MatchField
  date: string
  startTime: string
  modality: Modality
  category: Category
}

export const MY_TEAM: MatchTeam = {
  id: 'my-team',
  name: 'Red Wolves FC',
  modality: 'society',
  category: 'competitivo',
  skillRating: 1820,
  wins: 24,
  losses: 8,
  draws: 6,
  ageRange: '25-35',
  region: 'Zona Sul - SP',
  distanceKm: 0,
  logo: 'https://img.usecurling.com/i?q=wolf%20logo&color=red',
  recentForm: ['W', 'W', 'L', 'W', 'D'],
}

export const MOCK_TEAMS: MatchTeam[] = [
  {
    id: 't1',
    name: 'Meninos da Vila FC',
    modality: 'society',
    category: 'veterano',
    skillRating: 1790,
    wins: 22,
    losses: 9,
    draws: 5,
    ageRange: '35-45',
    region: 'Zona Sul - SP',
    distanceKm: 2.4,
    logo: 'https://img.usecurling.com/i?q=village%20house&color=green',
    recentForm: ['W', 'L', 'W', 'W', 'W'],
  },
  {
    id: 't2',
    name: 'Galácticos Society',
    modality: 'society',
    category: 'competitivo',
    skillRating: 1850,
    wins: 26,
    losses: 7,
    draws: 4,
    ageRange: '25-35',
    region: 'Centro - SP',
    distanceKm: 5.1,
    logo: 'https://img.usecurling.com/i?q=galaxy%20star&color=blue',
    recentForm: ['W', 'W', 'W', 'L', 'W'],
  },
  {
    id: 't3',
    name: 'Furacão Futsal',
    modality: 'futsal',
    category: 'masculino',
    skillRating: 1750,
    wins: 18,
    losses: 11,
    draws: 7,
    ageRange: '20-30',
    region: 'Zona Oeste - SP',
    distanceKm: 7.8,
    logo: 'https://img.usecurling.com/i?q=hurricane%20storm&color=red',
    recentForm: ['L', 'W', 'D', 'W', 'L'],
  },
  {
    id: 't4',
    name: 'Real Campinas',
    modality: 'campo',
    category: 'competitivo',
    skillRating: 1880,
    wins: 28,
    losses: 6,
    draws: 3,
    ageRange: '25-35',
    region: 'Campinas - SP',
    distanceKm: 12.3,
    logo: 'https://img.usecurling.com/i?q=crown%20royal&color=purple',
    recentForm: ['W', 'W', 'W', 'W', 'D'],
  },
  {
    id: 't5',
    name: 'Amazonas FC Feminino',
    modality: 'futsal',
    category: 'feminino',
    skillRating: 1800,
    wins: 21,
    losses: 8,
    draws: 6,
    ageRange: '20-30',
    region: 'Zona Leste - SP',
    distanceKm: 9.5,
    logo: 'https://img.usecurling.com/i?q=amazon%20river&color=green',
    recentForm: ['W', 'D', 'W', 'W', 'L'],
  },
  {
    id: 't6',
    name: 'Velha Guarda EC',
    modality: 'society',
    category: 'master',
    skillRating: 1760,
    wins: 19,
    losses: 10,
    draws: 8,
    ageRange: '45-55',
    region: 'Zona Sul - SP',
    distanceKm: 3.2,
    logo: 'https://img.usecurling.com/i?q=shield%20castle&color=gray',
    recentForm: ['D', 'W', 'L', 'W', 'D'],
  },
  {
    id: 't7',
    name: 'Dragões do Norte',
    modality: 'campo',
    category: 'masculino',
    skillRating: 1830,
    wins: 25,
    losses: 8,
    draws: 5,
    ageRange: '25-35',
    region: 'Guarulhos - SP',
    distanceKm: 15.0,
    logo: 'https://img.usecurling.com/i?q=dragon%20fire&color=red',
    recentForm: ['W', 'L', 'W', 'W', 'W'],
  },
  {
    id: 't8',
    name: 'Palmeiras Amador',
    modality: 'futsal',
    category: 'competitivo',
    skillRating: 1810,
    wins: 23,
    losses: 9,
    draws: 4,
    ageRange: '25-35',
    region: 'Centro - SP',
    distanceKm: 4.7,
    logo: 'https://img.usecurling.com/i?q=trophy%20cup&color=green',
    recentForm: ['W', 'W', 'D', 'L', 'W'],
  },
  {
    id: 't9',
    name: 'Leões do Sul',
    modality: 'society',
    category: 'veterano',
    skillRating: 1770,
    wins: 20,
    losses: 11,
    draws: 6,
    ageRange: '35-45',
    region: 'Santo Amaro - SP',
    distanceKm: 6.0,
    logo: 'https://img.usecurling.com/i?q=lion%20head&color=orange',
    recentForm: ['L', 'W', 'W', 'D', 'L'],
  },
  {
    id: 't10',
    name: 'União Feminina',
    modality: 'society',
    category: 'feminino',
    skillRating: 1795,
    wins: 22,
    losses: 8,
    draws: 5,
    ageRange: '25-35',
    region: 'Zona Sul - SP',
    distanceKm: 1.8,
    logo: 'https://img.usecurling.com/i?q=flower%20bloom&color=pink',
    recentForm: ['W', 'W', 'W', 'L', 'W'],
  },
]

export const MOCK_FIELDS: MatchField[] = [
  {
    id: 'f1',
    name: 'Arena XP - Quadra 1',
    fieldType: 'sintetico',
    address: 'Av. Marques, 100 - Barra Funda, São Paulo',
    region: 'Centro - SP',
    distanceKm: 4.5,
    image:
      'https://img.usecurling.com/p/600/400?q=soccer%20field%20synthetic%20grass&color=green&dpr=2',
    startTime: '20:00',
    pricePerHour: 'R$ 220/h',
    amenities: ['Vestiário', 'Estacionamento', 'Iluminação', 'Bar'],
  },
  {
    id: 'f2',
    name: 'Campo do Terrão',
    fieldType: 'terrao',
    address: 'Rua da Mooca, 300 - Mooca, São Paulo',
    region: 'Zona Leste - SP',
    distanceKm: 8.2,
    image:
      'https://img.usecurling.com/p/600/400?q=dirt%20soccer%20field&color=orange&dpr=2',
    startTime: '19:00',
    pricePerHour: 'R$ 120/h',
    amenities: ['Iluminação', 'Bebedouro'],
  },
  {
    id: 'f3',
    name: 'Society Club - Campo A',
    fieldType: 'sintetico',
    address: 'Av. dos Bandeirantes, 2000 - Zona Sul, São Paulo',
    region: 'Zona Sul - SP',
    distanceKm: 3.0,
    image:
      'https://img.usecurling.com/p/600/400?q=society%20soccer%20field%20night&color=green&dpr=2',
    startTime: '21:00',
    pricePerHour: 'R$ 200/h',
    amenities: ['Churrasqueira', 'Estacionamento', 'Bar', 'TV'],
  },
  {
    id: 'f4',
    name: 'Futsal Pro Arena',
    fieldType: 'sintetico',
    address: 'Rua Central, 50 - Centro, São Paulo',
    region: 'Centro - SP',
    distanceKm: 5.1,
    image:
      'https://img.usecurling.com/p/600/400?q=futsal%20indoor%20court%20professional&color=blue&dpr=2',
    startTime: '18:00',
    pricePerHour: 'R$ 150/h',
    amenities: ['Vestiário', 'Wi-Fi', 'Arquibancada', 'Placar Eletrônico'],
  },
  {
    id: 'f5',
    name: 'Terrão do Bairro',
    fieldType: 'terrao',
    address: 'Rua das Oliveiras, 88 - Pinheiros, São Paulo',
    region: 'Zona Oeste - SP',
    distanceKm: 6.5,
    image:
      'https://img.usecurling.com/p/600/400?q%20=dirt%20field%20sunset&color=yellow&dpr=2',
    startTime: '19:30',
    pricePerHour: 'R$ 90/h',
    amenities: ['Iluminação', 'Área de Lazer'],
  },
  {
    id: 'f6',
    name: 'Complexo Esportivo Sul',
    fieldType: 'sintetico',
    address: 'Av. Ibirapuera, 500 - Vila Mariana, São Paulo',
    region: 'Zona Sul - SP',
    distanceKm: 2.1,
    image:
      'https://img.usecurling.com/p/600/400?q=sports%20complex%20modern%20field&color=cyan&dpr=2',
    startTime: '20:30',
    pricePerHour: 'R$ 250/h',
    amenities: ['Vestiário', 'Wi-Fi', 'Bar', 'Lounge', 'Estacionamento'],
  },
]

export const MOCK_MATCH_HISTORY: MatchHistoryEntry[] = [
  {
    id: 'mh1',
    date: '08 Jun 2026',
    opponent: 'Galácticos Society',
    opponentLogo: 'https://img.usecurling.com/i?q=galaxy%20star&color=blue',
    modality: 'society',
    fieldType: 'sintetico',
    scoreTeam: 3,
    scoreOpponent: 2,
    result: 'win',
    field: 'Society Club - Campo A',
  },
  {
    id: 'mh2',
    date: '01 Jun 2026',
    opponent: 'Furacão Futsal',
    opponentLogo: 'https://img.usecurling.com/i?q=hurricane%20storm&color=red',
    modality: 'futsal',
    fieldType: 'sintetico',
    scoreTeam: 1,
    scoreOpponent: 4,
    result: 'loss',
    field: 'Futsal Pro Arena',
  },
  {
    id: 'mh3',
    date: '25 Mai 2026',
    opponent: 'Meninos da Vila FC',
    opponentLogo: 'https://img.usecurling.com/i?q=village%20house&color=green',
    modality: 'society',
    fieldType: 'terrao',
    scoreTeam: 2,
    scoreOpponent: 2,
    result: 'draw',
    field: 'Terrão do Bairro',
  },
  {
    id: 'mh4',
    date: '18 Mai 2026',
    opponent: 'Leões do Sul',
    opponentLogo: 'https://img.usecurling.com/i?q=lion%20head&color=orange',
    modality: 'society',
    fieldType: 'sintetico',
    scoreTeam: 4,
    scoreOpponent: 1,
    result: 'win',
    field: 'Complexo Esportivo Sul',
  },
  {
    id: 'mh5',
    date: '11 Mai 2026',
    opponent: 'Dragões do Norte',
    opponentLogo: 'https://img.usecurling.com/i?q=dragon%20fire&color=red',
    modality: 'campo',
    fieldType: 'terrao',
    scoreTeam: 0,
    scoreOpponent: 3,
    result: 'loss',
    field: 'Campo do Terrão',
  },
  {
    id: 'mh6',
    date: '04 Mai 2026',
    opponent: 'União Feminina',
    opponentLogo: 'https://img.usecurling.com/i?q=flower%20bloom&color=pink',
    modality: 'society',
    fieldType: 'sintetico',
    scoreTeam: 3,
    scoreOpponent: 0,
    result: 'win',
    field: 'Society Club - Campo A',
  },
]

export const MOCK_SCHEDULED: ScheduledMatch[] = [
  {
    id: 'sm1',
    teamA: MY_TEAM,
    teamB: MOCK_TEAMS[1],
    field: MOCK_FIELDS[2],
    date: '15 Jun 2026',
    startTime: '21:00',
    modality: 'society',
    category: 'competitivo',
  },
  {
    id: 'sm2',
    teamA: MY_TEAM,
    teamB: MOCK_TEAMS[0],
    field: MOCK_FIELDS[5],
    date: '22 Jun 2026',
    startTime: '20:30',
    modality: 'society',
    category: 'veterano',
  },
]

export const MODALITIES: { id: Modality; label: string; sublabel: string }[] = [
  { id: 'futsal', label: 'Futsal', sublabel: 'Futebol de Salão' },
  { id: 'campo', label: 'Campo', sublabel: 'Futebol de Campo' },
  { id: 'society', label: 'Society', sublabel: 'Futebol Society' },
]

export const CATEGORIES: { id: Category; label: string; sublabel: string }[] = [
  { id: 'competitivo', label: 'Competitivo', sublabel: 'Esporte' },
  { id: 'veterano', label: 'Veterano', sublabel: '35+ anos' },
  { id: 'master', label: 'Master', sublabel: '45+ anos' },
  { id: 'feminino', label: 'Feminino', sublabel: 'Exclusivo' },
  { id: 'masculino', label: 'Masculino', sublabel: 'Exclusivo' },
]

export const MATCHMAKING_MODES: {
  id: MatchmakingMode
  label: string
  description: string
  icon: string
}[] = [
  {
    id: 'balanced',
    label: 'Balanceamento Pro',
    description: 'Prioriza skill rating e histórico W/L similar',
    icon: 'scale',
  },
  {
    id: 'random',
    label: 'Aleatório',
    description: 'Matchmaking randomizado por modalidade',
    icon: 'shuffle',
  },
  {
    id: 'varied',
    label: 'Oponentes Variados',
    description: 'Diversifica regiões e estilos de jogo',
    icon: 'globe',
  },
]

export function getMatchmakingScore(
  team: MatchTeam,
  myTeam: MatchTeam,
): number {
  const skillDiff = Math.abs(team.skillRating - myTeam.skillRating)
  const distanceScore =
    team.distanceKm === 0 ? 100 : Math.max(0, 100 - team.distanceKm * 5)
  const skillScore = Math.max(0, 100 - skillDiff / 5)
  const winRateMy = myTeam.wins / (myTeam.wins + myTeam.losses + myTeam.draws)
  const winRateTeam = team.wins / (team.wins + team.losses + team.draws)
  const winRateDiff = Math.abs(winRateMy - winRateTeam) * 100
  const winRateScore = Math.max(0, 100 - winRateDiff * 3)
  return Math.round(skillScore * 0.4 + distanceScore * 0.3 + winRateScore * 0.3)
}

export function getFormColor(result: 'W' | 'L' | 'D'): string {
  switch (result) {
    case 'W':
      return 'bg-green-500 text-white'
    case 'L':
      return 'bg-red-500 text-white'
    case 'D':
      return 'bg-yellow-500 text-black'
  }
}

export function getWinRate(team: MatchTeam): number {
  const total = team.wins + team.losses + team.draws
  return total > 0 ? Math.round((team.wins / total) * 100) : 0
}
