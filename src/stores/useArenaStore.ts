import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockCurrentUser, mockFeedUsers } from '@/lib/data'

export interface ArenaChallenge {
  id: string
  creatorId: string
  modality: string
  type: string
  title: string
  description: string
  rules: string
  criteria: string
  startDate: string
  endDate: string
  audience: string
  videoRequired: boolean
  moveDataAllowed: boolean
  status: 'active' | 'upcoming' | 'ended'
  banner: string
}

export interface ArenaParticipation {
  id: string
  challengeId: string
  athleteId: string
  videoUrl?: string
  moveData?: string
  aiScore?: number
  communityScore?: number
  proScore?: number
  finalScore?: number
  status: 'submitted' | 'analyzing' | 'evaluated'
  createdAt: string
  athlete?: any
}

interface ArenaState {
  challenges: ArenaChallenge[]
  participations: ArenaParticipation[]
  addChallenge: (
    c: Omit<ArenaChallenge, 'id' | 'creatorId' | 'status' | 'banner'>,
  ) => void
  addParticipation: (
    p: Omit<
      ArenaParticipation,
      | 'id'
      | 'athleteId'
      | 'status'
      | 'createdAt'
      | 'aiScore'
      | 'communityScore'
      | 'proScore'
      | 'finalScore'
      | 'athlete'
    >,
  ) => void
}

const mockChallenges: ArenaChallenge[] = [
  {
    id: 'ac1',
    creatorId: 'u1',
    modality: 'Futebol',
    type: 'Precisão',
    title: 'Desafio do Travessão Pro',
    description:
      'Acerte o travessão de fora da área 3 vezes seguidas. A IA avaliará a distância e velocidade da bola.',
    rules: 'Vídeo sem cortes, distância mínima de 16m.',
    criteria: 'Precisão 50%, Força 30%, Estilo 20%',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    audience: 'Público geral',
    videoRequired: true,
    moveDataAllowed: false,
    status: 'active',
    banner:
      'https://img.usecurling.com/p/800/400?q=soccer%20goal%20crossbar&color=gold',
  },
  {
    id: 'ac2',
    creatorId: 'u2',
    modality: 'Corrida',
    type: 'Velocidade',
    title: 'Tiro de 100 Metros',
    description:
      'Quem é o mais rápido no tiro curto? Prove sua explosão e sincronize com o MOVE.',
    rules: 'Correr 100m, gravação em pista livre.',
    criteria: 'Tempo Oficial 80%, Aceleração Inicial 20%',
    startDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    endDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    audience: 'Público geral',
    videoRequired: false,
    moveDataAllowed: true,
    status: 'ended',
    banner:
      'https://img.usecurling.com/p/800/400?q=running%20track&color=orange',
  },
]

const mockParticipations: ArenaParticipation[] = [
  {
    id: 'p1',
    challengeId: 'ac1',
    athleteId: mockFeedUsers[0].id,
    videoUrl: 'https://video.mp4',
    aiScore: 85,
    communityScore: 90,
    proScore: 88,
    finalScore: 87.5,
    status: 'evaluated',
    createdAt: new Date().toISOString(),
    athlete: mockFeedUsers[0],
  },
  {
    id: 'p2',
    challengeId: 'ac1',
    athleteId: mockFeedUsers[1].id,
    videoUrl: 'https://video.mp4',
    aiScore: 95,
    communityScore: 85,
    proScore: 92,
    finalScore: 91.5,
    status: 'evaluated',
    createdAt: new Date().toISOString(),
    athlete: mockFeedUsers[1],
  },
  {
    id: 'p3',
    challengeId: 'ac1',
    athleteId: mockFeedUsers[2].id,
    videoUrl: 'https://video.mp4',
    aiScore: 75,
    communityScore: 80,
    proScore: 78,
    finalScore: 77.5,
    status: 'evaluated',
    createdAt: new Date().toISOString(),
    athlete: mockFeedUsers[2],
  },
]

export const useArenaStore = create<ArenaState>()(
  persist(
    (set) => ({
      challenges: mockChallenges,
      participations: mockParticipations,
      addChallenge: (data) =>
        set((state) => ({
          challenges: [
            {
              ...data,
              id: Math.random().toString(36).substr(2, 9),
              creatorId: mockCurrentUser.id,
              status: 'active',
              banner:
                'https://img.usecurling.com/p/800/400?q=stadium%20arena&color=purple',
            },
            ...state.challenges,
          ],
        })),
      addParticipation: (data) =>
        set((state) => ({
          participations: [
            {
              ...data,
              id: Math.random().toString(36).substr(2, 9),
              athleteId: mockCurrentUser.id,
              status: 'submitted',
              createdAt: new Date().toISOString(),
              athlete: mockCurrentUser,
            },
            ...state.participations,
          ],
        })),
    }),
    {
      name: 'goplay-arena-storage',
    },
  ),
)
