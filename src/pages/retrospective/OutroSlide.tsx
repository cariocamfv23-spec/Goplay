import { mockCurrentUser, mockRetrospective } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { RotateCcw, Share2, ArrowRight } from 'lucide-react'
import { useRetrospectiveStore } from '@/stores/useRetrospectiveStore'
import { cn } from '@/lib/utils'

interface OutroSlideProps {
  onRestart: () => void
  onFinish: () => void
}

export default function OutroSlide({ onRestart, onFinish }: OutroSlideProps) {
  const { getTheme } = useRetrospectiveStore()
  const currentTheme = getTheme()

  return (
    <div className="flex flex-col h-full w-full p-8 text-center items-center justify-center text-white space-y-8">
      <div className="relative animate-in zoom-in fade-in duration-1000">
        <div
          className={cn(
            'absolute inset-0 blur-3xl opacity-40 animate-pulse',
            currentTheme.accent,
          )}
        />
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 mx-auto">
          <img
            src={mockCurrentUser.avatar}
            className="w-full h-full object-cover"
            alt="Avatar"
          />
        </div>
        <div
          className={cn(
            'absolute -bottom-3 left-1/2 -translate-x-1/2 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider z-20 whitespace-nowrap',
            currentTheme.accent,
          )}
        >
          Lenda 2024
        </div>
      </div>

      <div className="space-y-4 max-w-xs animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both">
        <h2 className="text-3xl font-bold">
          Obrigado, <br />
          <span className={cn(currentTheme.accentText)}>
            {mockCurrentUser.name.split(' ')[0]}
          </span>
        </h2>
        <p className="text-sm opacity-80 leading-relaxed font-light">
          "{mockRetrospective.summary.message}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 fill-mode-both">
        <Button
          variant="outline"
          className={cn(
            'w-full h-12 rounded-xl border-2 bg-transparent font-bold transition-all duration-300',
            currentTheme.id === 'gold'
              ? 'border-gold text-gold hover:bg-gold/10 hover:text-gold hover:border-gold'
              : cn(currentTheme.accentText, currentTheme.ring),
          )}
          style={
            currentTheme.isCustom
              ? {
                  borderColor: 'var(--retro-accent)',
                  color: 'var(--retro-accent)',
                }
              : undefined
          }
          onClick={onRestart}
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Replay
        </Button>
        <Button
          className={cn(
            'w-full h-12 rounded-xl font-bold border-none transition-transform active:scale-95',
            currentTheme.button,
          )}
          onClick={onFinish}
        >
          Continuar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="animate-in fade-in duration-1000 delay-1000 fill-mode-both">
        <Button
          variant="ghost"
          size="sm"
          className="text-white/50 hover:text-white uppercase text-xs tracking-widest gap-2"
        >
          <Share2 className="w-3 h-3" /> Compartilhar
        </Button>
      </div>
    </div>
  )
}
