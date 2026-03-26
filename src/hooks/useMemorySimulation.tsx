import useNotificationStore from '@/stores/useNotificationStore'
import { mockDailyMemories } from '@/lib/data'

export function useMemorySimulation() {
  const { addNotification } = useNotificationStore()

  const simulateMemory = () => {
    const todayMemory = mockDailyMemories['today']

    if (todayMemory && todayMemory.items.length > 0) {
      const yearsAgo = todayMemory.items[0].yearsAgo

      addNotification({
        title: 'Goplay Memory ⏳',
        message: `Revisite um momento especial! Veja o que você postou neste dia há ${yearsAgo} ano(s).`,
        type: 'time_travel',
        priority: 'high',
        link: `modal:${todayMemory.id}`,
      })
    }
  }

  return { simulateMemory }
}
