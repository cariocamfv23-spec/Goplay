import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Search,
  MapPin,
  Dumbbell,
  Apple,
  Stethoscope,
  Camera,
  Calendar,
  Car,
  ShoppingBag,
  Briefcase,
  ChevronRight,
  Trophy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    id: 'venues',
    label: 'Espaços',
    icon: MapPin,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    path: '/explore/venues',
  },
  {
    id: 'gyms',
    label: 'Academias',
    icon: Dumbbell,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    path: '/explore/gyms',
  },
  {
    id: 'nutrition',
    label: 'Nutrição',
    icon: Apple,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    path: '/explore/nutrition',
  },
  {
    id: 'clinics',
    label: 'Saúde',
    icon: Stethoscope,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    path: '/explore/clinics',
  },
  {
    id: 'photographers',
    label: 'Fotógrafos',
    icon: Camera,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    path: '/explore/photographers',
  },
  {
    id: 'events',
    label: 'Eventos',
    icon: Calendar,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    path: '/explore/events',
  },
  {
    id: 'ride',
    label: 'Transporte',
    icon: Car,
    color: 'text-zinc-500',
    bg: 'bg-zinc-500/10',
    path: '/ride/request/driver-select', // Points to ride select or request
  },
  {
    id: 'marketplace',
    label: 'Loja',
    icon: ShoppingBag,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    path: '/marketplace',
  },
]

export default function Explore() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar esportes, locais, eventos..."
            className="pl-9 rounded-full bg-secondary/50 border-transparent focus:bg-background transition-all"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Categories Grid */}
        <section>
          <h2 className="font-bold text-lg mb-4 px-1">Categorias</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.path)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center ${cat.bg} transition-transform group-hover:scale-110 group-active:scale-95`}
                >
                  <cat.icon className={`h-6 w-6 ${cat.color}`} />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Card - Uber / Ride */}
        <Card
          className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-none shadow-lg cursor-pointer hover:scale-[1.01] transition-transform"
          onClick={() => navigate('/ride/request/driver-1')}
        >
          <CardContent className="p-4 flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-white" /> Vá de Goplay
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Solicite um motorista parceiro agora
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-500 relative z-10" />
            <div className="absolute right-0 bottom-0 h-24 w-24 bg-white/5 rounded-full blur-2xl transform translate-x-1/3 translate-y-1/3" />
          </CardContent>
        </Card>

        {/* Jobs & Marketplace Banners */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="bg-blue-600 text-white border-none shadow-md cursor-pointer hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/jobs')}
          >
            <CardContent className="p-4">
              <Briefcase className="h-6 w-6 mb-2 text-white/80" />
              <h3 className="font-bold">Vagas</h3>
              <p className="text-xs text-blue-100">Encontre oportunidades</p>
            </CardContent>
          </Card>

          <Card
            className="bg-gold text-black border-none shadow-md cursor-pointer hover:bg-yellow-500 transition-colors"
            onClick={() => navigate('/ranking')}
          >
            <CardContent className="p-4">
              <Trophy className="h-6 w-6 mb-2 text-black/80" />
              <h3 className="font-bold">Ranking</h3>
              <p className="text-xs text-black/70">Veja sua posição</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
