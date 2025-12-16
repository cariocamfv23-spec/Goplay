import { cn } from '@/lib/utils'
import { Target, Zap, Hexagon, Crosshair } from 'lucide-react'
import { useState, useEffect } from 'react'

export interface ArTargetData {
  id: string
  x: number
  y: number
  type: 'standard' | 'bonus' | 'hazard'
  value: number
  expiresAt: number
}

interface ArTargetProps {
  data: ArTargetData
  onInteract: (id: string, value: number, type: ArTargetData['type']) => void
}

export const ArTarget = ({ data, onInteract }: ArTargetProps) => {
  const [isHit, setIsHit] = useState(false)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    // Entrance animation
    requestAnimationFrame(() => setScale(1))
  }, [])

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    if (isHit) return

    setIsHit(true)
    onInteract(data.id, data.value, data.type)
  }

  const getTargetStyle = () => {
    switch (data.type) {
      case 'bonus':
        return {
          color: 'text-gold',
          bg: 'bg-gold/20',
          border: 'border-gold',
          shadow: 'shadow-[0_0_15px_hsl(var(--gold))]',
          icon: Zap,
        }
      case 'hazard':
        return {
          color: 'text-red-500',
          bg: 'bg-red-500/20',
          border: 'border-red-500',
          shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.6)]',
          icon: Hexagon,
        }
      default:
        return {
          color: 'text-primary',
          bg: 'bg-primary/20',
          border: 'border-primary',
          shadow: 'shadow-[0_0_15px_hsl(var(--primary))]',
          icon: Target,
        }
    }
  }

  const style = getTargetStyle()
  const Icon = style.icon

  return (
    <div
      className={cn(
        'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out z-30',
        isHit ? 'scale-150 opacity-0' : 'hover:scale-110',
      )}
      style={{
        top: `${data.y}%`,
        left: `${data.x}%`,
        transform: `translate(-50%, -50%) scale(${isHit ? 1.5 : scale})`,
      }}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <div className="relative group">
        {/* Outer Ring */}
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2 animate-ping opacity-20',
            style.border,
          )}
        />

        {/* Main Target Body */}
        <div
          className={cn(
            'relative h-14 w-14 rounded-full border-2 backdrop-blur-md flex items-center justify-center transition-colors',
            style.bg,
            style.border,
            style.color,
            style.shadow,
          )}
        >
          <Icon className="h-6 w-6" />

          {/* Rotating Crosshair for standard targets */}
          {data.type === 'standard' && (
            <div className="absolute inset-0 animate-spin-slow opacity-50">
              <Crosshair className="h-full w-full p-1" />
            </div>
          )}
        </div>

        {/* Value Badge */}
        <div
          className={cn(
            'absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap',
            style.bg,
            style.border,
            style.color,
          )}
        >
          {data.value > 0 ? '+' : ''}
          {data.value} PTS
        </div>
      </div>
    </div>
  )
}
