import { useEffect, useRef } from 'react'
import { useRankingStore } from '@/stores/useRankingStore'
import useNotificationStore from '@/stores/useNotificationStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { getRankings } from '@/lib/ranking-utils'
import { mockCurrentUser } from '@/lib/data'

export function RankingAlertManager() {
  const { lastWeeklyRank, updateLastWeeklyRank } = useRankingStore()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const navigate = useNavigate()

  // Use a ref to prevent spamming notifications if re-renders happen quickly
  const lastCheckTime = useRef(Date.now())

  useEffect(() => {
    const checkRanking = () => {
      // Calculate current actual rank based on our deterministic utility
      // We focus on 'weekly' 'points' as the main ranking driver
      const currentRankings = getRankings('weekly', 'points')
      const userEntry = currentRankings.find(
        (r) => r.user.id === mockCurrentUser.id,
      )

      if (!userEntry) return

      const currentRank = userEntry.position

      // Initial state sync (if first time ever, don't notify, just set)
      if (lastWeeklyRank === 0) {
        updateLastWeeklyRank(currentRank)
        return
      }

      // Check if rank changed significantly (>= 1 spot)
      if (currentRank !== lastWeeklyRank) {
        const difference = lastWeeklyRank - currentRank // Positive means improvement (e.g. 8 -> 5 = 3)
        const isImprovement = difference > 0
        const absDiff = Math.abs(difference)

        // Only notify if there is a change
        if (absDiff >= 1) {
          const title = isImprovement ? 'Subiu no Ranking!' : 'Caiu no Ranking'

          const message = isImprovement
            ? `Parabéns! Você subiu ${absDiff} ${absDiff === 1 ? 'posição' : 'posições'} no Ranking Semanal. Agora você está em #${currentRank}.`
            : `Atenção! Você desceu ${absDiff} ${absDiff === 1 ? 'posição' : 'posições'} no Ranking Semanal. Agora você está em #${currentRank}.`

          // Add app notification history
          addNotification({
            title,
            message,
            type: 'ranking',
            priority: isImprovement ? 'high' : 'medium', // Downgrade isn't critical, just alert
            link: '/ranking?tab=weekly',
            date: 'Agora',
          })

          // Add Toast for immediate feedback
          toast(title, {
            description: message,
            action: {
              label: 'Ver Ranking',
              onClick: () => navigate('/ranking?tab=weekly'),
            },
            duration: 8000,
            // Style the toast based on improvement or drop
            className: isImprovement
              ? 'border-l-4 border-l-green-500'
              : 'border-l-4 border-l-orange-500',
          })

          // Update store so we don't notify again for this specific change
          updateLastWeeklyRank(currentRank)
        }
      }
    }

    // Run check immediately on mount (simulating "while you were away")
    const initialTimer = setTimeout(checkRanking, 2000)

    // Run periodic checks to simulate real-time updates (every 10 seconds)
    const intervalTimer = setInterval(checkRanking, 10000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalTimer)
    }
  }, [lastWeeklyRank, updateLastWeeklyRank, addNotification, navigate])

  return null
}
