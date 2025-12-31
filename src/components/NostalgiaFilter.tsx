import { useNostalgiaStore } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'

interface NostalgiaFilterProps {
  className?: string
  intensity?: number
}

export function NostalgiaFilter({
  className,
  intensity = 1,
}: NostalgiaFilterProps) {
  const { isEnabled, preset } = useNostalgiaStore()

  if (!isEnabled) return null

  // Helper to render the specific overlay based on preset
  const renderOverlay = () => {
    switch (preset) {
      case 'grain':
        return (
          <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-30 filter-grain animate-pulse" />
        )

      case 'retro':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 bg-[#7a5c29] mix-blend-overlay opacity-30" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-br from-[#f8e8c8]/20 to-[#4a3b2a]/40 mix-blend-multiply" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-sepia-[0.3] backdrop-contrast-[1.1]" />
          </>
        )

      case 'vhs':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 filter-vhs-lines opacity-20" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-red-500/5 to-blue-500/5 mix-blend-color-dodge animate-pulse" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-[1.2] backdrop-saturate-[1.2] backdrop-blur-[0.5px]" />
            <div className="absolute bottom-4 left-4 pointer-events-none z-10 font-mono text-white/70 text-lg tracking-widest uppercase drop-shadow-md">
              PLAY
            </div>
          </>
        )

      case '90s':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-[1.3] backdrop-saturate-[0.8] backdrop-brightness-110" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-blue-900/10 mix-blend-exclusion" />
            <div className="absolute bottom-2 right-2 pointer-events-none z-10 font-mono text-[10px] text-orange-500/80 tracking-widest">
              {new Date().toLocaleDateString('pt-BR')}
            </div>
          </>
        )

      case 'analog':
        return (
          <>
            {/* Light Leak */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-orange-500/20 via-transparent to-purple-500/10 mix-blend-screen" />
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-blur-[0.5px] backdrop-brightness-105" />
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-10" />
          </>
        )

      case 'polaroid':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-20 border-[12px] border-white shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
            <div className="absolute bottom-0 inset-x-0 h-12 bg-white pointer-events-none z-20 flex items-center justify-center">
              <span className="font-handwriting text-black/60 text-xs rotate-[-2deg]">
                #GoPlay
              </span>
            </div>
            <div className="absolute inset-0 pointer-events-none z-10 backdrop-contrast-[1.1] backdrop-sepia-[0.2]" />
          </>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-[inherit]',
        className,
      )}
    >
      {renderOverlay()}
    </div>
  )
}
