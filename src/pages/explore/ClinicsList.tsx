import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star, MapPin, CreditCard } from 'lucide-react'
import { mockClinics } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { DigitalCard } from '@/components/DigitalCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ClinicsList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50 shadow-sm backdrop-blur-md bg-background/95">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Fisioterapia e Recovery</h1>
          <DigitalCard type="recovery" title="Health Pass">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10 rounded-full"
            >
              <CreditCard className="h-5 w-5" />
            </Button>
          </DigitalCard>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clínicas..."
            className="pl-9 bg-secondary border-none rounded-xl"
          />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {mockClinics.map((clinic) => (
          <Card
            key={clinic.id}
            className="overflow-hidden border-none shadow-md cursor-pointer hover:bg-secondary/20 transition-all hover:scale-[1.01]"
            onClick={() => navigate(`/clinics/${clinic.id}`)}
          >
            <div className="h-40 relative">
              <img
                src={clinic.image}
                className="w-full h-full object-cover"
                alt={clinic.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-bold text-lg shadow-black/50 drop-shadow-sm">
                  {clinic.name}
                </h3>
                <div className="flex items-center gap-1 text-xs opacity-90 mt-0.5">
                  <MapPin className="h-3 w-3" /> {clinic.address}
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-black flex items-center gap-1">
                <Star className="h-3 w-3 text-gold fill-gold" />
                {clinic.rating}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <p className="text-sm font-semibold text-primary">
                  {clinic.specialty}
                </p>
                <p className="font-bold text-sm">{clinic.price}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {clinic.services.map((service, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-[10px] bg-secondary/50 font-medium"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {mockClinics.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">
            Nenhuma clínica encontrada.
          </p>
        )}
      </div>
    </div>
  )
}
