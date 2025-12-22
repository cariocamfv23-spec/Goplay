import { Input } from '@/components/ui/input'
import {
  Search,
  MapPin,
  Filter,
  CreditCard,
  Map as MapIcon,
  Globe,
  Radio,
  Play,
  Baby,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react'
import { exploreCategories, mockEvents, mockVenues } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DigitalCard } from '@/components/DigitalCard'

export default function Explore() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Header & Search */}
      <div className="sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Explorar</h1>
          <DigitalCard>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary gap-2"
            >
              <CreditCard className="h-4 w-4" />
              <span className="text-xs font-bold">Meu Cartão</span>
            </Button>
          </DigitalCard>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar arenas, eventos, pessoas..."
              className="pl-9 bg-secondary border-none rounded-xl"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-secondary rounded-xl"
          >
            <Filter className="h-4 w-4 text-foreground" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* NEW FEATURE: Live Events (Cinematic/Premium Card) */}
        <div
          onClick={() => navigate('/explore/live')}
          className="relative w-full h-36 rounded-2xl overflow-hidden cursor-pointer group shadow-lg ring-1 ring-white/10"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-900 to-black opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
            {/* Subtle grainy texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            <img
              src="https://img.usecurling.com/p/800/300?q=stadium%20lights%20crowd&color=red"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 scale-100 group-hover:scale-105 transition-transform duration-1000"
              alt="Background"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {/* Cinematic Icon Construction */}
                <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <Radio className="h-4 w-4 text-white animate-pulse" />
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-black animate-bounce shadow-lg"></span>
                </div>
                <Badge
                  variant="destructive"
                  className="bg-red-600 text-white border-0 shadow-lg tracking-wider font-bold text-[10px]"
                >
                  AO VIVO
                </Badge>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight drop-shadow-sm mb-1">
                Eventos ao Vivo
              </h2>
              <p className="text-white/60 text-xs font-medium max-w-[240px] leading-relaxed">
                Assista agora aos maiores campeonatos e lutas em tempo real.
              </p>
            </div>

            {/* Floating Action Button inside card */}
            <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-red-600 flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* International Match Feature Card */}
        <div
          onClick={() => navigate('/explore/international')}
          className="relative w-full h-24 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90 group-hover:opacity-100 transition-opacity" />
          <img
            src="https://img.usecurling.com/p/800/300?q=world%20map&color=blue"
            alt="Match Internacional"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
          />
          <div className="absolute inset-0 flex items-center px-6 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-5 w-5 text-white" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 border-0"
                >
                  Novo
                </Badge>
              </div>
              <h2 className="text-xl font-bold text-white mb-0">
                Match Internacional
              </h2>
              <p className="text-white/80 text-xs">
                Desafie atletas do mundo todo.
              </p>
            </div>
            <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
              <Globe className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Map & Events Feature Card */}
        <div
          onClick={() => navigate('/explore/map-events')}
          className="relative w-full h-32 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-800 opacity-90 group-hover:opacity-100 transition-opacity" />
          <img
            src="https://img.usecurling.com/p/800/300?q=map%203d%20city&color=purple"
            alt="Mapa Interativo"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <div className="flex items-center gap-2 mb-1">
              <MapIcon className="h-5 w-5 text-white" />
              <Badge
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 border-0"
              >
                Beta
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Mapa & Eventos
            </h2>
            <p className="text-white/80 text-sm max-w-[200px] leading-tight">
              Encontre eventos esportivos perto de você no mapa interativo.
            </p>
          </div>
        </div>

        {/* Flyer Creator Feature Card - NEW */}
        <div
          onClick={() => navigate('/explore/flyer-creator')}
          className="relative w-full h-28 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity" />
          <img
            src="https://img.usecurling.com/p/800/300?q=graphic%20design%20sports&color=purple"
            alt="Criador de Flyers AI"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          <div className="absolute inset-0 flex items-center px-6 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-white" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 border-0 text-[10px]"
                >
                  AI Tools
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-white mb-0 leading-tight">
                Criador de Flyers
              </h2>
              <p className="text-white/90 text-[10px] mt-1 max-w-[160px]">
                Crie artes profissionais para seus jogos em segundos.
              </p>
            </div>
            <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-sm shrink-0 border border-white/20">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Kids Friendly Feature Card */}
        <div
          onClick={() => navigate('/explore/kids')}
          className="relative w-full h-24 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 opacity-90 group-hover:opacity-100 transition-opacity" />
          <img
            src="https://img.usecurling.com/p/800/300?q=kids%20playground&color=pink"
            alt="Locais Esportivos com Recreação Infantil"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          <div className="absolute inset-0 flex items-center px-6 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Baby className="h-5 w-5 text-white" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 border-0"
                >
                  Novo
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-white mb-0 leading-tight">
                Locais Kids Friendly
              </h2>
              <p className="text-white/90 text-[10px] mt-1">
                Treine tranquilo enquanto seus filhos se divertem.
              </p>
            </div>
            <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm shrink-0">
              <Baby className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-3">
          {exploreCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              onClick={() => {
                if (cat.id === 'international') {
                  navigate('/explore/international')
                } else {
                  navigate(`/explore/${cat.id}`)
                }
              }}
            >
              <div className={`p-3 rounded-full ${cat.bg}`}>
                <cat.icon className={`h-5 w-5 ${cat.color}`} />
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Featured Events */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Eventos em Destaque</h2>
            <Button
              variant="link"
              className="text-xs text-primary h-auto p-0"
              onClick={() => navigate('/explore/events')}
            >
              Ver tudo
            </Button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {mockEvents.slice(0, 3).map((event) => (
              <Card
                key={event.id}
                className="min-w-[280px] border-none shadow-sm bg-secondary/20 overflow-hidden cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="h-32 bg-muted relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-md">
                    {event.category}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-bold text-sm mb-1 truncate">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" /> {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">
                      {event.date}
                    </span>
                    <span className="text-sm font-bold">
                      {event.price === 0
                        ? 'Grátis'
                        : `R$ ${event.price.toFixed(2)}`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Venues */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Arenas Populares</h2>
            <Button
              variant="link"
              className="text-xs text-primary h-auto p-0"
              onClick={() => navigate('/explore/venues')}
            >
              Ver tudo
            </Button>
          </div>
          <div className="space-y-3">
            {mockVenues.map((venue) => (
              <Card
                key={venue.id}
                className="flex border-none shadow-sm bg-card overflow-hidden cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => navigate(`/venues/${venue.id}`)}
              >
                <div className="w-24 h-24 bg-muted relative shrink-0">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-sm mb-1">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" /> {venue.location}
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-5 px-1 bg-green-500/10 text-green-600"
                    >
                      {venue.rating} ★
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {venue.reviews} avaliações
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
