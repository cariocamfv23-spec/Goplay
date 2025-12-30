import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ContractStatus =
  | 'draft'
  | 'pending'
  | 'active'
  | 'completed'
  | 'rejected'

export interface ContractMetric {
  id: string
  label: string
  currentValue: number
  targetValue: number
  unit: string
  impactValue: number // The value added to the contract if target is met (or scaled)
  type: 'milestone' | 'linear' // Milestone: All or nothing. Linear: Proportional.
}

export interface LiveContract {
  id: string
  title: string
  proposerName: string
  proposerLogo: string
  athleteName: string
  baseValue: number
  currency: string
  status: ContractStatus
  startDate: string
  endDate: string
  metrics: ContractMetric[]
  createdAt: string
}

interface ContractState {
  contracts: LiveContract[]
  addContract: (contract: Omit<LiveContract, 'id' | 'createdAt'>) => void
  updateContractStatus: (id: string, status: ContractStatus) => void
  updateMetricProgress: (
    contractId: string,
    metricId: string,
    value: number,
  ) => void
  getContractValue: (contract: LiveContract) => number
}

// Mock initial data
const initialContracts: LiveContract[] = [
  {
    id: 'c1',
    title: 'Patrocínio Master 2024',
    proposerName: 'Red Bull',
    proposerLogo: 'https://img.usecurling.com/i?q=red%20bull%20logo&color=red',
    athleteName: 'Alex Silva',
    baseValue: 1500,
    currency: 'R$',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    metrics: [
      {
        id: 'm1',
        label: 'Gols na Temporada',
        currentValue: 12,
        targetValue: 20,
        unit: 'gols',
        impactValue: 500,
        type: 'linear',
      },
      {
        id: 'm2',
        label: 'Posts no Instagram',
        currentValue: 5,
        targetValue: 10,
        unit: 'posts',
        impactValue: 300,
        type: 'milestone',
      },
      {
        id: 'm3',
        label: 'Partidas Jogadas',
        currentValue: 15,
        targetValue: 30,
        unit: 'jogos',
        impactValue: 200,
        type: 'linear',
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c2',
    title: 'Embaixador da Marca',
    proposerName: 'Nike',
    proposerLogo: 'https://img.usecurling.com/i?q=nike%20logo&color=black',
    athleteName: 'Alex Silva',
    baseValue: 2000,
    currency: 'R$',
    status: 'pending',
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    metrics: [
      {
        id: 'm1',
        label: 'Seguidores Novos',
        currentValue: 0,
        targetValue: 5000,
        unit: 'followers',
        impactValue: 1000,
        type: 'linear',
      },
    ],
    createdAt: new Date().toISOString(),
  },
]

export const useContractStore = create<ContractState>()(
  persist(
    (set, get) => ({
      contracts: initialContracts,

      addContract: (contractData) =>
        set((state) => ({
          contracts: [
            {
              ...contractData,
              id: `lc-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
            ...state.contracts,
          ],
        })),

      updateContractStatus: (id, status) =>
        set((state) => ({
          contracts: state.contracts.map((c) =>
            c.id === id ? { ...c, status } : c,
          ),
        })),

      updateMetricProgress: (contractId, metricId, value) =>
        set((state) => ({
          contracts: state.contracts.map((c) => {
            if (c.id !== contractId) return c
            return {
              ...c,
              metrics: c.metrics.map((m) =>
                m.id === metricId ? { ...m, currentValue: value } : m,
              ),
            }
          }),
        })),

      getContractValue: (contract) => {
        let total = contract.baseValue
        contract.metrics.forEach((m) => {
          if (m.type === 'milestone') {
            if (m.currentValue >= m.targetValue) {
              total += m.impactValue
            }
          } else if (m.type === 'linear') {
            const progress = Math.min(1, m.currentValue / m.targetValue)
            total += m.impactValue * progress
          }
        })
        return Math.floor(total) // Round down for simplicity
      },
    }),
    {
      name: 'goplay-live-contracts',
    },
  ),
)
