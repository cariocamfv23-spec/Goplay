import { useParams, useNavigate } from 'react-router-dom'
import { mockNutrition } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, CreditCard } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PaymentDialog } from '@/components/PaymentDialog'

export default function NutritionPartnerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Safe fallback to first item if id not found, but handle empty list case if needed
  const partner = mockNutrition.find((n) => n.id === id) || mockNutrition[0]

  if (!partner) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <p className="text-muted-foreground mb-4">Parceiro não encontrado.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Voltar
        </Button>
      </div>
    )
  }

  // Helper to extract numeric price from string format (e.g., "R$ 800/consulta" -> 800)
  // Assumes BRL format (comma as decimal separator) or simple integer
  const getNumericPrice = (priceStr: string) => {
    if (!priceStr) return 0
    if (typeof priceStr === 'number') return priceStr

    // 1. Remove thousands separators (.)
    let clean = priceStr.replace(/\./g, '')
    // 2. Remove all non-numeric chars except comma (,)
    clean = clean.replace(/[^0-9,]/g, '')
    // 3. Replace decimal separator (,) with dot (.)
    clean = clean.replace(',', '.')

    const value = parseFloat(clean)
    return isNaN(value) ? 0 : value
  }

  const numericPrice = getNumericPrice(partner.price)

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="bg-primary/10 h-32 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="px-5 -mt-12 relative z-10">
        <Avatar className="h-24 w-24 border-4 border-background shadow-md mb-4 bg-background">
          <AvatarImage
            src={partner.image}
            alt={partner.name}
            className="object-cover"
          />
          <AvatarFallback>{partner.name[0]}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold leading-tight">{partner.name}</h1>
          <p className="text-primary font-medium">{partner.specialty}</p>
        </div>

        <div className="flex items-center gap-1 mt-3 mb-6 bg-secondary/30 w-fit px-3 py-1.5 rounded-full border border-border/50">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-sm">{partner.rating}</span>
          <span className="text-muted-foreground text-xs">
            (120 avaliações)
          </span>
        </div>

        <div className="bg-card border border-border/50 p-5 rounded-xl mb-6 shadow-sm space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {partner.description}
          </p>
          <div className="pt-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Valor da Consulta
            </p>
            <p className="text-2xl font-bold text-foreground">
              {partner.price}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <PaymentDialog
            title={`Consulta com ${partner.name}`}
            price={numericPrice}
            onSuccess={() => {}}
          >
            <Button className="w-full h-14 font-bold rounded-xl shadow-lg shadow-primary/20 text-base transition-all hover:scale-[1.02] active:scale-95">
              <CreditCard className="mr-2 h-5 w-5" />
              Agendar e Pagar
            </Button>
          </PaymentDialog>

          <p className="text-xs text-center text-muted-foreground px-4">
            Cancelamento gratuito até 24h antes da consulta.
          </p>
        </div>
      </div>
    </div>
  )
}
