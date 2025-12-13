import { mockProducts } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter, ShoppingCart, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'

export default function Marketplace() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md p-4 border-b border-border/50 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-9 rounded-xl bg-secondary/50 border-transparent focus:bg-background"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="shrink-0 rounded-xl"
            onClick={() => navigate('/marketplace/cart')}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['Todos', 'Calçados', 'Roupas', 'Equipamentos', 'Suplementos'].map(
            (cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="whitespace-nowrap cursor-pointer hover:bg-secondary/80 px-3 py-1.5"
              >
                {cat}
              </Badge>
            ),
          )}
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => navigate(`/marketplace/product/${product.id}`)}
          >
            <div className="aspect-square bg-secondary relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <Badge className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm hover:bg-black/60 border-none text-[10px]">
                {product.category}
              </Badge>
            </div>
            <CardContent className="p-3">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-2">
                <Star className="h-3 w-3 fill-gold text-gold" />
                {product.rating} ({product.reviews})
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">
                  R$ {product.price.toFixed(2)}
                </span>
                <Button size="icon" className="h-6 w-6 rounded-full">
                  <ShoppingCart className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
