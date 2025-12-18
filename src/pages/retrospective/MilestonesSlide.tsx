import { mockRetrospective } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function MilestonesSlide() {
  return (
    <div className="flex flex-col h-full w-full p-8 text-white relative overflow-hidden">
      <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-8 animate-in slide-in-from-top-4 fade-in duration-700">
        Marcos do Ano
      </h3>

      {/* Decorative Line */}
      <div className="absolute left-12 top-24 bottom-24 w-0.5 bg-white/20 rounded-full" />

      <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10">
        {mockRetrospective.milestones.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-6 animate-in slide-in-from-right fade-in duration-700 fill-mode-both',
            )}
            style={{ animationDelay: `${index * 300 + 200}ms` }}
          >
            <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center shadow-lg shrink-0 z-10">
              <item.icon className="w-4 h-4" />
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-1 hover:bg-white/20 transition-colors duration-300">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-mono opacity-70 bg-black/20 px-2 py-0.5 rounded-md">
                  {item.date}
                </span>
              </div>
              <p className="font-bold text-lg leading-tight">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
