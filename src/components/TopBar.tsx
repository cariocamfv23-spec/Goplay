import { ArrowLeft, Bell, ShoppingCart, Settings } from 'lucide-react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useBrandingStore from '@/stores/useBrandingStore'

export function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logoUrl } = useBrandingStore()

  const isHome = location.pathname === '/home'
  const isProfile = location.pathname.includes('/profile')
  const isMarket = location.pathname.includes('/marketplace')

  const showBack =
    location.pathname !== '/home' &&
    location.pathname !== '/move' &&
    location.pathname !== '/explore' &&
    location.pathname !== '/messages'

  return (
    <div className="sticky top-0 z-40 w-full h-14 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-4 transition-all">
      <div className="flex items-center gap-2">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        {isHome ? (
          <div className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="Goplay"
              className="h-7 w-7 object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-gradient-primary">
              Goplay App
            </span>
          </div>
        ) : (
          <h1 className="font-semibold text-lg capitalize truncate max-w-[200px]">
            {location.pathname.split('/')[1] || 'Goplay'}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        {isMarket && (
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {isProfile ? (
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <Link to="/profile/me">
            <Avatar className="h-8 w-8 ml-2 border border-border">
              <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  )
}
