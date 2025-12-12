import { Input } from '@/components/ui/input'
import {
  Search,
  MapPin,
  SlidersHorizontal,
  List,
  Map as MapIcon,
  Calendar,
  User,
  Camera,
  Car,
  Star,
  Dumbbell,
  Leaf,
  Stethoscope,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  mockEvents,
  mockVenues,
  mockProfiles,
  mockGyms,
  mockNutritionPartners,
  mockClinics,
} from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Explore = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [activeCategory, setActiveCategory] = useState('Todos')

  const categories = [
    { label: 'Todos', icon: null },
    { label: 'Quadras', icon: MapPin },
    { label: 'Academias', icon: Dumbbell },
    { label: 'Nutrição', icon: Leaf },
    { label: 'Clínicas', icon: Stethoscope },
    { label: 'Atletas', icon: User },
    { label: 'Eventos', icon: Calendar },
    { label: 'Fotógrafos', icon: Camera },
    { label: 'Motoristas', icon: Car },
  ]

  const renderSectionHeader = (title: string, icon: any) => (
    <div className="flex justify-between items-center mb-3 mt-4">
      <h2 className="text-lg font-bold flex items-center gap-2">
        {icon && <icon.type {...icon.props} />} {title}
      </h2>
      <Button variant="ghost" size="sm" className="text-xs text-primary h-8">
        Ver todos <ChevronRight className="h-3 w-3 ml-1" />
      </Button>
    </div>
  )

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="p-4 sticky top-14 z-20 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar parceiros, eventos, locais..."
              className="pl-9 rounded-full bg-secondary border-none shadow-sm"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shrink-0 border-border bg-secondary/20"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mask-linear-fade pr-4">
            {categories.map((cat) => (
              <Badge
                key={cat.label}
                variant={activeCategory === cat.label ? 'default' : 'outline'}
                className="px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer whitespace-nowrap flex items-center gap-2"
                onClick={() => setActiveCategory(cat.label)}
              >
                {cat.icon && <cat.icon className="h-3 w-3" />}
                {cat.label}
              </Badge>
            ))}
          </div>
          <div className="flex bg-secondary rounded-full p-1 ml-2 shrink-0">
            <button
              className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              className={`p-1.5 rounded-full transition-all ${viewMode === 'map' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('map')}
            >
              <MapIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="px-4 space-y-2 animate-fade-in pb-4">
          {/* Venues */}
          {(activeCategory === 'Todos' || activeCategory === 'Quadras') && (
            <div>
              {renderSectionHeader(
                'Quadras e Campos',
                <MapPin className="h-5 w-5 text-primary" />,
              )}
              <div className="space-y-4">
                {mockVenues.map((venue) => (
                  <Card
                    key={venue.id}
                    className="overflow-hidden border-none shadow-sm cursor-pointer group hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/venues/${venue.id}`)}
                  >
                    <div className="h-32 bg-muted relative">
                      <img
                        src={venue.images[0]}
                        className="w-full h-full object-cover"
                        alt={venue.name}
                      />
                      <Badge className="absolute top-2 left-2 bg-white text-black hover:bg-white">
                        {venue.price}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-bold">{venue.name}</h3>
                      <p className="text-xs text-muted-foreground mb-1">
                        {venue.address}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gold font-bold">
                        <Star className="h-3 w-3 fill-current" /> {venue.rating}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Gyms */}
          {(activeCategory === 'Todos' || activeCategory === 'Academias') && (
            <div>
              {renderSectionHeader(
                'Academias Parceiras',
                <Dumbbell className="h-5 w-5 text-primary" />,
              )}
              <div className="space-y-3">
                {mockGyms.map((gym) => (
                  <Card
                    key={gym.id}
                    className="border-none shadow-sm cursor-pointer"
                    onClick={() => navigate(`/gyms/${gym.id}`)}
                  >
                    <CardContent className="p-3 flex gap-3">
                      <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img
                          src={`https://img.usecurling.com/p/300/300?q=${gym.img}`}
                          className="w-full h-full object-cover"
                          alt={gym.name}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{gym.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {gym.location}
                        </p>
                        <p className="text-xs font-medium text-primary mt-1">
                          {gym.benefits[0]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition */}
          {(activeCategory === 'Todos' || activeCategory === 'Nutrição') && (
            <div>
              {renderSectionHeader(
                'Nutrição & Suplementos',
                <Leaf className="h-5 w-5 text-green-600" />,
              )}
              <div className="space-y-3">
                {mockNutritionPartners.map((partner) => (
                  <Card
                    key={partner.id}
                    className="border-none shadow-sm cursor-pointer"
                    onClick={() => navigate(`/nutrition/${partner.id}`)}
                  >
                    <CardContent className="p-3 flex gap-3 items-center">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-muted shrink-0 border-2 border-green-100">
                        <img
                          src={`https://img.usecurling.com/p/300/300?q=${partner.img}`}
                          className="w-full h-full object-cover"
                          alt={partner.name}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{partner.name}</h3>
                        <Badge
                          variant="secondary"
                          className="text-[10px] mt-1 text-green-700 bg-green-50"
                        >
                          {partner.discount}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Clinics */}
          {(activeCategory === 'Todos' || activeCategory === 'Clínicas') && (
            <div>
              {renderSectionHeader(
                'Saúde & Recovery',
                <Stethoscope className="h-5 w-5 text-blue-600" />,
              )}
              <div className="space-y-3">
                {mockClinics.map((clinic) => (
                  <Card
                    key={clinic.id}
                    className="border-none shadow-sm cursor-pointer"
                    onClick={() => navigate(`/clinics/${clinic.id}`)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{clinic.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {clinic.location}
                          </p>
                        </div>
                        <Badge className="bg-blue-600 hover:bg-blue-700">
                          {clinic.rating}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {clinic.services.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-secondary px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {(activeCategory === 'Todos' || activeCategory === 'Eventos') && (
            <div>
              {renderSectionHeader(
                'Eventos em Destaque',
                <Calendar className="h-5 w-5 text-primary" />,
              )}
              <div className="grid grid-cols-1 gap-5">
                {mockEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden border-none shadow-md cursor-pointer hover:shadow-xl transition-all group"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={event.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={event.title}
                      />
                      <div className="absolute top-2 right-2 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-bold text-primary shadow-sm flex flex-col items-center leading-tight">
                        <span className="text-[10px] uppercase">AGO</span>
                        <span className="text-lg">15</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 leading-tight">
                        {event.title}
                      </h3>
                      <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 inline mr-1" />{' '}
                          {event.location}
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {event.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[calc(100vh-180px)] w-full relative bg-secondary/50 animate-fade-in">
          <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1000/1000?q=map&color=gray')] bg-cover bg-center opacity-40 grayscale" />

          {/* Mock Map Markers */}
          <div
            className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-bounce cursor-pointer group"
            onClick={() => navigate('/venues/v1')}
          >
            <div className="bg-primary text-white p-2 rounded-full shadow-xl border-2 border-white group-hover:scale-110 transition-transform">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow-md absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block z-10">
              Arena Futsal
            </div>
          </div>

          <div
            className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => navigate('/gyms/g1')}
          >
            <div className="bg-purple-600 text-white p-2 rounded-full shadow-xl border-2 border-white group-hover:scale-110 transition-transform">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-bold shadow-md absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block z-10">
              Ironberg Academy
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Explore
