export type ReferralStatus = 'sent' | 'downloaded' | 'registered'

export interface Referral {
  id: string
  name: string
  avatar: string
  status: ReferralStatus
  date: string
}

export const mockReferrals: Referral[] = [
  {
    id: 'r1',
    name: 'Carlos Eduardo',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=50',
    status: 'registered',
    date: 'Hoje, 10:30',
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
  },
  {
    id: 'r5',
    name: 'Bruno Silva',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=54',
    status: 'sent',
    date: '2 semanas atrás',
  },
]
