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
}

export const AURA_CONFIGS: Record<AuraType, Partial<AuraConfig>> = {
  gold: {
    colorStart: '#FFD700',
    colorEnd: '#FFA500',
    glowColor: 'rgba(255, 215, 0, 0.6)',
    label: 'Top Performance',
  },
  neon: {
    colorStart: '#00F0FF',
    colorEnd: '#0066FF',
    glowColor: 'rgba(0, 240, 255, 0.6)',
    label: 'Viral',
  },
  nature: {
    colorStart: '#10B981',
    colorEnd: '#34D399',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    label: 'Evolving',
  },
  royal: {
    colorStart: '#8B5CF6',
    colorEnd: '#6D28D9',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    label: 'Scouted',
  },
  none: {
    colorStart: 'transparent',
    colorEnd: 'transparent',
    glowColor: 'transparent',
  },
}

export const getAuraConfig = (profile: ProfileData): AuraConfig => {
  let type: AuraType = 'none'
  let intensity: AuraIntensity = 'low'
  let animation: AuraAnimation = 'static'

  // 1. Check for Active Opportunities (Highest Priority) - Royal Aura
  if (profile.isDiscovered || (profile.ranking && profile.ranking <= 3)) {
    type = 'royal'
    intensity = 'high'
    animation = 'spin'
  }
  // 2. Check for High Performance/Rating - Gold Aura
  else if (
    (profile.rating && profile.rating >= 4.8) ||
    (profile.stats?.mvp && profile.stats.mvp > 5)
  ) {
    type = 'gold'
    intensity = 'high'
    animation = 'pulse'
  }
  // 3. Check for Engagement/Viral - Neon Aura
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
  // 4. Check for Growth/Evolution - Nature Aura
  else if (profile.level && profile.level > 10) {
    type = 'nature'
    intensity = 'medium'
    animation = 'shimmer'
  }

  // Adjust intensity based on recent activity (mocked via random for visual variance if needed,
  // but strictly mostly deterministic here)
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
  }
}
