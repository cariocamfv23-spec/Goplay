import { useEffect } from 'react'
import useNotificationStore from '@/stores/useNotificationStore'
import { useMemoryNotificationState } from '@/stores/useMemoryNotificationState'
import { mockDailyMemories } from '@/lib/data'

export function MemoryNotificationManager() {
  const { addNotification } = useNotificationStore()
  const { lastNotifiedDate, setLastNotifiedDate } = useMemoryNotificationState()

  useEffect(() => {
    const todayStr = new Date().toDateString()

    if (lastNotifiedDate !== todayStr) {
      const todayMemory = mockDailyMemories['today']

      if (todayMemory && todayMemory.items.length > 0) {
        const yearsAgo = todayMemory.items[0].yearsAgo

        addNotification({
          title: 'Memória Goplay ⏳',
          message: `Revisite um momento especial! Veja o que você postou neste dia há ${yearsAgo} ano(s).`,
          type: 'time_travel',
          priority: 'high',
          link: `modal:${todayMemory.id}`,
        })

        setLastNotifiedDate(todayStr)
      }
    }
  }, [addNotification, lastNotifiedDate, setLastNotifiedDate])

  return null
}
