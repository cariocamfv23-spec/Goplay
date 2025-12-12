import { Input } from '@/components/ui/input'
import { Search, MapPin, Filter, Car, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  mockEvents,
  mockVenues,
  mockGyms,
  mockNutritionPartners,
  mockClinics,
} from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const Explore = () => {
  const navigate = useNavigate()

  return (
    <div className="pb-24 animate-fade-in">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/40 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos, locais..."
              className="pl-9 bg-secondary border-none rounded-xl"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-6 bg-primary text-primary-foreground shadow-md"
          >
            Tudo
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-6 hover:bg-secondary/80"
            onClick={() => navigate('/explore/photographers')}
          >
            Fotógrafos
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-6 hover:bg-secondary/80"
          >
            Eventos
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-6 hover:bg-secondary/80"
          >
            Quadras
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full px-6 hover:bg-secondary/80"
          >
            Academias
          </Button>
        </div>
      </div>

      <div className="px-4 mt-6 grid grid-cols-2 gap-3">
        {/* New Feature Entry Point */}
        <div
          className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white shadow-lg cursor-pointer transform transition-all hover:scale-[1.01]"
          onClick={() => navigate('/driver/performance')}
        >
          <div className="flex flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <Car className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Motoristas</h3>
              <p className="text-[10px] text-slate-300">Performance e Ganhos</p>
            </div>
          </div>
        </div>

        <div
          className="p-4 bg-gradient-to-br from-primary to-purple-800 rounded-2xl text-white shadow-lg cursor-pointer transform transition-all hover:scale-[1.01]"
          onClick={() => navigate('/explore/photographers')}
        >
          <div className="flex flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Fotógrafos</h3>
              <p className="text-[10px] text-white/80">
                Encontre especialistas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Eventos em Destaque</h2>
          <Button variant="link" className="text-primary text-sm h-auto p-0">
            Ver todos
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="min-w-[280px] rounded-2xl overflow-hidden relative group cursor-pointer"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <img
                src={event.image}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                alt={event.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <Badge className="w-fit mb-2 bg-primary/90 hover:bg-primary border-none">
                  {event.date}
                </Badge>
                <h3 className="font-bold text-white text-lg leading-tight mb-1">
                  {event.title}
                </h3>
                <div className="flex items-center text-white/80 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-2">
        <h2 className="text-lg font-bold mb-4">Quadras e Espaços</h2>
        <div className="space-y-4">
          {mockVenues.map((venue) => (
            <Card
              key={venue.id}
              className="overflow-hidden border-none shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => navigate(`/venues/${venue.id}`)}
            >
              <div className="relative h-32">
                <img
                  src={`https://img.usecurling.com/p/600/400?q=${venue.img}&dpr=2`}
                  className="w-full h-full object-cover"
                  alt={venue.name}
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                  ★ {venue.rating}
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{venue.name}</h3>
                  <span className="text-primary font-bold text-sm">
                    {venue.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {venue.address}
                </p>
                <div className="flex gap-2 mt-2">
                  {venue.amenities.slice(0, 2).map((item, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[10px] h-5"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gyms Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-4">Academias Parceiras</h2>
        <div className="space-y-4">
          {mockGyms.map((gym) => (
            <Card
              key={gym.id}
              className="overflow-hidden border-none shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => navigate(`/gyms/${gym.id}`)}
            >
              <div className="flex h-28">
                <div className="w-28 shrink-0">
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=${gym.img}&dpr=2`}
                    className="w-full h-full object-cover"
                    alt={gym.name}
                  />
                </div>
                <CardContent className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm line-clamp-1">
                      {gym.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {gym.location}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {gym.amenities.slice(0, 2).map((item, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-primary font-bold text-xs">
                      {gym.plans[0].split(' - ')[1]}
                    </span>
                    <div className="flex items-center text-[10px] font-bold">
                      <span className="text-gold mr-1">★</span> {gym.rating}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Clinics Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-4">Clínicas e Fisioterapia</h2>
        <div className="space-y-4">
          {mockClinics.map((clinic) => (
            <Card
              key={clinic.id}
              className="overflow-hidden border-none shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => navigate(`/clinics/${clinic.id}`)}
            >
              <div className="flex h-28">
                <div className="w-28 shrink-0">
                  <img
                    src={`https://img.usecurling.com/p/300/300?q=${clinic.img}&dpr=2`}
                    className="w-full h-full object-cover"
                    alt={clinic.name}
                  />
                </div>
                <CardContent className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm line-clamp-1">
                      {clinic.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {clinic.location}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {clinic.services.slice(0, 2).map((item, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-1.5 py-0.5 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-[10px] text-muted-foreground">
                      Aceita: {clinic.insurance.slice(0, 2).join(', ')}
                    </span>
                    <div className="flex items-center text-[10px] font-bold">
                      <span className="text-gold mr-1">★</span> {clinic.rating}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Nutrition Section */}
      <div className="px-4 mt-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Parceiros de Nutrição</h2>
        <div className="grid grid-cols-2 gap-4">
          {mockNutritionPartners.map((partner) => (
            <Card
              key={partner.id}
              className="overflow-hidden border-none shadow-sm cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => navigate(`/nutrition/${partner.id}`)}
            >
              <div className="h-24">
                <img
                  src={`https://img.usecurling.com/p/300/200?q=${partner.img}&dpr=2`}
                  className="w-full h-full object-cover"
                  alt={partner.name}
                />
              </div>
              <CardContent className="p-3">
                <h3 className="font-bold text-sm line-clamp-1">
                  {partner.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {partner.specialties.join(', ')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                    {partner.discount.split(' ')[0]} OFF
                  </span>
                  <div className="flex items-center text-[10px] font-bold">
                    <span className="text-gold mr-1">★</span> {partner.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore
