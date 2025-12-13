import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Camera,
  Calendar,
  MapPin,
  Dumbbell,
  Leaf,
  Stethoscope,
  Globe,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    id: 'photographers',
    name: 'Fotógrafos',
    icon: Camera,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    path: '/explore/photographers',
  },
  {
    id: 'events',
    name: 'Eventos',
    icon: Calendar,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    path: '/explore/events',
  },
  {
    id: 'venues',
    name: 'Quadras',
    icon: MapPin,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    path: '/explore/venues',
  },
  {
    id: 'gyms',
    name: 'Academias',
    icon: Dumbbell,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    path: '/explore/gyms',
  },
  {
    id: 'nutrition',
    name: 'Nutrição',
    icon: Leaf,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    path: '/explore/nutrition',
  },
  {
    id: 'clinics',
    name: 'Clínicas',
    icon: Stethoscope,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    path: '/explore/clinics',
  },
]

export default function Explore() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="p-4 sticky top-16 bg-background z-10 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar no Goplay..."
            className="pl-9 rounded-full bg-secondary border-none"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="font-bold text-lg mb-4">Categorias</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-md transition-all border-none shadow-sm bg-secondary/20"
                onClick={() => navigate(category.path)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center gap-3 text-center h-32">
                  <div
                    className={`h-12 w-12 rounded-full ${category.bg} flex items-center justify-center`}
                  >
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* International Match Teaser */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-pointer group"
          onClick={() => navigate('/play/international')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900" />
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/800/400?q=world%20map%20dots&color=blue')] bg-cover opacity-20" />
          <div className="relative p-6 flex flex-col items-center text-center text-white">
            <div className="bg-white/10 p-3 rounded-full mb-3 backdrop-blur-md">
              <Globe className="h-8 w-8 text-blue-200" />
            </div>
            <h3 className="text-xl font-bold mb-1">Partidas Internacionais</h3>
            <p className="text-sm text-blue-100 mb-4">
              Desafie jogadores de outros países
            </p>
            <Button
              variant="secondary"
              className="rounded-full font-bold text-blue-900"
            >
              Jogar Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
