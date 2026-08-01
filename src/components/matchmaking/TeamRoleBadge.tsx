import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Home, Plane } from 'lucide-react'

interface TeamRoleBadgeProps {
  role: 'home' | 'visitor'
  className?: string
}

export function TeamRoleBadge({ role, className }: TeamRoleBadgeProps) {
  const isHome = role === 'home'
  return (
    <Badge
      className={cn(
        'text-[8px] uppercase font-black px-1.5 py-0 border-none',
        isHome
          ? 'bg-[hsl(var(--gold)/0.15)] text-[hsl(var(--gold))]'
          : 'bg-primary/15 text-primary',
        className,
      )}
    >
      {isHome ? (
        <>
          <Home className="w-2.5 h-2.5 mr-0.5" /> Mandante
        </>
      ) : (
        <>
          <Plane className="w-2.5 h-2.5 mr-0.5" /> Visitante
        </>
      )}
    </Badge>
  )
}
