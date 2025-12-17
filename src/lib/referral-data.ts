export type ReferralStatus = 'sent' | 'downloaded' | 'registered'

export interface Referral {
  id: string
  name: string
  avatar: string
  status: ReferralStatus
  date: string
  pointsEarned?: number
  bonusApplied?: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  bonusPoints: number
  color: string
  icon?: string
}

// Helper to get dates relative to now for demo purposes
const now = new Date()
const fiveDaysAgo = new Date(now)
fiveDaysAgo.setDate(now.getDate() - 5)
const tenDaysFromNow = new Date(now)
tenDaysFromNow.setDate(now.getDate() + 10)

export const mockPromotions: Promotion[] = [
  {
    id: 'promo1',
    title: 'Verão de Prêmios',
    description: 'Convide amigos e ganhe bônus extra por cada cadastro!',
    startDate: fiveDaysAgo.toISOString(),
    endDate: tenDaysFromNow.toISOString(),
    bonusPoints: 100,
    color: 'from-orange-500 to-red-600',
    icon: 'sun',
  },
  {
    id: 'promo2',
    title: 'Sprint Final',
    description: 'Últimos dias para dobrar seus pontos.',
    startDate: '2025-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    bonusPoints: 200,
    color: 'from-blue-500 to-cyan-500',
    icon: 'zap',
  },
]

export const mockReferrals: Referral[] = [
  {
    id: 'r1',
    name: 'Carlos Eduardo',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=50',
    status: 'registered',
    date: 'Hoje, 10:30',
    pointsEarned: 300,
    bonusApplied: 'Verão de Prêmios',
  },
  {
    id: 'r2',
    name: 'Mariana Lima',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=51',
    status: 'downloaded',
    date: 'Ontem, 15:45',
  },
  {
    id: 'r3',
    name: 'Felipe Costa',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=52',
    status: 'sent',
    date: '2 dias atrás',
  },
  {
    id: 'r4',
    name: 'Ana Souza',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=53',
    status: 'registered',
    date: '1 semana atrás',
    pointsEarned: 200,
  },
  {
    id: 'r5',
    name: 'Bruno Silva',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=54',
    status: 'sent',
    date: '2 semanas atrás',
  },
]
