import { Link, useLocation } from 'react-router-dom'
import { navigationItems } from '@/lib/data'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const location = useLocation()

  return (
    <div className="w-full min-h-16 h-auto bg-background/95 backdrop-blur-md border-t border-border/40 flex items-center justify-around px-2 z-40 pb-safe pt-2 transition-all shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)]">
      {navigationItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path)
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center w-full h-14 space-y-1 rounded-lg transition-colors group',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30',
            )}
          >
            <item.icon
              className={cn(
                'h-6 w-6 transition-all duration-300 group-active:scale-95',
                isActive ? 'scale-110' : 'scale-100 opacity-70',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-medium transition-all',
                isActive ? 'font-bold' : '',
              )}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
