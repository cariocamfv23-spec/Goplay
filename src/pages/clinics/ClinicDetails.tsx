import { useNavigate, useParams } from 'react-router-dom'
import { mockClinics } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MapPin,
  Star,
  Stethoscope,
  CalendarCheck,
  ShieldPlus,
  Activity,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DigitalCard } from '@/components/DigitalCard'

export default function ClinicDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const clinic = mockClinics.find((c) => c.id === id)

  if (!clinic) return <div>Clínica não encontrada</div>

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-64 w-full">
        <img
          src={`https://img.usecurling.com/p/600/400?q=${clinic.img}&dpr=2`}
          alt={clinic.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 text-white rounded-full backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 -mt-12 relative z-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{clinic.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" /> {clinic.location}
          </div>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" /> {clinic.rating}
            </Badge>
          </div>

          <Button className="w-full h-14 rounded-full text-lg shadow-lg mb-3">
            <CalendarCheck className="mr-2 h-5 w-5" /> Agendar Consulta
          </Button>

          {clinic.recoveryPlan && (
            <DigitalCard title="Goplay Recovery" type="recovery">
              <Button
                variant="outline"
                className="w-full h-12 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Activity className="mr-2 h-5 w-5" /> Plano Goplay Recovery
              </Button>
            </DigitalCard>
          )}
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Especialidades</h3>
          <div className="flex flex-wrap gap-2">
            {clinic.services.map((service) => (
              <Badge
                key={service}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                <Stethoscope className="w-3 h-3 mr-1" /> {service}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Convênios Aceitos</h3>
          <div className="grid grid-cols-2 gap-3">
            {clinic.insurance.map((ins) => (
              <div
                key={ins}
                className="bg-secondary/20 p-3 rounded-lg flex items-center gap-2"
              >
                <ShieldPlus className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{ins}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
