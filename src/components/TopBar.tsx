import {
  ArrowLeft,
  ShoppingCart,
  Settings,
  Palette,
  Sun,
  Moon,
  Check,
  User,
  MessageSquare,
  LogOut,
  CreditCard,
  Sparkles,
  CassetteTape,
  Tv,
  Film,
  Terminal,
  Trophy,
  Swords,
} from 'lucide-react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Logo } from '@/components/Logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { useThemeStore } from '@/stores/useThemeStore'
import { mockCurrentUser } from '@/lib/data'
import { NotificationMenu } from '@/components/NotificationMenu'
import { AthleteAura } from '@/components/AthleteAura'
import { useNostalgiaStore, NostalgiaPreset } from '@/stores/useNostalgiaStore'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setTheme, theme } = useTheme()
  const { color, setColor } = useThemeStore()
  const { isEnabled, toggle, preset, setPreset } = useNostalgiaStore()

  const isMarket = location.pathname.includes('/marketplace')

  // Pages where we don't show the back button (Main tabs)
  const showBack =
    location.pathname !== '/home' &&
    location.pathname !== '/move' &&
    location.pathname !== '/explore' &&
    location.pathname !== '/messages' &&
    location.pathname !== '/jobs' &&
    location.pathname !== '/marketplace' &&
    location.pathname !== '/feed'

  const handleSelectPreset = (newPreset: NostalgiaPreset) => {
    setPreset(newPreset)
    if (!isEnabled) {
      toggle(true)
    }
    toast.success('Modo Nostalgia Aplicado', {
      description: `Filtro ${newPreset.toUpperCase()} ativo.`,
      icon: <Sparkles className="w-4 h-4 text-gold" />,
    })
  }

  const handleDisable = () => {
    toggle(false)
    toast.info('Modo Nostalgia Desativado', {
      description: 'Retornando ao estilo moderno.',
    })
  }

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
          {/* Main Logo in TopBar has seasonal elements enabled */}
          <Logo className="h-8 text-xl" enableSeasonal={true} />
        </Link>
      </div>

      <div className="flex items-center gap-1">
        {isMarket && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-secondary/50"
            onClick={() => navigate('/marketplace/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}

        {/* Nostalgia Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'rounded-full transition-all duration-500 relative group',
                isEnabled
                  ? 'bg-gold/10 text-gold hover:bg-gold/20'
                  : 'hover:bg-secondary/50 text-muted-foreground hover:text-gold',
              )}
              title="Modo Nostalgia"
            >
              <Sparkles
                className={cn(
                  'h-5 w-5 transition-transform duration-500',
                  isEnabled ? 'rotate-12 scale-110' : 'group-hover:scale-110',
                )}
              />
              {isEnabled && (
                <span className="absolute inset-0 rounded-full animate-ping bg-gold/20 opacity-75 duration-1000" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Estúdio Nostalgia</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {isEnabled && (
              <>
                <DropdownMenuItem
                  onClick={handleDisable}
                  className="text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 font-medium"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Desativar Efeitos</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem onClick={() => handleSelectPreset('cassette')}>
              <CassetteTape className="mr-2 h-4 w-4" />
              <span>Fita K7</span>
              {preset === 'cassette' && isEnabled && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleSelectPreset('vhs')}>
              <Tv className="mr-2 h-4 w-4" />
              <span>VHS Aesthetic</span>
              {preset === 'vhs' && isEnabled && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleSelectPreset('90s')}>
              <Sparkles className="mr-2 h-4 w-4" />
              <span>90s Pop</span>
              {preset === '90s' && isEnabled && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleSelectPreset('retro')}>
              <Film className="mr-2 h-4 w-4" />
              <span>Câmera Clássica</span>
              {preset === 'retro' && isEnabled && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleSelectPreset('digital')}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Retro Digital</span>
              {preset === 'digital' && isEnabled && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs">
              Temas Especiais
            </DropdownMenuLabel>

            <DropdownMenuItem onClick={() => handleSelectPreset('pele')}>
              <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Futebol 80s (Pelé)</span>
              {preset === 'pele' && isEnabled && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleSelectPreset('ali')}>
              <Swords className="mr-2 h-4 w-4 text-zinc-500" />
              <span>Boxe Vintage (Ali)</span>
              {preset === 'ali' && isEnabled && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary/50"
              title="Aparência"
            >
              <Palette className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Aparência</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
              {theme === 'light' && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Escuro</span>
              {theme === 'dark' && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 h-4 w-4" />
                <span>Mais cores disponíveis</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setColor('default')}>
                  <div className="mr-2 h-4 w-4 rounded-full bg-[hsl(263.4,70%,50.4%)]" />
                  <span>Roxo Serenity</span>
                  {color === 'default' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setColor('blue')}>
                  <div className="mr-2 h-4 w-4 rounded-full bg-blue-600" />
                  <span>Azul</span>
                  {color === 'blue' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setColor('green')}>
                  <div className="mr-2 h-4 w-4 rounded-full bg-green-600" />
                  <span>Verde</span>
                  {color === 'green' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setColor('orange')}>
                  <div className="mr-2 h-4 w-4 rounded-full bg-orange-600" />
                  <span>Laranja</span>
                  {color === 'orange' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setColor('red')}>
                  <div className="mr-2 h-4 w-4 rounded-full bg-red-600" />
                  <span>Vermelho</span>
                  {color === 'red' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setColor('rose')}>
                  <div className="mr-2 h-4 w-4 rounded-full bg-rose-600" />
                  <span>Rosa</span>
                  {color === 'rose' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>

        <NotificationMenu />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full ml-1"
            >
              <AthleteAura
                profile={mockCurrentUser}
                size="sm"
                disableAnimation={false}
              >
                <Avatar className="h-9 w-9 border-2 border-border/50 hover:border-primary transition-colors">
                  <AvatarImage src={mockCurrentUser.avatar} />
                  <AvatarFallback>
                    {mockCurrentUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </AthleteAura>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {mockCurrentUser.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {mockCurrentUser.username}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile/me')}>
              <User className="mr-2 h-4 w-4" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/messages')}>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Mensagens</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/wallet')}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Carteira</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/login')}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
