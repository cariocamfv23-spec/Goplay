import { usePrivacyStore } from '@/stores/usePrivacyStore'
import { Ghost, Sparkles } from 'lucide-react'

export function InvisibleModeIndicator() {
  const { isInvisibleMode } = usePrivacyStore()

  if (!isInvisibleMode) return null

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-5 fade-in duration-500 pointer-events-none mt-2">
      <div className="bg-gradient-to-r from-primary to-[#4C1D95] px-4 py-1.5 rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.5)] border border-gold/40 flex items-center gap-2 backdrop-blur-md">
        <Ghost className="w-4 h-4 text-gold animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest drop-shadow-md text-white">
          Modo Invisível
        </span>
        <Sparkles className="w-3 h-3 text-gold" />
      </div>
    </div>
  )
}
