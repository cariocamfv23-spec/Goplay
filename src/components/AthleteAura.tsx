import { ReactNode } from 'react'
import { ProfileData } from '@/lib/data'
import { getAuraConfig, AuraConfig } from '@/lib/aura-utils'
import { cn } from '@/lib/utils'
import { Sparkles, Zap, Trophy, Eye } from 'lucide-react'

interface AthleteAuraProps {
  children: ReactNode
  profile: ProfileData
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showLabel?: boolean
}

export function AthleteAura({
  children,
  profile,
  size = 'md',
  className,
  showLabel = false,
}: AthleteAuraProps) {
  const config = getAuraConfig(profile)

  if (config.type === 'none') {
    return <div className={cn('relative', className)}>{children}</div>
  }

  const getAnimationClass = (anim: AuraConfig['animation']) => {
    switch (anim) {
      case 'spin':
        return 'animate-aura-spin'
      case 'pulse':
        return 'animate-aura-pulse-fast'
      case 'shimmer':
        return 'animate-aura-pulse-slow'
      default:
        return ''
    }
  }

  const sizeClasses = {
    sm: 'p-0.5',
    md: 'p-1',
    lg: 'p-1.5',
    xl: 'p-2',
  }

  const Icon = () => {
    switch (config.type) {
      case 'gold':
        return <Trophy className="w-3 h-3 text-white fill-white" />
      case 'neon':
        return <Zap className="w-3 h-3 text-white fill-white" />
      case 'nature':
        return <Sparkles className="w-3 h-3 text-white fill-white" />
      case 'royal':
        return <Eye className="w-3 h-3 text-white fill-white" />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center group',
        className,
      )}
    >
      {/* Back Glow Layer */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl transition-all duration-1000 opacity-50',
          getAnimationClass(
            config.animation === 'spin' ? 'pulse' : config.animation,
          ),
        )}
        style={{
          background: config.glowColor,
          transform: 'scale(1.2)',
        }}
      />

      {/* Rotating Ring Layer (for spin animation or high intensity) */}
      <div
        className={cn(
          'absolute inset-0 rounded-full',
          config.animation === 'spin' ? 'animate-aura-spin' : '',
        )}
        style={{
          padding: size === 'xl' ? '4px' : '2px',
          background: `conic-gradient(from 0deg, ${config.colorStart}, ${config.colorEnd}, transparent, ${config.colorStart})`,
          maskImage: 'linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black)',
          // Create a ring effect by masking the center
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10">{children}</div>

      {/* Optional Label Badge */}
      {showLabel && config.label && (
        <div
          className={cn(
            'absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            'animate-in fade-in slide-in-from-top-1',
          )}
          style={{
            background: `linear-gradient(to right, ${config.colorStart}, ${config.colorEnd})`,
          }}
        >
          <Icon />
          {config.label}
        </div>
      )}

      {/* Particle Effects (CSS pseudo-elements simulated) */}
      {config.intensity === 'high' && (
        <>
          <div
            className="absolute -top-1 right-0 w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75"
            style={{ animationDuration: '3s' }}
          />
          <div
            className="absolute bottom-1 -left-1 w-1 h-1 rounded-full bg-white animate-ping opacity-50"
            style={{ animationDuration: '2.2s' }}
          />
        </>
      )}
    </div>
  )
}
