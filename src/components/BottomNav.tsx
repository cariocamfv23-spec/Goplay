import { Link, useLocation } from 'react-router-dom'
import { navigationItems } from '@/lib/data'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const location = useLocation()

  return (
    <div className="w-full h-16 bg-background border-t border-border/40 flex items-center justify-around px-2 z-40 pb-safe">
      {navigationItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path)
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center w-full h-full space-y-1',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <item.icon
              className={cn(
                'h-6 w-6 transition-all duration-200',
                isActive ? 'scale-110' : 'scale-100',
              )}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
