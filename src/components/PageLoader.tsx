import { Logo } from '@/components/Logo'
import { AppIcon } from '@/components/AppIcon'

export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-background/50 flex items-center justify-center border border-border/50 shadow-xl backdrop-blur-sm z-20 relative animate-in fade-in zoom-in duration-700">
            <AppIcon className="w-16 h-16" />
          </div>
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse delay-75 pointer-events-none z-10" />
        </div>

        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
          <Logo variant="text" className="text-4xl" />
        </div>

        <div className="mt-2 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
