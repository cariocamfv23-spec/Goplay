import { ProfileData } from './data'

export type AuraType = 'gold' | 'neon' | 'nature' | 'royal' | 'none'
export type AuraIntensity = 'low' | 'medium' | 'high'
export type AuraAnimation = 'static' | 'pulse' | 'spin' | 'shimmer'

export interface AuraConfig {
  type: AuraType
  intensity: AuraIntensity
  animation: AuraAnimation
  colorStart: string
  colorEnd: string
  glowColor: string
  label?: string
  title?: string
  description?: string
}

export const AURA_CONFIGS: Record<AuraType, Partial<AuraConfig>> = {
  gold: {
    colorStart: '#FFD700',
    colorEnd: '#FFFFFF',
    glowColor: 'rgba(255, 215, 0, 0.6)',
    label: 'High Performance',
    title: 'Alta Performance',
    description:
      'Concedida a atletas com rating superior a 4.8 ou múltiplos MVPs.',
  },
  neon: {
    colorStart: '#00F0FF',
    colorEnd: '#0066FF',
    glowColor: 'rgba(0, 240, 255, 0.6)',
    label: 'Viral',
    title: 'Viral',
    description:
      'Para perfis com alto engajamento, seguidores e visualizações.',
  },
  nature: {
    colorStart: '#10B981',
    colorEnd: '#3B82F6',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    label: 'Evolution',
    title: 'Evolução Constante',
    description: 'Atletas consistentes que estão subindo de nível rapidamente.',
  },
  royal: {
    colorStart: '#D946EF',
    colorEnd: '#8B5CF6',
    glowColor: 'rgba(217, 70, 239, 0.6)',
    label: 'Opportunities',
    title: 'Oportunidade Ativa',
    description: 'Perfis sendo observados por scouts ou com propostas ativas.',
  },
  none: {
    colorStart: 'transparent',
    colorEnd: 'transparent',
    glowColor: 'transparent',
    title: 'Iniciante',
    description: 'Continue jogando para desbloquear sua aura.',
  },
}

export const getAuraConfig = (profile: ProfileData): AuraConfig => {
  let type: AuraType = 'none'
  let intensity: AuraIntensity = 'low'
  let animation: AuraAnimation = 'static'

  // 1. Check for Active Opportunities (Highest Priority) - Royal Aura (Pink/Purple)
  if (profile.isDiscovered || (profile.ranking && profile.ranking <= 3)) {
    type = 'royal'
    intensity = 'high'
    animation = 'spin'
  }
  // 2. Check for High Performance/Rating - Gold Aura (Gold/White)
  else if (
    (profile.rating && profile.rating >= 4.8) ||
    (profile.stats?.mvp && profile.stats.mvp > 5)
  ) {
    type = 'gold'
    intensity = 'high'
    animation = 'pulse'
  }
  // 3. Check for Engagement/Viral - Neon Aura (Blue/Cyan)
  else if (
    (profile.followers &&
      (profile.followers.includes('k') ||
        parseInt(profile.followers) > 1000)) ||
    (profile.totalViews && profile.totalViews > 10000)
  ) {
    type = 'neon'
    intensity = 'medium'
    animation = 'pulse'
  }
  // 4. Check for Growth/Evolution - Nature Aura (Green/Blue)
  else if (profile.level && profile.level > 10) {
    type = 'nature'
    intensity = 'medium'
    animation = 'shimmer'
  }

  // Adjust intensity based on recent activity
  if (type !== 'none' && !intensity) {
    intensity = 'low'
  }

  if (type !== 'none' && !animation) {
    animation = 'static'
  }

  const config = AURA_CONFIGS[type]

  return {
    type,
    intensity,
    animation,
    colorStart: config.colorStart || 'transparent',
    colorEnd: config.colorEnd || 'transparent',
    glowColor: config.glowColor || 'transparent',
    label: config.label,
    title: config.title,
    description: config.description,
  }
}
