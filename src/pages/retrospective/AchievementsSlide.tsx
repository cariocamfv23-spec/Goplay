import { mockRetrospective } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function AchievementsSlide() {
  return (
    <div className="flex flex-col h-full w-full p-8 text-white">
      <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-6 animate-in slide-in-from-top-4 fade-in duration-700">
        Conquistas Desbloqueadas
      </h3>

      <div className="flex-1 grid grid-rows-3 gap-4">
        {mockRetrospective.achievements.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'relative overflow-hidden rounded-3xl p-6 flex items-center gap-4 border border-white/20 shadow-lg animate-in zoom-in-90 fade-in duration-500 fill-mode-both',
              index === 0
                ? 'bg-gradient-to-br from-white/20 to-white/5'
                : index === 1
                  ? 'bg-gradient-to-br from-white/15 to-white/5'
                  : 'bg-gradient-to-br from-white/10 to-white/5',
            )}
            style={{ animationDelay: `${index * 250 + 200}ms` }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <item.icon className="w-32 h-32" />
            </div>

            <div
              className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0',
                'bg-white text-primary',
              )}
            >
              <item.icon className="w-7 h-7" />
            </div>

            <div className="relative z-10">
              <h4 className="font-bold text-xl leading-none mb-1">
                {item.title}
              </h4>
              <p className="text-xs opacity-80 leading-relaxed max-w-[140px]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
