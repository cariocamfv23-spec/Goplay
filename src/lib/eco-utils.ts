import { ProfileData } from './data'

export interface EcoConfig {
  active: boolean
  resonance: number // Overall impact score (0-100)
  frequency: number // Speed of ripples (0-100)
  range: number // Size of expansion (0-100)
  colorTheme: 'gold' | 'purple' | 'cyan' | 'nature' | 'neutral'
  particles: boolean
  description: string
}

/**
 * Calculates the "Eco Humano" (Human Echo) configuration based on athlete's real-time data.
 * This determines the visual properties of the organic waves radiating from the profile.
 */
export function getEcoConfig(profile: ProfileData): EcoConfig {
  const stats = profile.stats || { matches: 0, wins: 0, mvp: 0 }
  const level = profile.level || 1

  // 1. Calculate Resonance (Impact) based on Engagement & Level
  // High followers or high level = higher resonance (intensity)
  let resonance = 20 // Base resonance
  const followerCount = parseFollowers(profile.followers || '0')
  resonance += Math.min(followerCount / 100, 40) // Up to 40 pts from followers
  resonance += Math.min(level * 2, 40) // Up to 40 pts from level
  resonance = Math.min(resonance, 100)

  // 2. Calculate Frequency based on Activity (Matches & Training)
  // More matches/MVPs = higher frequency (speed of waves)
  let frequency = 20
  frequency += Math.min(stats.matches, 50)
  frequency += Math.min(stats.mvp * 5, 30)
  frequency = Math.min(frequency, 100)

  // 3. Calculate Range based on Reach (Followers & Views)
  // Wider influence = wider physical waves
  let range = 30
  const views = profile.totalViews || 0
  range += Math.min(views / 500, 50)
  range += Math.min(followerCount / 50, 20)
  range = Math.min(range, 100)

  // 4. Determine Color Theme based on Dominant Trait (Evolution)
  let colorTheme: EcoConfig['colorTheme'] = 'neutral'

  if (stats.mvp > 10 || resonance > 80) {
    colorTheme = 'gold' // High Performance / Legend
  } else if (profile.isDiscovered || resonance > 60) {
    colorTheme = 'purple' // Rising Star / Influential
  } else if (stats.matches > 50) {
    colorTheme = 'cyan' // Consistent / Active
  } else if (level > 5) {
    colorTheme = 'nature' // Growing
  }

  // 5. Particles for "Overcoming" moments (High recent activity or milestones)
  // Simplified logic: High level or MVPs triggers particles
  const particles = stats.mvp > 0 || level > 10

  // 6. Semantic Description
  let description = 'Iniciando jornada'
  if (resonance > 80) description = 'Influência Lendária'
  else if (resonance > 60) description = 'Alto Impacto Social'
  else if (resonance > 40) description = 'Crescimento Constante'
  else description = 'Eco em Expansão'

  return {
    active: true,
    resonance,
    frequency,
    range,
    colorTheme,
    particles,
    description,
  }
}

// Helper to parse "1.2k" or "100" string to number
function parseFollowers(followers: string): number {
  if (!followers) return 0
  const lower = followers.toLowerCase()
  if (lower.includes('k')) {
    return parseFloat(lower.replace('k', '')) * 1000
  }
  if (lower.includes('m')) {
    return parseFloat(lower.replace('m', '')) * 1000000
  }
  return parseInt(lower) || 0
}
