import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  Wallet,
  MessageSquare,
  Trophy,
  GraduationCap,
  Plane,
  Globe,
  Apple,
  Stethoscope,
  Dumbbell,
  Camera,
  Car,
  Baby,
  Calendar,
  ArrowRight,
  Search,
  Activity,
  Star,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockCurrentUser, mockMatches } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Home() {
  const navigate = useNavigate()
  const nextMatch = mockMatches[0]

  // Priority Shortcuts Configuration
  const shortcuts = [
    {
      label: 'Check-in',
      icon: MapPin,
      path: '/check-in',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Carteira',
      icon: Wallet,
      path: '/wallet',
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Mensagens',
      icon: MessageSquare,
      path: '/messages',
      color: 'text-blue-600',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Ranking',
      icon: Trophy,
      path: '/ranking',
      color: 'text-gold',
      bg: 'bg-[hsl(var(--gold)/0.1)]',
    },
  ]

  // Grouped Features Configuration
  const featureGroups = [
    {
      title: 'Carreira & Oportunidades',
      description: 'Evolua sua carreira no esporte',
      icon: TrendingUp,
      color: 'text-amber-600',
      items: [
        {
          label: 'Bolsas',
          icon: GraduationCap,
          path: '/explore/scholarships',
          iconColor: 'text-emerald-600',
          bg: 'bg-emerald-100 dark:bg-emerald-900/20',
        },
        {
          label: 'Agências',
          icon: Plane,
          path: '/explore/agencies',
          iconColor: 'text-sky-600',
          bg: 'bg-sky-100 dark:bg-sky-900/20',
        },
        {
          label: 'Mundial',
          icon: Globe,
          path: '/explore/international',
          iconColor: 'text-indigo-600',
          bg: 'bg-indigo-100 dark:bg-indigo-900/20',
        },
      ],
    },
    {
      title: 'Saúde & Performance',
      description: 'Cuide do seu corpo e mente',
      icon: Activity,
      color: 'text-rose-600',
      items: [
        {
          label: 'Nutrição',
          icon: Apple,
          path: '/explore/nutrition',
          iconColor: 'text-lime-600',
          bg: 'bg-lime-100 dark:bg-lime-900/20',
        },
        {
          label: 'Clínicas',
          icon: Stethoscope,
          path: '/explore/clinics',
          iconColor: 'text-teal-600',
          bg: 'bg-teal-100 dark:bg-teal-900/20',
        },
        {
          label: 'Academias',
          icon: Dumbbell,
          path: '/explore/gyms',
          iconColor: 'text-red-600',
          bg: 'bg-red-100 dark:bg-red-900/20',
        },
      ],
    },
    {
      title: 'Serviços & Lazer',
      description: 'Facilidades para o seu dia a dia',
      icon: Star,
      color: 'text-primary',
      items: [
        {
          label: 'Fotos',
          icon: Camera,
          path: '/explore/photographers',
          iconColor: 'text-purple-600',
          bg: 'bg-purple-100 dark:bg-purple-900/20',
        },
        {
          label: 'Uber',
          icon: Car,
          path: '/explore/drivers',
          iconColor: 'text-green-600',
          bg: 'bg-green-100 dark:bg-green-900/20',
        },
        {
          label: 'Kids',
          icon: Baby,
          path: '/explore/kids',
          iconColor: 'text-pink-600',
          bg: 'bg-pink-100 dark:bg-pink-900/20',
        },
        {
          label: 'Eventos',
          icon: Calendar,
          path: '/explore/events',
          iconColor: 'text-orange-600',
          bg: 'bg-orange-100 dark:bg-orange-900/20',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24 animate-in fade-in duration-500">
      {/* Welcome / Hero Section */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Olá,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                {mockCurrentUser.name.split(' ')[0]}
              </span>{' '}
              👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Pronto para o jogo de hoje?
            </p>
          </div>
          <div
            className="flex flex-col items-end cursor-pointer"
            onClick={() => navigate('/profile/me')}
          >
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-primary/20 hover:border-primary transition-colors">
                <AvatarImage src={mockCurrentUser.avatar} />
                <AvatarFallback>
                  {mockCurrentUser.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Badge
                className="absolute -bottom-2 -right-1 bg-gradient-to-r from-gold to-amber-600 border-2 border-background px-1.5 py-0 text-[10px] font-bold"
                variant="secondary"
              >
                Lv. {mockCurrentUser.level}
              </Badge>
            </div>
          </div>
        </div>

        {/* Priority Shortcuts */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {shortcuts.map((shortcut, idx) => (
            <button
              key={idx}
              onClick={() => navigate(shortcut.path)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105 group-active:scale-95',
                  shortcut.bg,
                  shortcut.color,
                )}
              >
                <shortcut.icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {shortcut.label}
              </span>
            </button>
          ))}
        </div>

        {/* Highlight Card - Next Activity */}
        <Card
          className="mb-8 border-none shadow-lg bg-gradient-to-br from-primary/90 to-purple-900 text-white overflow-hidden relative cursor-pointer group hover:shadow-xl transition-all"
          onClick={() => navigate('/profile/stats')}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <CardHeader className="pb-2 relative z-10">
            <div className="flex justify-between items-center">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                Próximo Jogo
              </Badge>
              <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
            <CardTitle className="text-xl mt-2 flex items-center gap-2">
              {nextMatch ? nextMatch.teamName : 'Sem jogos agendados'}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            {nextMatch ? (
              <div className="flex items-center gap-4 text-sm text-white/90">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{nextMatch.time.split(',')[0]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate max-w-[120px]">
                    {nextMatch.location}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-white/80">
                Agende sua próxima partida e comece a pontuar.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-primary" />
              Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureGroups.map((group, groupIdx) => (
              <Card
                key={groupIdx}
                className="border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={cn('p-2 rounded-lg bg-secondary', group.color)}
                    >
                      <group.icon className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-base font-bold">
                      {group.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {group.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(item.path)}
                        className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-secondary/50 transition-colors group/item"
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover/item:scale-110',
                            item.bg,
                            item.iconColor,
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-medium text-center leading-tight">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-xs h-8 text-muted-foreground hover:text-primary"
                    onClick={() => navigate('/explore')}
                  >
                    Ver categoria completa
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access to Full Explore */}
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-dashed border-2 hover:bg-secondary/50 hover:border-primary/50 group"
              onClick={() => navigate('/explore')}
            >
              <Search className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
              <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                Não encontrou o que procura? Explorar tudo
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
