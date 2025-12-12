import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navigationItems } from '@/lib/data'
import { MessageCircle, User, Car } from 'lucide-react'

export function BottomNav() {
  const location = useLocation()
  const userType = localStorage.getItem('userType')
  const isDriver = userType === 'motorista'

  // If driver, we replace the "Vagas" or "Loja" with "Painel"
  // Let's create a custom list for drivers

  const bottomNavItems = isDriver
    ? [
        navigationItems[0], // Home
        navigationItems[1], // MOVE
        navigationItems[2], // Explorar
        { label: 'Painel', icon: Car, path: '/driver/dashboard' }, // Driver dedicated dashboard
        { label: 'Perfil', icon: User, path: '/profile/me' },
      ]
    : [
        navigationItems[0], // Home
        navigationItems[1], // MOVE
        navigationItems[2], // Explorar
        { label: 'Mensagens', icon: MessageCircle, path: '/messages' },
        { label: 'Perfil', icon: User, path: '/profile/me' },
      ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200',
                isActive
                  ? 'text-primary -translate-y-1'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon
                className={cn('h-6 w-6', isActive && 'fill-current')}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
