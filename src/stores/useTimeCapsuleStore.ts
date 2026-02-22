import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockCurrentUser } from '@/lib/data'
import useNotificationStore from '@/stores/useNotificationStore'

export interface TimeCapsule {
  id: string
  userId: string
  title: string
  description: string
  type: 'video' | 'text'
  content: string
  createdAt: string
  openAt: string
  status: 'sealed' | 'waiting' | 'released' | 'archived'
  statsAtCreation: {
    points: number
    rating: number
    level: number
  }
}

interface TimeCapsuleState {
  capsules: TimeCapsule[]
  addCapsule: (
    capsule: Omit<
      TimeCapsule,
      'id' | 'status' | 'statsAtCreation' | 'userId' | 'createdAt'
    >,
  ) => void
  archiveCapsule: (id: string) => void
  checkReleases: () => void
}

const mockCapsules: TimeCapsule[] = [
  {
    id: 'tc1',
    userId: 'u1',
    title: 'Ser titular no campeonato',
    description: 'Promessa de me dedicar aos treinos físicos e táticos.',
    type: 'text',
    content:
      'Vou focar na minha resistência e velocidade. Não vou desistir de ser titular.',
    createdAt: new Date(Date.now() - 365 * 86400000).toISOString(),
    openAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    status: 'released',
    statsAtCreation: {
      points: 500,
      rating: 3.8,
      level: 5,
    },
  },
  {
    id: 'tc2',
    userId: 'u1',
    title: 'Bolsa internacional',
    description: 'Jogar fora do país em 2 anos.',
    type: 'video',
    content:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    createdAt: new Date().toISOString(),
    openAt: new Date(Date.now() + 2 * 365 * 86400000).toISOString(), // 2 years
    status: 'sealed',
    statsAtCreation: {
      points: 1250,
      rating: 4.8,
      level: 15,
    },
  },
  {
    id: 'tc3',
    userId: 'u1',
    title: 'Conquistar o MVP',
    description: 'Ser o melhor jogador da liga regional.',
    type: 'text',
    content: 'Treinar finalização todos os dias depois do treino principal.',
    createdAt: new Date(Date.now() - 170 * 86400000).toISOString(),
    openAt: new Date(Date.now() + 5 * 86400000).toISOString(), // 5 days
    status: 'waiting',
    statsAtCreation: {
      points: 800,
      rating: 4.0,
      level: 8,
    },
  },
]

export const useTimeCapsuleStore = create<TimeCapsuleState>()(
  persist(
    (set) => ({
      capsules: mockCapsules,
      addCapsule: (data) =>
        set((state) => {
          const newCapsule: TimeCapsule = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            userId: mockCurrentUser.id,
            createdAt: new Date().toISOString(),
            status: 'sealed',
            statsAtCreation: {
              points: mockCurrentUser.points || 0,
              rating: mockCurrentUser.stats?.rating || 4.8,
              level: mockCurrentUser.level || 1,
            },
          }
          return { capsules: [newCapsule, ...state.capsules] }
        }),
      archiveCapsule: (id) =>
        set((state) => ({
          capsules: state.capsules.map((c) =>
            c.id === id ? { ...c, status: 'archived' } : c,
          ),
        })),
      checkReleases: () =>
        set((state) => {
          const now = Date.now()
          let updated = false
          const newCapsules = state.capsules.map((c) => {
            if (c.status === 'archived' || c.status === 'released') return c
            const openTime = new Date(c.openAt).getTime()

            if (openTime <= now) {
              updated = true
              useNotificationStore.getState().addNotification({
                title: 'Time Capsule Liberada!',
                message:
                  'Sua Time Capsule foi aberta. Veja sua promessa do passado.',
                type: 'system',
                priority: 'high',
                link: `/timecapsule/${c.id}`,
              })
              return { ...c, status: 'released' }
            } else if (
              openTime > now &&
              openTime - now <= 7 * 86400000 &&
              c.status === 'sealed'
            ) {
              updated = true
              return { ...c, status: 'waiting' }
            }
            return c
          })
          return updated ? { capsules: newCapsules } : state
        }),
    }),
    {
      name: 'goplay-timecapsule',
    },
  ),
)
