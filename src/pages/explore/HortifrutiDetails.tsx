import { useParams, useNavigate } from 'react-router-dom'
import { mockHortifrutis } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, MapPin, ShoppingBag, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PaymentDialog } from '@/components/PaymentDialog'

export default function HortifrutiDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const shop = mockHortifrutis.find((s) => s.id === id) || mockHortifrutis[0]

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <p className="text-muted-foreground mb-4">Parceiro não encontrado.</p>
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

  const numericPrice = getNumericPrice(shop.price)

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-64">
        <img
          src={shop.image}
          className="w-full h-full object-cover"
          alt={shop.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
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
        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold">{shop.name}</h1>
            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm">
              <Star className="h-4 w-4 text-gold fill-gold" />
              <span className="font-bold text-sm">{shop.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-green-600/10 text-green-700 dark:text-green-400 hover:bg-green-600/20 border-green-600/20 gap-1.5 pl-2 pr-3 py-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span className="font-semibold text-xs">Conveniado GoPlay</span>
            </Badge>
          </div>
        </div>

        <p className="text-primary font-medium mb-2">{shop.specialty}</p>

        <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {shop.address}
        </p>

        <div className="bg-card border p-4 rounded-xl mb-6 shadow-sm">
          <h3 className="font-bold mb-2">Sobre</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {shop.description}
          </p>
        </div>

        <div className="bg-card border p-4 rounded-xl mb-6 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Cesta Semanal</p>
            <p className="text-xl font-bold">{shop.price}</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Entrega Grátis
          </Badge>
        </div>

        <PaymentDialog
          title={`Pedido em ${shop.name}`}
          price={numericPrice}
          onSuccess={() => {}}
        >
          <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
            <ShoppingBag className="mr-2 h-5 w-5" /> Fazer Pedido
          </Button>
        </PaymentDialog>
      </div>
    </div>
  )
}
