import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star, MapPin, CreditCard } from 'lucide-react'
import { mockClinics } from '@/lib/data'
import { useNavigate } from 'react-router-dom'
import { DigitalCard } from '@/components/DigitalCard'
import { Button } from '@/components/ui/button'

export default function ClinicsList() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Fisioterapia e Recovery</h1>
          <DigitalCard>
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
            className="overflow-hidden border-none shadow-md cursor-pointer"
            onClick={() => navigate(`/clinics/${clinic.id}`)}
          >
            <div className="h-32 relative">
              <img
                src={clinic.image}
                className="w-full h-full object-cover"
                alt={clinic.name}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{clinic.name}</h3>
              <p className="text-sm text-muted-foreground">
                {clinic.specialty}
              </p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {clinic.address}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
