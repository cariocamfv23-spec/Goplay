import { Gem, Sticker, Crown } from 'lucide-react'
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

export type Accessory = {
  id: string
  emoji: string
  label: string
  position: { top: string; left: string; scale: number; rotate: number }
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
  stickerMode?: boolean
  accessories?: Accessory[]
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
  stickerMode = false,
  accessories = [],
  onClick,
  showPlaceholder = false,
  className,
}: NftCardProps) {
  const getFilterStyle = () => ({
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%) blur(${filters.blur}px) hue-rotate(${filters.hue}deg) grayscale(${filters.grayscale}%)`,
  })

  // Sticker Mode overrides some border/shadow styles to create the die-cut effect
  const containerClasses = stickerMode
    ? 'border-[6px] border-white shadow-[0_8px_16px_rgba(0,0,0,0.25)] rounded-[2.5rem] bg-transparent overflow-hidden'
    : cn(activeStyle.container, activeStyle.border)

  return (
    <div
      className={cn(
        'relative w-full aspect-[3/4] transition-all duration-500 group',
        // If sticker mode, we remove the default card background to emphasize the shape
        stickerMode
          ? 'bg-transparent scale-95 hover:scale-100 rotate-1 hover:rotate-0'
          : 'rounded-2xl shadow-2xl bg-secondary/10 overflow-hidden',
        !image &&
          'border-2 border-dashed border-muted-foreground/25 rounded-2xl bg-secondary/10',
        onClick && 'cursor-pointer hover:border-primary/50',
        className,
        // Apply container classes directly if not sticker mode, or wrapper classes if sticker mode
        !stickerMode && containerClasses,
      )}
      onClick={onClick}
    >
      {/* Sticker Mode Wrapper to handle the border radius correctly */}
      {stickerMode && image ? (
        <div
          className={cn(
            'w-full h-full relative overflow-hidden',
            containerClasses,
          )}
        >
          <Content
            image={image}
            activeStyle={activeStyle}
            styleId={styleId}
            filters={filters}
            intensity={intensity}
            customText={customText}
            textPosition={textPosition}
            accessories={accessories}
            getFilterStyle={getFilterStyle}
            showPlaceholder={showPlaceholder}
          />
        </div>
      ) : (
        <Content
          image={image}
          activeStyle={activeStyle}
          styleId={styleId}
          filters={filters}
          intensity={intensity}
          customText={customText}
          textPosition={textPosition}
          accessories={accessories}
          getFilterStyle={getFilterStyle}
          showPlaceholder={showPlaceholder}
        />
      )}
    </div>
  )
}

// Extracted content to reuse in Sticker Mode wrapper
function Content({
  image,
  activeStyle,
  styleId,
  filters,
  intensity,
  customText,
  textPosition,
  accessories,
  getFilterStyle,
  showPlaceholder,
}: any) {
  if (!image) {
    return showPlaceholder ? (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {/* Placeholder */}
      </div>
    ) : null
  }

  return (
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

      {/* Accessories Overlay */}
      {accessories &&
        accessories.map((acc: Accessory) => (
          <div
            key={acc.id}
            className="absolute pointer-events-none z-20 text-6xl drop-shadow-xl filter"
            style={{
              top: acc.position.top,
              left: acc.position.left,
              transform: `translate(-50%, -50%) scale(${acc.position.scale}) rotate(${acc.position.rotate}deg)`,
            }}
          >
            {acc.emoji}
          </div>
        ))}

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
                : styleId === 'bored-ape'
                  ? 'BAYC'
                  : styleId === 'sticker-cultura'
                    ? 'Sticker'
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
            {styleId === 'sticker-cultura' ? (
              <Sticker className="h-6 w-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            ) : styleId === 'bored-ape' ? (
              <Crown className="h-6 w-6 text-yellow-400 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] fill-yellow-400" />
            ) : (
              <Gem className="h-6 w-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            )}
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
  )
}
