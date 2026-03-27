import { useEffect, useState } from 'react'
import { useInvisiblePresenceStore } from '@/stores/useInvisiblePresenceStore'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/Logo'
import { Sparkles } from 'lucide-react'

export function InvisiblePresenceOverlay() {
  const { isActive, message, clearSession } = useInvisiblePresenceStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(clearSession, 800) // Wait for fade out animation
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isActive, clearSession])

  if (!isActive && !isVisible) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl transition-opacity duration-700',
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[hsl(var(--gold)/0.05)]" />

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center animate-in slide-in-from-bottom-8 zoom-in-95 duration-700">
        <Logo
          variant="icon"
          className="h-16 w-16 mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]"
        />

        <div className="flex items-center gap-2 mb-4 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Aviso do Sistema
          </span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="text-3xl font-black text-foreground leading-tight tracking-tight drop-shadow-sm">
          {message || 'A grandeza exige tempo. Seu palco está sendo preparado.'}
        </h2>

        <div className="mt-8 flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
