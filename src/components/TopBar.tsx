import { ArrowLeft, Bell, ShoppingCart, Settings } from 'lucide-react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useBrandingStore from '@/stores/useBrandingStore'

export function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logoUrl } = useBrandingStore()

  const isProfile = location.pathname.includes('/profile')
  const isMarket = location.pathname.includes('/marketplace')

  const showBack =
    location.pathname !== '/home' &&
    location.pathname !== '/move' &&
    location.pathname !== '/explore' &&
    location.pathname !== '/messages'

  return (
    <div className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 transition-all shadow-sm">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 hover:bg-secondary/50 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <Link
          to="/home"
          className="flex items-center py-2 transition-opacity hover:opacity-80"
        >
          <img
            src={logoUrl}
            alt="Goplay App Logo"
            className="h-8 w-auto object-contain drop-shadow-sm"
          />
        </Link>
      </div>

      <div className="flex items-center gap-1">
        {isMarket && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-secondary/50"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/50"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {isProfile ? (
          <Link to="/settings">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary/50"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <Link to="/profile/me">
            <Avatar className="h-9 w-9 ml-2 border-2 border-border/50 hover:border-primary transition-colors">
              <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=99" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  )
}
