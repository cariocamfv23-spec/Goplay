import { useParams, useNavigate } from 'react-router-dom'
import { mockClinics } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, MapPin } from 'lucide-react'

export default function ClinicDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const clinic = mockClinics.find((c) => c.id === id) || mockClinics[0]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="h-64 relative">
        <img
          src={clinic.image}
          className="w-full h-full object-cover"
          alt={clinic.name}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1">{clinic.name}</h1>
        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
          <MapPin className="h-4 w-4" /> {clinic.address}
        </p>

        <div className="flex gap-4 mb-6">
          <div className="bg-secondary/30 p-3 rounded-lg flex-1 text-center">
            <span className="block font-bold text-lg">{clinic.rating} ★</span>
            <span className="text-xs text-muted-foreground">Avaliação</span>
          </div>
          <div className="bg-secondary/30 p-3 rounded-lg flex-1 text-center">
            <span className="block font-bold text-lg">15</span>
            <span className="text-xs text-muted-foreground">Especialistas</span>
          </div>
        </div>

        <Button className="w-full h-12 font-bold rounded-xl">
          Agendar Visita
        </Button>
      </div>
    </div>
  )
}
