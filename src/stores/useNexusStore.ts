import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { initialTribes } from '@/lib/mockNexusData'

export interface NexusEvent {
  id: string
  title: string
  date: string
  location: string
}

export interface Tribe {
  id: string
  name: string
  category: string
  description: string
  icon: string
  cover: string
  isPrivate: boolean
  creatorId: string
  members: string[]
  pendingRequests: string[]
  events: NexusEvent[]
}

interface NexusState {
  tribes: Tribe[]
  createTribe: (
    tribe: Omit<Tribe, 'id' | 'members' | 'pendingRequests' | 'events'>,
  ) => void
  joinTribe: (tribeId: string, userId: string) => void
  approveRequest: (tribeId: string, userId: string) => void
  declineRequest: (tribeId: string, userId: string) => void
}

export const useNexusStore = create<NexusState>()(
  persist(
    (set) => ({
      tribes: initialTribes,
      createTribe: (data) =>
        set((state) => {
          const newTribe: Tribe = {
            ...data,
            id: `t${Date.now()}`,
            members: [data.creatorId],
            pendingRequests: [],
            events: [],
          }
          toast.success('Tribo criada com sucesso!')
          return { tribes: [...state.tribes, newTribe] }
        }),
      joinTribe: (tribeId, userId) =>
        set((state) => {
          return {
            tribes: state.tribes.map((t) => {
              if (t.id === tribeId) {
                if (t.isPrivate) {
                  if (!t.pendingRequests.includes(userId)) {
                    toast.success('Solicitação enviada ao administrador.')
                    return {
                      ...t,
                      pendingRequests: [...t.pendingRequests, userId],
                    }
                  }
                } else {
                  if (!t.members.includes(userId)) {
                    toast.success('Bem-vindo à tribo!')
                    return { ...t, members: [...t.members, userId] }
                  }
                }
              }
              return t
            }),
          }
        }),
      approveRequest: (tribeId, userId) =>
        set((state) => {
          return {
            tribes: state.tribes.map((t) => {
              if (t.id === tribeId) {
                toast.success('Membro aprovado!')
                return {
                  ...t,
                  pendingRequests: t.pendingRequests.filter(
                    (id) => id !== userId,
                  ),
                  members: [...t.members, userId],
                }
              }
              return t
            }),
          }
        }),
      declineRequest: (tribeId, userId) =>
        set((state) => {
          return {
            tribes: state.tribes.map((t) => {
              if (t.id === tribeId) {
                toast.info('Solicitação recusada.')
                return {
                  ...t,
                  pendingRequests: t.pendingRequests.filter(
                    (id) => id !== userId,
                  ),
                }
              }
              return t
            }),
          }
        }),
    }),
    {
      name: 'goplay-nexus-storage',
    },
  ),
)
