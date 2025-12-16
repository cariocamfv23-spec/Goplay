import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Point {
  x: number
  y: number
}

interface MotionAnalysisOverlayProps {
  active: boolean
  className?: string
}

export function MotionAnalysisOverlay({
  active,
  className,
}: MotionAnalysisOverlayProps) {
  const [frame, setFrame] = useState(0)

  // Simulate skeleton movement
  useEffect(() => {
    if (!active) return

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [active])

  // Base skeleton positions (normalized 0-100)
  const getPoints = (f: number): Record<string, Point> => {
    const breathe = Math.sin(f * 0.1) * 1
    const squat = Math.sin(f * 0.2) * 10 // Simulate squat motion vertically

    return {
      head: { x: 50, y: 15 + breathe },
      neck: { x: 50, y: 25 + breathe },
      leftShoulder: { x: 40, y: 28 + breathe },
      rightShoulder: { x: 60, y: 28 + breathe },
      leftElbow: { x: 35, y: 40 + breathe },
      rightElbow: { x: 65, y: 40 + breathe },
      leftHand: { x: 30, y: 50 + breathe },
      rightHand: { x: 70, y: 50 + breathe },
      hip: { x: 50, y: 50 + squat },
      leftKnee: { x: 45, y: 70 + squat / 1.5 },
      rightKnee: { x: 55, y: 70 + squat / 1.5 },
      leftFoot: { x: 45, y: 90 },
      rightFoot: { x: 55, y: 90 },
    }
  }

  const points = getPoints(frame)

  const drawLine = (start: Point, end: Point) => (
    <line
      x1={`${start.x}%`}
      y1={`${start.y}%`}
      x2={`${end.x}%`}
      y2={`${end.y}%`}
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      className="opacity-80 shadow-[0_0_10px_hsl(var(--primary))]"
    />
  )

  const drawPoint = (p: Point, key: string) => (
    <circle
      key={key}
      cx={`${p.x}%`}
      cy={`${p.y}%`}
      r="4"
      fill="white"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      className="shadow-[0_0_10px_white]"
    />
  )

  if (!active) return null

  return (
    <div className={cn('absolute inset-0 z-10 pointer-events-none', className)}>
      <svg className="w-full h-full">
        {/* Torso */}
        {drawLine(points.head, points.neck)}
        {drawLine(points.neck, points.hip)}

        {/* Arms */}
        {drawLine(points.neck, points.leftShoulder)}
        {drawLine(points.leftShoulder, points.leftElbow)}
        {drawLine(points.leftElbow, points.leftHand)}

        {drawLine(points.neck, points.rightShoulder)}
        {drawLine(points.rightShoulder, points.rightElbow)}
        {drawLine(points.rightElbow, points.rightHand)}

        {/* Legs */}
        {drawLine(points.hip, points.leftKnee)}
        {drawLine(points.leftKnee, points.leftFoot)}

        {drawLine(points.hip, points.rightKnee)}
        {drawLine(points.rightKnee, points.rightFoot)}

        {/* Joints */}
        {Object.entries(points).map(([key, point]) => drawPoint(point, key))}
      </svg>
    </div>
  )
}
