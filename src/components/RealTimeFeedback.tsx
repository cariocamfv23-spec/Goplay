import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2, Brain, Info } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface FeedbackMessage {
  id: string
  type: 'success' | 'warning' | 'info' | 'emotion'
  text: string
}

interface RealTimeFeedbackProps {
  message: FeedbackMessage | null
  className?: string
}

export function RealTimeFeedback({
  message,
  className,
}: RealTimeFeedbackProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (!message) return null

  return (
    <div
      className={cn(
        'absolute top-1/4 left-0 right-0 flex justify-center z-20 pointer-events-none transition-all duration-500 transform',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
        className,
      )}
    >
      <div
        className={cn(
          'px-6 py-3 rounded-full backdrop-blur-md shadow-lg border flex items-center gap-3 max-w-[90%] md:max-w-[80%]',
          message.type === 'success'
            ? 'bg-green-500/20 border-green-500/50 text-green-100'
            : message.type === 'warning'
              ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-100'
              : message.type === 'emotion'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-100'
                : 'bg-blue-500/20 border-blue-500/50 text-blue-100',
        )}
      >
        {message.type === 'success' ? (
          <CheckCircle2 className="h-6 w-6 text-green-400 animate-bounce" />
        ) : message.type === 'warning' ? (
          <AlertCircle className="h-6 w-6 text-yellow-400 animate-pulse" />
        ) : message.type === 'emotion' ? (
          <Brain className="h-6 w-6 text-purple-400 animate-pulse" />
        ) : (
          <Info className="h-6 w-6 text-blue-400 animate-pulse" />
        )}
        <span className="font-bold text-sm md:text-base drop-shadow-md">
          {message.text}
        </span>
      </div>
    </div>
  )
}
