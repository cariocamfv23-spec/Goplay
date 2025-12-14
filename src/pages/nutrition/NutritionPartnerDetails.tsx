import { useParams, useNavigate } from 'react-router-dom'
import { mockNutrition } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, Calendar, CreditCard } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PaymentDialog } from '@/components/PaymentDialog'

export default function NutritionPartnerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const partner = mockNutrition.find((n) => n.id === id) || mockNutrition[0]

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="bg-primary/10 h-32 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="px-5 -mt-12">
        <Avatar className="h-24 w-24 border-4 border-background shadow-md mb-4">
          <AvatarImage src={partner.image} />
          <AvatarFallback>{partner.name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{partner.name}</h1>
        <p className="text-primary font-medium">{partner.specialty}</p>

        <div className="flex items-center gap-1 mt-2 mb-6">
          <Star className="h-4 w-4 text-gold fill-gold" />
          <span className="font-bold">{partner.rating}</span>
          <span className="text-muted-foreground text-sm">
            (120 avaliações)
          </span>
        </div>

        <div className="bg-card border p-4 rounded-xl mb-6 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">
            Valor da Consulta
          </p>
          <p className="text-2xl font-bold">{partner.price}</p>
        </div>

        <PaymentDialog
          title={`Consulta com ${partner.name}`}
          price={partner.price}
          onSuccess={() => {}}
        >
          <Button className="w-full h-14 font-bold rounded-xl shadow-lg shadow-primary/20">
            <CreditCard className="mr-2 h-5 w-5" /> Pagar Consulta
          </Button>
        </PaymentDialog>
      </div>
    </div>
  )
}
