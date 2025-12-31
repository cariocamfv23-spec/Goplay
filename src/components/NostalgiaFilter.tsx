import { useNostalgiaStore, NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'

interface NostalgiaFilterProps {
  className?: string
  intensity?: number
  manualPreset?: NostalgiaPreset
  forceEnable?: boolean
}

export function NostalgiaFilter({
  className,
  intensity = 1,
  manualPreset,
  forceEnable = false,
}: NostalgiaFilterProps) {
  const { isEnabled, preset: storePreset } = useNostalgiaStore()

  const activePreset = manualPreset || storePreset
  const shouldRender = forceEnable || isEnabled

  if (!shouldRender) return null

  // Helper to render the specific overlay based on preset
  const renderOverlay = () => {
    switch (activePreset) {
      case 'grain':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-30 filter-grain animate-pulse" />
            <div className="absolute inset-0 pointer-events-none z-10 grayscale contrast-125 brightness-90" />
          </>
        )

      case 'retro':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 bg-[#7a5c29] mix-blend-overlay opacity-30" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-br from-[#f8e8c8]/20 to-[#4a3b2a]/40 mix-blend-multiply" />
            <div className="absolute inset-0 pointer-events-none z-10 sepia-[0.3] contrast-[1.1]" />
          </>
        )

      case 'vhs':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 filter-vhs-lines opacity-20" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-red-500/5 to-blue-500/5 mix-blend-color-dodge animate-pulse" />
            <div className="absolute inset-0 pointer-events-none z-10 contrast-[1.2] saturate-[1.2] blur-[0.5px]" />
            <div className="absolute bottom-6 left-6 pointer-events-none z-10 font-mono text-white/70 text-lg tracking-widest uppercase drop-shadow-md">
              PLAY
            </div>
          </>
        )

      case '90s':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-10 contrast-[1.3] saturate-[1.4] brightness-110" />
            <div className="absolute inset-0 pointer-events-none z-10 bg-blue-900/10 mix-blend-exclusion" />
            <div className="absolute bottom-4 right-4 pointer-events-none z-10 font-mono text-[10px] text-orange-500/80 tracking-widest bg-black/50 px-2 py-1 rounded">
              {new Date().toLocaleDateString('pt-BR')}
            </div>
          </>
        )

      case 'analog':
        return (
          <>
            {/* Light Leak */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-orange-500/20 via-transparent to-purple-500/10 mix-blend-screen" />
            <div className="absolute inset-0 pointer-events-none z-10 blur-[0.5px] brightness-105 contrast-[0.9]" />
            <div className="absolute inset-0 pointer-events-none z-10 filter-grain opacity-10" />
          </>
        )

      case 'polaroid':
        return (
          <>
            <div className="absolute inset-0 pointer-events-none z-20 border-[16px] border-white shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
            <div className="absolute bottom-0 inset-x-0 h-20 bg-white pointer-events-none z-20 flex items-center justify-center">
              <span className="font-handwriting text-black/60 text-lg rotate-[-2deg]">
                #GoPlay
              </span>
            </div>
            <div className="absolute inset-0 pointer-events-none z-10 contrast-[1.1] sepia-[0.2]" />
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
