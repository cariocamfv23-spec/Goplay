import { useState, useCallback, MouseEvent } from 'react'

export function use3DTilt(maxRotation = 5, scale = 1.02) {
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.1s ease-out',
  })

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxRotation
      const rotateY = ((x - centerX) / centerX) * maxRotation

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: 'none', // Disable transition for immediate response during movement
      })
    },
    [maxRotation, scale],
  )

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out', // Smooth return
    })
  }, [])

  return { style, onMouseMove, onMouseLeave }
}
