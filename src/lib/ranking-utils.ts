import {
  mockRankings,
  RankingEntry,
  SpecialAchievement,
  mockChallenges,
  mockCurrentUser,
} from '@/lib/data'

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

  // Ensure current user is in the list with dynamic points to simulate real-time changes
  const userBasePoints = mockCurrentUser.points || 1250

  // Create a time-based fluctuation to simulate live ranking changes
  // Using a sine wave with a period of roughly 1-2 minutes to allow for "Rank Up" and "Rank Down" testing
  const timeFactor = Date.now() / 20000 // Slow oscillation
  const fluctuation = Math.floor(Math.sin(timeFactor) * 300) // +/- 300 points swing

  const currentUserEntry: RankingEntry = {
    id: 'current_user_entry',
    position: 0, // Calculated later
    points: Math.max(0, userBasePoints + fluctuation),
    trend: fluctuation > 0 ? 'up' : fluctuation < 0 ? 'down' : 'same',
    user: {
      id: mockCurrentUser.id,
      name: mockCurrentUser.name,
      avatar: mockCurrentUser.avatar,
      team: 'Goplay Team',
    },
    specialAchievement: { type: 'rising_star', label: 'Você' },
  }

  // Combine original mock data, extra users and current user
  const allEntries = [...mockRankings, ...extraUsers, currentUserEntry].filter(
    (v, i, a) => a.findIndex((t) => t.user.id === v.user.id) === i,
  )

  // Apply modifiers based on filters
  const seed = timeRange.length + metric.length

  const processedData = allEntries.map((entry) => {
    // Don't modify current user points with random filters, keep the time-based simulation
    if (entry.user.id === mockCurrentUser.id) {
      return entry
    }

    let baseValue = entry.points

    // Simulate different metrics scaling
    if (metric === 'wins') baseValue = Math.floor(baseValue / 20)
    else if (metric === 'matches') baseValue = Math.floor(baseValue / 15)
    else if (metric === 'assists') baseValue = Math.floor(baseValue / 40)
    else if (metric === 'goals') baseValue = Math.floor(baseValue / 50)
    else if (metric === 'km') baseValue = Math.floor(baseValue / 10)
    else if (metric === 'hits') baseValue = Math.floor(baseValue / 8)

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

export const getChallengeRankings = (challengeId: string): RankingEntry[] => {
  const challenge = mockChallenges.find((c) => c.id === challengeId)
  const metric = challenge?.metric || 'points'
  return getRankings('all_time', metric)
}
