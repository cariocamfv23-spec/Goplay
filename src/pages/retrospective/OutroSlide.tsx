import { mockCurrentUser, mockRetrospective } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { RotateCcw, Share2, ArrowRight } from 'lucide-react'

interface OutroSlideProps {
  onRestart: () => void
  onClose: () => void
}

export default function OutroSlide({ onRestart, onClose }: OutroSlideProps) {
  return (
    <div className="flex flex-col h-full w-full p-8 text-center items-center justify-center text-white space-y-8">
      <div className="relative animate-in zoom-in fade-in duration-1000">
        <div className="absolute inset-0 bg-gold blur-3xl opacity-20 animate-pulse" />
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 mx-auto">
          <img
            src={mockCurrentUser.avatar}
            className="w-full h-full object-cover"
            alt="Avatar"
          />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider z-20 whitespace-nowrap">
          Lenda 2024
        </div>
      </div>

      <div className="space-y-4 max-w-xs animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both">
        <h2 className="text-3xl font-bold">
          Obrigado, <br />
          <span className="text-gold">
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
          className="w-full border-white/30 hover:bg-white/10 text-white bg-transparent h-12 rounded-xl"
          onClick={onRestart}
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Replay
        </Button>
        <Button
          className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl font-bold"
          onClick={onClose}
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
