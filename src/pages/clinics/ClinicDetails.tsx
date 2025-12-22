import { useParams, useNavigate } from 'react-router-dom'
import { mockClinics } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, CreditCard } from 'lucide-react'
import { PaymentDialog } from '@/components/PaymentDialog'
import { Badge } from '@/components/ui/badge'

export default function ClinicDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const clinic = mockClinics.find((c) => c.id === id) || mockClinics[0]

  if (!clinic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <p className="text-muted-foreground mb-4">Clínica não encontrada.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Voltar
        </Button>
      </div>
    )
  }

  // Helper to extract numeric price
  const getNumericPrice = (priceStr: string) => {
    if (!priceStr) return 0
    let clean = priceStr.replace(/\./g, '')
    clean = clean.replace(/[^0-9,]/g, '')
    clean = clean.replace(',', '.')
    const value = parseFloat(clean)
    return isNaN(value) ? 0 : value
  }

  const numericPrice = getNumericPrice(clinic.price)

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="h-64 relative">
        <img
          src={clinic.image}
          className="w-full h-full object-cover"
          alt={clinic.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 rounded-full backdrop-blur-md"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-5 -mt-12 relative z-10">
        <h1 className="text-2xl font-bold mb-1">{clinic.name}</h1>
        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
          <MapPin className="h-4 w-4" /> {clinic.address}
        </p>

        <div className="flex gap-4 mb-6">
          <div className="bg-secondary/30 p-3 rounded-lg flex-1 text-center border border-border/50">
            <span className="block font-bold text-lg">{clinic.rating} ★</span>
            <span className="text-xs text-muted-foreground">Avaliação</span>
          </div>
          <div className="bg-secondary/30 p-3 rounded-lg flex-1 text-center border border-border/50">
            <span className="block font-bold text-lg">15</span>
            <span className="text-xs text-muted-foreground">Especialistas</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-2">Serviços</h3>
          <div className="flex flex-wrap gap-2">
            {clinic.services.map((service, idx) => (
              <Badge key={idx} variant="outline">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-card border p-4 rounded-xl mb-6 shadow-sm">
          <p className="text-sm text-muted-foreground mb-2">
            {clinic.description}
          </p>
          <div className="pt-2 border-t border-border/50 mt-2">
            <p className="text-sm text-muted-foreground mb-1">
              Valor da Sessão
            </p>
            <p className="text-2xl font-bold">{clinic.price}</p>
          </div>
        </div>

        <PaymentDialog
          title={`Sessão em ${clinic.name}`}
          price={numericPrice}
          onSuccess={() => {}}
        >
          <Button className="w-full h-14 font-bold rounded-xl shadow-lg shadow-primary/20">
            <CreditCard className="mr-2 h-5 w-5" /> Agendar e Pagar
          </Button>
        </PaymentDialog>
      </div>
    </div>
  )
}
