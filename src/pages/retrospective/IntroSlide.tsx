import { mockRetrospective } from '@/lib/data'
import { Sparkles, Play } from 'lucide-react'
import { useRetrospectiveStore } from '@/stores/useRetrospectiveStore'
import { cn } from '@/lib/utils'

export default function IntroSlide() {
  const { getTheme } = useRetrospectiveStore()
  const currentTheme = getTheme()

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center text-white space-y-8">
      <div className="animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both">
        <div className="w-24 h-24 bg-white rounded-3xl rotate-12 flex items-center justify-center shadow-2xl mb-6 mx-auto">
          <Play
            className={cn('w-12 h-12 fill-current ml-1', currentTheme.icon)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-widest uppercase opacity-90 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500 fill-mode-both">
          Sua Retrospectiva
        </h2>
        <h1 className="text-7xl font-black tracking-tighter animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both">
          {mockRetrospective.year}
        </h1>
      </div>

      <div className="animate-in fade-in duration-1000 delay-1000 fill-mode-both">
        <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 flex items-center gap-2">
          <Sparkles
            className={cn('w-4 h-4 animate-pulse', currentTheme.icon)}
          />
          <span className="font-semibold text-sm">Goplay Wrapped</span>
        </div>
      </div>
    </div>
  )
}
