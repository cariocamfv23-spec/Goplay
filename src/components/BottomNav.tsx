import { Link, useLocation } from 'react-router-dom'
import { navigationItems } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  Utensils,
  Flame,
  Orbit,
  Infinity as InfinityIcon,
  Trophy,
  BarChart3,
} from 'lucide-react'

export function BottomNav() {
  const location = useLocation()

  // Dynamically add Nexus, Food Sport and Arena to navigation without touching data.ts
  const extendedNavItems = [
    ...navigationItems.slice(0, 3),
    { icon: Orbit, label: 'Nexus', path: '/nexus' },
    ...navigationItems.slice(3, 4), // Explore
    ...navigationItems.slice(4), // Loja, Perfil
    { icon: Utensils, label: 'Food', path: '/food-sport' },
    { icon: Flame, label: 'Arena Go', path: '/arena' },
    { icon: Trophy, label: 'Copa 26', path: '/album', highlight: true },
  ]

  return (
    <>
      {location.pathname === '/album' && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link
            to="/album/stats"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-[hsl(var(--gold))] text-primary-foreground px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            <BarChart3 className="w-5 h-5" />
            Power Index Copa 26
          </Link>
        </div>
      )}
      <div className="w-full min-h-16 h-auto bg-background/95 backdrop-blur-md border-t border-border/40 flex items-center justify-around px-1 z-40 pb-safe pt-2 transition-all shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)] overflow-x-auto no-scrollbar">
        {extendedNavItems.map((item) => {
          const isActive =
            (location.pathname.startsWith(item.path) && item.path !== '/') ||
            (location.pathname === '/' && item.path === '/')
          const isHighlight = 'highlight' in item && item.highlight
          const highlightColorClass =
            item.path === '/album' ? 'text-green-600' : 'text-purple-600'

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center min-w-[56px] flex-1 h-14 space-y-1 rounded-lg transition-colors group',
                isActive
                  ? isHighlight
                    ? `${highlightColorClass} drop-shadow-sm`
                    : 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30',
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 transition-all duration-300 group-active:scale-95',
                  isActive ? 'scale-110' : 'scale-100 opacity-70',
                  isHighlight && !isActive && `${highlightColorClass}/70`,
                )}
              />
              <span
                className={cn(
                  'text-[9px] font-medium transition-all whitespace-nowrap',
                  isActive ? 'font-bold' : '',
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
