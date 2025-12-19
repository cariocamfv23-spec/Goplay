import { mockRankings, RankingEntry, SpecialAchievement } from '@/lib/data'

// Simple pseudo-random generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const getRankings = (
  timeRange: string,
  metric: string,
): RankingEntry[] => {
  // Generate extra users deterministically
  const extraUsers: RankingEntry[] = Array.from({ length: 20 }).map((_, i) => {
    const seed = i + 1000
    const hasAchievement = seededRandom(seed) > 0.75
    let achievement: SpecialAchievement | undefined

    if (hasAchievement) {
      const type = seededRandom(seed + 1)
      if (type > 0.8) achievement = { type: 'mvp', label: 'MVP da Rodada' }
      else if (type > 0.5) achievement = { type: 'streak', label: 'Em Chamas' }
      else if (type > 0.25) achievement = { type: 'veteran', label: 'Veterano' }
      else achievement = { type: 'rising_star', label: 'Revelação' }
    }

    return {
      id: `dummy_${i}`,
      position: 0,
      points: 1500 - i * 60 + Math.floor(seededRandom(seed + 2) * 200),
      trend:
        seededRandom(seed + 3) > 0.6
          ? 'up'
          : seededRandom(seed + 3) > 0.3
            ? 'down'
            : ('same' as 'up' | 'down' | 'same'),
      user: {
        id: `u_dummy_${i}`,
        name: `Atleta ${['Alpha', 'Beta', 'Gama', 'Delta', 'Sigma'][i % 5]} ${i + 1}`,
        avatar: `https://img.usecurling.com/ppl/medium?gender=${i % 2 === 0 ? 'male' : 'female'}&seed=${i + 200}`,
        team: ['Red Wolves', 'Blue Sharks', 'Green Eagles', 'Iron Team'][i % 4],
      },
      specialAchievement: achievement,
    }
  })

  // Combine original mock data with extra users
  // Filter out potential ID collisions
  const allEntries = [...mockRankings, ...extraUsers].filter(
    (v, i, a) => a.findIndex((t) => t.user.id === v.user.id) === i,
  )

  // Apply modifiers based on filters
  const seed = timeRange.length + metric.length

  const processedData = allEntries.map((entry) => {
    let baseValue = entry.points

    // Simulate different metrics scaling
    if (metric === 'wins') baseValue = Math.floor(baseValue / 20)
    else if (metric === 'matches') baseValue = Math.floor(baseValue / 15)
    else if (metric === 'assists') baseValue = Math.floor(baseValue / 40)

    // Simulate different time ranges scaling
    if (timeRange === 'daily') baseValue = Math.floor(baseValue / 30)
    else if (timeRange === 'weekly') baseValue = Math.floor(baseValue / 4)
    else if (timeRange === 'monthly') baseValue = Math.floor(baseValue / 1.5)

    // Add randomization to shuffle positions based on user ID and current filters
    const userFactor = entry.user.id.charCodeAt(entry.user.id.length - 1)
    const randomVariance = ((userFactor * seed) % 50) - 25

    // Ensure non-negative
    const finalValue = Math.max(0, baseValue + randomVariance)

    return {
      ...entry,
      points: finalValue,
    }
  })

  // Sort descending by value
  processedData.sort((a, b) => b.points - a.points)

  // Assign new positions
  return processedData.map((entry, index) => ({
    ...entry,
    position: index + 1,
  }))
}
