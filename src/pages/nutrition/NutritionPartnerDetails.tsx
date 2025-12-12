import { useNavigate, useParams } from 'react-router-dom'
import { mockNutritionPartners, mockProducts } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Star, ShoppingBag, Leaf } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DigitalCard } from '@/components/DigitalCard'
import { Card, CardContent } from '@/components/ui/card'

export default function NutritionPartnerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const partner = mockNutritionPartners.find((n) => n.id === id)

  if (!partner) return <div>Parceiro não encontrado</div>

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="relative h-64 w-full">
        <img
          src={`https://img.usecurling.com/p/600/400?q=${partner.img}&dpr=2`}
          alt={partner.name}
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
          <h1 className="text-2xl font-bold mb-1">{partner.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" /> {partner.location}
          </div>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" /> {partner.rating}
            </Badge>
            <Badge
              variant="outline"
              className="text-green-600 border-green-200 bg-green-50"
            >
              {partner.discount}
            </Badge>
          </div>

          <DigitalCard title="Healthy Market" type="market">
            <Button className="w-full h-14 rounded-full text-lg shadow-lg bg-gradient-to-r from-green-600 to-emerald-800 hover:from-green-700 hover:to-emerald-900">
              <Leaf className="mr-2 h-5 w-5" /> Cartão Digital Mercado Saudável
            </Button>
          </DigitalCard>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Kits & Produtos</h3>
          <div className="grid grid-cols-2 gap-3">
            {mockProducts
              .filter((p) => p.category === 'Nutrição')
              .slice(0, 4)
              .map((prod) => (
                <Card
                  key={prod.id}
                  className="overflow-hidden border-none shadow-sm cursor-pointer"
                  onClick={() => navigate(`/marketplace/product/${prod.id}`)}
                >
                  <div className="aspect-square relative bg-secondary">
                    <img
                      src={`https://img.usecurling.com/p/300/300?q=${prod.img}`}
                      className="w-full h-full object-cover"
                      alt={prod.name}
                    />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm truncate">
                      {prod.name}
                    </h4>
                    <p className="text-primary font-bold text-sm">
                      {prod.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
