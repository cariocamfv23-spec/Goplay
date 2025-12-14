import { useParams, useNavigate } from 'react-router-dom'
import { mockGyms } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Star, CreditCard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PaymentDialog } from '@/components/PaymentDialog'

export default function GymDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const gym = mockGyms.find((g) => g.id === id) || mockGyms[0]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-64">
        <img
          src={gym.image}
          className="w-full h-full object-cover"
          alt={gym.name}
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
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold">{gym.name}</h1>
          <div className="flex items-center gap-1 font-bold text-gold bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm">
            <Star className="h-4 w-4 fill-gold" /> {gym.rating}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {gym.address}
        </p>
        <Badge className="mb-6">{gym.type}</Badge>

        <div className="bg-card border p-4 rounded-xl mb-6 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Mensalidade</p>
          <p className="text-2xl font-bold">{gym.price}</p>
        </div>

        <PaymentDialog
          title={`Mensalidade ${gym.name}`}
          price={gym.price}
          onSuccess={() => {}}
        >
          <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
            <CreditCard className="mr-2 h-5 w-5" /> Matricular Agora
          </Button>
        </PaymentDialog>
      </div>
    </div>
  )
}
