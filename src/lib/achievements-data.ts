import {
  Trophy,
  Star,
  Heart,
  Camera,
  Compass,
  Flame,
  Medal,
  Crown,
} from 'lucide-react'

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface AchievementDef {
  id: string
  name: string
  description: string
  rarity: AchievementRarity
  type: string
  target: number
  reward: {
    points: number
    badge?: string
  }
  icon: any
  active: boolean
  isHidden?: boolean
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'login_1',
    name: 'Primeiro Passo',
    description: 'Faça login na plataforma pela primeira vez.',
    rarity: 'common',
    type: 'daily_login',
    target: 1,
    reward: { points: 50 },
    icon: Flame,
    active: true,
  },
  {
    id: 'like_10',
    name: 'Apoiador Oficial',
    description: 'Deixe 10 curtidas em publicações.',
    rarity: 'common',
    type: 'like_post',
    target: 10,
    reward: { points: 100 },
    icon: Heart,
    active: true,
  },
  {
    id: 'explore_5',
    name: 'Explorador Curioso',
    description: 'Explore 5 categorias diferentes no mapa ou busca.',
    rarity: 'rare',
    type: 'explore_category',
    target: 5,
    reward: { points: 250 },
    icon: Compass,
    active: true,
  },
  {
    id: 'create_5',
    name: 'Voz da Comunidade',
    description: 'Crie 5 publicações no feed.',
    rarity: 'epic',
    type: 'create_post',
    target: 5,
    reward: { points: 500, badge: 'Criador' },
    icon: Camera,
    active: true,
  },
  {
    id: 'legend_1',
    name: 'Lenda Viva',
    description: 'Desbloqueie o status máximo engajando com o ecossistema.',
    rarity: 'legendary',
    type: 'like_post',
    target: 50,
    reward: { points: 5000, badge: 'Lenda' },
    icon: Crown,
    active: true,
    isHidden: true,
  },
]
