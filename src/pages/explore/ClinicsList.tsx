import { useNavigate } from 'react-router-dom'
import { mockClinics } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Stethoscope, Star, MapPin, ShieldPlus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ClinicsList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="p-4 border-b flex items-center gap-4 sticky top-0 bg-background z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-blue-500" /> Clínicas Parceiras
        </h1>
      </div>

      <div className="p-4 grid gap-4">
        {mockClinics.map((clinic) => (
          <Card
            key={clinic.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/clinics/${clinic.id}`)}
          >
            <div className="relative h-40">
              <img
                src={`https://img.usecurling.com/p/600/400?q=${clinic.img}&dpr=2`}
                alt={clinic.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-white/90 text-black hover:bg-white">
                  <Star className="h-3 w-3 fill-gold text-gold mr-1" />
                  {clinic.rating}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{clinic.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 mr-1" /> {clinic.location}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {clinic.services.map((service) => (
                  <Badge
                    key={service}
                    variant="outline"
                    className="text-xs font-normal"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldPlus className="h-3 w-3" /> Aceita:{' '}
                {clinic.insurance.join(', ')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
