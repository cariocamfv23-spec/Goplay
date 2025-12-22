import { Gem } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { mockCurrentUser } from '@/lib/data'

export type NftStyleConfig = {
  container: string
  overlay: string
  badge: string
  border: string
  text: string
  image?: string
}

interface NftCardProps {
  image: string | null
  activeStyle: NftStyleConfig
  styleId: string
  filters: {
    brightness: number
    contrast: number
    saturate: number
    sepia: number
    blur: number
    hue: number
    grayscale: number
  }
  intensity: number
  customText: string
  textPosition: 'top' | 'center' | 'bottom'
  onClick?: () => void
  showPlaceholder?: boolean
  className?: string
}

export function NftCard({
  image,
  activeStyle,
  styleId,
  filters,
  intensity,
  customText,
  textPosition,
  onClick,
  showPlaceholder = false,
  className,
}: NftCardProps) {
  const getFilterStyle = () => ({
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%) blur(${filters.blur}px) hue-rotate(${filters.hue}deg) grayscale(${filters.grayscale}%)`,
  })

  return (
    <div
      className={cn(
        'relative w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 group shadow-2xl bg-secondary/10',
        image && activeStyle.container,
        image && activeStyle.border,
        !image && 'border-2 border-dashed border-muted-foreground/25',
        onClick && 'cursor-pointer hover:border-primary/50',
        className,
      )}
      onClick={onClick}
    >
      {image ? (
        <>
          {/* Background Image with Effects */}
          <img
            src={image}
            alt="NFT"
            className="w-full h-full object-cover transition-all"
            style={getFilterStyle()}
          />

          {/* Overlay Gradient */}
          <div
            className={cn(
              'absolute inset-0 pointer-events-none transition-all duration-300',
              activeStyle.overlay,
            )}
            style={{ opacity: intensity / 100 }}
          />

          {/* Card Content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
            {/* Top: Rarity & Stats */}
            <div className="flex justify-between items-start">
              <Badge
                className={cn(
                  'border-0 font-bold uppercase tracking-wider shadow-sm transition-colors',
                  activeStyle.badge,
                )}
              >
                {styleId === 'gold'
                  ? 'Legendary'
                  : styleId === 'cyberpunk'
                    ? 'Epic'
                    : 'Rare'}
              </Badge>
              <div className="flex flex-col items-end">
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 text-white border border-white/10 text-xs font-mono shadow-sm">
                  <div>
                    PWR <span className="text-green-400">98</span>
                  </div>
                  <div>
                    SPD <span className="text-yellow-400">92</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Gem className="h-6 w-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>
              <h3
                className={cn(
                  'text-2xl font-black uppercase italic tracking-tighter drop-shadow-lg transition-colors',
                  activeStyle.text,
                )}
              >
                {mockCurrentUser.name}
              </h3>
              <div
                className={cn(
                  'flex justify-between items-end text-xs font-medium opacity-90 transition-colors',
                  activeStyle.text,
                )}
              >
                <span>{new Date().toLocaleDateString()}</span>
                <span className="font-mono opacity-80">
                  #GP-{Math.floor(Math.random() * 9000) + 1000}
                </span>
              </div>
            </div>
          </div>

          {/* Custom Text Overlay */}
          {customText && (
            <div
              className={cn(
                'absolute w-full px-6 text-center pointer-events-none z-20',
                textPosition === 'top' && 'top-8',
                textPosition === 'center' && 'top-1/2 -translate-y-1/2',
                textPosition === 'bottom' && 'bottom-20',
              )}
            >
              <h2
                className={cn(
                  'text-2xl font-black uppercase italic tracking-tighter drop-shadow-lg break-words transition-colors',
                  activeStyle.text,
                )}
              >
                {customText}
              </h2>
            </div>
          )}

          {/* Special Effects */}
          {styleId === 'holographic' && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none mix-blend-overlay" />
          )}
          {styleId === 'pixel' && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />
          )}
          {styleId === '3d' && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none rounded-2xl" />
          )}
        </>
      ) : showPlaceholder ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          {/* Placeholder Content handled by parent mostly, or simple fallback */}
        </div>
      ) : null}
    </div>
  )
}
