import { useState, useCallback, MouseEvent, CSSProperties } from 'react'
import { useDepthStore } from '@/stores/useDepthStore'

export function useTilt3D(maxRotation = 5, scale = 1.02) {
  const { isEnabled, intensity } = useDepthStore()
  const [style, setStyle] = useState<CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.1s ease-out',
  })

  // Calculate effective parameters based on global settings
  const effectiveRotation = isEnabled ? maxRotation * intensity : 0
  const effectiveScale = isEnabled ? 1 + (scale - 1) * intensity : 1

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!isEnabled) return

      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -effectiveRotation
      const rotateY = ((x - centerX) / centerX) * effectiveRotation

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${effectiveScale})`,
        transition: 'none', // Disable transition for immediate response during movement
      })
    },
    [isEnabled, effectiveRotation, effectiveScale],
  )

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out', // Smooth return
    })
  }, [])

  // If disabled, ensure we render a flat style
  const finalStyle = isEnabled
    ? style
    : {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.5s ease-out',
      }

  return {
    style: finalStyle,
    onMouseMove: isEnabled ? onMouseMove : undefined,
    onMouseLeave: isEnabled ? onMouseLeave : undefined,
  }
}
