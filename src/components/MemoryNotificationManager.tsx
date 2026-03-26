import { useEffect } from 'react'
import { toast } from 'sonner'
import { History } from 'lucide-react'
import useNotificationStore from '@/stores/useNotificationStore'
import { useMemoryNotificationState } from '@/stores/useMemoryNotificationState'
import { mockDailyMemories } from '@/lib/data'
import { useFlashbackStore } from '@/stores/useFlashbackStore'

export function MemoryNotificationManager() {
  const { addNotification } = useNotificationStore()
  const { lastNotifiedDate, setLastNotifiedDate } = useMemoryNotificationState()
  const { openFlashback } = useFlashbackStore()

  useEffect(() => {
    const todayStr = new Date().toDateString()

    if (lastNotifiedDate !== todayStr) {
      const todayMemory = mockDailyMemories['today']

      if (todayMemory && todayMemory.items.length > 0) {
        const yearsAgo = todayMemory.items[0].yearsAgo

        const notifId = addNotification({
          title: 'Goplay Memory ⏳',
          message: `Revisite um momento especial! Veja o que você postou neste dia há ${yearsAgo} ano(s).`,
          type: 'time_travel',
          priority: 'high',
          link: `modal:${todayMemory.id}`,
        })

        setLastNotifiedDate(todayStr)

        toast.custom(
          (t) => (
            <div className="flex w-full items-center gap-3 rounded-2xl border-2 border-purple-500/30 bg-background/95 p-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-500">
                <History className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">
                  Lembrança Desbloqueada!
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-tight">
                  Você tem um Flashback esperando por você.
                </p>
              </div>
              <button
                onClick={() => {
                  toast.dismiss(t)
                  openFlashback(todayMemory.id, notifId)
                }}
                className="shrink-0 rounded-xl bg-purple-500 px-3 py-2 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-purple-500/20"
              >
                Ver Memória
              </button>
            </div>
          ),
          { duration: 6000, position: 'top-center' },
        )
      }
    }
  }, [addNotification, lastNotifiedDate, setLastNotifiedDate, openFlashback])

  return null
}
