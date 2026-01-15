import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useTilt3D } from '@/lib/depth-utils'

interface DepthContainerProps {
  children: ReactNode
  className?: string
  enableTilt?: boolean
  maxRotation?: number
  scale?: number
}

export function DepthContainer({
  children,
  className,
  enableTilt = true,
  maxRotation = 3,
  scale = 1.01,
}: DepthContainerProps) {
  const { style, onMouseMove, onMouseLeave } = useTilt3D(maxRotation, scale)

  return (
    <div
      className={cn(
        'relative transform-style-3d backface-hidden will-change-transform',
        className,
      )}
      style={enableTilt ? style : undefined}
      onMouseMove={enableTilt ? onMouseMove : undefined}
      onMouseLeave={enableTilt ? onMouseLeave : undefined}
    >
      {children}
    </div>
  )
}
