export interface CallLog {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    online?: boolean
  }
  type: 'incoming' | 'outgoing' | 'missed'
  date: string
  duration?: string
  isVideo: boolean
}

export const mockCalls: CallLog[] = [
  {
    id: 'c1',
    user: {
      id: 'u2',
      name: 'Flamengo Oficial',
      avatar: 'https://img.usecurling.com/i?q=flamengo&color=red',
      online: true,
    },
    type: 'missed',
    date: 'Hoje, 10:45',
    isVideo: false,
  },
  {
    id: 'c2',
    user: {
      id: 'u3',
      name: 'Coach Carter',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=45',
    },
    type: 'outgoing',
    date: 'Ontem',
    duration: '5:23',
    isVideo: true,
  },
  {
    id: 'c3',
    user: {
      id: 'u4',
      name: 'Julia Santos',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=12',
      online: true,
    },
    type: 'incoming',
    date: 'Segunda',
    duration: '12:40',
    isVideo: false,
  },
  {
    id: 'c4',
    user: {
      id: 'u10',
      name: 'Gabriel Medina',
      avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=88',
    },
    type: 'missed',
    date: '22 Out',
    isVideo: true,
  },
  {
    id: 'c5',
    user: {
      id: 'u2',
      name: 'Flamengo Oficial',
      avatar: 'https://img.usecurling.com/i?q=flamengo&color=red',
    },
    type: 'outgoing',
    date: '20 Out',
    duration: '2:15',
    isVideo: false,
  },
]
