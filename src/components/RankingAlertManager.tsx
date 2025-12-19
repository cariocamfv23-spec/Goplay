import { useEffect } from 'react'
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

  useEffect(() => {
    // Simulate a ranking check shortly after app launch
    const timer = setTimeout(() => {
      // Calculate current actual rank based on our deterministic utility
      const currentRankings = getRankings('weekly', 'points')
      const userEntry = currentRankings.find(
        (r) => r.user.id === mockCurrentUser.id,
      )
      const currentRank = userEntry?.position || lastWeeklyRank

      // Check if rank changed significantly (>= 1 spot)
      if (currentRank !== lastWeeklyRank) {
        const difference = lastWeeklyRank - currentRank
        const isImprovement = difference > 0
        const absDiff = Math.abs(difference)

        if (absDiff >= 1) {
          const title = isImprovement
            ? 'Subiu no Ranking!'
            : 'Desceu no Ranking'
          const message = isImprovement
            ? `Parabéns! Você subiu ${absDiff} posições no Ranking Semanal. Agora você está em #${currentRank}.`
            : `Atenção! Você desceu ${absDiff} posições no Ranking Semanal.`

          // Add app notification
          addNotification({
            title,
            message,
            type: 'ranking',
            priority: isImprovement ? 'high' : 'medium',
            link: '/ranking?tab=weekly',
            date: 'Hoje',
          })

          // Add Toast
          toast(title, {
            description: message,
            action: {
              label: 'Ver Ranking',
              onClick: () => navigate('/ranking?tab=weekly'),
            },
            duration: 8000,
          })

          // Update store so we don't notify again for this specific change immediately
          updateLastWeeklyRank(currentRank)
        }
      }
    }, 4000) // 4 seconds delay to simulate "new arrival"

    return () => clearTimeout(timer)
  }, [lastWeeklyRank, updateLastWeeklyRank, addNotification, navigate])

  return null
}
